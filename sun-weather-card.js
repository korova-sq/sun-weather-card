/**
 * Sun Weather Card
 * https://github.com/korova-sq/sun-weather-card
 * Version: 1.6.1
 *
 * A weather card with an animated current-conditions header, a sunrise/sunset
 * arc, and daily/hourly forecasts shown as iOS-style bars or a line graph.
 *
 * Config minima:
 *   type: custom:sun-weather-card
 *   entity: weather.forecast_home
 *
 * Config completa:
 *   type: custom:sun-weather-card
 *   entity: weather.forecast_home
 *   sun_entity: sun.sun
 *   forecast_days: 5
 *   locale: it-IT
 *   time_format: '24'   # oppure '12'
 */

const CONDITION_LABELS = {
  it: {
    'clear-night': 'Sereno',
    cloudy: 'Nuvoloso',
    fog: 'Nebbia',
    hail: 'Grandine',
    lightning: 'Temporale',
    'lightning-rainy': 'Temporale con pioggia',
    partlycloudy: 'Parzialmente nuvoloso',
    pouring: 'Pioggia intensa',
    rainy: 'Pioggia',
    snowy: 'Neve',
    'snowy-rainy': 'Nevischio',
    sunny: 'Soleggiato',
    windy: 'Ventoso',
    'windy-variant': 'Ventoso',
    exceptional: 'Eccezionale',
  },
  en: {
    'clear-night': 'Clear',
    cloudy: 'Cloudy',
    fog: 'Fog',
    hail: 'Hail',
    lightning: 'Thunderstorm',
    'lightning-rainy': 'Thunderstorm with rain',
    partlycloudy: 'Partly cloudy',
    pouring: 'Heavy rain',
    rainy: 'Rainy',
    snowy: 'Snow',
    'snowy-rainy': 'Sleet',
    sunny: 'Sunny',
    windy: 'Windy',
    'windy-variant': 'Windy',
    exceptional: 'Exceptional',
  },
  de: {
    'clear-night': 'Klar',
    cloudy: 'Bewölkt',
    fog: 'Nebel',
    hail: 'Hagel',
    lightning: 'Gewitter',
    'lightning-rainy': 'Gewitter mit Regen',
    partlycloudy: 'Teilweise bewölkt',
    pouring: 'Starkregen',
    rainy: 'Regnerisch',
    snowy: 'Schnee',
    'snowy-rainy': 'Schneeregen',
    sunny: 'Sonnig',
    windy: 'Windig',
    'windy-variant': 'Windig',
    exceptional: 'Außergewöhnlich',
  },
  nl: {
    'clear-night': 'Helder',
    cloudy: 'Bewolkt',
    fog: 'Mist',
    hail: 'Hagel',
    lightning: 'Onweer',
    'lightning-rainy': 'Onweer met regen',
    partlycloudy: 'Gedeeltelijk bewolkt',
    pouring: 'Zware regen',
    rainy: 'Regenachtig',
    snowy: 'Sneeuw',
    'snowy-rainy': 'Natte sneeuw',
    sunny: 'Zonnig',
    windy: 'Winderig',
    'windy-variant': 'Winderig',
    exceptional: 'Uitzonderlijk',
  },
  fr: {
    'clear-night': 'Nuit claire',
    cloudy: 'Nuageux',
    fog: 'Brouillard',
    hail: 'Grêle',
    lightning: 'Orage',
    'lightning-rainy': 'Orage et pluie',
    partlycloudy: 'Partiellement nuageux',
    pouring: 'Pluie forte',
    rainy: 'Pluvieux',
    snowy: 'Neigeux',
    'snowy-rainy': 'Neige et pluie mêlées',
    sunny: 'Ensoleillé',
    windy: 'Venteux',
    'windy-variant': 'Venteux et nuageux',
    exceptional: 'Exceptionnel',
  },
};

const UI_LABELS = {
  it: { sunrise: 'alba', sunset: 'tramonto', daily: 'Giorni', hourly: 'Ore' },
  en: { sunrise: 'sunrise', sunset: 'sunset', daily: 'Daily', hourly: 'Hourly' },
  de: { sunrise: 'Sonnenaufgang', sunset: 'Sonnenuntergang', daily: 'Tage', hourly: 'Stunden' },
  nl: { sunrise: 'zonsopgang', sunset: 'zonsondergang', daily: 'Dagen', hourly: 'Uren' },
  fr: { sunrise: 'lever', sunset: 'coucher', daily: 'Quotidien', hourly: 'Horaire' },
};

class SunWeatherCard extends HTMLElement {
  setConfig(config) {
    if (!config.entity) {
      throw new Error('Devi specificare "entity" (il tuo weather.xxx)');
    }
    this._config = {
      sun_entity: 'sun.sun',
      forecast_days: 7,
      forecast_hours: 24,
      // 'daily' oppure 'hourly': modalita' della lista previsioni (scelta da YAML)
      forecast_type: 'daily',
      // mostra i mm di pioggia accanto a ogni giorno (quando previsti)
      show_forecast_precipitation: true,
      // interruttore Giorni/Ore nella card: disattivato di default,
      // la modalita' si sceglie da forecast_type nel YAML
      show_forecast_toggle: false,
      locale: 'it-IT',
      time_format: '24',
      // lingua della card: 'it', 'en' oppure 'system' (segue HA/browser)
      language: 'system',
      // mostra/nascondi le sezioni superiori
      show_time: true,
      show_date: true,
      show_arc: true,
      // azione al click sulla card (standard HA). Default: more-info entita' meteo
      tap_action: { action: 'more-info' },
      // layout previsioni giornaliere: 'bars' (righe con barre) o 'graph'
      // (grafico orizzontale a due linee con icone sopra e mm sotto)
      forecast_layout: 'bars',
      // quante righe di previsione restano sempre visibili; le altre
      // diventano scrollabili verticalmente. null = mostra tutte senza scroll.
      visible_rows: null,
      // sfondo: 'transparent' rimuove sfondo, ombra e bordo (la card si fonde
      // con la dashboard). 'background_image' imposta un'immagine di sfondo
      // (URL o percorso /local/...). Con l'immagine, un velo automatico
      // preserva la leggibilita' del testo.
      transparent: false,
      background_image: null,
      // velo sopra l'immagine di sfondo, valore unico da -1 a +1:
      //  -1 = chiaro pieno, 0 = nessun velo, +1 = scuro pieno.
      background_overlay: 0,
      // icone meteo animate: false = icone statiche (piu' leggere su
      // dispositivi lenti)
      animated_icons: true,
      ...config,
    };
    // dettagli: se la chiave e' omessa NON mostrare nulla di default
    // (l'utente li aggiunge man mano); se e' una lista usa esattamente quella
    if (!('details' in config) || !Array.isArray(config.details)) {
      this._config.details = [];
    }
    this._forecastMode = this._config.forecast_type === 'hourly' ? 'hourly' : 'daily';
    this._daily = null;
    this._hourly = null;
    this._dailyFetchedAt = 0;
    this._hourlyFetchedAt = 0;
    this._iconUid = 0;

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
      this._buildStaticDOM();
    }
  }

  _buildStaticDOM() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        ha-card {
          padding: 16px 18px 18px;
          font-family: var(--paper-font-body1_-_font-family, inherit);
          position: relative;
        }
        ha-card.clickable { cursor: pointer; }
        /* sfondo trasparente totale: via sfondo, ombra e bordo */
        ha-card.transparent {
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
          box-shadow: none !important;
          border: none !important;
          /* temi "glass" (es. Frosted Glass) usano backdrop-filter e variabili proprie */
          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;
          --ha-card-background: transparent;
          --ha-card-box-shadow: none;
          --ha-card-border-width: 0;
          --ha-card-backdrop-filter: none;
          --card-background-color: transparent;
        }
        /* i temi "glass" disegnano spesso il vetro con uno pseudo-elemento
           sopra la card: va neutralizzato anche quello */
        ha-card.transparent::before,
        ha-card.transparent::after {
          content: none !important;
          display: none !important;
          background: none !important;
          -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;
          box-shadow: none !important;
        }
        /* immagine di sfondo: dipinta sulla card stessa (card normale, nessun
           wrapper che spunta agli angoli). Il velo e' incorporato nel background. */
        ha-card.has-bg-image {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border: none !important;
          --ha-card-border-width: 0;
          overflow: hidden;
        }
        /* su velo scuro schiarisce i testi che di default sono scuri */
        ha-card.bg-dark .time,
        ha-card.bg-dark .cur-desc,
        ha-card.bg-dark .cur-temp,
        ha-card.bg-dark .date,
        ha-card.bg-dark .cur-location,
        ha-card.bg-dark .cur-hilo,
        ha-card.bg-dark .detail-item,
        ha-card.bg-dark .forecast-row,
        ha-card.bg-dark .fc-graph .g-day,
        ha-card.bg-dark .fc-graph .g-tmax,
        ha-card.bg-dark .fc-graph .g-tmin {
          color: #f3f3f3;
          fill: #f3f3f3;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 8px;
        }
        .time {
          font-size: 2.4em;
          font-weight: 700;
          color: var(--primary-text-color);
          line-height: 1;
          letter-spacing: -0.5px;
        }
        .date {
          font-size: 1.15em;
          font-weight: 400;
          color: var(--secondary-text-color);
          line-height: 1;
          text-transform: capitalize;
        }

        /* --- Condizioni attuali (stile iOS) --- */
        .current {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 10px 0 6px;
        }
        .current .cur-icon {
          width: 68px;
          height: 68px;
          flex: 0 0 68px;
        }
        .current .cur-icon svg { width: 100%; height: 100%; overflow: visible; }
        .current .cur-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
          flex: 1 1 auto;
        }
        .current .cur-desc {
          font-size: var(--swc-desc-size, 1.7em);
          font-weight: 600;
          color: var(--primary-text-color);
          line-height: 1.25;
          padding-bottom: 1px;
          text-transform: capitalize;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .current .cur-location {
          font-size: 1.05em;
          color: var(--secondary-text-color);
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .current .cur-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          flex: 0 0 auto;
          text-align: right;
        }
        .current .cur-temp {
          font-size: 2.1em;
          font-weight: 600;
          color: var(--primary-text-color);
          line-height: 1.1;
          white-space: nowrap;
        }
        .current .cur-hilo {
          font-size: 1em;
          color: var(--secondary-text-color);
          line-height: 1.2;
          white-space: nowrap;
        }

        /* --- Arco --- */
        .arc-wrap {
          position: relative;
          width: 100%;
          height: 66px;
          margin: 4px 0 20px;
        }
        svg.arc { width: 100%; height: 100%; display: block; overflow: visible; }
        .arc-path {
          fill: none;
          stroke: var(--sun-arc-color, currentColor);
          opacity: 0.35;
          stroke-width: 2;
          stroke-dasharray: 3 5;
        }
        .horizon-line {
          stroke: var(--sun-arc-color, currentColor);
          opacity: 0.35;
          stroke-width: 2;
        }
        .sun-dot {
          fill: #ffb703;
          filter: drop-shadow(0 0 6px rgba(255, 183, 3, 0.8));
        }
        .moon-dot { fill: #9fb0d0; }
        .sun-time-label {
          font-size: 13px;
          font-weight: 600;
          fill: var(--secondary-text-color);
        }
        .sun-time-sub {
          font-size: 10px;
          fill: var(--secondary-text-color);
          opacity: 0.8;
        }

        /* --- Dettagli configurabili --- */
        .details {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px 8px;
          padding: 7px 0;
          border-top: 1px solid var(--divider-color, #e0e0e0);
        }
        .custom-details {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px 8px;
          padding: 0 0 7px 0;
        }
        .custom-details.flow {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 18px;
        }
        /* modalita' griglia (default): taglia valori/nomi lunghi con "..." */
        .custom-details:not(.flow) .custom-item .cd-row { min-width: 0; }
        .custom-details:not(.flow) .custom-item .cd-row .d-val {
          min-width: 0; overflow: hidden; text-overflow: ellipsis;
        }
        .custom-details:not(.flow) .custom-item .cd-name {
          overflow: hidden; text-overflow: ellipsis; max-width: 100%;
        }
        .custom-item {
          min-width: 0; position: relative; text-align: left;
          display: flex; flex-direction: column; align-items: flex-start;
        }
        .custom-item.has-tip { cursor: pointer; }
        .custom-item .cd-row {
          display: flex; align-items: center; justify-content: flex-start; gap: 4px;
          font-size: 0.85em; color: var(--primary-text-color);
        }
        .custom-item .cd-row ha-icon {
          --mdc-icon-size: 18px;
          color: var(--paper-item-icon-color, #6b7a8d);
          flex: 0 0 auto;
        }
        .custom-item .cd-row .d-val { white-space: nowrap; }
        .custom-item .cd-name {
          display: block;
          font-size: 0.7em;
          color: var(--secondary-text-color);
          white-space: nowrap;
        }
        .details:empty { display: none; padding: 0; border-top: none; }
        .detail-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.85em;
          color: var(--primary-text-color);
          min-width: 0;
          position: relative;
        }
        .detail-item.has-tip { cursor: pointer; }
        .detail-tip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 4px;
          background: rgba(40, 44, 52, 0.97);
          color: #fff;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.8em;
          white-space: nowrap;
          z-index: 20;
          box-shadow: 0 2px 10px rgba(0,0,0,0.4);
          pointer-events: none;
          animation: swc-tip-in 0.15s ease-out;
        }
        @keyframes swc-tip-in {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .detail-item ha-icon {
          --mdc-icon-size: 18px;
          color: var(--paper-item-icon-color, #6b7a8d);
          flex: 0 0 auto;
        }
        .detail-item .d-val {
          white-space: nowrap;
        }

        /* --- Previsioni --- */
        .forecast-toggle {
          display: inline-flex;
          gap: 2px;
          padding: 2px;
          margin-bottom: 12px;
          border-radius: 999px;
          background: var(--divider-color, #e5e5e5);
        }
        .forecast-toggle button {
          border: none;
          background: transparent;
          color: var(--secondary-text-color);
          font: inherit;
          font-size: 0.85em;
          padding: 4px 14px;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .forecast-toggle button.active {
          background: var(--card-background-color, #fff);
          color: var(--primary-text-color);
          font-weight: 600;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
        }
        .forecast-list {
          padding-top: 12px;
          border-top: 1px solid var(--divider-color, #e0e0e0);
        }
        .forecast-scroll {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-right: 6px;
          scrollbar-gutter: stable;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }
        .forecast-scroll::-webkit-scrollbar { width: 0; height: 0; display: none; }
        .forecast-scroll.graph-mode {
          display: block;
          overflow-x: auto;
          overflow-y: hidden;
          padding-right: 0;
          scrollbar-width: none;
          -webkit-mask-image: linear-gradient(to right, transparent 0, #000 12px, #000 calc(100% - 12px), transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, #000 12px, #000 calc(100% - 12px), transparent 100%);
        }
        .forecast-scroll.graph-mode::-webkit-scrollbar { height: 0; display: none; }
        .fc-graph { display: block; flex: none; overflow: visible; }
        .fc-graph .g-day {
          font-size: 12px; fill: var(--secondary-text-color); text-transform: capitalize;
        }
        .fc-graph .g-tmax { font-size: 12px; font-weight: 700; fill: var(--primary-text-color); }
        .fc-graph .g-tmin { font-size: 12px; fill: var(--secondary-text-color); }
        .fc-graph .g-precip { font-size: 10px; font-weight: 600; fill: #4d9de0; }
        .fc-graph .g-area-max { fill: url(#gMaxArea); stroke: none; }
        .fc-graph .g-line-max { fill: none; stroke: #ff7a59; stroke-width: 3; stroke-linejoin: round; stroke-linecap: round; }
        .fc-graph .g-line-min { fill: none; stroke: #35b5c4; stroke-width: 2.5; stroke-linejoin: round; stroke-linecap: round; }
        .fc-graph .g-dot-max { fill: #fff; stroke: #ff7a59; stroke-width: 2.2; }
        .fc-graph .g-dot-min { fill: #fff; stroke: #35b5c4; stroke-width: 2.2; }
        .forecast-row {
          display: grid;
          grid-template-columns: 40px 28px 30px 1fr auto;
          align-items: center;
          gap: 8px;
          font-size: 1em;
        }
        .forecast-row.hourly {
          grid-template-columns: 44px 30px 1fr 34px;
          gap: 10px;
        }
        .temp-group {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
          padding-right: 5px;
        }
        .temp-group .temp-max {
          min-width: 26px;
        }
        .forecast-row .f-precip {
          font-size: 0.78em;
          font-weight: 600;
          color: #4d9de0;
          text-align: right;
          white-space: nowrap;
        }
        .forecast-row .label {
          color: var(--secondary-text-color);
          text-transform: capitalize;
          font-weight: 500;
        }
        .forecast-row .icon-wrap {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .forecast-row .icon-wrap svg { width: 100%; height: 100%; overflow: hidden; }
        .forecast-row .temp-min {
          color: var(--secondary-text-color);
          text-align: right;
        }
        .forecast-row .temp-max {
          color: var(--primary-text-color);
          font-weight: 700;
          text-align: right;
        }
        .bar-track {
          position: relative;
          height: 6px;
          border-radius: 3px;
          background: var(--divider-color, #e5e5e5);
          overflow: visible;
        }
        .bar-fill {
          position: absolute;
          top: 0;
          bottom: 0;
          border-radius: 3px;
        }
        .bar-dot {
          position: absolute;
          top: 50%;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--primary-text-color);
          border: 2px solid var(--card-background-color, #fff);
          transform: translate(-50%, -50%);
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
        }
      </style>
      <ha-card>
        <div class="header">
          <div class="time" id="time"></div>
          <div class="date" id="date"></div>
        </div>

        <div class="current">
          <div class="cur-icon" id="cur-icon"></div>
          <div class="cur-left">
            <div class="cur-desc" id="cur-desc"></div>
            <div class="cur-location" id="cur-location"></div>
          </div>
          <div class="cur-right">
            <div class="cur-temp" id="cur-temp"></div>
            <div class="cur-hilo" id="cur-hilo"></div>
          </div>
        </div>

        <div class="arc-wrap">
          <svg class="arc" id="arc-svg" viewBox="0 0 240 64" preserveAspectRatio="xMidYMid meet"></svg>
        </div>

        <div class="details" id="details"></div>
        <div class="custom-details" id="custom-details"></div>

        <div class="forecast-list">
          <div class="forecast-toggle" id="forecast-toggle">
            <button type="button" data-mode="daily">Giorni</button>
            <button type="button" data-mode="hourly">Ore</button>
          </div>
          <div class="forecast-scroll" id="forecast-scroll"></div>
        </div>
      </ha-card>
    `;
    // rotella del mouse -> scroll orizzontale quando il grafico è in scroll
    const scrollEl = this.shadowRoot.getElementById('forecast-scroll');
    if (scrollEl) {
      scrollEl.addEventListener('wheel', (ev) => {
        if (!scrollEl.classList.contains('graph-mode')) return;
        if (scrollEl.scrollWidth <= scrollEl.clientWidth) return; // niente da scorrere
        // usa la componente verticale della rotella per scorrere in orizzontale
        const delta = Math.abs(ev.deltaX) > Math.abs(ev.deltaY) ? ev.deltaX : ev.deltaY;
        if (delta === 0) return;
        scrollEl.scrollLeft += delta;
        ev.preventDefault();
      }, { passive: false });
    }

    // gestione toggle Giorni/Ore
    const toggle = this.shadowRoot.getElementById('forecast-toggle');
    if (toggle) {
      toggle.addEventListener('click', (ev) => {
        const btn = ev.target.closest('button[data-mode]');
        if (!btn) return;
        const mode = btn.dataset.mode;
        if (mode === this._forecastMode) return;
        this._forecastMode = mode;
        this._updateToggleUI();
        this._maybeFetchForecast();
      });
    }

    // click/hold/double sulla card -> azioni standard HA
    const card = this.shadowRoot.querySelector('ha-card');
    if (card) {
      let holdTimer = null;
      let held = false;
      let clickTimer = null;

      const isInternal = (ev) => ev.target.closest('.forecast-toggle');

      card.addEventListener('pointerdown', (ev) => {
        if (isInternal(ev)) return;
        held = false;
        holdTimer = setTimeout(() => {
          held = true;
          this._runAction('hold_action');
        }, 500);
      });
      const cancelHold = () => { if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; } };
      card.addEventListener('pointerup', cancelHold);
      card.addEventListener('pointercancel', cancelHold);
      card.addEventListener('pointerleave', cancelHold);

      card.addEventListener('click', (ev) => {
        if (isInternal(ev)) return;
        if (held) { held = false; return; }
        // distingue singolo da doppio tap
        if (clickTimer) {
          clearTimeout(clickTimer);
          clickTimer = null;
          this._runAction('double_tap_action');
        } else {
          clickTimer = setTimeout(() => {
            clickTimer = null;
            this._runAction('tap_action');
          }, 250);
        }
      });
    }
  }

  _runAction(which) {
    const fallback = which === 'tap_action' ? { action: 'more-info' } : { action: 'none' };
    const action = this._config[which] || fallback;
    this._handleAction(action);
  }

  _handleAction(action) {
    action = action || { action: 'more-info' };
    const type = action.action || 'more-info';

    if (type === 'none') return;

    if (type === 'more-info') {
      const entityId = action.entity || this._config.entity;
      if (!entityId) return;
      const ev = new CustomEvent('hass-more-info', {
        bubbles: true,
        composed: true,
        detail: { entityId },
      });
      this.dispatchEvent(ev);
      return;
    }

    if (type === 'navigate') {
      if (!action.navigation_path) return;
      history.pushState(null, '', action.navigation_path);
      const ev = new Event('location-changed', { bubbles: true, composed: true });
      window.dispatchEvent(ev);
      return;
    }

    if (type === 'url') {
      if (action.url_path) window.open(action.url_path, action.new_tab === false ? '_self' : '_blank');
      return;
    }

    if ((type === 'call-service' || type === 'perform-action') && this._hass) {
      const svc = action.service || action.perform_action;
      if (!svc || !svc.includes('.')) return;
      const [domain, service] = svc.split('.', 2);
      this._hass.callService(domain, service, action.data || action.service_data || {}, action.target || {});
      return;
    }

    if (type === 'toggle' && this._hass) {
      const entityId = action.entity || this._config.entity;
      if (entityId) this._hass.callService('homeassistant', 'toggle', { entity_id: entityId });
    }
  }

  _updateToggleUI() {
    const toggle = this.shadowRoot.getElementById('forecast-toggle');
    if (!toggle) return;
    toggle.style.display = this._config.show_forecast_toggle ? 'inline-flex' : 'none';
    const L = this._uiLabels();
    toggle.querySelectorAll('button[data-mode]').forEach((b) => {
      b.textContent = b.dataset.mode === 'daily' ? L.daily : L.hourly;
      b.classList.toggle('active', b.dataset.mode === this._forecastMode);
    });
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._config) return;
    this._render();
    this._maybeFetchForecast();
  }

  _render() {
    const cfg = this._config;
    const now = new Date();

    const timeFmt = new Intl.DateTimeFormat(this._locale(), {
      hour: '2-digit',
      minute: '2-digit',
      hour12: cfg.time_format === '12',
    });
    const dateFmt = new Intl.DateTimeFormat(this._locale(), {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });

    const timeEl = this.shadowRoot.getElementById('time');
    const dateEl = this.shadowRoot.getElementById('date');
    const headerEl = this.shadowRoot.querySelector('.header');
    const arcWrap = this.shadowRoot.querySelector('.arc-wrap');

    // cursore a manina se c'e' un'azione al click
    const cardEl = this.shadowRoot.querySelector('ha-card');
    if (cardEl) {
      const act = (this._config.tap_action && this._config.tap_action.action) || 'more-info';
      cardEl.classList.toggle('clickable', act !== 'none');

      // immagine di sfondo e trasparenza sono mutuamente esclusive:
      // se c'e' un'immagine, ha la precedenza e la trasparenza viene ignorata.
      const bg = this._config.background_image;
      const hasBg = !!bg;

      // sfondo trasparente (solo se non c'e' un'immagine)
      const wantTransparent = this._config.transparent === true && !hasBg;
      cardEl.classList.toggle('transparent', wantTransparent);

      // Applica la trasparenza anche come stile inline con !important:
      // gli stili inline battono qualsiasi foglio di stile, compresi i temi
      // "glass" che iniettano regole nella card (es. via card-mod).
      const forced = [
        ['background', 'transparent'],
        ['background-color', 'transparent'],
        ['background-image', 'none'],
        ['box-shadow', 'none'],
        ['border', 'none'],
        ['backdrop-filter', 'none'],
        ['-webkit-backdrop-filter', 'none'],
        // variabili dei temi: ereditano anche dentro la shadow DOM di ha-card
        ['--ha-card-background', 'transparent'],
        ['--card-background-color', 'transparent'],
        ['--ha-card-box-shadow', 'none'],
        ['--ha-card-border-width', '0'],
        ['--ha-card-border-color', 'transparent'],
        ['--ha-card-backdrop-filter', 'none'],
      ];
      if (wantTransparent) {
        forced.forEach(([p, v]) => cardEl.style.setProperty(p, v, 'important'));
      } else {
        // se c'e' un'immagine di sfondo, non toccare background/background-image
        // (li gestisce il blocco immagine sotto); altrimenti si cancellerebbe
        // l'immagine appena impostata, causando il "lampeggio".
        forced.forEach(([p]) => {
          if (hasBg && (p === 'background' || p === 'background-image' || p === 'background-color')) return;
          cardEl.style.removeProperty(p);
        });
      }

      // immagine di sfondo con velo incorporato, dipinta sulla card stessa
      if (hasBg) {
        cardEl.classList.add('has-bg-image');

        // forza trasparenti gli sfondi-colore del tema (che coprirebbero
        // l'immagine), ma NON background-image, che impostiamo qui sotto
        cardEl.style.setProperty('background-color', 'transparent', 'important');
        cardEl.style.setProperty('--ha-card-background', 'transparent', 'important');
        cardEl.style.setProperty('--card-background-color', 'transparent', 'important');

        // velo unico: valore da -1 (chiaro) a +1 (scuro), 0 = nessun velo
        let ov = Number(this._config.background_overlay);
        if (!isFinite(ov)) ov = 0;
        ov = Math.min(Math.max(ov, -1), 1);
        const dark = ov > 0;
        const op = Math.abs(ov);
        const veil = dark ? `rgba(0, 0, 0, ${op})` : `rgba(255, 255, 255, ${op})`;
        // velo come primo layer (gradiente pieno) sopra l'immagine
        const bgUrl = String(bg).trim();
        cardEl.style.setProperty('background-image',
          `linear-gradient(${veil}, ${veil}), url("${bgUrl}")`, 'important');
        cardEl.classList.toggle('bg-dark', dark && op >= 0.4);
      } else {
        cardEl.classList.remove('has-bg-image', 'bg-dark');
        cardEl.style.removeProperty('background-image');
        if (!wantTransparent) {
          cardEl.style.removeProperty('background-color');
          cardEl.style.removeProperty('--ha-card-background');
          cardEl.style.removeProperty('--card-background-color');
        }
      }
    }

    timeEl.textContent = timeFmt.format(now);
    dateEl.textContent = dateFmt.format(now);

    // mostra/nascondi ora, data, arco
    const showTime = cfg.show_time !== false;
    const showDate = cfg.show_date !== false;
    const showArc = cfg.show_arc !== false;
    timeEl.style.display = showTime ? '' : 'none';
    dateEl.style.display = showDate ? '' : 'none';
    // nascondi l'intera riga header solo se sia ora sia data sono off
    if (headerEl) headerEl.style.display = (showTime || showDate) ? '' : 'none';
    if (arcWrap) arcWrap.style.display = showArc ? '' : 'none';

    this._renderCurrent(now);
    if (showArc) this._renderSunArc(now);
    this._renderDetails();
    this._updateToggleUI();
    this._renderForecast();
  }

  _isNight(now) {
    const sunState = this._hass.states[this._config.sun_entity];
    if (sunState) return sunState.state === 'below_horizon';
    const h = now.getHours();
    return h < 6 || h >= 20;
  }

  // È notte all'orario 'date'? Serve a scegliere l'icona giorno/notte di ogni
  // ora della previsione. Confronta l'ora-del-giorno con alba/tramonto della
  // posizione (dal sun entity); ripiego 6-20 se il sun entity non c'è.
  _isNightAt(date) {
    const sunState = this._hass.states[this._config.sun_entity];
    if (sunState && sunState.attributes.next_rising && sunState.attributes.next_setting) {
      const { sunrise, sunset } = this._getTodaySunTimes(sunState, new Date());
      const mins = (d) => d.getHours() * 60 + d.getMinutes();
      const m = mins(date);
      return m < mins(sunrise) || m >= mins(sunset);
    }
    const h = date.getHours();
    return h < 6 || h >= 20;
  }

  // Converte una condizione nella sua variante notturna, ma SOLO di notte e SOLO
  // per le condizioni che mostrano il sole (sereno / parz. nuvoloso). Le altre e
  // quelle già notturne restano invariate.
  _nightCondition(condition, datetime) {
    if (!this._isNightAt(new Date(datetime))) return condition;
    if (condition === 'sunny') return 'clear-night';
    if (condition === 'partlycloudy') return 'partlycloudy-night';
    return condition;
  }

  // Risolve la lingua scelta in un locale effettivo.
  // 'it' -> it-IT, 'en' -> en-GB, 'de' -> de-DE, 'system' -> lingua di HA/browser.
  _locale() {
    const lang = this._config.language || 'system';
    if (lang === 'it') return 'it-IT';
    if (lang === 'en') return 'en-GB';
    if (lang === 'de') return 'de-DE';
    if (lang === 'nl') return 'nl-NL';
    if (lang === 'fr') return 'fr-FR';
    // system: usa la lingua dell'utente HA, poi il browser, poi it-IT
    return (this._hass && this._hass.locale && this._hass.locale.language)
      || (this._hass && this._hass.language)
      || navigator.language
      || 'it-IT';
  }

  // Etichetta condizione meteo tradotta secondo la lingua effettiva (it/en/de).
  _conditionLabel(state) {
    const loc = (this._locale() || 'it').toLowerCase();
    const table = loc.startsWith('it') ? CONDITION_LABELS.it
      : loc.startsWith('de') ? CONDITION_LABELS.de
      : loc.startsWith('nl') ? CONDITION_LABELS.nl
      : loc.startsWith('fr') ? CONDITION_LABELS.fr
      : CONDITION_LABELS.en;
    return table[state] || state;
  }

  // Etichette dell'interfaccia (alba/tramonto sotto l'arco) nella lingua attiva.
  _uiLabels() {
    const loc = (this._locale() || 'it').toLowerCase();
    return loc.startsWith('it') ? UI_LABELS.it
      : loc.startsWith('de') ? UI_LABELS.de
      : loc.startsWith('nl') ? UI_LABELS.nl
      : loc.startsWith('fr') ? UI_LABELS.fr
      : UI_LABELS.en;
  }

  // Riduce la dimensione del testo condizione se non entra su una riga,
  // cosi' le condizioni lunghe (es. "Parzialmente nuvoloso") restano leggibili
  // senza puntini di sospensione. Le condizioni corte restano grandi.
  _fitConditionText(el) {
    if (!el) return;
    const measure = () => {
      if (!el.clientWidth) return; // non ancora nel layout
      el.style.setProperty('--swc-desc-size', '1.7em');
      let size = 1.7;
      let guard = 0;
      while (el.scrollWidth > el.clientWidth && size > 1.0 && guard < 20) {
        size -= 0.05;
        el.style.setProperty('--swc-desc-size', size.toFixed(2) + 'em');
        guard += 1;
      }
    };
    // doppio rAF: la prima volta il layout puo' non essere ancora stabile
    requestAnimationFrame(() => { measure(); requestAnimationFrame(measure); });

    // ri-misura se la card cambia larghezza (una sola volta l'osservatore)
    if (!this._descResizeObs && typeof ResizeObserver !== 'undefined') {
      this._descResizeObs = new ResizeObserver(() => {
        const e = this.shadowRoot && this.shadowRoot.getElementById('cur-desc');
        if (e) this._fitConditionText(e);
      });
      const card = this.shadowRoot.querySelector('ha-card');
      if (card) this._descResizeObs.observe(card);
    }
  }

  _renderCurrent(now) {
    const wState = this._hass.states[this._config.entity];
    if (!wState) return;

    let condition = wState.state;
    // di notte, se la condizione e' "sunny" mostriamo comunque icona notturna coerente
    const night = this._isNight(now);
    if (condition === 'sunny' && night) condition = 'clear-night';

    const temp = wState.attributes.temperature;
    const unit = wState.attributes.temperature_unit || '\u00b0';

    const numFmt = new Intl.NumberFormat(this._locale(), {
      maximumFractionDigits: 1,
    });

    // localita': override manuale, poi nome entita' meteo, poi nome posizione HA
    const location =
      this._config.location ||
      wState.attributes.friendly_name ||
      this._hass.config?.location_name ||
      '';

    // max/min di oggi dalla previsione giornaliera (se gia' caricata)
    let hilo = '';
    if (this._daily && this._daily.length) {
      const todayStr = now.toDateString();
      const todayEntry =
        this._daily.find((d) => new Date(d.datetime).toDateString() === todayStr) ||
        this._daily[0];
      if (todayEntry) {
        const hi = todayEntry.temperature;
        const lo = todayEntry.templow;
        if (hi != null && lo != null) {
          hilo = `${numFmt.format(hi)}${unit} / ${numFmt.format(lo)}${unit}`;
        }
      }
    }

    this._iconUid += 1;
    this.shadowRoot.getElementById('cur-icon').innerHTML =
      this._icon(condition, this._iconUid, 68);
    const descEl = this.shadowRoot.getElementById('cur-desc');
    descEl.textContent = this._conditionLabel(wState.state);
    this._fitConditionText(descEl);
    this.shadowRoot.getElementById('cur-location').textContent = location;
    this.shadowRoot.getElementById('cur-temp').textContent =
      temp != null ? `${numFmt.format(temp)}${unit}` : '--';
    this.shadowRoot.getElementById('cur-hilo').textContent = hilo;
  }

  // Formatta un valore per la griglia: le date/ore ISO diventano leggibili,
  // il resto resta invariato.
  _fmtValue(raw, decimals) {
    // arrotondamento opzionale a N decimali: solo su valori numerici finiti
    if (decimals != null && decimals !== '') {
      const d = Number(decimals);
      const n = typeof raw === 'number' ? raw
        : (typeof raw === 'string' && raw.trim() !== '' && isFinite(raw)) ? Number(raw)
        : null;
      if (n !== null && isFinite(n) && isFinite(d)) {
        return n.toFixed(Math.max(0, Math.min(20, Math.floor(d))));
      }
    }
    if (typeof raw === 'string') {
      // riconosce una data ISO tipo 2026-08-13T04:22:40+00:00
      const isIso = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(raw);
      if (isIso) {
        const d = new Date(raw);
        if (!isNaN(d)) {
          const loc = this._locale() || undefined;
          // rispetta il time_format della card (24/12) come il resto della card,
          // invece di lasciare il 12/24h al default del locale
          const hour12 = this._config.time_format === '12';
          const now = new Date();
          const sameDay = d.toDateString() === now.toDateString();
          // stesso giorno -> solo ora (es. 04:22); altrimenti giorno+ora breve
          return sameDay
            ? d.toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit', hour12 })
            : d.toLocaleString(loc, { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12 });
        }
      }
    }
    return raw;
  }

  // Converte i gradi bussola in sigla a 16 punti nella lingua attiva
  _bearingToText(deg) {
    const loc = (this._locale() || 'it').toLowerCase();
    const dirs = loc.startsWith('it')
      ? ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
         'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO']
      : loc.startsWith('de')
      ? ['N', 'NNO', 'NO', 'ONO', 'O', 'OSO', 'SO', 'SSO',
         'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
      : loc.startsWith('nl')
      ? ['N', 'NNO', 'NO', 'ONO', 'O', 'OZO', 'ZO', 'ZZO',
         'Z', 'ZZW', 'ZW', 'WZW', 'W', 'WNW', 'NW', 'NNW']
      : loc.startsWith('fr')
      ? ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
         'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO']
      : ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
         'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return dirs[Math.round(deg / 22.5) % 16];
  }

  _renderDetails() {
    const box = this.shadowRoot.getElementById('details');
    if (!box) return;
    const wState = this._hass.states[this._config.entity];
    if (!wState) { box.innerHTML = ''; return; }
    const a = wState.attributes;

    // valore di oggi dalla previsione giornaliera (per precipitazioni)
    let today = null;
    if (this._daily && this._daily.length) {
      const todayStr = new Date().toDateString();
      today = this._daily.find(
        (d) => new Date(d.datetime).toDateString() === todayStr
      ) || this._daily[0];
    }

    const round = (v) => Math.round(v);

    // orari alba/tramonto (per i dettagli sunrise/sunset)
    let sunriseStr = null, sunsetStr = null;
    const sunState = this._hass.states[this._config.sun_entity];
    if (sunState && sunState.attributes.next_rising) {
      const { sunrise, sunset } = this._getTodaySunTimes(sunState, new Date());
      const tFmt = new Intl.DateTimeFormat(this._locale(), {
        hour: '2-digit', minute: '2-digit',
        hour12: this._config.time_format === '12',
      });
      sunriseStr = tFmt.format(sunrise);
      sunsetStr = tFmt.format(sunset);
    }

    const defs = {
      sunrise: {
        icon: 'mdi:weather-sunset-up',
        val: sunriseStr,
      },
      sunset: {
        icon: 'mdi:weather-sunset-down',
        val: sunsetStr,
      },
      humidity: {
        icon: 'mdi:water-percent',
        val: a.humidity != null ? `${round(a.humidity)} %` : null,
      },
      pressure: {
        icon: 'mdi:gauge',
        val: a.pressure != null ? `${round(a.pressure)} ${a.pressure_unit || 'hPa'}` : null,
      },
      wind_speed: {
        icon: 'mdi:weather-windy',
        val: a.wind_speed != null ? `${round(a.wind_speed)} ${a.wind_speed_unit || 'km/h'}` : null,
      },
      wind_bearing: {
        icon: 'mdi:compass-outline',
        rotate: typeof a.wind_bearing === 'number' ? a.wind_bearing : null,
        val: a.wind_bearing != null
          ? (typeof a.wind_bearing === 'number' ? this._bearingToText(a.wind_bearing) : a.wind_bearing)
          : null,
      },
      precipitation: {
        icon: 'mdi:weather-rainy',
        val: (() => {
          let p = null;
          if (today && today.precipitation != null) p = today.precipitation;
          else if (a.precipitation != null) p = a.precipitation;
          return p != null ? `${p} ${a.precipitation_unit || 'mm'}` : null;
        })(),
      },
      precipitation_probability: {
        icon: 'mdi:weather-pouring',
        val: (() => {
          let p = null;
          if (today && today.precipitation_probability != null) p = today.precipitation_probability;
          else if (a.precipitation_probability != null) p = a.precipitation_probability;
          return p != null ? `${round(p)} %` : null;
        })(),
      },
      visibility: {
        icon: 'mdi:eye-outline',
        val: a.visibility != null ? `${round(a.visibility)} ${a.visibility_unit || 'km'}` : null,
      },
      apparent_temperature: {
        icon: 'mdi:thermometer',
        val: a.apparent_temperature != null
          ? `${round(a.apparent_temperature)}${a.temperature_unit || '\u00b0'}` : null,
      },
      cloud_coverage: {
        icon: 'mdi:cloud-percent-outline',
        val: a.cloud_coverage != null ? `${round(a.cloud_coverage)} %` : null,
      },
      uv_index: {
        icon: 'mdi:weather-sunny-alert',
        val: a.uv_index != null ? `${a.uv_index}` : null,
      },
      dew_point: {
        icon: 'mdi:water-thermometer-outline',
        val: a.dew_point != null ? `${round(a.dew_point)}${a.temperature_unit || '\u00b0'}` : null,
      },
    };

    const stdItems = (this._config.details || [])
      .map((key) => {
        const def = defs[key];
        if (!def || def.val == null) return '';
        const rot = def.rotate != null
          ? ` style="transform: rotate(${def.rotate}deg);"` : '';
        return `
          <div class="detail-item">
            <ha-icon icon="${def.icon}"${rot}></ha-icon>
            <span class="d-val">${def.val}</span>
          </div>`;
      });

    box.innerHTML = stdItems.join('');

    // sensori personalizzati: griglia separata a 2 colonne sotto gli standard.
    // Il nome puo' essere mostrato sotto il valore (show_sensor_names, default ON)
    // oppure solo al tocco/hover (tooltip).
    const cbox = this.shadowRoot.getElementById('custom-details');
    if (cbox) {
      // toggle "Adattamento testo": ON = flusso a sinistra, OFF (default) = griglia
      cbox.classList.toggle('flow', this._config.custom_details_flow === true);
      const showNames = this._config.show_sensor_names === true;
      const customItems = (this._config.custom_details || [])
        .map((c) => {
          if (!c || !c.entity) return '';
          const st = this._hass.states[c.entity];
          if (!st) return '';
          let raw, unit;
          if (c.attribute) {
            raw = st.attributes[c.attribute];
            if (raw == null) return '';
            unit = '';
          } else {
            raw = st.state;
            unit = st.attributes.unit_of_measurement || '';
          }
          const val = `${this._fmtValue(raw, c.decimals)}${unit ? ' ' + unit : ''}`;
          // icona davvero opzionale: se il campo e' vuoto non si mostra nulla
          const iconHtml = c.icon ? `<ha-icon icon="${c.icon}"></ha-icon>` : '';
          // etichetta sotto il valore: nome opzionale se c'e', altrimenti
          // friendly name + attributo (reso leggibile), cosi' due voci sulla
          // stessa entita' con attributi diversi non escono uguali
          let name;
          if (c.name) {
            name = c.name;
          } else {
            const friendly = st.attributes.friendly_name || c.entity;
            if (c.attribute) {
              const attr = c.attribute.replace(/_/g, ' ').replace(/^./, (ch) => ch.toUpperCase());
              name = `${friendly} ${attr}`;
            } else {
              name = friendly;
            }
          }
          const nameHtml = showNames ? `<span class="cd-name">${name}</span>` : '';
          // il tooltip al tocco serve solo quando i nomi NON sono mostrati sotto
          const tipAttrs = showNames ? '' : ` title="${name}" data-name="${name}"`;
          const tipClass = showNames ? '' : ' has-tip';
          return `
            <div class="custom-item${tipClass}"${tipAttrs}>
              <div class="cd-row">
                ${iconHtml}
                <span class="d-val">${val}</span>
              </div>
              ${nameHtml}
            </div>`;
        });
      cbox.innerHTML = customItems.join('');
      cbox.style.display = customItems.some((x) => x) ? '' : 'none';
      this._wireDetailTips(cbox);
    }
  }

  // mostra il nome al tocco (mobile) sui dettagli custom, oltre al tooltip hover
  _wireDetailTips(box) {
    box.querySelectorAll('.has-tip').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const name = el.dataset.name;
        if (!name) return;
        // rimuovi eventuale tip precedente
        const old = box.querySelector('.detail-tip');
        if (old) old.remove();
        const tip = document.createElement('div');
        tip.className = 'detail-tip';
        tip.textContent = name;
        el.appendChild(tip);
        // sparisce dopo 2 secondi
        setTimeout(() => tip.remove(), 2000);
      });
    });
  }

  _getTodaySunTimes(sunState, now) {
    const nextRising = new Date(sunState.attributes.next_rising);
    const nextSetting = new Date(sunState.attributes.next_setting);
    const DAY_MS = 24 * 60 * 60 * 1000;
    let sunrise, sunset;

    if (sunState.state === 'above_horizon') {
      sunset = nextSetting;
      sunrise = new Date(nextRising.getTime() - DAY_MS);
    } else if (now.getHours() < 12) {
      sunrise = nextRising;
      sunset = nextSetting;
    } else {
      sunrise = new Date(nextRising.getTime() - DAY_MS);
      sunset = new Date(nextSetting.getTime() - DAY_MS);
    }
    return { sunrise, sunset };
  }

  _renderSunArc(now) {
    const svg = this.shadowRoot.getElementById('arc-svg');
    const sunState = this._hass.states[this._config.sun_entity];
    if (!sunState || !sunState.attributes.next_rising) {
      svg.innerHTML = '';
      return;
    }

    const { sunrise, sunset } = this._getTodaySunTimes(sunState, now);
    const total = sunset - sunrise;
    let fraction = total > 0 ? (now - sunrise) / total : 0;
    const isDaytime = fraction >= 0 && fraction <= 1;
    fraction = Math.min(1, Math.max(0, fraction));

    // geometria arco: curva bezier quadratica che entra nell'orizzonte
    // con angolo dolce (estremi "a punta") dentro viewBox 240 x 64
    const cx = 120, cy = 46, rx = 100, peak = 34;
    const x0 = cx - rx;      // punto alba (sinistra, sull'orizzonte)
    const x2 = cx + rx;      // punto tramonto (destra, sull'orizzonte)
    const ctrlY = cy - peak * 2; // punto di controllo: peak reale = meta'

    // posizione del sole lungo la bezier al parametro t = frazione di giornata
    const t = fraction;
    const mt = 1 - t;
    const sx = mt * mt * x0 + 2 * mt * t * cx + t * t * x2;
    const sy = mt * mt * cy + 2 * mt * t * ctrlY + t * t * cy;

    const timeFmt = new Intl.DateTimeFormat(this._locale(), {
      hour: '2-digit',
      minute: '2-digit',
      hour12: this._config.time_format === '12',
    });

    const dotClass = isDaytime ? 'sun-dot' : 'moon-dot';
    const L = this._uiLabels();

    svg.innerHTML = `
      <path class="arc-path" d="M ${x0} ${cy} Q ${cx} ${ctrlY} ${x2} ${cy}" />
      <line class="horizon-line" x1="${x0 - 6}" y1="${cy}" x2="${x2 + 6}" y2="${cy}" />
      <circle class="${dotClass}" cx="${sx}" cy="${sy}" r="7" />
      <text class="sun-time-label" x="${x0}" y="${cy + 15}" text-anchor="middle">${timeFmt.format(sunrise)}</text>
      <text class="sun-time-sub"   x="${x0}" y="${cy + 26}" text-anchor="middle">${L.sunrise}</text>
      <text class="sun-time-label" x="${x2}" y="${cy + 15}" text-anchor="middle">${timeFmt.format(sunset)}</text>
      <text class="sun-time-sub"   x="${x2}" y="${cy + 26}" text-anchor="middle">${L.sunset}</text>
    `;
  }

  async _fetchForecast(type) {
    try {
      const response = await this._hass.callWS({
        type: 'call_service',
        domain: 'weather',
        service: 'get_forecasts',
        service_data: { type },
        target: { entity_id: this._config.entity },
        return_response: true,
      });
      const entry = response?.response?.[this._config.entity];
      return entry?.forecast || [];
    } catch (e) {
      // fallback: solo il daily e' esposto come attributo su vecchie integrazioni
      if (type === 'daily') {
        const state = this._hass.states[this._config.entity];
        return state?.attributes?.forecast || [];
      }
      return [];
    }
  }

  async _maybeFetchForecast() {
    const now = Date.now();
    const CACHE = 20 * 60 * 1000;

    // il daily serve sempre (intestazione max/min + dettagli di oggi)
    if (!this._daily || now - this._dailyFetchedAt >= CACHE) {
      this._dailyFetchedAt = now;
      this._daily = await this._fetchForecast('daily');
      this._renderCurrent(new Date());
      this._renderDetails();
    }

    // l'hourly si carica solo quando serve
    if (this._forecastMode === 'hourly'
        && (!this._hourly || now - this._hourlyFetchedAt >= CACHE)) {
      this._hourlyFetchedAt = now;
      this._hourly = await this._fetchForecast('hourly');
    }

    this._updateToggleUI();
    this._renderForecast();
  }

  _renderForecast() {
    const scroll = this.shadowRoot.getElementById('forecast-scroll');
    const graph = this._config.forecast_layout === 'graph';
    if (graph) {
      if (scroll) scroll.classList.add('graph-mode');
      if (this._forecastMode === 'hourly') this._renderForecastGraph(true);
      else this._renderForecastGraph(false);
    } else if (this._forecastMode === 'hourly') {
      if (scroll) scroll.classList.remove('graph-mode');
      this._renderForecastHourly();
    } else {
      if (scroll) scroll.classList.remove('graph-mode');
      this._renderForecastDaily();
    }
  }

  _renderForecastDaily() {
    const list = this.shadowRoot.getElementById('forecast-scroll');
    if (!list || !this._daily || !this._daily.length) return;

    const days = this._daily.slice(0, this._config.forecast_days);
    const dayFmt = new Intl.DateTimeFormat(this._locale(), { weekday: 'short' });

    const lows = days.map((d) => d.templow).filter((v) => v != null);
    const highs = days.map((d) => d.temperature).filter((v) => v != null);
    const globalMin = Math.min(...lows, ...highs);
    const globalMax = Math.max(...lows, ...highs);
    const span = Math.max(globalMax - globalMin, 1);

    // temperatura attuale dall'entita' weather, per il pallino su "oggi"
    const wState = this._hass.states[this._config.entity];
    const currentTemp = wState?.attributes?.temperature;
    const precipUnit = wState?.attributes?.precipitation_unit || 'mm';
    const showPrecip = this._config.show_forecast_precipitation;
    const todayStr = new Date().toDateString();

    list.innerHTML = days
      .map((d) => {
        const date = new Date(d.datetime);
        const label = dayFmt.format(date);
        const low = d.templow != null ? d.templow : d.temperature;
        const high = d.temperature;
        const leftPct = ((low - globalMin) / span) * 100;
        const widthPct = Math.max(((high - low) / span) * 100, 8);
        const colorLow = this._tempToColor(low);
        const colorHigh = this._tempToColor(high);

        // pallino temperatura attuale: solo sulla riga di oggi
        let dotHtml = '';
        if (
          currentTemp != null &&
          date.toDateString() === todayStr
        ) {
          const clampedTemp = Math.min(Math.max(currentTemp, globalMin), globalMax);
          const dotPct = ((clampedTemp - globalMin) / span) * 100;
          dotHtml = `<div class="bar-dot" style="left:${dotPct}%;"></div>`;
        }

        this._iconUid += 1;
        const icon = this._icon(d.condition, this._iconUid, 28);

        // mm di pioggia previsti per il giorno (se presenti e > 0)
        const hasPrecip = showPrecip && d.precipitation != null && d.precipitation > 0;
        const precipHtml = hasPrecip
          ? `<span class="f-precip">${d.precipitation} ${precipUnit}</span>`
          : '';

        return `
          <div class="forecast-row">
            <div class="label">${label}</div>
            <div class="icon-wrap">${icon}</div>
            <div class="temp-min">${Math.round(low)}\u00b0</div>
            <div class="bar-track">
              <div class="bar-fill" style="left:${leftPct}%; width:${widthPct}%; background:linear-gradient(to right, ${colorLow}, ${colorHigh});"></div>
              ${dotHtml}
            </div>
            <div class="temp-group">
              <span class="temp-max">${Math.round(high)}\u00b0</span>
              ${precipHtml}
            </div>
          </div>
        `;
      })
      .join('');

    this._applyScroll(list, days.length);
  }

  _renderForecastHourly() {
    const list = this.shadowRoot.getElementById('forecast-scroll');
    if (!list) return;
    const hours = (this._hourly || []).slice(0, this._config.forecast_hours);
    if (!hours.length) {
      list.innerHTML = '';
      return;
    }

    const temps = hours.map((h) => h.temperature).filter((v) => v != null);
    const globalMin = Math.min(...temps);
    const globalMax = Math.max(...temps);
    const span = Math.max(globalMax - globalMin, 1);

    const hourFmt = new Intl.DateTimeFormat(this._locale(), {
      hour: 'numeric',
      hour12: this._config.time_format === '12',
    });

    list.innerHTML = hours
      .map((h) => {
        const date = new Date(h.datetime);
        const label = hourFmt.format(date);
        const t = h.temperature;
        // barra come "livello" di temperatura sul range delle ore mostrate
        const widthPct = Math.max(((t - globalMin) / span) * 100, 6);
        const color = this._tempToColor(t);

        this._iconUid += 1;
        const icon = this._icon(this._nightCondition(h.condition, h.datetime), this._iconUid, 28);

        return `
          <div class="forecast-row hourly">
            <div class="label">${label}</div>
            <div class="icon-wrap">${icon}</div>
            <div class="bar-track">
              <div class="bar-fill" style="left:0%; width:${widthPct}%; background:${color};"></div>
            </div>
            <div class="temp-max">${Math.round(t)}\u00b0</div>
          </div>
        `;
      })
      .join('');

    this._applyScroll(list, hours.length);
  }

  // Estende una serie di punti fino ai bordi (x=0 e x=w) prolungando
  // leggermente la pendenza iniziale/finale, cosi' la linea entra ed esce
  // dai bordi (poi la maschera la sfuma).
  _extendToEdges(pts, w) {
    if (!pts || pts.length < 2) return pts || [];
    const first = pts[0], second = pts[1];
    const last = pts[pts.length - 1], prev = pts[pts.length - 2];
    // pendenza agli estremi
    const slopeL = (second[1] - first[1]) / (second[0] - first[0] || 1);
    const slopeR = (last[1] - prev[1]) / (last[0] - prev[0] || 1);
    const startY = first[1] - slopeL * first[0];
    const endY = last[1] + slopeR * (w - last[0]);
    return [[0, startY], ...pts, [w, endY]];
  }

  // Grafico orizzontale. hourly=false: due linee max/min per giorno.
  // hourly=true: una linea temperatura per ora, con l'ora sotto.
  _renderForecastGraph(hourly) {
    const list = this.shadowRoot.getElementById('forecast-scroll');
    const source = hourly ? this._hourly : this._daily;
    if (!list || !source || !source.length) return;

    const days = source.slice(0, hourly ? this._config.forecast_hours : this._config.forecast_days);
    const dayFmt = new Intl.DateTimeFormat(this._locale(), { weekday: 'short' });
    const hourFmt = new Intl.DateTimeFormat(this._locale(), {
      hour: 'numeric',
      hour12: this._config.time_format === '12',
    });
    const colLabel = (d) => hourly
      ? hourFmt.format(new Date(d.datetime))
      : dayFmt.format(new Date(d.datetime));

    const wState = this._hass.states[this._config.entity];
    const precipUnit = wState?.attributes?.precipitation_unit || 'mm';
    const showPrecip = this._config.show_forecast_precipitation && !hourly;

    const highs = days.map((d) => d.temperature).filter((v) => v != null);
    const lows = hourly
      ? highs
      : days.map((d) => (d.templow != null ? d.templow : d.temperature)).filter((v) => v != null);
    const gMax = Math.max(...highs);
    const gMin = Math.min(...lows);
    const span = Math.max(gMax - gMin, 1);

    // quanti giorni restano visibili senza scorrere:
    // - se "visible_rows" e' impostato: quel numero di giorni riempie la card,
    //   il resto si raggiunge con lo scroll.
    // - se vuoto: tutti i giorni caricati vengono adattati alla larghezza
    //   della card (niente scroll, niente colonne tagliate).
    const visible = this._config.visible_rows;
    let col = 64;
    const cs = getComputedStyle(list);
    const padL = parseFloat(cs.paddingLeft) || 0;
    const padR = parseFloat(cs.paddingRight) || 0;
    const cw = list.clientWidth - padL - padR;
    if (cw > 0) {
      // divisore: giorni visibili impostati, oppure tutti i giorni caricati
      const divisor = visible || days.length;
      // arrotonda per difetto cosi' non sbava mezza colonna in piu'
      col = Math.max(Math.floor((cw / divisor) * 100) / 100, 40);
    } else {
      // primo paint: larghezza non ancora nota, ridisegna dopo il layout
      requestAnimationFrame(() => this._renderForecastGraph(hourly));
    }
    const w = days.length * col;
    const yDay = 14;                // etichetta giorno/ora
    const yIcon = 24;              // riga icone (top del box icona)
    const iconSize = 26;
    const maxLabelH = hourly ? 18 : 26;   // spazio icone -> valore max (piu' aria nel daily)
    const bandTop = yIcon + iconSize + maxLabelH;
    const bandH = hourly ? 34 : 42; // banda temperature (piu' bassa per l'oraria)
    const minLabelH = hourly ? 6 : 20;
    const hasPrecipRow = showPrecip && days.some((d) => d.precipitation != null && d.precipitation > 0);
    const precipH = hasPrecipRow ? 12 : 0;
    const h = bandTop + bandH + minLabelH + precipH + 6;

    const x = (i) => i * col + col / 2;
    const yT = (t) => bandTop + (1 - (t - gMin) / span) * bandH;

    const ptsMax = days.map((d, i) => [x(i), yT(d.temperature)]);
    const ptsMin = hourly ? [] : days.map((d, i) => {
      const lo = d.templow != null ? d.templow : d.temperature;
      return [x(i), yT(lo)];
    });

    // path con curve morbide (Catmull-Rom -> Bézier)
    const smooth = (pts) => {
      if (pts.length < 2) return pts.length ? `M ${pts[0][0]} ${pts[0][1]}` : '';
      let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] || pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] || p2;
        const t = 0.16;
        const c1x = p1[0] + (p2[0] - p0[0]) * t;
        const c1y = p1[1] + (p2[1] - p0[1]) * t;
        const c2x = p2[0] - (p3[0] - p1[0]) * t;
        const c2y = p2[1] - (p3[1] - p1[1]) * t;
        d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
      }
      return d;
    };

    const lineMax = smooth(this._extendToEdges(ptsMax, w));
    const lineMin = hourly ? '' : smooth(this._extendToEdges(ptsMin, w));
    // area sfumata sotto la linea max (segue la linea estesa fino ai bordi)
    const areaBottom = bandTop + bandH + 2;
    const areaMax = `${lineMax} L ${w} ${areaBottom} L 0 ${areaBottom} Z`;

    const dayLabels = days.map((d, i) =>
      `<text class="g-day" x="${x(i)}" y="${yDay}" text-anchor="middle">${colLabel(d)}</text>`
    ).join('');

    const icons = days.map((d, i) => {
      this._iconUid += 1;
      const cond = hourly ? this._nightCondition(d.condition, d.datetime) : d.condition;
      const svg = this._icon(cond, this._iconUid, iconSize);
      return `<g transform="translate(${x(i) - iconSize / 2}, ${yIcon})">${svg}</g>`;
    }).join('');

    const maxLabels = days.map((d, i) => {
      const [px, py] = ptsMax[i];
      return `<text class="g-tmax" x="${px}" y="${py - 9}" text-anchor="middle">${Math.round(d.temperature)}\u00b0</text>`;
    }).join('');

    const minLabels = hourly ? '' : days.map((d, i) => {
      const [px, py] = ptsMin[i];
      const lo = d.templow != null ? d.templow : d.temperature;
      return `<text class="g-tmin" x="${px}" y="${py + 17}" text-anchor="middle">${Math.round(lo)}\u00b0</text>`;
    }).join('');

    const precipLabels = hasPrecipRow ? days.map((d, i) => {
      if (d.precipitation == null || d.precipitation <= 0) return '';
      return `<text class="g-precip" x="${x(i)}" y="${h - 6}" text-anchor="middle">${d.precipitation} ${precipUnit}</text>`;
    }).join('') : '';

    const dotsMax = ptsMax.map((p) => `<circle class="g-dot-max" cx="${p[0]}" cy="${p[1]}" r="3" />`).join('');
    const dotsMin = hourly ? '' : ptsMin.map((p) => `<circle class="g-dot-min" cx="${p[0]}" cy="${p[1]}" r="3" />`).join('');

    const lineMinSvg = hourly ? '' : `<path class="g-line-min" d="${lineMin}" />`;

    list.innerHTML = `
      <svg class="fc-graph" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMinYMid meet">
        <defs>
          <linearGradient id="gMaxArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ff7a59" stop-opacity="0.28"/>
            <stop offset="100%" stop-color="#ff7a59" stop-opacity="0"/>
          </linearGradient>
        </defs>
        ${dayLabels}
        ${icons}
        <path class="g-area-max" d="${areaMax}" />
        <path class="g-line-max" d="${lineMax}" />
        ${lineMinSvg}
        ${dotsMax}${dotsMin}
        ${maxLabels}${minLabels}
        ${precipLabels}
      </svg>
    `;
    list.style.maxHeight = 'none';
  }

  // Limita l'altezza del contenitore a "visible_rows" righe, il resto scrolla
  _applyScroll(list, totalRows) {
    const vr = this._config.visible_rows;
    if (!vr || totalRows <= vr) {
      list.style.maxHeight = 'none';
      return;
    }
    // misura dopo il paint per avere altezze reali
    requestAnimationFrame(() => {
      const rows = list.querySelectorAll('.forecast-row');
      if (!rows.length) return;
      const gap = 8;
      let h = 0;
      for (let i = 0; i < Math.min(vr, rows.length); i++) {
        h += rows[i].offsetHeight;
        if (i < vr - 1) h += gap;
      }
      list.style.maxHeight = `${h}px`;
    });
  }

  _tempToColor(t) {
    const clamped = Math.min(Math.max(t, -10), 35);
    const hue = 235 - ((clamped + 10) / 45) * 235;
    return `hsl(${hue}, 85%, 55%)`;
  }

  _cloudPath() {
    return 'M5 18a3.6 3.6 0 0 1 .4-7.18A5 5 0 0 1 15.4 9.4a3.4 3.4 0 0 1 -.4 8.6H5z';
  }

  _icon(condition, uid, size) {
    const map = {
      sunny: () => this._iconSunny(uid, size),
      'clear-night': () => this._iconClearNight(uid, size),
      partlycloudy: () => this._iconPartlyCloudy(uid, size),
      'partlycloudy-night': () => this._iconPartlyCloudyNight(uid, size),
      cloudy: () => this._iconCloudy(uid, size),
      fog: () => this._iconFog(uid, size),
      windy: () => this._iconWindy(uid, size),
      'windy-variant': () => this._iconWindy(uid, size),
      rainy: () => this._iconRain(uid, size, 3),
      pouring: () => this._iconRain(uid, size, 5),
      hail: () => this._iconHail(uid, size),
      snowy: () => this._iconSnow(uid, size),
      'snowy-rainy': () => this._iconSnow(uid, size),
      lightning: () => this._iconLightning(uid, size, false),
      'lightning-rainy': () => this._iconLightning(uid, size, true),
      exceptional: () => this._iconExceptional(uid, size),
    };
    const fn = map[condition] || map.cloudy;
    let svg = fn();
    // se le animazioni sono disattivate, rimuovi i tag SMIL (icone statiche)
    if (this._config && this._config.animated_icons === false) {
      svg = svg.replace(/<animateTransform\b[^>]*\/>/g, '')
               .replace(/<animate\b[^>]*\/>/g, '');
      // gli elementi animati in opacita' partono invisibili (opacity="0"):
      // senza animazione resterebbero nascosti, quindi li rendo visibili.
      // Le opacita' parziali (0.3, 0.7...) sono scelte estetiche: non si toccano.
      svg = svg.replace(/opacity="0"/g, 'opacity="1"');
    }
    return svg;
  }

  _iconSunny(uid, size) {
    return `
      <svg viewBox="0 0 24 24" width="${size}" height="${size}">
        <g stroke="#ffb703" stroke-width="1.6" stroke-linecap="round">
          <g>
            <line x1="12" y1="1" x2="12" y2="4"/>
            <line x1="12" y1="20" x2="12" y2="23"/>
            <line x1="1" y1="12" x2="4" y2="12"/>
            <line x1="20" y1="12" x2="23" y2="12"/>
            <line x1="4.2" y1="4.2" x2="6.3" y2="6.3"/>
            <line x1="17.7" y1="17.7" x2="19.8" y2="19.8"/>
            <line x1="4.2" y1="19.8" x2="6.3" y2="17.7"/>
            <line x1="17.7" y1="6.3" x2="19.8" y2="4.2"/>
            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="24s" repeatCount="indefinite"/>
          </g>
        </g>
        <circle cx="12" cy="12" r="5" fill="#ffb703"/>
      </svg>
    `;
  }

  _iconClearNight(uid, size) {
    return `
      <svg viewBox="0 0 24 24" width="${size}" height="${size}">
        <path d="M15 3a9 9 0 1 0 6 15.9A9 9 0 0 1 15 3z" fill="#a9b6d6"/>
        <circle cx="6" cy="6" r="0.9" fill="#fff">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="9" cy="4" r="0.7" fill="#fff">
          <animate attributeName="opacity" values="1;0.2;1" dur="2.4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="4" cy="10" r="0.6" fill="#fff">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite"/>
        </circle>
      </svg>
    `;
  }

  _iconPartlyCloudy(uid, size) {
    return `
      <svg viewBox="0 0 24 24" width="${size}" height="${size}">
        <g>
          <g stroke="#ffb703" stroke-width="1.3" stroke-linecap="round">
            <line x1="8" y1="1.5" x2="8" y2="3.5"/>
            <line x1="1.5" y1="8" x2="3.5" y2="8"/>
            <line x1="3.4" y1="3.4" x2="4.8" y2="4.8"/>
            <line x1="12.6" y1="3.4" x2="11.2" y2="4.8"/>
            <animateTransform attributeName="transform" type="rotate" from="0 8 8" to="360 8 8" dur="28s" repeatCount="indefinite"/>
          </g>
          <circle cx="8" cy="8" r="3.4" fill="#ffb703"/>
        </g>
        <g>
          <path d="${this._cloudPath()}" fill="#b8c2d0" transform="translate(3,4)"/>
          <animateTransform attributeName="transform" type="translate" values="-1 0;1 0;-1 0" dur="6s" repeatCount="indefinite"/>
        </g>
      </svg>
    `;
  }

  _iconPartlyCloudyNight(uid, size) {
    return `
      <svg viewBox="0 0 24 24" width="${size}" height="${size}">
        <g>
          <path d="M15 3a9 9 0 1 0 6 15.9A9 9 0 0 1 15 3z" fill="#a9b6d6" transform="translate(2.6 3.4) scale(0.4)"/>
        </g>
        <g>
          <path d="${this._cloudPath()}" fill="#b8c2d0" transform="translate(3,4)"/>
          <animateTransform attributeName="transform" type="translate" values="-1 0;1 0;-1 0" dur="6s" repeatCount="indefinite"/>
        </g>
      </svg>
    `;
  }

  _iconCloudy(uid, size) {
    return `
      <svg viewBox="0 0 24 24" width="${size}" height="${size}">
        <g>
          <path d="${this._cloudPath()}" fill="#9aa7b8" transform="translate(-3,-2) scale(0.85)"/>
          <animateTransform attributeName="transform" type="translate" values="-1 0;0.5 0;-1 0" dur="7s" repeatCount="indefinite"/>
        </g>
        <g>
          <path d="${this._cloudPath()}" fill="#c3cbd6"/>
          <animateTransform attributeName="transform" type="translate" values="0.5 0;-1 0;0.5 0" dur="5s" repeatCount="indefinite"/>
        </g>
      </svg>
    `;
  }

  _iconFog(uid, size) {
    const lines = [7, 11, 15, 19].map((y, i) => `
      <line x1="2" y1="${y}" x2="22" y2="${y}" stroke="#9aa7b8" stroke-width="1.8" stroke-linecap="round">
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="${3 + i * 0.4}s" repeatCount="indefinite"/>
      </line>
    `).join('');
    return `<svg viewBox="0 0 24 24" width="${size}" height="${size}">${lines}</svg>`;
  }

  _iconWindy(uid, size) {
    return `
      <svg viewBox="0 0 24 24" width="${size}" height="${size}">
        <path d="M2 8h13a2.5 2.5 0 1 0 -2.4-3.2" fill="none" stroke="#9aa7b8" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M2 13h17a2.5 2.5 0 1 1 -2.4 3.2" fill="none" stroke="#b8c2d0" stroke-width="1.6" stroke-linecap="round"/>
        <line x1="2" y1="19" x2="14" y2="19" stroke="#c3cbd6" stroke-width="1.6" stroke-linecap="round"/>
      </svg>
    `;
  }

  _iconRain(uid, size, drops) {
    const lines = Array.from({ length: drops }).map((_, i) => {
      const x = 6 + i * ((14) / (drops - 1 || 1));
      const delay = (i * 0.25).toFixed(2);
      return `
        <line x1="${x}" y1="13" x2="${x - 1.5}" y2="18" stroke="#4d9de0" stroke-width="1.6" stroke-linecap="round" opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="1s" begin="${delay}s" repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="translate" values="0 -3;0 3" dur="1s" begin="${delay}s" repeatCount="indefinite"/>
        </line>
      `;
    }).join('');
    return `
      <svg viewBox="0 0 24 24" width="${size}" height="${size}">
        <path d="${this._cloudPath()}" fill="#9aa7b8" transform="translate(0,-3)"/>
        ${lines}
      </svg>
    `;
  }

  _iconHail(uid, size) {
    const dots = [7, 11, 15].map((x, i) => `
      <circle cx="${x}" cy="14" r="1.3" fill="#a9c4e0" opacity="0">
        <animate attributeName="opacity" values="0;1;0" dur="1.1s" begin="${i * 0.3}s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" values="0 -2;0 5" dur="1.1s" begin="${i * 0.3}s" repeatCount="indefinite"/>
      </circle>
    `).join('');
    return `
      <svg viewBox="0 0 24 24" width="${size}" height="${size}">
        <path d="${this._cloudPath()}" fill="#9aa7b8" transform="translate(0,-3)"/>
        ${dots}
      </svg>
    `;
  }

  _iconSnow(uid, size) {
    const flakes = [6, 11, 16].map((x, i) => `
      <circle cx="${x}" cy="13" r="1.2" fill="#e3ecf7" opacity="0">
        <animate attributeName="opacity" values="0;1;0" dur="2.2s" begin="${i * 0.5}s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" values="0 -2;2 6" dur="2.2s" begin="${i * 0.5}s" repeatCount="indefinite"/>
      </circle>
    `).join('');
    return `
      <svg viewBox="0 0 24 24" width="${size}" height="${size}">
        <path d="${this._cloudPath()}" fill="#b8c2d0" transform="translate(0,-3)"/>
        ${flakes}
      </svg>
    `;
  }

  _iconLightning(uid, size, withRain) {
    const rain = withRain ? `
      <line x1="7" y1="14" x2="5.5" y2="18" stroke="#4d9de0" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>
    ` : '';
    return `
      <svg viewBox="0 0 24 24" width="${size}" height="${size}">
        <path d="${this._cloudPath()}" fill="#8b96a8" transform="translate(0,-3)"/>
        ${rain}
        <path d="M13 12l-4 6h3l-1 4 5-7h-3z" fill="#ffd23f" opacity="0.3">
          <animate attributeName="opacity" values="0.3;1;0.3;0.3;1;0.3" dur="2.4s" repeatCount="indefinite"/>
        </path>
      </svg>
    `;
  }

  _iconExceptional(uid, size) {
    return `
      <svg viewBox="0 0 24 24" width="${size}" height="${size}">
        <path d="M12 2 L22 20 L2 20 Z" fill="none" stroke="#e8590c" stroke-width="1.6" stroke-linejoin="round"/>
        <line x1="12" y1="9" x2="12" y2="14" stroke="#e8590c" stroke-width="1.6" stroke-linecap="round"/>
        <circle cx="12" cy="17" r="1" fill="#e8590c"/>
      </svg>
    `;
  }

  getCardSize() {
    return 5;
  }

  static getConfigElement() {
    return document.createElement('sun-weather-card-editor');
  }

  static getStubConfig(hass) {
    // propone la prima entita' weather trovata
    let entity = 'weather.forecast_home';
    if (hass && hass.states) {
      const w = Object.keys(hass.states).find((e) => e.startsWith('weather.'));
      if (w) entity = w;
    }
    return {
      entity,
      sun_entity: 'sun.sun',
      forecast_type: 'daily',
      forecast_days: 7,
      details: ['humidity', 'wind_bearing', 'pressure', 'wind_speed'],
    };
  }
}

customElements.define('sun-weather-card', SunWeatherCard);

/* =========================================================================
 * Editor UI: sun-weather-card-editor  (HTML puro, affidabile)
 * ========================================================================= */

const ALL_DETAILS = [
  ['humidity', 'Humidity'],
  ['pressure', 'Pressure'],
  ['wind_speed', 'Wind speed'],
  ['wind_bearing', 'Wind direction'],
  ['precipitation', 'Precipitation (mm)'],
  ['precipitation_probability', 'Precip. probability'],
  ['sunrise', 'Sunrise'],
  ['sunset', 'Sunset'],
  ['visibility', 'Visibility'],
  ['apparent_temperature', 'Apparent temp.'],
  ['cloud_coverage', 'Cloud coverage'],
  ['uv_index', 'UV index'],
  ['dew_point', 'Dew point'],
];
const DETAIL_LABELS = Object.fromEntries(ALL_DETAILS);

// Traduzioni dell'editor (it/en). L'editor segue la lingua di Home Assistant.
const EDITOR_I18N = {
  en: {
    entities: 'Entities',
    weather_entity: 'Weather entity',
    sun_entity: 'Sun entity (sunrise/sunset arc)',
    appearance: 'Appearance',
    location: 'Location name (empty = automatic)',
    language: 'Language',
    lang_system: 'System', lang_it: 'Italiano', lang_en: 'English', lang_de: 'Deutsch', lang_nl: 'Nederlands', lang_fr: 'Français',
    time_format: 'Time format',
    tf_24: '24 hours', tf_12: '12 hours',
    show_time: 'Show time',
    show_date: 'Show date',
    show_arc: 'Show sun arc',
    animated_icons: 'Animated icons',
    transparent: 'Transparent background',
    background_image: 'Background image (URL or /local/… path)',
    overlay: 'Overlay: lighter ⟵ none ⟶ darker',
    ov_lighter: 'Lighter', ov_zero: '0', ov_darker: 'Darker',
    forecast: 'Forecast',
    forecast_type: 'Forecast type',
    ft_daily: 'Daily', ft_hourly: 'Hourly',
    daily_layout: 'Daily layout',
    dl_bars: 'Bars', dl_graph: 'Graph (lines)',
    days_to_load: 'Days to load',
    hours_to_load: 'Hours to load',
    visible_rows: 'Visible days (empty = all)',
    show_rain: 'Show daily rain (mm)',
    show_toggle: 'Daily/Hourly toggle in card',
    details: 'Details',
    details_hint: 'Add attributes below. Drag the chips to reorder. Tap ✕ to remove.',
    custom_sensors: 'Custom sensors',
    custom_sensors_hint: 'Show any sensor entity in the details grid. Pick a sensor and optionally set a name and icon.',
    show_sensor_names: 'Show names under sensors',
    cs_fit_text: 'Fit to text',
    add_sensor: 'Add sensor',
    cs_entity: 'Sensor entity',
    cs_attribute: 'Attribute (optional)',
    cs_pick: 'Select a sensor…',
    cs_name: 'Name (optional)',
    cs_name_ph: 'e.g. Reliability',
    cs_icon: 'Icon (optional)',
    cs_decimals: 'Decimals (optional)',
    cs_title: 'Sensor',
    cs_remove: 'Remove',
    cs_empty: 'No custom sensors yet.',
    details_empty: 'No details yet. Add attributes below.',
    all_added: '— all added —',
    interaction: 'Interaction',
    tap_behavior: 'Tap behavior',
    hold_behavior: 'Hold behavior',
    double_tap_behavior: 'Double tap behavior',
    nav_path: 'Navigation path',
    url_label: 'URL',
    action_srv: 'Action (domain.service)',
    act_more_info: 'Entity info', act_navigate: 'Navigate', act_url: 'URL',
    act_perform: 'Perform action', act_toggle: 'Toggle', act_none: 'Nothing',
    det_humidity: 'Humidity', det_pressure: 'Pressure', det_wind_speed: 'Wind speed',
    det_wind_bearing: 'Wind direction', det_precipitation: 'Precipitation (mm)',
    det_precipitation_probability: 'Precip. probability', det_sunrise: 'Sunrise',
    det_sunset: 'Sunset', det_visibility: 'Visibility',
    det_apparent_temperature: 'Apparent temp.', det_cloud_coverage: 'Cloud coverage',
    det_uv_index: 'UV index', det_dew_point: 'Dew point',
  },
  it: {
    entities: 'Entità',
    weather_entity: 'Entità meteo',
    sun_entity: 'Entità sole (arco alba/tramonto)',
    appearance: 'Aspetto',
    location: 'Nome località (vuoto = automatico)',
    language: 'Lingua',
    lang_system: 'Sistema', lang_it: 'Italiano', lang_en: 'English', lang_de: 'Deutsch', lang_nl: 'Nederlands', lang_fr: 'Français',
    time_format: 'Formato ora',
    tf_24: '24 ore', tf_12: '12 ore',
    show_time: 'Mostra orario',
    show_date: 'Mostra data',
    show_arc: 'Mostra arco del sole',
    animated_icons: 'Icone animate',
    transparent: 'Sfondo trasparente',
    background_image: 'Immagine di sfondo (URL o percorso /local/…)',
    overlay: 'Velo: più chiaro ⟵ niente ⟶ più scuro',
    ov_lighter: 'Chiaro', ov_zero: '0', ov_darker: 'Scuro',
    forecast: 'Previsioni',
    forecast_type: 'Tipo previsione',
    ft_daily: 'Giornaliera', ft_hourly: 'Oraria',
    daily_layout: 'Layout giornaliero',
    dl_bars: 'Barre', dl_graph: 'Grafico (linee)',
    days_to_load: 'Giorni da caricare',
    hours_to_load: 'Ore da caricare',
    visible_rows: 'Giorni visibili (vuoto = tutte)',
    show_rain: 'Mostra pioggia giornaliera (mm)',
    show_toggle: 'Interruttore Giorni/Ore nella card',
    details: 'Dettagli',
    details_hint: 'Aggiungi attributi qui sotto. Trascina i chip per riordinare. Tocca ✕ per rimuovere.',
    custom_sensors: 'Sensori personalizzati',
    custom_sensors_hint: 'Mostra qualsiasi entità sensore nella griglia dei dettagli. Scegli un sensore e, se vuoi, imposta nome e icona.',
    show_sensor_names: 'Mostra i nomi sotto i sensori',
    cs_fit_text: 'Adattamento testo',
    add_sensor: 'Aggiungi sensore',
    cs_entity: 'Entità sensore',
    cs_attribute: 'Attributo (opzionale)',
    cs_pick: 'Seleziona un sensore…',
    cs_name: 'Nome (opzionale)',
    cs_name_ph: 'es. Attendibilità',
    cs_icon: 'Icona (opzionale)',
    cs_decimals: 'Decimali (opzionale)',
    cs_title: 'Sensore',
    cs_remove: 'Rimuovi',
    cs_empty: 'Nessun sensore personalizzato.',
    details_empty: 'Nessun dettaglio. Aggiungine qui sotto.',
    all_added: '— tutti aggiunti —',
    interaction: 'Interazione',
    tap_behavior: 'Al tocco',
    hold_behavior: 'Alla pressione prolungata',
    double_tap_behavior: 'Al doppio tocco',
    nav_path: 'Percorso di navigazione',
    url_label: 'URL',
    action_srv: 'Azione (dominio.servizio)',
    act_more_info: 'Info entità', act_navigate: 'Naviga', act_url: 'URL',
    act_perform: 'Esegui azione', act_toggle: 'Commuta', act_none: 'Niente',
    det_humidity: 'Umidità', det_pressure: 'Pressione', det_wind_speed: 'Velocità vento',
    det_wind_bearing: 'Direzione vento', det_precipitation: 'Precipitazioni (mm)',
    det_precipitation_probability: 'Prob. precipitazioni', det_sunrise: 'Alba',
    det_sunset: 'Tramonto', det_visibility: 'Visibilità',
    det_apparent_temperature: 'Temp. percepita', det_cloud_coverage: 'Copertura nuvolosa',
    det_uv_index: 'Indice UV', det_dew_point: 'Punto di rugiada',
  },
  de: {
    entities: 'Entitäten',
    weather_entity: 'Wetter-Entität',
    sun_entity: 'Sonnen-Entität (Sonnenauf-/-untergangsbogen)',
    appearance: 'Darstellung',
    location: 'Ortsname (leer = automatisch)',
    language: 'Sprache',
    lang_system: 'System', lang_it: 'Italiano', lang_en: 'English', lang_de: 'Deutsch', lang_nl: 'Nederlands', lang_fr: 'Français',
    time_format: 'Zeitformat',
    tf_24: '24 Stunden', tf_12: '12 Stunden',
    show_time: 'Uhrzeit anzeigen',
    show_date: 'Datum anzeigen',
    show_arc: 'Sonnenbogen anzeigen',
    animated_icons: 'Animierte Symbole',
    transparent: 'Transparenter Hintergrund',
    background_image: 'Hintergrundbild (URL oder /local/…-Pfad)',
    overlay: 'Überlagerung: heller ⟵ keine ⟶ dunkler',
    ov_lighter: 'Heller', ov_zero: '0', ov_darker: 'Dunkler',
    forecast: 'Vorhersage',
    forecast_type: 'Vorhersagetyp',
    ft_daily: 'Täglich', ft_hourly: 'Stündlich',
    daily_layout: 'Tages-Layout',
    dl_bars: 'Balken', dl_graph: 'Diagramm (Linien)',
    days_to_load: 'Zu ladende Tage',
    hours_to_load: 'Zu ladende Stunden',
    visible_rows: 'Sichtbare Tage (leer = alle)',
    show_rain: 'Tagesregen anzeigen (mm)',
    show_toggle: 'Umschalter Tage/Stunden in der Karte',
    details: 'Details',
    details_hint: 'Attribute unten hinzufügen. Chips zum Umsortieren ziehen. Zum Entfernen ✕ tippen.',
    custom_sensors: 'Eigene Sensoren',
    custom_sensors_hint: 'Zeige eine beliebige Sensor-Entität im Detailraster. Sensor wählen und optional Name und Symbol setzen.',
    show_sensor_names: 'Namen unter den Sensoren anzeigen',
    cs_fit_text: 'An Text anpassen',
    add_sensor: 'Sensor hinzufügen',
    cs_entity: 'Sensor-Entität',
    cs_attribute: 'Attribut (optional)',
    cs_pick: 'Sensor auswählen…',
    cs_name: 'Name (optional)',
    cs_name_ph: 'z. B. Zuverlässigkeit',
    cs_icon: 'Symbol (optional)',
    cs_decimals: 'Dezimalstellen (optional)',
    cs_title: 'Sensor',
    cs_remove: 'Entfernen',
    cs_empty: 'Noch keine eigenen Sensoren.',
    details_empty: 'Noch keine Details. Unten hinzufügen.',
    all_added: '— alle hinzugefügt —',
    interaction: 'Interaktion',
    tap_behavior: 'Bei Tippen',
    hold_behavior: 'Bei langem Drücken',
    double_tap_behavior: 'Bei Doppeltippen',
    nav_path: 'Navigationspfad',
    url_label: 'URL',
    action_srv: 'Aktion (domain.service)',
    act_more_info: 'Entitäts-Info', act_navigate: 'Navigieren', act_url: 'URL',
    act_perform: 'Aktion ausführen', act_toggle: 'Umschalten', act_none: 'Nichts',
    det_humidity: 'Luftfeuchtigkeit', det_pressure: 'Luftdruck', det_wind_speed: 'Windgeschwindigkeit',
    det_wind_bearing: 'Windrichtung', det_precipitation: 'Niederschlag (mm)',
    det_precipitation_probability: 'Niederschlagswahrsch.', det_sunrise: 'Sonnenaufgang',
    det_sunset: 'Sonnenuntergang', det_visibility: 'Sichtweite',
    det_apparent_temperature: 'Gefühlte Temp.', det_cloud_coverage: 'Bewölkung',
    det_uv_index: 'UV-Index', det_dew_point: 'Taupunkt',
  },
  nl: {
    entities: 'Entiteiten',
    weather_entity: 'Weer-entiteit',
    sun_entity: 'Zon-entiteit (zonsopgang/-ondergang boog)',
    appearance: 'Weergave',
    location: 'Locatienaam (leeg = automatisch)',
    language: 'Taal',
    lang_system: 'Systeem', lang_it: 'Italiano', lang_en: 'English', lang_de: 'Deutsch', lang_nl: 'Nederlands', lang_fr: 'Français',
    time_format: 'Tijdnotatie',
    tf_24: '24 uur', tf_12: '12 uur',
    show_time: 'Tijd tonen',
    show_date: 'Datum tonen',
    show_arc: 'Zonneboog tonen',
    animated_icons: 'Geanimeerde iconen',
    transparent: 'Transparante achtergrond',
    background_image: 'Achtergrondafbeelding (URL of /local/…-pad)',
    overlay: 'Overlay: lichter ⟵ geen ⟶ donkerder',
    ov_lighter: 'Lichter', ov_zero: '0', ov_darker: 'Donkerder',
    forecast: 'Voorspelling',
    forecast_type: 'Voorspellingstype',
    ft_daily: 'Dagelijks', ft_hourly: 'Uurlijks',
    daily_layout: 'Dagelijkse layout',
    dl_bars: 'Balken', dl_graph: 'Grafiek (lijnen)',
    days_to_load: 'Te laden dagen',
    hours_to_load: 'Te laden uren',
    visible_rows: 'Zichtbare dagen (leeg = alle)',
    show_rain: 'Dagelijkse neerslag tonen (mm)',
    show_toggle: 'Dagen/Uren-schakelaar in kaart',
    details: 'Details',
    details_hint: 'Voeg hieronder attributen toe. Sleep om te herordenen. Tik om te verwijderen.',
    details_empty: 'Nog geen details. Voeg hieronder attributen toe.',
    all_added: '— alle toegevoegd —',
    custom_sensors: 'Aangepaste sensoren',
    custom_sensors_hint: 'Toon een willekeurige sensor-entiteit in het detailraster. Kies een sensor en stel eventueel naam en icoon in.',
    show_sensor_names: 'Namen onder de sensoren tonen',
    cs_fit_text: 'Aan tekst aanpassen',
    add_sensor: 'Sensor toevoegen',
    cs_entity: 'Sensor-entiteit',
    cs_attribute: 'Attribuut (optioneel)',
    cs_pick: 'Selecteer een sensor…',
    cs_name: 'Naam (optioneel)',
    cs_name_ph: 'bijv. Betrouwbaarheid',
    cs_icon: 'Icoon (optioneel)',
    cs_decimals: 'Decimalen (optioneel)',
    cs_title: 'Sensor',
    cs_remove: 'Verwijderen',
    cs_empty: 'Nog geen aangepaste sensoren.',
    interaction: 'Interactie',
    tap_behavior: 'Bij tikken',
    hold_behavior: 'Bij lang indrukken',
    double_tap_behavior: 'Bij dubbeltikken',
    nav_path: 'Navigatiepad',
    url_label: 'URL',
    action_srv: 'Actie (domein.service)',
    act_more_info: 'Entiteit-info', act_navigate: 'Navigeren', act_url: 'URL',
    act_perform: 'Actie uitvoeren', act_toggle: 'Omschakelen', act_none: 'Niets',
    det_humidity: 'Luchtvochtigheid', det_pressure: 'Luchtdruk', det_wind_speed: 'Windsnelheid',
    det_wind_bearing: 'Windrichting', det_precipitation: 'Neerslag (mm)',
    det_precipitation_probability: 'Kans op neerslag', det_sunrise: 'Zonsopgang',
    det_sunset: 'Zonsondergang', det_visibility: 'Zicht',
    det_apparent_temperature: 'Gevoelstemperatuur', det_cloud_coverage: 'Bewolking',
    det_uv_index: 'UV-index', det_dew_point: 'Dauwpunt',
  },
  fr: {
    entities: 'Entités',
    weather_entity: 'Entité météorologique',
    sun_entity: 'Entité solaire (arc du lever/coucher du soleil)',
    appearance: 'Apparence',
    location: 'Nom du lieu (vide = automatique)',
    language: 'Langue',
    lang_system: 'Système', lang_it: 'Italiano', lang_en: 'English', lang_de: 'Deutsch', lang_nl: 'Nederlands', lang_fr: 'Français',
    time_format: "Format de l'heure",
    tf_24: '24 heures', tf_12: '12 heures',
    show_time: "Afficher l'heure",
    show_date: 'Afficher la date',
    show_arc: "Afficher l'arc solaire",
    animated_icons: 'Icônes animées',
    transparent: 'Fond transparent',
    background_image: 'Image de fond (URL ou chemin /local/…)',
    overlay: 'Superposition : plus clair ⟵ aucun ⟶ plus foncé',
    ov_lighter: 'Plus clair', ov_zero: '0', ov_darker: 'Plus foncé',
    forecast: 'Prévision',
    forecast_type: 'Type de prévision',
    ft_daily: 'Quotidienne', ft_hourly: 'Horaire',
    daily_layout: 'Disposition quotidienne',
    dl_bars: 'Barres', dl_graph: 'Graphique (lignes)',
    days_to_load: 'Jours à charger',
    hours_to_load: 'Heures à charger',
    visible_rows: 'Jours visibles (vide = tous)',
    show_rain: 'Afficher la pluie quotidienne (mm)',
    show_toggle: 'Bascule Jours/Heures dans la carte',
    details: 'Détails',
    details_hint: 'Ajoutez des attributs ci-dessous. Faites glisser pour réorganiser. Appuyez pour supprimer.',
    details_empty: 'Aucun détail pour le moment. Ajoutez les attributs ci-dessous.',
    all_added: '— tout ajouté —',
    custom_sensors: 'Capteurs personnalisés',
    custom_sensors_hint: "Affichez n'importe quel capteur dans la grille de détails. Choisissez un capteur et, si vous le souhaitez, définissez un nom et une icône.",
    show_sensor_names: 'Afficher les noms sous les capteurs',
    cs_fit_text: 'Adapter au texte',
    add_sensor: 'Ajouter un capteur',
    cs_entity: 'Entité du capteur',
    cs_attribute: 'Attribut (optionnel)',
    cs_pick: 'Sélectionnez un capteur…',
    cs_name: 'Nom (optionnel)',
    cs_name_ph: 'ex. Fiabilité',
    cs_icon: 'Icône (optionnel)',
    cs_decimals: 'Décimales (optionnel)',
    cs_title: 'Capteur',
    cs_remove: 'Supprimer',
    cs_empty: 'Aucun capteur personnalisé pour le moment.',
    interaction: 'Interaction',
    tap_behavior: 'Comportement du clic',
    hold_behavior: 'Comportement du maintien',
    double_tap_behavior: 'Comportement du double-clic',
    nav_path: 'Chemin de navigation',
    url_label: 'URL',
    action_srv: 'Action (domain.service)',
    act_more_info: "Informations sur l'entité", act_navigate: 'Naviguer', act_url: 'URL',
    act_perform: "Effectuer l'action", act_toggle: 'Basculer', act_none: 'Ne rien faire',
    det_humidity: 'Humidité', det_pressure: 'Pression', det_wind_speed: 'Vitesse du vent',
    det_wind_bearing: 'Direction du vent', det_precipitation: 'Précipitation (mm)',
    det_precipitation_probability: 'Probabilité de précipitation', det_sunrise: 'Lever du soleil',
    det_sunset: 'Coucher du soleil', det_visibility: 'Visibilité',
    det_apparent_temperature: 'Température ressentie', det_cloud_coverage: 'Couverture nuageuse',
    det_uv_index: 'Indice UV', det_dew_point: 'Point de rosée',
  },
};

class SunWeatherCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...config };
    if (!Array.isArray(this._config.details)) this._config.details = [];
    if (!this._rendered) {
      this._rendered = true;
      this._render();
    }
  }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    // primo hass: ri-renderizza per applicare la lingua di HA alle etichette
    if (first && this._rendered) {
      this._render();
    } else {
      this._fillEntityPickers();
      this._fillAppearanceForm();
      this._fillForecastForm();
      this._fillInteractionForm();
      this._fillDetailsForm();
    }
  }

  // lingua editor: segue HA/browser; 'it' -> italiano, 'de' -> tedesco, altrimenti inglese
  _lang() {
    // rispetta la lingua scelta nella card; se 'system' (o assente), usa HA/browser
    const cfg = this._config && this._config.language;
    if (cfg && cfg !== 'system') return cfg;
    const l = (this._hass && this._hass.locale && this._hass.locale.language)
      || (this._hass && this._hass.language)
      || navigator.language || 'en';
    const s = String(l).toLowerCase();
    return s.startsWith('it') ? 'it'
      : s.startsWith('de') ? 'de'
      : s.startsWith('nl') ? 'nl'
      : s.startsWith('fr') ? 'fr'
      : 'en';
  }

  t(key) {
    const dict = EDITOR_I18N[this._lang()] || EDITOR_I18N.en;
    return dict[key] != null ? dict[key] : (EDITOR_I18N.en[key] || key);
  }

  _detailLabel(k) {
    return this.t('det_' + k) || DETAIL_LABELS[k] || k;
  }

  _emit() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    }));
  }

  _set(key, value) {
    if (value === '' || value === null || value === undefined) {
      delete this._config[key];
    } else {
      this._config[key] = value;
    }
    this._emit();
  }

  _fillEntityPickers() {
    if (!this.shadowRoot) return;
    const mount = this.shadowRoot.getElementById('entities-form');
    if (!mount || mount.dataset.filled) return;

    const form = document.createElement('ha-form');
    form.hass = this._hass;
    form.data = {
      entity: this._config.entity || '',
      sun_entity: this._config.sun_entity || 'sun.sun',
    };
    form.schema = [
      { name: 'entity', selector: { entity: { domain: 'weather' } } },
      { name: 'sun_entity', selector: { entity: { domain: 'sun' } } },
    ];
    form.computeLabel = (s) =>
      s.name === 'entity' ? this.t('weather_entity') : this.t('sun_entity');
    form.addEventListener('value-changed', (e) => {
      const v = e.detail.value || {};
      this._set('entity', v.entity);
      this._set('sun_entity', v.sun_entity);
    });
    mount.appendChild(form);
    mount.dataset.filled = '1';
  }

  _fillAppearanceForm() {
    if (!this.shadowRoot) return;
    const mount = this.shadowRoot.getElementById('appearance-form');
    if (!mount || mount.dataset.filled) return;
    const c = this._config;

    const form = document.createElement('ha-form');
    form.hass = this._hass;
    form.data = {
      location: c.location || '',
      language: c.language || 'system',
      time_format: c.time_format || '24',
      show_time: c.show_time !== false,
      show_date: c.show_date !== false,
      show_arc: c.show_arc !== false,
      animated_icons: c.animated_icons !== false,
      transparent: c.transparent === true,
      background_image: c.background_image || '',
    };
    const sel = (opts) => ({ select: { mode: 'dropdown', options: opts } });
    form.schema = [
      { name: 'location', selector: { text: {} } },
      { name: 'language', selector: sel([
        { value: 'system', label: this.t('lang_system') },
        { value: 'it', label: this.t('lang_it') },
        { value: 'en', label: this.t('lang_en') },
        { value: 'de', label: this.t('lang_de') },
        { value: 'nl', label: this.t('lang_nl') },
        { value: 'fr', label: this.t('lang_fr') },
      ]) },
      { name: 'time_format', selector: sel([
        { value: '24', label: this.t('tf_24') },
        { value: '12', label: this.t('tf_12') },
      ]) },
      { name: 'show_time', selector: { boolean: {} } },
      { name: 'show_date', selector: { boolean: {} } },
      { name: 'show_arc', selector: { boolean: {} } },
      { name: 'animated_icons', selector: { boolean: {} } },
      { name: 'transparent', selector: { boolean: {} } },
      { name: 'background_image', selector: { text: {} } },
    ];
    const labels = {
      location: this.t('location'), language: this.t('language'),
      time_format: this.t('time_format'), show_time: this.t('show_time'),
      show_date: this.t('show_date'), show_arc: this.t('show_arc'),
      animated_icons: this.t('animated_icons'), transparent: this.t('transparent'),
      background_image: this.t('background_image'),
    };
    form.computeLabel = (s) => labels[s.name] || s.name;
    form.addEventListener('value-changed', (e) => {
      const v = e.detail.value || {};
      Object.keys(labels).forEach((k) => {
        if (k === 'show_time' || k === 'show_date' || k === 'show_arc' || k === 'animated_icons') {
          // toggle "attivo di default": salva solo se false
          if (v[k] === false) this._set(k, false); else this._set(k, undefined);
        } else if (k === 'transparent') {
          if (v[k] === true) this._set(k, true); else this._set(k, undefined);
        } else {
          this._set(k, v[k]);
        }
      });
      this._updateOverlayVisibility();
    });
    mount.appendChild(form);
    mount.dataset.filled = '1';
    this._updateOverlayVisibility();
  }

  // lo slider velo ha senso solo con un'immagine di sfondo impostata
  _updateOverlayVisibility() {
    const row = this.shadowRoot && this.shadowRoot.getElementById('overlay-row');
    if (row) row.style.display = this._config.background_image ? '' : 'none';
  }

  _fillForecastForm() {
    if (!this.shadowRoot) return;
    const mount = this.shadowRoot.getElementById('forecast-form');
    if (!mount || mount.dataset.filled) return;
    const c = this._config;

    const form = document.createElement('ha-form');
    form.hass = this._hass;
    form.data = {
      forecast_type: c.forecast_type || 'daily',
      forecast_layout: c.forecast_layout || 'bars',
      forecast_days: c.forecast_days ?? 7,
      forecast_hours: c.forecast_hours ?? 24,
      visible_rows: c.visible_rows ?? null,
      show_forecast_precipitation: c.show_forecast_precipitation !== false,
      show_forecast_toggle: c.show_forecast_toggle === true,
    };
    const sel = (opts) => ({ select: { mode: 'dropdown', options: opts } });
    const num = (min, max) => ({ number: { min, max, mode: 'box', step: 1 } });
    form.schema = [
      { name: 'forecast_type', selector: sel([
        { value: 'daily', label: this.t('ft_daily') },
        { value: 'hourly', label: this.t('ft_hourly') },
      ]) },
      { name: 'forecast_layout', selector: sel([
        { value: 'bars', label: this.t('dl_bars') },
        { value: 'graph', label: this.t('dl_graph') },
      ]) },
      { name: 'visible_rows', selector: num(1, 15) },
      { name: 'forecast_days', selector: num(1, 15) },
      { name: 'forecast_hours', selector: num(1, 48) },
      { name: 'show_forecast_precipitation', selector: { boolean: {} } },
      { name: 'show_forecast_toggle', selector: { boolean: {} } },
    ];
    const labels = {
      forecast_type: this.t('forecast_type'), forecast_layout: this.t('daily_layout'),
      forecast_days: this.t('days_to_load'), forecast_hours: this.t('hours_to_load'),
      visible_rows: this.t('visible_rows'),
      show_forecast_precipitation: this.t('show_rain'),
      show_forecast_toggle: this.t('show_toggle'),
    };
    form.computeLabel = (s) => labels[s.name] || s.name;
    form.addEventListener('value-changed', (e) => {
      const v = e.detail.value || {};
      this._set('forecast_type', v.forecast_type);
      this._set('forecast_layout', v.forecast_layout);
      this._set('forecast_days', v.forecast_days);
      this._set('forecast_hours', v.forecast_hours);
      // visible_rows: vuoto/null = mostra tutte
      this._set('visible_rows', (v.visible_rows === null || v.visible_rows === undefined || v.visible_rows === '') ? undefined : v.visible_rows);
      // show_rain e' attivo di default: salva solo se false
      this._set('show_forecast_precipitation', v.show_forecast_precipitation === false ? false : undefined);
      // show_toggle e' spento di default: salva solo se true
      this._set('show_forecast_toggle', v.show_forecast_toggle === true ? true : undefined);
    });
    mount.appendChild(form);
    mount.dataset.filled = '1';
  }

  _fillInteractionForm() {
    if (!this.shadowRoot) return;
    const mount = this.shadowRoot.getElementById('interaction-form');
    if (!mount || mount.dataset.filled) return;
    const c = this._config;

    const form = document.createElement('ha-form');
    form.hass = this._hass;
    form.data = {
      tap_action: c.tap_action || { action: 'more-info' },
      hold_action: c.hold_action || { action: 'none' },
      double_tap_action: c.double_tap_action || { action: 'none' },
    };
    form.schema = [
      { name: 'tap_action', selector: { ui_action: {} } },
      { name: 'hold_action', selector: { ui_action: {} } },
      { name: 'double_tap_action', selector: { ui_action: {} } },
    ];
    const labels = {
      tap_action: this.t('tap_behavior'),
      hold_action: this.t('hold_behavior'),
      double_tap_action: this.t('double_tap_behavior'),
    };
    form.computeLabel = (s) => labels[s.name] || s.name;
    form.addEventListener('value-changed', (e) => {
      const v = e.detail.value || {};
      this._set('tap_action', v.tap_action);
      this._set('hold_action', v.hold_action);
      this._set('double_tap_action', v.double_tap_action);
    });
    mount.appendChild(form);
    mount.dataset.filled = '1';
  }

  _fillDetailsForm() {
    if (!this.shadowRoot) return;
    const mount = this.shadowRoot.getElementById('details-form');
    if (!mount || mount.dataset.filled) return;

    const form = document.createElement('ha-form');
    form.hass = this._hass;
    form.data = { details: this._config.details || [] };
    // selettore nativo multi-scelta e riordinabile (drag&drop nativo di HA)
    form.schema = [{
      name: 'details',
      selector: {
        select: {
          multiple: true,
          reorder: true,
          mode: 'list',
          options: ALL_DETAILS.map(([k]) => ({ value: k, label: this._detailLabel(k) })),
        },
      },
    }];
    form.computeLabel = () => '';
    form.addEventListener('value-changed', (e) => {
      const v = e.detail.value || {};
      this._set('details', Array.isArray(v.details) ? v.details : []);
    });
    mount.appendChild(form);
    mount.dataset.filled = '1';
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const c = this._config;
    const lang = c.language || 'system';
    const tf = c.time_format || '24';
    const ft = c.forecast_type || 'daily';

    this.shadowRoot.innerHTML = `
      <style>
        .editor { display: flex; flex-direction: column; gap: 10px; padding: 4px 2px; }
        details.group {
          border: 1px solid var(--divider-color, #e0e0e0);
          border-radius: 8px; padding: 0 10px;
        }
        details.group[open] { padding-bottom: 10px; }
        summary {
          cursor: pointer; padding: 10px 4px; font-weight: 600;
          color: var(--primary-text-color); list-style: none;
        }
        summary::-webkit-details-marker { display: none; }
        summary::before { content: '\u25B8'; display: inline-block; margin-right: 8px; transition: transform 0.15s; color: var(--secondary-text-color); }
        details[open] > summary::before { transform: rotate(90deg); }
        .grp-body { display: flex; flex-direction: column; gap: 12px; padding: 4px 2px 2px; }
        .row { display: flex; flex-direction: column; gap: 4px; }
        .row.inline { flex-direction: row; align-items: center; justify-content: space-between; gap: 10px; }
        label { font-size: 0.9em; color: var(--secondary-text-color); }
        select, input[type="number"], input[type="text"] {
          padding: 8px; border-radius: 6px;
          border: 1px solid var(--divider-color, #ccc);
          background: var(--card-background-color, #fff);
          color: var(--primary-text-color); font: inherit; width: 100%;
          box-sizing: border-box;
        }
        .inline select, .inline input { width: auto; min-width: 130px; }
        .ov-slider { position: relative; display: flex; align-items: center; }
        .ov-slider .ov-tick {
          position: absolute; left: 50%; top: 50%;
          width: 2px; height: 16px; transform: translate(-50%, -50%);
          background: var(--primary-text-color, #333); opacity: 0.55;
          border-radius: 1px; pointer-events: none; z-index: 2;
        }
        .ov-scale {
          display: flex; justify-content: space-between;
          font-size: 0.72em; color: var(--secondary-text-color); margin-top: 2px;
        }
        input[type="range"]#background_overlay {
          -webkit-appearance: none; appearance: none;
          width: 100%; height: 8px; border-radius: 999px; padding: 0;
          border: 1px solid var(--divider-color, #ccc);
          background: linear-gradient(to right, #ffffff, #d9d9d9 50%, #000000);
          cursor: pointer;
        }
        input[type="range"]#background_overlay::-webkit-slider-thumb {
          -webkit-appearance: none; appearance: none;
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--primary-color, #03a9f4);
          border: 2px solid #fff; box-shadow: 0 0 2px rgba(0,0,0,0.4);
        }
        input[type="range"]#background_overlay::-moz-range-thumb {
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--primary-color, #03a9f4);
          border: 2px solid #fff;
        }
        .switch { display: flex; align-items: center; gap: 8px; color: var(--primary-text-color); font-size: 0.9em; }
        .hint { font-size: 0.78em; color: var(--secondary-text-color); }

        .custom-row {
          margin-bottom: 8px;
          display: flex; flex-direction: column; gap: 2px;
        }
        .cs-remove {
          align-self: flex-end;
          background: none; border: none; cursor: pointer;
          color: var(--error-color, #c0392b); font: inherit; padding: 2px 4px;
        }
        .cs-combo { position: relative; }
        .cs-dropdown {
          display: none; position: absolute; left: 0; right: 0; top: 100%;
          z-index: 10; max-height: 220px; overflow-y: auto;
          background: var(--card-background-color, #fff);
          border: 1px solid var(--divider-color, #ccc);
          border-radius: 8px; margin-top: 2px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .cs-dropdown.open { display: block; }
        .cs-opt {
          padding: 8px 10px; cursor: pointer; display: flex; flex-direction: column;
          border-bottom: 1px solid var(--divider-color, #eee);
        }
        .cs-opt:last-child { border-bottom: none; }
        .cs-opt:hover { background: var(--secondary-background-color, #f0f0f0); }
        .cs-opt b { font-weight: 600; font-size: 0.9em; }
        .cs-opt span { font-size: 0.75em; color: var(--secondary-text-color); }
        .cs-icon-wrap { display: flex; align-items: center; gap: 8px; }
        .cs-name-native {
          width: 100%; box-sizing: border-box;
          padding: 14px 12px 12px;
          border: none;
          border-bottom: 1px solid var(--mdc-text-field-idle-line-color, rgba(0,0,0,0.42));
          border-radius: 4px 4px 0 0;
          background: var(--mdc-text-field-fill-color, rgba(0,0,0,0.04));
          color: var(--primary-text-color);
          font: inherit; font-size: 1em;
        }
        .cs-name-native:focus {
          outline: none;
          border-bottom: 2px solid var(--primary-color, #03a9f4);
        }
        .cs-icon-wrap .cs-icon { flex: 1; }
        .cs-icon-preview { --mdc-icon-size: 24px; color: var(--primary-text-color); flex: none; }
        .add-custom-btn {
          margin-top: 4px; padding: 8px 12px; border-radius: 8px;
          border: 1px dashed var(--primary-color, #03a9f4);
          background: none; color: var(--primary-color, #03a9f4);
          cursor: pointer; font: inherit; width: 100%;
        }
        .det-empty { font-size: 0.85em; color: var(--secondary-text-color); font-style: italic; }
      </style>
      <div class="editor">

        <details class="group">
          <summary>${this.t('entities')}</summary>
          <div class="grp-body">
            <div id="entities-form"></div>
          </div>
        </details>

        <details class="group">
          <summary>${this.t('appearance')}</summary>
          <div class="grp-body">
            <div id="appearance-form"></div>
            <div class="row" id="overlay-row" style="display:none;">
              <label>${this.t('overlay')}</label>
              <div class="ov-slider">
                <span class="ov-tick"></span>
                <input type="range" id="background_overlay" min="-1" max="1" step="0.05" value="${c.background_overlay ?? 0}">
              </div>
              <div class="ov-scale"><span>${this.t('ov_lighter')}</span><span>${this.t('ov_zero')}</span><span>${this.t('ov_darker')}</span></div>
            </div>
          </div>
        </details>

        <details class="group">
          <summary>${this.t('forecast')}</summary>
          <div class="grp-body">
            <div id="forecast-form"></div>
          </div>
        </details>

        <details class="group">
          <summary>${this.t('details')}</summary>
          <div class="grp-body">
            <div class="hint">${this.t('details_hint')}</div>
            <div id="details-form"></div>
          </div>
        </details>

        <details class="group">
          <summary>${this.t('custom_sensors')}</summary>
          <div class="grp-body">
            <div class="hint">${this.t('custom_sensors_hint')}</div>
            <div id="custom-names-toggle"></div>
            <div id="custom-list"></div>
            <button type="button" class="add-custom-btn" id="add-custom-btn">\uFF0B ${this.t('add_sensor')}</button>
          </div>
        </details>

        <details class="group">
          <summary>${this.t('interaction')}</summary>
          <div class="grp-body">
            <div id="interaction-form"></div>
          </div>
        </details>

      </div>
    `;

    this._fillEntityPickers();
    this._fillAppearanceForm();
    this._fillForecastForm();
    this._fillInteractionForm();
    this._fillDetailsForm();
    this._renderCustomEditor();
    this._wire();
  }

  _wire() {
    const bind = (id, ev, fn) => {
      const el = this.shadowRoot.getElementById(id);
      if (el) el.addEventListener(ev, fn);
    };
    bind('background_overlay', 'input', (e) => this._set('background_overlay', Number(e.target.value)));
    bind('add-custom-btn', 'click', () => this._addCustom());
  }

  /* ---- Sensori personalizzati ---- */
  _renderCustomEditor() {
    // toggle "mostra nomi sotto i sensori" (ha-form nativo)
    const tmount = this.shadowRoot.getElementById('custom-names-toggle');
    if (tmount && !tmount.dataset.filled) {
      const tform = document.createElement('ha-form');
      tform.hass = this._hass;
      tform.data = {
        show_sensor_names: this._config.show_sensor_names === true,
        custom_details_flow: this._config.custom_details_flow === true,
      };
      tform.schema = [
        { name: 'show_sensor_names', selector: { boolean: {} } },
        { name: 'custom_details_flow', selector: { boolean: {} } },
      ];
      tform.computeLabel = (s) =>
        this.t(s.name === 'custom_details_flow' ? 'cs_fit_text' : 'show_sensor_names');
      tform.addEventListener('value-changed', (e) => {
        const v = e.detail.value || {};
        // entrambi con default OFF: salva solo se ON
        this._set('show_sensor_names', v.show_sensor_names === true ? true : undefined);
        this._set('custom_details_flow', v.custom_details_flow === true ? true : undefined);
      });
      tmount.appendChild(tform);
      tmount.dataset.filled = '1';
    }

    const list = this.shadowRoot.getElementById('custom-list');
    if (!list) return;
    const items = this._config.custom_details || [];

    if (!items.length) {
      list.innerHTML = `<div class="det-empty">${this.t('cs_empty')}</div>`;
      return;
    }

    list.innerHTML = '';
    items.forEach((c, i) => {
      const row = document.createElement('div');
      row.className = 'custom-row';
      row.dataset.index = i;

      // ha-form nativo: entita', attributo (opzionale), nome, icona
      const form = document.createElement('ha-form');
      form.hass = this._hass;
      form.data = {
        entity: c.entity || '',
        attribute: c.attribute || '',
        name: c.name || '',
        icon: c.icon || '',
        decimals: c.decimals,
      };
      // il selettore attributo mostra gli attributi dell'entita' scelta;
      // compare solo quando un'entita' e' gia' selezionata
      const inner = [
        { name: 'entity', selector: { entity: {} } },
      ];
      if (c.entity) {
        inner.push({
          name: 'attribute',
          selector: { attribute: { entity_id: c.entity } },
        });
      }
      inner.push(
        { name: 'name', selector: { text: {} } },
        { name: 'icon', selector: { icon: {} } },
        { name: 'decimals', selector: { number: { min: 0, max: 6, step: 1, mode: 'box' } } },
      );
      // ogni sensore in un pannello a fisarmonica (expandable nativo di ha-form):
      // da chiuso occupa una riga, cosi' la lista non diventa lunghissima.
      // name:'' tiene i valori "piatti", quindi il salvataggio sotto non cambia.
      // titolo del pannello (nome opzionale, altrimenti entita' + attributo)
      const title = this._customTitle(c, i);
      const schema = [{
        type: 'expandable',
        name: '',
        title,
        icon: c.icon || 'mdi:weather-partly-cloudy',
        expanded: i === this._openCustomIndex,
        schema: inner,
      }];
      form.schema = schema;
      form.computeLabel = (s) => {
        if (s.name === 'entity') return this.t('cs_entity');
        if (s.name === 'attribute') return this.t('cs_attribute');
        if (s.name === 'name') return this.t('cs_name');
        if (s.name === 'icon') return this.t('cs_icon');
        if (s.name === 'decimals') return this.t('cs_decimals');
        return s.name;
      };
      form.addEventListener('value-changed', (e) => {
        const v = e.detail.value || {};
        const arr = [...(this._config.custom_details || [])];
        const prevEntity = arr[i] && arr[i].entity;
        const prevAttribute = arr[i] && arr[i].attribute;
        const prevName = arr[i] && arr[i].name;
        arr[i] = {};
        if (v.entity) arr[i].entity = v.entity;
        if (v.attribute) arr[i].attribute = v.attribute;
        if (v.name) arr[i].name = v.name;
        if (v.icon) arr[i].icon = v.icon;
        if (v.decimals != null && v.decimals !== '') arr[i].decimals = v.decimals;
        this._config.custom_details = arr;
        this._emit();
        // entita' o attributo (selettori): ricostruisci subito -> aggiorna
        // menu attributi e titolo del pannello all'istante.
        if (v.entity !== prevEntity || (v.attribute || '') !== (prevAttribute || '')) {
          clearTimeout(this._titleTimer);
          this._openCustomIndex = i;
          this._renderCustomEditor();
        } else if ((v.name || '') !== (prevName || '')) {
          // il nome e' testo libero: non ricostruire a ogni tasto (si perderebbe
          // il focus). Aspetta una breve pausa e poi aggiorna il titolo.
          clearTimeout(this._titleTimer);
          this._titleTimer = setTimeout(() => {
            this._openCustomIndex = i;
            this._renderCustomEditor();
          }, 900);
        }
      });

      const rm = document.createElement('button');
      rm.type = 'button';
      rm.className = 'cs-remove';
      rm.textContent = `\u2715 ${this.t('cs_remove')}`;
      rm.addEventListener('click', () => this._removeCustom(i));

      row.appendChild(form);
      row.appendChild(rm);
      list.appendChild(row);
    });
  }

  // titolo del pannello di un sensore custom: nome opzionale se presente,
  // altrimenti friendly name dell'entita' + attributo (per distinguere piu'
  // voci sulla stessa entita'), altrimenti un'etichetta generica numerata
  _customTitle(c, i) {
    if (c.name && c.name.trim()) return c.name.trim();
    if (c.entity) {
      const st = this._hass && this._hass.states[c.entity];
      const friendly = (st && st.attributes.friendly_name) || c.entity;
      return c.attribute ? `${friendly} \u00b7 ${c.attribute}` : friendly;
    }
    return `${this.t('cs_title')} ${i + 1}`;
  }

  _addCustom() {
    const arr = [...(this._config.custom_details || [])];
    // icona di default generica "meteo": compare subito, ma resta cancellabile
    arr.push({ entity: '', icon: 'mdi:weather-partly-cloudy' });
    this._openCustomIndex = arr.length - 1; // apri il pannello appena creato
    this._config.custom_details = arr;
    this._emit();
    this._renderCustomEditor();
  }

  _setCustom(index, key, value) {
    const arr = [...(this._config.custom_details || [])];
    if (!arr[index]) return;
    arr[index] = { ...arr[index] };
    if (value === '' || value == null) delete arr[index][key];
    else arr[index][key] = value;
    this._config.custom_details = arr;
    this._emit();
  }

  _removeCustom(index) {
    const arr = [...(this._config.custom_details || [])];
    arr.splice(index, 1);
    this._openCustomIndex = -1; // niente pannello forzato aperto dopo la rimozione
    this._config.custom_details = arr;
    this._emit();
    this._renderCustomEditor();
  }
}

customElements.define('sun-weather-card-editor', SunWeatherCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'sun-weather-card',
  name: 'Sun Weather Card',
  preview: true,
});

console.info(
  '%c SUN-WEATHER-CARD %c 1.6.1 ',
  'color: white; background: #ff7a59; font-weight: 700;',
  'color: #ff7a59; background: #1c1c1c; font-weight: 700;'
);
