




            const {
                gsap,
                gsap: { registerPlugin, set, to, timeline },
                MorphSVGPlugin,
                Draggable,
            } = window;
            registerPlugin(MorphSVGPlugin);

            const AUDIO = { CLICK: new Audio("https://assets.codepen.io/605876/click.mp3") };
            const ON = document.querySelector("#on");
            const OFF = document.querySelector("#off");
            const LOGIN_FORM = document.querySelector(".login-form");
            document.documentElement.style.setProperty("--on","0");
            LOGIN_FORM.classList.remove("active");

            const PROXY = document.createElement("div");
            const CORDS = gsap.utils.toArray(".cords path");
            const CORD_DURATION = 0.1;
            const HIT = document.querySelector(".lamp__hit");
            const DUMMY_CORD = document.querySelector(".cord--dummy");
            const ENDX = DUMMY_CORD.getAttribute("x2");
            const ENDY = DUMMY_CORD.getAttribute("y2");
            const RESET = () => set(PROXY,{x:ENDX,y:ENDY});
            RESET();

            let startX,startY;
            const STATE={ON:false};
            gsap.set([".cords",HIT],{x:-10});
            gsap.set(".lamp__eye",{rotate:180,transformOrigin:"50% 50%",yPercent:50});

            const CORD_TL=timeline({
                paused:true,
                onStart:()=>{
                    STATE.ON=!STATE.ON;
                    set(document.documentElement,{"--on":STATE.ON?1:0});
                    const hue=gsap.utils.random(0,359);
                    set(document.documentElement,{"--shade-hue":hue});
                    set(document.documentElement,{"--glow-color":`hsl(${hue},40%,45%)`,"--glow-color-dark":`hsl(${hue},40%,35%)`});
                    set(".lamp__eye",{rotate:STATE.ON?0:180});
                    set([DUMMY_CORD,HIT],{display:"none"});
                    set(CORDS[0],{display:"block"});
                    AUDIO.CLICK.play().catch(()=>{});
                    LOGIN_FORM.classList.toggle("active",STATE.ON);
                    if(STATE.ON){ON.setAttribute("checked",true);OFF.removeAttribute("checked");}
                    else{ON.removeAttribute("checked");OFF.setAttribute("checked",true);}
                },
                onComplete:()=>{set([DUMMY_CORD,HIT],{display:"block"});set(CORDS[0],{display:"none"});RESET();}
            });
            for(let i=1;i<CORDS.length;i++) CORD_TL.add(to(CORDS[0],{morphSVG:CORDS[i],duration:CORD_DURATION,repeat:1,yoyo:true}));

            Draggable.create(PROXY,{
                trigger:HIT,type:"x,y",
                onPress:e=>{startX=e.x;startY=e.y;},
                onDrag(){set(DUMMY_CORD,{attr:{x2:this.x,y2:Math.max(400,this.y)}});},
                onRelease(e){
                    const dx=Math.abs(e.x-startX),dy=Math.abs(e.y-startY);
                    const travelled=Math.sqrt(dx*dx+dy*dy);
                    to(DUMMY_CORD,{attr:{x2:ENDX,y2:ENDY},duration:CORD_DURATION,onComplete:()=>travelled>50?CORD_TL.restart():RESET()});
                }
            });

            const loginTab=document.querySelector("#loginTab");
            const registerTab=document.querySelector("#registerTab");
            const loginView=document.querySelector("#loginView");
            const temporaryView=document.querySelector("#temporaryView");
            const forcePasswordView=document.querySelector("#forcePasswordView");
            const registerView=document.querySelector("#registerView");
            const authMessage=document.querySelector("#authMessage");

            function showView(view){
                [loginView,temporaryView,forcePasswordView,registerView].forEach(v=>v.classList.remove("active"));
                view.classList.add("active");
                loginTab.classList.toggle("active",view===loginView||view===temporaryView);
                registerTab.classList.toggle("active",view===registerView);
                clearMessage();
            }
            function message(text,type=""){
                authMessage.textContent=text;
                authMessage.className="auth-message show "+type;
            }
            function clearMessage(){
                authMessage.textContent="";
                authMessage.className="auth-message";
            }

            loginTab.onclick=()=>showView(loginView);
            registerTab.onclick=()=>showView(registerView);

            document.querySelectorAll(".toggle-password").forEach(btn=>btn.addEventListener("click",()=>{
                const input=document.getElementById(btn.dataset.target);
                input.type=input.type==="password"?"text":"password";
                btn.textContent=input.type==="password"?"إظهار":"إخفاء";
            }));

            // ═══════════════════════════════════════════════════════════════
            // SUPABASE AUTH
            // ═══════════════════════════════════════════════════════════════
            const SUPABASE_URL = "https://clobfjrjhdysmqhbwzlc.supabase.co";
            const SUPABASE_KEY = "sb_publishable_LEFYVl0Y8VOnMIbBZev1Vg_0pYSMWpv";
            const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

            function normalizePhone(phone){
                return phone.replace(/\s+/g,'').replace(/-/g,'');
            }

            async function getProfile(userId){
                const { data, error } = await sb.from('profiles').select('*').eq('id', userId).maybeSingle();
                if(error) throw error;
                return data;
            }

            async function getProfileByPhone(phone){
                const normalized = normalizePhone(phone);
                const { data, error } = await sb.from('profiles').select('id,email,phone,phone_number,role,status,must_change_password,must_change_credentials,account_type,account_origin,full_name,name').or(`phone.eq.${normalized},phone_number.eq.${normalized}`).maybeSingle();
                if(error) throw error;
                return data;
            }

            function roleOf(profile){
                return profile?.role === 'admin' ? 'admin' : 'member';
            }

            function isTemporaryProfile(profile){
                return profile?.account_type === 'temporary' || profile?.is_temporary === true || profile?.must_change_credentials === true;
            }

            function openContent(profile){
                const user = {
                    name: profile?.full_name || profile?.name || 'عضو',
                    email: profile?.email || '',
                    phone: profile?.phone_number || profile?.phone || '',
                    role: roleOf(profile),
                    account_type: profile?.account_type || 'normal',
                    status: profile?.status || 'approved'
                };
                sessionStorage.setItem('mohadarat_user', JSON.stringify(user));
                sessionStorage.setItem('mohadarat_role', user.role);
                location.replace('2.html?v=11');
            }

            async function showForcedPasswordChange(){
                document.querySelector('#forcedNewPassword').value='';
                document.querySelector('#forcedConfirmPassword').value='';
                showView(forcePasswordView);
                message('تغيير كلمة السر مطلوب قبل الدخول إلى المنصة.','error');
            }

            async function getLatestRejectedNote(userId){
                try{const {data}=await sb.from('account_requests').select('note').eq('user_id',userId).eq('status','rejected').order('created_at',{ascending:false}).limit(1).maybeSingle();return data?.note||'';}catch(_){return '';}
            }

            async function handleLoggedInUser(authUser){
                let profile = await getProfile(authUser.id);
                if(!profile){
                    // لو التريجر أنشأ الـ auth فقط ولم ينشئ profile، نحاول إنشاءه.
                    const { data, error } = await sb.from('profiles').insert({
                        id: authUser.id,
                        email: authUser.email || null,
                        role: 'user',
                        status: 'approved',
                        must_change_password: true,
                        must_change_credentials: true,
                        account_type: 'temporary',
                        account_origin: 'signup',
                        is_temporary: true
                    }).select('*').single();
                    if(error) throw error;
                    profile = data;
                }

                // الدور الحقيقي يأتي من profiles فقط. الأدمن لا يخضع لأي حالة مؤقتة/معلقة.
                const admin = profile.role === 'admin';

                if(!admin && profile.status === 'revoked'){
                    const note=await getLatestRejectedNote(profile.id); return message(note ? `تم رفض/إيقاف الحساب.<br><strong>رسالة الإدارة:</strong> ${note}` : 'تم رفض/إيقاف الحساب. تواصل مع الإدارة.','error');
                }

                if(!admin && isTemporaryProfile(profile)){
                    openTemporaryCompletion(profile);
                    return;
                }

                if(!admin && profile.status === 'pending'){
                    return message('الحساب في انتظار موافقة الإدارة.','error');
                }

                if(!admin && profile.must_change_password){
                    showForcedPasswordChange();
                    return;
                }

                message(admin ? 'تم تسجيل دخول الأدمن. جاري فتح لوحة الإدارة…' : 'تم تسجيل الدخول بنجاح. جاري فتح المنصة…','success');
                openContent(profile);
            }

            function openTemporaryCompletion(profile){
                sessionStorage.setItem('mohadarat_temporary_user_id', profile.id);
                sessionStorage.setItem('mohadarat_temporary_email', profile.email || '');
                document.querySelector('#temporaryNewEmail').value='';
                document.querySelector('#temporaryName').value=profile.full_name || profile.name || '';
                document.querySelector('#temporaryPhone').value=profile.phone_number || profile.phone || '';
                document.querySelector('#temporaryNewPassword').value='';
                document.querySelector('#temporaryConfirmPassword').value='';
                showView(temporaryView);
                message('تم التعرف على الحساب المؤقت. أكمل بياناتك الجديدة ثم انتظر موافقة الإدارة.','success');
            }

            async function signInWithIdentifier(identifier,password){
                // Email login
                if(identifier.includes('@')){
                    return await sb.auth.signInWithPassword({ email: identifier, password });
                }

                // Phone login: نستخدم RPC آمنة لأن profiles محمية بـ RLS قبل تسجيل الدخول.
                const {data:email,error:resolveError}=await sb.rpc('resolve_phone_login',{p_phone:identifier});
                if(resolveError) throw resolveError;
                if(!email) return { data:{user:null,session:null}, error:new Error('لم يتم العثور على حساب بهذا الرقم.') };
                return await sb.auth.signInWithPassword({ email, password });
            }

            let loginMode = 'email';
            const loginEmailMethod = document.getElementById('loginEmailMethod');
            const loginPhoneMethod = document.getElementById('loginPhoneMethod');
            const loginIdentifierLabel = document.getElementById('loginIdentifierLabel');
            const loginIdentifierInput = document.getElementById('loginIdentifier');
            function setLoginMode(mode){
                loginMode = mode === 'phone' ? 'phone' : 'email';
                loginEmailMethod?.classList.toggle('active', loginMode==='email');
                loginPhoneMethod?.classList.toggle('active', loginMode==='phone');
                if(loginIdentifierLabel) loginIdentifierLabel.textContent = loginMode==='phone' ? 'رقم التليفون' : 'الإيميل';
                if(loginIdentifierInput){
                    loginIdentifierInput.type = loginMode==='phone' ? 'tel' : 'email';
                    loginIdentifierInput.inputMode = loginMode==='phone' ? 'tel' : 'email';
                    loginIdentifierInput.autocomplete = loginMode==='phone' ? 'tel' : 'username';
                    loginIdentifierInput.placeholder = loginMode==='phone' ? '01xxxxxxxxx' : 'example@email.com';
                }
            }
            loginEmailMethod?.addEventListener('click',()=>setLoginMode('email'));
            loginPhoneMethod?.addEventListener('click',()=>setLoginMode('phone'));
            setLoginMode('email');

            document.querySelector('#loginForm').addEventListener('submit', async e=>{
                e.preventDefault();
                clearMessage();
                const submit = document.querySelector('#loginSubmit');
                const rawIdentifier=document.querySelector('#loginIdentifier').value.trim();
                const identifier = loginMode==='phone' ? normalizePhone(rawIdentifier) : rawIdentifier.toLowerCase();
                const password=document.querySelector('#loginPassword').value;

                if(!identifier||!password)
                    return message('من فضلك أدخل الإيميل أو رقم التليفون وكلمة السر.','error');

                submit.disabled=true;
                submit.textContent='جاري تسجيل الدخول…';
                try{
                    const { data, error } = await signInWithIdentifier(identifier,password);
                    if(error) throw error;
                    if(!data?.user) throw new Error('بيانات الدخول غير صحيحة.');
                    void sb.rpc('record_user_login').then(()=>{},()=>{});
                    await handleLoggedInUser(data.user);
                }catch(err){
                    const msg = err?.message || '';
                    if(msg.includes('Invalid login credentials'))
                        message('بيانات الدخول غير صحيحة.','error');
                    else if(msg.includes('row-level security') || msg.includes('permission'))
                        message('لا يمكن الوصول لبيانات الحساب حاليًا. راجع سياسات RLS لجدول profiles.','error');
                    else
                        message(msg || 'حدث خطأ أثناء تسجيل الدخول.','error');
                }finally{
                    submit.disabled=false;
                    submit.textContent='تسجيل الدخول';
                }
            });

            document.querySelector('#forcePasswordForm').addEventListener('submit', async e=>{
                e.preventDefault(); clearMessage();
                const password=document.querySelector('#forcedNewPassword').value;
                const confirm=document.querySelector('#forcedConfirmPassword').value;
                if(password.length<6) return message('كلمة السر يجب ألا تقل عن 6 أحرف.','error');
                if(password!==confirm) return message('كلمتا السر غير متطابقتين.','error');
                const btn=e.target.querySelector('button[type=submit]'); btn.disabled=true; btn.textContent='جاري الحفظ…';
                try{
                    const {data:{user}}=await sb.auth.getUser(); if(!user) throw new Error('انتهت جلسة الدخول.');
                    const {error}=await sb.auth.updateUser({password}); if(error) throw error;
                    const {error:rpcError}=await sb.rpc('finish_my_password_change'); if(rpcError) throw rpcError;
                    const profile=await getProfile(user.id); if(!profile) throw new Error('تعذر تحميل بيانات الحساب.');
                    message('تم تغيير كلمة السر بنجاح. جاري فتح المنصة…','success');
                    setTimeout(()=>openContent(profile),350);
                }catch(err){message(err?.message||'تعذر تغيير كلمة السر.','error');}
                finally{btn.disabled=false;btn.textContent='حفظ والمتابعة';}
            });

            document.querySelector('#temporaryForm').addEventListener('submit', async e=>{
                e.preventDefault();
                clearMessage();

                const newEmail=document.querySelector('#temporaryNewEmail').value.trim().toLowerCase();
                const name=document.querySelector('#temporaryName').value.trim();
                const phone=normalizePhone(document.querySelector('#temporaryPhone').value.trim());
                const password=document.querySelector('#temporaryNewPassword').value;
                const confirm=document.querySelector('#temporaryConfirmPassword').value;
                const userId=sessionStorage.getItem('mohadarat_temporary_user_id');

                if(!newEmail||!name||!phone||!password||!confirm)
                    return message('من فضلك أكمل كل البيانات المطلوبة.','error');
                if(password.length<6)
                    return message('كلمة السر يجب ألا تقل عن 6 أحرف.','error');
                if(password!==confirm)
                    return message('كلمتا السر غير متطابقتين.','error');
                if(!userId)
                    return message('انتهت جلسة الحساب المؤقت. سجل الدخول بالحساب المؤقت مرة أخرى.','error');

                const btn=e.target.querySelector('button[type="submit"]');
                btn.disabled=true;
                btn.textContent='جاري حفظ البيانات…';

                try{
                    // تحديث بيانات Auth أولًا.
                    const { data: authData, error: authError } = await sb.auth.updateUser({
                        email:newEmail,
                        password,
                        data:{ full_name:name, phone_number:phone, name, phone }
                    });
                    if(authError) throw authError;

                    // مزامنة profile مع البيانات الجديدة.
                    const { data: updatedProfile, error: profileError } = await sb.from('profiles').update({
                        email:newEmail,
                        full_name:name,
                        name:name,
                        phone_number:phone,
                        phone:phone,
                        account_type:'normal',
                        is_temporary:false,
                        must_change_credentials:false,
                        must_change_password:false,
                        updated_at:new Date().toISOString()
                    }).eq('id',userId).select('*').single();
                    if(profileError) throw profileError;

                    // تسجيل طلب إكمال الحساب للإدارة.
                    const { error: requestError } = await sb.from('account_requests').insert({
                        user_id:userId,
                        request_type:'temporary_completion',
                        status:'pending',
                        note:'تم إكمال بيانات الحساب المؤقت.'
                    });
                    if(requestError && !String(requestError.message||'').toLowerCase().includes('duplicate')) throw requestError;

                    await sb.auth.signOut();
                    sessionStorage.removeItem('mohadarat_temporary_user_id');
                    sessionStorage.removeItem('mohadarat_temporary_email');

                    e.target.reset();
                    message('تم حفظ بياناتك وإرسال الطلب للإدارة. استنى الموافقة قبل تسجيل الدخول.','success');
                    setTimeout(()=>{
                        showView(loginView);
                        document.querySelector('#loginIdentifier').value=newEmail;
                    },1800);
                }catch(err){
                    const msg=err?.message||'';
                    if(msg.includes('User already registered') || msg.includes('already registered') || msg.includes('already exists'))
                        message('البريد الجديد مستخدم بالفعل. اختار بريدًا آخر.','error');
                    else if(msg.includes('row-level security') || msg.includes('permission'))
                        message('تم تحديث الدخول لكن تعذر حفظ profile بسبب RLS. راجع سياسات profiles.','error');
                    else
                        message(msg || 'حدث خطأ أثناء استكمال الحساب.','error');
                }finally{
                    btn.disabled=false;
                    btn.textContent='إرسال وانتظار موافقة الإدارة';
                }
            });

            document.querySelector('#registerForm').addEventListener('submit', async e=>{
                e.preventDefault();
                clearMessage();

                const name=document.querySelector('#regName').value.trim();
                const phone=normalizePhone(document.querySelector('#regPhone').value.trim());
                const email=document.querySelector('#regEmail').value.trim().toLowerCase();
                const password=document.querySelector('#regPassword').value;
                const confirm=document.querySelector('#regPasswordConfirm').value;

                if(!name||!phone||!email||!password||!confirm)
                    return message('من فضلك أكمل كل البيانات المطلوبة.','error');
                if(password.length<6)
                    return message('كلمة السر يجب ألا تقل عن 6 أحرف.','error');
                if(password!==confirm)
                    return message('كلمتا السر غير متطابقتين.','error');

                const btn=e.target.querySelector('button[type="submit"]');
                btn.disabled=true;
                btn.textContent='جاري إنشاء الحساب…';

                try{
                    const { data, error } = await sb.auth.signUp({
                        email,
                        password,
                        options:{
                            data:{ full_name:name, name, phone_number:phone, phone }
                        }
                    });
                    if(error) throw error;
                    if(!data?.user) throw new Error('تعذر إنشاء الحساب.');

                    // لو المشروع لا يستخدم trigger لإنشاء profile وكان لدينا session، ننشئه هنا.
                    if(data.session){
                        const { error: profileError } = await sb.from('profiles').upsert({
                            id:data.user.id,
                            email,
                            full_name:name,
                            name,
                            phone_number:phone,
                            phone,
                            role:'user',
                            status:'pending',
                            must_change_password:true,
                            must_change_credentials:true,
                            account_type:'temporary',
                            account_origin:'signup',
                            is_temporary:true
                        },{onConflict:'id'});
                        if(profileError) throw profileError;

                        await sb.from('account_requests').insert({
                            user_id:data.user.id,
                            request_type:'new_account',
                            status:'pending',
                            note:'طلب إنشاء حساب جديد.'
                        });

                        await sb.auth.signOut();
                    }

                    e.target.reset();
                    message(data.session ? 'تم إرسال طلب إنشاء الحساب بنجاح. استنى موافقة الإدارة قبل تسجيل الدخول.' : 'تم إنشاء الحساب. لو ظهر لك طلب تأكيد البريد، أكد بريدك أولًا، وبعدها سجل الدخول. الحساب سيظل مؤقتًا حتى إكمال بياناته وموافقة الإدارة.','success');
                }catch(err){
                    const msg=err?.message||'';
                    if(msg.includes('already registered') || msg.includes('User already registered'))
                        message('البريد الإلكتروني مستخدم بالفعل. استخدم بريدًا آخر.','error');
                    else
                        message(msg || 'حدث خطأ أثناء إنشاء الحساب.','error');
                }finally{
                    btn.disabled=false;
                    btn.textContent='إرسال طلب إنشاء الحساب';
                }
            });
            // لا يوجد تسجيل دخول تلقائي عند فتح الصفحة. المستخدم يضغط زر الدخول بنفسه.
            sb.auth.onAuthStateChange((event)=>{
                if(event==='SIGNED_OUT'){
                    const id=document.getElementById('loginIdentifier'), pw=document.getElementById('loginPassword');
                    if(id) id.value=''; if(pw) pw.value='';
                }
            });

            gsap.set(".lamp",{display:"block"});
        