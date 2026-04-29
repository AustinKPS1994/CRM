// Manager Dashboard — team-level stats across all callers
const { useState: useState6, useMemo: useMemo6 } = React;

function ManagerDashboard({ contacts }) {
  const [period, setPeriod] = useState6('week');
  const users = window.CRM_DATA.users;
  const now = new Date();

  const periodStart = useMemo6(() => {
    const d = new Date(now);
    if (period==='today') { d.setHours(0,0,0,0); return d; }
    if (period==='week') { const day=d.getDay(); d.setDate(d.getDate()-(day===0?6:day-1)); d.setHours(0,0,0,0); return d; }
    if (period==='month') { d.setDate(1); d.setHours(0,0,0,0); return d; }
    return d;
  }, [period]);

  const fmtR = n => n>=1000?`R${(n/1000).toFixed(0)}k`:`R${n}`;

  const teamStats = useMemo6(() => {
    return users.map(user => {
      const myContacts = contacts.filter(c=>c.assignedTo===user.id);
      const allLogs = myContacts.flatMap(c=>c.callLog);
      const periodLogs = allLogs.filter(l=>new Date(l.date)>=periodStart);
      const won = myContacts.filter(c=>c.stage==='Won');
      const active = myContacts.filter(c=>c.stage!=='Won'&&c.stage!=='Lost');
      const pipelineVal = active.filter(c=>c.quoteAmount>0).reduce((s,c)=>s+c.quoteAmount,0);
      const wonVal = won.reduce((s,c)=>s+c.quoteAmount,0);
      const outcomes = {};
      periodLogs.forEach(l=>{ outcomes[l.outcome]=(outcomes[l.outcome]||0)+1; });
      const contactRate = periodLogs.length ? Math.round(periodLogs.filter(l=>l.outcome.includes('Answered')).length/periodLogs.length*100) : 0;
      return { user, myContacts, periodLogs, won, active, pipelineVal, wonVal, contactRate, outcomes };
    });
  }, [contacts, periodStart]);

  const totals = useMemo6(() => ({
    calls: teamStats.reduce((s,t)=>s+t.periodLogs.length,0),
    active: teamStats.reduce((s,t)=>s+t.active.length,0),
    won: teamStats.reduce((s,t)=>s+t.won.length,0),
    pipeline: teamStats.reduce((s,t)=>s+t.pipelineVal,0),
  }), [teamStats]);

  // Stage breakdown across all contacts
  const stageBreakdown = useMemo6(() => {
    const counts = {};
    window.CRM_DATA.stages.forEach(s=>{ counts[s]=contacts.filter(c=>c.stage===s).length; });
    return counts;
  }, [contacts]);

  const maxStageCount = Math.max(...Object.values(stageBreakdown), 1);

  // Activity timeline — calls per day last 7 days
  const callsPerDay = useMemo6(() => {
    const days = Array.from({length:7},(_,i)=>{
      const d = new Date(now);
      d.setDate(now.getDate()-6+i);
      d.setHours(0,0,0,0);
      return d;
    });
    return days.map(day => {
      const count = contacts.flatMap(c=>c.callLog).filter(l=>{
        const ld=new Date(l.date);
        return ld>=day && ld<new Date(day.getTime()+86400000);
      }).length;
      return { day, count };
    });
  }, [contacts]);
  const maxCalls = Math.max(...callsPerDay.map(d=>d.count),1);

  return (
    <div style={{ padding:'28px 32px', maxWidth:1100 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:20, fontWeight:700, color:'#1A1D2E', margin:0 }}>Manager Dashboard</h1>
          <p style={{ color:'#6B7280', fontSize:13, margin:'3px 0 0' }}>Team performance overview</p>
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {[['today','Today'],['week','This Week'],['month','This Month']].map(([v,l])=>(
            <button key={v} onClick={()=>setPeriod(v)} style={{ padding:'6px 14px', borderRadius:8, border:`1.5px solid ${period===v?NAVY:'#E5E7EB'}`, background:period===v?NAVY:'#fff', color:period===v?'#fff':'#374151', fontSize:12, fontWeight:600, cursor:'pointer' }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Team total stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:28 }}>
        {[
          { label:'Total Calls', value:totals.calls, icon:'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', color:NAVY },
          { label:'Active Leads', value:totals.active, icon:'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', color:'#0E7490' },
          { label:'Deals Won', value:totals.won, icon:'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', color:'#059669' },
          { label:'Pipeline Value', value:fmtR(totals.pipeline), icon:'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 6v1m0 4v1m-5.196-5.879A7.007 7.007 0 0012 19c3.866 0 7-3.134 7-7', color:'#D97706' },
        ].map(s=>(
          <div key={s.label} style={{ background:'#fff', borderRadius:12, padding:'18px 20px', border:'1px solid #E9EBF0', display:'flex', flexDirection:'column', gap:12 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div style={{ fontSize:11, color:'#6B7280', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.04em' }}>{s.label}</div>
              <div style={{ width:32, height:32, borderRadius:8, background:s.color+'18', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon path={s.icon} size={15} color={s.color} />
              </div>
            </div>
            <div style={{ fontSize:26, fontWeight:800, color:'#1A1D2E' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
        {/* Per-rep breakdown */}
        <div style={{ background:'#fff', border:'1px solid #E9EBF0', borderRadius:12, overflow:'hidden' }}>
          <div style={{ padding:'14px 18px', borderBottom:'1px solid #F3F4F6' }}>
            <div style={{ fontWeight:700, fontSize:14, color:'#1A1D2E' }}>Rep Performance</div>
          </div>
          <div style={{ padding:'16px 18px', display:'flex', flexDirection:'column', gap:18 }}>
            {teamStats.map(t => (
              <div key={t.user.id}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:34, height:34, borderRadius:'50%', background:t.user.color, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:12, fontWeight:700 }}>{t.user.initials}</div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:'#1A1D2E' }}>{t.user.name}</div>
                      <div style={{ fontSize:11, color:'#9CA3AF' }}>{t.myContacts.length} contacts · {t.periodLogs.length} calls</div>
                    </div>
                  </div>
                  <div style={{ textAlign:'right' }}>
                    <div style={{ fontSize:12, fontWeight:700, color:'#059669' }}>{t.won.length} won</div>
                    <div style={{ fontSize:11, color:'#9CA3AF' }}>{fmtR(t.pipelineVal)} pipeline</div>
                  </div>
                </div>
                {/* Contact rate bar */}
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                    <span style={{ fontSize:10, color:'#9CA3AF', fontWeight:600 }}>CONTACT RATE</span>
                    <span style={{ fontSize:10, fontWeight:700, color:t.contactRate>=50?'#059669':'#F97316' }}>{t.contactRate}%</span>
                  </div>
                  <div style={{ height:6, background:'#F3F4F6', borderRadius:99, overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${t.contactRate}%`, background: t.contactRate>=50?'#10B981':'#F97316', borderRadius:99, transition:'width 0.6s ease' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call activity chart */}
        <div style={{ background:'#fff', border:'1px solid #E9EBF0', borderRadius:12, overflow:'hidden' }}>
          <div style={{ padding:'14px 18px', borderBottom:'1px solid #F3F4F6' }}>
            <div style={{ fontWeight:700, fontSize:14, color:'#1A1D2E' }}>Calls — Last 7 Days</div>
          </div>
          <div style={{ padding:'20px 18px' }}>
            <div style={{ display:'flex', alignItems:'flex-end', gap:8, height:120 }}>
              {callsPerDay.map(({day,count},i) => {
                const pct = count/maxCalls;
                const isToday = day.toDateString()===now.toDateString();
                return (
                  <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:'#374151' }}>{count||''}</div>
                    <div style={{ width:'100%', background:isToday?NAVY:NAVY+'33', borderRadius:'4px 4px 0 0', height: `${Math.max(pct*80,count>0?8:0)}px`, minHeight:count>0?8:0, transition:'height 0.4s ease' }}></div>
                    <div style={{ fontSize:10, color: isToday?NAVY:'#9CA3AF', fontWeight:isToday?700:400 }}>
                      {['M','T','W','T','F','S','S'][(day.getDay()+6)%7]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline stage breakdown */}
      <div style={{ background:'#fff', border:'1px solid #E9EBF0', borderRadius:12, overflow:'hidden' }}>
        <div style={{ padding:'14px 18px', borderBottom:'1px solid #F3F4F6' }}>
          <div style={{ fontWeight:700, fontSize:14, color:'#1A1D2E' }}>Pipeline Stage Breakdown</div>
        </div>
        <div style={{ padding:'18px 20px', display:'flex', flexDirection:'column', gap:12 }}>
          {window.CRM_DATA.stages.map(stage => {
            const count = stageBreakdown[stage]||0;
            const pct = Math.round(count/maxStageCount*100);
            const sc = STAGE_COLORS[stage];
            return (
              <div key={stage} style={{ display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:110, flexShrink:0 }}><StageBadge stage={stage} /></div>
                <div style={{ flex:1, height:8, background:'#F3F4F6', borderRadius:99, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${pct}%`, background:sc.dot, borderRadius:99, transition:'width 0.5s ease' }}></div>
                </div>
                <div style={{ width:24, textAlign:'right', fontSize:13, fontWeight:700, color:'#374151' }}>{count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ManagerDashboard });
