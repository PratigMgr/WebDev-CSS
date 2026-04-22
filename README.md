# Assignment 4 — Student Starter (STRICT)

This scaffold includes routing + context wiring only. Implement all TODOs to meet the brief.

## Run
```bash
npm install
npm run dev
```
# INFT: 2202 : Assignment 4 — Favourite Sportbikes Catalog
### A React SPA with Routing, Context, and Custom Hooks

---

**Name:** Pratig Thapa Magar
**Date:** 2026-04-21
**Course Code:** INFT 2202

---

## Overview

For this assignment I built a single-page application using React, React Router, and Bootstrap. The idea was to implement routing and context wiring by filling in all the TODOs from the starter scaffold. I wanted to make it something I actually enjoyed building, so instead of keeping it as a generic item catalog, I turned it into a personal favourite sportbikes collection — a place to track and compare bikes I love, with specs like engine size, horsepower, top speed, and more.

---

## How I Worked Through It

### Starting Point

The scaffold came with routing and context already wired up at a high level, but everything inside was a TODO. The folder structure was there — `App.jsx`, `Layout.jsx`, `main.jsx`, and folders for `views`, `components`, `hooks`, and `context`. My job was to bring all of it to life without breaking what was already set up.

---

### A Change of Plan — From Generic Items to Favourite Sportbikes

I started out implementing the generic item version — name, category, price, rating, description. It worked fine but honestly felt a bit boring. Halfway through I thought, why not make this something I actually care about? So I switched the whole concept to a **Favourite Sportbikes Collection**.

This was not just a cosmetic change — it affected pretty much every file. Here is what changed when I made that decision:

- **Renamed fields** — `description` became `notes`, `category` became a fixed bike type dropdown instead of a free text field
- **Added new fields** — `engine` (cc), `horsepower` (hp), and `topSpeed` (km/h) to store real bike specs
- **Added the favourite feature** — I added a `favourite` boolean, a `toggleFavourite` function, a ⭐ star button on every card, a favourite checkbox in the form, and a "Show Favourites Only" button in the list view
- **Fixed bike type as a dropdown** — when category was a free text field, the filter never worked properly because "Sportbike" and "sportbike" were treated differently. Switching to a fixed dropdown (Sportbike, Cruiser, Naked, Touring, Supermoto, Dirt, Scooter) fixed that completely
- **Changed the storage key** — from `a4_items` to `a4_bikes` to avoid old localStorage data causing issues
- **Updated all UI text** — titles, labels, placeholders, nav links, empty states — everything now says "bike" instead of "item"

The plan change happened mid-development so it did introduce some extra bugs along the way, but I caught and fixed them all.

---

### Step 1 — Custom Hook: `useItems.js`

I started with the `useItems` hook because everything else — the context, the views, the filters — all depended on it. I implemented:

- **localStorage persistence** — two `useEffect` calls, one to load on mount and one to save whenever items change
- **`addItem`** — spreads the form data, adds a unique `id` using `Date.now()`, and sets `favourite: false` by default
- **`updateItem`** — maps over items and merges the patch object for the matching id
- **`deleteItem`** — filters out the item with the matching id
- **`toggleFavourite`** — flips the `favourite` boolean for a specific bike
- **`derived` memo** — applies search (name + notes), bike type filter, min/max price filter, and sorting in one `useMemo` block
- **`favOnly` and `bikeType` states** — for the favourites-only toggle and bike type dropdown filter

---

### Step 2 — Context: `ItemsContext.jsx`

Once `useItems` was working, wiring up the context was actually just one line. Instead of manually listing everything in a `value` object, I called `useItems()` and passed the whole return straight into the Provider:

```jsx
const value = useItems()
return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
```

That one line replaced all the TODOs in the context file. Every component that calls `useContext(ItemsContext)` gets access to everything — items, filters, CRUD handlers, all of it.

---

### Step 3 — Validation: `UserFormValidation.js`

I built a reusable validation hook following the week10 ICE pattern. It manages `values`, `errors`, and `touched` state internally and exposes:

- `handleChange` — updates the field and validates it live as you type
- `handleBlur` — marks the field as touched so errors only appear after you leave it
- `validateAll` — runs every validator and marks all fields touched on submit

The hook takes `initialValues` and a `validators` object as arguments so it works with any form, not just this one.

---

### Step 4 — Form: `ItemForm.jsx`

I used `UserFormValidation` with a `validators` object at the top of the file, exactly like the week10 sample showed. The fields are:

- **Brand/Model** — required, minimum 2 characters
- **Bike Type** — required, `<select>` dropdown with fixed bike type options
- **Price, Engine, Horsepower, Top Speed, Rating** — all required numeric fields with range and type validation
- **Favourite checkbox** — lets you star a bike directly when adding or editing it
- **Notes** — completely optional textarea

Validation errors only show after touching a field or hitting submit, which feels much cleaner than showing errors immediately on page load.

---

### Step 5 — Components

**`ItemCard.jsx`** — shows a card for each bike with the name, a ⭐/☆ favourite toggle, the bike type badge, all specs, a notes preview, and View/Edit/Delete buttons. Favourited bikes get a yellow border so they stand out.

**`InputField.jsx`** — reused directly from the week10 ICE. A simple reusable input with a label, Bootstrap `is-invalid` support, and an error message below the field.

---

### Step 6 — Views

**`HomeView.jsx`** — Welcome page with a short intro and links to browse or add a bike.

**`ListView.jsx`** — The main list page with search, bike type filter, min/max price filter, sort controls, a favourites-only toggle button, an empty state message, and a responsive grid of `ItemCard` components.

**`DetailView.jsx`** — Full detail page for one bike. Shows all specs, a favourite toggle, and Edit/Delete buttons.

**`CreateEditView.jsx`** — Handles both creating and editing. If an `id` param is present it loads the existing bike into the form and calls `updateItem` on save. If not, it calls `addItem` and navigates to the new bike's detail page.

**`NotFound.jsx`** — Simple 404 page with a link back home, connected to the `path="*"` fallback route.

---

### Step 7 — Routing

All routes are nested inside the `Layout` route so the header nav always stays visible. The full route structure:

```
/           → HomeView
/list       → ListView
/item/:id   → DetailView
/new        → CreateEditView
/edit/:id   → CreateEditView
*           → NotFound
```

`HashRouter` is used in `main.jsx` for GitHub Pages compatibility.

---

### Bugs I Fixed Along the Way

- **Missing imports** — `useNavigate`, `Link`, and `useState` were missing in several files after splitting everything into separate files
- **Duplicate imports** — accidentally had two `import` lines for `react-router-dom` in `DetailView.jsx`
- **`categories: []` hardcoded** — the `useItems` return had `categories: []` instead of the computed value, so the type filter dropdown was always empty
- **`favourite` field missing on old items** — when I switched to the sportbike plan, old localStorage data without `favourite` caused crashes; fixed by clearing localStorage and defaulting `favourite: false` in `addItem`
- **`bike` vs `item` prop name mismatch** — `ItemCard` used `bike` as the prop name but `ListView` was passing `item=`; fixed by passing `bike={item}` from `ListView`
- **Extra closing `</div>`** — caused a 500 syntax error in `ListView.jsx`
- **`favOnly` missing from dependency array** — the favourites filter was not reacting to changes because `favOnly` was not in the `useMemo` dependency array
- **Files mixed together** — `DetailView.jsx` and `ItemForm.jsx` code ended up pasted into the same file by accident, causing 500 errors; separated them back out

---

## Final File Structure

```
src/
├── App.jsx
├── main.jsx
├── components/
│   ├── InputField.jsx
│   ├── ItemCard.jsx
│   └── ItemForm.jsx
├── context/
│   └── ItemsContext.jsx
├── hooks/
│   ├── useItems.js
│   └── UserFormValidation.js
├── layout/
│   └── Layout.jsx
└── views/
    ├── HomeView.jsx
    ├── ListView.jsx
    ├── DetailView.jsx
    ├── CreateEditView.jsx
    └── NotFound.jsx
```

---

## Key Concepts Used

- **React Context** — global state shared across all views without prop drilling
- **Custom Hooks** — `useItems` for all data logic, `UserFormValidation` for reusable form validation
- **`useMemo`** — efficient derived list that only recalculates when dependencies change
- **`useEffect`** — localStorage load on mount and persist on change
- **React Router v6** — nested routes, `useParams`, `useNavigate`, `HashRouter`
- **Bootstrap 5** — responsive grid, cards, forms, badges, buttons