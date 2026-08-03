# Sun Weather Card

Animated current‑conditions header, a sunrise/sunset arc, and daily/hourly
forecasts as iOS‑style bars or a smooth line graph. Configurable from the UI.

- Animated, hand‑drawn SVG weather icons (animations can be turned off)
- Sunrise/sunset arc (or add sunrise/sunset to the details)
- Bars **or** graph layout, daily **or** hourly
- Transparent background or a custom background image with a light/dark overlay
- Pick which detail attributes to show (they appear only if your integration
  provides them)
- Italian, English or German / system language
- Tap, hold and double‑tap actions
- Full visual editor

Minimal setup:

```yaml
type: custom:sun-weather-card
entity: weather.your_weather_entity
```
