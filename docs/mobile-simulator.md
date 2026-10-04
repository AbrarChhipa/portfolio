# Mobile App Simulator

Run Project Demo in the editor toolbar and Launch Mobile App in Run and Debug open the same Android-style phone overlay. The launcher showcases apps Abrar delivered or contributed to. Each icon opens its Google Play listing in a separate tab, leaving the portfolio and phone open.

This is a browser app showcase. The selected behavior requires no APKs or emulator hosting. Existing Projects browsing stays available through the Explorer and Explore Projects button.

## Implementation and decisions

- `src/data/mobileApps.ts` holds the typed `PortfolioApp` catalog in the user-supplied order. Heal uses the confirmed patient app, `com.heal247.patient`, in place of the original store search link.
- `WorkspaceContext` owns `simulatorOpen`, `openSimulator()` and `closeSimulator()`. Both Run buttons use these actions, and `App.tsx` mounts one `MobileSimulator`.
- The editor toolbar keeps Run outside the horizontal tab scroller and visible with no files open, including on mobile.
- The native modal dialog makes the IDE inert. Explicit Tab/Shift+Tab traversal cycles through its close button and app links, including on platforms that skip links in native keyboard traversal. Closing by button, Escape or backdrop restores focus to the original Run button. Both pointer press and release must occur on the backdrop; dragging out of the phone does not dismiss it.
- The phone is up to 780px tall, with its height capped to the viewport using `dvh`. Its launcher scrolls independently in landscape or short windows. Reduced motion disables entrance and icon transforms. IDE theme variables style the surrounding toolbar; the phone keeps a readable Android launcher palette.
- Native links use `target="_blank"` and `rel="noopener noreferrer"`. No remote store content is embedded or fetched during a portfolio visit.
- All nine logos are bundled locally. Missing or failed images render name initials while preserving the app name and link, as agreed with the owner. Failed-image state resets when the launcher is reopened.
- Structured events use levels `debug`, `info`, `warn` and `error`, gated by Vite's `import.meta.env.DEV`. Current events are `opened`, `closed`, `app_opened` and `icon_load_failed`. Data includes only event, level, scope and optional public package ID. Production logs are disabled.

## App and asset sources

Logos were retrieved on 2026-10-04 from the exact listing's `og:image` on Google's image CDN. Local files retain their original PNG/JPEG format; Google's CDN supplied 192px square variants. No generated or substitute brand artwork is used.

- [Uguide: Rajasthan](https://play.google.com/store/apps/details?id=com.uguideapp&hl=en_IN): `public/app-icons/uguide.jpg`
- [Fanith: Live Scores & Fan Chat](https://play.google.com/store/apps/details?id=com.fanithapp&hl=en_IN): `public/app-icons/fanith.png`
- [Heal 24/7 patient app](https://play.google.com/store/apps/details?id=com.heal247.patient&hl=en_IN): `public/app-icons/heal247.jpg`
- [Delyfy](https://play.google.com/store/apps/details?id=com.delyfy&hl=en_IN): `public/app-icons/delyfy.jpg`
- [BRPL POWER App](https://play.google.com/store/apps/details?id=com.bses.bsesapp&hl=en_IN): `public/app-icons/brpl.png`
- [BYPL Connect](https://play.google.com/store/apps/details?id=com.bses.bypl.prod&hl=en_IN): `public/app-icons/bypl.png`
- [G10 Digital Gold Saving](https://play.google.com/store/apps/details?id=com.goldsaving&hl=en_IN): `public/app-icons/g10-gold.jpg`
- [Zeppico](https://play.google.com/store/apps/details?id=com.zeppicocustomer&hl=en_IN): `public/app-icons/zeppico.png`
- [Supraa](https://play.google.com/store/apps/details?id=com.supraa&hl=en_IN): `public/app-icons/supraa.png`

## Maintaining the catalog

To add or update an app, confirm its exact package ID and listing, download the original logo into `public/app-icons/`, then update `MOBILE_APPS`. `iconSrc` is optional when the original asset is temporarily unavailable. Keep a readable short name for the phone label. Update the source list above and the independent expected listing list in the browser checks.

## Verification

Run `npm run build` for TypeScript and the production bundle. Install Chromium once with `npx playwright install chromium`, then run `npm run test:e2e`.

The headless suite uses desktop (1280×720), mobile (390×844), and landscape (844×390) viewports, plus a taller desktop screenshot (1280×960). It covers both launch buttons, all nine local logo loads and exact links, new-tab behavior, focus containment and restoration, all dismissal paths, reopening without duplicate phones, Run with every editor tab closed, failed-logo fallback, an alternate theme, and reduced motion.

Play Store navigation is intercepted only in tests so external services cannot make checks flaky. Actual catalog images are loaded from the local server. Screenshots and failure traces are saved under ignored `test-results/`.
