# We can change the world!

A mobile-first, swipeable static site that argues one thing: your own behaviour is
the lever you actually control, small changes add up, and behaviour spreads to the
people around you. Twenty pages, ending in a pledge the reader picks themselves.

## Running it

No build step, no dependencies, no framework. Open `index.html` directly, or serve
the folder:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Deploying is a file copy — GitHub Pages, Netlify, S3, any static host.

React was not used: the whole thing is one deck component's worth of state
(a current index), so a bundler and a runtime would have cost more than they gave.

## Navigating

| Input | Action |
| --- | --- |
| Swipe left / right | Next page / previous page |
| Arrow keys, PageUp/PageDown, Space | Next / previous |
| Home / End | First / last page |
| Arrow buttons, bottom left and right | Next / previous |
| Dots along the bottom | Jump to any page |
| Burger menu, top left (or `m`) | Contents list, jump to any page |
| `#hash` in the URL | Deep link, e.g. `#beef`, `#shower`, `#sources` |
| Browser back / forward | Moves through visited pages |
| Trackpad horizontal scroll, shift + wheel | Next / previous |

Pages that are taller than the screen scroll vertically as normal; horizontal
swiping still works from anywhere on the page.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | Shell: top bar, deck container, controls, contents menu |
| `pages.js` | All content, one object per page — edit this to change the argument |
| `app.js` | Deck logic: swipe, keyboard, hash routing, pledges |
| `styles.css` | Mobile-first styling, one accent colour per page |

## Editing the content

Every page is one object in the `PAGES` array in `pages.js`. Adding an action page
means adding an object; the dots, contents menu, progress bar, deep links and the
pledge summary all pick it up automatically.

```js
{
  id: "compost",              // used for the #hash deep link
  kind: "action",             // hero | idea | action | pledge | sources
  num: "15",
  accent: "#90be6d",          // page colour
  menu: "Compost",            // label in the contents list
  eyebrow: "Action 15",
  title: "Compost your scraps.",
  stat: { value: "8%", label: "of global emissions come from wasted food" },
  body: ["One or two short paragraphs."],
  todo: ["Three concrete things.", "Each one line.", "Doable this week."],
  pledge: "Compost"           // omit to leave the page off the pledge list
}
```

Keep bodies to about three short paragraphs and `todo` to three one-line items —
past that a page stops fitting a phone screen.

## Pledges

Tapping **I am in** stores the page `id` in `localStorage` under `wctw:pledges`.
The pledge page counts them back and lists them. Nothing is sent anywhere; there
is no analytics, no tracking, no network call in the whole site.

## The numbers

Every figure on a page comes from a source listed on the final page, which links
out to the original. Where a claim is contested — the 21x green pension figure,
the strength of three-degrees social contagion — the page says so rather than
quietly using the biggest number available.
