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
const CARD_VERSION = "1.5.0";

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
    close: "Close",
    stop: "Stop",
    open: "Open",
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
    preset_gap_bottom: "Bottom gap",
    preset_band: "Band",
    preset_top_strip: "Top strip",
    sub_bottom_half: "bottom half",
    sub_at_bottom: "{v}% at the bottom",
    sub_at_top: "{v}% at the top",
    sub_band: "middle band",
    ed_name: "Name",
    ed_top_entity: "Top cover",
    ed_bottom_entity: "Bottom cover",
    ed_top_position_entity: "Top position memory",
    ed_bottom_position_entity: "Bottom position memory",
    ed_appearance: "Appearance",
    ed_appearance_auto: "Follow theme",
    ed_appearance_dark: "Dark",
    ed_layout: "Blind layout",
    ed_layout_between: "One sheet between the rails (standard TDBU)",
    ed_layout_split: "Two shades, view in the middle",
    ed_display: "Percentage shows",
    ed_display_coverage: "% covered by the shade",
    ed_display_position: "% open (cover position)",
    ed_height: "Window height",
    ed_step: "Step size",
    ed_invert_top: "Invert top",
    ed_invert_bottom: "Invert bottom",
    ed_collision: "Dragging past the other rail",
    ed_collision_block: "Stops against it",
    ed_collision_push: "Pushes it along",
    ed_collision_none: "Allowed to cross",
  },
  nl: {
    top: "Boven",
    bottom: "Onder",
    quick_actions: "Snelle acties",
    moving: "beweegt…",
    unavailable: "niet bereikbaar",
    remembered: "Onthouden stand — dit blind meldt zijn positie niet terug",
    close: "Sluiten",
    stop: "Stop",
    open: "Openen",
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
    preset_gap_bottom: "Kier onder",
    preset_band: "Midden",
    preset_top_strip: "Strook boven",
    sub_bottom_half: "onderste helft",
    sub_at_bottom: "{v}% onderaan",
    sub_at_top: "{v}% bovenaan",
    sub_band: "middenband",
    ed_name: "Naam",
    ed_top_entity: "Cover bovenkant",
    ed_bottom_entity: "Cover onderkant",
    ed_top_position_entity: "Standgeheugen boven",
    ed_bottom_position_entity: "Standgeheugen onder",
    ed_appearance: "Uiterlijk",
    ed_appearance_auto: "Volg thema",
    ed_appearance_dark: "Donker",
    ed_layout: "Type pliss\u00e9",
    ed_layout_between: "\u00c9\u00e9n doek tussen de rails (standaard TDBU)",
    ed_layout_split: "Twee pliss\u00e9\u0027s, zicht in het midden",
    ed_display: "Percentage toont",
    ed_display_coverage: "% dicht (bedekking)",
    ed_display_position: "% open (coverpositie)",
    ed_height: "Hoogte raamvisual",
    ed_step: "Stapgrootte",
    ed_invert_top: "Boven omkeren",
    ed_invert_bottom: "Onder omkeren",
    ed_collision: "Voorbij de andere rail slepen",
    ed_collision_block: "Blokkeert ertegen",
    ed_collision_push: "Duwt hem mee",
    ed_collision_none: "Mag kruisen",
  },
  de: {
    top: "Oben",
    bottom: "Unten",
    quick_actions: "Schnellaktionen",
    moving: "bewegt sich…",
    unavailable: "nicht erreichbar",
    remembered: "Gemerkte Position — dieses Rollo meldet seine Position nicht zurück",
    close: "Schließen",
    stop: "Stopp",
    open: "Öffnen",
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
    preset_gap_bottom: "Spalt unten",
    preset_band: "Mitte",
    preset_top_strip: "Streifen oben",
    sub_bottom_half: "untere H\u00e4lfte",
    sub_at_bottom: "{v}% unten",
    sub_at_top: "{v}% oben",
    sub_band: "Mittelband",
    ed_name: "Name",
    ed_top_entity: "Cover oben",
    ed_bottom_entity: "Cover unten",
    ed_top_position_entity: "Positionsspeicher oben",
    ed_bottom_position_entity: "Positionsspeicher unten",
    ed_appearance: "Darstellung",
    ed_appearance_auto: "Theme folgen",
    ed_appearance_dark: "Dunkel",
    ed_layout: "Aufbau",
    ed_layout_between: "Ein Stoff zwischen den Schienen (Standard-TDBU)",
    ed_layout_split: "Zwei Beh\u00e4nge, Sicht in der Mitte",
    ed_display: "Prozentwert zeigt",
    ed_display_coverage: "% geschlossen",
    ed_display_position: "% offen (Cover-Position)",
    ed_height: "Höhe der Fensteransicht",
    ed_step: "Schrittweite",
    ed_invert_top: "Oben umkehren",
    ed_invert_bottom: "Unten umkehren",
    ed_collision: "\u00dcber die andere Schiene hinaus ziehen",
    ed_collision_block: "St\u00f6\u00dft dagegen",
    ed_collision_push: "Schiebt sie mit",
    ed_collision_none: "Darf kreuzen",
  },
  fr: {
    top: "Haut",
    bottom: "Bas",
    quick_actions: "Actions rapides",
    moving: "en mouvement…",
    unavailable: "indisponible",
    remembered: "Position mémorisée — ce store ne renvoie pas sa position",
    close: "Fermer",
    stop: "Arrêt",
    open: "Ouvrir",
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
    preset_gap_bottom: "Jour en bas",
    preset_band: "Milieu",
    preset_top_strip: "Bande en haut",
    sub_bottom_half: "moiti\u00e9 basse",
    sub_at_bottom: "{v}% en bas",
    sub_at_top: "{v}% en haut",
    sub_band: "bande centrale",
    ed_name: "Nom",
    ed_top_entity: "Volet haut",
    ed_bottom_entity: "Volet bas",
    ed_top_position_entity: "Mémoire de position haut",
    ed_bottom_position_entity: "Mémoire de position bas",
    ed_appearance: "Apparence",
    ed_appearance_auto: "Suivre le thème",
    ed_appearance_dark: "Sombre",
    ed_layout: "Disposition",
    ed_layout_between: "Une toile entre les rails (TDBU standard)",
    ed_layout_split: "Deux stores, vue au milieu",
    ed_display: "Le pourcentage indique",
    ed_display_coverage: "% couvert",
    ed_display_position: "% ouvert (position du volet)",
    ed_height: "Hauteur de la fenêtre",
    ed_step: "Pas",
    ed_invert_top: "Inverser le haut",
    ed_invert_bottom: "Inverser le bas",
    ed_collision: "Glisser au-del\u00e0 de l\u0027autre rail",
    ed_collision_block: "S\u0027arr\u00eate contre",
    ed_collision_push: "Le pousse",
    ed_collision_none: "Peut croiser",
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

// Positions are raw cover positions, so what a given number means on screen
// depends on the layout — hence a separate set for each.
const defaultPresets = (t, between) => (between
  ? [
      // Fabric spans between the rails: closed is top rail up, bottom rail down,
      // and open parks both rails together at the head.
      { name: t("preset_open"), sub: t("sub_all_open"), top: 0, bottom: 100 },
      { name: t("preset_top_strip"), sub: t("sub_at_top", { v: 20 }), top: 0, bottom: 80 },
      { name: t("preset_band"), sub: t("sub_band"), top: 50, bottom: 30 },
      { name: t("preset_privacy"), sub: t("sub_bottom_half"), top: 50, bottom: 0 },
      { name: t("preset_gap_bottom"), sub: t("sub_at_bottom", { v: 20 }), top: 0, bottom: 20 },
      { name: t("preset_closed"), sub: t("sub_all_closed"), top: 0, bottom: 0 },
    ]
  : [
      // Two independent shades, each closing in from its own edge.
      { name: t("preset_open"), sub: t("sub_all_open"), top: 100, bottom: 100 },
      { name: t("preset_daylight"), sub: t("sub_top", { v: 20 }), top: 80, bottom: 100 },
      { name: t("preset_privacy"), sub: t("sub_bottom", { v: 60 }), top: 100, bottom: 40 },
      { name: t("preset_closed"), sub: t("sub_all_closed"), top: 0, bottom: 0 },
    ]);

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

.stage { display: flex; gap: 10px; justify-content: center; align-items: stretch; }
.rails { position: relative; width: 96px; flex: 0 0 96px; }

.tag { position: absolute; right: 42px; text-align: right; white-space: nowrap; line-height: 1.2; cursor: pointer; }
.tag-top { top: 0; }
.tag-bottom { bottom: 0; display: flex; flex-direction: column-reverse; align-items: flex-end; }
.tag .cap { display: block; font-size: 12px; color: var(--tdbu-dim); }
.tag .val { display: block; font-size: 18px; font-weight: 600; color: var(--tdbu-fg); }
.tag .val.off { color: var(--tdbu-dim); }
.tag .val.mem { text-decoration: underline dotted; text-underline-offset: 4px; text-decoration-color: var(--tdbu-dim); }

.dual { position: absolute; right: 0; top: 0; bottom: 0; width: 34px; touch-action: none; cursor: pointer; }
.dual .bar {
  position: absolute; left: 50%; transform: translateX(-50%); width: 8px; top: 0; bottom: 0;
  border-radius: 4px; background: var(--tdbu-track);
}
.dual .seg {
  position: absolute; left: 50%; transform: translateX(-50%); width: 8px;
  border-radius: 4px; background: var(--tdbu-accent); opacity: .8;
}
.dual .thumb {
  position: absolute; left: 50%; width: 30px; height: 30px; border-radius: 50%;
  transform: translate(-50%, -50%); background: var(--tdbu-thumb); color: var(--tdbu-chip);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 6px rgba(0,0,0,.35); cursor: grab; outline: none; touch-action: none;
}
.dual .thumb:active { cursor: grabbing; }
.dual .thumb:focus-visible { box-shadow: 0 0 0 4px color-mix(in srgb, var(--tdbu-accent) 50%, transparent); }
.dual .thumb.off { opacity: .5; }
.dual .grip {
  width: 12px; height: 2px; border-radius: 1px; background: currentColor;
  box-shadow: 0 -5px 0 currentColor, 0 5px 0 currentColor;
}
.dual.smooth .thumb, .dual.smooth .seg { transition: top .35s ease, height .35s ease; }

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
.shade.band::before {
  content: ""; position: absolute; left: 0; right: 0; top: 0; height: 5px; background: var(--tdbu-rail);
}
.window.smooth .shade { transition: height .35s ease, top .35s ease; }

.btns { display: flex; gap: 8px; }
/* Beside the window: bottom-up order puts open at the top, close at the bottom. */
.btns.side { flex-direction: column-reverse; justify-content: space-between; flex: 0 0 46px; width: 46px; }
.btns.below { flex-direction: row; }
.btns.below button { flex: 1 1 0; }
.btns button {
  display: flex; align-items: center; justify-content: center;
  height: 46px; flex: 0 0 46px; width: 46px; border: none; border-radius: 12px; cursor: pointer;
  background: var(--tdbu-chip); color: var(--tdbu-fg);
  --mdc-icon-size: 22px;
}
.btns.below button { width: auto; }
.btns button:hover { background: var(--tdbu-chip-hover); }
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
      layout: "between",
      display: "position",
      step: 1,
      collision: "block",
      invert_top: false,
      invert_bottom: false,
      scene: "gradient",
      ...config,
    };
    // 1.1 and earlier expressed this as a boolean.
    if (config.collision === undefined && config.prevent_overlap === false) {
      this._config.collision = "none";
    }
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
    if (this._ro) { this._ro.disconnect(); this._ro = null; }
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

  /** True for a single sheet of fabric spanning between the two rails. */
  _between() { return this._config.layout !== "split"; }

  /** Fraction 0..1 — distance from the top of the window down to this rail. */
  _railFrac(part) {
    const pos = this._position(part);
    if (pos === null) return this._between() ? 0.5 : part === "top" ? 0 : 1;
    return this._posToFrac(part, pos);
  }

  _posToFrac(part, pos) {
    const inv = part === "top" ? this._config.invert_top : this._config.invert_bottom;
    const between = this._between();
    let frac;
    if (part === "top") frac = between ? pos / 100 : (100 - pos) / 100;
    else frac = between ? (100 - pos) / 100 : pos / 100;
    return inv ? 1 - frac : frac;
  }

  _fracToPos(part, frac) {
    const inv = part === "top" ? this._config.invert_top : this._config.invert_bottom;
    const f = inv ? 1 - frac : frac;
    const between = this._between();
    if (part === "top") return between ? f * 100 : 100 - f * 100;
    return between ? 100 - f * 100 : f * 100;
  }

  /* ---------------- DOM ---------------- */

  _presets() {
    return Array.isArray(this._config.presets)
      ? this._config.presets
      : defaultPresets(this._t, this._between());
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
            <div class="tag tag-top" data-part="top"><span class="cap">${esc(topLabel)}</span><span class="val">\u2014</span></div>
            <div class="tag tag-bottom" data-part="bottom"><span class="cap">${esc(bottomLabel)}</span><span class="val">\u2014</span></div>
            <div class="dual smooth">
              <div class="bar"></div>
              <div class="seg seg-a"></div>
              <div class="seg seg-b"></div>
              <div class="thumb thumb-top" data-part="top" tabindex="0" role="slider" aria-orientation="vertical"
                   aria-label="${esc(topLabel)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="grip"></span></div>
              <div class="thumb thumb-bottom" data-part="bottom" tabindex="0" role="slider" aria-orientation="vertical"
                   aria-label="${esc(bottomLabel)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="grip"></span></div>
            </div>
          </div>
          <div class="window smooth">
            <div class="scene"></div>
            <div class="shade top"></div>
            <div class="shade bottom"></div>
          </div>
          <div class="btns side">
            <button data-act="close" title="${esc(t("close"))}"><ha-icon icon="mdi:chevron-down"></ha-icon></button>
            <button data-act="stop" title="${esc(t("stop"))}"><ha-icon icon="mdi:stop"></ha-icon></button>
            <button data-act="open" title="${esc(t("open"))}"><ha-icon icon="mdi:chevron-up"></ha-icon></button>
          </div>
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
      wrap: card.querySelector(".wrap"),
      stage: card.querySelector(".stage"),
      rails: card.querySelector(".rails"),
      btns: card.querySelector(".btns"),
      quick: card.querySelector(".quick"),
      title: card.querySelector(".title"),
      sub: card.querySelector(".sub"),
      window: card.querySelector(".window"),
      shadeTop: card.querySelector(".shade.top"),
      shadeBottom: card.querySelector(".shade.bottom"),
      scene: card.querySelector(".scene"),
    };
    this._dual = card.querySelector(".dual");
    this._seg = { a: card.querySelector(".seg-a"), b: card.querySelector(".seg-b") };
    this._thumb = { top: card.querySelector(".thumb-top"), bottom: card.querySelector(".thumb-bottom") };
    this._tagVal = {
      top: card.querySelector(".tag-top .val"),
      bottom: card.querySelector(".tag-bottom .val"),
    };
    card.querySelectorAll(".tag").forEach((el) => {
      el.addEventListener("click", () => this._moreInfo(el.dataset.part));
    });
    this._bindDual();

    this._layoutButtons();
    if (window.ResizeObserver) {
      this._ro = new ResizeObserver(() => this._layoutButtons());
      this._ro.observe(this._el.stage);
    }

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

  _bindDual() {
    const track = this._dual;
    const THUMB = 30;

    const fracFromY = (y) => {
      const r = track.getBoundingClientRect();
      return clamp((y - (r.top + THUMB / 2)) / Math.max(1, r.height - THUMB), 0, 1);
    };

    // Grabbing a handle picks that one; grabbing the bar picks the nearest,
    // and when both sit in the same spot the direction of the grab decides.
    const pick = (frac, target) => {
      const onThumb = target && target.closest && target.closest(".thumb");
      if (onThumb) return onThumb.dataset.part;
      const fTop = this._railFrac("top");
      const fBot = this._railFrac("bottom");
      if (Math.abs(fTop - fBot) < 0.005) return frac < fTop ? "top" : "bottom";
      return Math.abs(frac - fTop) <= Math.abs(frac - fBot) ? "top" : "bottom";
    };

    const onMove = (ev) => {
      if (!this._drag) return;
      ev.preventDefault();
      this._drag = this._resolveDrag(this._drag.part, fracFromY(ev.clientY));
      this._render();
    };
    const onUp = () => {
      if (!this._drag) return;
      const { part, frac, otherPart, otherFrac } = this._drag;
      this._drag = null;
      this._setSmooth(true);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      // Nothing is sent while dragging — one command per handle on release.
      this._commit(part, this._snap(this._fracToPos(part, frac)));
      if (otherFrac !== null) this._commit(otherPart, this._snap(this._fracToPos(otherPart, otherFrac)));
    };

    track.addEventListener("pointerdown", (ev) => {
      ev.preventDefault();
      const frac = fracFromY(ev.clientY);
      this._setSmooth(false);
      this._drag = this._resolveDrag(pick(frac, ev.target), frac);
      this._render();
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    });

    // Arrow keys move a handle the way it visually travels, whichever end of
    // the position scale that happens to be.
    Object.entries(this._thumb).forEach(([part, el]) => {
      el.addEventListener("keydown", (ev) => {
        let frac = this._railFrac(part);
        if (ev.key === "ArrowUp" || ev.key === "ArrowLeft") frac -= 0.05;
        else if (ev.key === "ArrowDown" || ev.key === "ArrowRight") frac += 0.05;
        else if (ev.key === "Home") frac = 0;
        else if (ev.key === "End") frac = 1;
        else return;
        ev.preventDefault();
        const d = this._resolveDrag(part, clamp(frac, 0, 1));
        this._commit(d.part, this._snap(this._fracToPos(d.part, d.frac)));
        if (d.otherFrac !== null) this._commit(d.otherPart, this._snap(this._fracToPos(d.otherPart, d.otherFrac)));
      });
    });
  }

  /**
   * The buttons sit beside the window when the card is wide enough for them,
   * and drop to a row underneath it when it is not.
   */
  _layoutButtons() {
    const el = this._el;
    const avail = el.stage.clientWidth;
    if (!avail) return;
    const needed = el.rails.offsetWidth + el.window.offsetWidth + 46 + 20;
    const side = needed + 4 <= avail;
    if (side === (el.btns.parentElement === el.stage)) return;
    el.btns.classList.toggle("side", side);
    el.btns.classList.toggle("below", !side);
    if (side) el.stage.appendChild(el.btns);
    else el.wrap.insertBefore(el.btns, el.quick || null);
  }

  _setSmooth(on) {
    this._dual.classList.toggle("smooth", on);
    this._el.window.classList.toggle("smooth", on);
  }

  /**
   * Works out where a handle ends up, and whether it takes the other one with
   * it. `collision`: "block" stops against the other handle, "push" shoves it
   * along, "none" lets them cross.
   */
  _resolveDrag(part, frac) {
    const otherPart = part === "top" ? "bottom" : "top";
    const other = this._railFrac(otherPart);
    const mode = this._config.collision;
    let otherFrac = null;

    if (mode === "push") {
      if (part === "top" && frac > other) otherFrac = frac;
      if (part === "bottom" && frac < other) otherFrac = frac;
    } else if (mode !== "none") {
      frac = part === "top" ? Math.min(frac, other) : Math.max(frac, other);
    }
    return { part, frac, otherPart, otherFrac };
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

  /**
   * Preset positions describe the blind as the card draws it, so a card with
   * invert_top / invert_bottom set has to mirror them on the way out — exactly
   * as dragging a handle already does.
   */
  _toRaw(part, value) {
    const inv = part === "top" ? this._config.invert_top : this._config.invert_bottom;
    return inv ? 100 - value : value;
  }

  _applyPreset(preset) {
    if (!preset) return;
    if (typeof preset.top === "number") this._commit("top", this._snap(this._toRaw("top", preset.top)));
    if (typeof preset.bottom === "number") this._commit("bottom", this._snap(this._toRaw("bottom", preset.bottom)));
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
    const d = this._drag;
    const pick = (part) => {
      if (!d) return this._railFrac(part);
      if (d.part === part) return d.frac;
      if (d.otherPart === part && d.otherFrac !== null) return d.otherFrac;
      return this._railFrac(part);
    };
    let fTop = pick("top");
    let fBot = pick("bottom");
    if (c.collision !== "none" && fTop > fBot) {
      if (d && d.part === "top") fBot = fTop; else fTop = fBot;
    }

    const between = this._between();
    this._el.shadeTop.classList.toggle("band", between);
    if (between) {
      // One sheet of fabric spanning from the top rail down to the bottom rail.
      this._el.shadeTop.style.top = (fTop * 100).toFixed(2) + "%";
      this._el.shadeTop.style.height = (Math.max(0, fBot - fTop) * 100).toFixed(2) + "%";
      this._el.shadeBottom.style.height = "0%";
    } else {
      // Two separate shades closing in from the top and the bottom edge.
      this._el.shadeTop.style.top = "0";
      this._el.shadeTop.style.height = (fTop * 100).toFixed(2) + "%";
      this._el.shadeBottom.style.height = ((1 - fBot) * 100).toFixed(2) + "%";
    }

    // Handles travel between the two half-thumb insets; the segments reuse the
    // same expression so they always line up with them.
    const at = (f) => `calc(15px + ${f} * (100% - 30px))`;
    this._thumb.top.style.top = at(fTop);
    this._thumb.bottom.style.top = at(fBot);

    if (between) {
      // The filled segment is the fabric, so it sits between the handles.
      this._seg.a.style.top = at(fTop);
      this._seg.a.style.height = `calc(${Math.max(0, fBot - fTop)} * (100% - 30px))`;
      this._seg.a.style.bottom = "auto";
      this._seg.b.style.height = "0";
    } else {
      // Fabric sits outside the handles, so fill both ends instead.
      this._seg.a.style.top = "0";
      this._seg.a.style.height = at(fTop);
      this._seg.a.style.bottom = "auto";
      this._seg.b.style.top = at(fBot);
      this._seg.b.style.bottom = "0";
      this._seg.b.style.height = "auto";
    }

    const label = (part, frac) => {
      const res = this._resolve(part);
      const live = d && (d.part === part || (d.otherPart === part && d.otherFrac !== null));
      const pos = live ? this._snap(this._fracToPos(part, frac)) : res.value;
      const known = pos !== null;
      const remembered = !live && res.source === "memory";
      const val = this._tagVal[part];

      val.textContent = known ? `${c.display === "position" ? pos : 100 - pos}%` : "\u2014";
      val.classList.toggle("off", !known);
      val.classList.toggle("mem", remembered);
      val.title = remembered ? this._t("remembered") : "";
      this._thumb[part].classList.toggle("off", !known);
      this._thumb[part].setAttribute("aria-valuenow", known ? String(pos) : "0");
    };
    label("top", fTop);
    label("bottom", fBot);
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
      { name: "layout", selector: { select: { mode: "dropdown", options: [
        { value: "between", label: t("ed_layout_between") },
        { value: "split", label: t("ed_layout_split") }] } } },
      { name: "display", selector: { select: { mode: "dropdown", options: [
        { value: "position", label: t("ed_display_position") },
        { value: "coverage", label: t("ed_display_coverage") }] } } },
      { name: "height", selector: { number: { min: 140, max: 480, step: 10, mode: "box", unit_of_measurement: "px" } } },
      { name: "step", selector: { number: { min: 1, max: 25, step: 1, mode: "box", unit_of_measurement: "%" } } },
      { name: "invert_top", selector: { boolean: {} } },
      { name: "invert_bottom", selector: { boolean: {} } },
      { name: "collision", selector: { select: { mode: "dropdown", options: [
        { value: "block", label: t("ed_collision_block") },
        { value: "push", label: t("ed_collision_push") },
        { value: "none", label: t("ed_collision_none") }] } } },
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
