/**
 * Sun Weather Card
 * https://github.com/korova-sq/sun-weather-card
 * Version: 1.12.0
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

/* ═══════════════════════════════════════════════════════════════════════════
 * 🌍 TRANSLATIONS
 * To add a language: add its code + locale to SUPPORTED_LANGS below, then add a
 * block with the SAME code to EACH dictionary (CONDITION_LABELS, UI_LABELS,
 * EDITOR_I18N — and optionally WIND_DIRS). Keep the keys identical to `en`.
 * No other code changes are needed. See CONTRIBUTING.md for the full guide.
 * ═══════════════════════════════════════════════════════════════════════════ */

// Versione della card: unico punto da aggiornare a ogni release (il banner in
// console la legge da qui). Ricordarsi di allineare anche il commento "Version:"
// in testa al file.
const CARD_VERSION = '1.12.0';

// Lingue supportate: codice card -> locale usato per date/orari.
const SUPPORTED_LANGS = {
  it: 'it-IT', en: 'en-GB', de: 'de-DE', nl: 'nl-NL', fr: 'fr-FR', pl: 'pl-PL', sv: 'sv-SE',
};

// Da un locale ('it-IT') o codice ('it') ricava il codice lingua supportato.
// Ripiega su 'en' se la lingua non e' tra quelle supportate.
function langCode(loc) {
  const s = String(loc || '').toLowerCase();
  return Object.keys(SUPPORTED_LANGS).find((c) => s.startsWith(c)) || 'en';
}

const CONDITION_LABELS = {
  it: {
    'clear-night': 'Sereno',
    'partlycloudy-night': 'Parzialmente Nuvoloso',
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
    'partlycloudy-night': 'Partly Cloudy',
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
    'partlycloudy-night': 'Teilweise bewölkt',
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
    'partlycloudy-night': 'Gedeeltelijk bewolkt',
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
    'partlycloudy-night': 'Partiellement nuageux',
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
  pl: {
    'clear-night': 'Bezchmurna noc',
    'partlycloudy-night': 'Częściowe zachmurzenie',
    cloudy: 'Pochmurno',
    fog: 'Mgła',
    hail: 'Grad',
    lightning: 'Burza',
    'lightning-rainy': 'Burza z deszczem',
    partlycloudy: 'Częściowe zachmurzenie',
    pouring: 'Ulewny deszcz',
    rainy: 'Deszczowo',
    snowy: 'Opady śniegu',
    'snowy-rainy': 'Deszcz ze śniegiem',
    sunny: 'Słonecznie',
    windy: 'Wietrznie',
    'windy-variant': 'Wietrznie i pochmurno',
    exceptional: 'Wyjątkowe warunki',
  },
  sv: {
    'clear-night': 'Klart, natt',
    'partlycloudy-night': 'Växlande molnighet',
    cloudy: 'Molnigt',
    fog: 'Dimma',
    hail: 'Hagel',
    lightning: 'Åska',
    'lightning-rainy': 'Åska, regnigt',
    partlycloudy: 'Växlande molnighet',
    pouring: 'Ösregn',
    rainy: 'Regn',
    snowy: 'Snö',
    'snowy-rainy': 'Snöigt, regnigt',
    sunny: 'Soligt',
    windy: 'Blåsigt',
    'windy-variant': 'Blåsigt, molnigt',
    exceptional: 'Exceptionellt',
  },
};

const UI_LABELS = {
  it: { sunrise: 'alba', sunset: 'tramonto', daily: 'Giorni', hourly: 'Ore', sunset_in: 'Tramonto tra', sunrise_in: 'Alba tra', hm_join: ' e ', no_data: 'Dato non disponibile' },
  en: { sunrise: 'sunrise', sunset: 'sunset', daily: 'Daily', hourly: 'Hourly', sunset_in: 'Sunset in', sunrise_in: 'Sunrise in', hm_join: ' ', no_data: 'No data available' },
  de: { sunrise: 'Sonnenaufgang', sunset: 'Sonnenuntergang', daily: 'Tage', hourly: 'Stunden', sunset_in: 'Sonnenuntergang in', sunrise_in: 'Sonnenaufgang in', hm_join: ' und ', no_data: 'Keine Daten verfügbar' },
  nl: { sunrise: 'zonsopgang', sunset: 'zonsondergang', daily: 'Dagen', hourly: 'Uren', sunset_in: 'Zonsondergang over', sunrise_in: 'Zonsopgang over', hm_join: ' en ', no_data: 'Geen gegevens beschikbaar' },
  fr: { sunrise: 'lever', sunset: 'coucher', daily: 'Quotidien', hourly: 'Horaire', sunset_in: 'Coucher du soleil dans', sunrise_in: 'Lever du soleil dans', hm_join: ' et ', no_data: 'Aucune donnée disponible' },
  pl: { sunrise: 'wschód', sunset: 'zachód', daily: 'Dzienna', hourly: 'Godzinowa', sunset_in: 'Zachód za', sunrise_in: 'Wschód za', hm_join: ' ', no_data: 'Brak danych' },
  sv: { sunrise: 'soluppgång', sunset: 'solnedgång', daily: 'Daglig', hourly: 'Timvis', sunset_in: 'Solnedgång om', sunrise_in: 'Soluppgång om', hm_join: ' ', no_data: 'Ingen data tillgänglig' },
};

// Sigle bussola a 16 punti per lingua (le lettere cambiano: E/O in IT, E/W in EN...).
// Una lingua senza voce qui ripiega automaticamente su 'en'.
const WIND_DIRS = {
  it: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'],
  en: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'],
  de: ['N', 'NNO', 'NO', 'ONO', 'O', 'OSO', 'SO', 'SSO', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'],
  nl: ['N', 'NNO', 'NO', 'ONO', 'O', 'OZO', 'ZO', 'ZZO', 'Z', 'ZZW', 'ZW', 'WZW', 'W', 'WNW', 'NW', 'NNW'],
  fr: ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'],
  sv: ['N', 'NNO', 'NO', 'ONO', 'O', 'OSO', 'SO', 'SSO', 'S', 'SSV', 'SV', 'VSV', 'V', 'VNV', 'NV', 'NNV'],
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
      // selettore in-card per cambiare l'attributo del grafico al volo (solo
      // layout 'graph'): disattivato di default
      show_forecast_attribute_toggle: false,
      // stile del selettore in-card: 'dropdown' (tendina, default) o 'chips'
      forecast_attribute_toggle_style: 'dropdown',
      locale: 'it-IT',
      time_format: '24',
      // lingua della card: 'it', 'en' oppure 'system' (segue HA/browser)
      language: 'system',
      // mostra/nascondi le sezioni superiori
      show_time: true,
      show_date: true,
      // stile visualizzazione sole: 'arc' | 'bar' | 'none' (default arc).
      // Nessun default esplicito qui: lo risolve _sunStyle() per la retrocompat
      // col vecchio toggle show_arc.
      // decimali temperatura attuale (default 1); decimali previsioni (default 0)
      current_temp_decimals: 1,
      forecast_temp_decimals: 0,
      // azione al click sulla card (standard HA). Default: more-info entita' meteo
      tap_action: { action: 'more-info' },
      // layout previsioni giornaliere: 'bars' (righe con barre) o 'graph'
      // (grafico orizzontale a due linee con icone sopra e mm sotto)
      forecast_layout: 'bars',
      // colora per valore (barre + grafico): true = temperatura a gradiente,
      // UV/percepita/rugiada con la loro scala; false = temperatura statica
      // teal->arancio e attributi a valore singolo a colore piatto.
      // 'graph_color_by_temp' resta come alias retrocompatibile (vecchio nome).
      color_by_value: true,
      // nel layout 'graph': false = pioggia come testo; true = barrette
      graph_precip_bars: false,
      // nel layout 'graph': quale attributo del forecast tracciare come linea.
      // 'temperature' = comportamento storico (max/min, scala colore, banda);
      // ogni altro attributo = linea singola con asse riscalato
      forecast_attribute: 'temperature',
      // quante righe di previsione restano sempre visibili; le altre
      // diventano scrollabili verticalmente. null = mostra tutte senza scroll.
      visible_rows: null,
      // sfondo: 'transparent' rimuove sfondo, ombra e bordo (la card si fonde
      // con la dashboard). 'background_image' imposta un'immagine di sfondo
      // (URL o percorso /local/...). Con l'immagine, un velo automatico
      // preserva la leggibilita' del testo.
      transparent: false,
      background_image: null,
      // sfondo CSS libero (colore o gradiente). Precedenza: immagine > css >
      // trasparente > tema.
      background_css: null,
      // testo chiaro forzato (per sfondi scuri): aggiunge la classe bg-dark
      light_text: false,
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
    // attributo attivo del grafico (chip in-card): parte dal valore configurato
    this._forecastAttrMode = this._config.forecast_attribute || 'temperature';
    this._daily = null;
    this._hourly = null;
    this._dailyFetchedAt = 0;
    this._hourlyFetchedAt = 0;
    this._iconUid = 0;
    // firma dell'icona corrente: evita di ricostruirla (e riavviare la sua
    // animazione) quando hass si aggiorna per entita' che non c'entrano nulla
    this._curIconSig = null;
    // firme dei dettagli: evitano di riscrivere la griglia (e riagganciare i
    // tooltip) quando il contenuto mostrato non e' cambiato
    this._detailsHtml = null;
    this._customDetailsHtml = null;
    // firme delle previsioni: evitano di ricostruire barre/orarie/grafico
    // quando i dati mostrati non sono cambiati. _lastForecastKind serve a
    // resettarle quando si cambia modalita'/layout (stesso contenitore condiviso)
    this._barsSig = null;
    this._hourlySig = null;
    this._graphSig = null;
    this._compactSig = null;
    this._lastForecastKind = null;
    // larghezza utile del contenitore grafico, misurata via ResizeObserver
    // invece che a ogni render (evita un reflow sincrono per tick)
    this._graphWidth = 0;

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
        ha-card.bg-dark .forecast-row .label,
        ha-card.bg-dark .forecast-row .temp-min,
        ha-card.bg-dark .forecast-row .temp-max,
        ha-card.bg-dark .graph-nodata,
        ha-card.bg-dark .compact-col .c-day,
        ha-card.bg-dark .compact-col .c-max,
        ha-card.bg-dark .compact-col .c-min,
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
        .arc-wrap.bar-mode {
          height: 52px;
          margin: 14px 0 14px;
        }
        .sun-bar-track {
          stroke: color-mix(in srgb, var(--secondary-text-color, #888) 30%, transparent);
          stroke-width: 3;
          stroke-linecap: round;
        }
        .sun-bar-progress {
          stroke: #e8b23a;
          stroke-width: 3;
          stroke-linecap: round;
          opacity: 0.7;
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
        .sun-countdown {
          font-size: 10px;
          fill: var(--secondary-text-color);
          opacity: 0.6;
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
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }

        /* --- Previsioni --- */
        /* riga controlli: toggle Giorni/Ore (fisso) + chip attributi (scorrono).
           Una sola riga, mai a capo, cosi' la card non si allunga. */
        .forecast-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          min-width: 0;
        }
        .forecast-controls:empty { display: none; }
        .forecast-toggle {
          display: inline-flex;
          flex: none;
          gap: 2px;
          padding: 2px;
          border-radius: 999px;
          background: var(--divider-color, #e5e5e5);
        }
        /* chip attributi: occupano lo spazio restante e scorrono in orizzontale */
        .attr-chips {
          display: flex;
          flex: 1;
          min-width: 0;
          gap: 7px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 16px), transparent 100%);
          mask-image: linear-gradient(to right, #000 calc(100% - 16px), transparent 100%);
        }
        .attr-chips::-webkit-scrollbar { width: 0; height: 0; display: none; }
        .attr-chip {
          flex: none;
          border: none;
          font: inherit;
          font-size: 0.82em;
          font-weight: 600;
          padding: 5px 13px;
          border-radius: 999px;
          cursor: pointer;
          background: var(--divider-color, #e5e5e5);
          color: var(--secondary-text-color);
          transition: background 0.15s, color 0.15s;
        }
        .attr-chip.active {
          background: var(--primary-color);
          color: var(--text-primary-color, #fff);
        }
        /* selettore a tendina (stile alternativo alle chip) */
        .attr-select-wrap { position: relative; flex: none; }
        .attr-select-wrap::after {
          content: '▾';
          position: absolute; right: 11px; top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--secondary-text-color);
          font-size: 0.7em;
        }
        .attr-select {
          appearance: none; -webkit-appearance: none;
          border: none; font: inherit; font-size: 0.82em; font-weight: 600;
          padding: 6px 26px 6px 13px;
          border-radius: 999px; cursor: pointer;
          background: var(--divider-color, #e5e5e5);
          color: var(--primary-text-color);
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
          gap: 6px;
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
        .graph-nodata {
          padding: 24px 12px; text-align: center;
          font-size: 13px; color: var(--secondary-text-color);
        }
        /* layout compatto: colonne orizzontali giorno + icona + temperature */
        .fc-compact { display: flex; gap: 2px; }
        .compact-col {
          display: flex; flex-direction: column; align-items: center;
          gap: 5px; padding: 2px 0; min-width: 0;
        }
        .compact-col .c-day {
          font-size: 0.82em; font-weight: 500;
          color: var(--secondary-text-color); white-space: nowrap;
        }
        .compact-col .c-ic { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .compact-col .c-ic svg { width: 100%; height: 100%; overflow: hidden; }
        .compact-col .c-max { font-size: 0.95em; font-weight: 700; color: var(--primary-text-color); }
        .compact-col .c-min { font-size: 0.82em; color: var(--secondary-text-color); }
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
        /* quando almeno un giorno ha pioggia, riserva una colonna destra fissa
           su tutte le righe: barre di larghezza uniforme e mm sotto la massima */
        .forecast-row.has-precip {
          grid-template-columns: 40px 28px 30px 1fr 50px;
        }
        .temp-group {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 0;
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
          line-height: 1;
          margin-top: -1px;
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
          <div class="forecast-controls" id="forecast-controls">
            <div class="forecast-toggle" id="forecast-toggle">
              <button type="button" data-mode="daily">Giorni</button>
              <button type="button" data-mode="hourly">Ore</button>
            </div>
            <div class="attr-chips" id="attr-chips"></div>
            <div class="attr-select-wrap" id="attr-select-wrap">
              <select class="attr-select" id="attr-select"></select>
            </div>
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
        this._renderAttrChips();
        this._maybeFetchForecast();
      });
    }

    // gestione chip attributo del grafico: cambia l'attributo tracciato al volo
    const chips = this.shadowRoot.getElementById('attr-chips');
    if (chips) {
      chips.addEventListener('click', (ev) => {
        const btn = ev.target.closest('button[data-attr]');
        if (!btn) return;
        const attr = btn.dataset.attr;
        if (attr === this._forecastAttrMode) return;
        this._forecastAttrMode = attr;
        this._renderAttrChips();
        // reset firme (barre + grafico) per forzare il ridisegno dell'attributo
        this._graphSig = null; this._barsSig = null; this._hourlySig = null;
        this._renderForecast();
      });
      // rotella del mouse -> scroll orizzontale delle chip (come il grafico)
      chips.addEventListener('wheel', (ev) => {
        if (chips.scrollWidth <= chips.clientWidth) return; // niente da scorrere
        const delta = Math.abs(ev.deltaX) > Math.abs(ev.deltaY) ? ev.deltaX : ev.deltaY;
        if (delta === 0) return;
        chips.scrollLeft += delta;
        ev.preventDefault();
      }, { passive: false });
    }

    // selettore a tendina dell'attributo (stile alternativo alle chip)
    const attrSel = this.shadowRoot.getElementById('attr-select');
    if (attrSel) {
      attrSel.addEventListener('change', (ev) => {
        const attr = ev.target.value;
        if (!attr || attr === this._forecastAttrMode) return;
        this._forecastAttrMode = attr;
        this._graphSig = null; this._barsSig = null; this._hourlySig = null;
        this._renderForecast();
      });
    }

    // click/hold/double sulla card -> azioni standard HA
    const card = this.shadowRoot.querySelector('ha-card');
    if (card) {
      let holdTimer = null;
      let held = false;
      let clickTimer = null;

      const isInternal = (ev) => ev.target.closest('.forecast-controls');

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
    this._renderAttrChips();
  }

  // Etichetta corta e localizzata per una chip attributo.
  _attrChipLabel(attr) {
    const m = GRAPH_ATTR_SHORT[langCode(this._locale())] || GRAPH_ATTR_SHORT.en;
    return m[attr] || attr;
  }

  // Attributi (tra GRAPH_ATTRS) realmente presenti nelle previsioni correnti
  // (daily o hourly a seconda della modalita'). null se i dati non ci sono ancora.
  _availAttrsFromForecast() {
    const src = this._forecastMode === 'hourly' ? this._hourly : this._daily;
    if (!src || !src.length) return null;
    return GRAPH_ATTRS.filter((a) => a === 'temperature' || src.some((d) => typeof d[a] === 'number'));
  }

  // Lista di attributi offerti nel selettore in-card. L'attributo di default
  // (forecast_attribute) e' SEMPRE incluso, in testa. 'forecast_attributes' elenca
  // gli ALTRI attributi da aggiungere:
  //  - chiave assente  -> offri tutti i disponibili (default incluso)
  //  - array (anche []) -> offri default + quelli elencati
  _attrChipList() {
    const avail = this._availAttrsFromForecast();
    const def = this._config.forecast_attribute || 'temperature';
    const defOk = !avail || avail.includes(def);
    const cfg = this._config.forecast_attributes;
    let list;
    if (Array.isArray(cfg)) {
      const extras = cfg.filter((a) => GRAPH_ATTRS.includes(a) && a !== def && (!avail || avail.includes(a)));
      list = defOk ? [def, ...extras] : extras;
    } else {
      // non configurato: tutti i disponibili, con il default in testa
      list = avail ? avail.slice() : [];
      if (defOk && !list.includes(def)) list.unshift(def);
      else if (defOk) list = [def, ...list.filter((a) => a !== def)];
    }
    return list;
  }

  // Disegna il selettore attributo in-card (solo layout grafico + opzione
  // attiva), come tendina (default) o chip, e gestisce la visibilita' della
  // riga controlli. Una riga, mai a capo.
  _renderAttrChips() {
    const wrap = this.shadowRoot && this.shadowRoot.getElementById('forecast-controls');
    const box = this.shadowRoot && this.shadowRoot.getElementById('attr-chips');
    const selWrap = this.shadowRoot && this.shadowRoot.getElementById('attr-select-wrap');
    const sel = this.shadowRoot && this.shadowRoot.getElementById('attr-select');
    if (!box || !wrap || !selWrap || !sel) return;
    // il selettore vale per entrambi i layout (barre e grafico)
    const on = this._config.show_forecast_attribute_toggle === true;
    const list = on ? this._attrChipList() : [];
    // l'attributo attivo deve essere tra gli offerti (anche se e' uno solo):
    // cosi' mettere un solo attributo traccia direttamente quello
    if (list.length && !list.includes(this._forecastAttrMode)) {
      this._forecastAttrMode = list[0];
      this._graphSig = null;
    }
    // il selettore (chip/tendina) ha senso solo con almeno 2 scelte
    const showSel = list.length >= 2;
    const useChips = this._config.forecast_attribute_toggle_style === 'chips';
    const toggleOn = this._config.show_forecast_toggle === true;

    if (!showSel) {
      // niente selettore: nascondi entrambe le forme (il grafico mostra comunque
      // l'attributo attivo, che con lista di 1 e' quell'unico attributo)
      if (box.dataset.sig !== '') { box.innerHTML = ''; box.dataset.sig = ''; }
      box.style.display = 'none';
      selWrap.style.display = 'none';
    } else if (useChips) {
      selWrap.style.display = 'none';
      box.style.display = 'flex';
      const sig = `${list.join(',')}|${this._forecastAttrMode}`;
      if (box.dataset.sig !== sig) {
        box.dataset.sig = sig;
        box.innerHTML = list.map((a) =>
          `<button type="button" class="attr-chip${a === this._forecastAttrMode ? ' active' : ''}" data-attr="${a}">${this._attrChipLabel(a)}</button>`
        ).join('');
      }
    } else {
      // tendina
      box.style.display = 'none';
      selWrap.style.display = 'block';
      // la tendina resta sempre a destra, anche senza il toggle Giorni/Ore
      selWrap.style.marginLeft = 'auto';
      const sig = list.join(',');
      if (sel.dataset.sig !== sig) {
        sel.dataset.sig = sig;
        sel.innerHTML = list.map((a) =>
          `<option value="${a}">${this._attrChipLabel(a)}</option>`
        ).join('');
      }
      if (sel.value !== this._forecastAttrMode) sel.value = this._forecastAttrMode;
    }
    // la riga controlli si mostra se c'e' il toggle Giorni/Ore o il selettore
    wrap.style.display = (toggleOn || showSel) ? 'flex' : 'none';
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

      // precedenza sfondo: immagine > css > trasparente > tema.
      const bg = this._config.background_image;
      const hasBg = !!bg;
      const css = (this._config.background_css || '').trim();
      const hasCss = !!css && !hasBg;              // l'immagine vince sul css
      const lightText = this._config.light_text === true;

      // sfondo trasparente solo se non c'e' ne' immagine ne' css
      const wantTransparent = this._config.transparent === true && !hasBg && !hasCss;
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
      let autoDark = false;
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
        autoDark = dark && op >= 0.4;
      } else if (hasCss) {
        // sfondo CSS libero: colore pieno o gradiente
        cardEl.classList.remove('has-bg-image');
        cardEl.style.setProperty('background-color', 'transparent', 'important');
        cardEl.style.setProperty('--ha-card-background', 'transparent', 'important');
        cardEl.style.setProperty('--card-background-color', 'transparent', 'important');
        if (/gradient|url\(/i.test(css)) {
          cardEl.style.setProperty('background-image', css, 'important');
          cardEl.style.removeProperty('background-color');
          cardEl.style.setProperty('background-color', 'transparent', 'important');
        } else {
          // colore pieno
          cardEl.style.setProperty('background-image', 'none', 'important');
          cardEl.style.setProperty('background-color', css, 'important');
          cardEl.style.setProperty('--ha-card-background', css, 'important');
          cardEl.style.setProperty('--card-background-color', css, 'important');
        }
      } else {
        cardEl.classList.remove('has-bg-image');
        cardEl.style.removeProperty('background-image');
        if (!wantTransparent) {
          cardEl.style.removeProperty('background-color');
          cardEl.style.removeProperty('--ha-card-background');
          cardEl.style.removeProperty('--card-background-color');
        }
      }
      // testo chiaro: automatico (velo scuro forte su immagine) o forzato da light_text
      cardEl.classList.toggle('bg-dark', lightText || autoDark);
    }

    timeEl.textContent = timeFmt.format(now);
    dateEl.textContent = dateFmt.format(now);

    // mostra/nascondi ora, data, arco
    const showTime = cfg.show_time !== false;
    const showDate = cfg.show_date !== false;
    const sunStyle = this._sunStyle(cfg);
    timeEl.style.display = showTime ? '' : 'none';
    dateEl.style.display = showDate ? '' : 'none';
    // nascondi l'intera riga header solo se sia ora sia data sono off
    if (headerEl) headerEl.style.display = (showTime || showDate) ? '' : 'none';
    if (arcWrap) arcWrap.style.display = (sunStyle !== 'none') ? '' : 'none';

    this._renderCurrent(now);
    if (sunStyle !== 'none') this._renderSunArc(now);
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
    if (this._isNightAt(new Date(datetime))) {
      // condizioni diurne -> varianti notturne
      if (condition === 'sunny') return 'clear-night';
      if (condition === 'partlycloudy') return 'partlycloudy-night';
    } else {
      // conversione inversa: condizioni notturne durante ore diurne
      if (condition === 'clear-night') return 'sunny';
      if (condition === 'partlycloudy-night') return 'partlycloudy';
    }
    return condition;
  }

  // Risolve la lingua scelta in un locale effettivo.
  // Es. 'it' -> it-IT; 'system' -> lingua di HA/browser. Vedi SUPPORTED_LANGS.
  _locale() {
    const lang = this._config.language || 'system';
    if (SUPPORTED_LANGS[lang]) return SUPPORTED_LANGS[lang];
    // system: usa la lingua dell'utente HA, poi il browser, poi it-IT
    return (this._hass && this._hass.locale && this._hass.locale.language)
      || (this._hass && this._hass.language)
      || navigator.language
      || 'it-IT';
  }

  // Etichetta condizione meteo tradotta secondo la lingua effettiva.
  _conditionLabel(state) {
    const table = CONDITION_LABELS[langCode(this._locale())] || CONDITION_LABELS.en;
    return table[state] || state;
  }

  // Etichette dell'interfaccia (alba/tramonto sotto l'arco) nella lingua attiva.
  _uiLabels() {
    return UI_LABELS[langCode(this._locale())] || UI_LABELS.en;
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

  // Temperatura attuale: dal sensore custom se configurato (current_temp_entity),
  // altrimenti dall'attributo temperature del weather. Fallback silenzioso.
  _currentTemp() {
    const entity = this._config.current_temp_entity;
    if (entity) {
      const s = this._hass && this._hass.states[entity];
      if (s) {
        const v = parseFloat(s.state);
        if (isFinite(v)) return v;
      }
    }
    const wState = this._hass && this._hass.states[this._config.entity];
    return wState ? wState.attributes.temperature : null;
  }

  // Formatta una temperatura delle previsioni con i decimali configurati.
  // forecast_temp_decimals: 0 (default) = intero; 1 = un decimale.
  _fmtForecastTemp(val) {
    if (val == null) return '—';
    const dec = this._config.forecast_temp_decimals === 1 ? 1 : 0;
    return dec === 0 ? String(Math.round(val)) : val.toFixed(1);
  }

  _renderCurrent(now) {
    const wState = this._hass.states[this._config.entity];
    if (!wState) return;

    let condition = wState.state;
    // di notte converti le condizioni "diurne" (sole / parz. nuvoloso) nelle
    // varianti notturne: alcune integrazioni mandano sunny/partlycloudy anche
    // di notte, e senza questo l'icona principale mostrerebbe il sole di notte
    const night = this._isNight(now);
    if (night) {
      // integrazioni lente a cambiare: sunny/partlycloudy di notte -> varianti notturne
      if (condition === 'sunny') condition = 'clear-night';
      else if (condition === 'partlycloudy') condition = 'partlycloudy-night';
    } else {
      // conversione inversa: clear-night di giorno -> sunny (meteo ancora al passo precedente)
      if (condition === 'clear-night') condition = 'sunny';
    }

    const temp = this._currentTemp();
    const unit = wState.attributes.temperature_unit || '\u00b0';

    const numFmt = new Intl.NumberFormat(this._locale(), {
      maximumFractionDigits: this._config.current_temp_decimals === 0 ? 0 : 1,
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
          hilo = `${this._fmtForecastTemp(hi)}${unit} / ${this._fmtForecastTemp(lo)}${unit}`;
        }
      }
    }

    // ricostruisci l'icona grande solo se la condizione mostrata (o l'on/off
    // delle animazioni) e' davvero cambiata: hass puo' aggiornarsi molte volte
    // al minuto per sensori che non c'entrano nulla con questa card, e ogni
    // ricostruzione riavvierebbe l'animazione SMIL da capo
    const animatedFlag = this._config.animated_icons !== false;
    const curIconSig = `${condition}|${animatedFlag}`;
    if (this._curIconSig !== curIconSig) {
      this._curIconSig = curIconSig;
      this._iconUid += 1;
      this.shadowRoot.getElementById('cur-icon').innerHTML =
        this._icon(condition, this._iconUid, 68);
    }
    const descEl = this.shadowRoot.getElementById('cur-desc');
    // usa la condizione gia' corretta per giorno/notte (non lo stato raw del meteo)
    // cosi' icona e testo restano sempre coerenti
    descEl.textContent = this._conditionLabel(condition);
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
    const dirs = WIND_DIRS[langCode(this._locale())] || WIND_DIRS.en;
    return dirs[Math.round(deg / 22.5) % 16];
  }

  // Normalizza il formato della lista details: accetta sia stringhe ('pressure')
  // sia oggetti ({attribute:'pressure', decimals:2}). Restituisce sempre oggetti.
  _normalizeDetails() {
    return (this._config.details || []).map((d) =>
      typeof d === 'string' ? { attribute: d, decimals: 0 } : d
    );
  }

  // Formatta un valore numerico con i decimali configurati per quell'attributo.
  _fmtDetailVal(val, decimals) {
    if (val == null) return null;
    const d = typeof decimals === 'number' && decimals > 0 ? decimals : 0;
    return d === 0 ? String(Math.round(val)) : Number(val).toFixed(d);
  }

  // Escape anti-XSS per ogni valore proveniente da hass.states prima di inserirlo
  // in innerHTML: stati/attributi di entita' arbitrarie possono contenere testo
  // esterno (titoli RSS, eventi calendario, API cloud) con markup.
  _esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  _renderDetails() {
    const box = this.shadowRoot.getElementById('details');
    if (!box) return;
    const wState = this._hass.states[this._config.entity];
    if (!wState) { box.innerHTML = ''; this._detailsHtml = ''; return; }
    const a = wState.attributes;

    // valore di oggi dalla previsione giornaliera (per precipitazioni)
    let today = null;
    if (this._daily && this._daily.length) {
      const todayStr = new Date().toDateString();
      today = this._daily.find(
        (d) => new Date(d.datetime).toDateString() === todayStr
      ) || this._daily[0];
    }

    const round = (v, dec) => this._fmtDetailVal(v, dec ?? 0);

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
      // slot combinato: velocita' + direzione in un unico elemento
      wind: {
        icon: 'mdi:weather-windy',
        val: (() => {
          const spd = a.wind_speed != null ? `${round(a.wind_speed)} ${a.wind_speed_unit || 'km/h'}` : null;
          const dir = a.wind_bearing != null
            ? (typeof a.wind_bearing === 'number' ? this._bearingToText(a.wind_bearing) : a.wind_bearing)
            : null;
          if (spd && dir) return `${spd} (${dir})`;
          return spd || dir || null;
        })(),
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

    const stdItems = this._normalizeDetails()
      .map(({ attribute: key, decimals }) => {
        // ricostruisce defs con i decimali configurati per questo attributo
        const defsWithDec = {
          ...defs,
          humidity:     { ...defs.humidity,     val: a.humidity != null ? `${round(a.humidity, decimals)} %` : null },
          pressure:     { ...defs.pressure,     val: a.pressure != null ? `${round(a.pressure, decimals)} ${a.pressure_unit || 'hPa'}` : null },
          wind_speed:   { ...defs.wind_speed,   val: a.wind_speed != null ? `${round(a.wind_speed, decimals)} ${a.wind_speed_unit || 'km/h'}` : null },
          precipitation: { ...defs.precipitation, val: (() => {
            let p = null;
            if (a.precipitation != null) p = a.precipitation;
            else if (today && today.precipitation != null) p = today.precipitation;
            const unit = a.precipitation_unit || 'mm';
            return p != null ? `${round(p, decimals)} ${unit}` : null;
          })() },
          precipitation_probability: { ...defs.precipitation_probability, val: a.precipitation_probability != null ? `${round(a.precipitation_probability, decimals)} %` : null },
          visibility:   { ...defs.visibility,   val: a.visibility != null ? `${round(a.visibility, decimals)} ${a.visibility_unit || 'km'}` : null },
          apparent_temperature: { ...defs.apparent_temperature, val: a.apparent_temperature != null ? `${round(a.apparent_temperature, decimals)}${a.temperature_unit || '°'}` : null },
          cloud_coverage: { ...defs.cloud_coverage, val: a.cloud_coverage != null ? `${round(a.cloud_coverage, decimals)} %` : null },
          uv_index:     { ...defs.uv_index,     val: a.uv_index != null ? `${round(a.uv_index, decimals)}` : null },
          dew_point:    { ...defs.dew_point,    val: a.dew_point != null ? `${round(a.dew_point, decimals)}${a.temperature_unit || '°'}` : null },
        };
        const def = defsWithDec[key];
        if (!def || def.val == null) return '';
        const rot = def.rotate != null
          ? ` style="transform: rotate(${def.rotate}deg);"` : '';
        const wide = key === 'wind' ? ' detail-item--wide' : '';
        return `
          <div class="detail-item${wide}">
            <ha-icon icon="${def.icon}"${rot}></ha-icon>
            <span class="d-val">${this._esc(def.val)}</span>
          </div>`;
      });

    const stdHtml = stdItems.join('');
    if (this._detailsHtml !== stdHtml) {
      this._detailsHtml = stdHtml;
      box.innerHTML = stdHtml;
    }

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
          const iconHtml = c.icon ? `<ha-icon icon="${this._esc(c.icon)}"></ha-icon>` : '';
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
          const nameEsc = this._esc(name);
          const nameHtml = showNames ? `<span class="cd-name">${nameEsc}</span>` : '';
          // il tooltip al tocco serve solo quando i nomi NON sono mostrati sotto
          const tipAttrs = showNames ? '' : ` title="${nameEsc}" data-name="${nameEsc}"`;
          const tipClass = showNames ? '' : ' has-tip';
          return `
            <div class="custom-item${tipClass}"${tipAttrs}>
              <div class="cd-row">
                ${iconHtml}
                <span class="d-val">${this._esc(val)}</span>
              </div>
              ${nameHtml}
            </div>`;
        });
      const customHtml = customItems.join('');
      if (this._customDetailsHtml !== customHtml) {
        this._customDetailsHtml = customHtml;
        cbox.innerHTML = customHtml;
        cbox.style.display = customItems.some((x) => x) ? '' : 'none';
        this._wireDetailTips(cbox);
      }
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

  // Testo del countdown: di giorno "manca X al tramonto", di notte all'alba.
  // Usa next_setting/next_rising del sun entity (sempre la prossima occorrenza).
  _sunCountdownText() {
    if (this._config.show_sun_countdown !== true) return '';
    const sunState = this._hass && this._hass.states[this._config.sun_entity];
    if (!sunState) return '';
    const now = new Date();
    const night = this._isNight(now);
    const iso = night ? sunState.attributes.next_rising : sunState.attributes.next_setting;
    if (!iso) return '';
    let diffMin = Math.round((new Date(iso) - now) / 60000);
    if (diffMin < 0) diffMin = 0;
    const h = Math.floor(diffMin / 60);
    const m = diffMin % 60;
    const L = this._uiLabels();
    const label = night ? L.sunrise_in : L.sunset_in;
    const time = h > 0 ? `${h}h${L.hm_join}${m}m` : `${m}m`;
    return `${label} ${time}`;
  }

  // stile visualizzazione sole risolto: 'arc' | 'bar' | 'none'.
  // Retrocompatibile col vecchio toggle show_arc (false -> 'none').
  _sunStyle(cfg) {
    const c = cfg || this._config || {};
    if (c.sun_style === 'arc' || c.sun_style === 'bar' || c.sun_style === 'none') return c.sun_style;
    if (c.show_arc === false) return 'none';
    return 'arc';
  }

  _renderSunArc(now) {
    const svg = this.shadowRoot.getElementById('arc-svg');
    const sunState = this._hass.states[this._config.sun_entity];
    if (!sunState || !sunState.attributes.next_rising) {
      svg.innerHTML = '';
      return;
    }

    const wrap = this.shadowRoot.querySelector('.arc-wrap');
    const style = this._sunStyle();

    const { sunrise, sunset } = this._getTodaySunTimes(sunState, now);
    const total = sunset - sunrise;
    let fraction = total > 0 ? (now - sunrise) / total : 0;
    const isDaytime = fraction >= 0 && fraction <= 1;
    fraction = Math.min(1, Math.max(0, fraction));

    // posizione lungo l'arco/barra: di giorno segue il sole (alba -> tramonto);
    // di notte la luna percorre l'arco dal tramonto (destra) all'alba (sinistra),
    // culminando in alto a mezzanotte. La finestra notturna va dal tramonto che
    // ha iniziato la notte (next_setting - 24h) alla prossima alba (next_rising).
    let posFraction = fraction;
    if (!isDaytime) {
      const DAY_MS = 24 * 60 * 60 * 1000;
      const nightEnd = new Date(sunState.attributes.next_rising);
      const nightStart = new Date(new Date(sunState.attributes.next_setting).getTime() - DAY_MS);
      const nightTotal = nightEnd - nightStart;
      let nf = nightTotal > 0 ? (now - nightStart) / nightTotal : 0;
      nf = Math.min(1, Math.max(0, nf));
      posFraction = 1 - nf; // notte: da destra (tramonto) a sinistra (alba)
    }

    const timeFmt = new Intl.DateTimeFormat(this._locale(), {
      hour: '2-digit',
      minute: '2-digit',
      hour12: this._config.time_format === '12',
    });
    const dotClass = isDaytime ? 'sun-dot' : 'moon-dot';
    const L = this._uiLabels();
    const countdown = this._sunCountdownText();

    const cx = 120, cy = 46, rx = 100, peak = 34;
    const x0 = cx - rx;      // punto alba (sinistra)
    const x2 = cx + rx;      // punto tramonto (destra)

    // --- BARRA: versione minimale/piatta dell'arco (compatta) ---
    if (style === 'bar') {
      if (wrap) wrap.classList.add('bar-mode');
      svg.setAttribute('viewBox', '0 0 240 52');
      const lineY = 13;
      const bx = x0 + posFraction * (x2 - x0); // pallino sulla retta (sole/luna)
      const progress = isDaytime
        ? `<line class="sun-bar-progress" x1="${x0}" y1="${lineY}" x2="${bx.toFixed(1)}" y2="${lineY}" />`
        : '';
      const cdBar = countdown
        ? `<text class="sun-countdown" id="sun-countdown" x="${cx}" y="32" text-anchor="middle">${countdown}</text>`
        : '';
      svg.innerHTML = `
        <line class="sun-bar-track" x1="${x0}" y1="${lineY}" x2="${x2}" y2="${lineY}" />
        ${progress}
        <circle class="${dotClass}" cx="${bx.toFixed(1)}" cy="${lineY}" r="6" />
        <text class="sun-time-label" x="${x0}" y="32" text-anchor="middle">${timeFmt.format(sunrise)}</text>
        <text class="sun-time-sub"   x="${x0}" y="43" text-anchor="middle">${L.sunrise}</text>
        <text class="sun-time-label" x="${x2}" y="32" text-anchor="middle">${timeFmt.format(sunset)}</text>
        <text class="sun-time-sub"   x="${x2}" y="43" text-anchor="middle">${L.sunset}</text>
        ${cdBar}
      `;
      return;
    }

    // --- ARCO: curva bezier (come prima) ---
    if (wrap) wrap.classList.remove('bar-mode');
    svg.setAttribute('viewBox', '0 0 240 64');
    const ctrlY = cy - peak * 2; // punto di controllo: peak reale = meta'
    const t = posFraction;
    const mt = 1 - t;
    const sx = mt * mt * x0 + 2 * mt * t * cx + t * t * x2;
    const sy = mt * mt * cy + 2 * mt * t * ctrlY + t * t * cy;

    // countdown al prossimo alba/tramonto, centrato tra i due orari (piu' tenue)
    const countdownEl = countdown
      ? `<text class="sun-countdown" id="sun-countdown" x="${cx}" y="${cy + 15}" text-anchor="middle">${countdown}</text>`
      : '';

    svg.innerHTML = `
      <path class="arc-path" d="M ${x0} ${cy} Q ${cx} ${ctrlY} ${x2} ${cy}" />
      <line class="horizon-line" x1="${x0 - 6}" y1="${cy}" x2="${x2 + 6}" y2="${cy}" />
      <circle class="${dotClass}" cx="${sx}" cy="${sy}" r="7" />
      <text class="sun-time-label" x="${x0}" y="${cy + 15}" text-anchor="middle">${timeFmt.format(sunrise)}</text>
      <text class="sun-time-sub"   x="${x0}" y="${cy + 26}" text-anchor="middle">${L.sunrise}</text>
      <text class="sun-time-label" x="${x2}" y="${cy + 15}" text-anchor="middle">${timeFmt.format(sunset)}</text>
      <text class="sun-time-sub"   x="${x2}" y="${cy + 26}" text-anchor="middle">${L.sunset}</text>
      ${countdownEl}
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
    // layout 'none': nasconde del tutto la sezione previsioni (header, arco e
    // dettagli restano). Il forecast daily continua comunque a caricarsi perche'
    // serve all'intestazione (max/min di oggi).
    const listWrap = this.shadowRoot.querySelector('.forecast-list');
    if (this._config.forecast_layout === 'none') {
      if (listWrap) listWrap.style.display = 'none';
      return;
    }
    if (listWrap) listWrap.style.display = '';

    const scroll = this.shadowRoot.getElementById('forecast-scroll');
    const graph = this._config.forecast_layout === 'graph';
    const compact = this._config.forecast_layout === 'compact';
    // se cambia il "tipo" di previsione mostrata, azzera le firme: lo stesso
    // contenitore e' condiviso, quindi il nuovo renderer deve sempre ridisegnare
    const base = compact ? 'compact' : (graph ? 'graph' : 'bars');
    const kind = `${base}-${this._forecastMode === 'hourly' ? 'hourly' : 'daily'}`;
    if (kind !== this._lastForecastKind) {
      this._lastForecastKind = kind;
      this._barsSig = null;
      this._hourlySig = null;
      this._graphSig = null;
      this._compactSig = null;
    }
    if (compact) {
      // layout compatto: colonne orizzontali (scroll come il grafico)
      if (scroll) scroll.classList.add('graph-mode');
      this._renderForecastCompact(this._forecastMode === 'hourly');
    } else if (graph) {
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

  _renderForecastCompact(hourly) {
    const list = this.shadowRoot.getElementById('forecast-scroll');
    const source = hourly ? this._hourly : this._daily;
    if (!list || !source || !source.length) return;
    const days = source.slice(0, hourly ? this._config.forecast_hours : this._config.forecast_days);

    const attr = this._forecastAttrMode || this._config.forecast_attribute || 'temperature';
    const isTemp = attr === 'temperature';

    // attributo a valore singolo senza dati -> messaggio
    if (!isTemp && !days.some((d) => this._fcAttrValue(d, attr) != null)) {
      const sig = `nodata:${attr}`;
      if (this._compactSig !== sig) {
        list.innerHTML = `<div class="graph-nodata">${this._uiLabels().no_data}</div>`;
        this._compactSig = sig; list.style.maxHeight = 'none';
      }
      return;
    }

    const dayFmt = new Intl.DateTimeFormat(this._locale(), { weekday: 'short' });
    const hourFmt = new Intl.DateTimeFormat(this._locale(), { hour: 'numeric', hour12: this._config.time_format === '12' });
    const colLabel = (d) => hourly ? hourFmt.format(new Date(d.datetime)) : dayFmt.format(new Date(d.datetime));

    // larghezza colonna: come il grafico, dalla larghezza misurata del contenitore
    this._ensureGraphResizeObserver(list);
    let cw = this._graphWidth;
    if (!cw) { cw = this._measureGraphWidth(list); this._graphWidth = cw; }
    const vr = this._config.visible_rows;
    const n = Math.min(vr || days.length, days.length);
    let colStyle = 'flex:1';
    if (cw > 0) {
      const colW = Math.max(Math.floor(cw / n), 40);
      colStyle = `flex:0 0 ${colW}px`;
    } else {
      requestAnimationFrame(() => this._renderForecastCompact(hourly));
    }

    const sig = JSON.stringify({
      attr, cw, n, hourly,
      d: days.map((d) => [d.datetime,
        hourly ? this._nightCondition(d.condition, d.datetime) : d.condition,
        this._fcAttrValue(d, attr), isTemp ? d.templow : null]),
    });
    if (this._compactSig === sig) return;
    this._compactSig = sig;

    const cols = days.map((d) => {
      this._iconUid += 1;
      const cond = hourly ? this._nightCondition(d.condition, d.datetime) : d.condition;
      const icon = this._icon(cond, this._iconUid, 28);
      let valsHtml;
      if (isTemp) {
        const hi = d.temperature;
        const lo = hourly ? null : (d.templow != null ? d.templow : d.temperature);
        valsHtml = `<div class="c-max">${this._fmtForecastTemp(hi)}°</div>`
          + (lo != null ? `<div class="c-min">${this._fmtForecastTemp(lo)}°</div>` : '');
      } else {
        valsHtml = `<div class="c-max">${this._graphValLabel(attr, this._fcAttrValue(d, attr))}</div>`;
      }
      return `<div class="compact-col" style="${colStyle}">`
        + `<div class="c-day">${colLabel(d)}</div>`
        + `<div class="c-ic">${icon}</div>${valsHtml}</div>`;
    }).join('');
    list.innerHTML = `<div class="fc-compact">${cols}</div>`;
    list.style.maxHeight = 'none';
  }

  _renderForecastDaily() {
    const list = this.shadowRoot.getElementById('forecast-scroll');
    if (!list || !this._daily || !this._daily.length) return;

    const days = this._daily.slice(0, this._config.forecast_days);
    const dayFmt = new Intl.DateTimeFormat(this._locale(), { weekday: 'short' });

    // attributo tracciato: 'temperature' = barre range (come sempre); ogni altro
    // attributo = barra di livello (riempimento proporzionale al valore)
    const attr = this._forecastAttrMode || this._config.forecast_attribute || 'temperature';
    const isTemp = attr === 'temperature';
    const colorOn = this._colorByValue();

    // temperatura attuale dall'entita' weather, per il pallino su "oggi"
    const wState = this._hass.states[this._config.entity];
    const currentTemp = this._currentTemp();
    const precipUnit = this._esc(wState?.attributes?.precipitation_unit || 'mm');
    // la pioggia resta nella colonna destra, nascosta se l'attributo e' gia' pioggia
    const showPrecip = this._config.show_forecast_precipitation && attr !== 'precipitation';
    const anyPrecip = showPrecip && days.some((d) => d.precipitation != null && d.precipitation > 0);
    const todayStr = new Date().toDateString();

    // scala: range temperatura come prima; per gli altri attributi min/max dei
    // valori con un margine, cosi' le differenze si leggono
    let globalMin; let globalMax;
    if (isTemp) {
      const lows = days.map((d) => d.templow).filter((v) => v != null);
      const highs = days.map((d) => d.temperature).filter((v) => v != null);
      globalMin = Math.min(...lows, ...highs);
      globalMax = Math.max(...lows, ...highs);
    } else {
      const vals = days.map((d) => this._fcAttrValue(d, attr)).filter((v) => v != null);
      if (!vals.length) {
        const sig = `nodata:${attr}`;
        if (this._barsSig !== sig) {
          list.innerHTML = `<div class="graph-nodata">${this._uiLabels().no_data}</div>`;
          this._barsSig = sig;
          list.style.maxHeight = 'none';
        }
        return;
      }
      globalMin = Math.min(...vals);
      globalMax = Math.max(...vals);
      const pad = globalMax === globalMin ? (Math.abs(globalMax) * 0.1 || 1) : (globalMax - globalMin) * 0.15;
      globalMin -= pad;
      globalMax += pad;
    }
    const span = Math.max(globalMax - globalMin, 1);

    // firma sui DATI (non sull'HTML: le icone hanno un uid che cambia a ogni
    // render). Se nulla e' cambiato, non ricostruire ne' riapplicare lo scroll.
    const barsSig = JSON.stringify({
      attr,
      d: days.map((x) => [x.datetime, x.condition, this._fcAttrValue(x, attr), x.templow, x.precipitation]),
      currentTemp, showPrecip, anyPrecip, precipUnit, colorOn,
    });
    if (this._barsSig === barsSig) return;
    this._barsSig = barsSig;

    list.innerHTML = days
      .map((d) => {
        const date = new Date(d.datetime);
        const label = dayFmt.format(date);
        this._iconUid += 1;
        const icon = this._icon(d.condition, this._iconUid, 28);

        // mm di pioggia previsti per il giorno (se presenti e > 0); sui giorni
        // senza pioggia riservo comunque la riga (vuota) quando qualche giorno
        // ce l'ha, cosi' le colonne destre restano allineate
        const hasPrecip = showPrecip && d.precipitation != null && d.precipitation > 0;
        const precipHtml = hasPrecip
          ? `<span class="f-precip">${d.precipitation} ${precipUnit}</span>`
          : (anyPrecip ? '<span class="f-precip">&nbsp;</span>' : '');

        if (isTemp) {
          const low = d.templow != null ? d.templow : d.temperature;
          const high = d.temperature;
          const leftPct = ((low - globalMin) / span) * 100;
          const widthPct = Math.max(((high - low) / span) * 100, 8);
          // colorato per temperatura (gradiente per valore) o statico teal->arancio
          const colorLow = colorOn ? this._tempToColor(low) : '#35b5c4';
          const colorHigh = colorOn ? this._tempToColor(high) : '#ff7a59';
          // pallino temperatura attuale: solo sulla riga di oggi
          let dotHtml = '';
          if (currentTemp != null && date.toDateString() === todayStr) {
            const clampedTemp = Math.min(Math.max(currentTemp, globalMin), globalMax);
            const dotPct = ((clampedTemp - globalMin) / span) * 100;
            dotHtml = `<div class="bar-dot" style="left:${dotPct}%;"></div>`;
          }
          return `
          <div class="forecast-row${anyPrecip ? ' has-precip' : ''}">
            <div class="label">${label}</div>
            <div class="icon-wrap">${icon}</div>
            <div class="temp-min">${this._fmtForecastTemp(low)}\u00b0</div>
            <div class="bar-track">
              <div class="bar-fill" style="left:${leftPct}%; width:${widthPct}%; background:linear-gradient(to right, ${colorLow}, ${colorHigh});"></div>
              ${dotHtml}
            </div>
            <div class="temp-group">
              <span class="temp-max">${this._fmtForecastTemp(high)}\u00b0</span>
              ${precipHtml}
            </div>
          </div>
        `;
        }
        // attributo a valore singolo: barra di livello 0 -> valore
        const v = this._fcAttrValue(d, attr);
        const widthPct = v == null ? 0 : 8 + ((v - globalMin) / span) * 84;
        // UV/percepita/rugiada: scala colore se "colora per valore" e' attivo;
        // gli altri attributi (e tutti quando spento) a colore primario piatto
        const barColor = (colorOn && this._hasColorScale(attr)) ? this._scaleColor(attr, v) : 'var(--primary-color)';
        return `
          <div class="forecast-row${anyPrecip ? ' has-precip' : ''}">
            <div class="label">${label}</div>
            <div class="icon-wrap">${icon}</div>
            <div class="temp-min"></div>
            <div class="bar-track">
              <div class="bar-fill" style="left:0%; width:${widthPct.toFixed(1)}%; background:${barColor};"></div>
            </div>
            <div class="temp-group">
              <span class="temp-max">${this._graphValLabel(attr, v)}</span>
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
      this._hourlySig = '';
      return;
    }

    // attributo tracciato: temperatura (come sempre) o altro attributo a valore
    // singolo. In entrambi i casi la barra oraria e' gia' un "livello".
    const attr = this._forecastAttrMode || this._config.forecast_attribute || 'temperature';
    const isTemp = attr === 'temperature';
    const colorOn = this._colorByValue();
    const vals = hours.map((h) => this._fcAttrValue(h, attr)).filter((v) => v != null);
    if (!vals.length) {
      const sig = `nodata:${attr}`;
      if (this._hourlySig !== sig) {
        list.innerHTML = `<div class="graph-nodata">${this._uiLabels().no_data}</div>`;
        this._hourlySig = sig;
        list.style.maxHeight = 'none';
      }
      return;
    }
    let globalMin = Math.min(...vals);
    let globalMax = Math.max(...vals);
    if (!isTemp) {
      const pad = globalMax === globalMin ? (Math.abs(globalMax) * 0.1 || 1) : (globalMax - globalMin) * 0.15;
      globalMin -= pad;
      globalMax += pad;
    }
    const span = Math.max(globalMax - globalMin, 1);

    const hourFmt = new Intl.DateTimeFormat(this._locale(), {
      hour: 'numeric',
      hour12: this._config.time_format === '12',
    });

    // firma sui DATI (la condizione e' quella gia' adattata giorno/notte, cosi'
    // riflette esattamente l'icona disegnata). Se invariata, non ricostruire.
    const hourlySig = JSON.stringify(
      hours.map((h) => [h.datetime, this._nightCondition(h.condition, h.datetime), this._fcAttrValue(h, attr), attr, colorOn])
    );
    if (this._hourlySig === hourlySig) return;
    this._hourlySig = hourlySig;

    list.innerHTML = hours
      .map((h) => {
        const date = new Date(h.datetime);
        const label = hourFmt.format(date);
        const v = this._fcAttrValue(h, attr);
        // barra come "livello" sul range delle ore mostrate
        const widthPct = v == null ? 0 : Math.max(((v - globalMin) / span) * 100, 6);
        const color = isTemp
          ? (colorOn ? this._tempToColor(v) : '#ff7a59')
          : ((colorOn && this._hasColorScale(attr)) ? this._scaleColor(attr, v) : 'var(--primary-color)');
        const valLabel = isTemp ? `${this._fmtForecastTemp(v)}\u00b0` : this._graphValLabel(attr, v);

        this._iconUid += 1;
        const icon = this._icon(this._nightCondition(h.condition, h.datetime), this._iconUid, 28);

        return `
          <div class="forecast-row hourly">
            <div class="label">${label}</div>
            <div class="icon-wrap">${icon}</div>
            <div class="bar-track">
              <div class="bar-fill" style="left:0%; width:${widthPct}%; background:${color};"></div>
            </div>
            <div class="temp-max">${valLabel}</div>
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

  // Come _extendToEdges ma verso bordi espliciti (leftX/rightX): estende solo se
  // il bordo e' oltre il primo/ultimo punto. Serve ai dati parziali, cosi' la
  // linea non prolunga la pendenza dove l'attributo non ha valori.
  _extendToBounds(pts, leftX, rightX) {
    if (!pts || pts.length < 2) return pts || [];
    const first = pts[0], second = pts[1];
    const last = pts[pts.length - 1], prev = pts[pts.length - 2];
    const slopeL = (second[1] - first[1]) / (second[0] - first[0] || 1);
    const slopeR = (last[1] - prev[1]) / (last[0] - prev[0] || 1);
    const out = pts.slice();
    if (leftX < first[0]) out.unshift([leftX, first[1] - slopeL * (first[0] - leftX)]);
    if (rightX > last[0]) out.push([rightX, last[1] + slopeR * (rightX - last[0])]);
    return out;
  }

  // Grafico orizzontale. hourly=false: due linee max/min per giorno.
  // hourly=true: una linea temperatura per ora, con l'ora sotto.
  // Misura la larghezza utile del contenitore (dentro il padding). Chiamata
  // solo al primo render e sui resize, non a ogni tick di hass.
  _measureGraphWidth(list) {
    const cs = getComputedStyle(list);
    const padL = parseFloat(cs.paddingLeft) || 0;
    const padR = parseFloat(cs.paddingRight) || 0;
    return list.clientWidth - padL - padR;
  }

  // Crea una sola volta un ResizeObserver sul contenitore: quando la larghezza
  // cambia davvero aggiorna la cache e, se siamo in grafico, ridisegna.
  _ensureGraphResizeObserver(list) {
    if (this._graphResizeObs || typeof ResizeObserver === 'undefined') return;
    this._graphResizeObs = new ResizeObserver(() => {
      const l = this.shadowRoot && this.shadowRoot.getElementById('forecast-scroll');
      if (!l) return;
      const w = this._measureGraphWidth(l);
      if (w > 0 && w !== this._graphWidth) {
        this._graphWidth = w;
        const lay = this._config.forecast_layout;
        if (lay === 'graph' || lay === 'compact') this._renderForecast();
      }
    });
    this._graphResizeObs.observe(list);
  }

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

    // Attributo tracciato (#7): 'temperature' = comportamento storico (banda
    // max/min nel daily, scala colore, etichette in °). Ogni altro attributo =
    // linea singola. hasMinRow abilita la banda min solo per la temperatura daily.
    // _forecastAttrMode riflette la chip attiva (parte da forecast_attribute).
    const attr = this._forecastAttrMode || this._config.forecast_attribute || 'temperature';
    const isTemp = attr === 'temperature';
    const hasMinRow = isTemp && !hourly;
    const valFor = (d) => {
      const v = isTemp ? d.temperature : d[attr];
      if (typeof v === 'number') return v;
      const n = v != null ? parseFloat(v) : NaN;
      return isNaN(n) ? null : n;
    };

    const wState = this._hass.states[this._config.entity];
    const precipUnit = this._esc(wState?.attributes?.precipitation_unit || 'mm');
    // la pioggia (overlay) resta solo nel daily e viene nascosta se l'attributo
    // scelto e' gia' 'precipitation' (sarebbe ridondante)
    const showPrecip = this._config.show_forecast_precipitation && !hourly && attr !== 'precipitation';

    const vals = days.map(valFor).filter((v) => v != null);
    // l'attributo scelto non e' presente nelle previsioni dell'integrazione:
    // mostra un messaggio invece di un grafico vuoto (rete di sicurezza — il
    // menu dell'editor di norma elenca solo gli attributi disponibili)
    if (!vals.length) {
      const noDataSig = `nodata:${attr}`;
      if (this._graphSig !== noDataSig) {
        list.innerHTML = `<div class="graph-nodata">${this._uiLabels().no_data}</div>`;
        this._graphSig = noDataSig;
        list.style.maxHeight = 'none';
      }
      return;
    }
    let gMax;
    let gMin;
    if (isTemp) {
      const highs = days.map((d) => d.temperature).filter((v) => v != null);
      const lows = hourly
        ? highs
        : days.map((d) => (d.templow != null ? d.templow : d.temperature)).filter((v) => v != null);
      gMax = Math.max(...highs);
      gMin = Math.min(...lows);
    } else {
      gMax = vals.length ? Math.max(...vals) : 1;
      gMin = vals.length ? Math.min(...vals) : 0;
      // margine sopra/sotto cosi' la linea non tocca i bordi della banda
      const pad = gMax === gMin ? (Math.abs(gMax) * 0.1 || 1) : (gMax - gMin) * 0.15;
      gMax += pad;
      gMin -= pad;
    }
    const span = Math.max(gMax - gMin, 1);

    // quanti giorni restano visibili senza scorrere:
    // - se "visible_rows" e' impostato: quel numero di giorni riempie la card,
    //   il resto si raggiunge con lo scroll.
    // - se vuoto: tutti i giorni caricati vengono adattati alla larghezza
    //   della card (niente scroll, niente colonne tagliate).
    const visible = this._config.visible_rows;
    let col = 64;
    // larghezza cached (aggiornata dal ResizeObserver); al primo giro, se non
    // ancora nota, la misuro una volta e attivo l'observer
    this._ensureGraphResizeObserver(list);
    let cw = this._graphWidth;
    if (!cw) {
      cw = this._measureGraphWidth(list);
      this._graphWidth = cw;
    }
    if (cw > 0) {
      // divisore: i giorni visibili impostati, ma mai piu' dei giorni realmente
      // disponibili — cosi' se l'entita' ne espone meno del previsto (es. 6 su 7)
      // riempiono comunque tutta la larghezza invece di fermarsi a meta'
      const divisor = Math.min(visible || days.length, days.length);
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
    const minLabelH = hasMinRow ? 20 : 6;
    const hasPrecipRow = showPrecip && days.some((d) => d.precipitation != null && d.precipitation > 0);
    // pioggia come barrette (opt-in) invece che testo: serve piu' altezza
    const precipBars = this._config.graph_precip_bars === true;
    const precipH = hasPrecipRow ? (precipBars ? 26 : 12) : 0;
    const h = bandTop + bandH + minLabelH + precipH + 6;

    // firma sui DATI + larghezza: se nulla e' cambiato non ricostruire l'SVG
    // (punti, curve, gradienti, icone). La condizione e' quella adattata
    // giorno/notte per l'oraria, cosi' riflette le icone luna disegnate.
    const graphSig = JSON.stringify({
      hourly, w, showPrecip, hasPrecipRow, precipUnit, attr,
      color: this._colorByValue(),
      bars: precipBars,
      d: days.map((d) => [d.datetime,
        hourly ? this._nightCondition(d.condition, d.datetime) : d.condition,
        valFor(d), hasMinRow ? (d.templow != null ? d.templow : d.temperature) : null,
        d.precipitation]),
    });
    if (this._graphSig === graphSig) return;
    this._graphSig = graphSig;

    const x = (i) => i * col + col / 2;
    const yT = (t) => bandTop + (1 - (t - gMin) / span) * bandH;

    // un punto per giorno; null se l'attributo manca per quel giorno (la linea
    // salta il buco invece di crollare a zero)
    const ptsMax = days.map((d, i) => {
      const v = valFor(d);
      return v == null ? null : [x(i), yT(v)];
    });
    const ptsMin = hasMinRow ? days.map((d, i) => {
      const lo = d.templow != null ? d.templow : d.temperature;
      return [x(i), yT(lo)];
    }) : [];

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

    // colori/gradienti temperatura: definiti PRIMA dell'area cosi' il band fill
    // puo' riutilizzare il gradiente della linea max
    // la scala colore per temperatura ha senso solo per l'attributo temperatura
    // "colora per valore": governa temperatura (gradiente), UV/percepita/rugiada
    // (scala di significato). Spento -> temperatura statica, gli altri piatti.
    const colorOn = this._colorByValue();
    const colorByTemp = isTemp && colorOn;
    // attributo a valore singolo con scala di significato (UV/percepita/rugiada)
    const scaleAttr = !isTemp && colorOn && this._hasColorScale(attr);
    const gid = (this._iconUid += 1);
    const tempsMax = days.map((d) => d.temperature);
    const tempsMin = days.map((d) => (d.templow != null ? d.templow : d.temperature));
    const stopsFor = (pts, temps) => pts.map((p, i) => {
      const off = Math.max(0, Math.min(100, (p[0] / w) * 100));
      return `<stop offset="${off.toFixed(1)}%" stop-color="${this._tempToColor(temps[i])}"/>`;
    }).join('');
    // stop del gradiente scala (UV/percepita/rugiada): un colore per punto
    const scaleStops = () => days.map((d, i) => {
      const p = ptsMax[i];
      if (!p) return '';
      const off = Math.max(0, Math.min(100, (p[0] / w) * 100));
      return `<stop offset="${off.toFixed(1)}%" stop-color="${this._scaleColor(attr, valFor(d))}"/>`;
    }).join('');
    const gradMax = colorByTemp
      ? `<linearGradient id="gLineMax${gid}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${w}" y2="0">${stopsFor(ptsMax, tempsMax)}</linearGradient>`
      : (scaleAttr
        ? `<linearGradient id="gLineMax${gid}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${w}" y2="0">${scaleStops()}</linearGradient>`
        : '');
    const gradMin = (colorByTemp && hasMinRow)
      ? `<linearGradient id="gLineMin${gid}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${w}" y2="0">${stopsFor(ptsMin, tempsMin)}</linearGradient>`
      : '';
    // colore della linea: gradiente (temp o scala) se attivo; altrimenti arancio
    // di default per la temperatura statica, colore primario per gli altri piatti
    const maxStroke = (colorByTemp || scaleAttr)
      ? ` style="stroke:url(#gLineMax${gid})"`
      : (isTemp ? '' : ' style="stroke:var(--primary-color)"');
    const minStroke = colorByTemp ? ` style="stroke:url(#gLineMin${gid})"` : '';

    // la linea si estende ai bordi SOLO dove ci sono dati: se l'attributo manca
    // negli ultimi (o primi) giorni, la linea si ferma all'ultimo punto valido
    // invece di prolungare la pendenza nel vuoto (evita la "coda" fantasma)
    const validMax = ptsMax.filter(Boolean);
    const firstIdx = ptsMax.findIndex(Boolean);
    let lastIdx = -1;
    for (let i = ptsMax.length - 1; i >= 0; i--) { if (ptsMax[i]) { lastIdx = i; break; } }
    const leftX = firstIdx <= 0 ? 0 : (validMax[0] ? validMax[0][0] : 0);
    const rightX = (lastIdx >= days.length - 1 || lastIdx < 0)
      ? w : validMax[validMax.length - 1][0];
    const lineMax = smooth(this._extendToBounds(validMax, leftX, rightX));
    const lineMin = hasMinRow ? smooth(this._extendToEdges(ptsMin, w)) : '';
    // area: con i colori attivi riempi la FASCIA tra max e min (band fill) col
    // gradiente temperatura; altrimenti resta la sfumatura arancione verso il
    // basso come prima (nessun cambiamento per chi non usa i colori)
    const areaBottom = bandTop + bandH + 2;
    let areaMax;
    let areaFill = '';
    if (colorByTemp && hasMinRow) {
      const minExt = this._extendToEdges(ptsMin, w);
      const lineMinRev = smooth([...minExt].reverse()); // dal punto min piu' a destra
      areaMax = `${lineMax} L${lineMinRev.slice(1)} Z`;
      areaFill = ` style="fill:url(#gLineMax${gid});opacity:0.10"`;
    } else {
      // chiudi l'area entro i bordi dei dati reali (leftX..rightX)
      areaMax = `${lineMax} L ${rightX} ${areaBottom} L ${leftX} ${areaBottom} Z`;
      // UV: solo linea colorata, niente area (eviterebbe colori in conflitto);
      // altri attributi non-temperatura: riempimento primario molto tenue
      if (scaleAttr) areaFill = ' style="fill:none"';
      else if (!isTemp) areaFill = ' style="fill:var(--primary-color);opacity:0.10"';
    }

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
      const p = ptsMax[i];
      if (!p) return '';
      const [px, py] = p;
      return `<text class="g-tmax" x="${px}" y="${py - 9}" text-anchor="middle">${this._graphValLabel(attr, valFor(d))}</text>`;
    }).join('');

    const minLabels = hasMinRow ? days.map((d, i) => {
      const [px, py] = ptsMin[i];
      const lo = d.templow != null ? d.templow : d.temperature;
      return `<text class="g-tmin" x="${px}" y="${py + 17}" text-anchor="middle">${this._fmtForecastTemp(lo)}\u00b0</text>`;
    }).join('') : '';

    const precipLabels = !hasPrecipRow ? '' : (precipBars
      ? (() => {
          // riferimento assoluto con soglia minima: cosi' 0.1mm resta una
          // barretta piccola invece di riempire tutto solo perche' e' il massimo
          // del giorno; su giorni molto piovosi il riferimento sale al massimo
          const maxP = Math.max(...days.map((d) => (d.precipitation > 0 ? d.precipitation : 0)), 0.1);
          const ref = Math.max(maxP, 8);
          const barBottom = h - 12;   // base delle barrette (sotto: il valore)
          const barMaxH = 16, barMinH = 3, barW = 16;
          return days.map((d, i) => {
            if (d.precipitation == null || d.precipitation <= 0) return '';
            const bh = barMinH + Math.min(d.precipitation / ref, 1) * (barMaxH - barMinH);
            const bx = (x(i) - barW / 2).toFixed(1);
            const by = (barBottom - bh).toFixed(1);
            return `<rect x="${bx}" y="${by}" width="${barW}" height="${bh.toFixed(1)}" rx="2.5" fill="#4d9de0" opacity="0.85" />`
              + `<text class="g-precip" x="${x(i)}" y="${h - 3}" text-anchor="middle">${d.precipitation} ${precipUnit}</text>`;
          }).join('');
        })()
      : days.map((d, i) => {
          if (d.precipitation == null || d.precipitation <= 0) return '';
          return `<text class="g-precip" x="${x(i)}" y="${h - 6}" text-anchor="middle">${d.precipitation} ${precipUnit}</text>`;
        }).join(''));


    const dotsMax = ptsMax.map((p, i) => {
      if (!p) return '';
      const s = colorByTemp
        ? ` style="stroke:${this._tempToColor(tempsMax[i])}"`
        : (scaleAttr
          ? ` style="stroke:${this._scaleColor(attr, valFor(days[i]))}"`
          : (isTemp ? '' : ' style="stroke:var(--primary-color)"'));
      return `<circle class="g-dot-max" cx="${p[0]}" cy="${p[1]}" r="3"${s} />`;
    }).join('');
    const dotsMin = hasMinRow ? ptsMin.map((p, i) => {
      const s = colorByTemp ? ` style="stroke:${this._tempToColor(tempsMin[i])}"` : '';
      return `<circle class="g-dot-min" cx="${p[0]}" cy="${p[1]}" r="3"${s} />`;
    }).join('') : '';

    const lineMinSvg = hasMinRow ? `<path class="g-line-min" d="${lineMin}"${minStroke} />` : '';

    list.innerHTML = `
      <svg class="fc-graph" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMinYMid meet">
        <defs>
          <linearGradient id="gMaxArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ff7a59" stop-opacity="0.28"/>
            <stop offset="100%" stop-color="#ff7a59" stop-opacity="0"/>
          </linearGradient>
          ${gradMax}${gradMin}
        </defs>
        ${dayLabels}
        ${icons}
        <path class="g-area-max" d="${areaMax}"${areaFill} />
        <path class="g-line-max" d="${lineMax}"${maxStroke} />
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

  // Valore numerico di un attributo del forecast per un giorno/ora (o null).
  _fcAttrValue(d, attr) {
    const v = attr === 'temperature' ? d.temperature : d[attr];
    if (typeof v === 'number') return v;
    const n = v != null ? parseFloat(v) : NaN;
    return isNaN(n) ? null : n;
  }

  // Etichetta di un valore del grafico in base all'attributo (#7):
  // gli attributi di temperatura usano i decimali previsioni + il simbolo °,
  // le percentuali aggiungono %, gli altri mostrano solo il numero (unita' come
  // hPa/km/h sarebbero troppo larghe per le colonne strette).
  _graphValLabel(attr, v) {
    if (v == null) return '';
    if (attr === 'temperature' || attr === 'apparent_temperature' || attr === 'dew_point') {
      return `${this._fmtForecastTemp(v)}°`;
    }
    const pct = attr === 'humidity' || attr === 'precipitation_probability' || attr === 'cloud_coverage';
    const r = Math.round(v * 10) / 10;
    const s = Math.abs(r - Math.round(r)) < 0.05 ? String(Math.round(r)) : r.toFixed(1);
    return pct ? `${s}%` : s;
  }

  _tempToColor(t) {
    // fino a 35°: scala invariata (blu a -10° -> rosso pieno a 35°)
    const clamped = Math.min(Math.max(t, -10), 35);
    const hue = 235 - ((clamped + 10) / 45) * 235;
    // sopra i 35°: stesso rosso ma progressivamente piu' scuro fino a 40°,
    // cosi' le temperature molto alte (ormai frequenti d'estate) si distinguono
    // senza cambiare nulla sotto i 35°
    let light = 55;
    if (t > 35) {
      const over = Math.min(t, 40) - 35;   // 0..5
      light = 55 - (over / 5) * 13;         // 55% -> 42%
    } else if (t < -10) {
      // sotto i -10°: stesso blu ma progressivamente piu' scuro fino a -30°,
      // per distinguere i freddi intensi (climi rigidi) senza cambiare il resto
      const under = -10 - Math.max(t, -30); // 0..20
      light = 55 - (under / 20) * 20;        // 55% -> 35%
    }
    return `hsl(${hue}, 85%, ${light}%)`;
  }

  // Toggle "colora per valore": default true. Legge color_by_value; se assente,
  // onora il vecchio graph_color_by_temp per retrocompatibilita'.
  _colorByValue() {
    const c = this._config;
    if (typeof c.color_by_value === 'boolean') return c.color_by_value;
    if (typeof c.graph_color_by_temp === 'boolean') return c.graph_color_by_temp;
    return true;
  }

  // Attributi con scala colore "di significato" (freddo/caldo o rischio UV).
  _hasColorScale(attr) {
    return attr === 'temperature' || attr === 'apparent_temperature'
      || attr === 'dew_point' || attr === 'uv_index';
  }

  // Colore di un valore singolo secondo la scala dell'attributo.
  _scaleColor(attr, v) {
    return attr === 'uv_index' ? this._uvToColor(v) : this._tempToColor(v);
  }

  // Colore dell'indice UV secondo la scala standard OMS (a bande):
  // basso=verde, moderato=giallo, alto=arancio, molto alto=rosso, estremo=viola.
  _uvToColor(uv) {
    const v = Math.max(0, Number(uv) || 0);
    if (v < 3) return '#43a047';   // 0-2 basso
    if (v < 6) return '#f9a825';   // 3-5 moderato
    if (v < 8) return '#fb8c00';   // 6-7 alto
    if (v < 11) return '#e53935';  // 8-10 molto alto
    return '#8e24aa';              // 11+ estremo
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
            <line x1="12.5" y1="8" x2="14.5" y2="8"/>
            <line x1="8" y1="12.5" x2="8" y2="14.5"/>
            <line x1="3.4" y1="12.6" x2="4.8" y2="11.2"/>
            <line x1="12.6" y1="12.6" x2="11.2" y2="11.2"/>
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
          <path d="M15 3a9 9 0 1 0 6 15.9A9 9 0 0 1 15 3z" fill="#a9b6d6" transform="translate(1.3 1.4) scale(0.5)"/>
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

  // avvia un timer proprio per l'orologio: cosi' l'ora resta precisa anche
  // quando hass non si aggiorna. Nessun secondo: il testo cambia solo al minuto.
  connectedCallback() {
    if (!this._clockTimer) {
      this._clockTimer = setInterval(() => this._tickClock(), 1000);
    }
    this._tickClock();
  }

  _tickClock() {
    if (!this._config || !this.shadowRoot) return;
    const now = new Date();
    const timeEl = this.shadowRoot.getElementById('time');
    const dateEl = this.shadowRoot.getElementById('date');
    if (timeEl && this._config.show_time !== false) {
      const t = new Intl.DateTimeFormat(this._locale(), {
        hour: '2-digit', minute: '2-digit', hour12: this._config.time_format === '12',
      }).format(now);
      if (timeEl.textContent !== t) timeEl.textContent = t; // scrive solo se cambia
    }
    if (dateEl && this._config.show_date !== false) {
      const d = new Intl.DateTimeFormat(this._locale(), {
        weekday: 'long', day: 'numeric', month: 'long',
      }).format(now);
      if (dateEl.textContent !== d) dateEl.textContent = d;
    }
    // countdown alba/tramonto: aggiorna il testo (scrive solo se cambia)
    const cdEl = this.shadowRoot.getElementById('sun-countdown');
    if (cdEl) {
      const cd = this._sunCountdownText();
      if (cdEl.textContent !== cd) cdEl.textContent = cd;
    }
  }

  // quando la card viene rimossa dal DOM, smonta gli observer per non lasciarli
  // attivi (verranno ricreati al primo render dopo un eventuale re-inserimento)
  disconnectedCallback() {
    if (this._clockTimer) { clearInterval(this._clockTimer); this._clockTimer = null; }
    if (this._graphResizeObs) { this._graphResizeObs.disconnect(); this._graphResizeObs = null; }
    if (this._descResizeObs) { this._descResizeObs.disconnect(); this._descResizeObs = null; }
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
  ['wind', 'Wind (speed + direction)'],
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

// Attributi del forecast selezionabili come linea del grafico (#7).
// 'temperature' resta il default e mantiene il comportamento storico.
const GRAPH_ATTRS = [
  'temperature', 'apparent_temperature', 'dew_point', 'precipitation',
  'precipitation_probability', 'humidity', 'pressure', 'wind_speed',
  'cloud_coverage', 'uv_index',
];
// Chiave di traduzione per l'etichetta di ogni attributo nel menu del grafico:
// 'temperature' ha una chiave propria (ga_temperature), gli altri riusano le
// etichette gia' tradotte dei dettagli (det_*).
const GRAPH_ATTR_LABEL_KEY = {
  temperature: 'ga_temperature',
  apparent_temperature: 'det_apparent_temperature',
  dew_point: 'det_dew_point',
  precipitation: 'det_precipitation',
  precipitation_probability: 'det_precipitation_probability',
  humidity: 'det_humidity',
  pressure: 'det_pressure',
  wind_speed: 'det_wind_speed',
  cloud_coverage: 'det_cloud_coverage',
  uv_index: 'det_uv_index',
};
// Etichette CORTE per le chip in-card (lo spazio e' poco): localizzate.
const GRAPH_ATTR_SHORT = {
  it: { temperature: 'Temp', apparent_temperature: 'Percepita', dew_point: 'Rugiada', precipitation: 'Pioggia', precipitation_probability: 'Prob. pioggia', humidity: 'Umidità', pressure: 'Pressione', wind_speed: 'Vento', cloud_coverage: 'Nuvole', uv_index: 'UV' },
  en: { temperature: 'Temp', apparent_temperature: 'Feels like', dew_point: 'Dew pt', precipitation: 'Rain', precipitation_probability: 'Rain prob.', humidity: 'Humidity', pressure: 'Pressure', wind_speed: 'Wind', cloud_coverage: 'Clouds', uv_index: 'UV' },
  de: { temperature: 'Temp', apparent_temperature: 'Gefühlt', dew_point: 'Taupunkt', precipitation: 'Regen', precipitation_probability: 'Regenw.', humidity: 'Feuchte', pressure: 'Druck', wind_speed: 'Wind', cloud_coverage: 'Wolken', uv_index: 'UV' },
  nl: { temperature: 'Temp', apparent_temperature: 'Gevoel', dew_point: 'Dauwp.', precipitation: 'Regen', precipitation_probability: 'Regenkans', humidity: 'Vocht', pressure: 'Druk', wind_speed: 'Wind', cloud_coverage: 'Wolken', uv_index: 'UV' },
  fr: { temperature: 'Temp', apparent_temperature: 'Ressenti', dew_point: 'Rosée', precipitation: 'Pluie', precipitation_probability: 'Prob. pluie', humidity: 'Humidité', pressure: 'Pression', wind_speed: 'Vent', cloud_coverage: 'Nuages', uv_index: 'UV' },
  pl: { temperature: 'Temp', apparent_temperature: 'Odczuw.', dew_point: 'Rosa', precipitation: 'Deszcz', precipitation_probability: 'Pr. deszczu', humidity: 'Wilgotn.', pressure: 'Ciśnienie', wind_speed: 'Wiatr', cloud_coverage: 'Chmury', uv_index: 'UV' },
  sv: { temperature: 'Temp', apparent_temperature: 'Känns', dew_point: 'Daggp.', precipitation: 'Regn', precipitation_probability: 'Regnrisk', humidity: 'Fukt', pressure: 'Tryck', wind_speed: 'Vind', cloud_coverage: 'Moln', uv_index: 'UV' },
};
const DETAIL_ICONS = {
  humidity: 'mdi:water-percent', pressure: 'mdi:gauge',
  wind_speed: 'mdi:weather-windy', wind_bearing: 'mdi:compass-outline',
  wind: 'mdi:weather-windy', precipitation: 'mdi:weather-rainy',
  precipitation_probability: 'mdi:weather-pouring', sunrise: 'mdi:weather-sunset-up',
  sunset: 'mdi:weather-sunset-down', visibility: 'mdi:eye-outline',
  apparent_temperature: 'mdi:thermometer', cloud_coverage: 'mdi:cloud-percent-outline',
  uv_index: 'mdi:weather-sunny-alert', dew_point: 'mdi:water-thermometer-outline',
};

// Traduzioni dell'editor (it/en). L'editor segue la lingua di Home Assistant.
const EDITOR_I18N = {
  en: {
    entities: 'Entities',
    weather_entity: 'Weather entity',
    sun_entity: 'Sun entity (sunrise/sunset arc)',
    current_temp_entity: 'Current temperature — outdoor sensor (optional)',
    appearance: 'Appearance',
    location: 'Location name (empty = automatic)',
    language: 'Language',
    lang_system: 'System', lang_it: 'Italiano', lang_en: 'English', lang_de: 'Deutsch', lang_nl: 'Nederlands', lang_fr: 'Français', lang_pl: 'Polski', lang_sv: 'Svenska',
    time_format: 'Time format',
    tf_24: '24 hours', tf_12: '12 hours',
    show_time: 'Show time',
    show_date: 'Show date',
    show_arc: 'Show sun arc',
    sun_style: 'Sun display', ss_arc: 'Arc', ss_bar: 'Bar', ss_none: 'None',
    sun_countdown: 'Sunrise/sunset countdown',
    current_temp_decimals: 'Current temperature decimals', ctd_0: 'Integer (17°)', ctd_1: 'One decimal (16.5°)',
    animated_icons: 'Animated icons',
    transparent: 'Transparent background',
    background: 'Background',
    background_image: 'Background image (URL or /local/… path)',
    background_css: 'Background colour / gradient (CSS)',
    light_text: 'Light text (for dark backgrounds)',
    overlay: 'Overlay: lighter ⟵ none ⟶ darker',
    ov_lighter: 'Lighter', ov_zero: '0', ov_darker: 'Darker',
    forecast: 'Forecast',
    forecast_type: 'Forecast type',
    ft_daily: 'Daily', ft_hourly: 'Hourly',
    daily_layout: 'Daily layout',
    dl_bars: 'Bars', dl_graph: 'Graph (lines)', dl_none: 'None', dl_compact: 'Compact',
    forecast_temp_decimals: 'Forecast temperature decimals', ftd_0: 'Integers (22°)', ftd_1: 'One decimal (22.4°)',
    color_by_value: 'Dynamic colour (bars & graph)',
    graph_precip_bars: 'Show precipitation as bars in the graph',
    forecast_attribute: 'Forecast attribute', ga_temperature: 'Temperature',
    show_forecast_attribute_toggle: 'Show attribute selector in card',
    forecast_attribute_toggle_style: 'Selector style', gats_dropdown: 'Dropdown', gats_chips: 'Chips',
    forecast_attributes: 'Other attributes to offer (default always included)',
    days_to_load: 'Days to load',
    hours_to_load: 'Hours to load',
    visible_rows: 'Visible days (empty = all)',
    show_rain: 'Show daily rain (mm)',
    show_toggle: 'Daily/Hourly toggle in card',
    details: 'Details',
    details_hint: 'Add attributes to the detail grid. Use ▲▼ to reorder, the bin to remove.',
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
    det_wind_bearing: 'Wind direction', det_wind: 'Wind (speed + direction)', det_precipitation: 'Precipitation (mm)',
    det_precipitation_probability: 'Precip. probability', det_sunrise: 'Sunrise',
    det_sunset: 'Sunset', det_visibility: 'Visibility',
    det_apparent_temperature: 'Apparent temp.', det_cloud_coverage: 'Cloud coverage',
    det_uv_index: 'UV index', det_dew_point: 'Dew point',
  },
  it: {
    entities: 'Entità',
    weather_entity: 'Entità meteo',
    sun_entity: 'Entità sole (arco alba/tramonto)',
    current_temp_entity: 'Temperatura attuale — sensore esterno (opzionale)',
    appearance: 'Aspetto',
    location: 'Nome località (vuoto = automatico)',
    language: 'Lingua',
    lang_system: 'Sistema', lang_it: 'Italiano', lang_en: 'English', lang_de: 'Deutsch', lang_nl: 'Nederlands', lang_fr: 'Français', lang_pl: 'Polski', lang_sv: 'Svenska',
    time_format: 'Formato ora',
    tf_24: '24 ore', tf_12: '12 ore',
    show_time: 'Mostra orario',
    show_date: 'Mostra data',
    show_arc: 'Mostra arco del sole',
    sun_style: 'Visualizzazione sole', ss_arc: 'Arco', ss_bar: 'Barra', ss_none: 'Nessuno',
    sun_countdown: 'Countdown alba/tramonto',
    current_temp_decimals: 'Decimali temperatura attuale', ctd_0: 'Intero (17°)', ctd_1: 'Un decimale (16,5°)',
    animated_icons: 'Icone animate',
    transparent: 'Sfondo trasparente',
    background: 'Sfondo',
    background_image: 'Immagine di sfondo (URL o percorso /local/…)',
    background_css: 'Colore / gradiente sfondo (CSS)',
    light_text: 'Testo chiaro (per sfondi scuri)',
    overlay: 'Velo: più chiaro ⟵ niente ⟶ più scuro',
    ov_lighter: 'Chiaro', ov_zero: '0', ov_darker: 'Scuro',
    forecast: 'Previsioni',
    forecast_type: 'Tipo previsione',
    ft_daily: 'Giornaliera', ft_hourly: 'Oraria',
    daily_layout: 'Layout giornaliero',
    dl_bars: 'Barre', dl_graph: 'Grafico (linee)', dl_none: 'Nessuno', dl_compact: 'Compatto',
    forecast_temp_decimals: 'Decimali temperature previsioni', ftd_0: 'Interi (22°)', ftd_1: 'Un decimale (22.4°)',
    color_by_value: 'Colore dinamico (barre e grafico)',
    graph_precip_bars: 'Mostra le precipitazioni come barre nel grafico',
    forecast_attribute: 'Attributo previsione', ga_temperature: 'Temperatura',
    show_forecast_attribute_toggle: 'Mostra selettore attributo nella card',
    forecast_attribute_toggle_style: 'Stile selettore', gats_dropdown: 'Tendina', gats_chips: 'Chip',
    forecast_attributes: 'Altri attributi da offrire (il default è sempre incluso)',
    days_to_load: 'Giorni da caricare',
    hours_to_load: 'Ore da caricare',
    visible_rows: 'Giorni visibili (vuoto = tutte)',
    show_rain: 'Mostra pioggia giornaliera (mm)',
    show_toggle: 'Interruttore Giorni/Ore nella card',
    details: 'Dettagli',
    details_hint: 'Aggiungi attributi alla griglia. Usa ▲▼ per riordinare, il cestino per rimuovere.',
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
    det_wind_bearing: 'Direzione vento', det_wind: 'Vento (velocità + direzione)', det_precipitation: 'Precipitazioni (mm)',
    det_precipitation_probability: 'Prob. precipitazioni', det_sunrise: 'Alba',
    det_sunset: 'Tramonto', det_visibility: 'Visibilità',
    det_apparent_temperature: 'Temp. percepita', det_cloud_coverage: 'Copertura nuvolosa',
    det_uv_index: 'Indice UV', det_dew_point: 'Punto di rugiada',
  },
  de: {
    entities: 'Entitäten',
    weather_entity: 'Wetter-Entität',
    sun_entity: 'Sonnen-Entität (Sonnenauf-/-untergangsbogen)',
    current_temp_entity: 'Aktuelle Temperatur — Außensensor (optional)',
    appearance: 'Darstellung',
    location: 'Ortsname (leer = automatisch)',
    language: 'Sprache',
    lang_system: 'System', lang_it: 'Italiano', lang_en: 'English', lang_de: 'Deutsch', lang_nl: 'Nederlands', lang_fr: 'Français', lang_pl: 'Polski', lang_sv: 'Svenska',
    time_format: 'Zeitformat',
    tf_24: '24 Stunden', tf_12: '12 Stunden',
    show_time: 'Uhrzeit anzeigen',
    show_date: 'Datum anzeigen',
    show_arc: 'Sonnenbogen anzeigen',
    sun_style: 'Sonnen-Anzeige', ss_arc: 'Bogen', ss_bar: 'Balken', ss_none: 'Keine',
    sun_countdown: 'Countdown Sonnenauf-/untergang',
    current_temp_decimals: 'Aktuelle Temperatur Dezimalstellen', ctd_0: 'Ganzzahl (17°)', ctd_1: 'Eine Dezimalstelle (16,5°)',
    animated_icons: 'Animierte Symbole',
    transparent: 'Transparenter Hintergrund',
    background: 'Hintergrund',
    background_image: 'Hintergrundbild (URL oder /local/…-Pfad)',
    background_css: 'Hintergrundfarbe / Verlauf (CSS)',
    light_text: 'Heller Text (für dunkle Hintergründe)',
    overlay: 'Überlagerung: heller ⟵ keine ⟶ dunkler',
    ov_lighter: 'Heller', ov_zero: '0', ov_darker: 'Dunkler',
    forecast: 'Vorhersage',
    forecast_type: 'Vorhersagetyp',
    ft_daily: 'Täglich', ft_hourly: 'Stündlich',
    daily_layout: 'Tages-Layout',
    dl_bars: 'Balken', dl_graph: 'Diagramm (Linien)', dl_none: 'Keine', dl_compact: 'Kompakt',
    forecast_temp_decimals: 'Nachkommastellen Vorhersagetemperatur', ftd_0: 'Ganzzahl (22°)', ftd_1: 'Eine Dezimalstelle (22,4°)',
    color_by_value: 'Dynamische Farbe (Balken & Diagramm)',
    graph_precip_bars: 'Niederschlag als Balken im Diagramm anzeigen',
    forecast_attribute: 'Vorhersage-Attribut', ga_temperature: 'Temperatur',
    show_forecast_attribute_toggle: 'Attribut-Auswahl in der Karte anzeigen',
    forecast_attribute_toggle_style: 'Auswahl-Stil', gats_dropdown: 'Dropdown', gats_chips: 'Chips',
    forecast_attributes: 'Weitere angebotene Attribute (Standard immer enthalten)',
    days_to_load: 'Zu ladende Tage',
    hours_to_load: 'Zu ladende Stunden',
    visible_rows: 'Sichtbare Tage (leer = alle)',
    show_rain: 'Tagesregen anzeigen (mm)',
    show_toggle: 'Umschalter Tage/Stunden in der Karte',
    details: 'Details',
    details_hint: 'Attribute zur Detailraster hinzufügen. ▲▼ zum Umsortieren, Mülleimer zum Entfernen.',
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
    det_wind_bearing: 'Windrichtung', det_wind: 'Wind (Geschwindigkeit + Richtung)', det_precipitation: 'Niederschlag (mm)',
    det_precipitation_probability: 'Niederschlagswahrsch.', det_sunrise: 'Sonnenaufgang',
    det_sunset: 'Sonnenuntergang', det_visibility: 'Sichtweite',
    det_apparent_temperature: 'Gefühlte Temp.', det_cloud_coverage: 'Bewölkung',
    det_uv_index: 'UV-Index', det_dew_point: 'Taupunkt',
  },
  nl: {
    entities: 'Entiteiten',
    weather_entity: 'Weer-entiteit',
    sun_entity: 'Zon-entiteit (zonsopgang/-ondergang boog)',
    current_temp_entity: 'Huidige temperatuur — buitensensor (optioneel)',
    appearance: 'Weergave',
    location: 'Locatienaam (leeg = automatisch)',
    language: 'Taal',
    lang_system: 'Systeem', lang_it: 'Italiano', lang_en: 'English', lang_de: 'Deutsch', lang_nl: 'Nederlands', lang_fr: 'Français', lang_pl: 'Polski', lang_sv: 'Svenska',
    time_format: 'Tijdnotatie',
    tf_24: '24 uur', tf_12: '12 uur',
    show_time: 'Tijd tonen',
    show_date: 'Datum tonen',
    show_arc: 'Zonneboog tonen',
    sun_style: 'Zon-weergave', ss_arc: 'Boog', ss_bar: 'Balk', ss_none: 'Geen',
    sun_countdown: 'Aftellen zonsopgang/-ondergang',
    current_temp_decimals: 'Decimalen huidige temperatuur', ctd_0: 'Geheel (17°)', ctd_1: 'Één decimaal (16,5°)',
    animated_icons: 'Geanimeerde iconen',
    transparent: 'Transparante achtergrond',
    background: 'Achtergrond',
    background_image: 'Achtergrondafbeelding (URL of /local/…-pad)',
    background_css: 'Achtergrondkleur / verloop (CSS)',
    light_text: 'Lichte tekst (voor donkere achtergronden)',
    overlay: 'Overlay: lichter ⟵ geen ⟶ donkerder',
    ov_lighter: 'Lichter', ov_zero: '0', ov_darker: 'Donkerder',
    forecast: 'Voorspelling',
    forecast_type: 'Voorspellingstype',
    ft_daily: 'Dagelijks', ft_hourly: 'Uurlijks',
    daily_layout: 'Dagelijkse layout',
    dl_bars: 'Balken', dl_graph: 'Grafiek (lijnen)', dl_none: 'Geen', dl_compact: 'Compact',
    forecast_temp_decimals: 'Decimalen voorspellingstemperatuur', ftd_0: 'Geheel (22°)', ftd_1: 'Één decimaal (22,4°)',
    color_by_value: 'Dynamische kleur (balk & grafiek)',
    graph_precip_bars: 'Neerslag als balken in de grafiek tonen',
    forecast_attribute: 'Voorspellingsattribuut', ga_temperature: 'Temperatuur',
    show_forecast_attribute_toggle: 'Attribuutselectie in kaart tonen',
    forecast_attribute_toggle_style: 'Selectiestijl', gats_dropdown: 'Dropdown', gats_chips: 'Chips',
    forecast_attributes: 'Andere aangeboden attributen (standaard altijd inbegrepen)',
    days_to_load: 'Te laden dagen',
    hours_to_load: 'Te laden uren',
    visible_rows: 'Zichtbare dagen (leeg = alle)',
    show_rain: 'Dagelijkse neerslag tonen (mm)',
    show_toggle: 'Dagen/Uren-schakelaar in kaart',
    details: 'Details',
    details_hint: 'Voeg attributen toe aan het detailraster. ▲▼ om te sorteren, prullenbak om te verwijderen.',
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
    det_wind_bearing: 'Windrichting', det_wind: 'Wind (snelheid + richting)', det_precipitation: 'Neerslag (mm)',
    det_precipitation_probability: 'Kans op neerslag', det_sunrise: 'Zonsopgang',
    det_sunset: 'Zonsondergang', det_visibility: 'Zicht',
    det_apparent_temperature: 'Gevoelstemperatuur', det_cloud_coverage: 'Bewolking',
    det_uv_index: 'UV-index', det_dew_point: 'Dauwpunt',
  },
  fr: {
    entities: 'Entités',
    weather_entity: 'Entité météorologique',
    sun_entity: 'Entité solaire (arc du lever/coucher du soleil)',
    current_temp_entity: 'Température actuelle — capteur extérieur (optionnel)',
    appearance: 'Apparence',
    location: 'Nom du lieu (vide = automatique)',
    language: 'Langue',
    lang_system: 'Système', lang_it: 'Italiano', lang_en: 'English', lang_de: 'Deutsch', lang_nl: 'Nederlands', lang_fr: 'Français', lang_pl: 'Polski', lang_sv: 'Svenska',
    time_format: "Format de l'heure",
    tf_24: '24 heures', tf_12: '12 heures',
    show_time: "Afficher l'heure",
    show_date: 'Afficher la date',
    show_arc: "Afficher l'arc solaire",
    sun_style: 'Affichage du soleil', ss_arc: 'Arc', ss_bar: 'Barre', ss_none: 'Aucun',
    sun_countdown: 'Compte à rebours lever/coucher',
    current_temp_decimals: 'Décimales température actuelle', ctd_0: 'Entier (17°)', ctd_1: 'Une décimale (16,5°)',
    animated_icons: 'Icônes animées',
    transparent: 'Fond transparent',
    background: 'Arrière-plan',
    background_image: 'Image de fond (URL ou chemin /local/…)',
    background_css: 'Couleur / dégradé de fond (CSS)',
    light_text: 'Texte clair (pour fonds sombres)',
    overlay: 'Superposition : plus clair ⟵ aucun ⟶ plus foncé',
    ov_lighter: 'Plus clair', ov_zero: '0', ov_darker: 'Plus foncé',
    forecast: 'Prévision',
    forecast_type: 'Type de prévision',
    ft_daily: 'Quotidienne', ft_hourly: 'Horaire',
    daily_layout: 'Disposition quotidienne',
    dl_bars: 'Barres', dl_graph: 'Graphique (lignes)', dl_none: 'Aucun', dl_compact: 'Compact',
    forecast_temp_decimals: 'Décimales des températures de prévision', ftd_0: 'Entier (22°)', ftd_1: 'Une décimale (22,4°)',
    color_by_value: 'Couleur dynamique (barres & graphique)',
    graph_precip_bars: 'Afficher les précipitations en barres dans le graphique',
    forecast_attribute: 'Attribut de prévision', ga_temperature: 'Température',
    show_forecast_attribute_toggle: 'Afficher le sélecteur d\'attribut dans la carte',
    forecast_attribute_toggle_style: 'Style du sélecteur', gats_dropdown: 'Menu déroulant', gats_chips: 'Chips',
    forecast_attributes: 'Autres attributs proposés (le défaut est toujours inclus)',
    days_to_load: 'Jours à charger',
    hours_to_load: 'Heures à charger',
    visible_rows: 'Jours visibles (vide = tous)',
    show_rain: 'Afficher la pluie quotidienne (mm)',
    show_toggle: 'Bascule Jours/Heures dans la carte',
    details: 'Détails',
    details_hint: 'Ajoutez des attributs à la grille. ▲▼ pour réorganiser, poubelle pour supprimer.',
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
    det_wind_bearing: 'Direction du vent', det_wind: 'Vent (vitesse + direction)', det_precipitation: 'Précipitation (mm)',
    det_precipitation_probability: 'Probabilité de précipitation', det_sunrise: 'Lever du soleil',
    det_sunset: 'Coucher du soleil', det_visibility: 'Visibilité',
    det_apparent_temperature: 'Température ressentie', det_cloud_coverage: 'Couverture nuageuse',
    det_uv_index: 'Indice UV', det_dew_point: 'Point de rosée',
  },
  pl: {
    entities: 'Encje',
    weather_entity: 'Encja pogodowa',
    sun_entity: 'Encja słońca (łuk wschodu/zachodu słońca)',
    current_temp_entity: 'Aktualna temperatura — czujnik zewnętrzny (opcjonalnie)',
    appearance: 'Wygląd',
    location: 'Nazwa lokalizacji (puste = automatycznie)',
    language: 'Język',
    lang_system: 'System', lang_it: 'Italiano', lang_en: 'English', lang_de: 'Deutsch', lang_nl: 'Nederlands', lang_fr: 'Français', lang_pl: 'Polski', lang_sv: 'Svenska',
    time_format: 'Format czasu',
    tf_24: '24 godziny', tf_12: '12 godzin',
    show_time: 'Pokaż godzinę',
    show_date: 'Pokaż datę',
    show_arc: 'Pokaż łuk słońca',
    sun_style: 'Wyświetlanie słońca', ss_arc: 'Łuk', ss_bar: 'Pasek', ss_none: 'Brak',
    sun_countdown: 'Odliczanie do wschodu/zachodu',
    current_temp_decimals: 'Miejsca dziesiętne aktualnej temperatury', ctd_0: 'Całkowita (17°)', ctd_1: 'Jeden dziesiętny (16,5°)',
    animated_icons: 'Animowane ikony',
    transparent: 'Przezroczyste tło',
    background: 'Tło',
    background_image: 'Obraz tła (URL lub ścieżka /local/…)',
    background_css: 'Kolor / gradient tła (CSS)',
    light_text: 'Jasny tekst (dla ciemnych teł)',
    overlay: 'Nakładka: jaśniej ⟵ brak ⟶ ciemniej',
    ov_lighter: 'Jaśniej', ov_zero: '0', ov_darker: 'Ciemniej',
    forecast: 'Prognoza',
    forecast_type: 'Typ prognozy',
    ft_daily: 'Dzienna', ft_hourly: 'Godzinowa',
    daily_layout: 'Układ prognozy dziennej',
    dl_bars: 'Słupki', dl_graph: 'Wykres (linie)', dl_none: 'Brak', dl_compact: 'Kompaktowy',
    forecast_temp_decimals: 'Dziesiętne temperatury prognozy', ftd_0: 'Całkowite (22°)', ftd_1: 'Jeden dziesiętny (22,4°)',
    color_by_value: 'Kolor dynamiczny (słupki i wykres)',
    graph_precip_bars: 'Pokaż opady jako słupki na wykresie',
    forecast_attribute: 'Atrybut prognozy', ga_temperature: 'Temperatura',
    show_forecast_attribute_toggle: 'Pokaż wybór atrybutu na karcie',
    forecast_attribute_toggle_style: 'Styl selektora', gats_dropdown: 'Lista', gats_chips: 'Chipy',
    forecast_attributes: 'Inne oferowane atrybuty (domyślny zawsze dołączony)',
    days_to_load: 'Liczba dni do wczytania',
    hours_to_load: 'Liczba godzin do wczytania',
    visible_rows: 'Widoczne dni (puste = wszystkie)',
    show_rain: 'Pokaż dzienne opady deszczu (mm)',
    show_toggle: 'Przełącznik Dni/Godziny na karcie',
    details: 'Szczegóły',
    details_hint: 'Dodaj atrybuty do siatki. ▲▼ aby zmienić kolejność, kosz aby usunąć.',
    details_empty: 'Na razie brak szczegółów. Dodaj atrybuty poniżej.',
    all_added: '— wszystko dodane —',
    custom_sensors: 'Własne czujniki',
    custom_sensors_hint: 'Wyświetl dowolny czujnik w siatce szczegółów. Wybierz czujnik i opcjonalnie ustaw nazwę oraz ikonę.',
    show_sensor_names: 'Pokaż nazwy pod czujnikami',
    cs_fit_text: 'Dopasuj do tekstu',
    add_sensor: 'Dodaj czujnik',
    cs_entity: 'Encja czujnika',
    cs_attribute: 'Atrybut (opcjonalnie)',
    cs_pick: 'Wybierz czujnik…',
    cs_name: 'Nazwa (opcjonalnie)',
    cs_name_ph: 'np. Wiarygodność',
    cs_icon: 'Ikona (opcjonalnie)',
    cs_decimals: 'Miejsca po przecinku (opcjonalnie)',
    cs_title: 'Czujnik',
    cs_remove: 'Usuń',
    cs_empty: 'Na razie brak własnych czujników.',
    interaction: 'Interakcja',
    tap_behavior: 'Działanie po kliknięciu',
    hold_behavior: 'Działanie po przytrzymaniu',
    double_tap_behavior: 'Działanie po dwukrotnym kliknięciu',
    nav_path: 'Ścieżka nawigacji',
    url_label: 'URL',
    action_srv: 'Akcja (domain.service)',
    act_more_info: 'Informacje o encji', act_navigate: 'Przejdź', act_url: 'URL',
    act_perform: 'Wykonaj akcję', act_toggle: 'Przełącz', act_none: 'Nie rób nic',
    det_humidity: 'Wilgotność', det_pressure: 'Ciśnienie', det_wind_speed: 'Prędkość wiatru',
    det_wind_bearing: 'Kierunek wiatru', det_wind: 'Wiatr (prędkość + kierunek)', det_precipitation: 'Opady (mm)',
    det_precipitation_probability: 'Prawdopodobieństwo opadów', det_sunrise: 'Wschód słońca',
    det_sunset: 'Zachód słońca', det_visibility: 'Widoczność',
    det_apparent_temperature: 'Temperatura odczuwalna', det_cloud_coverage: 'Zachmurzenie',
    det_uv_index: 'Indeks UV', det_dew_point: 'Punkt rosy',
  },
  sv: {
    entities: 'Entiteter',
    weather_entity: 'Väderentitet',
    sun_entity: 'Solentitet (båge för soluppgång/solnedgång)',
    current_temp_entity: 'Aktuell temperatur — utomhussensor (valfritt)',
    appearance: 'Utseende',
    location: 'Platsnamn (tomt = automatiskt)',
    language: 'Språk',
    lang_system: 'System', lang_it: 'Italiano', lang_en: 'English', lang_de: 'Deutsch', lang_nl: 'Nederlands', lang_fr: 'Français', lang_pl: 'Polski', lang_sv: 'Svenska',
    time_format: 'Tidsformat',
    tf_24: '24 timmar', tf_12: '12 timmar',
    show_time: 'Visa tid',
    show_date: 'Visa datum',
    show_arc: 'Visa solbåge',
    sun_style: 'Solvisning', ss_arc: 'Båge', ss_bar: 'Stapel', ss_none: 'Ingen',
    sun_countdown: 'Nedräkning till soluppgång/solnedgång',
    current_temp_decimals: 'Decimaler för aktuell temperatur', ctd_0: 'Heltal (17°)', ctd_1: 'En decimal (16,5°)',
    animated_icons: 'Animerade ikoner',
    transparent: 'Genomskinlig bakgrund',
    background: 'Bakgrund',
    background_image: 'Bakgrundsbild (URL eller /local/…-sökväg)',
    background_css: 'Bakgrundsfärg / gradient (CSS)',
    light_text: 'Ljus text (för mörka bakgrunder)',
    overlay: 'Överlägg: ljusare ⟵ inget ⟶ mörkare',
    ov_lighter: 'Ljusare', ov_zero: '0', ov_darker: 'Mörkare',
    forecast: 'Prognos',
    forecast_type: 'Prognostyp',
    ft_daily: 'Daglig', ft_hourly: 'Timvis',
    daily_layout: 'Daglig layout',
    dl_bars: 'Staplar', dl_graph: 'Graf (linjer)', dl_none: 'Ingen', dl_compact: 'Kompakt',
    forecast_temp_decimals: 'Decimaler för prognostemperatur', ftd_0: 'Heltal (22°)', ftd_1: 'En decimal (22,4°)',
    color_by_value: 'Dynamisk färg (staplar & graf)',
    graph_precip_bars: 'Visa nederbörd som staplar i grafen',
    forecast_attribute: 'Prognosattribut', ga_temperature: 'Temperatur',
    show_forecast_attribute_toggle: 'Visa attributväljare i kortet',
    forecast_attribute_toggle_style: 'Väljarstil', gats_dropdown: 'Rullgardinsmeny', gats_chips: 'Chips',
    forecast_attributes: 'Övriga attribut att visa (standard ingår alltid)',
    days_to_load: 'Antal dagar att visa',
    hours_to_load: 'Antal timmar att visa',
    visible_rows: 'Synliga dagar (tomt = alla)',
    show_rain: 'Visa dygnsnederbörd (mm)',
    show_toggle: 'Växlingsknapp Daglig/Timvis i kortet',
    details: 'Detaljer',
    details_hint: 'Lägg till attribut i detaljrutan. Använd ▲▼ för att ändra ordning och papperskorgen för att ta bort.',
    custom_sensors: 'Egna sensorer',
    custom_sensors_hint: 'Visa valfri sensorentitet i detaljrutan. Välj en sensor och ange namn och ikon om du vill.',
    show_sensor_names: 'Visa namn under sensorerna',
    cs_fit_text: 'Anpassa efter text',
    add_sensor: 'Lägg till sensor',
    cs_entity: 'Sensorentitet',
    cs_attribute: 'Attribut (valfritt)',
    cs_pick: 'Välj en sensor…',
    cs_name: 'Namn (valfritt)',
    cs_name_ph: 't.ex. Tillförlitlighet',
    cs_icon: 'Ikon (valfritt)',
    cs_decimals: 'Decimaler (valfritt)',
    cs_title: 'Sensor',
    cs_remove: 'Ta bort',
    cs_empty: 'Inga egna sensorer än.',
    details_empty: 'Inga detaljer än. Lägg till attribut nedan.',
    all_added: '— alla tillagda —',
    interaction: 'Interaktion',
    tap_behavior: 'Åtgärd vid tryck',
    hold_behavior: 'Åtgärd vid håll',
    double_tap_behavior: 'Åtgärd vid dubbeltryck',
    nav_path: 'Navigeringssökväg',
    url_label: 'URL',
    action_srv: 'Åtgärd (domän.tjänst)',
    act_more_info: 'Entitetsinfo', act_navigate: 'Navigera', act_url: 'URL',
    act_perform: 'Utför åtgärd', act_toggle: 'Växla', act_none: 'Ingenting',
    det_humidity: 'Luftfuktighet', det_pressure: 'Lufttryck', det_wind_speed: 'Vindhastighet',
    det_wind_bearing: 'Vindriktning', det_wind: 'Vind (hastighet + riktning)', det_precipitation: 'Nederbörd (mm)',
    det_precipitation_probability: 'Sannolikhet nederbörd', det_sunrise: 'Soluppgång',
    det_sunset: 'Solnedgång', det_visibility: 'Sikt',
    det_apparent_temperature: 'Känns som', det_cloud_coverage: 'Molnighet',
    det_uv_index: 'UV-index', det_dew_point: 'Daggpunkt',
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
      this._fillBackgroundForm();
      this._fillForecastForm();
      this._fillInteractionForm();
      this._fillDetailsForm();
    }
  }

  // lingua editor: segue HA/browser; 'it' -> italiano, 'de' -> tedesco, altrimenti inglese
  _lang() {
    // rispetta la lingua scelta nella card; se 'system' (o assente), usa HA/browser
    const cfg = this._config && this._config.language;
    if (cfg && cfg !== 'system' && SUPPORTED_LANGS[cfg]) return cfg;
    const l = (this._hass && this._hass.locale && this._hass.locale.language)
      || (this._hass && this._hass.language)
      || navigator.language || 'en';
    return langCode(l);
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
      current_temp_entity: this._config.current_temp_entity || '',
    };
    form.schema = [
      { name: 'entity', selector: { entity: { domain: 'weather' } } },
      { name: 'sun_entity', selector: { entity: { domain: 'sun' } } },
      { name: 'current_temp_entity', selector: { entity: { domain: ['sensor', 'weather', 'input_number'] } } },
    ];
    form.computeLabel = (s) =>
      s.name === 'entity' ? this.t('weather_entity')
      : s.name === 'sun_entity' ? this.t('sun_entity')
      : this.t('current_temp_entity');
    form.addEventListener('value-changed', (e) => {
      const v = e.detail.value || {};
      const prevEntity = this._config.entity;
      this._set('entity', v.entity);
      this._set('sun_entity', v.sun_entity);
      this._set('current_temp_entity', v.current_temp_entity || undefined);
      // entita' meteo cambiata -> ricarica gli attributi disponibili del grafico
      if (v.entity && v.entity !== prevEntity) {
        this._graphAttrsFetched = false;
        this._availGraphAttrs = null;
        this._ensureGraphAttrs();
      }
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
      sun_style: c.sun_style || (c.show_arc === false ? 'none' : 'arc'),
      show_sun_countdown: c.show_sun_countdown === true,
      current_temp_decimals: c.current_temp_decimals ?? 1,
      animated_icons: c.animated_icons !== false,
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
        { value: 'pl', label: this.t('lang_pl') },
        { value: 'sv', label: this.t('lang_sv') },
      ]) },
      { name: 'time_format', selector: sel([
        { value: '24', label: this.t('tf_24') },
        { value: '12', label: this.t('tf_12') },
      ]) },
      { name: 'show_time', selector: { boolean: {} } },
      { name: 'show_date', selector: { boolean: {} } },
      { name: 'sun_style', selector: sel([
        { value: 'arc', label: this.t('ss_arc') },
        { value: 'bar', label: this.t('ss_bar') },
        { value: 'none', label: this.t('ss_none') },
      ]) },
      { name: 'show_sun_countdown', selector: { boolean: {} } },
      { name: 'current_temp_decimals', selector: sel([
        { value: 0, label: this.t('ctd_0') },
        { value: 1, label: this.t('ctd_1') },
      ]) },
      { name: 'animated_icons', selector: { boolean: {} } },
    ];
    const labels = {
      location: this.t('location'), language: this.t('language'),
      time_format: this.t('time_format'), show_time: this.t('show_time'),
      show_date: this.t('show_date'), sun_style: this.t('sun_style'),
      show_sun_countdown: this.t('sun_countdown'),
      current_temp_decimals: this.t('current_temp_decimals'),
      animated_icons: this.t('animated_icons'),
    };
    form.computeLabel = (s) => labels[s.name] || s.name;
    form.addEventListener('value-changed', (e) => {
      const v = e.detail.value || {};
      Object.keys(labels).forEach((k) => {
        if (k === 'show_time' || k === 'show_date' || k === 'animated_icons') {
          // toggle "attivo di default": salva solo se false
          if (v[k] === false) this._set(k, false); else this._set(k, undefined);
        } else if (k === 'transparent' || k === 'show_sun_countdown') {
          if (v[k] === true) this._set(k, true); else this._set(k, undefined);
        } else if (k === 'current_temp_decimals') {
          this._set(k, v[k] === 0 ? 0 : undefined); // 1 è default, non serve salvarlo
        } else if (k === 'sun_style') {
          // 'arc' e' il default -> non salvarlo; rimuovi il vecchio toggle show_arc
          this._set('show_arc', undefined);
          this._set('sun_style', (v.sun_style && v.sun_style !== 'arc') ? v.sun_style : undefined);
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

  _fillBackgroundForm() {
    if (!this.shadowRoot) return;
    const mount = this.shadowRoot.getElementById('background-form');
    if (!mount || mount.dataset.filled) return;
    const c = this._config;

    const form = document.createElement('ha-form');
    form.hass = this._hass;
    form.data = {
      transparent: c.transparent === true,
      background_image: c.background_image || '',
      background_css: c.background_css || '',
      light_text: c.light_text === true,
    };
    form.schema = [
      { name: 'transparent', selector: { boolean: {} } },
      { name: 'background_image', selector: { text: {} } },
      { name: 'background_css', selector: { text: {} } },
      { name: 'light_text', selector: { boolean: {} } },
    ];
    const labels = {
      transparent: this.t('transparent'),
      background_image: this.t('background_image'),
      background_css: this.t('background_css'),
      light_text: this.t('light_text'),
    };
    form.computeLabel = (s) => labels[s.name] || s.name;
    form.addEventListener('value-changed', (e) => {
      const v = e.detail.value || {};
      // transparent e light_text spenti di default -> salva solo se true
      this._set('transparent', v.transparent === true ? true : undefined);
      this._set('background_image', v.background_image || undefined);
      this._set('background_css', v.background_css || undefined);
      this._set('light_text', v.light_text === true ? true : undefined);
      this._updateOverlayVisibility();
    });
    mount.appendChild(form);
    mount.dataset.filled = '1';
    this._updateOverlayVisibility();
  }

  _fillForecastForm() {
    if (!this.shadowRoot) return;
    const mount = this.shadowRoot.getElementById('forecast-form');
    if (!mount || mount.dataset.filled) return;
    const c = this._config;
    // attributi disponibili e "altri" (tutti tranne il default): servono sia
    // alle opzioni sia al valore iniziale della multiselezione
    const attrListD = this._availGraphAttrs || GRAPH_ATTRS;
    const defAttr = c.forecast_attribute || 'temperature';
    const otherAttrsD = attrListD.filter((a) => a !== defAttr);

    const form = document.createElement('ha-form');
    form.hass = this._hass;
    form.data = {
      forecast_type: c.forecast_type || 'daily',
      forecast_layout: c.forecast_layout || 'bars',
      forecast_temp_decimals: c.forecast_temp_decimals ?? 0,
      // valore effettivo del toggle colore (onora il vecchio graph_color_by_temp)
      color_by_value: (typeof c.color_by_value === 'boolean') ? c.color_by_value
        : (typeof c.graph_color_by_temp === 'boolean' ? c.graph_color_by_temp : true),
      forecast_attribute: c.forecast_attribute || 'temperature',
      show_forecast_attribute_toggle: c.show_forecast_attribute_toggle === true,
      forecast_attribute_toggle_style: c.forecast_attribute_toggle_style === 'chips' ? 'chips' : 'dropdown',
      // non configurato -> mostra tutti gli "altri" spuntati (= tutti disponibili)
      forecast_attributes: Array.isArray(c.forecast_attributes) ? c.forecast_attributes : otherAttrsD,
      graph_precip_bars: c.graph_precip_bars === true,
      forecast_days: c.forecast_days ?? 7,
      forecast_hours: c.forecast_hours ?? 24,
      visible_rows: c.visible_rows ?? null,
      show_forecast_precipitation: c.show_forecast_precipitation !== false,
      show_forecast_toggle: c.show_forecast_toggle === true,
    };
    const sel = (opts) => ({ select: { mode: 'dropdown', options: opts } });
    const num = (min, max) => ({ number: { min, max, mode: 'box', step: 1 } });
    const isGraph = (c.forecast_layout || 'bars') === 'graph';
    // layout 'none': la previsione e' nascosta -> non servono le sue opzioni
    const noForecast = (c.forecast_layout || 'bars') === 'none';
    // la tendina attributo elenca solo gli attributi presenti nelle previsioni
    // dell'integrazione (come i dettagli). Finche' non e' noto -> lista completa.
    const attrList = attrListD;
    const otherAttrs = otherAttrsD;
    // stile e lista attributi hanno senso solo se il selettore in-card e' attivo
    const selOn = c.show_forecast_attribute_toggle === true;
    // opzioni dell'attributo previsione: valgono per ENTRAMBI i layout
    // (barre di livello e grafico a linee)
    const attrOpts = [
      // colora per valore: vale per barre E grafico
      { name: 'color_by_value', selector: { boolean: {} } },
      { name: 'forecast_attribute', selector: sel(attrList.map((a) => ({ value: a, label: this.t(GRAPH_ATTR_LABEL_KEY[a]) }))) },
      { name: 'show_forecast_attribute_toggle', selector: { boolean: {} } },
      ...(selOn ? [
        { name: 'forecast_attribute_toggle_style', selector: sel([
          { value: 'dropdown', label: this.t('gats_dropdown') },
          { value: 'chips', label: this.t('gats_chips') },
        ]) },
        // altri attributi da offrire nel selettore in-card (oltre a quello di
        // default, sempre incluso). Tutti spuntati = non salvato = tutti disponibili.
        { name: 'forecast_attributes', selector: { select: { multiple: true, mode: 'list', options: otherAttrs.map((a) => ({ value: a, label: this.t(GRAPH_ATTR_LABEL_KEY[a]) })) } } },
      ] : []),
    ];
    form.schema = [
      // con 'none' la previsione e' nascosta: resta solo il selettore layout
      ...(noForecast ? [] : [{ name: 'forecast_type', selector: sel([
        { value: 'daily', label: this.t('ft_daily') },
        { value: 'hourly', label: this.t('ft_hourly') },
      ]) }]),
      { name: 'forecast_layout', selector: sel([
        { value: 'bars', label: this.t('dl_bars') },
        { value: 'graph', label: this.t('dl_graph') },
        { value: 'compact', label: this.t('dl_compact') },
        { value: 'none', label: this.t('dl_none') },
      ]) },
      ...(noForecast ? [] : [
        // attributo previsione + colore + selettore: subito sotto il layout
        ...attrOpts,
        { name: 'forecast_temp_decimals', selector: sel([
          { value: 0, label: this.t('ftd_0') },
          { value: 1, label: this.t('ftd_1') },
        ]) },
        { name: 'visible_rows', selector: num(1, 15) },
        { name: 'forecast_days', selector: num(1, 15) },
        { name: 'forecast_hours', selector: num(1, 48) },
        { name: 'show_forecast_precipitation', selector: { boolean: {} } },
        // pioggia come barre: specifica del grafico a linee
        ...(isGraph ? [{ name: 'graph_precip_bars', selector: { boolean: {} } }] : []),
        { name: 'show_forecast_toggle', selector: { boolean: {} } },
      ]),
    ];
    const labels = {
      forecast_type: this.t('forecast_type'), forecast_layout: this.t('daily_layout'),
      forecast_temp_decimals: this.t('forecast_temp_decimals'),
      color_by_value: this.t('color_by_value'),
      graph_precip_bars: this.t('graph_precip_bars'),
      forecast_attribute: this.t('forecast_attribute'),
      show_forecast_attribute_toggle: this.t('show_forecast_attribute_toggle'),
      forecast_attribute_toggle_style: this.t('forecast_attribute_toggle_style'),
      forecast_attributes: this.t('forecast_attributes'),
      forecast_days: this.t('days_to_load'), forecast_hours: this.t('hours_to_load'),
      visible_rows: this.t('visible_rows'),
      show_forecast_precipitation: this.t('show_rain'),
      show_forecast_toggle: this.t('show_toggle'),
    };
    form.computeLabel = (s) => labels[s.name] || s.name;
    form.addEventListener('value-changed', (e) => {
      const v = e.detail.value || {};
      const prevLayout = this._config.forecast_layout || 'bars';
      const prevType = this._config.forecast_type || 'daily';
      const prevAttr = this._config.forecast_attribute || 'temperature';
      const prevSelOn = this._config.show_forecast_attribute_toggle === true;
      this._set('forecast_type', v.forecast_type);
      this._set('forecast_layout', v.forecast_layout);
      this._set('forecast_temp_decimals', v.forecast_temp_decimals === 1 ? 1 : undefined);
      // colore per valore: default true (colorato) -> salva solo se false.
      // Migra via il vecchio graph_color_by_temp (lo rimuove).
      this._set('graph_color_by_temp', undefined);
      this._set('color_by_value', v.color_by_value === false ? false : undefined);
      this._set('graph_precip_bars', v.graph_precip_bars === true ? true : undefined);
      // forecast_attribute: default 'temperature' -> non salvare (config pulita)
      this._set('forecast_attribute', (v.forecast_attribute && v.forecast_attribute !== 'temperature') ? v.forecast_attribute : undefined);
      // selettore attributo in-card: spento di default -> salva solo se true
      this._set('show_forecast_attribute_toggle', v.show_forecast_attribute_toggle === true ? true : undefined);
      // stile selettore: default 'dropdown' -> salva solo se 'chips'
      this._set('forecast_attribute_toggle_style', v.forecast_attribute_toggle_style === 'chips' ? 'chips' : undefined);
      // altri attributi offerti: se sono TUTTI quelli disponibili -> non salvare
      // (= tutti, nuovi attributi inclusi da soli); altrimenti salva il sottoinsieme
      // (anche vuoto: significa "solo il default", nessun selettore)
      const chosenOthers = Array.isArray(v.forecast_attributes) ? v.forecast_attributes : [];
      this._set('forecast_attributes', chosenOthers.length === otherAttrsD.length ? undefined : chosenOthers);
      this._set('forecast_days', v.forecast_days);
      this._set('forecast_hours', v.forecast_hours);
      // visible_rows: vuoto/null = mostra tutte
      this._set('visible_rows', (v.visible_rows === null || v.visible_rows === undefined || v.visible_rows === '') ? undefined : v.visible_rows);
      // show_rain e' attivo di default: salva solo se false
      this._set('show_forecast_precipitation', v.show_forecast_precipitation === false ? false : undefined);
      // show_toggle e' spento di default: salva solo se true
      this._set('show_forecast_toggle', v.show_forecast_toggle === true ? true : undefined);
      const newLayout = this._config.forecast_layout || 'bars';
      const newType = this._config.forecast_type || 'daily';
      const newAttr = this._config.forecast_attribute || 'temperature';
      const newSelOn = this._config.show_forecast_attribute_toggle === true;
      // cambio layout, attributo di default o on/off del selettore -> ricostruisci
      // il form (opzioni grafico, lista "altri attributi" e visibilita' dipendono)
      if (newLayout !== prevLayout || newAttr !== prevAttr || newSelOn !== prevSelOn) {
        this._rebuildForecastForm();
      } else if (newType !== prevType) {
        // cambio daily/hourly -> gli attributi disponibili possono differire
        this._graphAttrsFetched = false;
        this._ensureGraphAttrs();
      }
    });
    mount.appendChild(form);
    mount.dataset.filled = '1';
    // carica (una volta) gli attributi realmente presenti nelle previsioni e
    // ricostruisce la tendina filtrata
    this._ensureGraphAttrs();
  }

  // Ricostruisce il form previsioni (schema dinamico: opzioni grafico, tendina
  // attributi filtrata). Serve perche' ha-form tiene lo schema fisso.
  _rebuildForecastForm() {
    const mount = this.shadowRoot && this.shadowRoot.getElementById('forecast-form');
    if (!mount) return;
    mount.innerHTML = '';
    delete mount.dataset.filled;
    this._fillForecastForm();
  }

  // Interroga una volta get_forecasts e tiene solo gli attributi (tra GRAPH_ATTRS)
  // realmente forniti dall'integrazione; poi ricostruisce il form filtrato.
  async _ensureGraphAttrs() {
    if (this._graphAttrsFetched) return;
    this._graphAttrsFetched = true;
    const ent = this._config.entity;
    if (!ent || !this._hass) return;
    let fc = [];
    try {
      const r = await this._hass.callWS({
        type: 'call_service', domain: 'weather', service: 'get_forecasts',
        service_data: { type: this._config.forecast_type || 'daily' },
        target: { entity_id: ent }, return_response: true,
      });
      fc = r?.response?.[ent]?.forecast || [];
    } catch (err) {
      fc = this._hass.states[ent]?.attributes?.forecast || [];
    }
    if (!fc.length) return;
    const avail = GRAPH_ATTRS.filter((a) => a === 'temperature' || fc.some((d) => typeof d[a] === 'number'));
    // ricostruisci solo se l'insieme e' cambiato
    const prev = (this._availGraphAttrs || []).join(',');
    if (avail.length && avail.join(',') !== prev) {
      this._availGraphAttrs = avail;
      this._rebuildForecastForm();
    }
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
    mount.innerHTML = '';

    // normalizza inline (stessa logica di _normalizeDetails nella card)
    const details = (this._config.details || []).map((d) =>
      typeof d === 'string' ? { attribute: d, decimals: 0 } : d
    );
    try { this._fillDetailsFormInner(mount, details); }
    catch(e) { console.error('SWC _fillDetailsForm error:', e); mount.textContent = 'Error: ' + e.message; }
    mount.dataset.filled = '1';
  }

  _fillDetailsFormInner(mount, details) {
    const numericAttrs = new Set(['humidity','pressure','wind_speed','wind',
      'precipitation','precipitation_probability','visibility','apparent_temperature',
      'cloud_coverage','uv_index','dew_point']);
    const usedKeys = new Set(details.map((d) => d.attribute));
    const available = ALL_DETAILS.filter(([k]) => !usedKeys.has(k));

    const save = (list) => {
      this._set('details', list.length ? list : []);
      const m = this.shadowRoot && this.shadowRoot.getElementById('details-form');
      if (m) { m.dataset.filled = ''; m.innerHTML = ''; }
      this._fillDetailsForm();
    };

    // una ha-form expandable per ogni attributo aggiunto
    details.forEach((item, i) => {
      const row = document.createElement('div');
      row.className = 'custom-row';

      const form = document.createElement('ha-form');
      form.hass = this._hass;
      form.data = { decimals: item.decimals ?? 0 };

      const isNum = numericAttrs.has(item.attribute);

      if (isNum) {
        // attributi numerici: pannello espandibile con campo decimali
        form.data = { decimals: item.decimals ?? 0 };
        form.schema = [{
          type: 'expandable',
          name: '',
          title: this._detailLabel(item.attribute),
          icon: DETAIL_ICONS[item.attribute] || 'mdi:format-list-bulleted',
          expanded: i === this._openDetailIndex,
          schema: [{ name: 'decimals', selector: { number: { min: 0, max: 6, step: 1, mode: 'box' } } }],
        }];
        form.computeLabel = (s) => s.name === 'decimals' ? this.t('cs_decimals') : s.name;
        form.addEventListener('value-changed', (e) => {
          const v = e.detail.value || {};
          const dec = Math.min(6, Math.max(0, parseInt(v.decimals) || 0));
          const l = [...details];
          l[i] = { attribute: item.attribute, decimals: dec };
          this._set('details', l);
        });
      } else {
        // attributi non numerici (alba, tramonto, direzione vento):
        // riga statica senza pannello espandibile (niente freccia, niente panel vuoto)
        const staticDiv = document.createElement('div');
        staticDiv.style.cssText = 'display:flex;align-items:center;gap:10px;padding:12px 16px;' +
          'border:1px solid var(--divider-color,#e0e0e0);border-radius:8px;flex:1';
        const ico = document.createElement('ha-icon');
        ico.setAttribute('icon', DETAIL_ICONS[item.attribute] || 'mdi:format-list-bulleted');
        ico.style.color = 'var(--secondary-text-color)';
        const lbl = document.createElement('span');
        lbl.textContent = this._detailLabel(item.attribute);
        lbl.style.flex = '1';
        staticDiv.append(ico, lbl);
        row.appendChild(staticDiv);
      }

      // riga controlli: ▲ ▼ + Rimuovi allineati a destra (identico ai sensori personalizzati)
      const ctrlRow = document.createElement('div');
      ctrlRow.style.cssText = 'display:flex;justify-content:flex-end;align-items:center;gap:8px';

      const mkArrow = (label, disabled, fn) => {
        const b = document.createElement('button');
        b.type = 'button'; b.textContent = label;
        b.style.cssText = 'border:none;background:none;cursor:pointer;font-size:1em;padding:2px 4px;color:var(--primary-text-color)';
        if (disabled) { b.disabled = true; b.style.opacity = '0.3'; }
        b.addEventListener('click', fn);
        return b;
      };

      ctrlRow.append(
        mkArrow('▲', i === 0, () => { const l=[...details]; [l[i-1],l[i]]=[l[i],l[i-1]]; save(l); }),
        mkArrow('▼', i === details.length-1, () => { const l=[...details]; [l[i],l[i+1]]=[l[i+1],l[i]]; save(l); }),
        this._trashBtn(() => save(details.filter((_,j)=>j!==i))),
      );

      if (isNum) row.append(form, ctrlRow);
      else row.appendChild(ctrlRow);
      mount.appendChild(row);
    });

    // ha-form per aggiungere un attributo (select nativa di HA)
    if (available.length) {
      const addWrap = document.createElement('div');
      addWrap.style.marginTop = '8px';
      const addForm = document.createElement('ha-form');
      addForm.hass = this._hass;
      addForm.data = { attribute: '' };
      addForm.schema = [{
        name: 'attribute',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: '', label: `＋ ${this.t('add_sensor').replace('＋ ', '')}…` },
              ...available.map(([k]) => ({ value: k, label: this._detailLabel(k) })),
            ],
          },
        },
      }];
      addForm.computeLabel = () => '';
      addForm.addEventListener('value-changed', (e) => {
        const v = (e.detail.value || {}).attribute;
        if (!v) return;
        addForm.data = { attribute: '' };
        save([...details, { attribute: v, decimals: 0 }]);
      });
      addWrap.appendChild(addForm);
      mount.appendChild(addWrap);
    }
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
        .cs-card { border: 1px solid var(--divider-color,#e0e0e0); border-radius: 8px; margin-bottom: 6px; overflow: hidden; }
        .cs-header { display: flex; align-items: center; padding: 6px 8px; gap: 4px; background: var(--secondary-background-color, #f5f5f5); }
        .cs-title { flex: 1; font-weight: 600; font-size: 0.9em; color: var(--primary-text-color); }
        .cs-body { padding: 10px 12px; display: flex; flex-direction: column; gap: 10px; }
        .cs-add-row { margin-top: 8px; }
        .cs-add-row select { width: 100%; }
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
          <summary>${this.t('background')}</summary>
          <div class="grp-body">
            <div id="background-form"></div>
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
          <summary>${this.t('interaction')}</summary>
          <div class="grp-body">
            <div id="interaction-form"></div>
          </div>
        </details>

      </div>
    `;

    this._fillEntityPickers();
    this._fillAppearanceForm();
    this._fillBackgroundForm();
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

      const ctrlRow = document.createElement('div');
      ctrlRow.style.cssText = 'display:flex;justify-content:flex-end;align-items:center;gap:8px';

      const mkArrow = (label, disabled, fn) => {
        const b = document.createElement('button');
        b.type = 'button'; b.textContent = label;
        b.style.cssText = 'border:none;background:none;cursor:pointer;font-size:1em;padding:2px 4px;color:var(--primary-text-color)';
        if (disabled) { b.disabled = true; b.style.opacity = '0.3'; }
        b.addEventListener('click', fn);
        return b;
      };

      ctrlRow.append(
        mkArrow('▲', i === 0, () => this._moveCustom(i, -1)),
        mkArrow('▼', i === items.length - 1, () => this._moveCustom(i, 1)),
        this._trashBtn(() => this._removeCustom(i)),
      );

      row.appendChild(form);
      row.appendChild(ctrlRow);
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

  _trashBtn(onClick) {
    const btn = document.createElement('ha-icon-button');
    btn.label = 'Remove';
    const icon = document.createElement('ha-icon');
    icon.setAttribute('icon', 'mdi:delete');
    btn.appendChild(icon);
    btn.addEventListener('click', onClick);
    return btn;
  }

  _moveCustom(index, dir) {
    const arr = [...(this._config.custom_details || [])];
    const target = index + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    this._config.custom_details = arr;
    this._emit();
    this._openCustomIndex = target;
    this._renderCustomEditor();
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
  `%c SUN-WEATHER-CARD %c ${CARD_VERSION} `,
  'color: white; background: #ff7a59; font-weight: 700;',
  'color: #ff7a59; background: #1c1c1c; font-weight: 700;'
);
