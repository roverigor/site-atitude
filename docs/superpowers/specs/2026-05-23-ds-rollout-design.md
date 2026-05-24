# Design System Rollout — Polish para Layout + Páginas Restantes

**Date:** 2026-05-23
**Author:** Igor Rover (via aiox-master/Orion)
**Status:** Draft — pending user review
**Branch:** `chore/ds-rollout` (a ser criada from `main`)

---

## 1. Contexto

O site `atitudeensino.com.br` (Next.js 15.5 + React 19 + Tailwind 4 + Framer Motion) recebeu nos últimos meses um redesign completo do Design System Atitude, materializado em:

- `src/app/globals.css` @theme — paleta core (navy/lime/orange/magenta/violet/cream), 4 pilares (ensino/emprego/idiomas/tecnologia), categorias, font Poppins 18-weight self-hosted, semânticos
- `design-system-extract/preview/*.html` — 23 HTMLs canônicos (buttons, cards, inputs, pills, capsule-motif, motion, type-scale, colors-*)
- `src/components/home/*` + `src/app/cursos/**` — implementação viva validada do DS
- `src/components/ui/{Button,Badge,SearchInput,Lightbox,ThemeToggle}.tsx` — primitives DS já validados

Peças **ainda não auditadas/polidas** contra o DS:

| Categoria | Peças |
|---|---|
| Layout transversal | Header, Footer, MobileNav |
| Páginas wrapper finas | `/obrigado`, `/not-found` |
| Páginas de conteúdo | `/blog` (+ slug/tag/categoria), `/depoimentos`, `/formaturas` |
| Páginas grandes | `/sobre` (387 linhas), `/ingles` (290 linhas), `/parceiros` (303 linhas) |
| Página com state | `/contato` (form com validação) |

Achados de quick-audit:
- `src/app/ingles/page.tsx` usa hex hardcoded `#C2185B` e classes `bg-pink-50`/`bg-pink-950`
- `src/components/contact/ContactPage.tsx` usa `text-red-500`/`border-red-500` para erros

## 2. Objetivo

Garantir que **todas as peças listadas** aderem ao DS Atitude em 4 dimensões — type scale, spacing rhythm, color treatment, animações framer-motion — e que zero cor crua (hex ou Tailwind nativo) persista no código aplicacional.

## 3. Não-objetivos (Out of scope)

- Conteúdo/copy (texto institucional, blog posts, depoimentos)
- Renomear/mover arquivos
- Mexer em `globals.css` @theme tokens (source-of-truth)
- `src/data/*`, `content/blog/*`
- API routes (`src/app/api/lead/route.ts`)
- Componentes já em compliance (home/cursos/LPs) — exceto bug crítico
- SEO metadata (titles, descriptions, JsonLd)
- Performance optimization (lazy load, bundle splitting)
- i18n
- Novas features/páginas
- Vercel config / deploy

## 4. Arquitetura da Entrega

### 4.1 Estrutura de saída

```
docs/ds-audit/
  README.md                    # índice + ordem + status (todo/done)
  00-layout-header.md
  01-layout-footer.md
  02-layout-mobilenav.md
  03-page-obrigado.md
  04-page-notfound.md
  05-page-blog.md              # cobre BlogPage + slug + tag + categoria
  06-page-depoimentos.md       # cobre TestimonialsPage
  07-page-formaturas.md        # cobre GraduationsPage
  08-page-sobre.md
  09-page-ingles.md
  10-page-parceiros.md
  11-page-contato.md
```

12 audit docs total. Páginas `/depoimentos` + `/testimonials` consolidados em `06-page-depoimentos.md` (TestimonialsPage é o componente). Mesma lógica pra formaturas/graduations.

### 4.2 Ordem de execução

Decisão: **Layout primeiro** (afeta todas as páginas).

1. `00-layout-header.md`
2. `01-layout-footer.md`
3. `02-layout-mobilenav.md`
4. `03-page-obrigado.md` (wrapper fino, quick win)
5. `04-page-notfound.md` (wrapper fino, quick win)
6. `05-page-blog.md`
7. `06-page-depoimentos.md`
8. `07-page-formaturas.md`
9. `08-page-sobre.md`
10. `09-page-ingles.md`
11. `10-page-parceiros.md`
12. `11-page-contato.md` (form complex, último)

### 4.3 Branch + commit strategy

- Branch: `chore/ds-rollout` from `main`
- 1 fix RED = 1 commit (granular, preserva blame)
- Convention: `redesign(<scope>): <one-line>` ou `fix(<scope>): <one-line>` ou `chore(ds-audit): <doc-name>`
- Scopes: `layout-header`, `layout-footer`, `layout-mobilenav`, `page-sobre`, `page-ingles`, etc.
- PR único final → `main` com summary dos audits + screenshots

### 4.4 Audit doc template

Cada `docs/ds-audit/NN-name.md` segue:

```markdown
# Audit: <peça> (<path>)

## Snapshot
- **Path:** src/components/layout/Header.tsx
- **Linhas:** 142
- **Última edição:** <commit hash + date>
- **Estado geral:** GREEN | YELLOW | RED

## Reference Sources
- DS extract: design-system-extract/preview/{relevant}.html
- Vivo: src/components/home/Hero.tsx, src/app/cursos/page.tsx

## Findings (4 dimensões)

### 1. Type scale + hierarquia
- 🔴 H1 usa `text-[42px]` cru — trocar por `text-4xl md:text-5xl`
- 🟡 H2 com weight 600 mas DS pede 700 — ajustar
- 🟢 Body OK

### 2. Spacing + rhythm
- 🔴 Section sem `py-{16,20,24}` padrão
- 🟢 Container wrapper presente

### 3. Color treatment
- 🔴 `#C2185B` hardcoded → `var(--color-magenta-700)`
- 🔴 `bg-pink-50` → `bg-[var(--color-magenta-100)]`
- 🟡 Hover state cosmetic

### 4. Animações framer-motion
- 🟢 Entry fadeInUp presente
- 🟡 Hover transition sem `ease` definido

## Fix Plan
- Commit 1: replace #C2185B with token
- Commit 2: normalize section spacing
- Commit 3: harmonize H1 type scale

## Out of scope
- Copy ajustes
- Restructure de seção
```

**Severity:**
- 🟢 GREEN: ok, sem mudança
- 🟡 YELLOW: divergência cosmética, fix opcional
- 🔴 RED: violação DS, fix obrigatório

Apenas RED entram no fix plan. YELLOW listados pra registro.

## 5. Reference Hierarchy (resolução de conflitos)

1. `globals.css` @theme tokens — autoridade absoluta
2. `design-system-extract/preview/*.html` — referência visual canônica
3. `src/components/home/*` + `src/app/cursos/**` — implementação viva validada
4. `src/components/ui/*` — primitives validados
5. Páginas restantes — alvo, sem autoridade

**Regras de conflito:**
- Token DS vs hardcoded → token vence sempre
- Home vs DS extract → DS extract vence (extract é especificação)
- Páginas redesenhadas vs não-redesenhadas → home/cursos vencem
- Acessibilidade vs estética → a11y vence

## 6. Pilar → contexto mapping (decisão fixa)

| Página | Pilar/Cor primária |
|---|---|
| `/sobre` | navy (institucional) |
| `/contato` | orange (ação/calor) |
| `/cursos` (catalog) | multi-pilar conforme categoria |
| `/ingles` | magenta (pilar idiomas) |
| `/parceiros` | violet (pilar tecnologia/empregabilidade) |
| `/blog` | navy + accent por categoria |
| `/depoimentos`, `/formaturas`, `/graduations` | lime (pilar ensino) |
| `/obrigado`, `/not-found` | navy neutro |

## 7. Dark mode

`@custom-variant dark` ativo em `globals.css`. Audit inclui checar `dark:` variants onde tokens semânticos não cobrem.

## 8. A11y baseline (não-negociável)

- Contrast AA (WCAG 4.5:1 body, 3:1 large text)
- Focus ring visível em todos interactive
- `aria-label` em ícones-only buttons
- `prefers-reduced-motion` honored em framer animations

## 9. Pre-commit checks

Pra cada commit grande (3+ linhas tocadas):

- `npm run lint` — ESLint
- `npm run build` — type check + Next compile
- Visual smoke: `npm run dev` + abrir página tocada, screenshot pra PR description
- CodeRabbit `--prompt-only -t uncommitted`, self-heal max 2 iterações

## 10. Success Criteria (PR mergeável quando)

1. 12 audit docs em `docs/ds-audit/` com findings categorizados
2. Todos findings RED resolvidos via commit
3. Zero hex hardcoded em src/*.tsx fora de:
   - `src/components/seo/JsonLd.tsx` (structured data)
   - SVG `fill="#..."` inline em ícones decorativos (se houver)

   Check:
   ```
   grep -rEn '#[0-9a-fA-F]{3,6}' src/ --include='*.tsx' \
     | grep -vE '(JsonLd|fill="#|stroke="#)'
   ```
   deve retornar vazio.

4. Zero Tailwind cores cruas em src/*.tsx (paleta nativa do Tailwind, não DS):
   ```
   grep -rEn '(bg|text|border|from|to|via|ring|shadow)-(red|pink|blue|green|yellow|purple|gray|slate|zinc|neutral|stone|amber|lime|emerald|teal|cyan|sky|indigo|violet|fuchsia|rose)-[0-9]' src/ --include='*.tsx'
   ```
   deve retornar vazio. Cores DS usam `var(--color-*)` em arbitrary-value Tailwind (ex.: `bg-[var(--color-background)]`).
5. `npm run lint` passa sem warnings novos
6. `npm run build` passa sem errors
7. Páginas testadas manual no dev server, screenshots no PR description
8. CodeRabbit roda no diff, severity ≥ medium endereçada

## 11. Métricas de "alinhado"

- Type scale: classes Tailwind nomeadas (`text-sm`...`text-7xl`) + weights `font-{normal,medium,semibold,bold,extrabold,black}`. Sem `text-[42px]` arbitrário. Hero displays podem usar 6xl/7xl conforme DS extract `type-display.html`
- Spacing: só múltiplos de 4 (Tailwind default) — sem `p-[17px]`
- Color: só tokens `var(--color-*)` ou semânticos
- Motion: presets framer reutilizáveis (extrair pra `src/lib/motion.ts` se virar repetição em 3+ peças)

## 12. Estimativa

- 12 audit docs
- ~20-40 commits de fix (depende dos finds REDs)
- 1 PR final pra `main`

## 13. Rollback

Se um fix quebrar visual: `git revert <sha>` no mesmo commit. Não amend. Branch é descartável até merge.

## 14. Próximos passos

1. User revisa este spec
2. Approval → invocar `superpowers:writing-plans` pra gerar implementation plan detalhado
3. Implementation plan vira tasks executáveis sequenciais
