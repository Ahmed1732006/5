
        // ════════════════════════════════════════════════════════════════════
        //  STATE
        // ════════════════════════════════════════════════════════════════════

        const state = {
            view: 'login', // login | home | section | subsection | profile | users
            role: null, // 'admin' | 'member'
            currentSectionId: null,
            currentSubId: null,
            user: {
                name: 'عضو',
                email: '',
                phone: '',
                avatar: null,
                isOwnerAdmin: false
            },
            sections: [],
            users: [],
            userRequests: [],
            adminMessages: [],
            pendingUserMessages: [],
            usersLoading: false,
            usersSearch: '',
            usersFilter: 'all',
            selectedUserId: null,
            modal: null,
            confirm: null
        };

        // ════════════════════════════════════════════════════════════════════
        //  DATA — 7 sections, each with 2 subs, each with items
        // ════════════════════════════════════════════════════════════════════

        function getDefaultSections() {
            return [{
                id: 'sec-1',
                name: 'الرياضيات',
                icon: 'fa-calculator',
                image: null,
                subs: [{
                    id: 'sub-1-1',
                    name: 'الجبر',
                    image: null,
                    items: [
                        { id: 'it-1-1-1', name: 'المعادلات الخطية', image: null, fileName: 'جبر_المعادلات.pdf',
                            fileData: null },
                        { id: 'it-1-1-2', name: 'الدوال والمتباينات', image: null, fileName: null,
                            fileData: null }
                    ]
                }, {
                    id: 'sub-1-2',
                    name: 'الهندسة',
                    image: null,
                    items: [
                        { id: 'it-1-2-1', name: 'المثلثات', image: null, fileName: null, fileData: null },
                        { id: 'it-1-2-2', name: 'الدائرة', image: null, fileName: null, fileData: null }
                    ]
                }]
            }, {
                id: 'sec-2',
                name: 'الفيزياء',
                icon: 'fa-atom',
                image: null,
                subs: [{
                    id: 'sub-2-1',
                    name: 'الميكانيكا',
                    image: null,
                    items: [
                        { id: 'it-2-1-1', name: 'الحركة والقوى', image: null, fileName: null, fileData: null }
                    ]
                }, {
                    id: 'sub-2-2',
                    name: 'الكهرباء',
                    image: null,
                    items: [
                        { id: 'it-2-2-1', name: 'التيار والدوائر', image: null, fileName: null,
                        fileData: null }
                    ]
                }]
            }, {
                id: 'sec-3',
                name: 'الكيمياء',
                icon: 'fa-flask',
                image: null,
                subs: [{
                    id: 'sub-3-1',
                    name: 'الكيمياء العضوية',
                    image: null,
                    items: [
                        { id: 'it-3-1-1', name: 'الألكانات والألكينات', image: null, fileName: null,
                            fileData: null }
                    ]
                }, {
                    id: 'sub-3-2',
                    name: 'الكيمياء غير العضوية',
                    image: null,
                    items: [
                        { id: 'it-3-2-1', name: 'الأملاح والأكاسيد', image: null, fileName: null,
                            fileData: null }
                    ]
                }]
            }, {
                id: 'sec-4',
                name: 'الأحياء',
                icon: 'fa-dna',
                image: null,
                subs: [{
                    id: 'sub-4-1',
                    name: 'الخلية',
                    image: null,
                    items: [
                        { id: 'it-4-1-1', name: 'بنية الخلية', image: null, fileName: null, fileData: null }
                    ]
                }, {
                    id: 'sub-4-2',
                    name: 'الوراثة',
                    image: null,
                    items: [
                        { id: 'it-4-2-1', name: 'DNA والجينات', image: null, fileName: null, fileData: null }
                    ]
                }]
            }, {
                id: 'sec-5',
                name: 'اللغة العربية',
                icon: 'fa-book',
                image: null,
                subs: [{
                    id: 'sub-5-1',
                    name: 'النحو',
                    image: null,
                    items: [
                        { id: 'it-5-1-1', name: 'المبتدأ والخبر', image: null, fileName: null, fileData: null }
                    ]
                }, {
                    id: 'sub-5-2',
                    name: 'البلاغة',
                    image: null,
                    items: [
                        { id: 'it-5-2-1', name: 'التشبيه والاستعارة', image: null, fileName: null,
                            fileData: null }
                    ]
                }]
            }, {
                id: 'sec-6',
                name: 'اللغة الإنجليزية',
                icon: 'fa-language',
                image: null,
                subs: [{
                    id: 'sub-6-1',
                    name: 'القواعد',
                    image: null,
                    items: [
                        { id: 'it-6-1-1', name: 'الأزمنة الأساسية', image: null, fileName: null,
                        fileData: null }
                    ]
                }, {
                    id: 'sub-6-2',
                    name: 'المحادثة',
                    image: null,
                    items: [
                        { id: 'it-6-2-1', name: 'المصطلحات اليومية', image: null, fileName: null,
                            fileData: null }
                    ]
                }]
            }, {
                id: 'sec-7',
                name: 'التاريخ',
                icon: 'fa-landmark',
                image: null,
                subs: [{
                    id: 'sub-7-1',
                    name: 'العصر القديم',
                    image: null,
                    items: [
                        { id: 'it-7-1-1', name: 'الحضارات القديمة', image: null, fileName: null,
                            fileData: null }
                    ]
                }, {
                    id: 'sub-7-2',
                    name: 'العصر الحديث',
                    image: null,
                    items: [
                        { id: 'it-7-2-1', name: 'الحرب العالمية الأولى', image: null, fileName: null,
                            fileData: null }
                    ]
                }]
            }];
        }

        // ════════════════════════════════════════════════════════════════════
        //  HELPERS
        // ════════════════════════════════════════════════════════════════════

        let _uid = 1;

        function uid() { return 'id' + (_uid++); }

        function findSection(id) { return state.sections.find(s => s.id === id); }

        function findSub(sectionId, subId) {
            const sec = findSection(sectionId);
            if (!sec) return null;
            return sec.subs.find(s => s.id === subId);
        }

        function findItem(sectionId, subId, itemId) {
            const sub = findSub(sectionId, subId);
            if (!sub) return null;
            return sub.items.find(i => i.id === itemId);
        }

        // ════════════════════════════════════════════════════════════════════
        // SUPABASE / AUTH
        // ════════════════════════════════════════════════════════════════════
        const SUPABASE_URL = "https://clobfjrjhdysmqhbwzlc.supabase.co";
        const SUPABASE_KEY = "sb_publishable_LEFYVl0Y8VOnMIbBZev1Vg_0pYSMWpv";
        const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        let authReady = false;

        function isAdmin() { return state.role === 'admin' || state.role === 'super_admin'; }
        function isOwnerAdmin() { return !!state.user?.isOwnerAdmin; }

        function go(view, opts = {}) {
            state.view = view;
            if (opts.sectionId !== undefined) state.currentSectionId = opts.sectionId;
            if (opts.subId !== undefined) state.currentSubId = opts.subId;
            render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function publicStorageUrl(bucket, path) {
            if (!path) return null;
            if (/^https?:\/\//i.test(path) || /^data:/i.test(path)) return path;
            const { data } = sb.storage.from(bucket).getPublicUrl(path);
            return data?.publicUrl || path;
        }

        async function loadData() {
            const [catsRes, subsRes, matsRes, catAccessRes, subAccessRes, matAccessRes] = await Promise.all([
                sb.from('categories').select('*').eq('is_active', true).order('sort_order', {ascending:true}),
                sb.from('subcategories').select('*').order('sort_order', {ascending:true}),
                sb.from('materials').select('*').eq('is_active', true).order('sort_order', {ascending:true}),
                isAdmin() ? sb.from('category_user_access').select('*') : Promise.resolve({data:[],error:null}),
                isAdmin() ? sb.from('subcategory_user_access').select('*') : Promise.resolve({data:[],error:null}),
                isAdmin() ? sb.from('material_user_access').select('*') : Promise.resolve({data:[],error:null})
            ]);
            if (catsRes.error) throw catsRes.error;
            if (subsRes.error) throw subsRes.error;
            if (matsRes.error) throw matsRes.error;
            if (catAccessRes.error) throw catAccessRes.error;
            if (subAccessRes.error) throw subAccessRes.error;
            if (matAccessRes.error) throw matAccessRes.error;

            const cats = catsRes.data || [], subs = subsRes.data || [], mats = matsRes.data || [];
            const catAccessRows = catAccessRes.data || [], subAccessRows = subAccessRes.data || [], accessRows = matAccessRes.data || [];
            state.sections = cats.map(c => ({
                id: String(c.id), dbId: c.id, name: c.name || 'بدون اسم',
                icon: c.icon || 'fa-folder',
                image: publicStorageUrl('categories', c.image_path || c.image_url || c.image_path_public),
                visibilityMode: c.visibility_mode || 'all', ownerId: c.owner_id || null,
                allowedUsers: catAccessRows.filter(a=>a.access_type==='allow' && String(a.category_id)===String(c.id)).map(a=>String(a.user_id)),
                excludedUsers: catAccessRows.filter(a=>a.access_type==='deny' && String(a.category_id)===String(c.id)).map(a=>String(a.user_id)),
                subs: subs.filter(s => String(s.category_id) === String(c.id)).map(s => ({
                    id: String(s.id), dbId: s.id, name: s.name || 'بدون اسم',
                    image: publicStorageUrl('subcategories', s.image_path || s.image_url || s.image_path_public),
                    visibilityMode: s.visibility_mode || 'all', ownerId: s.owner_id || null,
                    allowedUsers: subAccessRows.filter(a=>a.access_type==='allow' && String(a.subcategory_id)===String(s.id)).map(a=>String(a.user_id)),
                    excludedUsers: subAccessRows.filter(a=>a.access_type==='deny' && String(a.subcategory_id)===String(s.id)).map(a=>String(a.user_id)),
                    items: mats.filter(m => String(m.subcategory_id) === String(s.id)).map(m => ({
                        id: String(m.id), dbId: m.id, name: m.title || 'بدون اسم',
                        image: publicStorageUrl('materials', m.image_path || m.image_url || m.image_path_public),
                        fileName: m.title || null, fileData: m.file_path || null, filePath: m.file_path || null,
                        visibilityMode: m.visibility_mode || 'all', ownerId: m.owner_id || null,
                        allowedUsers: accessRows.filter(a=>a.access_type==='allow' && String(a.material_id)===String(m.id)).map(a=>String(a.user_id)),
                        excludedUsers: accessRows.filter(a=>a.access_type==='deny' && String(a.material_id)===String(m.id)).map(a=>String(a.user_id))
                    }))
                }))
            }));
        }

        // القاعدة هي مصدر البيانات؛ لا نرجع إلى localStorage للمواد والأقسام.
        function saveData() { return Promise.resolve(); }

        function safeFileName(name){
            return String(name||'file').replace(/[^\w.\-\u0600-\u06FF ]+/g,'_').replace(/\s+/g,'_').slice(0,120);
        }

        async function uploadFile(bucket,file,folder='uploads'){
            if(!file) return null;
            if(!(file instanceof File)) throw new Error('ملف الرفع غير صالح.');
            const path=`${folder}/${crypto.randomUUID()}_${safeFileName(file.name||'file')}`;
            const {error}=await sb.storage.from(bucket).upload(path,file,{upsert:false,cacheControl:'3600',contentType:file.type||'application/octet-stream'});
            if(error) throw new Error(`فشل رفع الملف إلى Storage: ${error.message}`);
            return path;
        }

        async function uploadImageIfNeeded(dataUrlOrUrl,bucket,folder,name='image.png',fileObj=null){
            if(fileObj) return uploadFile(bucket,fileObj,folder);
            return dataUrlOrUrl||null;
        }

        async function downloadMaterial(item) {
            const path = item?.filePath || item?.fileData;
            if (!path) return showToast('لا يوجد ملف لهذه المادة', 'error');
            if (/^https?:\/\//i.test(path)) {
                window.open(path, '_blank', 'noopener');
                return;
            }
            try {
                const { data, error } = await sb.storage.from('materials').createSignedUrl(path, 300);
                if (error) throw error;
                window.open(data.signedUrl, '_blank', 'noopener');
            } catch (e) {
                showToast(e.message || 'تعذّر تحميل الملف', 'error');
            }
        }

        function downloadFile(data, name) {
            if (!data) return;
            const link = document.createElement('a');
            link.href = data;
            link.download = name || 'download';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        function showToast(msg, type = 'info') {
            const el = document.getElementById('toast');
            el.textContent = msg;
            el.className = 'toast ' + type;
            void el.offsetWidth;
            el.classList.add('show');
            clearTimeout(el._timer);
            el._timer = setTimeout(() => {
                el.classList.remove('show');
            }, 3000);
        }

        // ════════════════════════════════════════════════════════════════════
        //  MODAL / CONFIRM
        // ════════════════════════════════════════════════════════════════════

        function openModal(kind, data = {}) {
            state.modal = { kind, imageFile:null, fileFile:null, avatarFile:null, ...data };
            render();
        }

        function closeModal() { state.modal = null;
            render(); }

        function askConfirm(message, onYes, options = {}) {
            state.confirm = { message, onYes, confirmLabel: options.confirmLabel || 'تأكيد', confirmClass: options.confirmClass || 'btn-danger' };
            render();
        }

        function closeConfirm() { state.confirm = null;
            render(); }

        // ════════════════════════════════════════════════════════════════════
        //  RENDER
        // ════════════════════════════════════════════════════════════════════

        function render() {
            const app = document.getElementById('app');

            if (state.view === 'login') {
                app.innerHTML = renderLogin();
            } else {
                app.innerHTML = renderHeader() + renderMain();
            }

            if (state.modal) app.innerHTML += renderModal();
            if (state.confirm) app.innerHTML += renderConfirm();

            attachEvents();
        }

        // ─── Login ───

        function renderLogin() {
            return `<div class="login-wrap"><div class="login-brand">محاضرات</div><div class="login-sub">جارٍ التحقق من تسجيل الدخول...</div></div>`;
        }

        // ─── Header ───

        function renderHeader() {
            const u = state.user;
            const initial = u.name ? u.name.charAt(0).toUpperCase() : '?';
            const avatarHtml = u.avatar ?
                `<img src="${u.avatar}" alt="avatar" />` :
                initial;

            return `
            <header class="header">
              <div class="header-brand" data-act="go-home">
                <span class="mark">محاضرات</span>
              </div>
              <div class="header-actions">
                ${isAdmin() ? `<button type="button" class="admin-panel-trigger" data-act="open-admin-panel" title="إدارة المستخدمين" aria-label="إدارة المستخدمين"><i class="fas fa-users-cog"></i></button>` : ''}
                <button type="button" class="profile-trigger" data-act="open-profile" aria-label="فتح الملف الشخصي">
                  <div class="avatar">${avatarHtml}</div>
                  <span class="pname">${u.name || 'عضو'}</span>
                  <i class="fas fa-chevron-left pchevron"></i>
                </button>
              </div>
            </header>`;
        }

        // ─── Main ───

        function renderMain() {
            if (state.view === 'home') return renderHome();
            if (state.view === 'section') return renderSection();
            if (state.view === 'subsection') return renderSubsection();
            if (state.view === 'profile') return renderProfilePage();
            if (state.view === 'users') return renderUsersManagement();
            return '';
        }

        // ─── Home ───

        function renderHome() {
            const sections = state.sections;
            const isAdminRole = isAdmin();

            let cards = sections.map((s, i) => {
                const delay = 'stagger-' + ((i % 7) + 1);
                const hasImage = s.image && s.image.length > 0;
                const imgStyle = hasImage ? `background-image:url(${s.image})` : '';
                const placeholderClass = hasImage ? '' : 'placeholder';
                const titleClass = hasImage ? '' : 'dark';
                const adminActions = isAdminRole ? `
                  <div class="card-admin-actions">
                    <button data-act="edit-section" data-section="${s.id}" title="تعديل" data-stop-prop="1"><i class="fas fa-edit"></i></button>
                    <button class="danger" data-act="delete-section" data-section="${s.id}" title="حذف" data-stop-prop="1"><i class="fas fa-trash"></i></button>
                  </div>` : '';
                return `
              <div class="box-card anim-fade-up ${delay}" data-act="open-section" data-section="${s.id}">
                ${adminActions}
                <div class="card-image ${placeholderClass}" style="${imgStyle}">
                  ${!hasImage ? '<i class="fas fa-folder"></i>' : ''}
                </div>
                <div class="card-title ${titleClass}">${s.name || 'بدون اسم'}</div>
              </div>`;
            }).join('');

            if (isAdminRole) {
                cards += `
              <div class="box-card add-card anim-fade-up stagger-7" data-act="add-section">
                <div class="add-content">
                  <i class="fas fa-plus"></i>
                  <span>إضافة قسم جديد</span>
                </div>
              </div>`;
            }

            const welcomeAvatar = state.user.avatar
                ? `<img src="${escapeHtml(state.user.avatar)}" alt="صورة الملف الشخصي">`
                : escapeHtml((state.user.name || 'ع').trim().charAt(0).toUpperCase());
            const greetingOptions = [
                'أهلاً بيك', 'يا هلا بيك', 'نورت المنصة', 'نورتنا النهارده', 'يا مرحبًا بيك',
                'إيه الأخبار؟ 😄', 'عامل إيه؟', 'أخبارك إيه؟', 'الدنيا معاك إيه؟', 'طمني عليك 😄',
                'كلّه تمام؟', 'إزيّك؟ نورتنا 👋', 'حمد لله على السلامة 😄', 'يا أهلاً وسهلاً',
                'نورت مكانك ✨', 'حلو إنك جيت', 'رجعت تنور تاني ✨', 'منور المكان',
                'نورت يا بطل 🌟', 'نورت يا نجم ⭐', 'يا مرحبًا باللي جانا 😄', 'أهو جيت في وقتك 😄',
                'يلا بينا نبدأ 🚀', 'يلا ننجز شوية 📚', 'خلينا نكمل اللي بدأناه 🔥', 'جاهز نبدأ؟ 🚀',
                'جاهزة نبدأ؟ 🚀', 'مستنيينك من بدري 😄', 'نورتنا يا صاحبي 👋', 'نورتنا يا صديقي ✨',
                'نورتنا يا جميل 🌷', 'يا أهلاً بالناس الحلوة 😄', 'حلو إنك موجود', 'وجودك منور ✨',
                'يلا ناخدها واحدة واحدة 😌', 'خد نفس كده ونبدأ 😌', 'خلينا نعمل حاجة حلوة النهارده ✨',
                'مستعدين نكمل؟ 😄', 'يلا نخلّي اليوم أحسن ✨', 'شد حيلك ونبدأ 💪', 'وقت الإنجاز جه 📚',
                'تعالى ننجز اللي علينا 😄', 'نبدأ منين النهارده؟ 🤔', 'يلا نكمل سوا 🤝', 'خلينا نركز شوية 😎',
                'مبسوطين إنك جيت ✨', 'أهلاً بيك من جديد', 'منور يا صديقي 💙', 'منور يا صاحبي 💙',
                'نورت يا جميل 💙', 'يا سلام على الزيارة 😄', 'إيه يا عم الأخبار؟ 😂', 'إيه يا سيدي عامل إيه؟ 😄',
                'يا مساء النشاط 😎', 'صباح النشاط يا جميل ☀️', 'يومك لسه بيبدأ؟ يلا بينا 😄',
                'خلينا نخلي اليوم خفيف ولذيذ ✨', 'يلا نخلّص كام حاجة حلوة 📚', 'جاهز/ة للإنجاز؟ 🚀'
            ];
            const hour = new Date().getHours();
            const timeGreeting = hour >= 5 && hour < 12 ? ['صباحك فل ☀️','صباح الخير عليك 🌤️','يا صباح النشاط 😄'] :
                hour >= 12 && hour < 18 ? ['يومك جميل ✨','إيه الأخبار النهارده؟ 😄','مساءك لسه بدري عليه 😅'] :
                ['مساءك جميل 🌙','مساء الخير عليك ✨','نورت في آخر اليوم 🌙'];
            const greetingPool = Math.random() < 0.35 ? timeGreeting : greetingOptions;
            const greeting = greetingPool[Math.floor(Math.random() * greetingPool.length)];
            return `
            <div class="welcome-section anim-fade-up">
              <div class="welcome-greeting-row">
                <button type="button" class="welcome-user-avatar" data-act="open-profile" aria-label="فتح الملف الشخصي">${welcomeAvatar}</button>
                <div class="greeting">
                  <h1>${greeting}، <span>${escapeHtml(state.user.name || 'عضو')}</span> 👋</h1>
                </div>
              </div>
            </div>

            <div class="section-label anim-fade-up stagger-1">
              <i class="fas fa-th-large"></i> الأقسام الدراسية
            </div>

            <div class="grid-boxes">
              ${cards}
            </div>`;
        }

        // ─── Section ───

        function renderSection() {
            const section = findSection(state.currentSectionId);
            if (!section) return renderHome();

            const isAdminRole = isAdmin();

            let subsHtml = section.subs.map((sub, i) => {
                const delay = 'stagger-' + ((i % 4) + 1);
                const hasImage = sub.image && sub.image.length > 0;
                const imgStyle = hasImage ? `background-image:url(${sub.image})` : '';
                const placeholderClass = hasImage ? '' : 'placeholder';
                const titleClass = hasImage ? '' : 'dark';
                const adminActions = isAdminRole ? `
                  <div class="card-admin-actions">
                    <button data-act="edit-sub" data-sub="${sub.id}" title="تعديل" data-stop-prop="1"><i class="fas fa-edit"></i></button>
                    <button class="danger" data-act="delete-sub" data-sub="${sub.id}" title="حذف" data-stop-prop="1"><i class="fas fa-trash"></i></button>
                  </div>` : '';
                return `
              <div class="sub-card anim-fade-up ${delay}" data-act="open-subsection" data-sub="${sub.id}">
                ${adminActions}
                <div class="card-image ${placeholderClass}" style="${imgStyle}">
                  ${!hasImage ? '<i class="fas fa-folder-open"></i>' : ''}
                </div>
                <div class="card-title ${titleClass}">${sub.name || 'بدون اسم'}</div>
              </div>`;
            }).join('');

            if (isAdminRole) {
                subsHtml += `
              <div class="sub-card add-card anim-fade-up stagger-3" data-act="add-sub">
                <div class="add-content">
                  <i class="fas fa-plus"></i>
                  <span>إضافة قسم فرعي</span>
                </div>
              </div>`;
            }

            return `
            <div class="breadcrumb anim-fade-up">
              <span class="seg" data-act="go-home">الرئيسية</span>
              <span class="sep">/</span>
              <span class="seg current">${section.name || 'بدون اسم'}</span>
            </div>

            <button class="back-link anim-fade-up" data-act="go-home">
              <i class="fas fa-arrow-right"></i> رجوع للرئيسية
            </button>

            <div class="page-header anim-fade-up stagger-1">
              <h2>${section.name || 'بدون اسم'}</h2>
            </div>

            <div class="section-label anim-fade-up stagger-2">
              <i class="fas fa-folder"></i> الأقسام الفرعية
            </div>

            <div class="grid-subs">
              ${subsHtml}
            </div>`;
        }

        function visibilityLabel(mode){
            return ({all:'متاح للجميع',selected:'لأشخاص محددين',admins:'للمشرفين والأدمن',owner:'لي أنا فقط'}[mode]||'متاح للجميع');
        }

        // ─── Subsection ───

        function renderSubsection() {
            const section = findSection(state.currentSectionId);
            if (!section) return renderHome();
            const sub = findSub(state.currentSectionId, state.currentSubId);
            if (!sub) return renderSection();

            const isAdminRole = isAdmin();

            let itemsHtml = sub.items.map((it) => {
                const hasImage = it.image && it.image.length > 0;
                const thumbStyle = hasImage ? `background-image:url(${it.image})` : '';
                const thumbClass = hasImage ? '' : 'placeholder';
                const hasFile = it.fileData && it.fileData.length > 0;
                const downloadBtn = hasFile ?
                    `<button class="btn-download" data-act="download-file" data-file="${it.fileData}" data-name="${it.fileName || 'محاضرة'}"><i class="fas fa-download"></i> تحميل</button>` :
                    `<button class="btn-download disabled"><i class="fas fa-download"></i> غير متوفر</button>`;
                const adminActions = isAdminRole ? `
                  <div class="card-admin-actions">
                    <button data-act="edit-item" data-item="${it.id}" title="تعديل" data-stop-prop="1"><i class="fas fa-edit"></i></button>
                    <button class="danger" data-act="delete-item" data-item="${it.id}" title="حذف" data-stop-prop="1"><i class="fas fa-trash"></i></button>
                  </div>` : '';
                return `
              <div class="item-row anim-fade-up">
                ${adminActions}
                <div class="item-thumb ${thumbClass}" style="${thumbStyle}">${!hasImage ? '📄' : ''}</div>
                <div class="item-info">
                  <div class="item-name ${it.name ? '' : 'empty'}">${it.name || 'بدون اسم'}</div>
                  ${isAdminRole ? `<div class="item-visibility"><i class="fas fa-eye"></i> ${escapeHtml(visibilityLabel(it.visibilityMode))}</div>` : ''}
                </div>
                <div class="item-actions">
                  ${downloadBtn}
                </div>
              </div>`;
            }).join('');

            if (itemsHtml === '') {
                itemsHtml = `
              <div class="item-empty anim-fade-up">
                <i class="fas fa-inbox"></i>
                لا توجد محتويات في هذا القسم
              </div>`;
            }

            let addBtn = '';
            if (isAdminRole && sub.items.length < 30) {
                addBtn = `
              <button class="back-link" data-act="add-item" style="width:100%;justify-content:center;border:2px dashed var(--border);background:transparent;margin-top:10px;">
                <i class="fas fa-plus"></i> إضافة مستطيل جديد (${sub.items.length}/30)
              </button>`;
            } else if (isAdminRole && sub.items.length >= 30) {
                addBtn = `
              <div class="text-center text-muted" style="font-size:0.75rem;margin-top:10px;">
                <i class="fas fa-info-circle"></i> وصلت للحد الأقصى (30 مستطيل)
              </div>`;
            }

            return `
            <div class="breadcrumb anim-fade-up">
              <span class="seg" data-act="go-home">الرئيسية</span>
              <span class="sep">/</span>
              <span class="seg" data-act="go-section">${section.name || 'بدون اسم'}</span>
              <span class="sep">/</span>
              <span class="seg current">${sub.name || 'بدون اسم'}</span>
            </div>

            <button class="back-link anim-fade-up" data-act="go-section">
              <i class="fas fa-arrow-right"></i> رجوع لـ ${section.name || 'القسم'}
            </button>

            <div class="page-header anim-fade-up stagger-1">
              <h2>${sub.name || 'بدون اسم'}</h2>
            </div>

            <div class="section-label anim-fade-up stagger-2">
              <i class="fas fa-list-ul"></i> المحتويات
            </div>

            <div class="items-list">
              ${itemsHtml}
            </div>

            ${addBtn}`;
        }

        // ─── Full Profile Page ───
        function renderProfilePage() {
            const u = state.user || {};
            const initial = (u.name || 'عضو').charAt(0).toUpperCase();
            const avatarHtml = u.avatar ? `<img src="${u.avatar}" alt="صورة الملف الشخصي">` : initial;
            const roleLabel = isAdmin() ? 'مدير المنصة' : 'عضو';
            return `
              <section class="profile-page">
                <div class="profile-page-head">
                  <button type="button" class="profile-back" data-act="go-home" title="العودة للرئيسية"><i class="fas fa-arrow-right"></i></button>
                  <div class="profile-page-title">
                    <h2>الملف الشخصي</h2>
                    <p>بيانات حسابك وإعدادات الملف الشخصي</p>
                  </div>
                </div>
                <div class="profile-card">
                  <div class="profile-hero">
                    <div class="profile-large-avatar">${avatarHtml}</div>
                    <div>
                      <h3>${u.name || 'عضو'}</h3>
                      <span class="profile-role"><i class="fas fa-user"></i>${roleLabel}</span>
                    </div>
                  </div>
                  <div class="profile-info-grid">
                    <div class="profile-info-row"><div class="profile-info-label">الاسم</div><div class="profile-info-value">${u.name || 'غير محدد'}</div></div>
                    <div class="profile-info-row"><div class="profile-info-label">البريد الإلكتروني</div><div class="profile-info-value">${u.email || 'غير محدد'}</div></div>
                    <div class="profile-info-row"><div class="profile-info-label">رقم الهاتف</div><div class="profile-info-value">${u.phone || 'غير محدد'}</div></div>
                    <div class="profile-info-row"><div class="profile-info-label">نوع الحساب</div><div class="profile-info-value">${isAdmin() ? 'Admin' : 'Member'}</div></div>
                  </div>
                  <div class="profile-actions">
                    <button class="profile-page-btn primary" data-act="edit-profile"><i class="fas fa-user-edit"></i> تعديل الملف الشخصي</button>
                    <button class="profile-page-btn" data-act="change-pass"><i class="fas fa-key"></i> تغيير كلمة السر</button>
                    <button class="profile-page-btn danger" data-act="logout"><i class="fas fa-sign-out-alt"></i> تسجيل خروج</button>
                  </div>
                </div>
              </section>`;
        }

        // ─── Admin: User Management (inside 2.html) ───

        function escapeHtml(value){
            return String(value ?? '')
                .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
                .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
        }

        function userDisplayName(u){
            const n=(u?.full_name||u?.name||'').trim();
            return n || 'الاسم غير مسجل';
        }

        function userDisplayPhone(u){
            const p=(u?.phone_number||u?.phone||'').trim();
            return p || 'التليفون غير مسجل';
        }

        function userStatus(u){
            if(u?.role==='admin'||u?.role==='super_admin') return {key:'admin',label:'أدمن ذهبي',tone:'violet'};
            if(u?.role==='moderator') return {key:'moderator',label:'مشرف',tone:'blue'};
            if(u?.status==='revoked') return {key:'revoked',label:'مرفوض / موقوف',tone:'red'};
            if(u?.status==='pending') return {key:'pending',label:'في انتظار الموافقة',tone:'amber'};
            if(u?.account_type==='temporary'||u?.is_temporary===true||u?.must_change_credentials===true)
                return {key:'temporary',label:'حساب مؤقت',tone:'blue'};
            return {key:'approved',label:'عضو مقبول',tone:'green'};
        }

        function latestRequestForUser(userId){
            const arr=(state.userRequests||[]).filter(r=>String(r.user_id)===String(userId));
            return arr.sort((a,b)=>new Date(b.created_at)-new Date(a.created_at))[0] || null;
        }

        function requestLabel(req){
            if(!req) return '';
            if(req.request_type==='new_account') return 'طلب إنشاء حساب';
            if(req.request_type==='temporary_completion') return 'إكمال حساب مؤقت';
            if(req.request_type==='revoked_reapply') return 'طلب موافقة جديد';
            return 'طلب حساب';
        }

        async function openUsersManagement(){
            if(!isAdmin()) { showToast('غير مصرح به','error'); return; }
            state.view='users';
            state.usersLoading=true;
            render();
            try{
                const [profilesRes, requestsRes, messagesRes] = await Promise.all([
                    sb.from('profiles').select('*').order('created_at',{ascending:false}),
                    sb.from('account_requests').select('*').order('created_at',{ascending:false}),
                    sb.from('user_messages').select('*').order('created_at',{ascending:false}).limit(20)
                ]);
                if(profilesRes.error) throw profilesRes.error;
                if(requestsRes.error) throw requestsRes.error;
                if(messagesRes.error) throw messagesRes.error;
                state.users=profilesRes.data||[];
                state.userRequests=requestsRes.data||[];
                state.adminMessages=messagesRes.data||[];
                try{
                    const currentUserId = state.user?.id;
                    if(!currentUserId) throw new Error('انتهت جلسة الدخول.');
                    const {data:hidden}=await sb.from('admin_message_hidden').select('message_id').eq('user_id',currentUserId);
                    const hiddenIds=new Set((hidden||[]).map(x=>String(x.message_id)));
                    state.adminMessages=state.adminMessages.filter(m=>!hiddenIds.has(String(m.id)));
                }catch(_){}
            }catch(err){
                console.error(err);
                showToast(`تعذر تحميل المستخدمين: ${err.message||'خطأ غير معروف'}`,'error');
            }finally{
                state.usersLoading=false;
                render();
            }
        }

        function filteredUsers(){
            const q=(state.usersSearch||'').trim().toLowerCase();
            return (state.users||[]).filter(u=>{
                const st=userStatus(u).key;
                const matchFilter=state.usersFilter==='all'||st===state.usersFilter;
                const hay=[
                    u.full_name,u.name,u.email,u.phone,u.phone_number,u.role,u.status,u.account_type
                ].filter(Boolean).join(' ').toLowerCase();
                return matchFilter && (!q||hay.includes(q));
            });
        }

        function renderUsersManagement(){
            const users=filteredUsers();
            const all=state.users||[];
            const counts={
                all:all.length,
                approved:all.filter(u=>userStatus(u).key==='approved').length,
                pending:all.filter(u=>userStatus(u).key==='pending').length,
                temporary:all.filter(u=>userStatus(u).key==='temporary').length,
                revoked:all.filter(u=>userStatus(u).key==='revoked').length
            };
            const cards=users.map(u=>{
                const st=userStatus(u);
                const req=latestRequestForUser(u.id);
                const initials=(userDisplayName(u).replace('الاسم غير مسجل','؟').trim().charAt(0)||'؟').toUpperCase();
                const avatar=publicStorageUrl('avatars',u.avatar_path||u.avatar_url);
                const avatarHtml=avatar?`<img src="${escapeHtml(avatar)}" alt="">`:escapeHtml(initials);
                const date=u.created_at?new Date(u.created_at).toLocaleDateString('ar-EG',{year:'numeric',month:'short',day:'numeric'}):'—';
                return `
                  <article class="um-user-card">
                    <div class="um-user-main">
                      <div class="um-avatar">${avatarHtml}</div>
                      <div class="um-user-ident">
                        <div class="um-name-line"><div class="um-name">${escapeHtml(userDisplayName(u))}</div>${u.profile_title?`<span class="um-title-chip">✦ ${escapeHtml(u.profile_title)}</span>`:""}</div>
                        <div class="um-email">${escapeHtml(u.email||'البريد غير مسجل')}</div>
                        <div class="um-meta"><span>${escapeHtml(userDisplayPhone(u))}</span><span>•</span><span>${escapeHtml(date)}</span></div>
                      </div>
                      <span class="um-status ${st.tone}">${escapeHtml(st.label)}</span>
                    </div>
                    ${req ? `<div class="um-request-line"><i class="fas fa-file-signature"></i><span>${escapeHtml(requestLabel(req))}</span>${req.note?`<span class="um-note">— ${escapeHtml(req.note)}</span>`:''}</div>`:''}
                    <div class="um-card-actions">
                      <button data-act="user-details" data-user-id="${escapeHtml(u.id)}"><i class="fas fa-eye"></i> التفاصيل</button>
                      ${st.key==='pending' ? `<button class="success" data-act="user-approve" data-user-id="${escapeHtml(u.id)}"><i class="fas fa-check"></i> قبول</button>`:''}
                      ${st.key!=='admin' && st.key!=='revoked' ? `<button data-act="user-revoke" data-user-id="${escapeHtml(u.id)}"><i class="fas fa-ban"></i> رفض / إيقاف</button>`:''}
                      ${st.key==='revoked' ? `<button class="success" data-act="user-approve" data-user-id="${escapeHtml(u.id)}"><i class="fas fa-rotate-left"></i> إعادة تفعيل</button>`:''}
                      ${st.key==='approved' ? `<button data-act="user-reapply" data-user-id="${escapeHtml(u.id)}"><i class="fas fa-user-clock"></i> طلب إذن من جديد</button><button data-act="user-force-password" data-user-id="${escapeHtml(u.id)}"><i class="fas fa-key"></i> تغيير كلمة السر عند الدخول</button>`:''}
                      ${st.key!=='admin' ? `<button data-act="user-edit" data-user-id="${escapeHtml(u.id)}"><i class="fas fa-user-pen"></i> تعديل</button>`:''}
                      ${st.key!=='admin' ? `<button class="danger" data-act="user-delete" data-user-id="${escapeHtml(u.id)}"><i class="fas fa-trash"></i> حذف</button>`:''}
                    </div>
                  </article>`;
            }).join('');

            return `
            <section class="um-page">
              <div class="um-head">
                <div>
                  <button class="um-back" data-act="go-home"><i class="fas fa-arrow-right"></i> الرئيسية</button>
                  <h1><i class="fas fa-users-gear"></i> إدارة المستخدمين</h1>
                  <p>إدارة الحسابات والطلبات والموافقة والرفض والحسابات المؤقتة من داخل المنصة.</p>
                </div>
                <button class="um-create" data-act="user-create-temp"><i class="fas fa-user-plus"></i> إنشاء حساب مؤقت</button>
              </div>

              <div class="um-stats">
                <button class="um-stat ${state.usersFilter==='all'?'active':''}" data-act="user-filter" data-filter="all"><strong>${counts.all}</strong><span>كل الحسابات</span></button>
                <button class="um-stat ${state.usersFilter==='approved'?'active':''}" data-act="user-filter" data-filter="approved"><strong>${counts.approved}</strong><span>أعضاء مقبولون</span></button>
                <button class="um-stat ${state.usersFilter==='pending'?'active':''}" data-act="user-filter" data-filter="pending"><strong>${counts.pending}</strong><span>في الانتظار</span></button>
                <button class="um-stat ${state.usersFilter==='temporary'?'active':''}" data-act="user-filter" data-filter="temporary"><strong>${counts.temporary}</strong><span>مؤقتون</span></button>
                <button class="um-stat ${state.usersFilter==='revoked'?'active':''}" data-act="user-filter" data-filter="revoked"><strong>${counts.revoked}</strong><span>مرفوضون / موقوفون</span></button>
              </div>

              <div class="um-toolbar">
                <div class="um-search"><i class="fas fa-search"></i><input id="userSearch" type="search" value="${escapeHtml(state.usersSearch)}" placeholder="ابحث بالاسم أو البريد أو التليفون..."></div>
                <button class="um-refresh" data-act="refresh-users"><i class="fas fa-rotate"></i> تحديث</button>
              </div>

              ${state.usersLoading
                  ? `<div class="um-empty"><i class="fas fa-spinner fa-spin"></i><h3>جاري تحميل الحسابات…</h3></div>`
                  : users.length
                    ? `<div class="um-list">${cards}</div>`
                    : `<div class="um-empty"><i class="fas fa-user-slash"></i><h3>لا توجد حسابات مطابقة</h3><p>غيّر البحث أو الفلتر وجرب مرة أخرى.</p></div>`
              }

              <div class="message-compose-card">
                <div class="message-compose-head">
                  <div><h3><i class="fas fa-bullhorn"></i> رسائل الحسابات</h3><p>اكتب رسالة تظهر عند فتح المنصة، واختر حسابًا واحدًا أو جميع الحسابات.</p></div>
                  <button class="message-compose-btn" data-act="compose-user-message"><i class="fas fa-pen"></i> كتابة رسالة</button>
                </div>
                ${state.adminMessages?.length ? `<div class="message-list">${state.adminMessages.slice(0,8).map(msg=>{
                    const target=msg.target_user_id ? state.users.find(x=>String(x.id)===String(msg.target_user_id)) : null;
                    const views = msg.max_views == null ? 'بدون حد' : `${msg.max_views} مرة`;
                    return `<div class="message-list-item"><div class="message-list-item-main"><strong>${escapeHtml(msg.title||'رسالة من الإدارة')}</strong><small>${escapeHtml((msg.body||'').slice(0,180))}</small><small>تظهر: ${escapeHtml(views)}</small></div><div class="message-list-actions"><span class="message-audience">${target?escapeHtml(userDisplayName(target)):'كل الحسابات'}</span><button class="message-action-btn" data-act="hide-admin-message" data-message-id="${escapeHtml(msg.id)}">إخفاء عندي</button><button class="message-action-btn danger" data-act="delete-admin-message" data-message-id="${escapeHtml(msg.id)}">${target?'حذف الرسالة':'حذف عن الكل'}</button></div></div>`;
                }).join('')}</div>` : `<div class="um-footer-note"><i class="fas fa-inbox"></i> لا توجد رسائل مرسلة حتى الآن.</div>`}
              </div>

              <div class="um-footer-note"><i class="fas fa-shield-halved"></i> تغييرات الصلاحيات والحالة تنفذ من حساب الأدمن فقط.</div>
            </section>`;
        }

        // ─── Modal ───

        function renderModal() {
            const m = state.modal;
            if (!m) return '';

            if (m.kind === 'user-edit') {
                const u=m.user||{};
                return `
                <div class="overlay" data-act="close-modal-overlay">
                  <div class="modal um-modal" data-stop="1">
                    <div class="um-modal-icon"><i class="fas fa-user-pen"></i></div>
                    <h3>تعديل بيانات المستخدم</h3>
                    <p class="um-modal-sub">${escapeHtml(u.email||'')}</p>
                    <div class="field"><label>الاسم</label><input id="um-edit-name" value="${escapeHtml(u.full_name||u.name||'')}" placeholder="الاسم"></div>
                    <div class="field"><label>رقم التليفون</label><input id="um-edit-phone" value="${escapeHtml(u.phone_number||u.phone||'')}" placeholder="رقم التليفون"></div>
                    <div class="field"><label>اللقب (اختياري)</label><input id="um-edit-title" value="${escapeHtml(u.profile_title||'')}" placeholder="مثال: قمر، نجمة، ميوش..."></div>
                    ${isOwnerAdmin() && !u.is_owner_admin ? `<div class="field"><label>صلاحية الحساب</label><select id="um-edit-role"><option value="member" ${(!u.role||u.role==='user'||u.role==='member')?'selected':''}>عضو</option><option value="moderator" ${u.role==='moderator'?'selected':''}>مشرف — بدون صلاحيات إدارية</option><option value="admin" ${u.role==='admin'||u.role==='super_admin'?'selected':''}>أدمن ذهبي — نفس صلاحيات الإدارة</option></select></div>` : ''}
                    <div class="modal-actions"><button class="btn-save" data-act="user-save-edit">حفظ</button><button class="btn-cancel" data-act="close-modal">إلغاء</button></div>
                  </div>
                </div>`;
            }

            if (m.kind === 'user-reject') {
                return `
                <div class="overlay" data-act="close-modal-overlay">
                  <div class="modal um-modal" data-stop="1">
                    <div class="um-modal-icon danger"><i class="fas fa-circle-xmark"></i></div>
                    <h3>رفض / إيقاف الحساب</h3>
                    <p class="um-modal-sub">اكتب الرسالة التي ستظهر للمستخدم عند محاولته تسجيل الدخول.</p>
                    <div class="field"><label>رسالة الرفض</label><textarea id="um-reject-note" rows="5" placeholder="مثال: برجاء مراجعة رقم التليفون والتواصل مع الإدارة."></textarea></div>
                    <div class="modal-actions"><button class="btn-save" data-act="user-save-reject">حفظ الرفض</button><button class="btn-cancel" data-act="close-modal">إلغاء</button></div>
                  </div>
                </div>`;
            }

            if (m.kind === 'user-details') {
                const u=m.user||{}, st=userStatus(u), req=latestRequestForUser(u.id);
                const avatar=publicStorageUrl('avatars',u.avatar_path||u.avatar_url);
                return `
                <div class="overlay" data-act="close-modal-overlay">
                  <div class="modal um-modal um-details-modal" data-stop="1">
                    <div class="um-detail-hero">
                      <div class="um-detail-avatar">${avatar?`<img src="${escapeHtml(avatar)}" alt="">`:'?'}</div>
                      <div><h3>${escapeHtml(userDisplayName(u))}</h3>${u.profile_title?`<span class="um-title-chip">✦ ${escapeHtml(u.profile_title)}</span>`:''}<span class="um-status ${st.tone}">${escapeHtml(st.label)}</span></div>
                    </div>
                    <div class="um-detail-grid">
                      <div><span>البريد</span><strong>${escapeHtml(u.email||'غير مسجل')}</strong></div>
                      <div><span>التليفون</span><strong>${escapeHtml(userDisplayPhone(u))}</strong></div>
                      <div><span>تاريخ الإنشاء</span><strong>${escapeHtml(u.created_at?new Date(u.created_at).toLocaleString('ar-EG'):'—')}</strong></div>
                      <div><span>آخر دخول</span><strong>${escapeHtml(u.last_seen_at?new Date(u.last_seen_at).toLocaleString('ar-EG'):'لم يسجل دخول')}</strong></div>
                      <div><span>عدد مرات الدخول</span><strong>${escapeHtml(u.login_count??0)}</strong></div>
                      <div><span>نوع الحساب</span><strong>${escapeHtml(u.account_type||'normal')}</strong></div>
                      <div><span>اللقب</span><strong>${escapeHtml(u.profile_title||'بدون لقب')}</strong></div>
                    </div>
                    ${req?`<div class="um-detail-request"><b>${escapeHtml(requestLabel(req))}</b><p>${escapeHtml(req.note||'لا توجد رسالة إضافية.')}</p></div>`:''}
                    <div class="modal-actions"><button class="btn-save" data-act="user-login-history" data-user-id="${escapeHtml(u.id)}"><i class="fas fa-clock-rotate-left"></i> عرض سجل الدخول</button><button class="btn-cancel" data-act="close-modal">إغلاق</button></div>
                  </div>
                </div>`;
            }

            if (m.kind === 'login-history') {
                const u=m.user||{}, rows=Array.isArray(m.history)?m.history:[];
                const pickDate=(r)=>{for(const k of ['created_at','logged_at','login_at','visited_at','timestamp','createdAt']) if(r&&r[k]) return r[k]; return '';};
                const list=rows.length?rows.map((r,i)=>{const d=pickDate(r);return `<div class=\"login-history-row\"><span class=\"lh-index\">${i+1}</span><div><strong>${escapeHtml(d?new Date(d).toLocaleString('ar-EG'):'وقت مسجل')}</strong><small>${escapeHtml(r.ip_address||r.ip||r.user_agent||'تسجيل دخول')}</small></div></div>`;}).join(''):'<div class=\"login-history-empty\">لا يوجد سجل دخول محفوظ لهذا المستخدم حتى الآن.</div>';
                return `<div class=\"overlay\" data-act=\"close-modal-overlay\"><div class=\"modal um-modal um-details-modal\" data-stop=\"1\"><div class=\"um-modal-icon\"><i class=\"fas fa-clock-rotate-left\"></i></div><h3>سجل مرات الدخول</h3><p class=\"um-modal-sub\">${escapeHtml(userDisplayName(u))} — ${escapeHtml(String(u.login_count??0))} مرات دخول.</p><div class=\"login-history-list\">${list}</div><div class=\"modal-actions\"><button class=\"btn-cancel\" data-act=\"close-modal\">إغلاق</button></div></div></div>`;
            }

            if (m.kind === 'compose-user-message') {
                const target=m.targetUserId||'all';
                return `
                <div class="overlay" data-act="close-modal-overlay">
                  <div class="modal um-modal admin-message-modal" data-stop="1">
                    <div class="um-modal-icon"><i class="fas fa-bullhorn"></i></div>
                    <h3>رسالة من الإدارة</h3>
                    <p class="um-modal-sub">اختر حسابًا واحدًا أو جميع الحسابات، ثم اكتب الرسالة.</p>
                    <div class="message-target-grid">
                      <button type="button" class="message-target ${target==='all'?'active':''}" data-act="message-target" data-target="all"><i class="fas fa-users"></i> جميع الحسابات</button>
                      <button type="button" class="message-target ${target!=='all'?'active':''}" data-act="message-target" data-target="one"><i class="fas fa-user"></i> حساب واحد</button>
                    </div>
                    ${target!=='all' ? `<div class="field"><label>اختر الحساب</label><select id="message-target-user">${state.users.filter(x=>x.role!=='admin').map(u=>`<option value="${escapeHtml(u.id)}" ${String(target)===String(u.id)?'selected':''}>${escapeHtml(userDisplayName(u))} — ${escapeHtml(u.email||'بدون بريد')}</option>`).join('')}</select></div>`:''}
                    <div class="field"><label>عنوان الرسالة</label><input id="admin-message-title" maxlength="120" placeholder="مثال: تنبيه من إدارة المنصة"></div>
                    <div class="field"><label>نص الرسالة</label><textarea id="admin-message-body" rows="7" maxlength="2000" placeholder="اكتب الرسالة التي ستظهر عند فتح الحساب..."></textarea></div>
                    <div class="field"><label>عدد مرات ظهور الرسالة</label><select id="admin-message-views"><option value="1" selected>مرة واحدة فقط</option><option value="2">مرتين</option><option value="3">3 مرات</option><option value="5">5 مرات</option><option value="10">10 مرات</option><option value="20">20 مرة</option><option value="unlimited">بدون حد</option></select><small class="field-hint">اختياري: الرسالة تختفي تلقائيًا بعد العدد الذي تختاره.</small></div>
                    <div class="modal-actions"><button class="btn-save" data-act="send-user-message">إرسال الرسالة</button><button class="btn-cancel" data-act="close-modal">إلغاء</button></div>
                  </div>
                </div>`;
            }

            if (m.kind === 'user-create-temp') {
                return `
                <div class="overlay" data-act="close-modal-overlay">
                  <div class="modal um-modal" data-stop="1">
                    <div class="um-modal-icon"><i class="fas fa-user-clock"></i></div>
                    <h3>إنشاء حساب مؤقت</h3>
                    <p class="um-modal-sub">سيحصل المستخدم على إيميل وكلمة سر مؤقتين. عند أول دخول سيُطلب منه تغيير البريد وكلمة السر وإكمال الاسم والتليفون ثم ينتظر موافقتك.</p>
                    <div class="field"><label>البريد المؤقت</label><input id="temp-admin-email" type="email" placeholder="example@email.com"></div>
                    <div class="field"><label>كلمة السر المؤقتة</label><input id="temp-admin-password" type="password" minlength="6" placeholder="6 أحرف على الأقل"></div>
                    <div class="modal-actions"><button class="btn-save" data-act="user-save-create-temp">إنشاء الحساب</button><button class="btn-cancel" data-act="close-modal">إلغاء</button></div>
                  </div>
                </div>`;
            }

            if (m.kind === 'force-password') {
                const u=m.user||{};
                return `<div class="overlay" data-act="close-modal-overlay"><div class="modal um-modal" data-stop="1">
                    <div class="um-modal-icon"><i class="fas fa-key"></i></div>
                    <h3>تعيين كلمة سر جديدة للمستخدم</h3>
                    <p class="um-modal-sub">سيتم تعيين كلمة السر التي تكتبها الآن، وعند أول دخول بها سيُطلب من المستخدم اختيار كلمة سر شخصية جديدة.</p>
                    <div class="force-password-note">مهم: المستخدم لن يستطيع الدخول بكلمة السر القديمة بعد حفظ هذه العملية.</div>
                    <div class="field"><label>كلمة السر الجديدة المؤقتة</label><input id="force-new-password" class="force-password-input" type="password" minlength="6" autocomplete="new-password" placeholder="6 أحرف على الأقل"></div>
                    <div class="field"><label>تأكيد كلمة السر</label><input id="force-confirm-password" class="force-password-input" type="password" minlength="6" autocomplete="new-password" placeholder="أعد كتابة كلمة السر"></div>
                    <div class="modal-actions"><button class="btn-save" data-act="user-save-force-password">حفظ كلمة السر</button><button class="btn-cancel" data-act="close-modal">إلغاء</button></div>
                  </div></div>`;
            }

            if (m.kind === 'user-message') {
                const rows=Array.isArray(m.messages)?m.messages:[];
                return `<div class="user-message-overlay" data-stop="1">
                  <div class="user-message-card">
                    <div class="umc-icon"><i class="fas fa-bullhorn"></i></div>
                    <h2>رسالة من إدارة المنصة</h2>
                    <p class="umc-sub">رسالة مهمة من الإدارة.</p>
                    ${rows.map(r=>`<div class="user-message-item"><h3>${escapeHtml(r.title||'رسالة من الإدارة')}</h3><p>${escapeHtml(r.body||'')}</p></div>`).join('')}
                    <button class="user-message-close" data-act="close-modal">حسنًا، فهمت</button>
                  </div>
                </div>`;
            }

            if (m.kind === 'phone-required') {
                return `
                <div class="overlay" data-act="close-modal-overlay">
                  <div class="modal phone-required-box" data-stop="1">
                    <div class="phone-required-icon"><i class="fas fa-phone"></i></div>
                    <h3>أضف رقم التليفون</h3>
                    <p class="um-modal-sub">هذه أول مرة تفتح فيها المنصة بهذا الحساب. أضف رقم تليفونك مرة واحدة لاستخدامه في تسجيل الدخول بدل الإيميل.</p>
                    <div class="field"><label>رقم التليفون</label><input id="required-phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="01xxxxxxxxx"></div>
                    <div class="modal-actions"><button class="btn-save" data-act="save-required-phone">حفظ والمتابعة</button></div>
                  </div>
                </div>`;
            }

            // Profile modal
            if (m.kind === 'profile') {
                const hasAvatar = m.avatar && m.avatar.length > 0;
                return `
              <div class="overlay" data-act="close-modal-overlay">
                <div class="modal" data-stop="1">
                  <h3><i class="fas fa-user-edit"></i> تعديل الملف الشخصي</h3>
                  <div class="field">
                    <label>الصورة الرمزية</label>
                    <div class="file-pick">
                      <div class="prev ${hasAvatar ? 'has-image' : ''}" style="${hasAvatar ? `background-image:url(${m.avatar})` : ''}">${!hasAvatar ? '📷' : ''}</div>
                      <label class="upl">اختر صورة<input type="file" id="modal-avatar" accept="image/*"></label>
                      <span class="fname">${hasAvatar ? 'تم اختيار صورة' : 'لا توجد صورة'}</span>
                    </div>
                  </div>
                  <div class="field">
                    <label>الاسم</label>
                    <input type="text" id="modal-name" value="${(m.name||'').replace(/"/g,'&quot;')}" />
                  </div>
                  <div class="field">
                    <label>البريد الإلكتروني</label>
                    <input type="email" id="modal-email" value="${(m.email||'').replace(/"/g,'&quot;')}" disabled />
                  </div>
                  <div class="modal-actions">
                    <button class="btn-save" data-act="save-profile">حفظ</button>
                    <button class="btn-cancel" data-act="close-modal">إلغاء</button>
                  </div>
                </div>
              </div>`;
            }

            // Password modal
            if (m.kind === 'password') {
                return `
              <div class="overlay" data-act="close-modal-overlay">
                <div class="modal" data-stop="1">
                  <h3><i class="fas fa-key"></i> تغيير كلمة السر</h3>
                  <div class="field">
                    <label>كلمة السر الحالية</label>
                    <input type="password" id="old-pass" />
                  </div>
                  <div class="field">
                    <label>كلمة السر الجديدة</label>
                    <input type="password" id="new-pass" />
                  </div>
                  <div class="field">
                    <label>تأكيد كلمة السر الجديدة</label>
                    <input type="password" id="confirm-pass" />
                  </div>
                  <div class="modal-actions">
                    <button class="btn-save" data-act="save-pass">تغيير</button>
                    <button class="btn-cancel" data-act="close-modal">إلغاء</button>
                  </div>
                </div>
              </div>`;
            }

            // Section / Sub / Item modals (admin only)
            const titles = {
                section: 'تعديل القسم',
                sub: 'تعديل القسم الفرعي',
                item: 'تعديل المستطيل',
                'add-section': 'قسم جديد',
                'add-sub': 'قسم فرعي جديد',
                'add-item': 'مستطيل جديد'
            };
            const isItem = m.kind === 'item' || m.kind === 'add-item';
            const showDelete = m.kind === 'section' || m.kind === 'item' || m.kind === 'sub';
            const hasImage = m.image && m.image.length > 0;
            const hasFile = m.fileData && m.fileData.length > 0;

            return `
            <div class="overlay" data-act="close-modal-overlay">
              <div class="modal" data-stop="1">
                <h3><i class="fas ${m.kind === 'section' || m.kind === 'add-section' ? 'fa-folder' : m.kind === 'sub' || m.kind === 'add-sub' ? 'fa-folder-open' : 'fa-file'}"></i> ${titles[m.kind] || 'تعديل'}</h3>
                <div class="field">
                  <label>${isItem ? 'اسم المستطيل (اختياري)' : 'الاسم'}</label>
                  <input type="text" id="modal-name" value="${(m.name||'').replace(/"/g,'&quot;')}" placeholder="${isItem ? 'يمكن تركه فارغًا' : 'اكتب اسم...'}" />
                </div>
                <div class="field">
                  <label>الصورة (اختيارية)</label>
                  <div class="file-pick">
                    <div class="prev ${hasImage ? 'has-image' : ''}" style="${hasImage ? `background-image:url(${m.image})` : ''}">${!hasImage ? '📷' : ''}</div>
                    <label class="upl">اختر صورة<input type="file" id="modal-image" accept="image/*"></label>
                    <span class="fname">${hasImage ? 'تم اختيار صورة' : 'لا توجد صورة'}</span>
                  </div>
                </div>
                ${isItem ? `
                <div class="field">
                  <label>ملف مرفق (اختياري)</label>
                  <div class="file-pick">
                    <label class="upl">اختر ملف<input type="file" id="modal-file"></label>
                    <span class="fname">${hasFile ? m.fileName || 'تم اختيار ملف' : 'لا يوجد ملف'}</span>
                  </div>
                </div>` : ''}
                <div class="content-access-panel">
                  <div class="availability-title"><i class="fas fa-eye"></i><span>إتاحة هذا المحتوى</span></div>
                  <div class="field"><label>يظهر لـ</label><select id="content-visibility">
                    <option value="all" ${m.visibilityMode==='all'?'selected':''}>🌍 الكل</option>
                    <option value="selected" ${m.visibilityMode==='selected'?'selected':''}>👥 أشخاص أختارهم</option>
                    <option value="admins" ${m.visibilityMode==='admins'?'selected':''}>🛡️ المشرفين والأدمن</option>
                    <option value="owner" ${m.visibilityMode==='owner'?'selected':''}>🔒 أنا فقط</option>
                  </select></div>
                  <div class="field access-users-field" style="display:${m.visibilityMode==='selected'?'block':'none'}"><label>اختار الناس اللي يظهر لهم</label><select id="content-allow-users" class="access-multi" multiple>${(state.users||[]).filter(u=>u.role!=='admin'&&u.role!=='super_admin').map(u=>`<option value="${escapeHtml(u.id)}" ${((m.allowedUsers||[]).includes(String(u.id)))?'selected':''}>${escapeHtml(userDisplayName(u))} — ${escapeHtml(u.email||'بدون بريد')}</option>`).join('')}</select><small class="access-help">على الكمبيوتر استخدم Ctrl، وعلى الموبايل اضغط على الأشخاص اللي عايز تحددهم.</small></div>
                  <div class="field"><label>استثناء — ناس ما يظهرش لهم</label><select id="content-deny-users" class="access-multi" multiple>${(state.users||[]).filter(u=>u.role!=='admin'&&u.role!=='super_admin').map(u=>`<option value="${escapeHtml(u.id)}" ${((m.excludedUsers||[]).includes(String(u.id)))?'selected':''}>${escapeHtml(userDisplayName(u))} — ${escapeHtml(u.email||'بدون بريد')}</option>`).join('')}</select><small class="access-help">الاستثناء أقوى من الإتاحة، ويمكن استخدامه مع أي اختيار.</small></div>
                </div>
                <div class="modal-actions">
                  <button class="btn-save" data-act="save-modal">حفظ</button>
                  <button class="btn-cancel" data-act="close-modal">إلغاء</button>
                </div>
                ${showDelete ? `<button class="btn-danger block" data-act="delete-modal">حذف</button>` : ''}
              </div>
            </div>`;
        }

        // ─── Confirm ───

        function renderConfirm() {
            return `
            <div class="overlay" data-act="close-confirm-overlay">
              <div class="modal confirm-box" data-stop="1">
                <p>${state.confirm.message}</p>
                <div class="modal-actions">
                  <button class="${state.confirm.confirmClass || 'btn-danger'}" data-act="confirm-yes">${escapeHtml(state.confirm.confirmLabel || 'تأكيد')}</button>
                  <button class="btn-cancel" data-act="close-confirm">إلغاء</button>
                </div>
              </div>
            </div>`;
        }

        // ════════════════════════════════════════════════════════════════════
        //  EVENTS
        // ════════════════════════════════════════════════════════════════════

        function attachEvents() {
            document.querySelectorAll('[data-act]').forEach(el => {
                el.removeEventListener('click', onAction);
                el.addEventListener('click', onAction);
            });

            // File inputs - avatar
            const avatarInput = document.getElementById('modal-avatar');
            if (avatarInput) {
                avatarInput.removeEventListener('change', onAvatarChange);
                avatarInput.addEventListener('change', onAvatarChange);
            }

            // File inputs - image
            const imgInput = document.getElementById('modal-image');
            if (imgInput) {
                imgInput.removeEventListener('change', onImageChange);
                imgInput.addEventListener('change', onImageChange);
            }

            // File inputs - file
            const fileInput = document.getElementById('modal-file');
            if (fileInput) {
                fileInput.removeEventListener('change', onFileChange);
                fileInput.addEventListener('change', onFileChange);
            }

            const userSearch = document.getElementById('userSearch');
            if(userSearch){
                userSearch.addEventListener('input', e=>{
                    state.usersSearch=e.target.value;
                    const caret=e.target.selectionStart;
                    render();
                    const next=document.getElementById('userSearch');
                    if(next){ next.focus(); try{next.setSelectionRange(caret,caret);}catch(_){ } }
                });
            }

            const vis = document.getElementById('content-visibility');
            if(vis){ vis.addEventListener('change',()=>{ const box=document.querySelector('.access-users-field'); if(box) box.style.display=vis.value==='selected'?'block':'none'; if(state.modal) state.modal.visibilityMode=vis.value; }); }
            // Name input
            const nameInput = document.getElementById('modal-name');
            if (nameInput) {
                nameInput.removeEventListener('input', onNameInput);
                nameInput.addEventListener('input', onNameInput);
            }

        }

        function onAvatarChange(e) {
            e.stopPropagation(); const f=e.target.files?.[0]; if(!f||!state.modal) return;
            if(!f.type.startsWith('image/')) return showToast('اختر صورة صحيحة.','error');
            state.modal.avatarFile=f; state.modal.avatar=URL.createObjectURL(f); render();
        }

        function onImageChange(e) {
            e.stopPropagation(); const f=e.target.files?.[0]; if(!f||!state.modal) return;
            if(!f.type.startsWith('image/')) return showToast('اختر صورة صحيحة.','error');
            state.modal.imageFile=f; state.modal.image=URL.createObjectURL(f); render();
        }

        function onFileChange(e) {
            e.stopPropagation(); const f=e.target.files?.[0]; if(!f||!state.modal) return;
            state.modal.fileFile=f; state.modal.fileName=f.name; render();
        }

        function onNameInput(e) {
            if (state.modal) {
                state.modal.name = e.target.value;
            }
        }

        async function onAction(e) {
            const el = e.currentTarget;
            const act = el.dataset.act;

            // ─── Admin controls must never trigger the parent Card click ───
            if (el.closest('.card-admin-actions')) {
                e.stopPropagation();
            }

            // ─── Modal overlay: only close if click is directly on overlay ───
            if (act === 'close-modal-overlay') {
                // Only close if the click target is the overlay itself (not a child)
                if (e.target === el) {
                    closeModal();
                }
                return;
            }

            if (act === 'close-confirm-overlay') {
                if (e.target === el) {
                    closeConfirm();
                }
                return;
            }

            // ─── Any click inside a modal is never an overlay click ───
            if (el.closest('.modal') && act !== 'close-modal' && act !== 'close-confirm') {
                // Keep processing the button's own action, but never let it close the overlay.
                e.stopPropagation();
            }

            // ─── Standard actions ───
            if (act === 'close-modal') {
                closeModal();
                return;
            }
            if (act === 'close-confirm') {
                closeConfirm();
                return;
            }

            // ─── Stop propagation for any modal inner clicks ───
            if (el.dataset.stop) return;

            switch (act) {
                case 'login': {
                    // لا يوجد اختيار للدور هنا؛ الدور يأتي من Supabase.
                    return;
                }
                case 'open-admin-panel': {
                    if (!isAdmin()) {
                        showToast('غير مصرح به', 'error');
                        break;
                    }
                    await openUsersManagement();
                    break;
                }
                case 'user-filter': {
                    state.usersFilter = el.dataset.filter || 'all';
                    render();
                    break;
                }
                case 'refresh-users': {
                    await openUsersManagement();
                    break;
                }
                case 'user-details': {
                    const u=state.users.find(x=>String(x.id)===String(el.dataset.userId));
                    if(u) openModal('user-details',{user:u});
                    break;
                }
                case 'user-edit': {
                    const u=state.users.find(x=>String(x.id)===String(el.dataset.userId));
                    if(u) openModal('user-edit',{user:u});
                    break;
                }
                case 'compose-user-message': {
                    openModal('compose-user-message',{targetUserId:'all'});
                    break;
                }
                case 'message-target': {
                    const target=el.dataset.target==='one' ? (state.users.find(u=>u.role!=='admin')?.id || 'all') : 'all';
                    openModal('compose-user-message',{targetUserId:target});
                    break;
                }
                case 'send-user-message': {
                    const title=(document.getElementById('admin-message-title')?.value||'').trim();
                    const body=(document.getElementById('admin-message-body')?.value||'').trim();
                    const targetUserId=document.getElementById('message-target-user')?.value || (state.modal?.targetUserId!=='all'?state.modal?.targetUserId:null);
                    if(!title) return showToast('اكتب عنوان الرسالة.','error');
                    if(!body) return showToast('اكتب نص الرسالة.','error');
                    const btn=el;btn.disabled=true;btn.textContent='جاري الإرسال…';
                    try{
                        const viewsRaw=document.getElementById('admin-message-views')?.value || '1';
                    const max_views=viewsRaw==='unlimited' ? null : Math.max(1,parseInt(viewsRaw,10)||1);
                    const {error}=await sb.from('user_messages').insert({target_user_id:targetUserId||null,title,body,max_views,is_active:true});
                        if(error) throw error;
                        closeModal(); await openUsersManagement(); showToast(targetUserId?'تم إرسال الرسالة للحساب المحدد.':'تم إرسال الرسالة لجميع الحسابات.','success');
                    }catch(err){showToast(`تعذر إرسال الرسالة: ${err.message||'خطأ غير معروف'}`,'error');btn.disabled=false;btn.textContent='إرسال الرسالة';}
                    break;
                }
                case 'hide-admin-message': {
                    const messageId=el.dataset.messageId;
                    if(!messageId) break;
                    try{
                        const {error}=await sb.rpc('admin_hide_message',{p_message_id:messageId});
                        if(error) throw error;
                        state.adminMessages=(state.adminMessages||[]).filter(m=>String(m.id)!==String(messageId));
                        render();
                        showToast('تم إخفاء الرسالة من قائمتك.','success');
                    }catch(err){showToast(`تعذر إخفاء الرسالة: ${err.message||'خطأ غير معروف'}`,'error');}
                    break;
                }
                case 'delete-admin-message': {
                    const messageId=el.dataset.messageId;
                    if(!messageId) break;
                    const msg=(state.adminMessages||[]).find(m=>String(m.id)===String(messageId));
                    if(!msg) break;
                    const collective=!msg.target_user_id;
                    askConfirm(collective?'سيتم حذف هذه الرسالة نهائيًا ولن تظهر لأي حساب. هل تريد المتابعة؟':'سيتم حذف هذه الرسالة نهائيًا من قائمة الرسائل. هل تريد المتابعة؟', async()=>{
                        try{
                            const {error}=await sb.rpc('admin_delete_message',{p_message_id:messageId});
                            if(error) throw error;
                            closeConfirm();
                            await openUsersManagement();
                            showToast(collective?'تم حذف الرسالة عن الكل.':'تم حذف الرسالة.','success');
                        }catch(err){closeConfirm();showToast(`تعذر حذف الرسالة: ${err.message||'خطأ غير معروف'}`,'error');}
                    }, {confirmLabel:collective?'حذف عن الكل':'حذف الرسالة', confirmClass:'btn-danger'});
                    break;
                }
                case 'user-create-temp': {
                    openModal('user-create-temp',{});
                    break;
                }
                case 'user-save-edit': {
                    const u=state.modal?.user;
                    if(!u) break;
                    const name=(document.getElementById('um-edit-name')?.value||'').trim();
                    const phone=(document.getElementById('um-edit-phone')?.value||'').trim();
                    const title=(document.getElementById('um-edit-title')?.value||'').trim();
                    const newRole=document.getElementById('um-edit-role')?.value||null;
                    if(!name) return showToast('اكتب الاسم أولًا.','error');
                    const btn=el; btn.disabled=true; btn.textContent='جاري الحفظ…';
                    try{
                        const {data,error}=await sb.rpc('admin_update_user_profile',{p_user_id:u.id,p_name:name,p_phone:phone||null,p_title:title||null,p_role:newRole});
                        if(error) throw error;
                        if(data?.error) throw new Error(data.error);
                        closeModal(); await openUsersManagement(); showToast('تم حفظ بيانات المستخدم والصلاحية.','success');
                    }catch(err){showToast(`تعذر الحفظ: ${err.message}`,'error');btn.disabled=false;btn.textContent='حفظ';}
                    break;
                }
                case 'user-approve': {
                    const userId=el.dataset.userId;
                    const u=state.users.find(x=>String(x.id)===String(userId));
                    if(!u) break;
                    askConfirm('هل أنت متأكد من قبول الحساب؟', async()=>{
                        try{
                            const {error}=await sb.rpc('admin_approve_user',{p_user_id:userId});
                            if(error) throw error;
                            closeConfirm(); await openUsersManagement(); showToast('تم قبول الحساب بنجاح.','success');
                        }catch(err){closeConfirm();showToast(`تعذر قبول الحساب: ${err.message}`,'error');}
                    }, {confirmLabel:'تأكيد القبول', confirmClass:'btn-save'});
                    break;
                }
                case 'user-revoke': {
                    const u=state.users.find(x=>String(x.id)===String(el.dataset.userId));
                    if(u) openModal('user-reject',{user:u});
                    break;
                }
                case 'user-save-reject': {
                    const u=state.modal?.user;
                    if(!u) break;
                    const note=(document.getElementById('um-reject-note')?.value||'').trim();
                    if(!note) return showToast('اكتب رسالة الرفض أولًا.','error');
                    const btn=el;btn.disabled=true;btn.textContent='جاري الحفظ…';
                    try{
                        const {error}=await sb.rpc('admin_reject_user',{p_user_id:u.id,p_note:note});
                        if(error) throw error;
                        closeModal(); await openUsersManagement(); showToast('تم حفظ الرفض ورسالة المستخدم.','success');
                    }catch(err){showToast(`تعذر حفظ الرفض: ${err.message}`,'error');btn.disabled=false;btn.textContent='حفظ الرفض';}
                    break;
                }
                case 'user-force-password': {
                    const userId=el.dataset.userId; const u=state.users.find(x=>String(x.id)===String(userId)); if(!u) break;
                    openModal('force-password',{user:u});
                    break;
                }
                case 'user-save-force-password': {
                    const u=state.modal?.user; if(!u) break;
                    const password=document.getElementById('force-new-password')?.value||'';
                    const confirm=document.getElementById('force-confirm-password')?.value||'';
                    if(password.length<6) return showToast('كلمة السر يجب ألا تقل عن 6 أحرف.','error');
                    if(password!==confirm) return showToast('كلمتا السر غير متطابقتين.','error');
                    const btn=el; btn.disabled=true; btn.textContent='جاري التعيين…';
                    try{
                        const {data,error}=await sb.functions.invoke('admin-user-management',{body:{action:'force_password',user_id:u.id,password}});
                        if(error) throw error;
                        if(data?.error) throw new Error(data.error);
                        closeModal(); await openUsersManagement(); showToast('تم تعيين كلمة السر الجديدة، وسيُطلب من المستخدم تغييرها عند دخوله القادم.','success');
                    }catch(err){showToast(`تعذر تعيين كلمة السر: ${err.message||'تأكد من نشر Edge Function.'}`,'error');btn.disabled=false;btn.textContent='حفظ كلمة السر';}
                    break;
                }
                case 'user-login-history': {
                    const userId=el.dataset.userId; const u=state.users.find(x=>String(x.id)===String(userId)); if(!u) break;
                    openModal('login-history',{user:u,history:null});
                    try{const {data,error}=await sb.rpc('admin_get_user_login_history',{p_user_id:userId}); if(error) throw error; state.modal.history=Array.isArray(data)?data:[]; render();}
                    catch(err){showToast(`تعذر تحميل سجل الدخول: ${err.message||'خطأ غير معروف'}`,'error');}
                    break;
                }
                case 'user-reapply': {
                    const userId=el.dataset.userId;
                    askConfirm('سيتم إيقاف الوصول للمحتوى ووضع الحساب في انتظار موافقتك مرة أخرى.', async()=>{
                        try{
                            const {error}=await sb.rpc('admin_request_reapproval',{p_user_id:userId});
                            if(error) throw error;
                            closeConfirm(); await openUsersManagement(); showToast('تم تحويل الحساب إلى انتظار الموافقة من جديد.','success');
                        }catch(err){closeConfirm();showToast(`تعذر تنفيذ الطلب: ${err.message}`,'error');}
                    }, {confirmLabel:'تأكيد طلب الإذن', confirmClass:'btn-save'});
                    break;
                }
                case 'user-delete': {
                    const userId=el.dataset.userId;
                    const u=state.users.find(x=>String(x.id)===String(userId));
                    if(!u||u.role==='admin') return showToast('لا يمكن حذف حساب الأدمن من هنا.','error');
                    askConfirm(`سيتم حذف حساب ${userDisplayName(u)} نهائيًا. لا يمكن التراجع عن هذه العملية.`, async()=>{
                        try{
                            let done=false, rpcErr=null;
                            try{
                                const r=await sb.rpc('admin_delete_user',{p_user_id:userId});
                                if(!r.error){done=true;} else rpcErr=r.error;
                            }catch(_){}
                            if(!done){
                                const r=await sb.functions.invoke('admin-user-management',{body:{action:'delete',user_id:userId}});
                                if(r.error) throw rpcErr||r.error;
                                done=true;
                            }
                            closeConfirm(); await openUsersManagement(); showToast('تم حذف الحساب نهائيًا.','success');
                        }catch(err){closeConfirm();showToast(`تعذر حذف الحساب: ${err.message||'تأكد من نشر دالة الإدارة.'}`,'error');}
                    });
                    break;
                }
                case 'user-save-create-temp': {
                    const email=(document.getElementById('temp-admin-email')?.value||'').trim().toLowerCase();
                    const password=document.getElementById('temp-admin-password')?.value||'';
                    if(!email||!email.includes('@')) return showToast('اكتب بريدًا صحيحًا.','error');
                    if(password.length<6) return showToast('كلمة السر يجب ألا تقل عن 6 أحرف.','error');
                    const btn=el;btn.disabled=true;btn.textContent='جاري إنشاء الحساب…';
                    try{
                        const {data,error}=await sb.functions.invoke('admin-user-management',{body:{action:'create_temporary',email,password}});
                        if(error) throw error;
                        if(data?.error) throw new Error(data.error);
                        closeModal(); await openUsersManagement(); showToast('تم إنشاء الحساب المؤقت بنجاح.','success');
                    }catch(err){showToast(`تعذر إنشاء الحساب المؤقت: ${err.message||'تأكد من نشر Edge Function.'}`,'error');btn.disabled=false;btn.textContent='إنشاء الحساب';}
                    break;
                }
                case 'logout': {
                    explicitLogout=true;
                    await sb.auth.signOut();
                    location.replace('index.html');
                    return;
                }

                case 'go-home':
                    go('home');
                    break;

                case 'open-section': {
                    const id = el.dataset.section;
                    if (id) go('section', { sectionId: id });
                    break;
                }

                case 'go-section': {
                    const id = state.currentSectionId;
                    if (id) go('section', { sectionId: id });
                    else go('home');
                    break;
                }

                case 'open-subsection': {
                    const subId = el.dataset.sub;
                    const sectionId = state.currentSectionId;
                    if (sectionId && subId) {
                        go('subsection', { sectionId, subId });
                    }
                    break;
                }

                case 'open-profile': {
                    go('profile');
                    break;
                }

                case 'toggle-profile': {
                    const dropdown = document.getElementById('profileDropdown');
                    const trigger = el.closest('.profile-trigger');
                    if (dropdown && trigger) {
                        dropdown.classList.toggle('open');
                        trigger.classList.toggle('open');
                    }
                    break;
                }

                case 'save-required-phone': {
                    const phone=(document.getElementById('required-phone')?.value||'').trim().replace(/\s+/g,'').replace(/-/g,'');
                    if(!phone) { showToast('اكتب رقم التليفون أولًا.','error'); break; }
                    const btn=el; btn.disabled=true; btn.textContent='جاري الحفظ…';
                    try {
                        const {data,error}=await sb.rpc('set_my_phone_once',{p_phone:phone});
                        if(error) throw error;
                        const updated=data||{};
                        state.user.phone=updated.phone_number||updated.phone||phone;
                        const pending=state.pendingUserMessages||[];
                        state.pendingUserMessages=[];
                        closeModal(); render(); showToast('تم حفظ رقم التليفون بنجاح.','success');
                        if(pending.length){
                            setTimeout(()=>{ openModal('user-message',{messages:pending}); const ids=pending.map(x=>x.id).filter(Boolean); if(ids.length) void sb.rpc('mark_my_messages_read',{p_message_ids:ids}).then(()=>{},()=>{}); },120);
                        }
                    } catch(err) { showToast(err.message||'تعذر حفظ رقم التليفون.','error'); btn.disabled=false; btn.textContent='حفظ والمتابعة'; }
                    break;
                }

                case 'edit-profile': {
                    const u = state.user;
                    openModal('profile', { name: u.name, email: u.email, avatar: u.avatar });
                    break;
                }

                case 'save-profile': {
                    const m=state.modal; if(!m) break; const btn=el; btn.disabled=true; btn.textContent='جاري الحفظ…';
                    try {
                        const {data:{user:authUser}}=await sb.auth.getUser(); if(!authUser) throw new Error('انتهت جلسة الدخول.');
                        const name=(m.name||state.user.name||'عضو').trim();
                        let avatarPath=null;
                        if(m.avatarFile) avatarPath=await uploadFile('avatars',m.avatarFile,authUser.id);
                        const patch={full_name:name,name,updated_at:new Date().toISOString()};
                        if(avatarPath){patch.avatar_path=avatarPath;patch.avatar_url=publicStorageUrl('avatars',avatarPath);}
                        const {data:updated,error}=await sb.rpc('update_my_profile',{
                            p_name:name, p_avatar_path:avatarPath || null, p_avatar_url:avatarPath ? publicStorageUrl('avatars',avatarPath) : null
                        });
                        if(error) throw new Error(`فشل حفظ الملف الشخصي في قاعدة البيانات: ${error.message}`);
                        if(!updated) throw new Error('لم تُحفظ بيانات الملف الشخصي.');
                        state.user.name=updated.full_name||updated.name||name;
                        state.user.avatar=publicStorageUrl('avatars',updated.avatar_path||updated.avatar_url);
                        closeModal(); render(); showToast('تم حفظ الملف الشخصي والصورة في Supabase','success');
                    } catch(err){console.error(err);showToast(err.message||'تعذر حفظ الملف الشخصي','error');btn.disabled=false;btn.textContent='حفظ';}
                    break;
                }

                case 'change-pass': {
                    openModal('password', {});
                    break;
                }

                case 'save-pass': {
                    const old = document.getElementById('old-pass')?.value;
                    const newP = document.getElementById('new-pass')?.value;
                    const confirm = document.getElementById('confirm-pass')?.value;
                    if (!old || !newP || !confirm) {
                        showToast('يرجى ملء جميع الحقول', 'error');
                        return;
                    }
                    if (newP !== confirm) {
                        showToast('كلمة السر الجديدة وتأكيدها غير متطابقين', 'error');
                        return;
                    }
                    showToast('تم تغيير كلمة السر بنجاح', 'success');
                    closeModal();
                    break;
                }

                case 'download-file': {
                    const fileData = el.dataset.file;
                    const fileName = el.dataset.name || 'محاضرة';
                    if (fileData) {
                        await downloadMaterial({ filePath: fileData, fileData, fileName });
                    }
                    break;
                }

                // ─── Admin: Add Section ───
                case 'add-section': {
                    if (isAdmin()) {
                        openModal('add-section', {visibilityMode:'all',allowedUsers:[],excludedUsers:[],ownerId:state.user?.id||null});
                    }
                    break;
                }

                // ─── Admin: Edit Section ───
                case 'edit-section': {
                    if (isAdmin()) {
                        const section = findSection(el.dataset.section);
                        if (section) {
                            openModal('section', { name: section.name, image: section.image, targetId: section.id, visibilityMode: section.visibilityMode||'all', ownerId: section.ownerId||state.user?.id||null, allowedUsers: section.allowedUsers||[], excludedUsers: section.excludedUsers||[] });
                        }
                    }
                    break;
                }

                // ─── Admin: Delete Section ───
                case 'delete-section': {
                    if (isAdmin()) {
                        const id = el.dataset.section;
                        askConfirm('هل أنت متأكد من حذف هذا القسم وكل محتوياته؟', () => {
                            state.sections = state.sections.filter(s => s.id !== id);
                            saveData();
                            closeConfirm();
                            go('home');
                            showToast('تم حذف القسم', 'success');
                        });
                    }
                    break;
                }

                // ─── Admin: Add Sub ───
                case 'add-sub': {
                    if (isAdmin()) {
                        openModal('add-sub', {visibilityMode:'all',allowedUsers:[],excludedUsers:[],ownerId:state.user?.id||null});
                    }
                    break;
                }

                // ─── Admin: Edit Sub ───
                case 'edit-sub': {
                    if (isAdmin()) {
                        const sub = findSub(state.currentSectionId, el.dataset.sub);
                        if (sub) {
                            openModal('sub', { name: sub.name, image: sub.image, targetId: sub.id, visibilityMode: sub.visibilityMode||'all', ownerId: sub.ownerId||state.user?.id||null, allowedUsers: sub.allowedUsers||[], excludedUsers: sub.excludedUsers||[] });
                        }
                    }
                    break;
                }

                // ─── Admin: Delete Sub ───
                case 'delete-sub': {
                    if (isAdmin()) {
                        const subId = el.dataset.sub;
                        askConfirm('هل أنت متأكد من حذف هذا القسم الفرعي وكل محتوياته؟', () => {
                            const section = findSection(state.currentSectionId);
                            if (section) {
                                section.subs = section.subs.filter(s => s.id !== subId);
                                saveData();
                            }
                            closeConfirm();
                            render();
                            showToast('تم حذف القسم الفرعي', 'success');
                        });
                    }
                    break;
                }

                // ─── Admin: Add Item ───
                case 'add-item': {
                    if (isAdmin()) {
                        if(!state.users.length){ try{ const {data,error}=await sb.from('profiles').select('*').order('created_at',{ascending:false}); if(error) throw error; state.users=data||[]; }catch(err){ return showToast('تعذر تحميل قائمة المستخدمين: '+err.message,'error'); } }
                        openModal('add-item', {visibilityMode:'all',allowedUsers:[],excludedUsers:[]});
                    }
                    break;
                }

                // ─── Admin: Edit Item ───
                case 'edit-item': {
                    if (isAdmin()) {
                        const item = findItem(state.currentSectionId, state.currentSubId, el.dataset.item);
                        if (item) {
                            if(!state.users.length){ try{ const {data,error}=await sb.from('profiles').select('*').order('created_at',{ascending:false}); if(error) throw error; state.users=data||[]; }catch(err){ return showToast('تعذر تحميل قائمة المستخدمين: '+err.message,'error'); } }
                            openModal('item', { name: item.name, image: item.image, fileName: item.fileName, fileData: item.fileData, targetId: item.id, visibilityMode:item.visibilityMode||'all', allowedUsers:item.allowedUsers||[], excludedUsers:item.excludedUsers||[], ownerId:item.ownerId||state.user?.id||null });
                        }
                    }
                    break;
                }

                // ─── Admin: Delete Item ───
                case 'delete-item': {
                    if(isAdmin()){
                        const itemId=el.dataset.item;
                        askConfirm('هل أنت متأكد من حذف هذا المستطيل؟',async()=>{
                            try{const item=findItem(state.currentSectionId,state.currentSubId,itemId);if(!item)throw new Error('المستطيل غير موجود');
                                if(item.dbId){const {error}=await sb.from('materials').delete().eq('id',item.dbId);if(error)throw error;}
                                closeConfirm();await loadData();render();showToast('تم حذف المستطيل من قاعدة البيانات','success');
                            }catch(err){closeConfirm();showToast(`تعذر الحذف: ${err.message}`,'error');}});
                    }
                    break;
                }

                // ─── Admin: Save Modal ───
                case 'save-modal': {
                    await saveModal();
                    break;
                }

                // ─── Admin: Delete Modal ───
                case 'delete-modal': {
                    const m = state.modal;
                    if (!m) return;
                    if (m.kind === 'section') {
                        const id = m.targetId;
                        closeModal();
                        askConfirm('هل أنت متأكد من حذف هذا القسم وكل محتوياته؟', () => {
                            state.sections = state.sections.filter(s => s.id !== id);
                            saveData();
                            closeConfirm();
                            go('home');
                            showToast('تم حذف القسم', 'success');
                        });
                    } else if (m.kind === 'sub') {
                        const id = m.targetId;
                        closeModal();
                        askConfirm('هل أنت متأكد من حذف هذا القسم الفرعي وكل محتوياته؟', () => {
                            const section = findSection(state.currentSectionId);
                            if (section) {
                                section.subs = section.subs.filter(s => s.id !== id);
                                saveData();
                            }
                            closeConfirm();
                            render();
                            showToast('تم حذف القسم الفرعي', 'success');
                        });
                    } else if (m.kind === 'item') {
                        const id = m.targetId;
                        closeModal();
                        askConfirm('هل أنت متأكد من حذف هذا المستطيل؟', () => {
                            const sub = findSub(state.currentSectionId, state.currentSubId);
                            if (sub) {
                                sub.items = sub.items.filter(i => i.id !== id);
                                saveData();
                            }
                            closeConfirm();
                            render();
                            showToast('تم حذف المستطيل', 'success');
                        });
                    }
                    break;
                }

                case 'confirm-yes': {
                    if (state.confirm && state.confirm.onYes) {
                        state.confirm.onYes();
                    }
                    break;
                }

                default:
                    break;
            }
        }

        // ─── Save Modal Data ───

        async function saveModal(){
            const m=state.modal; if(!m)return; if(!isAdmin()){showToast('غير مصرح به','error');return;}
            const btn=document.querySelector('[data-act="save-modal"]'); if(btn){btn.disabled=true;btn.textContent='جاري الرفع والحفظ…';}
            try{
                const nameInput=document.getElementById('modal-name'); if(nameInput)m.name=nameInput.value.trim();
                if((m.kind==='add-section'||m.kind==='section'||m.kind==='add-sub'||m.kind==='sub') && !m.name)throw new Error('اكتب اسم القسم أو القسم الفرعي أولًا.');
                const imageBucket=(m.kind==='item'||m.kind==='add-item')?'materials':(m.kind==='sub'||m.kind==='add-sub'?'subcategories':'categories');
                const imagePath=m.imageFile?await uploadFile(imageBucket,m.imageFile,'images'):(m.image&&!String(m.image).startsWith('blob:')?m.image:null);
                const filePath=m.fileFile?await uploadFile('materials',m.fileFile,'files'):(m.fileData&&!String(m.fileData).startsWith('data:')?m.fileData:null);
                m.visibilityMode=document.getElementById('content-visibility')?.value||m.visibilityMode||'all'; m.allowedUsers=[...(document.getElementById('content-allow-users')?.selectedOptions||[])].map(o=>o.value); m.excludedUsers=[...(document.getElementById('content-deny-users')?.selectedOptions||[])].map(o=>o.value);
                const ownerId=m.ownerId||state.user?.id||null;
                if(m.kind==='add-section'){
                    const {data:newRow,error}=await sb.from('categories').insert({name:m.name,image_path:imagePath,sort_order:state.sections.length,is_active:true,visibility_mode:m.visibilityMode||'all',owner_id:ownerId}).select('id').single();if(error)throw error;
                    const rows=[...(m.allowedUsers||[]).filter(id=>id!==ownerId).map(user_id=>({category_id:newRow.id,user_id,access_type:'allow'})),...(m.excludedUsers||[]).filter(id=>id!==ownerId).map(user_id=>({category_id:newRow.id,user_id,access_type:'deny'}))]; if(rows.length){const {error:e}=await sb.from('category_user_access').insert(rows);if(e)throw e;}
                } else if(m.kind==='section'){
                    const section=findSection(m.targetId);if(!section)throw new Error('القسم غير موجود');const patch={name:m.name,visibility_mode:m.visibilityMode||'all',owner_id:ownerId};if(imagePath)patch.image_path=imagePath;const {error}=await sb.from('categories').update(patch).eq('id',section.dbId);if(error)throw error;
                    await sb.from('category_user_access').delete().eq('category_id',section.dbId); const rows=[...(m.allowedUsers||[]).filter(id=>id!==ownerId).map(user_id=>({category_id:section.dbId,user_id,access_type:'allow'})),...(m.excludedUsers||[]).filter(id=>id!==ownerId).map(user_id=>({category_id:section.dbId,user_id,access_type:'deny'}))]; if(rows.length){const {error:e}=await sb.from('category_user_access').insert(rows);if(e)throw e;}
                } else if(m.kind==='add-sub'){
                    const section=findSection(state.currentSectionId);if(!section)throw new Error('اختر قسمًا أولًا');const {data:newRow,error}=await sb.from('subcategories').insert({category_id:section.dbId,name:m.name,image_path:imagePath,sort_order:section.subs.length,visibility_mode:m.visibilityMode||'all',owner_id:ownerId}).select('id').single();if(error)throw error;
                    const rows=[...(m.allowedUsers||[]).filter(id=>id!==ownerId).map(user_id=>({subcategory_id:newRow.id,user_id,access_type:'allow'})),...(m.excludedUsers||[]).filter(id=>id!==ownerId).map(user_id=>({subcategory_id:newRow.id,user_id,access_type:'deny'}))]; if(rows.length){const {error:e}=await sb.from('subcategory_user_access').insert(rows);if(e)throw e;}
                } else if(m.kind==='sub'){
                    const sub=findSub(state.currentSectionId,m.targetId);if(!sub)throw new Error('القسم الفرعي غير موجود');const patch={name:m.name,visibility_mode:m.visibilityMode||'all',owner_id:ownerId};if(imagePath)patch.image_path=imagePath;const {error}=await sb.from('subcategories').update(patch).eq('id',sub.dbId);if(error)throw error;
                    await sb.from('subcategory_user_access').delete().eq('subcategory_id',sub.dbId); const rows=[...(m.allowedUsers||[]).filter(id=>id!==ownerId).map(user_id=>({subcategory_id:sub.dbId,user_id,access_type:'allow'})),...(m.excludedUsers||[]).filter(id=>id!==ownerId).map(user_id=>({subcategory_id:sub.dbId,user_id,access_type:'deny'}))]; if(rows.length){const {error:e}=await sb.from('subcategory_user_access').insert(rows);if(e)throw e;}
                }
                else if(m.kind==='add-item'){const sub=findSub(state.currentSectionId,state.currentSubId);if(!sub)throw new Error('اختر قسمًا فرعيًا أولًا');if(sub.items.length>=30)throw new Error('وصلت للحد الأقصى (30 مستطيل)');const {data:newItem,error}=await sb.from('materials').insert({title:m.name||null,image_path:imagePath||null,file_path:filePath||null,subcategory_id:sub.dbId,sort_order:sub.items.length,is_active:true,visibility_mode:m.visibilityMode||'all',owner_id:ownerId}).select('id').single();if(error)throw error; const accessRows=[...(m.allowedUsers||[]).filter(id=>id!==ownerId).map(user_id=>({material_id:newItem.id,user_id,access_type:'allow'})), ...(m.excludedUsers||[]).filter(id=>id!==ownerId).map(user_id=>({material_id:newItem.id,user_id,access_type:'deny'}))]; if(accessRows.length){const {error:ae}=await sb.from('material_user_access').insert(accessRows);if(ae)throw ae;}}
                else if(m.kind==='item'){const item=findItem(state.currentSectionId,state.currentSubId,m.targetId);if(!item)throw new Error('المستطيل غير موجود');const patch={title:m.name,visibility_mode:m.visibilityMode||'all',owner_id:ownerId};if(imagePath)patch.image_path=imagePath;if(filePath)patch.file_path=filePath;const {error}=await sb.from('materials').update(patch).eq('id',item.dbId);if(error)throw error;
                    await sb.from('material_user_access').delete().eq('material_id',item.dbId);
                    const accessRows=[...(m.allowedUsers||[]).filter(id=>id!==ownerId).map(user_id=>({material_id:item.dbId,user_id,access_type:'allow'})), ...(m.excludedUsers||[]).filter(id=>id!==ownerId).map(user_id=>({material_id:item.dbId,user_id,access_type:'deny'}))];
                    if(accessRows.length){ const {error:ae}=await sb.from('material_user_access').insert(accessRows); if(ae)throw ae; }}
                else return;
                await loadData();closeModal();render();showToast('تم الحفظ في قاعدة البيانات وStorage بنجاح','success');
            }catch(err){console.error('saveModal',err);showToast(err.message||'تعذر الحفظ. راجع Storage/RLS في Supabase.','error');}
            finally{if(btn){btn.disabled=false;btn.textContent='حفظ';}}
        }


        // ════════════════════════════════════════════════════════════════════
        //  INIT
        // ════════════════════════════════════════════════════════════════════

        // ════════════════════════════════════════════════════════════════════
        // BOOT: index.html = login. 2.html = authenticated main application.
        // The role is detected automatically from Supabase.
        // ════════════════════════════════════════════════════════════════════
        function renderAccessMessage(title,text,buttonText='العودة لتسجيل الدخول'){
            const app=document.getElementById('app');
            app.innerHTML=`<div class="login-wrap"><div class="login-brand">محاضرات</div><div class="login-sub"><strong>${title}</strong><br><span>${text}</span><br><button class="login-btn" style="margin-top:18px" onclick="location.replace('index.html')">${buttonText}</button></div></div>`;
        }

        async function bootApp(){
            try{
                const {data:{session}}=await sb.auth.getSession();
                if(!session?.user){renderAccessMessage('لا توجد جلسة دخول','افتح index.html وسجل الدخول أولًا.');return;}
                const {data:profile,error}=await sb.from('profiles').select('*').eq('id',session.user.id).maybeSingle();
                if(error)throw error;
                if(!profile){renderAccessMessage('الحساب غير مكتمل','توجد جلسة Auth لكن لا يوجد سجل لهذا المستخدم في profiles.');return;}
                const admin=profile.role==='admin';
                if(!admin&&profile.status==='revoked'){renderAccessMessage('الحساب موقوف','تواصل مع الإدارة لإعادة التفعيل.');return;}
                if(!admin&&profile.status==='pending'){renderAccessMessage('الحساب في انتظار الموافقة','بعد الموافقة ستتمكن من الدخول.');return;}
                if(!admin&&(profile.must_change_credentials||profile.account_type==='temporary'||profile.is_temporary===true)){renderAccessMessage('الحساب مؤقت','أكمل بيانات الحساب من index.html أولًا.');return;}
                if(!admin&&profile.must_change_password){renderAccessMessage('تغيير كلمة السر مطلوب','سجّل الدخول من index.html لتعيين كلمة سر جديدة قبل دخول المنصة.');return;}
                state.role=profile.role==='super_admin'?'super_admin':(admin?'admin':'member');
                state.user={name:profile.full_name||profile.name||session.user.user_metadata?.full_name||'عضو',email:profile.email||session.user.email||'',phone:profile.phone_number||profile.phone||'',avatar:publicStorageUrl('avatars',profile.avatar_path||profile.avatar_url), isOwnerAdmin:!!profile.is_owner_admin};
                void sb.rpc('record_user_open').then(()=>{},()=>{});
                await loadData();state.view='home';render();
                try{
                    const {data:messages,error:messagesError}=await sb.rpc('get_my_unread_messages');
                    if(!messagesError && Array.isArray(messages) && messages.length){
                        state.pendingUserMessages=messages;
                        if(state.user.phone){
                            openModal('user-message',{messages});
                            const ids=messages.map(x=>x.id).filter(Boolean);
                            if(ids.length) void sb.rpc('mark_my_messages_read',{p_message_ids:ids}).then(()=>{},()=>{});
                        }
                    }
                }catch(_){}
                if(!state.user.phone){
                    openModal('phone-required',{});
                }
            }catch(e){console.error(e);renderAccessMessage('تعذر تحميل المنصة',e.message||'خطأ غير معروف.');}
        }
        let explicitLogout=false;
        sb.auth.onAuthStateChange((event)=>{if(event==='SIGNED_OUT'&&explicitLogout)location.replace('index.html');});

        bootApp();

        console.log('📚 محاضرات · منصة المذكرات');
        console.log('👤 العضو:', state.user.name);
        console.log('📂 الأقسام:', state.sections.length);
    