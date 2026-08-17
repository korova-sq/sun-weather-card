# Sun Weather Card

<br>

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/korova-sq/sun-weather-card)](https://github.com/korova-sq/sun-weather-card/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-korova.sq-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/korova.sq)

<br>

<p align="center">
  <img src="https://raw.githubusercontent.com/korova-sq/sun-weather-card/main/images/banner.png" alt="Sun Weather Card" />
</p>

<br>

## 🤔 What is Sun Weather Card?

Sun Weather Card is a weather card for [Home Assistant](https://www.home-assistant.io/) that puts the whole day at a glance: an animated current‑conditions header, a sunrise/sunset arc, and daily or hourly forecasts shown as iOS‑style bars or a smooth line graph.

Most weather cards on HACS show the forecast as a plain list. This card focuses on a clean, iOS‑inspired look — with the sun's path, animated icons and a fully visual editor — designed for dashboards where you want the weather to look good and read instantly, without touching YAML.

<br>

<!--
  SCREENSHOTS
  Row 1: bars layout (daily + hourly). Row 2: graph layout (daily + hourly).
  Grouping by layout keeps the proportions consistent within each row.
  A light/dark pair is shown further down in the "Themes" section.
-->
<p align="center">
  <img src="https://raw.githubusercontent.com/korova-sq/sun-weather-card/main/images/daily-bars.png" width="300" alt="Bars layout – daily forecast" />
  <img src="https://raw.githubusercontent.com/korova-sq/sun-weather-card/main/images/hourly-bars.png" width="300" alt="Bars layout – hourly forecast" />
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/korova-sq/sun-weather-card/main/images/daily-graph.png" width="300" alt="Graph layout – daily forecast" />
  <img src="https://raw.githubusercontent.com/korova-sq/sun-weather-card/main/images/hourly-graph.png" width="300" alt="Graph layout – hourly forecast" />
</p>

<br>

## ✨ Features

- 🌤️ **Current conditions header** – time, date, animated weather icon, current temperature, today's high/low and the location name.
- 🌅 **Sunrise/sunset arc** – a light dotted arc with the sun (or moon at night) moving along it between sunrise and sunset.
- 📊 **Configurable details** – pick which attributes to show below the arc (humidity, pressure, wind, precipitation, UV, sunrise/sunset and more), shown as a tidy grid. Each attribute is shown only if your weather integration provides it.
- 📅 **Daily & hourly forecast** – choose `daily` or `hourly`.
- 📈 **Two layouts** – classic **bars** (iOS‑style temperature range bars) or a **graph** (smooth temperature line, with max/min lines for daily).
- 🎨 **Original animated SVG icons** for sun, moon, clouds, rain, snow, fog, wind and lightning. No external assets — animations can be turned off for lower-end devices.
- 🖼️ **Transparent or image background** – make the card blend into your dashboard, or set a background image with an adjustable light/dark overlay for readability.
- 🔧 **Custom sensors** – add any entity (or a specific attribute of it, e.g. the sun's elevation or next dawn) to the details, with an optional name and icon. Shown in their own row; names can be displayed under each value or on tap.
- 🌍 **Multi‑language** – card content in Italian, English, German, Dutch or French, or follow your Home Assistant system language. The UI editor follows the card language.
- 👆 **Tap / hold / double‑tap actions** – standard Home Assistant actions (more‑info, navigate, url, perform‑action, toggle).
- 👁️ **Show only what you need** – time, date and the sun arc can each be turned on or off, and you choose exactly which detail attributes to display.
- 🛠 **Visual editor** – configure everything without touching YAML.

---

## Themes

The card automatically follows your Home Assistant theme — light or dark.

<p align="center">
  <img src="https://raw.githubusercontent.com/korova-sq/sun-weather-card/main/images/theme-light.png" width="300" alt="Light theme" />
  <img src="https://raw.githubusercontent.com/korova-sq/sun-weather-card/main/images/theme-dark.png" width="300" alt="Dark theme" />
</p>

---

## Installation

### HACS (recommended)

1. Go to **HACS → Frontend**.
2. Open the menu (⋮) → **Custom repositories**.
3. Add this repository URL and select category **Lovelace / Dashboard**.
4. Install **Sun Weather Card**.
5. Reload your browser (hard refresh).

### Manual

1. Download `sun-weather-card.js` from the latest release.
2. Copy it to `config/www/`.
3. Add it as a dashboard resource:
   - **Settings → Dashboards → ⋮ → Resources → Add resource**
   - URL: `/local/sun-weather-card.js`
   - Type: **JavaScript Module**
4. Reload your browser (hard refresh).

---

## Usage

Add the card from the dashboard card picker (it shows a live preview), or in YAML:

```yaml
type: custom:sun-weather-card
entity: weather.your_weather_entity
```

That's the minimum needed. Everything else is optional and has sensible defaults.

---

## Configuration

All options can be set from the visual editor or in YAML.

| Option | Type | Default | Description |
|---|---|---|---|
| `entity` | string | **required** | Your `weather.*` entity. |
| `sun_entity` | string | `sun.sun` | Sun entity used for the sunrise/sunset arc. |
| `location` | string | *auto* | Location name shown under the condition. Empty = taken automatically. |
| `language` | string | `system` | Card language: `system`, `it`, `en`, `de`, `nl` or `fr`. |
| `time_format` | string | `24` | `24` or `12` hour clock. |
| `show_time` | boolean | `true` | Show the clock. |
| `show_date` | boolean | `true` | Show the date. |
| `show_arc` | boolean | `true` | Show the sunrise/sunset arc. |
| `animated_icons` | boolean | `true` | Animate the weather icons. Set to `false` for static icons (lighter on slow devices). |
| `transparent` | boolean | `false` | Transparent background — the card blends into the dashboard (no background, border or shadow). |
| `background_image` | string | *none* | Background image URL or `/local/…` path. |
| `background_overlay` | number | `0` | Overlay over the background image, from `-1` (light) through `0` (none) to `1` (dark), for text readability. |
| `forecast_type` | string | `daily` | `daily` or `hourly`. |
| `forecast_layout` | string | `bars` | `bars` or `graph`. |
| `forecast_days` | number | `7` | Number of days to load (daily). |
| `forecast_hours` | number | `24` | Number of hours to load (hourly). |
| `visible_rows` | number | *all* | How many rows/columns stay visible; the rest scrolls. Empty = show all. |
| `show_forecast_precipitation` | boolean | `true` | Show rain (mm) per day when provided. |
| `show_forecast_toggle` | boolean | `false` | Show an in‑card Daily/Hourly toggle. |
| `details` | list | *(none)* | Attributes to show below the arc (see below). |
| `custom_details` | list | *(none)* | Extra entities to show in the details (see below). |
| `show_sensor_names` | boolean | `true` | Show the custom sensor name under each value. When off, the name appears on tap. |
| `tap_action` | action | `more-info` | Standard HA action. |
| `hold_action` | action | – | Standard HA action. |
| `double_tap_action` | action | – | Standard HA action. |

### Details

Add any of these to the `details` list, in the order you want them shown. An item appears only if your integration provides that value.

`humidity`, `pressure`, `wind_speed`, `wind_bearing`, `precipitation`, `precipitation_probability`, `sunrise`, `sunset`, `visibility`, `apparent_temperature`, `cloud_coverage`, `uv_index`, `dew_point`

### Custom sensors

Use `custom_details` to show any entity in the details grid — not just the weather entity's attributes. You can show the entity's state, or a specific attribute of it (for example the sun's `elevation` or `next_dawn`). Each item takes an `entity` and, optionally, an `attribute`, a `name` and an `icon`:

```yaml
custom_details:
  - entity: sensor.outdoor_temperature
  - entity: sun.sun
    attribute: elevation
    name: Sun elevation
    icon: mdi:weather-sunny
```

Date/time attributes (like `next_dawn`) are formatted automatically. Names are shown under each value by default; set `show_sensor_names: false` to show them on tap instead.

---

## Example

```yaml
type: custom:sun-weather-card
entity: weather.home
sun_entity: sun.sun
language: system
time_format: '24'
forecast_type: daily
forecast_layout: graph
forecast_days: 7
visible_rows: 5
show_forecast_precipitation: true
details:
  - humidity
  - wind_bearing
  - pressure
  - wind_speed
  - sunrise
  - sunset
tap_action:
  action: more-info
```

---

## Notes

- The card uses the modern `weather.get_forecasts` service and falls back to the legacy `forecast` attribute when needed.
- Forecast data is cached for a few minutes to avoid excessive calls.
- All weather icons are original SVGs drawn from scratch — no third‑party assets.

---

## 💬 Discussion

Discussion and support thread on the Home Assistant community forum:
[Sun Weather Card on the HA community](https://community.home-assistant.io/t/sun-weather-card-weather-card-with-sunrise-sunset-arc-bars-or-graph-forecast/1017126)

## ☕ Support

If you enjoy this card and want to say thanks, a coffee is always welcome!

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-korova.sq-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/korova.sq)

## License

[MIT](LICENSE) © 2026 korova-sq
