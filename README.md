# We change the world!

A mobile-first, swipeable static site that argues one thing: individual behaviour is
the lever you actually control, it spreads to the people around you, and what you buy
is a vote nobody counts unless you cast it. Twenty-eight pages in five chapters, ending
in a pledge the reader picks and dates themselves.

Live at <https://hilkoc.github.io/change-the-world/>.

## Running it

No build step, no dependencies, no framework. Open `index.html` directly, or serve
the folder:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Deploying is a file copy. It is published with GitHub Pages from `main`, folder root.

React was not used: the whole thing is one deck component's worth of state
(a current index), so a bundler and a runtime would have cost more than they gave.

## Navigating

Two axes. Horizontal moves between pages, vertical deals with chapters and evidence.

| Input | Action |
| --- | --- |
| Swipe left / right | Next page / previous page |
| Swipe up | Open the proof sheet for this page |
| Swipe down | Close the sheet, or skip to the next chapter |
| Arrow keys, PageUp/PageDown, Space | Same four moves; `p` toggles the proof sheet |
| Home / End | First / last page |
| Arrow buttons, bottom left and right | Next / previous |
| Dots along the bottom | Jump to any page |
| Ticks on the left edge | Jump to a chapter |
| Burger menu, top left (or `m`) | Contents list, jump to any page |
| `#hash` in the URL | Deep link, e.g. `#beef`, `#rosa`, `#sources` |
| Browser back / forward | Moves through visited pages |
| Trackpad horizontal scroll, shift + wheel | Next / previous |

The vertical gestures are edge-gated so they never fight scrolling: swipe up only opens
the sheet once the page is scrolled to its bottom, swipe down only changes chapter from
the top of the page, and a downward drag inside an open sheet scrolls it until the sheet
is already at its top.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | Shell: top bar, chapter rail, deck, controls, proof sheet, contents menu |
| `pages.js` | `CHAPTERS` and `PAGES` — all content. Edit this to change the argument |
| `app.js` | Deck logic: gestures, chapters, proof sheet, hash routing, pledges |
| `styles.css` | Mobile-first styling, one accent colour per page |
| `404.html` | Sends stray GitHub Pages URLs back to the deck |
| `og.png` | Share-preview image, regenerate by screenshotting a 1200×630 page |

## The page schema

Every page is one object in `PAGES`. Adding one means adding an object — the dots,
contents menu, chapter rail, progress bar, deep links, sources page and pledge summary
all pick it up automatically.

```js
{
  id: "compost",              // used for the #hash deep link
  kind: "action",             // hero | idea | action | pledge | sources
  chapter: "footprint",       // id from CHAPTERS, decides the vertical position
  num: "19",
  accent: "#90be6d",
  menu: "Compost",            // label in the contents list
  eyebrow: "Action 19",
  title: "Compost your scraps.",
  stat: { value: "8%", label: "of global emissions come from wasted food" },
  body: ["Two or three short paragraphs."],
  norm: "More and more people already do this.",   // optional dynamic norm
  note: "The caveat, if the evidence has one.",     // optional
  todo: ["Three steps.", "Each one line.", "Each naming the replacement."],
  ask:  "Will you compost this week?",              // the question
  plan: "On Saturday I put a tub under the sink.",  // the if-then, shown once pledged
  pledge: "Compost",                                // omit to leave it off the pledge page
  proof: [{ claim: "...", source: "...", url: "..." }]
}
```

Keep bodies to about three short paragraphs and `todo` to three one-line items — past
that a page stops fitting a phone screen. `node /tmp/vv/check.js` prints the overflow
per page if you want to check.

## Why the content is built this way

- **Question, then commitment, then plan.** Asking a question nudges behaviour a little;
  an if-then plan ("when X, I will Y") is the part with a real effect size. Every action
  page ends on a question, and the pledge stores the plan and a start day.
- **Never name something to drop without naming its replacement.** The research on
  boycotts is blunt: they fail unless an easy substitute exists. That rule is why every
  `todo` names what to buy instead.
- **Threat plus a way out.** Doom on its own demobilises the people who are not already
  convinced, so no page states a problem without a concrete, easy next step.
- **Every number is checkable.** Each figure lives in a `proof` entry with its source;
  the sources page is generated from those entries, so a page and its citation cannot
  drift apart. Swipe up on any page to see them.
- **Contested numbers keep their caveat visible** — the 21x green pension figure, the
  observational grade of the ultra-processed food evidence, the failed replication of the
  dynamic-norm effect, and the fact that the EU state-aid cases against Starbucks, Amazon
  and Fiat were annulled while only Apple's was upheld.

## Pledges

Tapping **Yes, I am in** stores the page `id` in `localStorage` under `wctw:pledges`,
along with the start day chosen on the pledge page. The pledge page counts them back,
repeats each plan, and offers a share. Nothing is sent anywhere: no analytics, no
tracking, no network call in the whole site.
