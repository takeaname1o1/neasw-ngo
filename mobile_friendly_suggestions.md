# Mobile-Friendliness Analysis & Suggestion Plan

This document outlines the suggested changes to make the **NEASW Welfare Foundation** website mobile-friendly.

---

## 1. Summary of Current Issues
1. **Hardcoded Sizing & Layouts**: Several elements use fixed widths or percentage dimensions (e.g. `width: '55%'` or specific pixel counts) that break layout flows on smaller screens.
2. **Inline React Styles**: Page styles are defined inline using React `style={{ ... }}` objects. Since CSS media queries cannot target inline styles directly, responsiveness suffers unless overridden by complex conditional logic or nested `<style>` blocks.
3. **Complex Grid and Flex Patterns**: Sections like the partner logos, team headers, program cards, and collage sections lack proper flex wrapping or stack layouts on mobile views.

---

## 2. Suggested Files to Modify

### 🌐 Global CSS
#### [MODIFY] [index.css](file:///Users/g10/Sync/deploy_project/ngo/frontend/src/index.css)
* Add global helper utility classes for responsive layouts (e.g., `.hide-on-mobile`, `.mobile-stack`, `.grid-responsive`).
* Standardize mobile-friendly font sizing variables using `clamp()` or relative units.

---

### 🧩 Shared Components
#### [MODIFY] [Header.tsx](file:///Users/g10/Sync/deploy_project/ngo/frontend/src/components/Header.tsx)
* Ensure that the mobile menu drawer overlays correctly on small screens without shifting the brand logo.
* Set appropriate spacing for touch targets (buttons/menus).

#### [MODIFY] [ConversionBlock.tsx](file:///Users/g10/Sync/deploy_project/ngo/frontend/src/components/ConversionBlock.tsx)
* Optimize the grid layout so the volunteer and partnership cards stack cleanly vertically on smaller screens.

#### [MODIFY] [Footer.tsx](file:///Users/g10/Sync/deploy_project/ngo/frontend/src/components/Footer.tsx)
* Ensure contact information and office locations wrap beautifully when columns shrink on narrow viewports.

---

### 📄 Pages
#### [MODIFY] [Home.tsx](file:///Users/g10/Sync/deploy_project/ngo/frontend/src/pages/Home.tsx)
* **Hero Section**: Ensure typography scales down elegantly on smaller viewports.
* **Intro Collage**: Adjust the multi-image collage structure (which currently relies on negative margins and fixed image dimensions) to stack or hide secondary decorative images on mobile.
* **Flagship Initiatives**: Modify the layout displaying the Unity Utsav banners to prevent the image components from squeezing.
* **Programs & FAQ Grid**: Verify grid breakpoints so cards automatically convert to a single-column layout.

#### [MODIFY] [About.tsx](file:///Users/g10/Sync/deploy_project/ngo/frontend/src/pages/About.tsx)
* **Leadership Grid**: Adapt regional chapter grid layouts so that profile pictures and bios stack properly and do not overflow container borders.
* **Mission Statement Section**: Improve padding adjustments on mobile viewports.

#### [MODIFY] [Work.tsx](file:///Users/g10/Sync/deploy_project/ngo/frontend/src/pages/Work.tsx)
* **Alternating Galleries**: The split image/text sections and nested grids must be updated to stack vertically instead of maintaining a wide side-by-side layout on mobile.

#### [MODIFY] [Join.tsx](file:///Users/g10/Sync/deploy_project/ngo/frontend/src/pages/Join.tsx)
* **Volunteer Pricing Tier Grid**: Ensure the comparison table stacks and is easily readable on mobile.
* **Join Form**: Set input widths to full viewport width.

#### [MODIFY] [Contact.tsx](file:///Users/g10/Sync/deploy_project/ngo/frontend/src/pages/Contact.tsx)
* **Contact Grid & Forms**: Ensure that forms, contact detail icons, and promotion banners are neatly aligned and fully responsive.
