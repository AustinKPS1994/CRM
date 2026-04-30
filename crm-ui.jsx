// Shared UI primitives + Sidebar
const NAVY = '#2B3990';
const GOLD = '#F7B91E';
const NAV_ITEMS = [
{ id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
{ id: 'queue', label: 'Dashboard', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
{ id: 'pipeline', label: 'Pipeline', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' },
{ id: 'contacts', label: 'All Contacts', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
{ id: 'import', label: 'Import Leads', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
{ id: 'calendar', label: 'Calendar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
{ id: 'manager', label: 'Team Stats', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
{ id: 'settings', label: 'Manage Reps', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
];


const STAGE_COLORS = {
  'New Lead': { bg: '#EEF2FF', text: '#4338CA', dot: '#6366F1' },
  'Called': { bg: '#FFF7ED', text: '#C2410C', dot: '#F97316' },
  'Interested': { bg: '#ECFDF5', text: '#065F46', dot: '#10B981' },
  'Appointment Set': { bg: '#EFF6FF', text: '#1D4ED8', dot: '#3B82F6' },
  'Quoted': { bg: '#FDF4FF', text: '#6B21A8', dot: '#A855F7' },
  'Won': { bg: '#F0FDF4', text: '#14532D', dot: '#22C55E' },
  'Lost': { bg: '#FFF1F2', text: '#9F1239', dot: '#F43F5E' }
};

function StageBadge({ stage }) {
  const c = STAGE_COLORS[stage] || { bg: '#F3F4F6', text: '#374151', dot: '#9CA3AF' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '2px 8px', borderRadius: 99, background: c.bg, color: c.text, fontSize: 11, fontWeight: 600, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot, flexShrink: 0 }}></span>
      {stage}
    </span>);

}

function Avatar({ user, size = 28 }) {
  if (!user) return null;
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: user.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: size * 0.35, fontWeight: 700, flexShrink: 0 }}>
      {user.initials}
    </div>);

}

function Icon({ path, size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>);

}

function Sidebar({ view, setView, contacts, currentUser, onLogout }) {
  const todayQueue = contacts.filter((c) => {
    if (!c.nextActionDate) return false;
    const nd = new Date(c.nextActionDate);
    const now = new Date();
    return nd <= new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) && c.stage !== 'Won' && c.stage !== 'Lost';
  });
  const isAdmin = currentUser && currentUser.role === 'admin';
  const allowedNav = currentUser ? (ROLE_PERMISSIONS[currentUser.role] ? ROLE_PERMISSIONS[currentUser.role].nav : []) : NAV_ITEMS.map(n=>n.id);
  const visibleItems = NAV_ITEMS.filter(item => allowedNav.includes(item.id));
  return (
    <aside style={{ width: 220, background: NAVY, display: 'flex', flexDirection: 'column', flexShrink: 0, height: '100vh', position: 'sticky', top: 0 }}>
      <div style={{ padding: '20px 16px 14px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <img src="uploads/Logo.jpg" alt="MemphisClean" style={{ display:'none' }} />
        <div style={{ fontSize:15, fontWeight:800, color:'#fff', letterSpacing:'0.04em' }}>MemphisClean</div>
      </div>
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ padding: '4px 12px 8px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: isAdmin ? GOLD : '#10B981', background: isAdmin ? 'rgba(247,185,30,0.12)' : 'rgba(16,185,129,0.12)', borderRadius: 99, padding: '3px 10px' }}>
            {isAdmin ? '⚙ Administrator' : '● Sales Rep'}
          </span>
        </div>
        {visibleItems.map((item) => {
          const active = view === item.id;
          return (
            <button key={item.id} onClick={() => setView(item.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: active ? 'rgba(247,185,30,0.18)' : 'transparent', color: active ? GOLD : 'rgba(255,255,255,0.7)', fontWeight: active ? 700 : 500, fontSize: 13, textAlign: 'left', transition: 'all 0.15s' }}>
              <Icon path={item.icon} size={17} color={active ? GOLD : 'rgba(255,255,255,0.6)'} />
              {item.label}
              {item.id === 'queue' && todayQueue.length > 0 &&
                <span style={{ marginLeft: 'auto', background: GOLD, color: NAVY, fontSize: 10, fontWeight: 800, borderRadius: 99, padding: '1px 6px', minWidth: 18, textAlign: 'center' }}>{todayQueue.length}</span>
              }
            </button>
          );
        })}
      </nav>
      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: currentUser ? currentUser.color : NAVY, border: '1.5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
            {currentUser ? currentUser.initials : '?'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser ? currentUser.name : ''}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>{isAdmin ? 'Administrator' : 'Sales Rep · ZA'}</div>
          </div>
          {onLogout && (
            <button onClick={onLogout} title="Sign out" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, opacity: 0.5, transition: 'opacity 0.15s', flexShrink: 0 }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}>
              <Icon path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" size={16} color='#fff' />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

const ROLE_PERMISSIONS = {
  admin: {
    nav: ['dashboard','queue','pipeline','contacts','calendar','import','manager','settings'],
    label: 'Administrator',
  },
  rep: {
    nav: ['queue','pipeline','calendar'],
    label: 'Sales Rep',
  },
};

Object.assign(window, { Sidebar, StageBadge, Avatar, Icon, STAGE_COLORS, NAVY, GOLD, ROLE_PERMISSIONS });