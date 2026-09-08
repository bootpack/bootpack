# Examples

The gallery contains eight standalone HTML layouts. All use the same selected
Bootstrap 5 styles and JavaScript entry; there is no React or server requirement.

| Example | Layout and interactions |
|---|---|
| Starter | Minimal centered content and responsive navigation |
| Grid | Bootstrap's six responsive column tiers |
| Jumbotron | Utility-based callout and three supporting columns |
| Navbar | Responsive, light and dark navigation variations |
| Album | Responsive photo cards and a native dialog with Escape/focus restoration |
| Pricing | Monthly/annual totals, native disclosure questions and plan links |
| Contact | Responsive labeled fields, native validation, local preview and reset |
| Elements | Typography, alerts, collapse, inputs, switches and border/color utilities |

New layouts live under `src/templates/`. Open them from the homepage; all pages
link back to the gallery. `src/js/examples.js` contains the small interactions,
and `src/css/examples.css` contains the photo/dialog styles. Remove those two
imports from `src/js/index.js` if your site does not use the examples.

## Sample data and privacy

Pricing plans, policies and prices are fictional. The billing selector switches
between a monthly charge and the total annual charge, not a monthly equivalent.
Choosing a plan opens the contact example with only the plan name in the URL.

The contact form does not send requests, persist fields or deliver email. Inputs
deliberately have no `name` attributes, and submission is enabled only after the
local handler is installed. Connect a real endpoint, handle error/success states,
and define your privacy policy before turning it into a real contact form.

The Elements page covers Bootpack's selected components, not every Bootstrap
plugin. For additional components, follow the import and keyboard-test guidance
in [Getting started](getting-started.md) and the current
[Bootstrap documentation](https://getbootstrap.com/docs/5.3/).

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