# Component integration notes

These are narrowly scoped React/TypeScript/CSS building blocks for the existing Next.js project. They are not a replacement app or complete CMS. Preserve the current routes, form handler, authentication and catalogue logic.

Copy the three components into the project’s appropriate component folders and import the CSS through the existing allowed stylesheet entry point. All CSS classes use the `vsp-` prefix. Keep third-party notices with the source. Do not import the raw original examples as global `.card`, `.banner` or `.sign-up` styles.

## Existing form

```tsx
// Illustrative integration; use actual imports and existing state/handlers.
<EnquirySurface>
  <h1>Tell us what you need</h1>
  <form onSubmit={existingSubmitHandler}>
    {/* Keep the existing labelled fields, prefill, errors and consent. */}
    <AnimatedEnquiryButton type="submit" busy={isPreparing}>
      Submit Enquiry
    </AnimatedEnquiryButton>
    {/* Keep the actual email/WhatsApp draft actions and status messaging. */}
  </form>
</EnquirySurface>
```

Do not nest another form inside `QuoteForm`. If `QuoteForm` already returns a form, wrap that component and replace only its internal submit button. Add `.vsp-field` to compatible text inputs/selects/textarea if needed. Do not apply it to checkboxes or radios. Leave the real validation/error logic in the existing component. Supply `aria-describedby` and `aria-invalid` based on those errors.

`AnimatedEnquiryButton` is a native button. It defaults to submit; explicitly set `type="button"` for non-submit actions. The busy prop disables duplicate submission and exposes `aria-busy`. Use a separate live status area in the existing form for feedback. It never claims to send a message.

For a navigation CTA, adapt the same inner icon markup/CSS to the repository’s proper `<Link>` or `<a>` implementation, preserving its accessible name and focus ring. Do not implement navigation using a submit handler or a fake `href="#"`.

## Headings

```tsx
<VariableHeadline text="Industrial Automation & Electricals" mode="expand" />
<VariableHeadline text="Paper Bag Manufacturing" mode="shrink" />
<VariableHeadline text="Why Choose VSPIAS ECOAUTOMATION?" mode="squoosh" />
```

The normal phrase is available to assistive technology; visual character copies are hidden from it. Character slots reserve their width before animation. Words remain together while spaces allow natural wrapping. Avoid applying this to an unbreakable long product identifier or long body copy; verify small-screen line wrapping in the actual font.

The component uses IntersectionObserver to trigger once; reduced-motion changes are respected. No-JS renders remain readable. Static/unsupported variable fonts still receive transform feedback. For exact `wdth` animation, first verify that the actual licensed display font supports that axis; Manrope’s weight variation alone is not a width axis. Body/nav/form typography must stay in the approved design system.

## Existing rails and admin

Integrate the detailed behavioural contract from `MOTION-AND-ADMIN.md` into the existing carousel. This kit intentionally does not ship a competing carousel, router or storage server. Audit the current implementation, preserve what works and fix gaps. Ensure server-side division ownership, independent brochure records and real draft/publish persistence.

Read `KIT-VERIFICATION.txt` for checks performed here. Integration, real React type checking/build and browser rendering must be completed in the actual repository. Do not mistake component source presence for a passed feature.
