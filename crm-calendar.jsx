// Calendar View — weekly appointments + follow-ups
const { useState: useState5, useMemo: useMemo5 } = React;

function CalendarView({ contacts, onOpenContact }) {
  const [weekOffset, setWeekOffset] = useState5(0);

  const weekStart = useMemo5(() => {
    const d = new Date();
    const day = d.getDay(); // 0=Sun
    const mon = new Date(d);
    mon.setDate(d.getDate() - (day === 0 ? 6 : day - 1) + weekOffset * 7);
    mon.setHours(0,0,0,0);
    return mon;
  }, [weekOffset]);

  const days = Array.from({length:7}, (_,i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  // Gather all events (appointments + follow-ups) for the week
  const events = useMemo5(() => {
    const evts = [];
    contacts.forEach(c => {
      if (c.nextActionDate) {
        const d = new Date(c.nextActionDate);
        if (d >= days[0] && d < new Date(days[6].getTime() + 86400000)) {
          evts.push({
            id: c.id + '_next',
            contact: c,
            date: d,
            type: c.stage === 'Appointment Set' ? 'appointment' : 'followup',
            label: c.stage === 'Appointment Set' ? 'Appointment' : 'Follow-up',
            title: c.company,
            sub: c.contactPerson,
          });
        }
      }
    });
    return evts;
  }, [contacts, weekStart]);

  const eventsForDay = (day) => {
    return events.filter(e => {
      const ed = new Date(e.date);
      return ed.getFullYear()===day.getFullYear() && ed.getMonth()===day.getMonth() && ed.getDate()===day.getDate();
    }).sort((a,b) => a.date-b.date);
  };

  const now = new Date();
  const isToday = d => d.toDateString() === now.toDateString();
  const fmtTime = d => d.toLocaleTimeString('en-ZA',{hour:'2-digit',minute:'2-digit'});
  const fmtMonth = d => d.toLocaleDateString('en-ZA',{month:'long',year:'numeric'});

  const typeColors = {
    appointment: { bg:'#EFF6FF', border:'#3B82F6', text:'#1D4ED8', dot:'#3B82F6' },
    followup:    { bg:'#FFF7ED', border:'#F97316', text:'#C2410C', dot:'#F97316' },
  };

  const apptCount = events.filter(e=>e.type==='appointment').length;
  const followupCount = events.filter(e=>e.type==='followup').length;

  return (
    <div style={{ padding:'28px 32px', display:'flex', flexDirection:'column', height:'100%' }}>
      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <div>
          <h1 style={{ fontSize:20, fontWeight:700, color:'#1A1D2E', margin:0 }}>Calendar</h1>
          <p style={{ color:'#6B7280', fontSize:13, margin:'3px 0 0' }}>
            {fmtMonth(weekStart)} &mdash;
            <span style={{ marginLeft:8, color:NAVY, fontWeight:600 }}>{apptCount} appointment{apptCount!==1?'s':''}</span>
            <span style={{ marginLeft:8, color:'#F97316', fontWeight:600 }}>{followupCount} follow-up{followupCount!==1?'s':''}</span>
          </p>
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <button onClick={()=>setWeekOffset(0)} style={{ padding:'6px 14px', border:'1.5px solid #E5E7EB', borderRadius:8, background:'#fff', color:'#374151', fontSize:12, fontWeight:600, cursor:'pointer' }}>Today</button>
          <button onClick={()=>setWeekOffset(p=>p-1)} style={{ width:32, height:32, border:'1.5px solid #E5E7EB', borderRadius:8, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Icon path="M15 19l-7-7 7-7" size={16} color='#374151' />
          </button>
          <button onClick={()=>setWeekOffset(p=>p+1)} style={{ width:32, height:32, border:'1.5px solid #E5E7EB', borderRadius:8, background:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Icon path="M9 5l7 7-7 7" size={16} color='#374151' />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display:'flex', gap:16, marginBottom:16 }}>
        {[['appointment','Appointment','#3B82F6'],['followup','Follow-up / Call','#F97316']].map(([k,l,c])=>(
          <div key={k} style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ width:10, height:10, borderRadius:3, background:c, display:'inline-block' }}></span>
            <span style={{ fontSize:12, color:'#6B7280', fontWeight:500 }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Week Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:10, flex:1, alignItems:'start' }}>
        {days.map((day, i) => {
          const dayEvts = eventsForDay(day);
          const today = isToday(day);
          const DAY_NAMES = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
          return (
            <div key={i} style={{ background:'#fff', border:`1.5px solid ${today?NAVY:'#E9EBF0'}`, borderRadius:12, overflow:'hidden', minHeight:120 }}>
              {/* Day header */}
              <div style={{ padding:'10px 12px 8px', background: today?NAVY:'#F8F9FC', borderBottom:'1px solid #F3F4F6' }}>
                <div style={{ fontSize:11, fontWeight:600, color: today?'rgba(255,255,255,0.7)':'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.06em' }}>{DAY_NAMES[i]}</div>
                <div style={{ fontSize:20, fontWeight:800, color: today?'#fff':'#1A1D2E', lineHeight:1.1, marginTop:2 }}>{day.getDate()}</div>
              </div>
              {/* Events */}
              <div style={{ padding:'8px', display:'flex', flexDirection:'column', gap:6 }}>
                {dayEvts.length===0 && <div style={{ fontSize:11, color:'#E5E7EB', textAlign:'center', padding:'8px 0' }}>—</div>}
                {dayEvts.map(evt => {
                  const tc = typeColors[evt.type];
                  return (
                    <div key={evt.id} onClick={()=>onOpenContact(evt.contact)}
                      style={{ background:tc.bg, border:`1px solid ${tc.border}44`, borderLeft:`3px solid ${tc.border}`, borderRadius:6, padding:'6px 8px', cursor:'pointer', transition:'all 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.opacity='0.8'}
                      onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
                      <div style={{ fontSize:10, fontWeight:700, color:tc.text, textTransform:'uppercase', letterSpacing:'0.04em', marginBottom:2 }}>{evt.label}</div>
                      <div style={{ fontSize:11, fontWeight:700, color:'#1A1D2E', lineHeight:1.3 }}>{evt.title}</div>
                      <div style={{ fontSize:10, color:'#6B7280', marginTop:1 }}>{evt.sub}</div>
                      <div style={{ fontSize:10, color:tc.text, fontWeight:600, marginTop:3 }}>{fmtTime(evt.date)}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming list */}
      <div style={{ marginTop:24, background:'#fff', border:'1px solid #E9EBF0', borderRadius:12, overflow:'hidden' }}>
        <div style={{ padding:'12px 18px', borderBottom:'1px solid #F3F4F6', fontWeight:700, fontSize:13, color:'#1A1D2E' }}>
          All events this week
        </div>
        {events.length===0 && <div style={{ padding:'24px', textAlign:'center', color:'#9CA3AF', fontSize:13 }}>Nothing scheduled this week.</div>}
        <div style={{ display:'flex', flexDirection:'column' }}>
          {events.sort((a,b)=>a.date-b.date).map((evt,i) => {
            const tc = typeColors[evt.type];
            return (
              <div key={evt.id} onClick={()=>onOpenContact(evt.contact)}
                style={{ padding:'11px 18px', borderBottom: i<events.length-1?'1px solid #F9FAFB':'none', display:'flex', gap:14, alignItems:'center', cursor:'pointer' }}
                onMouseEnter={e=>e.currentTarget.style.background='#F8F9FF'}
                onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <div style={{ width:42, textAlign:'center', flexShrink:0 }}>
                  <div style={{ fontSize:10, color:'#9CA3AF', fontWeight:600, textTransform:'uppercase' }}>
                    {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][((evt.date.getDay()+6)%7)]}
                  </div>
                  <div style={{ fontSize:18, fontWeight:800, color:'#1A1D2E', lineHeight:1 }}>{evt.date.getDate()}</div>
                </div>
                <div style={{ width:3, height:36, borderRadius:2, background:tc.border, flexShrink:0 }}></div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:'#1A1D2E' }}>{evt.title}</div>
                  <div style={{ fontSize:12, color:'#6B7280' }}>{evt.sub} · {fmtTime(evt.date)}</div>
                </div>
                <span style={{ fontSize:11, fontWeight:700, color:tc.text, background:tc.bg, borderRadius:99, padding:'3px 10px' }}>{evt.label}</span>
                <StageBadge stage={evt.contact.stage} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CalendarView });
