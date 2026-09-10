# Changelog

All notable changes to this project are documented here.
This project adheres to [Semantic Versioning](https://semver.org/).

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
