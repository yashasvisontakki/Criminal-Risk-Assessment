# Criminal Risk Assessment Request - Web Form

## Contents
- `index.html` - Static HTML version (open directly in any browser)
- `css/style.css` - Shared stylesheet
- `js/script.js` - Dynamic data binding, Submit/Print/Reset logic
- `assets/logo.svg` - Logo used in the header
- `pug/index.pug` - Pug template version of the same form (compile with `pug pug/index.pug --out .` using the `pug-cli` npm package)

## Usage
Open `index.html` in a browser. All fields are bound to a JS object
(`window.CriminalRiskForm.data`) in `js/script.js`. Update that object,
or call `window.CriminalRiskForm.loadData({...})` from the console,
and the UI updates automatically. Editing the form fields updates the
object automatically as well (two-way binding).

- **Submit** validates required fields and logs the collected data to the console.
- **Print** opens the browser print dialog, formatted for the two-page layout.
- **Reset** clears all fields.

## Compiling the Pug template
```
npm install -g pug-cli
pug pug/index.pug --out .
```
This generates `index.html` from the Pug source (paths inside the Pug
file are already relative, matching the folder structure of this package).
