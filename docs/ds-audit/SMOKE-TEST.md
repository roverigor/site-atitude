# Visual Smoke Test Checklist

To be performed manually OR via Playwright before merging chore/ds-rollout to main.

## How to run

```bash
npm run dev
```

Open each route in browser (1440x900 viewport recommended). Take light + dark mode screenshots. Visual regression checks:
- Fonts load (Poppins everywhere, Caveat where used)
- No layout shift on hydration
- Dark mode toggles cleanly (no flash of unstyled content)
- All gradients render with DS magenta/violet/etc. (no flat color fallback)
- All icons visible (no missing `aria-hidden` confusion)

## Routes to test

- [ ] `/` — homepage (control, should look identical to pre-rollout)
- [ ] `/sobre`
- [ ] `/contato`
- [ ] `/blog`
- [ ] `/blog/<existing-slug>` — any post
- [ ] `/blog/tag/<existing-tag>`
- [ ] `/blog/categoria/<existing-categoria>`
- [ ] `/depoimentos`
- [ ] `/formaturas`
- [ ] `/ingles`
- [ ] `/parceiros`
- [ ] `/cursos` (control)
- [ ] `/cursos/<existing-slug>` (control)
- [ ] `/obrigado`
- [ ] `/this-route-does-not-exist` (triggers 404)

## Sign-off

After visual verification, add screenshots to `docs/ds-audit/screenshots/` and check the boxes above.
