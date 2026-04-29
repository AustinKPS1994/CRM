// Email Composer Modal — AI-powered follow-up emails
const { useState: useState7, useEffect: useEffect7 } = React;

const EMAIL_TEMPLATES = [
  { id:'intro',    label:'Introduction',      prompt: (c) => `Write a short, professional B2B cold email introducing MemphisClean (a commercial janitorial company offering day/night porters, deep cleans, and post-construction cleans) to ${c.contactPerson}, ${c.title||'Facilities Manager'} at ${c.company}. Keep it under 120 words, warm and direct, no fluff. Sign off as Themba from MemphisClean.` },
  { id:'followup', label:'Post-Call Follow-up', prompt: (c) => `Write a short follow-up email to ${c.contactPerson} at ${c.company} after a positive phone call. Reference that we discussed janitorial services (day porters, deep cleans). Keep it under 100 words, professional but friendly. Mention next steps. Sign off as Themba from MemphisClean.` },
  { id:'quote',    label:'Quote Follow-up',    prompt: (c) => `Write a brief follow-up email to ${c.contactPerson} at ${c.company} checking if they've had a chance to review our janitorial services proposal${c.quoteAmount ? ` (R${c.quoteAmount.toLocaleString()}/month)` : ''}. Keep it under 80 words, polite, not pushy. Sign off as Themba from MemphisClean.` },
  { id:'appt',     label:'Appointment Confirm',prompt: (c) => `Write a short appointment confirmation email to ${c.contactPerson} at ${c.company} confirming an upcoming meeting to discuss MemphisClean's janitorial services. Keep it under 80 words, professional. Include a brief agenda line. Sign off as Themba from MemphisClean.` },
  { id:'custom',   label:'Custom',             prompt: null },
];

function EmailComposer({ contact, onClose }) {
  const [template, setTemplate]   = useState7(EMAIL_TEMPLATES[0]);
  const [subject, setSubject]     = useState7(`Introduction — MemphisClean Janitorial Services`);
  const [body, setBody]           = useState7('');
  const [drafting, setDrafting]   = useState7(false);
  const [customPrompt, setCustomPrompt] = useState7('');
  const [sent, setSent]           = useState7(false);

  const subjectDefaults = {
    intro:    `Introduction — MemphisClean Janitorial Services`,
    followup: `Great speaking with you — MemphisClean`,
    quote:    `Following up on our proposal — MemphisClean`,
    appt:     `Appointment Confirmed — MemphisClean`,
    custom:   ``,
  };

  const selectTemplate = (t) => {
    setTemplate(t);
    setSubject(subjectDefaults[t.id]||'');
    setBody('');
  };

  const draftWithAI = async () => {
    setDrafting(true);
    setBody('');
    try {
      const promptText = template.prompt
        ? template.prompt(contact)
        : customPrompt || `Write a professional email to ${contact.contactPerson} at ${contact.company} regarding MemphisClean janitorial services.`;

      const result = await window.claude.complete({
        messages: [{ role:'user', content: promptText }]
      });
      setBody(result);
    } catch(e) {
      setBody(`Hi ${contact.contactPerson},\n\nThank you for your time. I wanted to follow up regarding MemphisClean's janitorial services for ${contact.company}.\n\nWe specialise in day/night porters, deep cleans, and post-construction cleaning — all with our own placed staff for maximum quality control.\n\nI'd love to arrange a brief call to discuss how we can support your facilities team.\n\nKind regards,\nThemba\nMemphisClean`);
    }
    setDrafting(false);
  };

  const handleSend = () => {
    // In a real app this would call an email API
    setSent(true);
  };

  if (sent) {
    return (
      <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.45)', zIndex:300, display:'flex', alignItems:'center', justifyContent:'center' }} onClick={onClose}>
        <div style={{ background:'#fff', borderRadius:16, padding:'40px 36px', textAlign:'center', width:380 }} onClick={e=>e.stopPropagation()}>
          <div style={{ fontSize:48, marginBottom:12 }}>✉️</div>
          <h2 style={{ fontSize:18, fontWeight:800, color:'#1A1D2E', marginBottom:8 }}>Email drafted!</h2>
          <p style={{ color:'#6B7280', fontSize:13, marginBottom:20 }}>Your email to <strong>{contact.contactPerson}</strong> is ready. In the full version this would send via your connected email account.</p>
          <button onClick={onClose} style={{ padding:'9px 24px', background:NAVY, color:'#fff', border:'none', borderRadius:8, fontSize:13, fontWeight:700, cursor:'pointer' }}>Done</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:300, display:'flex', alignItems:'center', justifyContent:'center' }} onClick={onClose}>
      <div style={{ background:'#fff', borderRadius:16, width:600, maxHeight:'88vh', overflowY:'auto', boxShadow:'0 24px 80px rgba(0,0,0,0.25)', display:'flex', flexDirection:'column' }} onClick={e=>e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding:'20px 24px 16px', borderBottom:'1px solid #F3F4F6', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
          <div>
            <h2 style={{ margin:0, fontSize:17, fontWeight:700, color:'#1A1D2E' }}>Compose Email</h2>
            <p style={{ margin:'3px 0 0', fontSize:12, color:'#6B7280' }}>To: {contact.contactPerson} &lt;{contact.email||'no email on file'}&gt; · {contact.company}</p>
          </div>
          <button onClick={onClose} style={{ border:'none', background:'#F3F4F6', borderRadius:8, width:30, height:30, cursor:'pointer', fontSize:16, color:'#6B7280' }}>×</button>
        </div>

        <div style={{ padding:'18px 24px', display:'flex', flexDirection:'column', gap:14, flex:1 }}>
          {/* Template picker */}
          <div>
            <label style={{ fontSize:11, fontWeight:700, color:'#9CA3AF', textTransform:'uppercase', letterSpacing:'0.06em', display:'block', marginBottom:8 }}>Email Type</label>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {EMAIL_TEMPLATES.map(t => (
                <button key={t.id} onClick={()=>selectTemplate(t)} style={{ padding:'5px 12px', borderRadius:99, border:`1.5px solid ${template.id===t.id?NAVY:'#E5E7EB'}`, background:template.id===t.id?NAVY:'#fff', color:template.id===t.id?'#fff':'#374151', fontSize:12, fontWeight:600, cursor:'pointer', transition:'all 0.15s' }}>{t.label}</button>
              ))}
            </div>
          </div>

          {/* Custom prompt */}
          {template.id === 'custom' && (
            <div>
              <label style={{ fontSize:12, fontWeight:600, color:'#374151', display:'block', marginBottom:5 }}>Describe what you want</label>
              <textarea value={customPrompt} onChange={e=>setCustomPrompt(e.target.value)} placeholder="e.g. Re-engage after 3 months of no contact, mention our new post-construction clean service…" rows={2} style={{ width:'100%', padding:'8px 10px', border:'1.5px solid #E5E7EB', borderRadius:8, fontSize:13, outline:'none', resize:'vertical', fontFamily:'inherit', boxSizing:'border-box' }} />
            </div>
          )}

          {/* AI Draft button */}
          <button onClick={draftWithAI} disabled={drafting} style={{ padding:'9px', background:drafting?'#F3F4F6':GOLD, border:'none', borderRadius:8, color:drafting?'#9CA3AF':NAVY, fontSize:13, fontWeight:700, cursor:drafting?'not-allowed':'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, transition:'all 0.15s' }}>
            {drafting ? (
              <><span style={{ display:'inline-block', width:14, height:14, border:'2px solid #9CA3AF', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.7s linear infinite' }}></span> Drafting with AI…</>
            ) : (
              <><span>✦</span> Draft with AI</>
            )}
          </button>

          {/* Subject */}
          <div>
            <label style={{ fontSize:12, fontWeight:600, color:'#374151', display:'block', marginBottom:5 }}>Subject</label>
            <input value={subject} onChange={e=>setSubject(e.target.value)} style={{ width:'100%', padding:'8px 10px', border:'1.5px solid #E5E7EB', borderRadius:8, fontSize:13, outline:'none', boxSizing:'border-box' }} />
          </div>

          {/* Body */}
          <div style={{ flex:1 }}>
            <label style={{ fontSize:12, fontWeight:600, color:'#374151', display:'block', marginBottom:5 }}>Message</label>
            <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Click 'Draft with AI' above, or write your email here…" rows={10} style={{ width:'100%', padding:'10px 12px', border:'1.5px solid #E5E7EB', borderRadius:8, fontSize:13, outline:'none', resize:'vertical', fontFamily:'inherit', lineHeight:1.7, boxSizing:'border-box' }} />
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding:'14px 24px', borderTop:'1px solid #F3F4F6', display:'flex', gap:10, justifyContent:'flex-end', flexShrink:0 }}>
          <button onClick={onClose} style={{ padding:'8px 18px', border:'1.5px solid #E5E7EB', borderRadius:8, background:'#fff', color:'#374151', fontSize:13, fontWeight:600, cursor:'pointer' }}>Cancel</button>
          <button onClick={handleSend} disabled={!body} style={{ padding:'8px 20px', border:'none', borderRadius:8, background:body?NAVY:'#E5E7EB', color:body?'#fff':'#9CA3AF', fontSize:13, fontWeight:700, cursor:body?'pointer':'not-allowed', display:'flex', alignItems:'center', gap:7 }}>
            <Icon path="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" size={14} color={body?'#fff':'#9CA3AF'} />
            Send Email
          </button>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

Object.assign(window, { EmailComposer });
