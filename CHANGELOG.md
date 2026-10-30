# Changelog

All notable changes to this project are documented here.
This project adheres to [Semantic Versioning](https://semver.org/).

## [1.12.1]

### Changed
- Documentation only: refreshed the README screenshots (now showing the compact
  layout and the arc/bar sun display) and simplified the HACS install steps now
  that the card is in the default HACS store. The screenshot images use absolute
  URLs so they render inside HACS. No functional changes to the card itself.

## [1.12.0]

### Added
- **Choose which forecast attribute to plot** (`forecast_attribute`, #7) — the
  daily/hourly forecast can now show any supported attribute (temperature,
  apparent temperature, dew point, humidity, pressure, wind speed, cloud
  coverage, UV index, precipitation, precipitation probability) on **both** the
  bars and the line graph, not just temperature.
- **In-card attribute selector** — optionally let viewers switch attribute
  straight from the card (`show_forecast_attribute_toggle`), as a dropdown
  (default) or chips (`forecast_attribute_toggle_style`). `forecast_attributes`
  curates which attributes are offered; the default one is always included.
- **Compact and None forecast layouts** (`forecast_layout`) — `compact` is a
  slim horizontal strip (day, icon, max/min) that takes minimal vertical space;
  `none` hides the bars/graph while keeping the day row (e.g. to show just the
  week ahead). They join the existing `bars` and `graph`.
- **Dynamic colouring for bars and graph** (`color_by_value`, on by default) —
  one toggle colours both the bars and the graph by value: a cold→warm gradient
  for temperature (and apparent temperature / dew point), the WHO colour scale
  for UV index, and a flat accent colour for every other attribute. Turn it off
  for flat accent-coloured bars and graph.
- **Card background** — new Background section in the editor: `background_css`
  sets a solid colour or CSS gradient behind the card, and `light_text` switches
  all text to a light colour for dark backgrounds.

### Changed
- `graph_color_by_temp` is superseded by `color_by_value` (which now covers both
  bars and graph). Existing configs keep working — the old key is still honoured.

## [1.11.1]

### Security
- Values coming from Home Assistant entity states — custom sensor states and
  attributes, units of measurement, friendly names and the wind-direction
  string — are now HTML-escaped before being inserted into the card. This
  prevents markup carried by an entity's value (feed titles, calendar
  summaries, messages, cloud-API strings) from being injected into the
  dashboard of anyone who opens it. Thanks to @frenck for the report.

### Added
- **Swedish (sv) translation** — card and editor fully translated to Swedish.
  Thanks @lassemanjansson-web for the contribution.

## [1.11.0]

### Added
- **Wind slot** — new `wind` item for the `details` list: shows wind speed and
  direction combined in a single cell (e.g. `6 km/h (E)`). A convenient
  replacement for separate `wind_speed` and `wind_bearing` entries when
  screen space is tight. Requested by Dave (HA community forum).
- **Decimal rounding for detail attributes** — each item in the `details` list
  can now be written as `{attribute: humidity, decimals: 2}` to round that
  attribute's value to the given number of decimal places. The visual editor
  shows expandable cards with a decimals field for each numeric attribute;
  non-numeric items (sunrise, sunset, wind direction) appear as plain rows.
  Requested by Dave (HA community forum).

### Fixed
- Current-condition label now uses the day/night-corrected condition instead of
  the raw state from the weather integration. Integrations that still report
  `clear-night` after sunrise (before their next update cycle) no longer show
  the wrong condition text. Thanks @MisteurZZ (#13).
- `partlycloudy-night` translation was missing from all six languages — it is
  now correctly translated everywhere.

### Changed
- Details editor: items now display as expandable cards with a decimals field;
  each card has up/down arrows and a trash button to reorder and remove.
- Custom sensors editor: up/down arrows and a trash button added — consistent
  with the detail attributes editor.

## [1.10.0]

### Added
- **Moon travels the arc at night** — the moon now moves along the arc (and
  bar) from sunset to sunrise through the night, instead of staying parked at
  one end. Thanks @PhilM4350 for spotting the discrepancy.
- **Outdoor temperature sensor** (`current_temp_entity`) — point the card at
  any sensor to use its reading as the current temperature, instead of the one
  reported by the weather service. Useful when your local thermometer is more
  accurate than the weather integration.
- **Configurable decimal places** — two new options:
  - `current_temp_decimals` (default `1`) — decimal places for the large
    current-temperature number.
  - `forecast_temp_decimals` (default `0`) — decimal places for forecast
    temperatures (max/min labels and graph values).

## [1.9.1]

### Added
- **Polish (pl) translation** — card and editor fully translated to Polish.
  Thanks @EasYPLL for the contribution.

### Changed
- All translations are now grouped at the top of the file and centralised
  (`SUPPORTED_LANGS`), so adding a language only means editing the translation
  blocks — no other code changes. See `CONTRIBUTING.md`.

## [1.9.0]

### Added
- **Sun display style** — new `sun_style` option: show the sunrise/sunset as
  a curved **arc** (default), a flat **bar**, or **none**. Replaces the old
  `show_arc` toggle, which still works for backward compatibility
  (`show_arc: false` behaves like `sun_style: none`).
- **Sunrise/sunset countdown** — new `show_sun_countdown` option (default
  off): shows a "sunset in …" / "sunrise in …" countdown next to the arc/bar.
  Requested by JourMic.

### Changed
- Temperature colour scale now extends below −10 °C (down to −30 °C) with
  darker shades of blue, so hard-frost days are distinguishable. Temperatures
  from −10 °C up are unchanged. Requested by @JourMic.
- Editor: the two precipitation toggles are now grouped together.

## [1.8.0]

### Performance
- The card no longer rebuilds icons, details, bars, hourly and graph on every
  Home Assistant state change — each part redraws only when the data it shows
  actually changes. This also stops the weather-icon animations from
  restarting on unrelated updates.
- Graph width is read via a `ResizeObserver` instead of measuring on every
  render (no more per-tick layout reflow).
- The clock runs on its own timer, so the time stays accurate even when
  Home Assistant is idle.

### Added (opt-in, off by default)
- **Band fill** — with `graph_color_by_temp` enabled, the area between the
  max and min lines is filled with the temperature gradient.
- **`graph_precip_bars`** — in the graph layout, show precipitation as scaled
  bars instead of plain text labels.

### Changed
- Temperature colour scale now extends above 35 °C (up to 40 °C), so very hot
  days are distinguishable instead of all showing the same red. Temperatures
  up to 35 °C are unchanged.
- The partly-cloudy sun icon now has a full set of rays, so its rotation looks
  consistent instead of showing a gap.

### Fixed
- Graph now fills the full width when the weather entity provides fewer days
  than `visible_rows` (previously it stopped partway).
- Main current-conditions icon now shows a moon (or moon + cloud) at night
  when the integration reports `sunny`/`partlycloudy` after dark, instead of
  a daytime sun (#10).

### Thanks
- @fab301s — performance work and graph visuals (#9).
- @JourMic — night icon report (#10).

## [1.7.0]

### Added (opt-in, off by default)
- **`graph_color_by_temp`** — in the graph layout, colour the temperature
  lines by value, using the same scale as the bar layout (#7).

### Fixed
- Bar layout: the rain amount now sits under the max temperature instead of
  beside it, so the bars keep a uniform width across all days (#6).

### Thanks
- @fab301s (#6, #7).

## [1.6.1]

### Fixed
- Custom sensor date/time values now follow the card's `time_format`
  (12h/24h) like the rest of the card.
- Hourly forecast: night hours with a partly-cloudy condition now show a
  moon icon instead of the daytime sun (#5).

### Thanks
- @JourMic (#5), dynasticorpheus (HA community forum).
