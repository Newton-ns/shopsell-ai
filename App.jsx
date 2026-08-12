import React, { useMemo, useState } from "react";
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowRight, ArrowUpRight, BarChart3,
  Bell, Bot, CalendarDays, Check, CheckCircle2, ChevronDown, ChevronLeft,
  ChevronRight, CircleDollarSign, CloudRain, Copy, Download, ExternalLink,
  FileText, Filter, Gauge, Globe2, Heart, HelpCircle, Home, Languages,
  LayoutDashboard, Lightbulb, LineChart, ListFilter, MapPin, Menu, MessageSquare,
  MoreHorizontal, Package, PanelLeftClose, PanelLeftOpen, Plus, RefreshCw,
  Search, Send, Settings, ShoppingBag, Sparkles, Star, Target, TrendingUp,
  Upload, UserRound, Users, WandSparkles, X, Zap
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart as RLineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";

/* -------------------------------------------------------------------------- */
/* MOCK API — replace the function bodies with Axios/FastAPI calls later.     */
/* -------------------------------------------------------------------------- */
export const api = {
  getProducts: async () => products,
  getProductIntelligence: async () => intelligence,
  getDemandIntelligence: async () => demandData,
  getRecommendation: async () => recommendation,
  generateMarketingContent: async ({ language = "English", type = "WhatsApp" }) =>
    marketing[language][type] || marketing.English.WhatsApp,
  getCampaigns: async () => campaigns,
  getAnalytics: async () => analytics,
};

/* -------------------------------------------------------------------------- */
/* MOCK DATA                                                                  */
/* -------------------------------------------------------------------------- */
const products = [
  { id: 1, name: "Raincoat", category: "Rainwear", price: 700, cost: 450, stock: 48, demand: "High", image: "🌧️", status: "Price opportunity" },
  { id: 2, name: "Umbrella", category: "Rainwear", price: 299, cost: 150, stock: 72, demand: "High", image: "☂️", status: "Promote now" },
  { id: 3, name: "School Bag", category: "Accessories", price: 899, cost: 520, stock: 31, demand: "Medium", image: "🎒", status: "Monitor" },
  { id: 4, name: "T-Shirt", category: "Apparel", price: 499, cost: 260, stock: 65, demand: "Medium", image: "👕", status: "Good pricing" },
  { id: 5, name: "Water Bottle", category: "Lifestyle", price: 249, cost: 110, stock: 90, demand: "Low", image: "🧴", status: "Delay campaign" },
];

const competitors = [
  { name: "Competitor A", product: "Raincoat", price: 680, rating: 4.3, reviews: 142, offer: "10% OFF" },
  { name: "Competitor B", product: "Raincoat", price: 699, rating: 4.1, reviews: 98, offer: "None" },
  { name: "Competitor C", product: "Raincoat", price: 650, rating: 4.5, reviews: 210, offer: "₹50 OFF" },
  { name: "Competitor D", product: "Raincoat", price: 750, rating: 4.0, reviews: 76, offer: "5% OFF" },
];

const priceData = [
  { name: "Your Business", price: 700 }, { name: "Competitor A", price: 680 },
  { name: "Competitor B", price: 699 }, { name: "Competitor C", price: 650 },
  { name: "Competitor D", price: 750 },
];

const salesData = [
  { day: "Mon", sales: 42, demand: 55 }, { day: "Tue", sales: 51, demand: 61 },
  { day: "Wed", sales: 48, demand: 58 }, { day: "Thu", sales: 66, demand: 72 },
  { day: "Fri", sales: 74, demand: 84 }, { day: "Sat", sales: 91, demand: 95 },
  { day: "Sun", sales: 82, demand: 91 },
];

const campaignData = [
  { name: "Rainwear", views: 520, engagement: 82 }, { name: "Weekend", views: 410, engagement: 71 },
  { name: "New Arrivals", views: 300, engagement: 48 }, { name: "Festival", views: 240, engagement: 38 },
];

const demandTrend = [
  { day: "Aug 6", rain: 34, demand: 38 }, { day: "Aug 7", rain: 48, demand: 49 },
  { day: "Aug 8", rain: 57, demand: 62 }, { day: "Aug 9", rain: 64, demand: 70 },
  { day: "Aug 10", rain: 71, demand: 79 }, { day: "Aug 11", rain: 76, demand: 86 },
  { day: "Aug 12", rain: 78, demand: 91 },
];

const intelligence = {
  confidence: 94, brand: "Unbranded / Local", category: "Rainwear",
  features: ["Waterproof", "Lightweight", "Full coverage", "Packable"],
  marketRange: "₹650–₹750", recommended: 649, current: 700,
  sentiment: { positive: 72, neutral: 18, negative: 10 },
};

const demandData = {
  location: "Dharmapuri, Tamil Nadu", temperature: 27, rainProbability: 78,
  rows: [
    ["Raincoat", "High", "🔥 HIGH", "Promote now"], ["Umbrella", "High", "🔥 HIGH", "Start campaign"],
    ["T-Shirt", "Medium", "🟡 MEDIUM", "Monitor"], ["Sunglasses", "Low", "🔴 LOW", "Delay campaign"],
  ]
};

const recommendation = {
  price: 649, offer: "₹50 Weekend Discount", demand: "HIGH", bestTime: "Before heavy rainfall",
  confidence: 91,
  evidence: ["Rain expected", "Local demand is high", "Stock availability is high", "Competitor prices are ₹650–₹750", "Product is seasonally relevant"]
};

const marketing = {
  English: {
    WhatsApp: "🌧️ Rainy days are coming! Stay dry with our lightweight Raincoat. This weekend only: ₹50 OFF. Visit our store today and get ready before the rain!",
    Instagram: "Rain is on the way 🌧️ Stay ready with our lightweight Raincoat. Grab ₹50 OFF this weekend and stay comfortable through every shower.",
    "Product Description": "A lightweight, comfortable raincoat designed for everyday monsoon protection. Waterproof coverage, easy to carry and ideal for local rainy-season travel.",
    Poster: "RAINCOAT • ₹649 • ₹50 WEEKEND DISCOUNT"
  },
  Tamil: {
    WhatsApp: "🌧️ மழைக்காலம் வருகிறது! எங்கள் lightweight Raincoat மூலம் மழையில் பாதுகாப்பாக இருங்கள். இந்த வார இறுதியில் ₹50 தள்ளுபடி. மழை அதிகரிக்கும் முன் வாங்குங்கள்!",
    Instagram: "மழை வரப்போகிறது 🌧️ தினசரி பயன்பாட்டிற்கு வசதியான Raincoat. இந்த weekend ₹50 OFF — மழைக்கு தயாராகுங்கள்!",
    "Product Description": "மழைக்காலத்தில் தினசரி பயன்பாட்டிற்கு ஏற்ற lightweight மற்றும் comfortable Raincoat. எடுத்துச் செல்ல எளிதானது மற்றும் நல்ல பாதுகாப்பை வழங்குகிறது.",
    Poster: "RAINCOAT • ₹649 • ₹50 WEEKEND DISCOUNT"
  }
};

const campaigns = [
  { day: "MON", title: "Raincoat Awareness", status: "Planned" },
  { day: "WED", title: "Raincoat Offer", status: "Recommended" },
  { day: "FRI", title: "Weekend Discount", status: "Scheduled" },
  { day: "SUN", title: "Last Chance Promotion", status: "Draft" },
];

const analytics = {
  views: 1240, engagement: 18.4, enquiries: 86, conversions: 31
};

const notifications = [
  { type: "Seasonal Opportunity", text: "Rainy season is approaching. Raincoats may have high demand.", time: "10 min ago", color: "indigo" },
  { type: "Price Alert", text: "Competitor price dropped to ₹650.", time: "32 min ago", color: "amber" },
  { type: "Campaign Reminder", text: "Your weekend promotion starts tomorrow.", time: "1 hr ago", color: "emerald" },
];

/* -------------------------------------------------------------------------- */
/* SMALL REUSABLE UI                                                          */
/* -------------------------------------------------------------------------- */
function Logo() {
  return <div className="flex items-center gap-2.5">
    <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25"><Sparkles size={19}/></div>
    <div><div className="text-[17px] font-extrabold tracking-tight">LocalIQ</div><div className="text-[9px] font-medium text-slate-400">BUSINESS INTELLIGENCE</div></div>
  </div>
}

function StatCard({ icon: Icon, label, value, delta, note }) {
  return <div className="card p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex items-start justify-between">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={19}/></div>
      {delta && <span className={`badge ${delta.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>{delta}</span>}
    </div>
    <div className="mt-5 text-2xl font-bold tracking-tight">{value}</div>
    <div className="mt-1 text-sm font-medium text-slate-500">{label}</div>
    {note && <div className="mt-2 text-xs text-slate-400">{note}</div>}
  </div>
}

function SectionHeader({ title, subtitle, action }) {
  return <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div><h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>{subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}</div>
    {action}
  </div>
}

function Badge({ children, tone = "slate" }) {
  const map = { green:"bg-emerald-50 text-emerald-700", amber:"bg-amber-50 text-amber-700", red:"bg-rose-50 text-rose-700", blue:"bg-indigo-50 text-indigo-700", slate:"bg-slate-100 text-slate-600" };
  return <span className={`badge ${map[tone]}`}>{children}</span>
}

function Toast({ message, onClose }) {
  if (!message) return null;
  return <div className="fixed bottom-5 right-5 z-[100] flex max-w-sm items-center gap-3 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-2xl fade-in">
    <CheckCircle2 className="text-emerald-400" size={19}/><span>{message}</span><button onClick={onClose}><X size={16}/></button>
  </div>
}

function LoadingAI({ onDone }) {
  const [step, setStep] = useState(0);
  const steps = ["Recognizing product", "Finding similar products", "Analyzing competitor prices", "Checking customer reviews", "Checking local demand", "Checking weather", "Generating recommendation"];
  React.useEffect(() => {
    const timer = setInterval(() => setStep(s => {
      if (s >= steps.length - 1) { clearInterval(timer); setTimeout(onDone, 500); return s; }
      return s + 1;
    }), 420);
    return () => clearInterval(timer);
  }, []);
  return <div className="card mx-auto max-w-2xl p-8 text-center fade-in">
    <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-indigo-50 text-indigo-600"><Bot className="ai-pulse" size={30}/></div>
    <h2 className="mt-5 text-xl font-bold">AI is analyzing your product...</h2>
    <p className="mt-1 text-sm text-slate-500">Combining market, review, weather and local-demand signals.</p>
    <div className="mt-7 space-y-3 text-left">{steps.map((s,i)=><div key={s} className="flex items-center gap-3 text-sm">
      {i <= step ? <CheckCircle2 className="text-emerald-500" size={18}/> : <div className="h-[18px] w-[18px] rounded-full border-2 border-slate-200"/>}
      <span className={i <= step ? "font-medium text-slate-800" : "text-slate-400"}>{s}</span>
      {i === step && <span className="ml-auto text-xs text-indigo-600">Analyzing…</span>}
    </div>)}</div>
  </div>
}

/* -------------------------------------------------------------------------- */
/* LAYOUT                                                                     */
/* -------------------------------------------------------------------------- */
const nav = [
  ["dashboard","Dashboard",LayoutDashboard], ["products","Products",Package], ["intelligence","Market Intelligence",LineChart],
  ["recommendations","AI Recommendations",Sparkles], ["demand","Demand Intelligence",CloudRain], ["marketing","Marketing Studio",WandSparkles],
  ["campaigns","Campaign Planner",CalendarDays], ["analytics","Analytics",BarChart3], ["notifications","Notifications",Bell], ["settings","Settings",Settings]
];

function Sidebar({ page, setPage, collapsed, setCollapsed, mobile, closeMobile }) {
  return <aside className={`${mobile ? "fixed inset-y-0 left-0 z-50 w-72" : `hidden lg:flex ${collapsed ? "w-[76px]" : "w-64"}`} flex-col border-r border-slate-200 bg-white transition-all duration-300`}>
    <div className="flex h-20 items-center px-5">{!collapsed || mobile ? <Logo/> : <div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white"><Sparkles size={18}/></div>}
      {!mobile && <button onClick={()=>setCollapsed(!collapsed)} className="ml-auto rounded-lg p-2 text-slate-400 hover:bg-slate-100">{collapsed ? <PanelLeftOpen size={17}/> : <PanelLeftClose size={17}/>}</button>}
      {mobile && <button onClick={closeMobile} className="ml-auto rounded-lg p-2 text-slate-400"><X size={18}/></button>}
    </div>
    <div className="px-3 pt-3">{!collapsed && <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">Workspace</div>}
      <nav className="space-y-1">{nav.map(([id,label,Icon])=><button key={id} onClick={()=>{setPage(id); closeMobile?.()}} title={collapsed ? label : ""} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${page===id ? "bg-indigo-50 text-indigo-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>
        <Icon size={18}/>{(!collapsed || mobile) && <span>{label}</span>}{id==="notifications" && (!collapsed || mobile) && <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-rose-100 px-1 text-[10px] font-bold text-rose-600">3</span>}
      </button>)}</nav>
    </div>
    {(!collapsed || mobile) && <div className="mt-auto p-4"><div className="rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 p-4 text-white">
      <div className="flex items-center gap-2"><Zap size={16} className="text-amber-300"/><span className="text-xs font-bold">AI BUSINESS SIGNAL</span></div>
      <p className="mt-2 text-xs leading-5 text-slate-300">Rain expected soon. Your rainwear category has a high opportunity score.</p>
      <button onClick={()=>setPage("recommendations")} className="mt-3 text-xs font-semibold text-white hover:underline">View recommendation →</button>
    </div></div>}
  </aside>
}

function Topbar({ setMobileOpen, onSearch }) {
  return <header className="sticky top-0 z-30 flex h-20 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-6">
    <button onClick={()=>setMobileOpen(true)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"><Menu size={20}/></button>
    <div className="relative hidden max-w-md flex-1 md:block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17}/><input onChange={e=>onSearch(e.target.value)} className="input pl-10" placeholder="Search products, insights, campaigns…"/></div>
    <div className="ml-auto flex items-center gap-2">
      <div className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 sm:flex"><MapPin size={15} className="text-indigo-600"/> Dharmapuri, TN <ChevronDown size={13}/></div>
      <button className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"><Bell size={19}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500"/></button>
      <div className="flex items-center gap-2 rounded-xl pl-1"><div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">SS</div><div className="hidden sm:block"><div className="text-xs font-bold">Shop Owner</div><div className="text-[10px] text-slate-400">Admin</div></div></div>
    </div>
  </header>
}

/* -------------------------------------------------------------------------- */
/* PAGES                                                                      */
/* -------------------------------------------------------------------------- */
function Dashboard({ go, toast }) {
  return <div className="fade-in">
    <SectionHeader title="Good Morning, Shop Owner 👋" subtitle="Here are today's opportunities for your business." action={<button onClick={()=>go("analyze")} className="btn-primary"><Plus size={17}/> Add Product</button>}/>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard icon={Package} value="24" label="Total Products" delta="+8.2%" note="vs. last month"/>
      <StatCard icon={FlameIcon} value="8" label="High Demand Products" delta="+18.4%" note="weather-adjusted"/>
      <StatCard icon={Target} value="5" label="Active Campaigns" delta="+2" note="3 performing above average"/>
      <StatCard icon={MessageSquare} value="86" label="New Enquiries" delta="+12.5%" note="this week"/>
    </div>
    <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_.85fr]">
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 p-5"><div><h2 className="font-bold">AI Business Insights</h2><p className="text-xs text-slate-400">Signals generated from your local market</p></div><Badge tone="blue"><Bot size={12}/> Live AI</Badge></div>
        <div className="grid gap-3 p-5 md:grid-cols-3">
          <InsightCard icon="🔥" title="HIGH DEMAND OPPORTUNITY" text="Rain expected this week. Raincoats and umbrellas may see increased demand." button="View Opportunity" onClick={()=>go("demand")}/>
          <InsightCard icon="💰" title="PRICE OPPORTUNITY" text="Your raincoat is ₹700. Recommended market price is ₹649." button="View Recommendation" onClick={()=>go("recommendations")}/>
          <InsightCard icon="📢" title="MARKETING OPPORTUNITY" text="Weekend promotion recommended for Raincoat." button="Generate Campaign" onClick={()=>go("marketing")}/>
        </div>
      </div>
      <div className="card p-5">
        <div className="flex items-center justify-between"><div><h2 className="font-bold">Demand Overview</h2><p className="text-xs text-slate-400">7-day local signal</p></div><CloudRain className="text-indigo-500" size={20}/></div>
        <div className="mt-4 h-52"><ResponsiveContainer><AreaChart data={salesData}><defs><linearGradient id="demandFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity=".25"/><stop offset="100%" stopColor="#6366f1" stopOpacity="0"/></linearGradient></defs><CartesianGrid vertical={false} stroke="#e2e8f0"/><XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={11}/><YAxis hide/><Tooltip/><Area type="monotone" dataKey="demand" stroke="#6366f1" fill="url(#demandFill)" strokeWidth={2}/></AreaChart></ResponsiveContainer></div>
      </div>
    </div>
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <div className="card p-5"><div className="flex items-center justify-between"><div><h2 className="font-bold">Sales & Demand</h2><p className="text-xs text-slate-400">Last 7 days</p></div><button className="btn-ghost px-2">View analytics <ArrowRight size={14}/></button></div>
        <div className="mt-4 h-64"><ResponsiveContainer><RLineChart data={salesData}><CartesianGrid vertical={false} stroke="#e2e8f0"/><XAxis dataKey="day" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip/><Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} dot={false}/><Line type="monotone" dataKey="demand" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false}/></RLineChart></ResponsiveContainer></div>
      </div>
      <div className="card p-5"><div className="flex items-center justify-between"><div><h2 className="font-bold">Campaign Performance</h2><p className="text-xs text-slate-400">Views by campaign</p></div><Badge tone="green">+18.4% engagement</Badge></div>
        <div className="mt-4 h-64"><ResponsiveContainer><BarChart data={campaignData} layout="vertical"><CartesianGrid horizontal={false} stroke="#e2e8f0"/><XAxis type="number" hide/><YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={85} fontSize={11}/><Tooltip/><Bar dataKey="views" fill="#6366f1" radius={[0,6,6,0]} barSize={20}/></BarChart></ResponsiveContainer></div>
      </div>
    </div>
    <div className="mt-6 card p-5"><div className="flex items-center justify-between"><div><h2 className="font-bold">Recent Recommendations</h2><p className="text-xs text-slate-400">What your AI advisor wants you to act on</p></div><button onClick={()=>go("recommendations")} className="btn-ghost">View all <ArrowRight size={14}/></button></div>
      <div className="mt-4 grid gap-3 md:grid-cols-3"><MiniRec title="Adjust Raincoat price" meta="₹700 → ₹649" tone="blue"/><MiniRec title="Promote Umbrellas" meta="Demand score 92/100" tone="green"/><MiniRec title="Schedule weekend offer" meta="Best time: Fri 5 PM" tone="amber"/></div>
    </div>
  </div>
}

function InsightCard({icon,title,text,button,onClick}) { return <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-indigo-100 hover:bg-indigo-50/40"><div className="text-xl">{icon}</div><div className="mt-3 text-[10px] font-extrabold tracking-wider text-slate-400">{title}</div><p className="mt-2 min-h-[60px] text-sm leading-5 text-slate-600">{text}</p><button onClick={onClick} className="mt-3 text-xs font-bold text-indigo-600 hover:underline">{button} →</button></div> }
function MiniRec({title,meta,tone}) { return <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"><div className={`h-2 w-2 rounded-full ${tone==="green"?"bg-emerald-500":tone==="amber"?"bg-amber-500":"bg-indigo-500"}`}/><div><div className="text-sm font-semibold">{title}</div><div className="text-xs text-slate-400">{meta}</div></div></div> }
function FlameIcon({size=19}) { return <span style={{fontSize:size-1}}>🔥</span> }

function Products({go, toast, search}) {
  const [cat,setCat]=useState("All"), [demand,setDemand]=useState("All");
  const filtered=products.filter(p=>(cat==="All"||p.category===cat)&&(demand==="All"||p.demand===demand)&&p.name.toLowerCase().includes((search||"").toLowerCase()));
  return <div className="fade-in"><SectionHeader title="My Products" subtitle="Manage your catalog and unlock AI product intelligence." action={<button onClick={()=>go("analyze")} className="btn-primary"><Plus size={17}/> Add Product</button>}/>
    <div className="card mb-5 flex flex-wrap gap-3 p-3"><div className="relative min-w-[210px] flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/><input className="input pl-9" placeholder="Search products…" value={search||""} readOnly/></div><select className="input w-auto" value={cat} onChange={e=>setCat(e.target.value)}><option>All</option><option>Rainwear</option><option>Accessories</option><option>Apparel</option><option>Lifestyle</option></select><select className="input w-auto" value={demand} onChange={e=>setDemand(e.target.value)}><option>All</option><option>High</option><option>Medium</option><option>Low</option></select><button className="btn-secondary"><ListFilter size={16}/> Sort</button></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map(p=><div key={p.id} onClick={()=>p.id===1?go("intelligence"):toast(`${p.name} intelligence preview opened`)} className="card cursor-pointer p-5 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <div className="flex items-start justify-between"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-3xl">{p.image}</div><Badge tone={p.demand==="High"?"green":p.demand==="Medium"?"amber":"red"}>{p.demand} demand</Badge></div>
      <div className="mt-4 flex items-center justify-between"><div><h3 className="font-bold">{p.name}</h3><p className="text-xs text-slate-400">{p.category}</p></div><div className="text-right"><div className="font-bold">₹{p.price}</div><div className="text-xs text-slate-400">Cost ₹{p.cost}</div></div></div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs"><div className="rounded-xl bg-slate-50 p-3"><span className="text-slate-400">Stock</span><b className="ml-1">{p.stock}</b></div><div className="rounded-xl bg-indigo-50 p-3 text-indigo-700"><span>AI</span><b className="ml-1">{p.status}</b></div></div>
    </div>)}</div>
    {!filtered.length&&<EmptyState title="No products found" text="Try changing your search or filters."/>}
  </div>
}

function AnalyzeProduct({setAnalyzing, go}) {
  const [file,setFile]=useState(null), [form,setForm]=useState({name:"Raincoat",category:"Rainwear",cost:"450",price:"700",stock:"48",location:"Dharmapuri, Tamil Nadu"});
  const update=(k,v)=>setForm(f=>({...f,[k]:v}));
  return <div className="fade-in max-w-4xl"><SectionHeader title="Analyze a Product" subtitle="Give LocalIQ a product and let AI build its market intelligence."/>
    <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
      <div className="card p-5"><div className="mb-4 flex items-center gap-2"><Upload size={18} className="text-indigo-600"/><h2 className="font-bold">Product Image</h2></div>
        <label className="group flex min-h-[330px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-6 text-center transition hover:border-indigo-300 hover:bg-indigo-50/30">
          {file?<><div className="text-7xl">{file}</div><p className="mt-4 text-sm font-semibold">Raincoat preview</p><p className="text-xs text-slate-400">Click to replace image</p></>:<><div className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-indigo-600 shadow-sm"><Upload size={27}/></div><p className="mt-5 font-semibold">Drag & drop product image here</p><p className="mt-1 text-xs text-slate-400">or click to browse • JPG, PNG</p></>}
          <input type="file" accept="image/*" className="hidden" onChange={e=>setFile("🌧️")}/>
        </label>
      </div>
      <div className="card p-5"><div className="mb-5 flex items-center gap-2"><Package size={18} className="text-indigo-600"/><h2 className="font-bold">Product Details</h2></div><div className="grid gap-4 sm:grid-cols-2">
        <Field label="Product Name"><input className="input" value={form.name} onChange={e=>update("name",e.target.value)}/></Field>
        <Field label="Category"><select className="input" value={form.category} onChange={e=>update("category",e.target.value)}><option>Rainwear</option><option>Apparel</option><option>Accessories</option><option>Lifestyle</option></select></Field>
        <Field label="Purchase Cost"><input className="input" value={form.cost} onChange={e=>update("cost",e.target.value)}/></Field>
        <Field label="Selling Price"><input className="input" value={form.price} onChange={e=>update("price",e.target.value)}/></Field>
        <Field label="Stock Quantity"><input className="input" value={form.stock} onChange={e=>update("stock",e.target.value)}/></Field>
        <Field label="Business Location"><input className="input" value={form.location} onChange={e=>update("location",e.target.value)}/></Field>
      </div><button onClick={()=>setAnalyzing(true)} className="btn-primary mt-6 w-full py-3"><Sparkles size={17}/> Analyze Product</button><p className="mt-3 text-center text-[11px] text-slate-400">AI analysis uses mock demo data in this frontend.</p></div>
    </div>
  </div>
}
function Field({label,children}){return <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-500">{label}</span>{children}</label>}

function Intelligence({go}) {
  return <div className="fade-in"><SectionHeader title="Product Intelligence" subtitle="Raincoat • Market, competitor, review and demand intelligence." action={<button onClick={()=>go("recommendations")} className="btn-primary"><Sparkles size={16}/> View AI Recommendation</button>}/>
    <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><div className="card p-5"><div className="flex items-center gap-4"><div className="grid h-20 w-20 place-items-center rounded-2xl bg-slate-50 text-5xl">🌧️</div><div><h2 className="text-xl font-bold">Raincoat</h2><p className="text-sm text-slate-400">Rainwear • {intelligence.brand}</p><div className="mt-2 flex gap-2"><Badge tone="green">94% recognition</Badge><Badge tone="blue">AI analyzed</Badge></div></div></div><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl bg-slate-50 p-3"><div className="text-xs text-slate-400">Features</div><div className="mt-2 flex flex-wrap gap-1.5">{intelligence.features.map(x=><span className="rounded-lg bg-white px-2 py-1 text-[11px] font-medium" key={x}>{x}</span>)}</div></div><div className="rounded-xl bg-slate-50 p-3"><div className="text-xs text-slate-400">Similar products</div><div className="mt-2 text-sm font-semibold">4 local matches</div><div className="text-xs text-slate-400">across your market</div></div></div></div>
      <div className="card p-5"><div className="flex items-center justify-between"><div><h2 className="font-bold">Market Price Analysis</h2><p className="text-xs text-slate-400">Your price vs. local competitors</p></div><Badge tone="amber">Recommended ₹649</Badge></div><div className="mt-4 h-60"><ResponsiveContainer><BarChart data={priceData}><CartesianGrid vertical={false} stroke="#e2e8f0"/><XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10}/><YAxis axisLine={false} tickLine={false} fontSize={11}/><Tooltip formatter={v=>[`₹${v}`,"Price"]}/><Bar dataKey="price" radius={[7,7,0,0]}>{priceData.map((d,i)=><Cell key={d.name} fill={i===0?"#4f46e5":"#cbd5e1"}/>)}</Bar></BarChart></ResponsiveContainer></div><div className="grid grid-cols-3 gap-2 text-center"><Metric label="Your Price" value="₹700"/><Metric label="Market Range" value="₹650–₹750"/><Metric label="AI Price" value="₹649" accent/></div></div></div>
    <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_.65fr]"><div className="card overflow-hidden"><div className="p-5"><h2 className="font-bold">Competitor Intelligence</h2><p className="text-xs text-slate-400">Public market signals collected for demo</p></div><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-slate-50 text-xs text-slate-400"><tr>{["Competitor","Product","Price","Rating","Reviews","Offer"].map(h=><th className="px-5 py-3 font-semibold" key={h}>{h}</th>)}</tr></thead><tbody>{competitors.map(c=><tr className="border-t border-slate-100" key={c.name}><td className="px-5 py-3 font-semibold">{c.name}</td><td className="px-5 py-3 text-slate-500">{c.product}</td><td className="px-5 py-3 font-semibold">₹{c.price}</td><td className="px-5 py-3"><span className="inline-flex items-center gap-1"><Star size={13} className="fill-amber-400 text-amber-400"/>{c.rating}</span></td><td className="px-5 py-3 text-slate-500">{c.reviews}</td><td className="px-5 py-3"><Badge tone={c.offer==="None"?"slate":"green"}>{c.offer}</Badge></td></tr>)}</tbody></table></div></div>
      <div className="card p-5"><h2 className="font-bold">Review Intelligence</h2><div className="mt-4 h-44"><ResponsiveContainer><PieChart><Pie data={[{name:"Positive",value:72},{name:"Neutral",value:18},{name:"Negative",value:10}]} innerRadius={52} outerRadius={70} dataKey="value" startAngle={90} endAngle={-270}>{["#10b981","#94a3b8","#f43f5e"].map((c,i)=><Cell key={i} fill={c}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></div><div className="grid grid-cols-3 text-center text-xs"><div><b className="text-emerald-600">72%</b><p className="text-slate-400">Positive</p></div><div><b>18%</b><p className="text-slate-400">Neutral</p></div><div><b className="text-rose-600">10%</b><p className="text-slate-400">Negative</p></div></div><div className="mt-5"><p className="text-xs font-bold text-slate-400">CUSTOMER PREFERENCES</p><div className="mt-2 flex flex-wrap gap-2">{["Waterproof","Lightweight","Comfortable","Affordable"].map(x=><Badge key={x} tone="green"><Check size={11}/>{x}</Badge>)}</div><p className="mt-4 text-xs font-bold text-slate-400">COMMON COMPLAINTS</p><div className="mt-2 flex flex-wrap gap-2">{["Size issues","Zip quality","Limited colors"].map(x=><Badge key={x} tone="amber"><AlertTriangle size={11}/>{x}</Badge>)}</div></div></div></div>
  </div>
}
function Metric({label,value,accent}){return <div className={`rounded-xl p-3 ${accent?"bg-indigo-50 text-indigo-700":"bg-slate-50"}`}><div className="text-[10px] text-slate-400">{label}</div><div className="mt-1 text-sm font-bold">{value}</div></div>}

function Recommendations({go,toast}) {
  return <div className="fade-in"><SectionHeader title="AI Business Advisor" subtitle="Turn market intelligence into your next business action."/>
    <div className="grid gap-5 xl:grid-cols-[1.15fr_.85fr]"><div className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-6 text-white shadow-xl"><div className="flex items-center gap-2 text-indigo-200"><div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10"><Bot size={18}/></div><span className="text-sm font-bold">LOCALIQ AI ADVISOR</span><span className="ml-auto rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-bold text-emerald-300">HIGH CONFIDENCE</span></div><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-white/10 p-5"><p className="text-xs text-indigo-200">RECOMMENDED PRICE</p><div className="mt-2 text-4xl font-black">₹649</div><p className="mt-1 text-xs text-indigo-200">Current ₹700 • Market ₹650–₹750</p></div><div className="rounded-2xl bg-white/10 p-5"><p className="text-xs text-indigo-200">RECOMMENDED OFFER</p><div className="mt-2 text-2xl font-black">₹50 Weekend Discount</div><p className="mt-1 text-xs text-indigo-200">Designed for fast local conversion</p></div><div className="rounded-2xl bg-white/10 p-5"><p className="text-xs text-indigo-200">DEMAND OPPORTUNITY</p><div className="mt-2 text-2xl font-black">🔥 HIGH</div><p className="mt-1 text-xs text-indigo-200">Rain-driven demand signal</p></div><div className="rounded-2xl bg-white/10 p-5"><p className="text-xs text-indigo-200">BEST TIME TO PROMOTE</p><div className="mt-2 text-lg font-black">Before heavy rainfall</div><p className="mt-1 text-xs text-indigo-200">Act before demand peaks</p></div></div><div className="mt-5 flex flex-wrap gap-3"><button onClick={()=>toast("Recommendation accepted — action plan saved")} className="btn bg-white text-slate-900 hover:bg-slate-100"><Check size={16}/> Accept Recommendation</button><button onClick={()=>go("marketing")} className="btn border border-white/20 bg-white/10 text-white hover:bg-white/15"><WandSparkles size={16}/> Generate Campaign</button><button onClick={()=>go("intelligence")} className="btn border border-white/20 bg-transparent text-white hover:bg-white/10"><LineChart size={16}/> View Market Data</button></div></div>
      <div className="card p-6"><div className="flex items-center justify-between"><div><h2 className="font-bold">Confidence Score</h2><p className="text-xs text-slate-400">Evidence-backed recommendation</p></div><div className="text-3xl font-black text-indigo-600">91%</div></div><div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[91%] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"/></div><h3 className="mt-7 font-bold">Why this recommendation?</h3><div className="mt-3 space-y-3">{recommendation.evidence.map((e,i)=><div key={e} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-sm"><div className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-50 text-emerald-600"><Check size={14}/></div><span>{e}</span></div>)}</div><div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50 p-4"><div className="flex items-center gap-2 text-sm font-bold text-indigo-800"><Lightbulb size={16}/> Recommendation Explanation</div><p className="mt-2 text-sm leading-6 text-indigo-700">Lowering the price to ₹649 keeps you inside the local market band while creating a visible weekend offer. Weather and demand signals suggest acting before rainfall peaks.</p></div></div></div>
  </div>
}

function Demand({go}) {
  return <div className="fade-in"><SectionHeader title="Weather & Local Demand Intelligence" subtitle="Dharmapuri, Tamil Nadu • Local signals help you time the right product."/>
    <div className="grid gap-5 lg:grid-cols-[.7fr_1.3fr]"><div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-xl"><div className="flex items-center gap-2 text-indigo-100"><CloudRain size={20}/><span className="text-sm font-bold">TODAY'S WEATHER SIGNAL</span></div><div className="mt-7 flex items-center justify-between"><div><div className="text-4xl">🌧️</div><div className="mt-3 text-2xl font-black">Rain Expected</div><div className="mt-1 text-sm text-indigo-100">Weather is creating a demand opportunity.</div></div><div className="text-right"><div className="text-4xl font-black">27°</div><div className="mt-1 text-sm text-indigo-100">Rain probability</div><div className="text-2xl font-bold">78%</div></div></div><div className="mt-7 h-2 rounded-full bg-white/20"><div className="h-full w-[78%] rounded-full bg-white"/></div></div>
      <div className="card overflow-hidden"><div className="p-5"><h2 className="font-bold">Product Demand Radar</h2><p className="text-xs text-slate-400">Weather-adjusted opportunity by product</p></div><div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-slate-50 text-xs text-slate-400"><tr><th className="px-5 py-3">Product</th><th>Demand</th><th>Opportunity</th><th>Recommendation</th></tr></thead><tbody>{demandData.rows.map(r=><tr className="border-t border-slate-100" key={r[0]}><td className="px-5 py-4 font-semibold">{r[0]}</td><td><Badge tone={r[1]==="High"?"green":r[1]==="Medium"?"amber":"red"}>{r[1]}</Badge></td><td className="font-semibold">{r[2]}</td><td className="text-slate-500">{r[3]}</td></tr>)}</tbody></table></div></div></div>
    <div className="mt-5 grid gap-5 lg:grid-cols-2"><div className="card p-5"><h2 className="font-bold">Demand Trend</h2><p className="text-xs text-slate-400">Rain probability vs. product demand</p><div className="mt-4 h-64"><ResponsiveContainer><RLineChart data={demandTrend}><CartesianGrid vertical={false} stroke="#e2e8f0"/><XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={10}/><YAxis axisLine={false} tickLine={false}/><Tooltip/><Line dataKey="rain" name="Rain probability" stroke="#6366f1" strokeWidth={3} dot={false}/><Line dataKey="demand" name="Demand score" stroke="#10b981" strokeWidth={3} dot={false}/></RLineChart></ResponsiveContainer></div></div><div className="card p-5"><h2 className="font-bold">Seasonal & Festival Opportunities</h2><div className="mt-4 space-y-3"><Opportunity icon="🌧️" title="Monsoon peak" text="Rainwear demand likely to remain elevated." score="92"/><Opportunity icon="🎒" title="School season" text="School bags and accessories may see uplift." score="76"/><Opportunity icon="🪔" title="Festival shopping" text="Plan promotional bundles ahead of local celebrations." score="68"/></div></div></div>
    <div className="mt-5 rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-6"><div className="flex gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-indigo-600 shadow-sm"><Bot size={20}/></div><div><p className="text-xs font-bold uppercase tracking-wider text-indigo-500">AI Insight</p><h2 className="mt-1 text-lg font-bold text-indigo-950">Rain is expected soon. Consider promoting rainwear products before demand increases.</h2><button onClick={()=>go("marketing")} className="mt-3 text-sm font-bold text-indigo-600">Turn this insight into a campaign →</button></div></div></div>
  </div>
}
function Opportunity({icon,title,text,score}){return <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3"><span className="text-2xl">{icon}</span><div className="min-w-0 flex-1"><div className="text-sm font-bold">{title}</div><p className="text-xs text-slate-400">{text}</p></div><div className="text-right"><div className="text-lg font-black text-indigo-600">{score}</div><div className="text-[9px] text-slate-400">SCORE</div></div></div>}

function Marketing({toast}) {
  const [lang,setLang]=useState("English"), [type,setType]=useState("WhatsApp"), [content,setContent]=useState(marketing.English.WhatsApp), [generating,setGenerating]=useState(false);
  const generate=()=>{setGenerating(true);setTimeout(()=>{setContent(marketing[lang][type]||marketing[lang].WhatsApp);setGenerating(false);toast("AI marketing content generated")},700)};
  const types=["WhatsApp","Instagram","Poster","Product Description"];
  return <div className="fade-in"><SectionHeader title="AI Marketing Studio" subtitle="Generate local-language marketing content from your product intelligence." action={<div className="flex items-center gap-2"><Languages size={17} className="text-slate-400"/><select className="input w-auto" value={lang} onChange={e=>setLang(e.target.value)}><option>English</option><option>Tamil</option></select></div>}/>
    <div className="card p-3"><div className="flex flex-wrap gap-2">{types.map(t=><button key={t} onClick={()=>{setType(t);setContent(marketing[lang][t]||"")}} className={`rounded-xl px-4 py-2 text-sm font-semibold ${type===t?"bg-indigo-600 text-white":"text-slate-500 hover:bg-slate-100"}`}>{t}</button>)}</div></div>
    <div className="mt-5 grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><div className="card p-5"><h2 className="font-bold">Campaign Inputs</h2><div className="mt-5 space-y-4"><Field label="Product"><select className="input"><option>Raincoat</option><option>Umbrella</option></select></Field><Field label="Offer"><input className="input" value="₹50 Weekend Discount" readOnly/></Field><Field label="Language"><div className="grid grid-cols-2 gap-2">{["English","Tamil"].map(x=><button key={x} onClick={()=>{setLang(x);setContent(marketing[x][type]||"")}} className={`rounded-xl border p-2.5 text-sm font-semibold ${lang===x?"border-indigo-400 bg-indigo-50 text-indigo-700":"border-slate-200"}`}>{x}</button>)}</div></Field><button onClick={generate} disabled={generating} className="btn-primary w-full">{generating?<><RefreshCw className="animate-spin" size={16}/> Generating…</>:<><WandSparkles size={16}/> Generate</>}</button></div></div>
      <div className="card p-5"><div className="flex items-center justify-between"><div><h2 className="font-bold">{type} Preview</h2><p className="text-xs text-slate-400">{lang} • AI-generated from recommendation signals</p></div><button onClick={()=>{navigator.clipboard?.writeText(content);toast("Content copied to clipboard")}} className="btn-secondary"><Copy size={15}/> Copy</button></div>
        {type==="Poster"?<div className="mx-auto mt-5 max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 to-indigo-900 p-7 text-center text-white shadow-xl"><div className="text-6xl">🌧️</div><div className="mt-5 text-xs font-bold tracking-[.25em] text-indigo-200">MONSOON SPECIAL</div><h3 className="mt-2 text-4xl font-black">RAINCOAT</h3><p className="mt-2 text-indigo-100">Stay dry. Stay ready.</p><div className="my-6 rounded-2xl bg-white/10 p-4"><div className="text-sm text-indigo-200">THIS WEEKEND</div><div className="text-3xl font-black">₹649</div><div className="text-sm font-bold text-emerald-300">₹50 DISCOUNT</div></div><div className="rounded-xl bg-white py-3 text-sm font-black text-slate-900">SHOP NOW</div></div>:<div className={`mt-5 min-h-[280px] rounded-3xl p-5 ${type==="WhatsApp"?"bg-[#eef7f1]":"bg-slate-50"}`}><div className="mx-auto max-w-xl rounded-2xl bg-white p-5 shadow-sm"><div className="flex items-center gap-3 border-b border-slate-100 pb-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-indigo-100 text-indigo-600"><ShoppingBag size={17}/></div><div><div className="text-sm font-bold">LocalIQ Shop</div><div className="text-[10px] text-slate-400">AI Marketing Preview</div></div></div><p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-700">{content}</p><div className="mt-5 flex gap-2"><button onClick={generate} className="btn-primary"><RefreshCw size={14}/> Regenerate</button><button onClick={()=>{navigator.clipboard?.writeText(content);toast("Copied")}} className="btn-secondary"><Copy size={14}/> Copy</button></div></div></div>}</div>
    </div>
  </div>
}

function Campaigns({toast}) {
  const [selected,setSelected]=useState(null);
  return <div className="fade-in"><SectionHeader title="Smart Campaign Planner" subtitle="Plan campaigns around demand peaks, weather and local timing." action={<button onClick={()=>toast("New campaign draft created")} className="btn-primary"><Plus size={17}/> Create Campaign</button>}/>
    <div className="grid gap-5 lg:grid-cols-[1.35fr_.65fr]"><div className="card p-5"><div className="flex items-center justify-between"><div><h2 className="font-bold">August 2026</h2><p className="text-xs text-slate-400">AI-optimized campaign calendar</p></div><div className="flex gap-1"><button className="btn-ghost px-2"><ChevronLeft size={17}/></button><button className="btn-ghost px-2"><ChevronRight size={17}/></button></div></div><div className="mt-5 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400">{["MON","TUE","WED","THU","FRI","SAT","SUN"].map(x=><div className="py-2" key={x}>{x}</div>)}{Array.from({length:31},(_,i)=><button onClick={()=>setSelected(i+1)} key={i} className={`min-h-20 rounded-xl border p-2 text-left transition hover:border-indigo-200 ${selected===i+1?"border-indigo-400 bg-indigo-50":"border-slate-100 bg-slate-50/50"}`}><span className="text-xs font-bold">{i+1}</span>{[10,12,14,16,19,22,26,29].includes(i+1)&&<div className="mt-2 rounded-lg bg-indigo-100 px-1.5 py-1 text-[9px] font-bold text-indigo-700">{i+1===14?"Offer":"Raincoat"}</div>}</button>)}</div></div>
      <div className="card p-5"><h2 className="font-bold">Upcoming Campaigns</h2><div className="mt-4 space-y-3">{campaigns.map(c=><div className="rounded-2xl border border-slate-100 p-4" key={c.title}><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-xs font-black text-indigo-600">{c.day}</div><div className="min-w-0 flex-1"><div className="text-sm font-bold">{c.title}</div><div className="mt-1 text-xs text-slate-400">{c.status}</div></div><MoreHorizontal size={16} className="text-slate-400"/></div></div>)}</div><div className="mt-5 rounded-2xl bg-amber-50 p-4"><div className="flex gap-2 text-sm font-bold text-amber-800"><Lightbulb size={16}/> AI campaign recommendation</div><p className="mt-2 text-xs leading-5 text-amber-700">Start raincoat promotion 7 days before expected heavy rainfall.</p><div className="mt-3 flex gap-2"><button onClick={()=>toast("Campaign scheduled for Friday")} className="btn bg-amber-600 text-white hover:bg-amber-700">Schedule</button><button onClick={()=>toast("Reminder set")} className="btn border border-amber-200 bg-white text-amber-800">Set Reminder</button></div></div></div></div>
  </div>
}

function Analytics() {
  return <div className="fade-in"><SectionHeader title="Marketing Performance" subtitle="Understand what is working and where AI recommends doubling down."/>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard icon={EyeIcon} value="1,240" label="Campaign Views" delta="+22.8%"/><StatCard icon={Activity} value="18.4%" label="Engagement" delta="+4.2%"/><StatCard icon={MessageSquare} value="86" label="Enquiries" delta="+12.5%"/><StatCard icon={Target} value="31" label="Conversions" delta="+9.1%"/></div>
    <div className="mt-5 grid gap-5 lg:grid-cols-2"><ChartCard title="Campaign Performance" data={campaignData}/><div className="card p-5"><h2 className="font-bold">Engagement Trend</h2><p className="text-xs text-slate-400">Daily engagement across campaigns</p><div className="mt-4 h-64"><ResponsiveContainer><AreaChart data={salesData}><CartesianGrid vertical={false} stroke="#e2e8f0"/><XAxis dataKey="day" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip/><Area dataKey="sales" name="Engagement" stroke="#6366f1" fill="#6366f1" fillOpacity=".12" strokeWidth={3}/></AreaChart></ResponsiveContainer></div></div></div>
    <div className="mt-5 card p-5"><h2 className="font-bold">AI Performance Insights</h2><div className="mt-4 grid gap-3 md:grid-cols-3"><InsightRow text="Weekend discount campaigns are performing better than regular promotions."/><InsightRow text="Raincoat campaigns generated higher engagement than other products."/><InsightRow text="Consider repeating seasonal promotions when weather demand rises."/></div></div>
  </div>
}
function ChartCard({title,data}){return <div className="card p-5"><h2 className="font-bold">{title}</h2><p className="text-xs text-slate-400">Views and engagement by campaign</p><div className="mt-4 h-64"><ResponsiveContainer><BarChart data={data}><CartesianGrid vertical={false} stroke="#e2e8f0"/><XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10}/><YAxis axisLine={false} tickLine={false}/><Tooltip/><Bar dataKey="views" fill="#6366f1" radius={[6,6,0,0]}/><Bar dataKey="engagement" fill="#a5b4fc" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div></div>}
function InsightRow({text}){return <div className="flex gap-3 rounded-2xl bg-slate-50 p-4"><div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-100 text-indigo-600"><Sparkles size={15}/></div><p className="text-sm leading-5 text-slate-600">{text}</p></div>}
function EyeIcon({size=19}){return <span style={{fontSize:size-2}}>◉</span>}

function Notifications({toast}) {
  const [items,setItems]=useState(notifications);
  return <div className="fade-in"><SectionHeader title="Smart Notifications" subtitle="Actionable alerts from your market, pricing and campaign signals." action={<button onClick={()=>setItems([])} className="btn-secondary">Mark all read</button>}/>
    <div className="max-w-3xl space-y-3">{items.map((n,i)=><div className="card flex gap-4 p-5" key={n.type}><div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${n.color==="amber"?"bg-amber-50 text-amber-600":n.color==="emerald"?"bg-emerald-50 text-emerald-600":"bg-indigo-50 text-indigo-600"}`}>{n.color==="amber"?<CircleDollarSign size={19}/>:n.color==="emerald"?<CalendarDays size={19}/>:<CloudRain size={19}/>}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-bold">{n.type}</h3><span className="text-xs text-slate-400">{n.time}</span></div><p className="mt-1 text-sm leading-6 text-slate-500">{n.text}</p><div className="mt-3 flex gap-2"><button onClick={()=>toast("Recommendation opened")} className="btn-ghost px-0 text-indigo-600">View recommendation</button><button onClick={()=>setItems(items.filter((_,x)=>x!==i))} className="btn-ghost px-0 text-slate-400">Delete</button></div></div></div>)}{!items.length&&<EmptyState title="You're all caught up" text="No unread notifications right now."/>}</div>
  </div>
}

function SettingsPage({toast}) {
  return <div className="fade-in max-w-4xl"><SectionHeader title="Settings" subtitle="Manage your business profile, notifications and AI preferences."/>
    <div className="space-y-5"><SettingsCard title="Business Information" icon={ShoppingBag}><div className="grid gap-4 sm:grid-cols-2"><Field label="Business Name"><input className="input" defaultValue="Srinivasan Local Store"/></Field><Field label="Location"><input className="input" defaultValue="Dharmapuri, Tamil Nadu"/></Field><Field label="Business Category"><select className="input"><option>General Retail</option><option>Apparel</option><option>Accessories</option></select></Field><Field label="Primary Language"><select className="input"><option>English + Tamil</option><option>English</option><option>Tamil</option></select></Field></div></SettingsCard>
      <SettingsCard title="Notification Preferences" icon={Bell}><Toggle text="Weather & demand opportunities" checked/><Toggle text="Competitor price alerts" checked/><Toggle text="Campaign reminders" checked/><Toggle text="Weekly AI performance summary" checked={false}/></SettingsCard>
      <SettingsCard title="AI Recommendation Preferences" icon={Bot}><Toggle text="Price recommendations" checked/><Toggle text="Marketing suggestions" checked/><Toggle text="Local-language content" checked/><Toggle text="Automatic campaign suggestions" checked={false}/></SettingsCard>
      <div className="flex justify-end"><button onClick={()=>toast("Settings saved successfully")} className="btn-primary"><Check size={16}/> Save Changes</button></div>
    </div>
  </div>
}
function SettingsCard({title,icon:Icon,children}){return <div className="card p-5"><div className="mb-5 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Icon size={18}/></div><h2 className="font-bold">{title}</h2></div>{children}</div>}
function Toggle({text,checked}){const [on,setOn]=useState(checked);return <button onClick={()=>setOn(!on)} className="flex w-full items-center justify-between border-b border-slate-100 py-3 text-left last:border-0"><span className="text-sm text-slate-600">{text}</span><span className={`relative h-6 w-11 rounded-full transition ${on?"bg-indigo-600":"bg-slate-200"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${on?"left-6":"left-1"}`}/></span></button>}

function EmptyState({title,text}){return <div className="card p-10 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-400"><Package size={24}/></div><h3 className="mt-4 font-bold">{title}</h3><p className="mt-1 text-sm text-slate-400">{text}</p></div>}

/* -------------------------------------------------------------------------- */
/* APP                                                                         */
/* -------------------------------------------------------------------------- */
export function App() {
  const [page,setPage]=useState("dashboard"), [collapsed,setCollapsed]=useState(false), [mobileOpen,setMobileOpen]=useState(false), [analyzing,setAnalyzing]=useState(false), [toast,setToast]=useState(""), [search,setSearch]=useState("");
  const go=(p)=>{setPage(p);window.scrollTo({top:0,behavior:"smooth"})};
  const notify=(m)=>{setToast(m);setTimeout(()=>setToast(""),2600)};
  const content=useMemo(()=>{
    if(analyzing) return <LoadingAI onDone={()=>{setAnalyzing(false);go("intelligence")}}/>;
    switch(page){
      case "products": return <Products go={go} toast={notify} search={search}/>;
      case "analyze": return <AnalyzeProduct setAnalyzing={setAnalyzing} go={go}/>;
      case "intelligence": return <Intelligence go={go}/>;
      case "recommendations": return <Recommendations go={go} toast={notify}/>;
      case "demand": return <Demand go={go}/>;
      case "marketing": return <Marketing toast={notify}/>;
      case "campaigns": return <Campaigns toast={notify}/>;
      case "analytics": return <Analytics/>;
      case "notifications": return <Notifications toast={notify}/>;
      case "settings": return <SettingsPage toast={notify}/>;
      default: return <Dashboard go={go} toast={notify}/>;
    }
  },[page,analyzing,search]);
  return <div className="min-h-screen bg-slate-50">
    {mobileOpen&&<div onClick={()=>setMobileOpen(false)} className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"/>}
    <Sidebar page={page} setPage={go} collapsed={collapsed} setCollapsed={setCollapsed} mobile={mobileOpen} closeMobile={()=>setMobileOpen(false)}/>
    <div className={`min-h-screen transition-all duration-300 ${collapsed?"lg:pl-[76px]":"lg:pl-64"}`}>
      <Topbar setMobileOpen={setMobileOpen} onSearch={setSearch}/>
      <main className="mx-auto max-w-[1500px] p-4 md:p-6 lg:p-8">{content}</main>
    </div>
    <Toast message={toast} onClose={()=>setToast("")}/>
  </div>
}