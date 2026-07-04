# Dhruv Ladani — Portfolio

Personal portfolio with an Iron Man / Stark Industries design system: arc-reactor
blue as the structural accent, Stark red for primary CTAs, and gold for highlights.
Four pages — **Home / Work / About / Contact** — each with its own themed,
canvas-animated background.

## Features

### Signature interactions
- **Boot sequence** — arc-reactor spinner with a live progress bar
  ("Initializing Arc Reactor") that fades out into the hero reveal
- **Canvas arc reactor** — hero visual with rotating tick ring, copper coil
  windings, inward-spiralling energy particles, and a breathing triangular core
- **HUD cursor** — custom dot + lerped ring that flares red over interactive
  elements (fine pointers only)
- **Count-up stats**, magnetic buttons, scroll reveals, scan lines, and
  floating HUD chips

### Per-page animated backgrounds (2D canvas, no WebGL)
| Page | Background |
|---|---|
| Home | J.A.R.V.I.S. HUD — reticles, radar sweep, target locks, telemetry readouts |
| Work | Holographic workshop — perspective holo floor, wireframe schematics, the IM2 "new element" atom |
| About | Repulsor energy field — nebula glows, particle energy web, repulsor streaks, vitals monitor |
| Contact | Open comms channel — waveforms, sonar pings with caller IDs, scan band |

Backgrounds crossfade on route change and hide their densest elements on
mobile. Plenty of Iron Man easter eggs are scattered throughout — keep an eye
on the readouts.

### Accessibility & performance
- All motion respects `prefers-reduced-motion` (animations freeze to a static frame)
- Backgrounds are lightweight 2D canvases (the previous three.js scene was
  removed, cutting the main bundle from ~1.1 MB to ~320 kB)
- Custom cursor auto-disables on touch/coarse pointers

## Pages

- **Home** — hero with arc reactor, capabilities, featured work, CTA
- **Work** — all projects with detail views
- **About** — journey timeline, skills, experience, interactive Iron Man AI avatar
- **Contact** — contact methods, resumes, message form

## Tech Stack

- React 18 + Vite
- React Router
- Tailwind CSS
- Framer Motion
- HTML5 Canvas (backgrounds, arc reactor, cursor)
- React Icons

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Build for production: `npm run build`

## Deployment

Deployed on Netlify; the build is automated through the `netlify.toml`
configuration. Design-concept reference files (`public/concept.html`,
`public/DESIGN-NOTES.md`) are git-ignored and never ship.

## License

This project is open source and available under the [MIT License](LICENSE).
