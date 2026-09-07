/* MIDAD Theme Management System - stable, route-safe, additive layer. */
(() => {
  const SUPABASE_URL = "https://clobfjrjhdysmqhbwzlc.supabase.co";
  const SUPABASE_KEY = "sb_publishable_LEFYVl0Y8VOnMIbBZev1Vg_0pYSMWpv";
  if (!window.supabase) return;

  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  // Canonical map to the files that actually exist in the repository.
  const THEME_MAP = {
    'default': { display_name: 'التصميم الأساسي', route: '2.html' },
    'theme-1': { display_name: 'التصميم 1', route: 'themes/theme-1/2.html' },
    'theme-2': { display_name: 'التصميم الأخضر', route: 'themes/theme-2/2.html' },
    'theme-3': { display_name: 'التصميم الإبداعي', route: 'themes/theme-3/index.html' },
    'theme-4': { display_name: 'التصميم التحريري', route: 'themes/theme-4/index.html' },
    'theme-5': { display_name: 'الرمادي المصقول والكهرماني', route: 'themes/theme-5/index.html' },
    'theme-6': { display_name: 'الأزرق الملكي والذهبي', route: 'themes/theme-6/index.html' },
    'theme-7': { display_name: 'دراسة الزمرد', route: 'themes/theme-7/index.html' },
    'theme-8': { display_name: 'العنابي الملكي والشمبانيا', route: 'themes/theme-8/index.html' },
    'theme-baby-blue': { display_name: 'الأزرق الفاتح', route: 'themes/2-baby-blue.html' },
    'theme-aurora-glass': { display_name: 'زجاج الشفق', route: 'themes/2-aurora-glass.html' },
    'theme-warda-pink': { display_name: 'الوردي الورد', route: 'themes/2-warda-pink.html' },
    // Backward-compatible names that were seeded in older DB versions.
    'theme-emerald': { display_name: 'التصميم الأخضر', route: 'themes/theme-2/2.html' },
    'theme-editorial': { display_name: 'التصميم التحريري', route: 'themes/theme-4/index.html' },
    'theme-saas': { display_name: 'التصميم الإبداعي', route: 'themes/theme-3/index.html' }
  };

  const state = { themes: [], user: null, profile: null, isAdmin: false };
  const $ = (s, r = document) => r.querySelector(s);
  const esc = v => String(v ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');

  function infoFor(t) {
    const key = String(t?.theme_key || '').trim();
    const map = THEME_MAP[key];
    if (map) return map;
    return { display_name: t?.display_name || key || 'سمة', route: t?.route || '2.html' };
  }

  function displayName(t) {
    const key = canonicalKey(String(t?.theme_key || '').trim());
    const raw = String(t?.display_name || '').trim();
    if (key === 'theme-2' && (raw === 'التصميم الإبداعي' || raw.startsWith('التصميم الإبداعي - نسخة'))) {
      return raw.replace(/^التصميم الإبداعي/, 'التصميم الأخضر');
    }
    if (key === 'theme-3' && (raw === 'التصميم الأخضر' || raw.startsWith('التصميم الأخضر - نسخة'))) {
      return raw.replace(/^التصميم الأخضر/, 'التصميم الإبداعي');
    }
    return raw || infoFor(t).display_name;
  }

  function canonicalRoute(t) {
    return infoFor(t).route;
  }

  function siteRootUrl() {
    const p = location.pathname || '/';
    const i = p.indexOf('/themes/');
    if (i >= 0) return new URL(p.slice(0, i + 1), location.origin);
    return new URL('./', document.baseURI);
  }

  function absRoute(route) { return new URL(route, siteRootUrl()).href; }

  function currentThemeKey() {
    const p = (location.pathname || '').replace(/\\/g, '/');
    if (p.includes('/themes/theme-1/')) return 'theme-1';
    if (p.includes('/themes/theme-2/')) return 'theme-2';
    if (p.includes('/themes/theme-3/')) return 'theme-3';
    if (p.includes('/themes/theme-4/')) return 'theme-4';
    if (p.includes('/themes/theme-5/')) return 'theme-5';
    if (p.includes('/themes/theme-6/')) return 'theme-6';
    if (p.includes('/themes/theme-7/')) return 'theme-7';
    if (p.includes('/themes/theme-8/')) return 'theme-8';
    if (p.includes('2-baby-blue.html') || p.endsWith('/2-baby-blue.html')) return 'theme-baby-blue';
    if (p.includes('2-aurora-glass.html') || p.endsWith('/2-aurora-glass.html')) return 'theme-aurora-glass';
    if (p.includes('2-warda-pink.html') || p.endsWith('/2-warda-pink.html')) return 'theme-warda-pink';
    return 'default';
  }

  function canonicalKey(key) {
    if (key === 'theme-emerald') return 'theme-2';
    if (key === 'theme-editorial') return 'theme-4';
    if (key === 'theme-saas') return 'theme-3';
    return key;
  }

  function normalizeThemeRow(row) {
    const key = canonicalKey(String(row?.theme_key || '').trim());
    const def = THEME_MAP[key];
    return { ...row, theme_key: key, route: def?.route || row?.route || '2.html' };
  }

  const toast = (msg, ok = true) => {
    let x = document.getElementById('midad-theme-toast');
    if (!x) {
      x = document.createElement('div');
      x.id = 'midad-theme-toast';
      x.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);z-index:100000;background:#111827;color:#fff;padding:12px 18px;border-radius:14px;box-shadow:0 15px 45px rgba(0,0,0,.2);opacity:0;transition:.25s;font:700 14px Cairo,sans-serif;direction:rtl';
      document.body.appendChild(x);
    }
    x.textContent = msg;
    x.style.border = '1px solid ' + (ok ? '#34d399' : '#f87171');
    requestAnimationFrame(() => { x.style.opacity = 1; x.style.transform = 'translateX(-50%) translateY(0)'; });
    clearTimeout(x._hideTimer);
    x._hideTimer = setTimeout(() => { x.style.opacity = 0; x.style.transform = 'translateX(-50%) translateY(20px)'; }, 2600);
  };

  async function session() {
    const { data } = await client.auth.getSession();
    return data?.session || null;
  }

  async function getProfile(uid) {
    const { data, error } = await client.from('profiles').select('*').eq('id', uid).maybeSingle();
    if (error) throw error;
    return data;
  }

  async function loadThemes() {
    const { data, error } = await client.from('platform_themes').select('*').order('sort_order', { ascending: true });
    if (error || !Array.isArray(data)) {
      state.themes = Object.entries(THEME_MAP)
        .filter(([k]) => ['default','theme-1','theme-2','theme-3','theme-4','theme-5','theme-6','theme-7','theme-8','theme-baby-blue','theme-aurora-glass','theme-warda-pink'].includes(k))
        .map(([theme_key, x], i) => ({ id: null, theme_key, display_name: x.display_name, sort_order: i + 1, route: x.route, is_active: true, is_default: theme_key === 'default' }));
      return state.themes;
    }
    state.themes = data.filter(x => x.is_active !== false).map(normalizeThemeRow).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    if (!state.themes.length) {
      state.themes = Object.entries(THEME_MAP)
        .filter(([k]) => ['default','theme-1','theme-2','theme-3','theme-4','theme-5','theme-6','theme-7','theme-8','theme-baby-blue','theme-aurora-glass','theme-warda-pink'].includes(k))
        .map(([theme_key, x], i) => ({ id: null, theme_key, display_name: x.display_name, sort_order: i + 1, route: x.route, is_active: true, is_default: theme_key === 'default' }));
    }
    return state.themes;
  }

  async function choose(uid) {
    try {
      const { data: pref } = await client.from('user_theme_preferences').select('theme_id').eq('user_id', uid).maybeSingle();
      const themes = await loadThemes();
      if (pref?.theme_id) {
        const t = themes.find(x => String(x.id) === String(pref.theme_id));
        if (t) return absRoute(canonicalRoute(t));
      }
      const t = themes.find(x => x.is_default) || themes[0];
      return absRoute(canonicalRoute(t));
    } catch (_) {
      return absRoute('2.html');
    }
  }
  window.midadChooseTheme = choose;

  async function init() {
    const s = await session();
    if (!s) return;
    state.user = s.user;
    state.profile = await getProfile(s.user.id).catch(() => null);
    state.isAdmin = ['admin', 'super_admin'].includes(state.profile?.role);
    await loadThemes();

    // Only assigned users are redirected. Admin previewing/switching themes is never redirected by this check.
    if (!state.isAdmin) {
      try {
        const { data: pref } = await client.from('user_theme_preferences').select('theme_id').eq('user_id', s.user.id).maybeSingle();
        if (pref?.theme_id) {
          const t = state.themes.find(x => String(x.id) === String(pref.theme_id));
          if (t) {
            const targetKey = canonicalKey(t.theme_key);
            const currentKey = currentThemeKey();
            if (targetKey !== currentKey) {
              location.replace(absRoute(canonicalRoute(t)));
              return;
            }
          }
        }
      } catch (_) {}
    }

    if (state.isAdmin) setupAdminUI();
    else await setupUserThemeButton();
  }

  function addThemeButton() {
    const host = document.querySelector('#app > header.header');
    if (!host) return false;
    const actions = host.querySelector('.header-actions');
    if (!actions) return false;

    // Put the button exactly where the user requested:
    // - Admin: immediately beside the administration button.
    // - Non-admin: immediately beside the platform owner button.
    const adminBtn = actions.querySelector('.admin-panel-trigger');
    const managerWrap = actions.querySelector('.manager-trigger-wrap');

    let b = document.getElementById('midadThemeButton');
    if (!b) {
      b = document.createElement('button');
      b.id = 'midadThemeButton';
      b.type = 'button';
      b.innerHTML = '<i class="fas fa-palette" aria-hidden="true"></i><span>سمات</span>';
      b.title = 'السمات';
      b.setAttribute('aria-label', 'السمات');
      b.onclick = (e) => {
        e.stopPropagation();
        openThemePicker(state.isAdmin ? 'admin' : 'user');
      };
      b.onmouseenter = () => { b.style.transform = 'translateY(-1px)'; };
      b.onmouseleave = () => { b.style.transform = ''; };
    }

    // Reset any old positioning injected by previous versions.
    b.style.cssText = [
      'position:relative',
      'left:auto',
      'top:auto',
      'transform:none',
      'z-index:20',
      'display:inline-flex',
      'align-items:center',
      'justify-content:center',
      'gap:7px',
      'min-width:88px',
      'height:40px',
      'padding:0 13px',
      'border:1px solid var(--border,#e2e8f0)',
      'background:var(--surface,#fff)',
      'color:var(--primary,#0ea5e9)',
      'border-radius:12px',
      'font:800 13px Cairo,sans-serif',
      'cursor:pointer',
      'box-shadow:0 4px 14px rgba(15,23,42,.08)',
      'transition:transform .18s,box-shadow .18s,border-color .18s',
      'direction:rtl',
      'white-space:nowrap',
      'flex:0 0 auto',
      'margin:0'
    ].join(';');

    // Admin: next to the admin control.
    // User/member/moderator: next to the owner control.
    if (state.isAdmin && adminBtn) {
      adminBtn.insertAdjacentElement('afterend', b);
    } else if (!state.isAdmin && managerWrap) {
      managerWrap.insertAdjacentElement('afterend', b);
    } else if (adminBtn) {
      adminBtn.insertAdjacentElement('afterend', b);
    } else {
      actions.appendChild(b);
    }

    return true;
  }

  function setupAdminUI() {
    addManageButton();
    const ensureHeaderButton = () => addThemeButton();
    if (!ensureHeaderButton()) {
      let attempts = 0;
      const timer = setInterval(() => {
        attempts += 1;
        if (ensureHeaderButton() || attempts >= 30) clearInterval(timer);
      }, 150);
    }
    injectPlusButtons();
    observeUsers();
  }

  async function setupUserThemeButton() {
    try {
      const { data: p } = await client.from('user_theme_preferences').select('themes_button_enabled').eq('user_id', state.user.id).maybeSingle();
      if (p?.themes_button_enabled) addThemeButton();
    } catch (_) {}
  }

  function addManageButton() {
    if (document.getElementById('midadThemeManage')) return;
    const btn = document.createElement('button');
    btn.id = 'midadThemeManage';
    btn.type = 'button';
    btn.textContent = 'إدارة السمات';
    btn.style.cssText = 'position:fixed;left:22px;bottom:20px;z-index:99990;border:0;background:linear-gradient(135deg,#0ea5e9,#7c3aed);color:#fff;padding:12px 17px;border-radius:14px;font:800 13px Cairo,sans-serif;box-shadow:0 12px 30px rgba(14,165,233,.25);cursor:pointer;direction:rtl';
    btn.onclick = () => openThemeManager();
    document.body.appendChild(btn);
  }

  function observeUsers() {
    if (window.__midadThemeUsersObserver) return;
    const obs = new MutationObserver(() => injectPlusButtons());
    window.__midadThemeUsersObserver = obs;
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(injectPlusButtons, 300);
    setTimeout(injectPlusButtons, 1000);
  }

  function injectPlusButtons() {
    if (!state.isAdmin) return;
    document.querySelectorAll('.um-user-card').forEach(card => {
      if (card.querySelector('[data-midad-theme-user]')) return;
      const uid = card.querySelector('[data-user-id]')?.getAttribute('data-user-id');
      if (!uid) return;
      const actions = card.querySelector('.um-card-actions') || card;
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-midad-theme-user', '1');
      b.setAttribute('aria-label', 'إعدادات السمات لهذا المستخدم');
      b.title = 'إعدادات السمات لهذا المستخدم';
      b.innerHTML = '<i class="fas fa-palette" aria-hidden="true"></i><span>سمات</span>';
      b.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:38px;padding:8px 12px;border-radius:12px;border:1px solid #bfdbfe;background:linear-gradient(180deg,#eff6ff,#e0f2fe);color:#0369a1;font:800 12px Cairo,sans-serif;cursor:pointer;box-shadow:0 3px 10px rgba(3,105,161,.08);transition:.2s;direction:rtl';
      b.onmouseenter = () => { b.style.transform = 'translateY(-2px)'; b.style.boxShadow = '0 7px 16px rgba(3,105,161,.14)'; };
      b.onmouseleave = () => { b.style.transform = ''; b.style.boxShadow = '0 3px 10px rgba(3,105,161,.08)'; };
      b.onclick = e => { e.stopPropagation(); openUserThemeMenu(uid); };
      actions.prepend(b);
    });
  }

  async function getUserPrefs(uid) {
    try {
      const { data, error } = await client.from('user_theme_preferences').select('*').eq('user_id', uid).maybeSingle();
      if (error) throw error;
      const { data: a } = data ? await client.from('user_allowed_themes').select('theme_id').eq('user_id', uid) : { data: [] };
      return { ...(data || {}), allowed: (a || []).map(x => String(x.theme_id)) };
    } catch (_) { return { allowed: [] }; }
  }

  async function saveUserPrefs(uid, pref, allowed) {
    let { data: old } = await client.from('user_theme_preferences').select('id').eq('user_id', uid).maybeSingle();
    const payload = { user_id: uid, ...pref };
    let err;
    if (old) ({ error: err } = await client.from('user_theme_preferences').update(payload).eq('id', old.id));
    else ({ error: err } = await client.from('user_theme_preferences').insert(payload));
    if (err) throw err;
    await client.from('user_allowed_themes').delete().eq('user_id', uid);
    if (pref.restricted_theme_selection && allowed.length) {
      const rows = allowed.map(id => ({ user_id: uid, theme_id: id }));
      const { error: e } = await client.from('user_allowed_themes').insert(rows);
      if (e) throw e;
    }
  }

  async function openUserThemeMenu(uid) {
    const [themes, pref] = await Promise.all([loadThemes(), getUserPrefs(uid)]);
    const box = document.createElement('div');
    box.className = 'midad-theme-overlay';
    box.innerHTML = `<div class="midad-theme-modal user-theme-modal"><div class="midad-theme-head"><div><b>سمات المستخدم</b><small>حدد شكل المنصة وصلاحيات زر السمات</small></div><button class="midad-x">×</button></div><div class="midad-theme-body">
      <label class="midad-label">1 — اختيار السمة</label><select id="mtUserTheme" class="midad-select"><option value="">استخدام السمة الافتراضية</option>${themes.map(t => `<option value="${esc(t.id)}" ${String(pref?.theme_id || '') === String(t.id) ? 'selected' : ''}>${esc(displayName(t))}</option>`).join('')}</select>
      <div class="midad-switch-row"><div><b>2 — إتاحة زر السمات</b><small>يظهر للمستخدم زر السمات كاملًا.</small></div><label class="midad-switch"><input id="mtBtn" type="checkbox" ${pref?.themes_button_enabled ? 'checked' : ''}><span></span></label></div>
      <div class="midad-switch-row"><div><b>3 — إتاحة زر السمات مع تحديد السمات</b><small>المستخدم يرى فقط السمات التي تختارها له.</small></div><label class="midad-switch"><input id="mtRestrict" type="checkbox" ${pref?.restricted_theme_selection ? 'checked' : ''}><span></span></label></div>
      <div id="mtAllowed" class="midad-allowed">${themes.map(t => `<label><input type="checkbox" value="${esc(t.id)}" ${pref?.allowed?.includes(String(t.id)) ? 'checked' : ''}> <span>${esc(displayName(t))}</span></label>`).join('')}</div>
      <button id="mtSave" class="midad-primary">حفظ إعدادات المستخدم</button></div></div>`;
    document.body.appendChild(box); addOverlayHandlers(box, () => box.remove());
    const restrict = $('#mtRestrict', box), allowed = $('#mtAllowed', box);
    const sync = () => { allowed.style.display = restrict.checked ? 'grid' : 'none'; };
    restrict.onchange = sync; sync();
    $('#mtSave', box).onclick = async () => {
      const themeId = $('#mtUserTheme', box).value || null;
      const button = $('#mtBtn', box).checked;
      const rest = restrict.checked;
      const checks = [...allowed.querySelectorAll('input:checked')].map(i => i.value);
      try {
        await saveUserPrefs(uid, { theme_id: themeId, themes_button_enabled: button, restricted_theme_selection: rest }, checks);
        box.remove(); toast('تم حفظ إعدادات السمات للمستخدم');
      } catch (e) { toast('تعذر حفظ إعدادات السمات', false); }
    };
  }

  function previewArt(t) {
    const k = canonicalKey(t?.theme_key || 'default');
    if (k === 'theme-1') return `<div class="midad-preview-art art-theme-1"><div class="pv-nav"><b></b><span></span><span></span><span></span></div><div class="pv-canvas"><div class="pv-hero"><i></i><i></i></div><div class="pv-cards"><i></i><i></i><i></i></div></div></div>`;
    if (k === 'theme-2') return `<div class="midad-preview-art art-theme-3"><div class="pv-top"><b></b><span></span><span></span><em></em></div><div class="pv-hero"><i></i><b></b></div><div class="pv-grid"><i></i><i></i><i></i></div></div>`;
    if (k === 'theme-3') return `<div class="midad-preview-art art-theme-2"><div class="pv-top"><b></b><span></span><span></span></div><div class="pv-layout"><div class="pv-side"><i></i><i></i><i></i></div><div class="pv-stack"><i></i><i></i></div></div></div>`;
    if (k === 'theme-4') return `<div class="midad-preview-art art-theme-4"><div class="pv-head"><b></b><span></span></div><div class="pv-editor"><div class="pv-paper"><i></i><i></i><i></i></div><div class="pv-column"><i></i><i></i></div></div></div>`;
    if (k === 'theme-5') return `<div class="midad-preview-art art-theme-5"><div class="pv-top"><b></b><span></span><span></span></div><div class="pv-frame"><div class="pv-side"><i></i><i></i></div><div class="pv-panel"><i></i><i></i><i></i></div></div></div>`;
    if (k === 'theme-6') return `<div class="midad-preview-art art-theme-6"><div class="pv-top"><b></b><span></span><em></em></div><div class="pv-banner"><i></i><b></b></div><div class="pv-grid"><i></i><i></i><i></i></div></div>`;
    if (k === 'theme-7') return `<div class="midad-preview-art art-theme-7"><div class="pv-top"><b></b><span></span><span></span></div><div class="pv-layout"><div class="pv-main"><i></i><i></i><i></i></div><div class="pv-side"><i></i><i></i></div></div></div>`;
    if (k === 'theme-8') return `<div class="midad-preview-art art-theme-8"><div class="pv-top"><b></b><span></span><span></span></div><div class="pv-banner"><i></i><b></b></div><div class="pv-cards"><i></i><i></i><i></i></div></div>`;
    return `<div class="midad-preview-art art-default"><div class="pv-top"><b></b><span></span><span></span></div><div class="pv-layout"><div class="pv-side"><i></i><i></i><i></i></div><div class="pv-main"><i></i><i></i><i></i></div></div></div>`;
  }

  async function openThemePicker(mode) {
    const themes = await loadThemes();
    let visible = themes;
    if (mode !== 'admin' && state.user) {
      try {
        const { data: p } = await client.from('user_theme_preferences').select('restricted_theme_selection').eq('user_id', state.user.id).maybeSingle();
        if (p?.restricted_theme_selection) {
          const { data: a } = await client.from('user_allowed_themes').select('theme_id').eq('user_id', state.user.id);
          const allowed = new Set((a || []).map(x => String(x.theme_id)));
          visible = themes.filter(t => allowed.has(String(t.id)));
        }
      } catch (_) {}
    }
    const modal = document.createElement('div');
    modal.className = 'midad-theme-overlay';
    const current = currentThemeKey();
    modal.innerHTML = `<div class="midad-theme-modal"><div class="midad-theme-head"><div><b>${mode === 'admin' ? 'سمات منصة مِداد' : 'سمات'}</b><small>${mode === 'admin' ? 'اختر السمة التي تريد عرضها الآن' : 'اختر من السمات المسموح بها لك'}</small></div><button class="midad-x">×</button></div><div class="midad-theme-grid">${visible.map(t => {
      const k = canonicalKey(t.theme_key);
      return `<button class="midad-theme-card ${k === current ? 'active' : ''}" data-theme-id="${esc(t.id)}">${previewArt(t)}<strong>${esc(displayName(t))}</strong>${t.is_default ? '<span class="midad-default">افتراضية</span>' : ''}</button>`;
    }).join('')}</div></div>`;
    document.body.appendChild(modal); addOverlayHandlers(modal, () => modal.remove());
    modal.querySelectorAll('[data-theme-id]').forEach(b => b.onclick = async () => {
      const id = b.dataset.themeId;
      const t = state.themes.find(x => String(x.id) === id);
      if (!t) return;
      if (mode === 'admin') await setOwnTheme(id);
      else {
        try {
          const { data: p } = await client.from('user_theme_preferences').select('restricted_theme_selection').eq('user_id', state.user.id).maybeSingle();
          if (p?.restricted_theme_selection) {
            const { data: a } = await client.from('user_allowed_themes').select('theme_id').eq('user_id', state.user.id);
            if (!(a || []).some(x => String(x.theme_id) === id)) { toast('هذه السمة غير متاحة لك', false); return; }
          }
        } catch (_) {}
      }
      location.href = absRoute(canonicalRoute(t));
    });
  }

  async function setOwnTheme(id) {
    const { data: old } = await client.from('user_theme_preferences').select('id').eq('user_id', state.user.id).maybeSingle();
    const payload = { user_id: state.user.id, theme_id: id, themes_button_enabled: true, restricted_theme_selection: false };
    if (old) await client.from('user_theme_preferences').update(payload).eq('id', old.id);
    else await client.from('user_theme_preferences').insert(payload);
  }

  async function deleteTheme(id, modal) {
    const t = state.themes.find(x => String(x.id) === String(id));
    if (!t) return;
    // الأصلية لا يمكن حذفها: الحذف مسموح للنسخ فقط.
    if (!t.parent_theme_id) {
      toast('لا يمكن حذف السمة الأصلية', false);
      return;
    }
    if (!confirm(`هل أنت متأكد من حذف السمة "${displayName(t)}"؟`)) return;
    const { error } = await client.from('platform_themes').delete().eq('id', id);
    if (error) {
      toast('تعذر حذف السمة', false);
      return;
    }
    state.themes = state.themes.filter(x => String(x.id) !== String(id));
    renderManagerModal(modal);
    toast('تم حذف السمة بنجاح');
  }

  async function openThemeManager() {
    const themes = await loadThemes();
    const modal = document.createElement('div');
    modal.className = 'midad-theme-overlay';
    modal.innerHTML = `<div class="midad-theme-modal manager-theme-modal"><div class="midad-theme-head"><div><b>إدارة السمات</b><small>ترتيب • تغيير الأسماء • تكرار • السمة الافتراضية</small></div><button class="midad-x">×</button></div><div class="midad-manager-default"><label>السمة الافتراضية للكل</label><select id="mtdDefault" class="midad-select">${themes.map(t => `<option value="${esc(t.id)}" ${t.is_default ? 'selected' : ''}>${esc(displayName(t))}</option>`).join('')}</select></div><div class="midad-theme-list">${themes.map((t, i) => `<div class="midad-theme-row" data-id="${esc(t.id)}"><span class="order">${i + 1}</span><div class="midad-row-preview ${esc(canonicalKey(t.theme_key))}">${previewArt(t)}</div><div class="midad-row-info"><b data-name>${esc(displayName(t))}</b><small>${esc(t.theme_key)}</small></div><div class="midad-row-actions"><button data-up>↑</button><button data-down>↓</button><button data-rename>تغيير</button><button data-dup>تكرار</button><button data-preview>معاينة</button><button data-delete style="color:#b91c1c;border-color:#fecaca;">حذف</button></div></div>`).join('')}</div></div>`;
    document.body.appendChild(modal); addOverlayHandlers(modal, () => modal.remove());
    $('#mtdDefault', modal).onchange = async e => { await setDefaultTheme(e.target.value); toast('تم تغيير السمة الافتراضية'); renderManagerModal(modal); };
    bindManagerRows(modal);
  }

  function bindManagerRows(modal) {
    modal.querySelectorAll('.midad-theme-row').forEach(row => {
      row.querySelector('[data-up]').onclick = () => moveTheme(row.dataset.id, -1, modal);
      row.querySelector('[data-down]').onclick = () => moveTheme(row.dataset.id, 1, modal);
      row.querySelector('[data-rename]').onclick = () => renameTheme(row.dataset.id, modal);
      row.querySelector('[data-dup]').onclick = () => duplicateTheme(row.dataset.id, modal);
      row.querySelector('[data-preview]').onclick = () => {
        const t = state.themes.find(x => String(x.id) === row.dataset.id);
        if (t) location.href = absRoute(canonicalRoute(t));
      };
      const deleteBtn = row.querySelector('[data-delete]');
      if (deleteBtn) deleteBtn.onclick = () => deleteTheme(row.dataset.id, modal);
    });
  }

  async function setDefaultTheme(id) {
    await client.from('platform_themes').update({ is_default: false }).neq('id', id);
    await client.from('platform_themes').update({ is_default: true }).eq('id', id);
    await loadThemes();
  }

  async function moveTheme(id, delta, modal) {
    const arr = [...state.themes];
    const i = arr.findIndex(x => String(x.id) === String(id));
    const j = i + delta;
    if (i < 0 || j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    for (let k = 0; k < arr.length; k++) await client.from('platform_themes').update({ sort_order: k + 1 }).eq('id', arr[k].id);
    state.themes = arr; renderManagerModal(modal);
  }

  async function renameTheme(id, modal) {
    const t = state.themes.find(x => String(x.id) === String(id));
    if (!t) return;
    const name = prompt('اكتب اسم السمة الجديد', displayName(t));
    if (!name || !name.trim()) return;
    const { error } = await client.from('platform_themes').update({ display_name: name.trim() }).eq('id', id);
    if (error) { toast('تعذر تغيير الاسم', false); return; }
    await loadThemes(); renderManagerModal(modal);
  }

  async function duplicateTheme(id, modal) {
    const t = state.themes.find(x => String(x.id) === String(id));
    if (!t) return;
    const max = Math.max(...state.themes.map(x => x.sort_order || 0), 0);
    const canonical = infoFor(t);
    const { error } = await client.from('platform_themes').insert({
      theme_key: t.theme_key,
      display_name: (displayName(t) || canonical.display_name || 'سمة') + ' - نسخة',
      sort_order: max + 1,
      is_active: true,
      is_default: false,
      parent_theme_id: t.id,
      route: canonical.route
    });
    if (error) { toast('تعذر تكرار السمة', false); return; }
    await loadThemes(); renderManagerModal(modal);
  }

  function renderManagerModal(modal) {
    const fresh = modal.querySelector('.midad-theme-list');
    if (!fresh) return;
    fresh.innerHTML = state.themes.map((t, i) => `<div class="midad-theme-row" data-id="${esc(t.id)}"><span class="order">${i + 1}</span><div class="midad-row-preview ${esc(canonicalKey(t.theme_key))}">${previewArt(t)}</div><div class="midad-row-info"><b>${esc(displayName(t))}</b><small>${esc(t.theme_key)}</small></div><div class="midad-row-actions"><button data-up>↑</button><button data-down>↓</button><button data-rename>تغيير</button><button data-dup>تكرار</button><button data-preview>معاينة</button><button data-delete style="color:#b91c1c;border-color:#fecaca;">حذف</button></div></div>`).join('');
    bindManagerRows(modal);
    const sel = $('#mtdDefault', modal);
    if (sel) sel.innerHTML = state.themes.map(t => `<option value="${esc(t.id)}" ${t.is_default ? 'selected' : ''}>${esc(displayName(t))}</option>`).join('');
  }

  function addOverlayHandlers(box, close) {
    box.querySelector('.midad-x')?.addEventListener('click', close);
    box.addEventListener('click', e => { if (e.target === box) close(); });
  }

  function installStyles() {
    if ($('#midadThemeStyles')) return;
    const s = document.createElement('style'); s.id = 'midadThemeStyles';
    s.textContent = `
      .header{position:relative}
      #midadThemeButton{pointer-events:auto}
      .midad-theme-overlay{position:fixed;inset:0;background:rgba(2,6,23,.62);backdrop-filter:blur(8px);z-index:99995;display:flex;align-items:center;justify-content:center;padding:18px;direction:rtl;animation:midadFade .2s ease}
      .midad-theme-modal{width:min(1040px,96vw);max-height:90vh;overflow:auto;background:var(--surface,#fff);color:var(--text,#0f172a);border:1px solid var(--border,#e2e8f0);border-radius:26px;box-shadow:0 30px 80px rgba(0,0,0,.25);padding:22px}
      .midad-theme-head{display:flex;align-items:center;justify-content:space-between;gap:15px;padding-bottom:14px;border-bottom:1px solid var(--border,#e2e8f0)}
      .midad-theme-head b{display:block;font:900 22px Cairo,sans-serif}.midad-theme-head small{display:block;margin-top:3px;color:var(--text-secondary,#64748b);font:600 12px Cairo,sans-serif}
      .midad-x{width:40px;height:40px;border:0;border-radius:12px;background:var(--surface-alt,#f1f5f9);font-size:25px;cursor:pointer}
      .midad-theme-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;padding-top:18px}
      .midad-theme-card{background:var(--surface,#fff);border:1px solid var(--border,#e2e8f0);border-radius:19px;padding:11px;text-align:right;cursor:pointer;position:relative;transition:.22s;box-shadow:0 5px 20px rgba(15,23,42,.05);font-family:Cairo,sans-serif}.midad-theme-card:hover,.midad-theme-card.active{transform:translateY(-3px);border-color:var(--primary,#0ea5e9);box-shadow:0 12px 28px rgba(15,23,42,.1)}
      .midad-preview-art{height:145px;border-radius:14px;overflow:hidden;border:1px solid rgba(0,0,0,.06);position:relative;box-shadow:inset 0 0 0 1px rgba(255,255,255,.35)}
      .midad-preview-art *{box-sizing:border-box}.midad-preview-art b,.midad-preview-art span,.midad-preview-art em,.midad-preview-art i{display:block}
      .art-default{background:#eef5fb;padding:9px}.art-default .pv-top,.art-theme-2 .pv-top,.art-theme-3 .pv-top,.art-theme-5 .pv-top,.art-theme-7 .pv-top,.art-theme-8 .pv-top{height:18px;border-radius:6px;background:#fff;border:1px solid #dbe5ef;display:flex;align-items:center;gap:5px;padding:0 6px}.art-default .pv-top b{width:20px;height:7px;border-radius:4px;background:#0ea5e9;margin-left:auto}.art-default .pv-top span,.art-theme-2 .pv-top span,.art-theme-3 .pv-top span,.art-theme-5 .pv-top span,.art-theme-7 .pv-top span,.art-theme-8 .pv-top span{width:16px;height:5px;border-radius:4px;background:#d7e7f4}.art-default .pv-layout{display:grid;grid-template-columns:38px 1fr;gap:7px;margin-top:7px;height:102px}.art-default .pv-side{background:#fff;border:1px solid #dce8f1;border-radius:8px;padding:6px}.art-default .pv-side i{height:7px;border-radius:4px;background:#d9edf9;margin-bottom:7px}.art-default .pv-side i:first-child{background:#0ea5e9}.art-default .pv-main{display:grid;grid-template-columns:repeat(3,1fr);gap:5px}.art-default .pv-main i{height:60px;border-radius:7px;background:#fff;border:1px solid #dbe5ef}
      .art-theme-1{background:#eef4fb;padding:9px}.art-theme-1 .pv-nav{height:22px;border-radius:7px;background:#2f5da8;display:flex;align-items:center;gap:5px;padding:0 7px}.art-theme-1 .pv-nav b{width:22px;height:8px;border-radius:4px;background:#e7c877}.art-theme-1 .pv-nav span{width:12px;height:5px;border-radius:4px;background:#a9c0e5}.art-theme-1 .pv-nav span:last-child{margin-right:auto}.art-theme-1 .pv-canvas{margin-top:8px}.art-theme-1 .pv-hero{display:flex;justify-content:space-between;gap:8px;background:#fff;border:1px solid #cbd8e8;border-radius:8px;padding:8px;height:45px}.art-theme-1 .pv-hero i{height:9px;border-radius:4px;background:#2f5da8;flex:1}.art-theme-1 .pv-hero i:last-child{max-width:35%;background:#e7c877}.art-theme-1 .pv-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:7px}.art-theme-1 .pv-cards i{height:57px;border-radius:8px;background:#fff;border:1px solid #cbd5e1}
      .art-theme-2{background:linear-gradient(145deg,#eef4ff,#fdf2ff);padding:9px}.art-theme-2 .pv-top{background:linear-gradient(90deg,#6366f1,#ec4899);border:0}.art-theme-2 .pv-top b{width:26px;height:7px;border-radius:4px;background:#fff;margin-left:auto}.art-theme-2 .pv-top em{width:18px;height:8px;border-radius:4px;background:#fff}.art-theme-2 .pv-hero{height:45px;margin-top:8px;background:#fff;border:1px solid #c7d2fe;border-radius:8px;display:grid;grid-template-columns:1fr 34px;gap:7px;padding:7px}.art-theme-2 .pv-hero i{height:7px;background:#6366f1;border-radius:4px}.art-theme-2 .pv-hero i:after{content:'';display:block;width:74%;height:7px;background:#ec4899;border-radius:4px;margin-top:9px}.art-theme-2 .pv-hero b{background:linear-gradient(145deg,#dfe3ff,#ffdbea);border-radius:7px}.art-theme-2 .pv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:7px}.art-theme-2 .pv-grid i{height:58px;background:#fff;border:1px solid #c7d2fe;border-radius:8px}
      .art-theme-3{background:#eafaf3;padding:9px}.art-theme-3 .pv-top{background:#0f766e;border:0}.art-theme-3 .pv-top b{width:25px;height:7px;background:#d9f99d;border-radius:4px;margin-left:auto}.art-theme-3 .pv-layout{display:grid;grid-template-columns:1fr 60px;gap:7px;margin-top:8px}.art-theme-3 .pv-side{background:#fff;border:1px solid #99f6e4;border-radius:8px;padding:7px}.art-theme-3 .pv-side i{height:8px;background:#d8f7ef;border-radius:4px;margin-bottom:7px}.art-theme-3 .pv-side i:first-child{background:#0f766e}.art-theme-3 .pv-stack i{height:43px;background:#fff;border:1px solid #99f6e4;border-radius:8px;margin-bottom:7px}.art-theme-3 .pv-stack i:last-child{height:35px;background:#dff7ef}
      .art-theme-4{background:#f7f4ee;padding:9px}.art-theme-4 .pv-head{height:26px;border-bottom:2px solid #1a1a1a;display:flex;align-items:center}.art-theme-4 .pv-head b{width:35%;height:7px;background:#1a1a1a}.art-theme-4 .pv-head span{margin-right:auto;width:20%;height:5px;background:#cfc8bb}.art-theme-4 .pv-editor{display:grid;grid-template-columns:1fr 70px;gap:8px;margin-top:8px}.art-theme-4 .pv-paper{height:91px;background:#fff;border:1px solid #d6d0c5;border-radius:3px;padding:8px}.art-theme-4 .pv-paper i{height:5px;background:#2b2b2b;margin-bottom:6px}.art-theme-4 .pv-paper i:nth-child(2){width:78%;background:#7b7b7b}.art-theme-4 .pv-paper i:nth-child(3){width:55%;background:#b2aea7}.art-theme-4 .pv-column i{height:41px;background:#fff;border:1px solid #d6d0c5;margin-bottom:7px}.art-theme-4 .pv-column i:last-child{background:#1a1a1a}
      .art-theme-5{background:#eef1f4;padding:9px}.art-theme-5 .pv-top{background:#3b4a5a;border:0}.art-theme-5 .pv-top b{width:24px;height:7px;border-radius:4px;background:#f1c75b;margin-left:auto}.art-theme-5 .pv-frame{display:grid;grid-template-columns:54px 1fr;gap:7px;margin-top:8px}.art-theme-5 .pv-side i{height:40px;background:#f5f7f9;border:1px solid #c4cdd6;border-radius:6px;margin-bottom:7px}.art-theme-5 .pv-panel{height:87px;background:#fff;border:1px solid #aeb9c4;border-radius:8px;padding:7px}.art-theme-5 .pv-panel i{height:8px;background:#3b4a5a;border-radius:4px;margin-bottom:8px}.art-theme-5 .pv-panel i:nth-child(2){width:72%;background:#d8a940}.art-theme-5 .pv-panel i:nth-child(3){width:52%;background:#97a3ad}
      .art-theme-6{background:#edf3fb;padding:9px}.art-theme-6 .pv-top{height:20px;border-radius:6px;background:#2a578e;display:flex;align-items:center;gap:6px;padding:0 7px}.art-theme-6 .pv-top b{width:25px;height:7px;background:#f2d071;border-radius:4px;margin-left:auto}.art-theme-6 .pv-top span{width:13px;height:5px;background:#a9c2df}.art-theme-6 .pv-top em{width:18px;height:8px;background:#f2d071;border-radius:4px}.art-theme-6 .pv-banner{height:38px;margin-top:8px;background:#fff;border:1px solid #b9cae0;border-radius:8px;padding:7px}.art-theme-6 .pv-banner i{height:7px;background:#2a578e;border-radius:4px;width:75%}.art-theme-6 .pv-banner b{display:block;width:35%;height:6px;background:#f2d071;border-radius:4px;margin-top:8px}.art-theme-6 .pv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:7px}.art-theme-6 .pv-grid i{height:57px;background:#fff;border:1px solid #b9cae0;border-radius:8px}
      .art-theme-7{background:#e7f3ed;padding:9px}.art-theme-7 .pv-top{background:#1f6e52;border:0}.art-theme-7 .pv-top b{width:24px;height:7px;background:#d8f4e3;border-radius:4px;margin-left:auto}.art-theme-7 .pv-layout{display:grid;grid-template-columns:1fr 62px;gap:7px;margin-top:8px}.art-theme-7 .pv-main{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.art-theme-7 .pv-main i{height:67px;background:#fff;border:1px solid #9bd3bb;border-radius:8px}.art-theme-7 .pv-side i{height:31px;background:#d9eee4;border:1px solid #9bd3bb;border-radius:7px;margin-bottom:7px}.art-theme-7 .pv-side i:last-child{height:41px;background:#fff}
      .art-theme-8{background:#f8ebee;padding:9px}.art-theme-8 .pv-top{background:#7a2e42;border:0}.art-theme-8 .pv-top b{width:25px;height:7px;background:#f2d3a7;border-radius:4px;margin-left:auto}.art-theme-8 .pv-banner{height:38px;margin-top:8px;background:#fff;border:1px solid #dfbdc6;border-radius:8px;padding:7px}.art-theme-8 .pv-banner i{height:7px;background:#7a2e42;border-radius:4px}.art-theme-8 .pv-banner b{display:block;width:62%;height:6px;background:#d6b178;border-radius:4px;margin-top:8px}.art-theme-8 .pv-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:7px}.art-theme-8 .pv-cards i{height:57px;background:#fff;border:1px solid #dfbdc6;border-radius:8px}
      .midad-theme-card>strong{display:block;margin-top:9px;font:800 14px Cairo}.midad-default{display:inline-block;margin-top:5px;padding:3px 8px;border-radius:99px;background:#ecfdf5;color:#047857;font:800 10px Cairo}
      .midad-primary{width:100%;margin-top:18px;padding:12px;border:0;border-radius:13px;background:linear-gradient(135deg,#0ea5e9,#7c3aed);color:#fff;font:900 14px Cairo;cursor:pointer}.midad-select{width:100%;padding:11px 13px;border-radius:12px;border:1px solid var(--border,#e2e8f0);background:var(--surface,#fff);font:700 13px Cairo;color:inherit;direction:rtl}
      .midad-switch-row{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:13px 0;border-bottom:1px dashed var(--border,#e2e8f0)}.midad-switch-row b{display:block;font:800 14px Cairo}.midad-switch-row small{display:block;color:var(--text-secondary,#64748b);font:600 11px Cairo;margin-top:3px}.midad-switch input{display:none}.midad-switch span{display:block;width:52px;height:30px;border-radius:99px;background:#cbd5e1;position:relative;cursor:pointer;transition:.2s}.midad-switch span:after{content:'';position:absolute;top:3px;right:3px;width:24px;height:24px;background:#fff;border-radius:50%;transition:.2s;box-shadow:0 2px 6px rgba(0,0,0,.15)}.midad-switch input:checked+span{background:#0ea5e9}.midad-switch input:checked+span:after{right:25px}.midad-allowed{display:none;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:12px;padding:12px;background:var(--surface-alt,#f8fafc);border-radius:14px}.midad-allowed label{padding:8px 10px;border:1px solid var(--border,#e2e8f0);border-radius:11px;font:700 12px Cairo;background:var(--surface,#fff)}
      .midad-manager-default{display:flex;align-items:center;gap:12px;padding:16px 0}.midad-manager-default label{font:800 13px Cairo;white-space:nowrap}.midad-theme-list{display:grid;gap:10px}.midad-theme-row{display:grid;grid-template-columns:36px 112px minmax(0,1fr) auto;align-items:center;gap:12px;padding:10px;border:1px solid var(--border,#e2e8f0);border-radius:16px;background:var(--surface-alt,#f8fafc)}.midad-row-preview{width:112px;height:58px;border-radius:11px;overflow:hidden}.midad-row-preview .midad-preview-art{height:58px;border:0;border-radius:11px}.midad-row-info b{font:800 13px Cairo}.midad-row-info small{display:block;color:var(--text-secondary,#64748b);font:600 10px monospace;direction:ltr;text-align:right}.midad-row-actions{display:flex;gap:6px;flex-wrap:wrap}.midad-row-actions button{border:1px solid var(--border,#e2e8f0);background:var(--surface,#fff);border-radius:10px;padding:7px 9px;font:800 11px Cairo;cursor:pointer}.midad-label{display:block;margin:16px 0 8px;font:900 13px Cairo}
      @keyframes midadFade{from{opacity:0;transform:scale(.985)}to{opacity:1;transform:scale(1)}}
      @media(max-width:900px){#midadThemeButton{padding:8px 12px}.midad-theme-grid{grid-template-columns:repeat(2,1fr)}.midad-theme-row{grid-template-columns:30px 100px minmax(0,1fr) auto}.midad-row-preview{width:100px}.midad-row-preview .midad-preview-art{height:54px}}
      @media(max-width:650px){#midadThemeButton{font-size:12px;padding:7px 11px}.midad-theme-grid{grid-template-columns:1fr}.midad-theme-modal{padding:16px;border-radius:20px}.midad-theme-row{grid-template-columns:28px 1fr}.midad-row-preview{display:none}.midad-row-actions{grid-column:2}.midad-theme-head b{font-size:19px}.midad-manager-default{display:block}.midad-manager-default label{display:block;margin-bottom:7px}.midad-allowed{grid-template-columns:1fr}}
    `;
    document.head.appendChild(s);
  }

  document.addEventListener('DOMContentLoaded', () => { installStyles(); setTimeout(init, 80); });
})();
