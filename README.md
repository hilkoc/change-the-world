# We change the world!

A mobile-first, swipeable static site that argues one thing: a committed quarter of any
group flips what that group treats as normal, so the actions worth taking are the ones
that only work when many people take them together. Thirty-eight pages in nine chapters,
ending in a pledge the reader picks and dates themselves. A feedback page sits to the
left of the landing page, so the deck can be argued back at.

Pages earn their place by that test. A habit that helps only the person doing it —
a shorter shower, a cloth napkin — is off the deck, however virtuous. What is on it:
refusals with a named replacement (beef, the haul, the betting app, the bank that funds
coal), and the two numbers that say how many of us are needed (25% to flip a norm, 3.5%
to win a campaign).

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

## Setup

Two third-party services, both free and both keyed by a value that has to be filled in
once. Until they are, the site still works: the visitor count stays hidden and the
feedback form reports that it could not send.

| Where | Placeholder | What to put there |
| --- | --- | --- |
| `app.js`, `GOAT_CODE` | `YOURCODE` | The [GoatCounter](https://www.goatcounter.com) site code, i.e. the `MYCODE` in `MYCODE.goatcounter.com` |
| `index.html`, `count.js` snippet | `YOURCODE` | The same site code |
| `app.js`, `WEB3FORMS_KEY` | `YOUR-ACCESS-KEY` | The [Web3Forms](https://web3forms.com) access key mailed to the form's delivery address |

In GoatCounter, turn on **Settings → Allow adding visitor counts on your website**. It
is off by default and without it the `/counter/` endpoint returns nothing, so the number
never appears.

The counter is per page: `app.js` asks for `location.pathname`, not the account total, so
a second site under the same GoatCounter code keeps its own separate number.

The Web3Forms access key is public by design — it is in the client JavaScript and only
lets a browser post into that one inbox. The delivery address itself is never in the
page source.

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
| Swipe right from the landing page | The feedback page, which sits to its left |
| `#hash` in the URL | Deep link, e.g. `#beef`, `#rosa`, `#sources`, `#feedback` |
| Browser back / forward | Moves through visited pages |
| Trackpad horizontal scroll, shift + wheel | Next / previous |

The vertical gestures are edge-gated so they never fight scrolling: swipe up only opens
the sheet once the page is scrolled to its bottom, swipe down only changes chapter from
the top of the page, and a downward drag inside an open sheet scrolls it until the sheet
is already at its top. A drag that starts inside a form field belongs to the field, so
typing and selecting text on the feedback page never moves the deck.

The feedback page is `PAGES[0]` and the hero is `PAGES[1]`. A URL without a hash still
opens the hero: `indexFromHash()` falls back to the first page of `kind: "hero"`, not to
index 0.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | Shell: top bar, visitor count, chapter rail, deck, controls, proof sheet, contents menu |
| `pages.js` | `CHAPTERS` and `PAGES` — all content. Edit this to change the argument |
| `app.js` | Deck logic: gestures, chapters, proof sheet, hash routing, pledges, feedback form |
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
  kind: "action",             // feedback | hero | idea | action | pledge | sources
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
  todoTitle: "Stop these",                          // optional, "Do this" otherwise
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
- **Only collective actions.** The test for a page is whether it changes anything when
  a quarter of a group does it. That is why `shower`, `napkins` and `packaging` were cut.
- **Contested numbers keep their caveat visible** — the observational grade of the
  ultra-processed food evidence, the failed replication of the dynamic-norm effect, the
  cross-sectional design behind the bedroom-phone odds ratios, the age of the Facebook
  rollout study, the contested evidence on school phone bans, and Chenoweth's own warning
  that 3.5% is a rule of thumb rather than a law.
- **One lever per page.** `rainforest` is about beef and the soy that feeds it, and stops
  there. Palm oil is deliberately absent: the evidence on boycotting it is contested, and
  a hedged paragraph would have cost the page the only thing it has, which is one clear
  refusal with one clear replacement.

## Pledges

Tapping **Yes, I am in** stores the page `id` in `localStorage` under `wctw:pledges`,
along with the start day chosen on the pledge page. The pledge page counts them back,
repeats each plan, and offers a share. The pledges themselves never leave the browser.

A yes also fires one anonymous GoatCounter event at `/pledge/<id>`, and the page reads
that path's count back from the same public counter endpoint the visitor count uses,
showing "N people are already in" under the button. It is fetched when the reader
reaches the page, not for all pages at load, and cached per session. If the counter is
blocked or fails, the line stays hidden and nothing else changes.

## What the site sends where

Three calls, nothing else:

- **GoatCounter** counts one pageview per load, from the `count.js` snippet in
  `index.html`. No cookies, no cross-site identifier. The feedback page then reads back
  this page's own count from `/counter/<path>.json` and shows it top right; if that request
  fails the number stays hidden and nothing else changes.
- **GoatCounter again, on a yes.** One event per new pledge at `/pledge/<id>`, with the
  pledge label as its title. Un-pledging sends nothing. Turning a pledge into a number
  other readers can see is the point: this deck's whole argument is that people move when
  they can see other people moving.
- **Web3Forms** receives the feedback form, and only when the reader presses send. It is
  a `fetch` POST of JSON to `https://api.web3forms.com/submit`, so the reader stays on
  the page and gets a "Thanks, message sent." line instead of the provider's own page. A
  hidden `botcheck` honeypot field goes with it; bots fill it, people never see it.
