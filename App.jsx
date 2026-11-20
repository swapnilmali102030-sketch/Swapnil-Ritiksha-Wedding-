import { Component, useMemo, useState } from "react";
import {
  Volume2, VolumeX, MapPin, Navigation, Share2, Link as LinkIcon, Check, Send, Clock, CalendarDays,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Crest, Sprig, Marigold, HaldiArt, MandapArt } from "./components/Art.jsx";
import { createMusic } from "./audio.js";
import { useReveal, useCountdown } from "./hooks.js";
import { WEDDING_DATE, RSVP_WHATSAPP, EVENTS, GALLERY, buildShareMessage } from "./data.js";

const music = createMusic();

/* ---------- small pieces ---------- */

class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, color: "#fbf7ef", background: "#5e1224", minHeight: "100vh" }}>
          <h2>Swapnil &amp; Ritiksha</h2>
          <p>Something went wrong while loading the invitation. Please refresh the page.</p>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, opacity: 0.7 }}>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span /><i /><span />
    </div>
  );
}

function Ambient({ petals = 10, dust = 14 }) {
  const p = useMemo(
    () => Array.from({ length: petals }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 14,
      dur: 12 + Math.random() * 9,
      size: 9 + Math.random() * 11,
      tone: i % 3,
    })),
    [petals]
  );
  const d = useMemo(
    () => Array.from({ length: dust }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6,
      dur: 3 + Math.random() * 4,
    })),
    [dust]
  );
  return (
    <div className="ambient" aria-hidden="true">
      {p.map((x, i) => (
        <i key={i} className={`petal t${x.tone}`}
          style={{ left: `${x.left}%`, width: x.size, height: x.size * 1.3, animationDelay: `-${x.delay}s`, animationDuration: `${x.dur}s` }} />
      ))}
      {d.map((x, i) => (
        <b key={i} className="dust" style={{ left: `${x.left}%`, top: `${x.top}%`, animationDelay: `${x.delay}s`, animationDuration: `${x.dur}s` }} />
      ))}
    </div>
  );
}

/* ---------- opening screen ---------- */

function Opening({ phase, onOpen }) {
  return (
    <div className={`opening is-${phase}`}>
      <Ambient petals={9} dust={14} />
      <Sprig className="sp-tl" />
      <Sprig className="sp-br" />
      <div className="open-inner">
        <p className="eyebrow">Together with our families</p>
        <h2 className="open-title">We Are Getting Married!</h2>
        <p className="open-names">SWAPNIL <i>&amp;</i> RITIKSHA</p>

        <div className="envelope" aria-hidden="true">
          <div className="env-back" />
          <div className="env-card">
            <span className="card-small">The Wedding of</span>
            <span className="card-names">Swapnil &amp; Ritiksha</span>
            <span className="card-small">28 · 12 · 2026</span>
          </div>
          <div className="env-front" />
          <div className="env-flap" />
          <div className="env-seal"><span>S&amp;R</span></div>
        </div>

        <button className="btn gold big" onClick={onOpen} disabled={phase !== "closed"}>
          OPEN INVITATION
        </button>
      </div>
    </div>
  );
}

/* ---------- sections ---------- */

function Hero() {
  return (
    <header className="hero">
      <Sprig className="sp-tl" />
      <Sprig className="sp-tr" />
      <p className="eyebrow dark">Together with our families</p>
      <Crest size={150} />
      <h1 className="names">
        <span className="name n1">Swapnil</span>
        <span className="amp">&amp;</span>
        <span className="name n2">Ritiksha</span>
      </h1>
      <p className="hero-date">Monday · 28 December 2026</p>
      <p className="hero-quote">Two hearts, one beautiful journey, and a lifetime of togetherness.</p>
      <div className="scroll-cue" aria-hidden="true" />
    </header>
  );
}

function Welcome() {
  return (
    <section className="section narrow">
      <Reveal>
        <Ornament />
        <p className="lead">
          With the blessings of our families, we joyfully invite you to celebrate the beginning of our forever.
        </p>
        <p className="soft">Your presence and blessings will make our special day even more memorable.</p>
      </Reveal>
    </section>
  );
}

function Countdown() {
  const t = useCountdown(WEDDING_DATE);
  const cells = [["Days", t.d], ["Hours", t.h], ["Minutes", t.m], ["Seconds", t.s]];
  return (
    <section className="section">
      <Reveal>
        <h3 className="sec-title">Counting Down to Forever</h3>
        {t.done ? (
          <p className="lead">The celebration has begun. Thank you for your blessings!</p>
        ) : (
          <div className="count" role="timer" aria-live="off">
            {cells.map(([label, v]) => (
              <div className="cell" key={label}>
                <strong>{String(v).padStart(2, "0")}</strong>
                <small>{label}</small>
              </div>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}

function EventCard({ e, index }) {
  const isHaldi = e.id === "haldi";
  return (
    <Reveal delay={index * 120}>
      <article className={`event ${e.id}`}>
        <div className="art-wrap">
          {isHaldi ? <HaldiArt /> : <MandapArt />}
        </div>
        <p className="ev-kicker">{e.kicker}</p>
        <h4>{e.title}</h4>
        <p className="ev-row"><CalendarDays size={17} /> {e.date}</p>
        <p className="ev-row"><Clock size={17} /> {e.time}</p>
        <address className="ev-venue">
          <MapPin size={17} className="pin" />
          <span>
            <strong>{e.venue[0]}</strong>
            {e.venue.slice(1).map((l) => <span key={l} className="ln">{l}</span>)}
          </span>
        </address>
        <div className="btn-row">
          <a className="btn gold" href={e.maps.nav} target="_blank" rel="noopener noreferrer">
            <Navigation size={17} /> Get Directions
          </a>
          <a className="btn ghost" href={e.maps.view} target="_blank" rel="noopener noreferrer">
            <MapPin size={17} /> View on Map
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function Events() {
  return (
    <section className="section">
      <Reveal>
        <h3 className="sec-title">The Celebrations</h3>
        <Ornament />
      </Reveal>
      <div className="events">
        {EVENTS.map((e, i) => <EventCard key={e.id} e={e} index={i} />)}
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section className="section narrow">
      <Reveal>
        <h3 className="sec-title">Event Schedule</h3>
        <Ornament />
        <ol className="timeline">
          {EVENTS.map((e) => (
            <li key={e.id}>
              <span className="dot" aria-hidden="true"><Marigold size={22} tone={e.id === "haldi" ? "#f5a91f" : "#e9cf8e"} core={e.id === "haldi" ? "#e07b0a" : "#b98a2e"} /></span>
              <div>
                <p className="tl-when">{e.day}, {e.date}</p>
                <p className="tl-title">{e.title}</p>
                <p className="tl-meta">{e.time} · {e.venue[0].replace(/,$/, "")}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section">
      <Reveal>
        <h3 className="sec-title">Our Moments</h3>
        <Ornament />
      </Reveal>
      <div className="gallery">
        {GALLERY.map((g, i) => (
          <Reveal key={i} delay={(i % 3) * 90} className={`g-item g${i % 3}`}>
            {g.src ? (
              <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
            ) : (
              <div className="ph" role="img" aria-label="Photo placeholder">
                <Marigold size={34} tone="#efd9a0" core="#d9b565" />
                <span>Photo coming soon</span>
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ShareAndQr() {
  const [copied, setCopied] = useState(false);
  // Clean public link (no #hash or ?query) so WhatsApp can show the preview card.
  const url = typeof window !== "undefined" ? window.location.origin + window.location.pathname : "";
  const message = buildShareMessage(url);
  const wa = `https://wa.me/?text=${encodeURIComponent(message)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };
  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Swapnil & Ritiksha | Wedding Invitation", text: message });
      } catch {
        /* cancelled */
      }
    } else {
      copy();
    }
  };

  return (
    <section className="section narrow share">
      <Reveal>
        <h3 className="sec-title">Share Our Joy</h3>
        <Ornament />
        <p className="soft">Know someone who would love to celebrate with us? Send them this invitation.</p>
        <div className="btn-stack">
          <a className="btn wa" href={wa} target="_blank" rel="noopener noreferrer">💌 Share on WhatsApp</a>
          <div className="btn-row">
            <button className="btn ghost" onClick={nativeShare}><Share2 size={17} /> More Apps</button>
            <button className="btn ghost" onClick={copy}>
              {copied ? <Check size={17} /> : <LinkIcon size={17} />} {copied ? "Link Copied" : "Copy Link"}
            </button>
          </div>
        </div>
        <div className="qr">
          <div className="qr-box">
            <QRCodeSVG value={url || "https://example.com"} size={160} fgColor="#5e1224" bgColor="#fbf7ef" level="M" />
          </div>
          <p>Scan to open this invitation</p>
        </div>
      </Reveal>
    </section>
  );
}

function Rsvp() {
  const [name, setName] = useState("");
  const [coming, setComing] = useState("yes");
  const [guests, setGuests] = useState("1");
  const submit = (e) => {
    e.preventDefault();
    const who = name.trim() || "A guest";
    const msg =
      coming === "yes"
        ? `Hello! This is ${who}. We would be delighted to attend the wedding of Swapnil & Ritiksha. Number of guests: ${guests}. ❤️`
        : `Hello! This is ${who}. Unfortunately we will not be able to attend, but we send our warmest wishes to Swapnil & Ritiksha. ❤️`;
    const base = RSVP_WHATSAPP ? `https://wa.me/${RSVP_WHATSAPP}` : "https://wa.me/";
    window.open(`${base}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };
  return (
    <section className="section narrow">
      <Reveal>
        <h3 className="sec-title">Will You Join Us?</h3>
        <Ornament />
        <form className="rsvp" onSubmit={submit}>
          <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required aria-label="Your name" />
          <select value={coming} onChange={(e) => setComing(e.target.value)} aria-label="Attendance">
            <option value="yes">Yes, we will be there</option>
            <option value="no">Sorry, we cannot make it</option>
          </select>
          {coming === "yes" && (
            <select value={guests} onChange={(e) => setGuests(e.target.value)} aria-label="Number of guests">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
            </select>
          )}
          <button className="btn gold" type="submit"><Send size={17} /> Reply on WhatsApp</button>
        </form>
      </Reveal>
    </section>
  );
}

function Closing() {
  return (
    <section className="closing">
      <Reveal>
        <Crest size={90} animate={false} />
        <p className="closing-text">
          Thank you for being part of our story. Your love and blessings mean the world to us.
        </p>
        <p className="closing-sign">With love,<br /><span>Swapnil &amp; Ritiksha</span></p>
      </Reveal>
    </section>
  );
}

/* ---------- app ---------- */

export default function App() {
  const [phase, setPhase] = useState("closed"); // closed → opening → done
  const [muted, setMuted] = useState(false);

  const open = () => {
    music.start(); // runs inside the tap, so browsers allow audio
    setPhase("opening");
    setTimeout(() => setPhase("done"), 1900);
  };
  const toggleMute = () => setMuted(music.toggle());

  return (
    <ErrorBoundary>
      {phase !== "done" && <Opening phase={phase} onOpen={open} />}
      {phase !== "closed" && (
        <button className="mute" onClick={toggleMute} aria-label={muted ? "Turn music on" : "Turn music off"}>
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}
      <main className={`page ${phase !== "closed" ? "visible" : ""}`}>
        <Ambient petals={8} dust={10} />
        <div className="wrap">
          <Hero />
          <Welcome />
          <Countdown />
          <Events />
          <Schedule />
          <Gallery />
          <ShareAndQr />
          <Rsvp />
          <Closing />
          <footer>Swapnil &amp; Ritiksha · 28 December 2026</footer>
        </div>
      </main>
    </ErrorBoundary>
  );
}
