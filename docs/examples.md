# Examples

The gallery contains eight standalone HTML layouts. All use a shared Bootstrap 5
foundation; Album and Elements add their own [page entries](page-entries.md).
There is no React or server requirement.

| Example | Layout and interactions |
|---|---|
| Starter | Minimal centered content and responsive navigation |
| Grid | Bootstrap's six responsive column tiers |
| Jumbotron | Utility-based callout and three supporting columns |
| Navbar | Responsive, light and dark navigation variations |
| Album | Responsive photo cards and a native dialog with Escape/focus restoration |
| Pricing | Monthly/annual totals, native disclosure questions and plan links |
| Contact | Responsive labeled fields, native validation, local preview and reset |
| Elements | Content, every Bootstrap 5 component family, forms, utilities and helpers |

New layouts live under `src/templates/`. Open them from the homepage; all pages
link back to the gallery. `src/js/examples.js` contains the small interactions,
and `src/css/examples.css` contains the Album-only photo/dialog styles. Elements
has its own `src/js/elements.js` and `src/scss/elements.scss`. Remove unused mappings
from `page-entries.js` when deleting examples; remove the shared `./examples` import
from `src/js/index.js` when dropping the Album/Pricing/Contact interactions.

## Sample data and privacy

Pricing plans, policies and prices are fictional. The billing selector switches
between a monthly charge and the total annual charge, not a monthly equivalent.
Choosing a plan opens the contact example with only the plan name in the URL.

The contact form does not send requests, persist fields or deliver email. Inputs
deliberately have no `name` attributes, and submission is enabled only after the
local handler is installed. Connect a real endpoint, handle error/success states,
and define your privacy policy before turning it into a real contact form.

The Elements form also previews locally without sending or storing entered values.
Its submit button stays disabled until the local handler is installed. The carousel
does not autoplay; toast notifications remain until dismissed. Overlays support
Escape and restore trigger focus; tabs support arrow-key navigation.

## Elements coverage

The catalog organizes representative Bootstrap 5.3 examples by family, not every
possible color, breakpoint or component permutation. The official
[Bootstrap reference](https://getbootstrap.com/docs/5.3/) remains the API reference.

| Area | Included families |
|---|---|
| Content | Reboot defaults, typography, code/lists, responsive images, figures and tables |
| Components | Accordion, alerts, badges, breadcrumb, buttons, button group, card, carousel, close button, collapse, dropdown, list group, modal, navbar, nav/tabs, offcanvas, pagination, placeholders, popovers, progress, scrollspy, spinners, toasts and tooltips |
| Forms | Text/email/file/color controls, textarea, select, checkboxes/radios, switches, range, input groups, floating labels, responsive layout, readonly/disabled states and validation |
| Utilities | Background, borders, colors, display, flex, float, interactions, links, object fit, opacity, overflow, position, shadows, sizing, spacing, text, vertical alignment, visibility and z-index |
| Helpers | Clearfix, colored links, focus ring, ratio, stacks, stretched link, text truncation, visually hidden labels and vertical rule |

Navbar and dropdown examples are in the catalog's top navigation. Pagination
switches between two local table pages. The extra component styles and plugins
load only on Elements, so a plain starter page does not pay for this catalog.

## Images

The three sample photographs are downloaded from Unsplash and served locally;
visiting the album sends no requests to an external image host. Their source URLs:

- [Alpine photo](https://images.unsplash.com/photo-1501785888041-af3ef285b470)
- [Country photo](https://images.unsplash.com/photo-1470770841072-f978cf4d019e)
- [Mountain photo](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b)

The photographs remain under the [Unsplash license](https://unsplash.com/license),
not Bootpack's code license. Replace them with your own licensed assets when
customizing the gallery; retain useful alternative text and image dimensions.

## Optional icons

Bootpack stays icon-library agnostic. Install only the library your site needs,
then use its documented SVG or CSS import. For example, Bootstrap Icons can be
installed with `npm install bootstrap-icons`. Copy the SVG files you actually use
into `src/images/icons/` and link them with normal relative image paths. Supply
accessible labels for icon-only controls and avoid a whole icon-font bundle when
a few individual SVGs suffice. There is no build-flag dependency installer.