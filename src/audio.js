// Soft synthesized "tanpura + bansuri-like" background music using the Web Audio API.
// No audio file, no network, no licensing issues. Raag Bhoopali (Sa Re Ga Pa Dha).
// To use your own MP3 instead, see README ("Using your own music").

export function createMusic() {
  let ctx = null;
  let master = null;
  let timer = null;
  let muted = false;
  let started = false;
  let step = 3;

  const BASE = 146.83; // D3
  const SCALE = [0, 2, 4, 7, 9, 12, 14, 16, 19]; // Bhoopali semitones
  const freq = (semi) => BASE * Math.pow(2, semi / 12);

  function note(f, t, dur, type, vol, dest) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.12);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(dest);
    o.start(t);
    o.stop(t + dur + 0.1);
  }

  function build() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.0001;

    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1800;

    // simple echo for warmth
    const delay = ctx.createDelay(1.0);
    delay.delayTime.value = 0.42;
    const fb = ctx.createGain();
    fb.gain.value = 0.38;
    const wet = ctx.createGain();
    wet.gain.value = 0.45;
    delay.connect(fb);
    fb.connect(delay);

    const bus = ctx.createGain();
    bus.connect(lp);
    bus.connect(delay);
    delay.connect(wet);
    wet.connect(lp);
    lp.connect(master);
    master.connect(ctx.destination);

    // continuous drone: Sa (low) + Pa
    [[BASE / 2, 0.07], [(BASE / 2) * 1.4983, 0.045], [BASE, 0.03]].forEach(([f, v]) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.value = f;
      g.gain.value = v;
      const lfo = ctx.createOscillator();
      const lg = ctx.createGain();
      lfo.frequency.value = 0.15 + Math.random() * 0.1;
      lg.gain.value = v * 0.35;
      lfo.connect(lg);
      lg.connect(g.gain);
      o.connect(g);
      g.connect(bus);
      o.start();
      lfo.start();
    });

    bus.melody = bus;
    ctx._bus = bus;
    return true;
  }

  function playMelody() {
    if (!ctx) return;
    const t = ctx.currentTime + 0.05;
    if (Math.random() > 0.18) {
      step += Math.random() < 0.5 ? -1 : 1;
      if (Math.random() < 0.15) step += Math.random() < 0.5 ? -2 : 2;
      step = Math.max(1, Math.min(SCALE.length - 1, step));
      const dur = 1.4 + Math.random() * 1.2;
      note(freq(SCALE[step] + 12), t, dur, "sine", 0.1, ctx._bus);
      note(freq(SCALE[step] + 24), t, dur * 0.8, "sine", 0.018, ctx._bus);
    }
    timer = setTimeout(playMelody, 700 + Math.random() * 900);
  }

  function setLevel(on) {
    if (!ctx) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(on ? 0.7 : 0.0001, ctx.currentTime, 0.4);
  }

  document.addEventListener("visibilitychange", () => {
    if (!ctx) return;
    if (document.hidden) ctx.suspend();
    else if (!muted) ctx.resume();
  });

  return {
    // Must be called from a user gesture (click/tap).
    start() {
      if (started) return;
      if (!build()) return;
      started = true;
      if (ctx.state === "suspended") ctx.resume();
      setLevel(!muted);
      playMelody();
    },
    toggle() {
      muted = !muted;
      if (!started) {
        muted = false;
        this.start();
        return false;
      }
      if (!muted && ctx.state === "suspended") ctx.resume();
      setLevel(!muted);
      return muted;
    },
    get muted() {
      return muted;
    },
  };
}
