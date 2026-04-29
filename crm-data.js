// MemphisClean CRM — Sample SA B2B Data
const STAGES = ['New Lead','Called','Interested','Appointment Set','Quoted','Won','Lost'];

const SERVICE_OPTIONS = ['Day Porter','Night Porter','Deep Clean','Post-Construction Clean','Recurring Janitorial'];

const OUTCOME_OPTIONS = ['Answered — Interested','Answered — Not Interested','Answered — Callback','No Answer','Voicemail Left','Wrong Number','Do Not Call'];

const USERS = [
  { id:'u1', name:'Themba Dlamini', initials:'TD', color:'#2B3990' },
  { id:'u2', name:'Sarah Botha', initials:'SB', color:'#0E7490' },
  { id:'u3', name:'Ruan Joubert', initials:'RJ', color:'#7C3AED' },
];

const today = new Date();
const d = (offsetDays, h=9, m=0) => {
  const dt = new Date(today);
  dt.setDate(dt.getDate() + offsetDays);
  dt.setHours(h, m, 0, 0);
  return dt.toISOString();
};

const sampleContacts = [
  {
    id:'c1', company:'Growthpoint Properties', contactPerson:'Zanele Mokoena',
    title:'Facilities Manager', phone:'+27 11 944 6000', email:'z.mokoena@growthpoint.co.za',
    stage:'Appointment Set', assignedTo:'u1',
    services:['Day Porter','Deep Clean'], quoteAmount:85000,
    lastCallDate: d(-1), nextActionDate: d(2,10,0),
    nextAction:'Appointment confirmed — present full proposal',
    notes:'Manages 3 commercial towers in Sandton. Very interested in day porter package. Budget confirmed ~R80k/month.',
    callLog:[
      { id:'cl1', date: d(-3), duration:'12:34', outcome:'Answered — Interested', notes:'Great call. She manages 3 Sandton towers and has been unhappy with current provider. Sending intro email.', nextAction:'Follow up Thursday', nextActionDate: d(-1) },
      { id:'cl2', date: d(-1), duration:'08:17', outcome:'Answered — Interested', notes:'Confirmed appointment for next Tuesday 10am. She will loop in her COO.', nextAction:'Appointment Tue 10am', nextActionDate: d(2,10,0) },
    ]
  },
  {
    id:'c2', company:'Redefine Properties', contactPerson:'Pieter van der Merwe',
    title:'Operations Director', phone:'+27 11 283 7900', email:'pvandermerwe@redefine.co.za',
    stage:'Quoted', assignedTo:'u1',
    services:['Night Porter','Recurring Janitorial'], quoteAmount:120000,
    lastCallDate: d(-4), nextActionDate: d(1,14,0),
    nextAction:'Follow up on quote — ask if they reviewed proposal',
    notes:'Large portfolio, 7 office parks. Decision takes time — multiple stakeholders. Quote sent last week.',
    callLog:[
      { id:'cl3', date: d(-10), duration:'15:02', outcome:'Answered — Interested', notes:'Warm intro. Current contract up for renewal in 2 months.', nextAction:'Send quote', nextActionDate: d(-5) },
      { id:'cl4', date: d(-4), duration:'06:45', outcome:'Answered — Callback', notes:'He was in a meeting. Said he reviewed the quote partially, will call back Friday.', nextAction:'Follow up Monday', nextActionDate: d(1) },
    ]
  },
  {
    id:'c3', company:'Liberty Holdings', contactPerson:'Ayanda Nkosi',
    title:'Head of Corporate Services', phone:'+27 11 408 3911', email:'ankosi@liberty.co.za',
    stage:'Interested', assignedTo:'u1',
    services:['Day Porter','Deep Clean'], quoteAmount:0,
    lastCallDate: d(-2), nextActionDate: d(0,11,0),
    nextAction:'Call back today — she requested a brochure follow-up',
    notes:'Headquarters in Braamfontein, 1200+ staff. She liked the day porter concept. Needs to present to FM committee.',
    callLog:[
      { id:'cl5', date: d(-6), duration:'04:20', outcome:'Answered — Callback', notes:'Busy, asked to call back next week.', nextAction:'Call back', nextActionDate: d(-2) },
      { id:'cl6', date: d(-2), duration:'11:55', outcome:'Answered — Interested', notes:'Much better call. She wants to champion this internally. Sent brochure via email.', nextAction:'Call back today 11am', nextActionDate: d(0,11,0) },
    ]
  },
  {
    id:'c4', company:'MultiChoice Group', contactPerson:'Thandi Sithole',
    title:'Facilities Coordinator', phone:'+27 11 289 3000', email:'t.sithole@multichoice.com',
    stage:'Called', assignedTo:'u2',
    services:['Post-Construction Clean'], quoteAmount:0,
    lastCallDate: d(-1), nextActionDate: d(3),
    nextAction:'Try again Thursday — she was in a meeting',
    notes:'Randburg campus. They are doing a renovation in Building C.',
    callLog:[
      { id:'cl7', date: d(-5), duration:'01:12', outcome:'No Answer', notes:'Left voicemail.', nextAction:'Try again', nextActionDate: d(-1) },
      { id:'cl8', date: d(-1), duration:'02:30', outcome:'Answered — Callback', notes:'Receptionist took message. Thandi was in a meeting — try Thursday.', nextAction:'Call Thursday', nextActionDate: d(3) },
    ]
  },
  {
    id:'c5', company:'Nedbank Group', contactPerson:'Johan Pretorius',
    title:'Property & Facilities', phone:'+27 11 294 4444', email:'j.pretorius@nedbank.co.za',
    stage:'New Lead', assignedTo:'u1',
    services:['Recurring Janitorial','Day Porter'], quoteAmount:0,
    lastCallDate: null, nextActionDate: d(0,9,30),
    nextAction:'First call — intro',
    notes:'HQ in Sandton. Very large account potential. Referred by Zanele Mokoena.',
    callLog:[]
  },
  {
    id:'c6', company:'Discovery Health', contactPerson:'Nomsa Mahlangu',
    title:'Operations Manager', phone:'+27 11 529 2888', email:'nmahlangu@discovery.co.za',
    stage:'New Lead', assignedTo:'u1',
    services:['Day Porter'], quoteAmount:0,
    lastCallDate: null, nextActionDate: d(0,14,30),
    nextAction:'First call — intro',
    notes:'Sandton campus, multiple buildings. Discovery very brand-conscious — emphasise our standards.',
    callLog:[]
  },
  {
    id:'c7', company:'FNB Corporate Campus', contactPerson:'Lerato Molefe',
    title:'Facilities Manager', phone:'+27 11 369 2000', email:'lerato.molefe@fnb.co.za',
    stage:'Won', assignedTo:'u1',
    services:['Day Porter','Recurring Janitorial'], quoteAmount:95000,
    lastCallDate: d(-14), nextActionDate: d(7),
    nextAction:'Monthly check-in call',
    notes:'CLOSED — Day porter + recurring janitorial. Start date 1 May. Key contact is Lerato. Excellent relationship.',
    callLog:[
      { id:'cl9', date: d(-21), duration:'18:22', outcome:'Answered — Interested', notes:'Excellent first call.', nextAction:'Send proposal', nextActionDate: d(-18) },
      { id:'cl10', date: d(-14), duration:'22:10', outcome:'Answered — Interested', notes:'Contract signed!', nextAction:'Onboarding call', nextActionDate: d(7) },
    ]
  },
  {
    id:'c8', company:'Eskom Holdings', contactPerson:'Sipho Dube',
    title:'FM Procurement', phone:'+27 11 800 8111', email:'sdube@eskom.co.za',
    stage:'Lost', assignedTo:'u2',
    services:['Deep Clean'], quoteAmount:45000,
    lastCallDate: d(-7), nextActionDate: d(90),
    nextAction:'Re-engage in 3 months — they went with cheaper provider',
    notes:'Lost on price. Sipho liked us but procurement went lowest bid. Follow up in Q3.',
    callLog:[
      { id:'cl11', date: d(-20), duration:'9:05', outcome:'Answered — Interested', notes:'Good call, sent quote.', nextAction:'Follow up', nextActionDate: d(-10) },
      { id:'cl12', date: d(-7), duration:'5:50', outcome:'Answered — Not Interested', notes:'Lost to competitor. Price was the deciding factor.', nextAction:'Re-engage Q3', nextActionDate: d(90) },
    ]
  },
  {
    id:'c9', company:'Absa Group', contactPerson:'Chantal du Plessis',
    title:'Corporate Real Estate', phone:'+27 11 350 4000', email:'cdu.plessis@absa.co.za',
    stage:'Interested', assignedTo:'u3',
    services:['Post-Construction Clean','Day Porter'], quoteAmount:0,
    lastCallDate: d(-3), nextActionDate: d(1,10,30),
    nextAction:'Send proposal draft',
    notes:'Towers precinct JHB CBD. Major refurb underway. Good timing.',
    callLog:[
      { id:'cl13', date: d(-3), duration:'14:08', outcome:'Answered — Interested', notes:'Long call, very engaged. Wants a proposal.', nextAction:'Send proposal', nextActionDate: d(1) },
    ]
  },
  {
    id:'c10', company:'Standard Bank HQ', contactPerson:'Bongani Khumalo',
    title:'Head of Facilities', phone:'+27 11 636 9111', email:'bkhumalo@standardbank.co.za',
    stage:'Called', assignedTo:'u3',
    services:['Night Porter','Recurring Janitorial'], quoteAmount:0,
    lastCallDate: d(-2), nextActionDate: d(2,15,0),
    nextAction:'Follow-up call Wednesday afternoon',
    notes:'Referred by a previous client. Bongani is professional, asked for credentials email.',
    callLog:[
      { id:'cl14', date: d(-2), duration:'07:33', outcome:'Answered — Callback', notes:'Polite, asked us to email credentials first. Sent email same day.', nextAction:'Call Wednesday', nextActionDate: d(2,15,0) },
    ]
  },
];

window.CRM_DATA = {
  contacts: sampleContacts,
  stages: STAGES,
  services: SERVICE_OPTIONS,
  outcomes: OUTCOME_OPTIONS,
  users: USERS,
};
