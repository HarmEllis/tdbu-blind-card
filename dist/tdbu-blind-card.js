/*!
 * TDBU Blind Card — a Lovelace card for top-down/bottom-up blinds
 * https://github.com/HarmEllis/tdbu-blind-card
 *
 * Combines the two cover entities of a TDBU blind (top rail + bottom rail)
 * into one card: a live window illustration, two vertical sliders, a control
 * row and configurable quick actions.
 *
 * MIT licensed.
 */
const CARD_VERSION = "1.0.0";

/* ------------------------------------------------------------------ *
 * Translations
 * UI strings follow the Home Assistant user's language. Add a language
 * by copying the `en` block; missing keys fall back to English.
 * ------------------------------------------------------------------ */
const TRANSLATIONS = {
  en: {
    top: "Top",
    bottom: "Bottom",
    quick_actions: "Quick actions",
    moving: "moving…",
    unavailable: "unavailable",
    remembered: "Remembered position — this blind does not report its own position",
    details: "Details",
    close: "Close",
    stop: "Stop",
    open: "Open",
    favorite: "Favourite",
    entity_missing: "Configure both top_entity and bottom_entity",
    entity_not_found: "Entity not found",
    preset_open: "Open",
    preset_daylight: "Daylight",
    preset_privacy: "Privacy",
    preset_closed: "Closed",
    sub_all_open: "all open",
    sub_all_closed: "all closed",
    sub_top: "top {v}%",
    sub_bottom: "bottom {v}%",
    ed_name: "Name",
    ed_top_entity: "Top cover",
    ed_bottom_entity: "Bottom cover",
    ed_top_position_entity: "Top position memory",
    ed_bottom_position_entity: "Bottom position memory",
    ed_appearance: "Appearance",
    ed_appearance_auto: "Follow theme",
    ed_appearance_dark: "Dark",
    ed_display: "Percentage shows",
    ed_display_coverage: "% covered by the shade",
    ed_display_position: "% open (cover position)",
    ed_height: "Window height",
    ed_step: "Step size",
    ed_invert_top: "Invert top",
    ed_invert_bottom: "Invert bottom",
    ed_prevent_overlap: "Keep rails from crossing",
  },
  nl: {
    top: "Boven",
    bottom: "Onder",
    quick_actions: "Snelle acties",
    moving: "beweegt…",
    unavailable: "niet bereikbaar",
    remembered: "Onthouden stand — dit blind meldt zijn positie niet terug",
    details: "Details",
    close: "Sluiten",
    stop: "Stop",
    open: "Openen",
    favorite: "Favoriet",
    entity_missing: "Stel zowel top_entity als bottom_entity in",
    entity_not_found: "Entiteit niet gevonden",
    preset_open: "Open",
    preset_daylight: "Daglicht",
    preset_privacy: "Privacy",
    preset_closed: "Dicht",
    sub_all_open: "alles open",
    sub_all_closed: "alles dicht",
    sub_top: "boven {v}%",
    sub_bottom: "onder {v}%",
    ed_name: "Naam",
    ed_top_entity: "Cover bovenkant",
    ed_bottom_entity: "Cover onderkant",
    ed_top_position_entity: "Standgeheugen boven",
    ed_bottom_position_entity: "Standgeheugen onder",
    ed_appearance: "Uiterlijk",
    ed_appearance_auto: "Volg thema",
    ed_appearance_dark: "Donker",
    ed_display: "Percentage toont",
    ed_display_coverage: "% dicht (bedekking)",
    ed_display_position: "% open (coverpositie)",
    ed_height: "Hoogte raamvisual",
    ed_step: "Stapgrootte",
    ed_invert_top: "Boven omkeren",
    ed_invert_bottom: "Onder omkeren",
    ed_prevent_overlap: "Rails niet laten kruisen",
  },
  de: {
    top: "Oben",
    bottom: "Unten",
    quick_actions: "Schnellaktionen",
    moving: "bewegt sich…",
    unavailable: "nicht erreichbar",
    remembered: "Gemerkte Position — dieses Rollo meldet seine Position nicht zurück",
    details: "Details",
    close: "Schließen",
    stop: "Stopp",
    open: "Öffnen",
    favorite: "Favorit",
    entity_missing: "Bitte top_entity und bottom_entity angeben",
    entity_not_found: "Entität nicht gefunden",
    preset_open: "Offen",
    preset_daylight: "Tageslicht",
    preset_privacy: "Privatsphäre",
    preset_closed: "Geschlossen",
    sub_all_open: "ganz offen",
    sub_all_closed: "ganz zu",
    sub_top: "oben {v}%",
    sub_bottom: "unten {v}%",
    ed_name: "Name",
    ed_top_entity: "Cover oben",
    ed_bottom_entity: "Cover unten",
    ed_top_position_entity: "Positionsspeicher oben",
    ed_bottom_position_entity: "Positionsspeicher unten",
    ed_appearance: "Darstellung",
    ed_appearance_auto: "Theme folgen",
    ed_appearance_dark: "Dunkel",
    ed_display: "Prozentwert zeigt",
    ed_display_coverage: "% geschlossen",
    ed_display_position: "% offen (Cover-Position)",
    ed_height: "Höhe der Fensteransicht",
    ed_step: "Schrittweite",
    ed_invert_top: "Oben umkehren",
    ed_invert_bottom: "Unten umkehren",
    ed_prevent_overlap: "Schienen nicht kreuzen lassen",
  },
  fr: {
    top: "Haut",
    bottom: "Bas",
    quick_actions: "Actions rapides",
    moving: "en mouvement…",
    unavailable: "indisponible",
    remembered: "Position mémorisée — ce store ne renvoie pas sa position",
    details: "Détails",
    close: "Fermer",
    stop: "Arrêt",
    open: "Ouvrir",
    favorite: "Favori",
    entity_missing: "Renseignez top_entity et bottom_entity",
    entity_not_found: "Entité introuvable",
    preset_open: "Ouvert",
    preset_daylight: "Lumière du jour",
    preset_privacy: "Intimité",
    preset_closed: "Fermé",
    sub_all_open: "tout ouvert",
    sub_all_closed: "tout fermé",
    sub_top: "haut {v}%",
    sub_bottom: "bas {v}%",
    ed_name: "Nom",
    ed_top_entity: "Volet haut",
    ed_bottom_entity: "Volet bas",
    ed_top_position_entity: "Mémoire de position haut",
    ed_bottom_position_entity: "Mémoire de position bas",
    ed_appearance: "Apparence",
    ed_appearance_auto: "Suivre le thème",
    ed_appearance_dark: "Sombre",
    ed_display: "Le pourcentage indique",
    ed_display_coverage: "% couvert",
    ed_display_position: "% ouvert (position du volet)",
    ed_height: "Hauteur de la fenêtre",
    ed_step: "Pas",
    ed_invert_top: "Inverser le haut",
    ed_invert_bottom: "Inverser le bas",
    ed_prevent_overlap: "Empêcher le croisement des rails",
  },
};

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const resolveLanguage = (hass, override) => {
  const raw = override || (hass && (hass.locale?.language || hass.language)) || "en";
  const base = String(raw).toLowerCase().split("-")[0];
  return TRANSLATIONS[raw] ? raw : TRANSLATIONS[base] ? base : "en";
};

const translator = (lang) => (key, vars) => {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  let out = dict[key] !== undefined ? dict[key] : TRANSLATIONS.en[key];
  if (out === undefined) return key;
  if (vars) for (const [k, v] of Object.entries(vars)) out = out.replace(`{${k}}`, v);
  return out;
};

const defaultPresets = (t) => [
  { name: t("preset_open"), sub: t("sub_all_open"), top: 100, bottom: 100 },
  { name: t("preset_daylight"), sub: t("sub_top", { v: 20 }), top: 80, bottom: 100 },
  { name: t("preset_privacy"), sub: t("sub_bottom", { v: 60 }), top: 100, bottom: 40 },
  { name: t("preset_closed"), sub: t("sub_all_closed"), top: 0, bottom: 0 },
];

const STYLES = `
:host { display: block; }
ha-card {
  --tdbu-fg: var(--primary-text-color);
  --tdbu-dim: var(--secondary-text-color);
  --tdbu-chip: var(--secondary-background-color);
  --tdbu-chip-hover: var(--divider-color);
  --tdbu-accent: var(--primary-color);
  --tdbu-track: var(--divider-color);
  --tdbu-thumb: var(--tdbu-fg);
  --tdbu-fabric: #d9cbb4;
  --tdbu-fabric-line: rgba(0,0,0,.10);
  --tdbu-rail: #b8a888;
  --tdbu-frame: rgba(0,0,0,.18);
  --tdbu-sky: linear-gradient(180deg,#b9d7ef 0%,#e3eef7 55%,#c9d8c2 100%);
  overflow: hidden;
}
ha-card.dark {
  --tdbu-fg: #f2f2f5;
  --tdbu-dim: #9b9ba1;
  --tdbu-chip: #2c2c2e;
  --tdbu-chip-hover: #3a3a3c;
  --tdbu-track: #3a3a3c;
  --tdbu-thumb: #f2f2f5;
  --tdbu-fabric: #3c3c40;
  --tdbu-fabric-line: rgba(0,0,0,.35);
  --tdbu-rail: #55555a;
  --tdbu-frame: rgba(0,0,0,.5);
  --tdbu-sky: linear-gradient(180deg,#0e1a2b 0%,#16263c 55%,#0b1520 100%);
  background: #1c1c1e;
  color: #f2f2f5;
}
.wrap { padding: 16px; display: flex; flex-direction: column; gap: 14px; }

.head { display: flex; align-items: center; justify-content: center; position: relative; min-height: 24px; }
.head .title { font-size: 16px; font-weight: 600; color: var(--tdbu-fg); text-align: center; }
.head .sub { position: absolute; right: 0; font-size: 12px; color: var(--tdbu-dim); }

.stage { display: flex; gap: 14px; justify-content: center; align-items: stretch; }
.rails { width: 74px; flex: 0 0 74px; display: flex; flex-direction: column; gap: 10px; }
.rail { flex: 1 1 0; display: flex; flex-direction: column; min-height: 0; }
.rail .lbl { font-size: 12px; color: var(--tdbu-dim); line-height: 1.2; cursor: pointer; }
.rail .val { font-size: 17px; font-weight: 600; color: var(--tdbu-fg); line-height: 1.3; margin-bottom: 6px; }
.rail .val.off { color: var(--tdbu-dim); }
.rail .val.mem { text-decoration: underline dotted; text-underline-offset: 4px; text-decoration-color: var(--tdbu-dim); }
.track {
  position: relative; width: 22px; margin-left: 3px; flex: 1 1 auto; min-height: 40px;
  touch-action: none; cursor: pointer; outline: none;
}
.track:focus-visible .thumb { box-shadow: 0 0 0 3px color-mix(in srgb, var(--tdbu-accent) 55%, transparent); }
.track .bar { position: absolute; left: 8px; width: 6px; top: 0; bottom: 0; border-radius: 3px; background: var(--tdbu-track); }
.track .fill { position: absolute; left: 8px; width: 6px; border-radius: 3px; background: var(--tdbu-accent); opacity: .85; }
.track .thumb {
  position: absolute; left: 50%; width: 16px; height: 16px; border-radius: 50%;
  background: var(--tdbu-thumb); transform: translate(-50%,-50%);
  box-shadow: 0 1px 3px rgba(0,0,0,.35);
}
.track.smooth .fill, .track.smooth .thumb { transition: top .35s ease, height .35s ease; }
.rail.unknown .track { opacity: .55; }

.window {
  position: relative; height: 100%; aspect-ratio: 3 / 4; flex: 0 0 auto;
  border-radius: 6px; overflow: hidden;
  box-shadow: 0 0 0 6px var(--tdbu-frame), 0 6px 18px rgba(0,0,0,.22);
}
.scene { position: absolute; inset: 0; background: var(--tdbu-sky); background-size: cover; background-position: center; }
.shade {
  position: absolute; left: 0; right: 0; background-color: var(--tdbu-fabric);
  background-image: repeating-linear-gradient(180deg, var(--tdbu-fabric-line) 0 1px, rgba(255,255,255,.05) 1px 7px);
}
.shade.top { top: 0; }
.shade.bottom { bottom: 0; }
.shade.top::after, .shade.bottom::before {
  content: ""; position: absolute; left: 0; right: 0; height: 5px; background: var(--tdbu-rail);
}
.shade.top::after { bottom: 0; }
.shade.bottom::before { top: 0; }
.window.smooth .shade { transition: height .35s ease; }

.btns { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
.btns button {
  display: flex; align-items: center; justify-content: center;
  height: 46px; border: none; border-radius: 12px; cursor: pointer;
  background: var(--tdbu-chip); color: var(--tdbu-fg);
  --mdc-icon-size: 22px;
}
.btns button:hover { background: var(--tdbu-chip-hover); }
.btns button.accent { color: var(--tdbu-accent); }
.btns button:active { transform: scale(.96); }

.quick .quick-label { font-size: 12px; color: var(--tdbu-dim); margin-bottom: 6px; }
.chips { display: grid; grid-template-columns: repeat(auto-fit, minmax(70px, 1fr)); gap: 8px; }
.chips button {
  border: none; border-radius: 12px; cursor: pointer; padding: 8px 4px;
  background: var(--tdbu-chip); color: var(--tdbu-fg);
  display: flex; flex-direction: column; align-items: center; gap: 2px;
}
.chips button:hover { background: var(--tdbu-chip-hover); }
.chips button:active { transform: scale(.97); }
.chips .n { font-size: 13px; font-weight: 600; }
.chips .s { font-size: 11px; color: var(--tdbu-dim); }
`;

class TdbuBlindCard extends HTMLElement {
  static getConfigElement() { return document.createElement("tdbu-blind-card-editor"); }

  static getStubConfig(hass) {
    const covers = Object.keys(hass?.states || {}).filter((e) => e.startsWith("cover."));
    const top = covers.find((e) => /(^|_)(top|boven)/.test(e)) || covers[0] || "";
    const bottom = covers.find((e) => /(^|_)(bottom|onder)/.test(e)) || covers[1] || covers[0] || "";
    return { type: "custom:tdbu-blind-card", top_entity: top, bottom_entity: bottom };
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._local = {};
    this._drag = null;
    this._built = false;
  }

  setConfig(config) {
    if (!config || !config.top_entity || !config.bottom_entity) {
      throw new Error("tdbu-blind-card: top_entity and bottom_entity are required");
    }
    this._config = {
      height: 260,
      appearance: "auto",
      display: "position",
      step: 1,
      prevent_overlap: true,
      invert_top: false,
      invert_bottom: false,
      scene: "gradient",
      ...config,
    };
    this._teardown();
  }

  set hass(hass) {
    this._hass = hass;
    const lang = resolveLanguage(hass, this._config?.language);
    if (this._built && lang !== this._lang) this._teardown();
    if (!this._built) {
      this._lang = lang;
      this._t = translator(lang);
      this._build();
    }
    this._sync();
  }

  getCardSize() { return 8; }

  getGridOptions() { return { columns: 12, rows: "auto", min_columns: 6 }; }

  _teardown() {
    this._built = false;
    this.shadowRoot.innerHTML = "";
  }

  /* ---------------- state ---------------- */

  _entity(part) {
    return part === "top" ? this._config.top_entity : this._config.bottom_entity;
  }

  _state(part) {
    return this._hass ? this._hass.states[this._entity(part)] : undefined;
  }

  /** Optional entity (usually an input_number) holding the last known position. */
  _memoryEntity(part) {
    return part === "top" ? this._config.top_position_entity : this._config.bottom_position_entity;
  }

  _memory(part) {
    const id = this._memoryEntity(part);
    if (!id || !this._hass) return null;
    const st = this._hass.states[id];
    if (!st) return null;
    const v = Number(st.state);
    return Number.isFinite(v) ? clamp(v, 0, 100) : null;
  }

  /** { value, source } — source: local | live | memory | state | null */
  _resolve(part) {
    const loc = this._local[part];
    if (loc && Date.now() < loc.until) return { value: loc.value, source: "local" };
    const st = this._state(part);
    if (st && st.state !== "unavailable") {
      const p = st.attributes.current_position;
      if (typeof p === "number") return { value: p, source: "live" };
    }
    const mem = this._memory(part);
    if (mem !== null) return { value: mem, source: "memory" };
    if (st && st.state === "open") return { value: 100, source: "state" };
    if (st && st.state === "closed") return { value: 0, source: "state" };
    return { value: null, source: null };
  }

  _position(part) { return this._resolve(part).value; }

  /** Fraction 0..1 — distance from the top of the window down to this rail. */
  _railFrac(part) {
    const pos = this._position(part);
    if (pos === null) return part === "top" ? 0 : 1;
    return this._posToFrac(part, pos);
  }

  _posToFrac(part, pos) {
    const inv = part === "top" ? this._config.invert_top : this._config.invert_bottom;
    if (part === "top") return inv ? pos / 100 : (100 - pos) / 100;
    return inv ? (100 - pos) / 100 : pos / 100;
  }

  _fracToPos(part, frac) {
    const inv = part === "top" ? this._config.invert_top : this._config.invert_bottom;
    if (part === "top") return inv ? frac * 100 : 100 - frac * 100;
    return inv ? 100 - frac * 100 : frac * 100;
  }

  /* ---------------- DOM ---------------- */

  _presets() {
    return Array.isArray(this._config.presets) ? this._config.presets : defaultPresets(this._t);
  }

  _build() {
    const c = this._config;
    const t = this._t;
    const style = document.createElement("style");
    style.textContent = STYLES;

    const card = document.createElement("ha-card");
    if (c.appearance === "dark") card.classList.add("dark");

    const topLabel = c.top_label || t("top");
    const bottomLabel = c.bottom_label || t("bottom");
    const presets = this._presets();

    card.innerHTML = `
      <div class="wrap">
        <div class="head"><div class="title"></div><div class="sub"></div></div>
        <div class="stage" style="height:${Number(c.height) || 260}px">
          <div class="rails">
            <div class="rail" data-part="top">
              <div class="lbl">${esc(topLabel)}</div>
              <div class="val">—</div>
              <div class="track smooth" tabindex="0" role="slider" aria-label="${esc(topLabel)}"
                   aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                <div class="bar"></div><div class="fill"></div><div class="thumb"></div>
              </div>
            </div>
            <div class="rail" data-part="bottom">
              <div class="lbl">${esc(bottomLabel)}</div>
              <div class="val">—</div>
              <div class="track smooth" tabindex="0" role="slider" aria-label="${esc(bottomLabel)}"
                   aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
                <div class="bar"></div><div class="fill"></div><div class="thumb"></div>
              </div>
            </div>
          </div>
          <div class="window smooth">
            <div class="scene"></div>
            <div class="shade top"></div>
            <div class="shade bottom"></div>
          </div>
        </div>
        <div class="btns">
          <button data-act="info" title="${esc(t("details"))}"><ha-icon icon="mdi:tune-variant"></ha-icon></button>
          <button data-act="close" title="${esc(t("close"))}"><ha-icon icon="mdi:chevron-down"></ha-icon></button>
          <button data-act="stop" title="${esc(t("stop"))}"><ha-icon icon="mdi:stop"></ha-icon></button>
          <button data-act="open" title="${esc(t("open"))}"><ha-icon icon="mdi:chevron-up"></ha-icon></button>
          <button data-act="fav" class="accent" title="${esc(t("favorite"))}"><ha-icon icon="mdi:heart-outline"></ha-icon></button>
        </div>
        ${presets.length ? `<div class="quick">
          <div class="quick-label">${esc(c.presets_label || t("quick_actions"))}</div>
          <div class="chips">${presets.map((p, i) =>
            `<button data-preset="${i}"><span class="n">${esc(p.name)}</span>${p.sub ? `<span class="s">${esc(p.sub)}</span>` : ""}</button>`
          ).join("")}</div>
        </div>` : ""}
      </div>`;

    this.shadowRoot.append(style, card);
    this._card = card;
    this._el = {
      title: card.querySelector(".title"),
      sub: card.querySelector(".sub"),
      window: card.querySelector(".window"),
      shadeTop: card.querySelector(".shade.top"),
      shadeBottom: card.querySelector(".shade.bottom"),
      scene: card.querySelector(".scene"),
    };
    this._rails = {};
    card.querySelectorAll(".rail").forEach((r) => {
      const part = r.dataset.part;
      this._rails[part] = {
        root: r,
        val: r.querySelector(".val"),
        track: r.querySelector(".track"),
        fill: r.querySelector(".fill"),
        thumb: r.querySelector(".thumb"),
      };
      r.querySelector(".lbl").addEventListener("click", () => this._moreInfo(part));
      this._bindTrack(part, this._rails[part].track);
    });

    if (c.scene && c.scene !== "gradient" && c.scene !== "none") {
      this._el.scene.style.backgroundImage = `url("${c.scene}")`;
    } else if (c.scene === "none") {
      this._el.scene.style.background = "var(--card-background-color)";
    }

    card.querySelectorAll(".btns button").forEach((b) => {
      b.addEventListener("click", () => this._action(b.dataset.act));
    });
    card.querySelectorAll(".chips button").forEach((b) => {
      b.addEventListener("click", () => this._applyPreset(presets[Number(b.dataset.preset)]));
    });

    this._built = true;
  }

  /* ---------------- interaction ---------------- */

  _bindTrack(part, track) {
    const fracFromY = (y) => {
      const r = track.getBoundingClientRect();
      return this._limit(part, clamp((y - (r.top + 8)) / Math.max(1, r.height - 16), 0, 1));
    };
    const onMove = (ev) => {
      if (!this._drag) return;
      ev.preventDefault();
      this._drag.frac = fracFromY(ev.clientY);
      this._render();
    };
    const onUp = () => {
      if (!this._drag) return;
      const frac = this._drag.frac;
      this._drag = null;
      track.classList.add("smooth");
      this._el.window.classList.add("smooth");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      this._commit(part, this._snap(this._fracToPos(part, frac)));
    };
    track.addEventListener("pointerdown", (ev) => {
      ev.preventDefault();
      track.classList.remove("smooth");
      this._el.window.classList.remove("smooth");
      this._drag = { part, frac: fracFromY(ev.clientY) };
      this._render();
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    });
    track.addEventListener("keydown", (ev) => {
      const cur = this._position(part);
      const base = cur === null ? 100 : cur;
      let next = null;
      if (ev.key === "ArrowUp" || ev.key === "ArrowRight") next = base + 5;
      else if (ev.key === "ArrowDown" || ev.key === "ArrowLeft") next = base - 5;
      else if (ev.key === "Home") next = 100;
      else if (ev.key === "End") next = 0;
      if (next === null) return;
      ev.preventDefault();
      this._commit(part, this._snap(clamp(next, 0, 100)));
    });
  }

  /** Keeps the top rail from moving below the bottom rail and vice versa. */
  _limit(part, frac) {
    if (!this._config.prevent_overlap) return frac;
    const other = part === "top" ? this._railFrac("bottom") : this._railFrac("top");
    return part === "top" ? Math.min(frac, other) : Math.max(frac, other);
  }

  _snap(pos) {
    const step = Math.max(1, Number(this._config.step) || 1);
    return clamp(Math.round(pos / step) * step, 0, 100);
  }

  _commit(part, pos) {
    this._local[part] = { value: pos, until: Date.now() + 3000 };
    this._render();
    this._call("set_cover_position", this._entity(part), { position: pos });
    this._remember(part, pos);
  }

  /** Stores the commanded position in the optional memory entity. */
  _remember(part, pos) {
    const id = this._memoryEntity(part);
    if (!id || !this._hass || this._config.remember === false) return;
    const domain = id.split(".")[0];
    if (domain === "input_number") {
      this._hass.callService("input_number", "set_value", { entity_id: id, value: pos });
    } else if (domain === "number") {
      this._hass.callService("number", "set_value", { entity_id: id, value: pos });
    }
  }

  _call(service, entity, data = {}) {
    if (!this._hass) return;
    this._hass.callService("cover", service, { entity_id: entity, ...data });
  }

  _action(act) {
    if (act === "info") { this._moreInfo("top"); return; }
    if (act === "fav") {
      const list = this._presets();
      const fav = list.find((p) => p.name === this._config.favorite)
        || (typeof this._config.favorite === "number" ? list[this._config.favorite] : undefined)
        || list[1] || list[0];
      this._applyPreset(fav);
      return;
    }
    const target = this._config.buttons_target === "top" ? ["top"]
      : this._config.buttons_target === "bottom" ? ["bottom"] : ["top", "bottom"];
    const svc = act === "open" ? "open_cover" : act === "close" ? "close_cover" : "stop_cover";
    target.forEach((p) => this._call(svc, this._entity(p)));
    if (act === "stop") {
      // Stopped mid-travel: the real position is unknown, leave the memory alone.
      this._local = {};
      return;
    }
    const pos = act === "open" ? 100 : 0;
    target.forEach((p) => {
      this._local[p] = { value: pos, until: Date.now() + 3000 };
      this._remember(p, pos);
    });
    this._render();
  }

  _applyPreset(preset) {
    if (!preset) return;
    if (typeof preset.top === "number") this._commit("top", this._snap(preset.top));
    if (typeof preset.bottom === "number") this._commit("bottom", this._snap(preset.bottom));
  }

  _moreInfo(part) {
    const ev = new Event("hass-more-info", { bubbles: true, composed: true });
    ev.detail = { entityId: this._entity(part) };
    this.dispatchEvent(ev);
  }

  /* ---------------- rendering ---------------- */

  _sync() {
    if (!this._built || !this._hass) return;
    const c = this._config;
    const t = this._t;
    const top = this._state("top");
    const bottom = this._state("bottom");

    if (!top || !bottom) {
      this._el.title.textContent = t("entity_not_found");
      this._el.sub.textContent = "";
      return;
    }

    let name = c.name;
    if (name === undefined) {
      name = (top.attributes.friendly_name || c.top_entity)
        .replace(/\s*(top|upper|boven(kant)?|oben|haut)\s*$/i, "").trim();
    }
    this._el.title.textContent = name || "";

    const st = [top.state, bottom.state];
    this._el.sub.textContent = st.includes("unavailable") ? t("unavailable")
      : st.some((s) => s === "opening" || s === "closing") ? t("moving") : "";

    // Drop the optimistic value once the entity or memory has caught up.
    ["top", "bottom"].forEach((part) => {
      const loc = this._local[part];
      if (!loc) return;
      const s = this._state(part);
      if ((s && s.attributes.current_position === loc.value) || this._memory(part) === loc.value) {
        delete this._local[part];
      } else if (Date.now() >= loc.until) {
        delete this._local[part];
      }
    });

    this._render();
  }

  _render() {
    if (!this._built) return;
    const c = this._config;
    let fTop = this._drag && this._drag.part === "top" ? this._drag.frac : this._railFrac("top");
    let fBot = this._drag && this._drag.part === "bottom" ? this._drag.frac : this._railFrac("bottom");
    if (c.prevent_overlap && fTop > fBot) {
      if (this._drag && this._drag.part === "top") fTop = fBot; else fBot = fTop;
    }

    this._el.shadeTop.style.height = (fTop * 100).toFixed(2) + "%";
    this._el.shadeBottom.style.height = ((1 - fBot) * 100).toFixed(2) + "%";

    const paint = (part, frac) => {
      const r = this._rails[part];
      const res = this._resolve(part);
      const dragging = this._drag && this._drag.part === part;
      const pos = dragging ? this._snap(this._fracToPos(part, frac)) : res.value;
      const known = pos !== null;
      const remembered = !dragging && res.source === "memory";
      const shown = c.display === "position" ? pos : Math.round((part === "top" ? frac : 1 - frac) * 100);

      r.val.textContent = known ? `${shown}%` : "—";
      r.val.classList.toggle("off", !known);
      r.val.classList.toggle("mem", remembered);
      r.val.title = remembered ? this._t("remembered") : "";
      r.root.classList.toggle("unknown", !known);
      r.track.setAttribute("aria-valuenow", known ? String(pos) : "0");

      const t = `calc(8px + ${frac} * (100% - 16px))`;
      r.thumb.style.top = t;
      if (part === "top") { r.fill.style.top = "0px"; r.fill.style.height = t; }
      else { r.fill.style.top = t; r.fill.style.bottom = "0px"; r.fill.style.height = "auto"; }
    };
    paint("top", fTop);
    paint("bottom", fBot);
  }
}

/* ---------------- visual editor ---------------- */

const editorSchema = (t) => [
  { name: "name", selector: { text: {} } },
  { name: "top_entity", selector: { entity: { domain: "cover" } } },
  { name: "bottom_entity", selector: { entity: { domain: "cover" } } },
  { name: "top_position_entity", selector: { entity: { domain: ["input_number", "number"] } } },
  { name: "bottom_position_entity", selector: { entity: { domain: ["input_number", "number"] } } },
  {
    type: "grid",
    schema: [
      { name: "appearance", selector: { select: { mode: "dropdown", options: [
        { value: "auto", label: t("ed_appearance_auto") },
        { value: "dark", label: t("ed_appearance_dark") }] } } },
      { name: "display", selector: { select: { mode: "dropdown", options: [
        { value: "position", label: t("ed_display_position") },
        { value: "coverage", label: t("ed_display_coverage") }] } } },
      { name: "height", selector: { number: { min: 140, max: 480, step: 10, mode: "box", unit_of_measurement: "px" } } },
      { name: "step", selector: { number: { min: 1, max: 25, step: 1, mode: "box", unit_of_measurement: "%" } } },
      { name: "invert_top", selector: { boolean: {} } },
      { name: "invert_bottom", selector: { boolean: {} } },
      { name: "prevent_overlap", selector: { boolean: {} } },
    ],
  },
];

class TdbuBlindCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _render() {
    if (!this._config) return;
    const lang = resolveLanguage(this._hass, this._config.language);
    const t = translator(lang);
    if (!this._form) {
      this._form = document.createElement("ha-form");
      this._form.addEventListener("value-changed", (ev) => {
        ev.stopPropagation();
        this.dispatchEvent(new CustomEvent("config-changed", {
          detail: { config: { ...this._config, ...ev.detail.value } },
          bubbles: true, composed: true,
        }));
      });
      this.appendChild(this._form);
    }
    this._form.computeLabel = (s) => t(`ed_${s.name}`);
    this._form.schema = editorSchema(t);
    this._form.data = this._config;
    if (this._hass) this._form.hass = this._hass;
  }
}

if (!customElements.get("tdbu-blind-card")) customElements.define("tdbu-blind-card", TdbuBlindCard);
if (!customElements.get("tdbu-blind-card-editor")) customElements.define("tdbu-blind-card-editor", TdbuBlindCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "tdbu-blind-card",
  name: "TDBU Blind Card",
  description: "Top-down/bottom-up blind with a live window illustration, two sliders and quick actions",
  preview: true,
  documentationURL: "https://github.com/HarmEllis/tdbu-blind-card",
});

console.info(`%c TDBU-BLIND-CARD %c ${CARD_VERSION} `,
  "color:#1c1c1e;background:#d9cbb4;font-weight:700",
  "color:#d9cbb4;background:#1c1c1e");
