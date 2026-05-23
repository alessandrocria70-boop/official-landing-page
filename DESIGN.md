# DESIGN.md — Official Brasil × Gabucria
## Design System Tokens (Google Stitch Format)

---

## Color Palette

### Primary
| Token               | Value                          | Usage                        |
|---------------------|--------------------------------|------------------------------|
| `--bg-main`         | `#030303`                      | Page background              |
| `--bg-card`         | `#090a0f`                      | Card surfaces                |
| `--bg-card-hover`   | `#12141c`                      | Card hover state             |
| `--bg-nav`          | `rgba(3, 3, 3, 0.7)`          | Navbar backdrop              |
| `--border-color`    | `#1a1e29`                      | Default borders              |
| `--border-hover`    | `#2e354a`                      | Hover borders                |

### Text
| Token               | Value       | Usage                |
|---------------------|-------------|----------------------|
| `--text-primary`    | `#f8fafc`   | Headings, body text  |
| `--text-secondary`  | `#94a3b8`   | Descriptions, labels |

### Accent
| Token               | Value                          | Usage               |
|---------------------|--------------------------------|----------------------|
| `--color-blue`      | `#0077ff`                      | CTAs, links, active  |
| `--color-blue-hover`| `#005fcc`                      | Hover state          |
| `--color-blue-glow` | `rgba(0, 119, 255, 0.15)`     | Glow effects         |
| `--color-green`     | `#10b981`                      | Positive metrics     |
| `--color-warning`   | `#f59e0b`                      | Warning badges       |
| `--color-red`       | `#ff3e3e`                      | Gabucria brand       |

---

## Typography

| Role        | Font Family              | Weight   | Size Range       |
|-------------|--------------------------|----------|------------------|
| Headings    | `Outfit`, sans-serif     | 700–900  | 1.05rem–4.5rem   |
| Body        | `Inter`, sans-serif      | 300–600  | 0.75rem–1.15rem  |
| Monospace   | System monospace         | 400      | 0.8rem           |

### Scale
- Hero Title: `4.5rem` / `900` / line-height `1.1`
- Section Title: `2.5rem` / `800` / letter-spacing `-0.5px`
- Card Title: `1.25rem` / `700`
- Body: `0.9rem–1.15rem` / `400–500`
- Labels: `0.75rem–0.85rem` / `600–700` / letter-spacing `1–2px`

---

## Spacing

| Token        | Value   |
|--------------|---------|
| Section pad  | `100px 8%` (top/bottom, left/right) |
| Card pad     | `30px`  |
| Gap (grid)   | `20–30px` |
| Mobile pad   | `15px 5%` |

---

## Border & Radius

| Element       | Radius  | Border                            |
|---------------|---------|-----------------------------------|
| Buttons       | `4–6px` | None (primary) / 1px solid border |
| Cards         | `8px`   | 1px solid `var(--border-color)`   |
| Badges        | `30–50px` | 1px solid accent with glow      |
| Phone mockup  | `32px`  | 8px solid `#1e293b`              |

---

## Shadows & Effects

| Effect          | Value                                            |
|-----------------|--------------------------------------------------|
| Card hover      | `0 10px 30px rgba(0,0,0,0.5)`                   |
| Phone mockup    | `0 20px 50px rgba(0,0,0,0.8)`                   |
| Blue glow CTA   | `0 0 20px rgba(0, 119, 255, 0.15)`             |
| Timeline dot    | `0 0 8px var(--color-blue)`                      |
| Backdrop blur   | `blur(12px)`                                     |

---

## Motion & Animation

| Property       | Duration | Easing         | Usage                     |
|----------------|----------|----------------|---------------------------|
| Hover          | `0.3s`   | `ease`         | All interactive elements  |
| Tab fade-in    | `0.5s`   | `ease`         | Tab panel transitions     |
| FAQ accordion  | `0.3s`   | `ease-out`     | Max-height toggle         |
| Scroll reveal  | `0.6s`   | `ease-out`     | Section entry animations  |
| Gradient shift | `3s`     | `linear`       | Hero gradient animation   |
| Badge pulse    | `2s`     | `ease-in-out`  | Live dot indicator        |

---

## Component Patterns

### Navbar
- Fixed top, backdrop-filter blur, semi-transparent bg
- Logo: brand split (OFFICIAL × GABUCRIA)
- CTA button: solid blue, right-aligned
- Mobile: hamburger menu replaces nav links

### Hero
- Centered content, badge + title + subtitle + dual CTA
- Stats grid: 4 columns with dividers (2 cols mobile)
- Gradient text on key phrase

### Diagnostic Cards
- 2x2 grid with icon, title, description, warning badge
- Hover lift with shadow deepening
- Side mockups: phone frame + showcase overlay

### Timeline Tabs
- Tabbed interface with underline indicator
- Timeline dots with glow, connected by vertical line
- Content cards with tags

### ROI Cards
- 3-column grid (1-col mobile)
- Featured card: blue border, gradient bg, "RECOMENDADO" badge
- Metric rows with separator

### FAQ Accordion
- Click-to-expand, single active at a time
- Chevron rotation on open
- Smooth max-height transition

---

## Responsive Breakpoints

| Breakpoint | Behavior                                          |
|------------|---------------------------------------------------|
| > 1024px   | Full desktop layout                               |
| ≤ 1024px   | Single column diagnostics, stacked ROI cards      |
| ≤ 768px    | Hidden nav, 2-col stats, single-col cards, smaller hero |
| ≤ 480px    | Further font scaling, compact spacing             |

---

## Accessibility

- Color contrast: all text meets WCAG AA on dark backgrounds
- Focus-visible styles on interactive elements
- Semantic HTML: `<header>`, `<section>`, `<nav>`, `<footer>`
- Keyboard navigable: tabs, FAQ, nav links
- prefers-reduced-motion: disable animations
