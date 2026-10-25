# Shaavi Healthcare — Website

Next.js 16 (App Router, TypeScript, CSS Modules) build of the Figma file
**Enhancement Tracker – September 2026**:

| Page                 | Route               | Figma node |
| -------------------- | ------------------- | ---------- |
| Home                 | `/`                 | `168:1636` |
| About                | `/about`            | `191:4299` |
| FAQ                  | `/faq`              | `191:7386` |
| Terms and Conditions | `/terms-of-service` | `191:6687` |
| Cookie Policy        | `/cookie-policy`    | `191:6912` |
| Privacy Policy       | `/privacy-policy`   | `191:7094` |

and of the Figma file **Website**:

| Page                 | Route               | Figma node |
| -------------------- | ------------------- | ---------- |
| All Tests            | `/tests`            | `120:3741` |
| A test's page        | `/tests/<slug>`     | `120:4196` |
| Profiles             | `/profiles`         | `120:4535` |
| A profile's page     | `/profiles/<slug>`  | `120:4966` |
| Contact Us           | `/contact`          | `120:6922` |

At 1440px every page matches its Figma frame pixel for pixel. Tablet and mobile
layouts are adaptations, because the Figma file only contains desktop frames.

The home, About, All Tests and Profiles pages add a scroll-driven animation layer (GSAP +
Three.js) on top of the design; see [Page motion](#page-motion).

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Project structure

```
emails/                 EJS email templates (see Emails)
public/
  emails/               the emails' images (PNG; email clients can't show SVG)
  icons/                SVG icons (social/ holds the footer icons)
  images/
    home/, about/, faq/ page-specific photos
    categories/, profiles/, tests/   catalogue photos, reusable on any page
    avatars/, decor/    shared artwork (decor/intro-glow.svg sits behind the FAQ and legal intros)
src/
  app/
    layout.tsx          root layout: fonts, global styles, default metadata, and the
                        header and footer every page shares (the 404 page included)
    not-found.tsx       404 page
    (site)/             route group for the public website
      page.tsx          /            Home
      about/page.tsx    /about       About
      faq/page.tsx      /faq         FAQ
      terms-of-service/, cookie-policy/, privacy-policy/   legal pages
      tests/page.tsx    /tests       All Tests
      tests/[slug]/     /tests/<slug>   one page per test, all built ahead of time
      profiles/page.tsx /profiles    Profiles
      profiles/[slug]/  /profiles/<slug>   one page per profile, all built ahead of time
      contact/page.tsx  /contact     Contact Us
  components/
    experience/         home and About page motion layer (see below)
    layout/             Header (with mobile menu), Footer
    ui/                 Button, Pill, Icon, Logo, SearchBar, Select, BackLink, CheckList,
                        InfoCard, AccordionItem, DetailsTable, TextField, PhoneField,
                        Checkbox, …
    cards/              CategoryCard, StepCard, ProfileCard, TestCard, CatalogCard, …
    sections/
      shared/           PageIntro, CallToAction, ShowcaseSection, NoticeSection
      home/             Hero, HowItWorks, PopularProfiles, AboutPreview, FrequentlyBookedTests
      about/            AboutHero, LeadershipStatement, DirectorProfile, OurLaboratory, OurCommitment
      faq/              FaqList, MedicalNotice
      legal/            LegalDocument (renders any document from content/legal/)
      tests/            CatalogIntro, TestCatalog (filters + grid), TestDetail, SampleJourney,
                        IncludedTests, RelatedSections — each serves tests and profiles
      contact/          ContactSection (heading, details), ContactForm
  config/
    routes.ts           every page URL — link with routes.about, never "/about"
    navigation.ts       header menu, footer quick links, legal links
    site.ts             company name, contact details, social links
  content/
    home.ts, about.ts, faq.ts, contact.ts   page copy, prices and lists — edit text here
    legal/              terms-of-service.ts, cookie-policy.ts, privacy-policy.ts
                        (types.ts describes their shape)
    tests/              tests.ts and profiles.ts (the price booklet's tests and profiles),
                        catalogue.ts (lookups, test counts, search text), filters.ts
                        (category chips, price ranges), types.ts
  constants/
    icons.ts            icon registry (used by <Icon name="…" />)
    images.ts           image registry
  lib/
    cx.ts, price.ts     class names, "£45.00" prices
    urlState.ts         the query string as state for static pages (the listings' filters)
    contact.ts          sendContactMessage: where the Contact Us form delivers messages
```

## Adding a new page

1. Add its URL to `src/config/routes.ts` (and to `navigation.ts` if it belongs in
   the menu). The pages already listed there have placeholder routes.
2. Create (or replace the placeholder in) `src/app/(site)/<page>/page.tsx` and export
   `metadata` with its title.
3. Put the page's copy in `src/content/<page>.ts` and its sections in
   `src/components/sections/<page>/`. Anything used by more than one page goes in
   `sections/shared/`, `cards/` or `ui/`.
4. Set the gaps between sections in the page's `page.module.css`, as the Home and
   About pages do. Sections don't set their own outer margins.

The header highlights the menu item for the current page, including sub-pages
(e.g. `/tests/albumin` highlights "All Tests").

## Page motion

The home, About, All Tests and Profiles pages wrap their sections in
`ScrollExperience page="…"`, which layers scroll animations (GSAP ScrollTrigger) and a 3D
backdrop (Three.js) on the unchanged design. On the home page the 3D layer stays off the
hero, which shows only the design's own floating cell renders as in Figma; it fades in
under the hero's bottom edge and fills the sections below (`clearHero` in
`scene/composition.ts`). Without JavaScript, with reduced motion, or before the libraries
load, each page is exactly the static design. The two listings share
`page="catalog"`: the camera's ease past the intro and the closing call to action's halo;
their cards animate themselves as they load (see [Tests and profiles](#tests-and-profiles)),
and the triggers re-measure whenever more cards push the page longer.

```
src/components/experience/
  ScrollExperience/     client wrapper: renders <main>, loads the motion layer
  LaboratoryCanvas/     loads the 3D scene when the browser is idle (capable devices only)
  pages.ts              the pages that have the experience
  quality.ts            device tiers: cell/particle counts, resolution, frame cap
  sceneState.ts         values the scroll timeline writes and the scene reads each frame
  motion/               one GSAP module per section; index.ts lists each page's
    sceneTimeline.ts      scroll → camera (a slow pan through home's About / the
                          directors), step object, closing halo
    heroMotion.ts         drift of the hero's cell renders and portraits
    counter.ts            numbers counting up once (stats, badges)
    processAnimation.ts   How It Works: step reveals + connecting line
    cardRowMotion.ts      Popular Test Profiles / Frequently Booked Tests reveals
    aboutMotion.ts        home's About preview: photo parallax, copy, counting stats
    statementMotion.ts    About: statement and highlights reveal
    directorMotion.ts     About: portrait rise, head emerging above the frame, bio
    laboratoryMotion.ts   About: photo reveal and drift, quote and copy
    commitmentMotion.ts   About: dark panel and its copy
    ctaMotion.ts          final call to action: reveal, cells drifting in, button pulse
  scene/                Three.js (procedural geometry, custom shaders, no textures)
    LaboratoryScene.ts    renderer, camera, frame loop, resize, disposal
    FloatingCells.ts      instanced cells and red blood cells
    MedicalParticles.ts   sample particles (one draw call)
    ProcessObjects.ts     test tube → calendar → sample drop → report
    composition.ts        where cells rest on each page (free areas of the 1440px
                          frame, remapped)
    materials.ts          shaders and the colour palette
```

- **Hooks**: animated elements carry `data-motion="…"` attributes (no class or layout
  changes). Shared components such as `CallToAction` animate on every page with the
  experience and keep their hooks inertly elsewhere.
- **The design is the resting state**: reveals animate only opacity and transforms and
  clear their inline styles when done; parallax elements sit exactly in their design
  positions when their section is centred on screen; the hero's cell renders float a few
  pixels around theirs. These reveals never hide content that is already on screen.
- **Layering**: `<main>` is its own layer with the white page background. The canvas
  sits between the section glows and the content, never takes clicks
  (`pointer-events: none`) and is hidden from assistive technology. On these pages the
  white section backgrounds are transparent and the light-blue 6% tints are painted
  solid (tint over white), which looks identical but stops the 3D layer showing
  through behind text.
- **Performance**: Three.js (~148 KB gzipped) and GSAP (~47 KB) load lazily and add
  ~1.4 KB to each page's initial JavaScript. The scene is a few draw calls of
  procedural geometry with animation in the shaders; it pauses when off screen or in a
  background tab, caps the frame rate on low-end devices, lowers its resolution if
  frames run slow and frees everything (including the WebGL context) when you leave.
  Tiers in `quality.ts`: full on desktop, reduced on tablets and weaker machines, a light
  scene without the step object on phones; none with reduced motion, data saver or no
  WebGL.
- **Accessibility**: `prefers-reduced-motion` removes the 3D layer, parallax, counting
  and the button pulse, leaving short fades. Counting numbers keep the final value in a
  visually hidden copy for screen readers. All content lives in the HTML.

### Entrances (every page)

Every page builds up layer by layer as it opens, and further down as you scroll: its
blocks arrive one after another, top to bottom and left to right, each from its own
side, as on daivtech.com. A block opts in with `data-reveal` (type `Reveal` in
`src/lib/reveal.ts`):

| `data-reveal` | Arrives | Used for |
| --- | --- | --- |
| `top` | slides down 40px | the tag above a page's title |
| `left`, `right` | slides in 56px from that side | titles (left), intro text (right), photos and columns from their own side |
| `bottom` | rises 40px | searches, buttons, text, key details, FAQ questions, legal sections |
| `zoom` | rises 24px while growing from 94% | catalogue cards |
| `fade` | fades only | About's intro, which the 3D scene measures |

The shared sections already carry theirs (page intros, section headers, a test's page,
Contact, FAQ, the legal pages, 404). Components that can reveal take `data-reveal` as a
prop (`Pill`, `SearchBar`, `InfoCard`, `CheckList`, `BackLink`, `DetailsTable`,
`SampleJourney`, `ContactForm`, the cards); `Button` and `PhotoFrame` pass it through.

- `RevealObserver` (in the root layout) watches the whole document, so new pages and
  cards loaded later are picked up by themselves. Blocks that come into view together
  start 80ms apart (closer when there are many: the last starts within 0.96s) and take
  0.8s. Styles are at the end of `globals.css`.
- Blocks already scrolled past (Back restores a page's scroll position) are simply
  there. A row of cards that scrolls sideways (`data-reveal-group`) arrives together, so
  the cards past the screen's edge are in place when swiped to.
- Parts the scroll animations above already animate (home's card rows, About's sections,
  the call to action) have no `data-reveal`: give a block one or the other.
- Only opacity, `translate` and `scale` animate, so nothing reflows and the design is
  the resting state. `<main>` clips sideways overflow, so a block sliding in never makes
  a phone's page wider.
- Without JavaScript nothing is hidden; if the scripts fail to load, everything appears
  after 3s; with reduced motion blocks only fade; printing shows everything. On a full
  reload the entrances start once the page's scripts run, which takes noticeably longer
  in development (`next dev`) than in production.

## Tests and profiles

All Tests and every test's page come from `src/content/tests/tests.ts`, the 70 single
tests of the SHAAVI B2C Price Booklet; Profiles and every profile's page from
`profiles.ts`, its 27 profiles. Both keep the booklet's order. To add one, add an entry
there (its `slug` becomes `/tests/<slug>` or `/profiles/<slug>`) and list it in others'
`related`.

- **Filters**: the category chips, the search field, "Sort By" and "Filter By" keep their
  values in the URL (`?category=`, `?q=`, `?sort=`, `?price=`), so they survive a
  reload, coming back from a page and sharing a link. Both menus' options are in
  `filters.ts`; the price ranges suit each listing (single tests cost £15–£90). The home
  page's search submits to `/tests?q=…`. "Sort By" is not in the Figma file; it sits
  beside "Filter By" in the same style.
- **Loading**: everything is filtered in the browser, so results are instant; a new
  search, filter or sort still shows placeholder cards for a moment (restarted by each
  keystroke) and then the results rise in. Cards come eight at a time: nearing the end
  of the grid shows a row of placeholders, then the next eight, which zoom in as they
  scroll into view (like the first eight, which the page's HTML holds). Every test and
  profile also has its own page.
- **A profile's tests**: "Including … Tests" counts every test a profile covers; a panel
  (General Biochemistry's six) or another profile in its list (Thyroid Profile in
  Wellman) counts by the tests it holds. Under the description, the grid shows the list
  as the booklet gives it, and a panel or profile in it names its tests on a second
  line (not in the Figma file, whose example has none). The Profiles search finds a
  profile by any test in it.
- **Related**: a test's page shows the booklet's related tests ("Other Tests You May
  Need") and then its related profiles ("Related Profiles", as profile cards). A
  profile's page shows "Other Profiles You May Need" and, for Hepatitis and the two STI
  profiles, the single tests the booklet suggests ("Related Tests").
- **Not in the price booklet**, so filled in for now:
  - Report times: the design's "48 hours" everywhere (`DEFAULT_REPORT_DELIVERY`; an
    entry can set its own `reportDelivery`).
  - Sample: profiles show the booklet's tubes ("1 SST"). Single tests show "Blood" where
    the booklet calls them blood tests; the four STI PCR tests show none, and their
    sample journey reads "Provide your sample".
  - Categories, chosen to suit the design's chips: biochemistry, blood counts, vitamins
    and thyroid tests are General Wellness; reproductive hormones are Women's or Men's
    Health and Fertility; tumour markers follow the two Cancer Marker profiles. Nothing is
    an allergy test yet, so the "Allergy" chip shows an empty state. Three categories
    have no chip in the design, so their entries show under "All" (a link to one, e.g.
    `/tests?category=hormones`, adds its chip while it is chosen): "Sexual Health"
    (hepatitis, HIV, syphilis and STI tests and profiles), "Hormones" (hormone tests and
    profiles, for the home page's Hormones card) and "Cancer Markers".
- **Photos** come from the Figma file ("Enhancement Tracker - September 2026": the
  sections "Profile 1-35" and "Test 36-70" for tests, "Images" for profiles), one per
  entry, as `public/images/tests/<slug>.jpg` and `public/images/profiles/<slug>.jpg`.
  `catalogueImage` in `src/constants/images.ts` finds each by its slug, so a new entry
  needs only its file, and replacing a photo means replacing that file. Figma has none
  for HbA1c, General SH Profile, Extended Wellman, Extended Wellwoman or Prostate; they
  use the nearest match (the "A1C" picture filed under Lipid Profile, General
  Biochemistry's spare lab photo, Wellman's and Wellwoman's second pictures, Free PSA's
  prostate illustration).
- **Key details** on a page show only what an entry has: report delivery, sample and
  category today. Preparation, storage condition and unit volume (in the design) appear
  as soon as an entry has `preparation`, `storage` or `volume`. Likewise an
  `originalPrice` shows struck through, as the design does.
- **Short names**: where the booklet's "Included tests" for a single test differs from
  its name (TSH, PSA, HbA1c…), it is kept as `shortName`. The design has no place for it,
  but the search finds it.
- **The profile frames** are spaced a little differently from the test frames: on a
  profile's page 20px under the name (24 on a test's), a SemiBold price, 24px description
  lines and a 247px photo card; on Profiles the tag, title and search sit 34px apart and
  the grid and call to action closer. Each page follows its own frame.
- Names are as the booklet gives them, including a few worth checking: "Sex Hormone
  Binding Hormone" in both PCOS profiles (elsewhere "…Globulin"), "Creatinine Kinase",
  "CA-153"/"CA-199" in the cancer marker profiles but "C153", "C125" and "C-199" as single
  tests, and "Anemia Profile".
- **Home page cards**: "Popular Test Profiles" and "Frequently Booked Tests" show booklet
  entries (`popularProfiles` and `frequentlyBookedTests` in `src/content/home.ts`, by
  slug), so each card's name, price and test count match the page it opens; they keep
  the design's photos where those show the same thing. Two of the design's items aren't
  in the booklet and were replaced: Alcohol Profile by General Biochemistry and Malarial
  Antigen PCR by the Vitamin D test (with their catalogue photos; the design's photos
  are still in `public/images/`). A wrong slug fails the build.
- **Page changes** animate as on daivtech.com: each page is wrapped in `PageTransition`
  (React's `<ViewTransition>`, which Next plays on every link navigation), so the old
  page goes at once and the new one fades in as it rises 30px (0.4s, ease-out) while
  the header stays put (styles at the end of `globals.css`; with reduced motion it only
  fades). Its blocks then arrive layer by layer (see
  [Entrances](#entrances-every-page)). The
  browser's Back and Forward swap pages instantly, keeping scroll positions, and
  browsers without view transitions swap every page that way. After a header or
  footer link, focus moves to the new page's content (`RouteFocus`), as on a fresh load.
- **Back arrows** (All Tests, Profiles and every test's and profile's page) work like the
  browser's Back button: they return to the previous page, with its scroll position and
  filters, when that page is on this site. A page opened directly or from another site
  goes to the listing instead (All Tests and Profiles go home).
- **Cards link to their page** from the photo and the name as well as "View Details"
  (or a test card's arrow). The photo's link is left out of the tab order and hidden
  from screen readers, which get the name and the button. On the home page, a
  "Frequently Booked Tests" card opens its page from anywhere on it (`TestCard`'s
  `linked`: the name's link is stretched over the card).

## Emails

Two EJS templates for the Contact Us form, in `emails/`. Nothing sends them yet: email
is set up later (see `sendContactMessage` in `src/lib/contact.ts`).

| Template                   | Sent to                  | Design                                      |
| -------------------------- | ------------------------ | ------------------------------------------- |
| `contact-notification.ejs` | the Shaavi team          | Figma "Website" › Email Template `128:3256` |
| `contact-confirmation.ejs` | the visitor (thank-you)  | the same design, with its own copy          |

Both take the same data (`emails/samples/contact.json` is an example):

- `contact`: the form's fields, as `sendContactMessage` receives them (`firstName`,
  `surname`, `email`, `age`, `phone` with its dialling code, `message`, `whatsapp`).
  Age, mobile and the WhatsApp line only appear when given; without a mobile number the
  notification drops its WhatsApp and call buttons.
- `reference` (e.g. `SHC-20260917-0047`) and `submittedAt` (e.g. `17 Sep 2026, 09:42 AM`),
  made by whatever sends the email.
- `assetsUrl`: the absolute URL `public/emails` is served from (e.g.
  `https://www.shaavihealthcare.com/emails`), as emails can't use relative paths;
  `siteUrl`: the website.
- Optional: `company` (`{ email, phone, address }`, the footer's details) and `year`.

Everything the visitor typed is escaped. The shared parts (head, header, panels,
buttons, footer) are in `emails/partials/`.

- **Layout**: the 600px design at desktop and tablet widths (within 1px of Figma).
  On phones (620px and under) the date goes under the title, the photo under the
  details, buttons stack full width and the footer's details go one per line. The
  side-by-side parts are inline blocks, so they wrap even in apps that drop the
  `<style>` block. Outlook on Windows gets tables instead: square button corners and
  the panel's plain colour instead of its glow image.
- **Preview** with `npm run dev` running (it serves the images):
  `npx --yes ejs@3 emails/contact-notification.ejs -f emails/samples/contact.json -o /tmp/notification.html`,
  then open the file (or `contact-confirmation.ejs`).
- **Not in the Figma file**: the notification's WhatsApp row (worded as in the
  alternative frame `127:2053`) and all of the thank-you email's copy.

## Notes

- **Development**: Next preloads the 404 page's styles on every page without applying
  them, and Turbopack's hot reload can only swap applied stylesheets. That is why the
  header and footer sit in the root layout rather than the `(site)` group: the 404
  page then adds only `NoticeSection`'s styles. Editing `NoticeSection.module.css` in
  `next dev` still logs "No link element found for chunk …" (the change applies; reload
  the page to clear it). Any other style edit reloads cleanly.
- **Contact Us form**: nothing is sent yet. On "Send Message" the fields are checked in
  the browser (first name, email and message are required; age and mobile number are
  checked when given; "Also send to WhatsApp" needs a number), the first one to fix
  gets focus, and a valid message shows a confirmation. Every message goes through
  `sendContactMessage` in `src/lib/contact.ts`, which only logs it in development:
  connect email there (e.g. post to a route handler that sends it) before going live.
  Errors and the confirmation are not in the Figma file. The design's dialling code is
  India's (+91); the form starts on the UK's (+44), with India as the other option
  (`dialCodes` in `src/content/contact.ts`; add a flag in `public/images/flags/`).
- **FAQ** questions are native `<details>` elements, so they open and close without
  JavaScript and work with keyboards and screen readers. Only the first starts open
  (the Figma frame shows them all open).
- **Legal pages** share one renderer: `LegalDocument` lays out a document from
  `src/content/legal/` (numbered sections of paragraphs, bulleted lists, small headings
  and details tables). A new policy needs only a content file in that shape and a page
  like `privacy-policy/page.tsx`. Text keeps the design's line breaks (`\n`), leading
  spaces and non-breaking spaces (`\u00a0`). The non-breaking spaces decide where desktop
  lines wrap, as in Figma; on phones those word groups may wrap so nothing overflows.
- **Design tokens** (Figma variables such as `Blues/Primary`, `Greys/Heading`) are
  CSS custom properties in `src/app/globals.css`.
- **Text trimming**: Figma's "vertical trim" is reproduced with `text-box: trim-both cap alphabetic`
  (with a font-metric fallback for browsers that lack it). Text never takes margins;
  spacing comes from `gap`/`padding`, exactly like Figma auto layout.
- **Breakpoints**: 1339px, 1199px, 1023px (tablet; menu button), 767px and 639px
  (mobile), plus a few for single components (the About highlights stack below 900px;
  the How It Works steps tighten below 360px). Nothing in them applies at 1440px.
- **Touch screens** (`pointer: coarse`): form fields use 16px text, since iOS zooms the
  page in on anything smaller (the sort, filter and dialling-code menus are invisible
  native selects at 16px under their labels). Links that are a single line of trimmed
  text get a larger hit area from the `tap-area` class in `globals.css`, which reaches
  into the space around them without moving anything (`--tap-y` / `--tap-x` set how far).
- **Footer**: the body is a flex column, so on a page shorter than the screen (Contact
  or the 404 page on a large monitor) the footer sits at the bottom.
- **Photos** (`PhotoFrame`, next/image) take a `sizes` matching how wide they are drawn
  at each breakpoint, `object-fit: cover` included, so tablets and phones get sharp
  images without downloading desktop-sized ones.
- **Category cards** (home hero) open on hover or keyboard focus, which is not in the
  Figma file: the caption rises over the photo in a tinted blur, showing how many tests
  the category holds, its lowest price and a "View Tests" pill (copy in
  `categoryReveal`, `src/content/home.ts`; counts and prices come from the catalogue).
  Each card opens its category on All Tests; a category with no tests yet (Allergy)
  offers "Contact Us" and links to the contact page. Touch screens keep the design's
  card, and with reduced motion the card opens without animating.
- The home page's "Download Report" still points to `#` until that page exists.
- Copy is kept exactly as in Figma, including a few slips worth fixing in
  `src/content/`: "convinient" and a double space on the home page; on the About page
  Shivani's biography repeats Vishnu's, and the "Our Laboratory" tag reads
  "Laboratory Director". The About header in Figma also lists "About" twice; the site
  shows "Home" first, as on the home page. On the FAQ page the title reads "Frequency
  Asked Questions"; questions 10 and 25 repeat the wording of 9 and 24 (their answers
  are about turnaround times and the NHS); answer 21 repeats answer 20; and one line of
  the medical notice stops at "…qualified healthcare pr". On the Privacy Policy, section
  9 (Data Security) opens with section 8's paragraph on international transfers, section
  13's heading ends with a stray "d the Information Commissioner’s Office", and the ICO
  registration number is still "To be inserted / confirmed". In the Cookie Policy,
  "Functional Cookies" is bold where the other cookie types are semibold.
- The legal pages give contact details (info@shaavihealthcare.com, +44 20 3876 0187, a
  Hayes address) that differ from the footer's (hello@shaavihealthcare.com,
  +44 1234567890, a Kensington address), and Contact Us has a third set
  (info@shaavihealthcare.com, +44 1234 567890, Hayes). Each follows its Figma frame;
  update `src/config/site.ts` and `src/content/contact.ts` once the correct details are
  confirmed.
- The footer's "Terms of Service" link opens the Terms and Conditions page.
