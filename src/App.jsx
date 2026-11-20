import { useMemo, useState } from "react";
import {
  Volume2, VolumeX, MapPin, Navigation, Share2, Phone, CalendarHeart,
  Flower2, Send, Link as LinkIcon, Check, Sparkles,
} from "lucide-react";
import Ganpati from "./components/Ganpati.jsx";
import { createMusic } from "./audio.js";
import { useReveal, useCountdown } from "./hooks.js";
import {
  WEDDING_DATE, CONTACTS, RSVP_WHATSAPP, VENUE_NAME, VENUE_ADDRESS,
  MAP_VIEW_URL, MAP_NAV_URL, MAP_EMBED_URL, EVENTS, FAMILY_LEFT, FAMILY_RIGHT,
  FAMILY_ALL, BLESSING_POEM, buildShareMessage, toMarathi,
} from "./data.js";

const music = createMusic();

/* ---------- small pieces ---------- */

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <span /><Flower2 size={18} /><span />
    </div>
  );
}

function Corner({ pos }) {
  return (
    <svg className={`corner ${pos}`} viewBox="0 0 80 80" aria-hidden="true">
      <path d="M2 2 H46 M2 2 V46" stroke="#c9962f" strokeWidth="2" fill="none" />
      <path d="M10 10 C30 12 34 30 22 38 C12 32 8 22 10 10Z" fill="#c9962f" opacity=".85" />
      <path d="M10 10 C12 30 30 34 38 22 C32 12 22 8 10 10Z" fill="#6e1423" opacity=".8" />
      <circle cx="14" cy="14" r="4" fill="#fbf4e4" />
    </svg>
  );
}

function Frame({ children, className = "" }) {
  return (
    <section className={`frame ${className}`}>
      <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
      {children}
    </section>
  );
}

function Ambient() {
  const petals = useMemo(
    () => Array.from({ length: 14 }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 12,
      dur: 11 + Math.random() * 9,
      size: 10 + Math.random() * 12,
      hue: i % 3,
    })), []);
  const dust = useMemo(
    () => Array.from({ length: 18 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6,
      dur: 3 + Math.random() * 4,
    })), []);
  return (
    <div className="ambient" aria-hidden="true">
      {petals.map((p, i) => (
        <i key={i} className={`petal h${p.hue}`}
          style={{ left: `${p.left}%`, width: p.size, height: p.size * 1.3, animationDelay: `-${p.delay}s`, animationDuration: `${p.dur}s` }} />
      ))}
      {dust.map((d, i) => (
        <b key={i} className="dust" style={{ left: `${d.left}%`, top: `${d.top}%`, animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s` }} />
      ))}
    </div>
  );
}

/* ---------- opening screen ---------- */

function Opening({ phase, onOpen }) {
  return (
    <div className={`opening ${phase}`}>
      <Ambient />
      <div className="open-inner">
        <p className="shree">|| श्री गणेशाय नमः ||</p>
        <Ganpati size={170} />
        <div className="envelope" aria-hidden="true">
          <div className="env-back" />
          <div className="env-card">
            <span className="mini">शुभविवाह</span>
            <span className="mini-names">स्वप्निल &amp; रितिक्षा</span>
          </div>
          <div className="env-front" />
          <div className="env-flap" />
          <div className="env-seal"><Flower2 size={18} /></div>
        </div>
        <button className="btn gold big" onClick={onOpen} disabled={phase !== "closed"}>
          <Sparkles size={18} /> Open Wedding Invitation
        </button>
        <p className="hint">निमंत्रण उघडा</p>
      </div>
    </div>
  );
}

/* ---------- sections ---------- */

function Hero() {
  return (
    <Frame className="hero">
      <p className="shree sm">|| श्री गणेशाय नमः ||</p>
      <Ganpati size={120} />
      <p className="mantra">
        हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे ।<br />
        हरे राम हरे राम राम राम हरे हरे ॥
      </p>
      <p className="shree sm">|| श्री गजानन प्रसन्न ||</p>
      <Divider />
      <h1 className="names">
        <span className="name n1">स्वप्निल</span>
        <span className="amp">आणि</span>
        <span className="name n2">रितिक्षा</span>
      </h1>
      <p className="tag">यांचा शुभविवाह</p>
      <p className="date-line">२८ डिसेंबर २०२६ • सोमवार</p>
      <div className="scroll-cue" aria-hidden="true" />
    </Frame>
  );
}

function Invitation() {
  return (
    <Frame>
      <Reveal>
        <p className="greet">सप्रेम नमस्कार वि. वि.</p>
        <p className="body">आमचे येथे श्री कृपेकृष्ण आमचा ज्येष्ठ सुपुत्र</p>
      </Reveal>
      <Reveal delay={100}>
        <div className="person">
          <h2>चि. स्वप्निल</h2>
          <p className="lineage">
            (कै. श्री. पांडुरंग गणपत माळी,<br />
            श्रीमती प्रभावती पां. माळी यांचा नातू,<br />
            मु. थळपेट, ता. अलिबाग)
          </p>
        </div>
        <div className="and"><span>AND</span></div>
        <div className="person">
          <h2>चि. सौ. कां. रितिक्षा</h2>
          <p className="lineage">
            (श्री. रमेश महादेव म्हात्रे,<br />
            सौ. संगीता रमेश म्हात्रे यांची कन्या,<br />
            मु. आवास, ता. अलिबाग)
          </p>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <p className="tag">यांचा शुभविवाह</p>
        <p className="body">
          मिती मार्गशीर्ष कृष्ण पंचमी शके १९४८, सोमवार दि. २८ डिसेंबर २०२६ रोजी सायंकाळी ०४ वा. १५ मि. या शुभमुहूर्तावर करण्याचे योजिले आहे.
        </p>
        <p className="body">
          कार्य सिद्धीस नेण्यास श्री समर्थ आहेत. तरी या मंगलसमयी आपण सहकुटुंब, सहपरिवार, मित्रमंडळीसह अगत्य उपस्थित राहून वधू-वरांस शुभाशीर्वाद द्यावेत, ही नम्र विनंती.
        </p>
      </Reveal>
    </Frame>
  );
}

function Countdown() {
  const t = useCountdown(WEDDING_DATE);
  const cells = [["दिवस", t.d], ["तास", t.h], ["मिनिटे", t.m], ["सेकंद", t.s]];
  return (
    <section className="block">
      <Reveal>
        <h3 className="sec-title">शुभमुहूर्ताची प्रतीक्षा</h3>
        <Divider />
        {t.done ? (
          <p className="body big-msg">शुभविवाह सोहळा संपन्न होत आहे 🙏</p>
        ) : (
          <div className="count">
            {cells.map(([label, v]) => (
              <div className="cell" key={label}>
                <strong>{toMarathi(String(v).padStart(2, "0"))}</strong>
                <small>{label}</small>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}

function Events() {
  return (
    <section className="block">
      <Reveal><h3 className="sec-title">कार्यक्रम</h3><Divider /></Reveal>
      {EVENTS.map((e, i) => (
        <Reveal key={e.id} delay={i * 120}>
          <article className={`event ${e.id}`}>
            <div className="ev-icon">{e.id === "haldi" ? <Flower2 /> : <CalendarHeart />}</div>
            <h4>{e.title}</h4>
            <p className="ev-day">{e.day}</p>
            <p className="ev-time">{e.time}</p>
            <div className="ev-place">
              <small>{e.placeLabel}</small>
              <p>{e.place.map((l, k) => <span key={k}>{l}<br /></span>)}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </section>
  );
}

function Venue() {
  return (
    <section className="block">
      <Reveal>
        <h3 className="sec-title">विवाह स्थळ</h3>
        <Divider />
        <p className="venue-name">{VENUE_NAME}</p>
        <p className="body">{VENUE_ADDRESS.map((l, i) => <span key={i}>{l}<br /></span>)}</p>
        <div className="map-wrap">
          <iframe title="विवाह स्थळ नकाशा" src={MAP_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <div className="btn-row">
          <a className="btn maroon" href={MAP_VIEW_URL} target="_blank" rel="noopener noreferrer"><MapPin size={18} /> Google Maps</a>
          <a className="btn gold" href={MAP_NAV_URL} target="_blank" rel="noopener noreferrer"><Navigation size={18} /> Navigate</a>
        </div>
      </Reveal>
    </section>
  );
}

function Family() {
  return (
    <Frame>
      <Reveal>
        <h3 className="sec-title">आपले स्नेहांकित</h3>
        <Divider />
        <p className="host">श्री. अनिल पांडुरंग माळी<br />सौ. अनया अनिल माळी</p>
      </Reveal>
      <Reveal delay={120}>
        <p className="sub">सर्व कुटुंबीय</p>
        <div className="family">
          <ul>{FAMILY_LEFT.map((n) => <li key={n}>{n}</li>)}</ul>
          <ul>{FAMILY_RIGHT.map((n) => <li key={n}>{n}</li>)}</ul>
        </div>
        <p className="all">{FAMILY_ALL}</p>
      </Reveal>
    </Frame>
  );
}

function Blessings() {
  return (
    <section className="block blessing">
      <Reveal>
        <h3 className="sec-title">शुभाशीर्वाद</h3>
        <Divider />
        <p className="poem">
          {BLESSING_POEM.map((l, i) => <span key={i} style={{ animationDelay: `${i * 0.35}s` }}>{l}<br /></span>)}
        </p>
        <p className="body">आपल्या आशीर्वादाने आमच्या नवदाम्पत्याचा संसार सुखाचा होवो, ही श्री चरणी प्रार्थना. 🙏</p>
      </Reveal>
    </section>
  );
}

function Share() {
  const [copied, setCopied] = useState(false);
  // Clean public link (no #hash or ?query) so the WhatsApp preview card appears.
  const url = typeof window !== "undefined" ? window.location.origin + window.location.pathname : "";
  const message = buildShareMessage(url);
  const wa = `https://wa.me/?text=${encodeURIComponent(message)}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("लिंक कॉपी करा:", url);
    }
  };
  const nativeShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "स्वप्निल ❤️ रितिक्षा | शुभविवाह निमंत्रण", text: message }); } catch { /* cancelled */ }
    } else copy();
  };
  return (
    <section className="block">
      <Reveal>
        <h3 className="sec-title">निमंत्रण शेअर करा</h3>
        <Divider />
        <p className="body">आपल्या नातेवाईक व मित्रमंडळींना हे निमंत्रण पाठवा.</p>
        <div className="btn-row">
          <a className="btn green wa-main" href={wa} target="_blank" rel="noopener noreferrer">💌 WhatsApp वर निमंत्रण पाठवा</a>
          <button className="btn gold" onClick={nativeShare}><Share2 size={18} /> इतर अॅप्स</button>
          <button className="btn maroon" onClick={copy}>{copied ? <Check size={18} /> : <LinkIcon size={18} />} {copied ? "Copied" : "Copy link"}</button>
        </div>
      </Reveal>
    </section>
  );
}

function Rsvp() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [coming, setComing] = useState("yes");
  const submit = (e) => {
    e.preventDefault();
    const msg =
      `नमस्कार! मी ${name || "—"} ` +
      (coming === "yes" ? `शुभविवाहास उपस्थित राहणार आहे. एकूण व्यक्ती: ${guests}.` : "दुर्दैवाने उपस्थित राहू शकणार नाही. आपणास शुभेच्छा!") +
      " 🙏";
    const base = RSVP_WHATSAPP ? `https://wa.me/${RSVP_WHATSAPP}` : "https://wa.me/";
    window.open(`${base}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };
  const hasPhones = CONTACTS.some((c) => c.phone);
  return (
    <section className="block">
      <Reveal>
        <h3 className="sec-title">उपस्थिती कळवा (ऐच्छिक)</h3>
        <Divider />
        <form className="rsvp" onSubmit={submit}>
          <input type="text" placeholder="आपले नाव" value={name} onChange={(e) => setName(e.target.value)} required />
          <select value={coming} onChange={(e) => setComing(e.target.value)} aria-label="उपस्थिती">
            <option value="yes">होय, उपस्थित राहीन</option>
            <option value="no">क्षमस्व, येऊ शकणार नाही</option>
          </select>
          {coming === "yes" && (
            <select value={guests} onChange={(e) => setGuests(e.target.value)} aria-label="व्यक्तींची संख्या">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{toMarathi(n)} व्यक्ती</option>)}
            </select>
          )}
          <button className="btn green" type="submit"><Send size={18} /> WhatsApp वर कळवा</button>
        </form>
        <div className="contacts">
          {CONTACTS.map((c, i) => (
            <div className="contact" key={i}>
              <div><strong>{c.name}</strong><small>{c.role}</small></div>
              {c.phone ? (
                <a className="btn gold sm" href={`tel:+${c.phone}`}><Phone size={16} /> Call</a>
              ) : (
                <span className="soon">लवकरच</span>
              )}
            </div>
          ))}
          {!hasPhones && <p className="note">संपर्क क्रमांक लवकरच उपलब्ध होतील.</p>}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- app ---------- */

export default function App() {
  const [phase, setPhase] = useState("closed"); // closed → opening → done
  const [muted, setMuted] = useState(false);

  const open = () => {
    music.start();
    setPhase("opening");
    setTimeout(() => setPhase("done"), 1900);
  };
  const toggleMute = () => setMuted(music.toggle());

  return (
    <>
      {phase !== "done" && <Opening phase={phase} onOpen={open} />}
      {phase !== "closed" && (
        <button className="mute" onClick={toggleMute} aria-label={muted ? "संगीत सुरू करा" : "संगीत बंद करा"}>
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}
      <main className={`page ${phase === "done" ? "visible" : ""}`}>
        <Ambient />
        <div className="wrap">
          <Hero />
          <Invitation />
          <Countdown />
          <Events />
          <Venue />
          <Family />
          <Blessings />
          <Share />
          <Rsvp />
          <footer>|| श्री गणेशाय नमः ||<br /><small>स्वप्निल &amp; रितिक्षा • २८ डिसेंबर २०२६</small></footer>
        </div>
      </main>
    </>
  );
}
