// ============================================================
//  Follow-up Tracker — script.js
//  Lógica compartilhada entre index.html e admin.html
// ============================================================

// ⚙️ CONFIGURAÇÃO — edite estas 2 variáveis
const API_URL    = 'https://script.google.com/macros/s/AKfycbzWUmDm_sHxO9pPF3t2yN8zgSD4h3uNuUD03LG935IYIs8hMbAFE_KeNSjgPWllm3Bq/exec';
const SECRET_KEY = 'acx_fup_manager';

// ── i18n ────────────────────────────────────────────────────
const T = {
  en:{
    auth_sub:'Track your sales follow-ups and trials in one place.',
    tab_login:'Sign in', tab_register:'Create account',
    ph_name:'Your name', ph_pass:'Password', ph_new_pass:'Create password', ph_conf_pass:'Confirm password',
    btn_login:'Sign in', btn_register:'Create account',
    register_hint:'You only need to do this once. Use the same name to sign in later.',
    err_fill:'Please fill in all fields.', err_pass_match:'Passwords do not match.',
    err_pass_short:'Password must be at least 4 characters.',
    err_user_exists:'This name is already registered. Sign in instead.',
    err_not_found:'Name not found. Create an account first.',
    err_wrong_pass:'Incorrect password.', err_api:'Connection error. Check API_URL.',
    btn_logout:'Sign out',
    stat_overdue:'Overdue', stat_today:'Today', stat_soon:'Next 7 days', stat_total:'Active total',
    my_followups:'My follow-ups', search_ph:'Search…',
    f_all:'All', f_overdue:'Overdue', f_today:'Today', f_soon:'Soon', refresh:'↻ Refresh',
    lbl_name:'Contact name *', lbl_company:'Company', lbl_email:'Email', lbl_type:'Type',
    lbl_date:'Follow-up date *', lbl_value:'Est. value', lbl_notes:'Notes',
    ph_contact:'John Smith', ph_notes:'Context, next steps…',
    cancel:'Cancel', save_btn:'Save follow-up',
    type_sale:'Sale', type_renewal:'Renewal',
    modal_new:'New follow-up', modal_edit:'Edit follow-up',
    synced:'Synced', syncing:'Syncing…', sync_err:'Sync error', saving:'Saving…',
    toast_saved:'✅ Saved!', toast_updated:'✏️ Updated!', toast_deleted:'🗑️ Removed!',
    toast_done:'✅ Done!', toast_reopened:'↩️ Reopened!',
    toast_err_name:'⚠️ Contact name is required.', toast_err_date:'⚠️ Choose a date.',
    toast_err_save:'❌ Error saving. Try again.', confirm_delete:'Remove this follow-up?',
    badge_overdue:'Overdue', badge_today:'Today', badge_soon:'Soon', badge_scheduled:'Scheduled', badge_done:'Done',
    col_contact:'Contact', col_type:'Type', col_date:'Date', col_status:'Status', col_value:'Value', col_notes:'Notes', col_actions:'Actions',
    empty_title:'No follow-ups found', empty_sub:'Add a new one or change the filter.',
    loading:'Loading…', notif_overdue:'follow-up(s) overdue', notif_today:'follow-up(s) for today',
    cfg_warn:'Setup needed: edit <code>API_URL</code> and <code>SECRET_KEY</code> in script.js.',
    notif_banner_title:'Enable desktop notifications',
    notif_banner_desc:'Get alerted for overdue and due-today follow-ups, even with the tab in the background.',
    notif_allow:'Enable notifications',
    notif_dismiss:'Maybe later',
    notif_granted_title:'Notifications enabled',
    notif_granted_desc:'You will receive alerts for overdue and due-today follow-ups.',
    notif_denied:'Notifications are blocked. Click the lock icon 🔒 in your browser address bar to allow them.',
  },
  pt:{
    auth_sub:'Acompanhe seus follow-ups de vendas e trials em um só lugar.',
    tab_login:'Entrar', tab_register:'Criar conta',
    ph_name:'Seu nome', ph_pass:'Senha', ph_new_pass:'Criar senha', ph_conf_pass:'Confirmar senha',
    btn_login:'Entrar', btn_register:'Criar conta',
    register_hint:'Você só faz isso uma vez. Use o mesmo nome para entrar depois.',
    err_fill:'Preencha todos os campos.', err_pass_match:'As senhas não coincidem.',
    err_pass_short:'A senha precisa ter pelo menos 4 caracteres.',
    err_user_exists:'Este nome já está cadastrado. Faça login.',
    err_not_found:'Nome não encontrado. Crie uma conta primeiro.',
    err_wrong_pass:'Senha incorreta.', err_api:'Erro de conexão. Verifique a API_URL.',
    btn_logout:'Sair',
    stat_overdue:'Atrasados', stat_today:'Hoje', stat_soon:'Próx. 7 dias', stat_total:'Total ativo',
    my_followups:'Meus follow-ups', search_ph:'Buscar…',
    f_all:'Todos', f_overdue:'Atrasados', f_today:'Hoje', f_soon:'Em breve', refresh:'↻ Atualizar',
    lbl_name:'Nome do contato *', lbl_company:'Empresa', lbl_email:'E-mail', lbl_type:'Tipo',
    lbl_date:'Data do follow-up *', lbl_value:'Valor estimado', lbl_notes:'Observações',
    ph_contact:'João Silva', ph_notes:'Contexto, próximos passos…',
    cancel:'Cancelar', save_btn:'Salvar follow-up',
    type_sale:'Venda', type_renewal:'Renovação',
    modal_new:'Novo follow-up', modal_edit:'Editar follow-up',
    synced:'Sincronizado', syncing:'Sincronizando…', sync_err:'Erro ao sincronizar', saving:'Salvando…',
    toast_saved:'✅ Salvo!', toast_updated:'✏️ Atualizado!', toast_deleted:'🗑️ Removido!',
    toast_done:'✅ Concluído!', toast_reopened:'↩️ Reaberto!',
    toast_err_name:'⚠️ Informe o nome do contato.', toast_err_date:'⚠️ Escolha uma data.',
    toast_err_save:'❌ Erro ao salvar. Tente novamente.', confirm_delete:'Remover este follow-up?',
    badge_overdue:'Atrasado', badge_today:'Hoje', badge_soon:'Em breve', badge_scheduled:'Agendado', badge_done:'Concluído',
    col_contact:'Contato', col_type:'Tipo', col_date:'Data', col_status:'Status', col_value:'Valor', col_notes:'Obs', col_actions:'Ações',
    empty_title:'Nenhum follow-up encontrado', empty_sub:'Adicione um novo ou mude o filtro.',
    loading:'Carregando…', notif_overdue:'follow-up(s) atrasados', notif_today:'follow-up(s) para hoje',
    cfg_warn:'Configuração necessária: edite <code>API_URL</code> e <code>SECRET_KEY</code> no arquivo script.js.',
    notif_banner_title:'Ative as notificações do navegador',
    notif_banner_desc:'Receba alertas de follow-ups atrasados e do dia, mesmo com a aba em segundo plano.',
    notif_allow:'Ativar notificações',
    notif_dismiss:'Agora não',
    notif_granted_title:'Notificações ativadas',
    notif_granted_desc:'Você receberá alertas de follow-ups atrasados e do dia.',
    notif_denied:'Notificações bloqueadas. Clique no ícone de cadeado 🔒 na barra de endereço para permitir.',
  },
  es:{
    auth_sub:'Lleva el seguimiento de tus follow-ups de ventas y trials en un solo lugar.',
    tab_login:'Iniciar sesión', tab_register:'Crear cuenta',
    ph_name:'Tu nombre', ph_pass:'Contraseña', ph_new_pass:'Crear contraseña', ph_conf_pass:'Confirmar contraseña',
    btn_login:'Iniciar sesión', btn_register:'Crear cuenta',
    register_hint:'Solo lo haces una vez. Usa el mismo nombre para entrar después.',
    err_fill:'Por favor completa todos los campos.', err_pass_match:'Las contraseñas no coinciden.',
    err_pass_short:'La contraseña debe tener al menos 4 caracteres.',
    err_user_exists:'Este nombre ya está registrado. Inicia sesión.',
    err_not_found:'Nombre no encontrado. Crea una cuenta primero.',
    err_wrong_pass:'Contraseña incorrecta.', err_api:'Error de conexión. Verifica la API_URL.',
    btn_logout:'Cerrar sesión',
    stat_overdue:'Atrasados', stat_today:'Hoy', stat_soon:'Próx. 7 días', stat_total:'Total activo',
    my_followups:'Mis follow-ups', search_ph:'Buscar…',
    f_all:'Todos', f_overdue:'Atrasados', f_today:'Hoy', f_soon:'Próximos', refresh:'↻ Actualizar',
    lbl_name:'Nombre del contacto *', lbl_company:'Empresa', lbl_email:'Email', lbl_type:'Tipo',
    lbl_date:'Fecha del follow-up *', lbl_value:'Valor estimado', lbl_notes:'Observaciones',
    ph_contact:'Juan García', ph_notes:'Contexto, próximos pasos…',
    cancel:'Cancelar', save_btn:'Guardar follow-up',
    type_sale:'Venta', type_renewal:'Renovación',
    modal_new:'Nuevo follow-up', modal_edit:'Editar follow-up',
    synced:'Sincronizado', syncing:'Sincronizando…', sync_err:'Error al sincronizar', saving:'Guardando…',
    toast_saved:'✅ Guardado!', toast_updated:'✏️ Actualizado!', toast_deleted:'🗑️ Eliminado!',
    toast_done:'✅ Completado!', toast_reopened:'↩️ Reabierto!',
    toast_err_name:'⚠️ Ingresa el nombre del contacto.', toast_err_date:'⚠️ Elige una fecha.',
    toast_err_save:'❌ Error al guardar. Inténtalo de nuevo.', confirm_delete:'¿Eliminar este follow-up?',
    badge_overdue:'Atrasado', badge_today:'Hoy', badge_soon:'Próximo', badge_scheduled:'Programado', badge_done:'Completado',
    col_contact:'Contacto', col_type:'Tipo', col_date:'Fecha', col_status:'Estado', col_value:'Valor', col_notes:'Notas', col_actions:'Acciones',
    empty_title:'No se encontraron follow-ups', empty_sub:'Agrega uno nuevo o cambia el filtro.',
    loading:'Cargando…', notif_overdue:'follow-up(s) atrasados', notif_today:'follow-up(s) para hoy',
    cfg_warn:'Configuración necesaria: edita <code>API_URL</code> y <code>SECRET_KEY</code> en script.js.',
    notif_banner_title:'Activa las notificaciones del navegador',
    notif_banner_desc:'Recibe alertas de follow-ups atrasados y del día, incluso con la pestaña en segundo plano.',
    notif_allow:'Activar notificaciones',
    notif_dismiss:'Ahora no',
    notif_granted_title:'Notificaciones activadas',
    notif_granted_desc:'Recibirás alertas de follow-ups atrasados y del día.',
    notif_denied:'Notificaciones bloqueadas. Haz clic en el ícono de candado 🔒 en la barra de direcciones para permitirlas.',
  }
};

// ── Estado global ────────────────────────────────────────────
let lang = localStorage.getItem('lang') || 'en';

// ── Utilitários ──────────────────────────────────────────────
function t(k) { return (T[lang] || T.en)[k] || k; }

function today() { return new Date().toISOString().split('T')[0]; }

function addDays(ds, n) {
  const d = new Date(ds + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

function fmtDate(ds) {
  if (!ds) return '—';
  const [y, m, d] = ds.split('-');
  return `${d}/${m}/${y}`;
}

function esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2800);
}

function setSyncState(st, label) {
  const d = document.getElementById('sync-dot');
  d.className = 'sync-dot' + (st === 'busy' ? ' busy' : st === 'err' ? ' err' : '');
  document.getElementById('sync-label').textContent = label;
}

async function hashPassword(pass) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pass));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── Lang ─────────────────────────────────────────────────────
function setLang(l) {
  lang = l;
  localStorage.setItem('lang', l);
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', (b.dataset.lang || b.textContent.trim().replace(/[^a-z]/gi,'')).toLowerCase().startsWith(l))
  );
  if (typeof applyTranslations === 'function') applyTranslations();
}

// ── JSONP (contorna CORS do Apps Script) ─────────────────────
function jsonp(url) {
  return new Promise((resolve, reject) => {
    const cb     = 'cb_' + Date.now() + '_' + Math.floor(Math.random() * 1e6);
    const script = document.createElement('script');
    const timer  = setTimeout(() => { cleanup(); reject(new Error('api')); }, 15000);

    function cleanup() {
      delete window[cb];
      if (script.parentNode) document.head.removeChild(script);
      clearTimeout(timer);
    }

    window[cb]      = (data) => { cleanup(); resolve(data); };
    script.onerror  = ()     => { cleanup(); reject(new Error('api')); };
    script.src      = url + '&callback=' + cb;
    document.head.appendChild(script);
  });
}

// ── API ──────────────────────────────────────────────────────
async function api(action, payload = {}) {
  const isAuth = action === 'register' || action === 'login';
  if (!isAuth) setSyncState('busy', t('syncing'));
  try {
    const body = JSON.stringify({ action, key: SECRET_KEY, ...payload });
    const url  = API_URL + '?data=' + encodeURIComponent(body);
    const data = await jsonp(url);
    if (!data.ok) throw new Error(data.error || 'API error');
    return data;
  } catch (e) {
    if (!isAuth) setSyncState('err', t('sync_err'));
    if (e.message === 'api') throw new Error('api');
    throw e;
  }
}

// ── Notificações ─────────────────────────────────────────────
function requestNotifications(getItems) {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default') {
    Notification.requestPermission().then(() => checkAndNotify(getItems));
  } else {
    checkAndNotify(getItems);
  }
  setInterval(() => checkAndNotify(getItems), 30 * 60 * 1000);
}

function checkAndNotify(getItems) {
  if (Notification.permission !== 'granted') return;
  const items = getItems();
  const tn    = today();
  const ov    = items.filter(i => !i.done && i.date < tn);
  const td    = items.filter(i => !i.done && i.date === tn);
  if (ov.length)
    new Notification(`⚠️ ${ov.length} ${t('notif_overdue')}`, { body: ov.slice(0,3).map(i => `• ${i.name}`).join('\n') });
  if (td.length)
    setTimeout(() => new Notification(`📅 ${td.length} ${t('notif_today')}`, { body: td.slice(0,3).map(i => `• ${i.name}`).join('\n') }), 900);
}
