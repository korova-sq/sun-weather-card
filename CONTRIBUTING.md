# Contributing

Thanks for helping improve Sun Weather Card! 🙏

## 🌍 Adding a language

All translations live at the **top of `sun-weather-card.js`**, inside a clearly
marked `🌍 TRANSLATIONS` block. Adding a language means editing only those
blocks — **no other code changes are needed**.

Steps:

1. **Base your work on the latest `main`** (so your PR doesn't roll back recent
   changes).

2. Open `sun-weather-card.js` and find the `🌍 TRANSLATIONS` block near the top.

3. Add your language **code + locale** to `SUPPORTED_LANGS`, e.g. for Polish:
   ```js
   const SUPPORTED_LANGS = {
     it: 'it-IT', en: 'en-GB', de: 'de-DE', nl: 'nl-NL', fr: 'fr-FR', pl: 'pl-PL',
   };
   ```

4. Add a block with the **same code** to each dictionary, copying the English
   (`en`) block and translating the **values only** (keep the keys unchanged):
   - `CONDITION_LABELS` — weather condition names.
   - `UI_LABELS` — sunrise/sunset words and the sunrise/sunset countdown
     (`sunset_in`, `sunrise_in`, `hm_join`). `hm_join` is the text placed
     between hours and minutes (e.g. `' e '` in Italian, `' '` in English).
   - `EDITOR_I18N` — all the visual-editor labels. Also add your language name
     to the `lang_*` line (e.g. `lang_pl: 'Polski'`).

5. *(Optional)* Add a block to `WIND_DIRS` if your language uses different
   compass abbreviations. If you skip it, the English abbreviations are used.

6. That's it — the card and editor will pick up the new language automatically.
   Test it by setting `language: <your_code>` on the card.

### Notes

- **Keep the keys identical to the English block.** Only translate the values.
- Missing keys fall back to English automatically, so a partial translation
  still works — but complete is best.
- Please open your PR against the latest `main`.

## Bug reports & features

Open an issue with a clear description and, for visual bugs, a screenshot —
it makes fixing things much faster. Thanks!
