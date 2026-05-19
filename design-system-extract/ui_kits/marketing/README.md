# Atitude · Marketing UI Kit

Hi-fi recreation of a parent-facing marketing website for Atitude. Single-page React app, click-thru between three surfaces:

| Surface | Components |
|---|---|
| **Home** | `Nav` · `Hero` · `AgeTracks` · `Manifesto` · `Methodology` · `Testimonial` · `Footer` |
| **Course detail** (Educação Infantil) | `CoursePage` (with pillars grid) |
| **Contact** | `ContactForm` → `ContactSuccess` |

## Files
- `index.html` — entry, loads Babel + each JSX file
- `marketing.css` — page-level layout (tokens come from `colors_and_type.css`)
- `App.jsx` — router (page state)
- One `.jsx` per component

## Notes & caveats
- Imagery is **placeholder** — the course hero shows a labelled placeholder block, and the home hero uses the brand mark inside a navy capsule. Drop real photos in to replace.
- This is a **proposed structure**, not a recreation of an existing Atitude site. The official atitudeensino.com.br site was not reachable during build — see root `README.md`.
- Copy is in Brazilian Portuguese, sentence-case, second-person informal.
