// Auth / Login Screen
const { useState: useState8 } = React;

const ADMIN_PIN = '1234';

function LoginScreen({ onLogin }) {
  const [showAdminPin, setShowAdminPin] = useState8(false);
  const [pin, setPin]                   = useState8('');
  const [pinError, setPinError]         = useState8(false);
  const [shake, setShake]               = useState8(false);

  const users = window.CRM_DATA.users;

  const loginAsRep = (user) => {
    onLogin({ ...user, role: 'rep' });
  };

  const tryAdminLogin = () => {
    if (pin === ADMIN_PIN) {
      onLogin({ id:'admin', name:'Administrator', initials:'AD', color:NAVY, role:'admin' });
    } else {
      setPinError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPin('');
    }
  };

  return (
    <div style={{ minHeight:'100vh', background:`linear-gradient(135deg, ${NAVY} 0%, #1a2460 100%)`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'DM Sans, sans-serif' }}>
      <div style={{ width:'100%', maxWidth:460, padding:'0 20px' }}>

        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <img src="uploads/Logo.jpg" alt="MemphisClean" style={{ width:200, filter:'brightness(0) invert(1)', opacity:0.95 }} />
          <div style={{ marginTop:10, fontSize:12, color:'rgba(255,255,255,0.45)', letterSpacing:'0.14em', textTransform:'uppercase', fontWeight:600 }}>CRM · Sales Portal</div>
        </div>

        {!showAdminPin ? (
          <div style={{ background:'rgba(255,255,255,0.05)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:20, padding:'28px 28px 24px' }}>
            <h2 style={{ color:'#fff', fontSize:17, fontWeight:700, margin:'0 0 6px' }}>Sign in</h2>
            <p style={{ color:'rgba(255,255,255,0.5)', fontSize:13, margin:'0 0 22px' }}>Select your profile to continue</p>

            {/* Rep cards */}
            <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:16 }}>
              {users.map(user => (
                <button key={user.id} onClick={() => loginAsRep(user)}
                  style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:12, cursor:'pointer', textAlign:'left', transition:'all 0.18s' }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.14)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; }}>
                  <div style={{ width:42, height:42, borderRadius:'50%', background:user.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800, color:'#fff', flexShrink:0 }}>{user.initials}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ color:'#fff', fontWeight:700, fontSize:14 }}>{user.name}</div>
                    <div style={{ color:'rgba(255,255,255,0.45)', fontSize:12, marginTop:1 }}>Sales Rep · B2B Caller</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <span style={{ background:'rgba(16,185,129,0.2)', color:'#10B981', fontSize:10, fontWeight:700, borderRadius:99, padding:'2px 8px' }}>Rep Access</span>
                    <Icon path="M9 5l7 7-7 7" size={16} color='rgba(255,255,255,0.3)' />
                  </div>
                </button>
              ))}
            </div>

            {/* Admin divider */}
            <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:16 }}>
              <button onClick={() => setShowAdminPin(true)}
                style={{ width:'100%', display:'flex', alignItems:'center', gap:14, padding:'13px 16px', background:'rgba(247,185,30,0.08)', border:'1px solid rgba(247,185,30,0.2)', borderRadius:12, cursor:'pointer', textAlign:'left', transition:'all 0.18s' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(247,185,30,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(247,185,30,0.08)'}>
                <div style={{ width:42, height:42, borderRadius:'50%', background:'rgba(247,185,30,0.15)', border:'1.5px solid rgba(247,185,30,0.4)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon path="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" size={18} color={GOLD} />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ color:GOLD, fontWeight:700, fontSize:14 }}>Administrator</div>
                  <div style={{ color:'rgba(255,255,255,0.4)', fontSize:12, marginTop:1 }}>Full access · PIN required</div>
                </div>
                <span style={{ background:'rgba(247,185,30,0.15)', color:GOLD, fontSize:10, fontWeight:700, borderRadius:99, padding:'2px 8px' }}>Admin</span>
              </button>
            </div>
          </div>
        ) : (
          /* Admin PIN screen */
          <div style={{ background:'rgba(255,255,255,0.05)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:20, padding:'28px' }}>
            <button onClick={() => { setShowAdminPin(false); setPin(''); setPinError(false); }} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', cursor:'pointer', fontSize:13, padding:0, marginBottom:20, display:'flex', alignItems:'center', gap:5 }}>
              <Icon path="M15 19l-7-7 7-7" size={14} color='rgba(255,255,255,0.5)' /> Back
            </button>
            <div style={{ textAlign:'center', marginBottom:24 }}>
              <div style={{ width:52, height:52, borderRadius:'50%', background:'rgba(247,185,30,0.15)', border:'1.5px solid rgba(247,185,30,0.4)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
                <Icon path="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" size={22} color={GOLD} />
              </div>
              <h2 style={{ color:'#fff', fontSize:17, fontWeight:700, margin:'0 0 4px' }}>Administrator Login</h2>
              <p style={{ color:'rgba(255,255,255,0.45)', fontSize:13, margin:0 }}>Enter your PIN to continue</p>
            </div>

            <div style={{ animation: shake ? 'shake 0.4s ease' : 'none' }}>
              <input
                type="password"
                value={pin}
                onChange={e => { setPin(e.target.value); setPinError(false); }}
                onKeyDown={e => e.key==='Enter' && tryAdminLogin()}
                placeholder="Enter PIN"
                maxLength={6}
                autoFocus
                style={{ width:'100%', padding:'12px 16px', background:'rgba(255,255,255,0.1)', border:`1.5px solid ${pinError?'#F43F5E':'rgba(255,255,255,0.2)'}`, borderRadius:10, color:'#fff', fontSize:18, letterSpacing:'0.3em', textAlign:'center', outline:'none', boxSizing:'border-box', fontFamily:'monospace' }}
              />
              {pinError && <p style={{ color:'#F87171', fontSize:12, textAlign:'center', marginTop:8 }}>Incorrect PIN. Try again.</p>}
            </div>

            <button onClick={tryAdminLogin} style={{ width:'100%', marginTop:16, padding:'12px', background:GOLD, border:'none', borderRadius:10, color:NAVY, fontSize:14, fontWeight:800, cursor:'pointer', transition:'opacity 0.15s' }}
              onMouseEnter={e=>e.currentTarget.style.opacity='0.9'}
              onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
              Unlock Admin Access
            </button>
            <p style={{ color:'rgba(255,255,255,0.25)', fontSize:11, textAlign:'center', marginTop:12 }}>Demo PIN: 1234</p>
          </div>
        )}

        <p style={{ color:'rgba(255,255,255,0.2)', fontSize:11, textAlign:'center', marginTop:20 }}>MemphisClean CRM · South Africa Sales Desk</p>
      </div>
      <style>{`
        @keyframes shake {
          0%,100% { transform:translateX(0); }
          20%      { transform:translateX(-8px); }
          40%      { transform:translateX(8px); }
          60%      { transform:translateX(-6px); }
          80%      { transform:translateX(6px); }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { LoginScreen });
