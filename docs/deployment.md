# Deployment

Bootpack produces static files. Only deploy **the contents of `dist`**, never the
repository root, tools, tests, environment files or `node_modules`.

```sh
npm ci
npm run check
npx playwright install chromium
npm run test:browser
```

Production bundles have content hashes and no source maps. HTML retains the source
directory structure. The host should serve `/about/index.html` for `/about/` and
return real 404s for unknown pages, not an application-wide SPA fallback.

## Cloudflare Pages

For a new site using Cloudflare DNS, Pages is a straightforward static host.
Having a domain in Cloudflare does not mean a hosting project already exists.

1. In Cloudflare **Workers & Pages**, create a **Pages** project and connect GitHub.
   Authorize only the intended repository. Choose `bootpack/bootpack` for the official
   site, or your generated repository for your own website.
2. Select framework preset **None**, repository root as the root directory,
   build command `npm run build`, and build output directory `dist`.
3. Set `NODE_VERSION` to the Node 24 version in `.nvmrc`. Keep npm development
   dependencies enabled because webpack/Sass are build dependencies. Do not set
   `NODE_ENV=production` during dependency installation.
4. For the official site, keep `master` as the eventual production branch and
   `develop` as a preview branch. Do not publish the legacy `master` as v1.0.0.
   Validate the develop preview before promoting the release to master.
5. Confirm the `pages.dev` preview renders every example, navigation and static
   asset. Test a direct visit to a nested page and an unknown page.
6. Only after the tested release is ready, open **Custom domains > Set up a domain**
   and attach `bootpack.io` to the official project. Cloudflare needs the apex zone
   in that account. Let the Pages custom-domain setup create/validate the website
   record; adding a CNAME alone without registering the domain can fail.
7. Wait for certificate/domain activation, then test HTTPS and nested routes on
   `https://bootpack.io`. Add `www` and an explicit canonical redirect if desired.

**Preserve email DNS.** Do not replace MX, SPF, DKIM or other unrelated records when
adding the website. Bootpack email hosting is independent of the static website.

For CI-controlled direct uploads instead, create a Direct Upload Pages project
and deploy a verified `dist` artifact using Wrangler. Choose Git integration versus
Direct Upload deliberately at project creation. No Cloudflare account IDs, API keys,
or automatic production-deploy script are shipped in this template.

Cloudflare can apply SPA fallback when there is no top-level `404.html`. This
starter includes a self-contained one without external bundles or fonts, so it
renders at arbitrary unknown URL depths. Local preview serves the same fallback.
Keep it when adding pages. See the official
[static HTML guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-static-html-site/)
and [custom-domain guide](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## GitHub Pages

The build supports a project URL such as `https://OWNER.github.io/REPOSITORY/`
without rewriting the injected bundle/favicon links. Keep your own asset and
navigation links relative as described in [Assets](assets.md).

Use a Pages artifact workflow to publish the contents of `dist` after checks pass.
The template's included CI workflow validates but **does not deploy**. Enable Pages
and its permissions explicitly for the repository that should be published.

The separate `bootpack.github.io` organization landing repository should become a
small directory pointing to the canonical `bootpack.io` site, current starter,
documentation and examples. Change that page only once the destination is live;
do not redirect users to an unconfigured domain. No Reactstrap link is needed after
the empty legacy repository is deleted.

## Release and rollback

`develop` is the v1.0.0 integration branch. Merging/pushing it to a branch connected
to a host can deploy publicly, so review that host's settings first. Create the
v1.0.0 tag/release only after the [release gates](release-v1.md) pass. The version in
package.json is the target version, not evidence that the release has been published.

Record the known-good deployment ID and commit before replacing an existing site.
Use the host's deployment rollback if verification fails; do not use force pushes
or undo unrelated DNS changes. Cloudflare and GitHub control-plane permissions must
be supplied through their normal login/secret-store interfaces, never committed.
