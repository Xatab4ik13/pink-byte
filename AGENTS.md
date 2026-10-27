<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Home page sections live in src/components/pinkbyte/ and are composed in src/routes/index.tsx; shared logo, buttons and reveal helpers are in primitives.tsx — keeps sections reusable for future pages.
- StudioSections owns the process, cost and FAQ sections before Contact; supplied images are compressed WebP CDN pointers, the cost illustration uses picture sources for mobile/desktop, and FAQ state is local, keeping presentation lightweight without backend dependencies.
- Service content lives in a browser-safe data module; all four devices use the owner's compressed renders. Predecode images, animate only incoming/outgoing motion wrappers with transform and opacity, keep idle devices painted on their own layers at opacity 0 (no display toggling), and finish the current transition before taking only the latest requested tab to avoid raster work and click backlogs. Keep static placement and image shadows outside the animated transforms.
- Journal is a separate content route that reuses Header and Footer; shared navigation uses root-qualified home anchors so sections remain reachable from other pages.
- Service navigation uses a shared browser-safe link list with optimized CDN image pointers; unfinished services reuse ServicePlaceholder on separate routes so navigation never leads to missing pages.
- Corporate service content and offer rules live in a browser-safe data module with focused offer tests; its standalone route reuses the existing header, contact block, FAQ motion and brief opener to keep navigation and interactions consistent.
- Navigation highlighting derives from the router pathname/hash, never a default selected item; all internal header, footer and service links use TanStack Link and intent preloading to avoid full document reloads.
- Project discussion buttons share a root-mounted BriefProvider; the prototype uses session-only sequential questions and AI Elements for messages, scrolling and composition, with no AI calls or file uploads. Keep brief generation in a pure model for testing and later replacement.
- Keep BriefContext and its consumer hook in a separate non-component module so refreshing the dialog does not recreate the context used by mounted navigation buttons.
- Keep the root brief provider lightweight and lazy-load the persistent dialog after first paint or on demand; import plain AI message shells separately from rich Markdown rendering so unused diagram/math engines never load on studio pages.
- Restore route scroll positions instantly while retaining smooth in-page anchors; this avoids animating through the destination page on navigation or browser history.
- Keep the brief opener stable and draft input state inside the composer; fixed questions use plain text inside AI Elements message shells to avoid page-wide updates and streaming-renderer work while typing.
- Project slides use a mounted horizontal rail with boundary clones, eager async-decoded images and transform-only movement; reset boundary clones without transition and retain only the latest pending direction to avoid click backlogs. Keep the rail outside Reveal transforms and images uncropped.
- Hero eye animation uses a clean visor baked into the original alpha-preserving robot base and emissive-only RGBA eye crops; a shared gaze wrapper translates both eyes while child layers blink, so neither old eyes nor visor texture can leave moving shadows. Preserve chrome pixels and silhouette outside the visor.
- Brief robot uses a dedicated edited sitting render, separate from home assets, with its seat line aligned to the modal bottom; a CSS mouth layer animates briefly per question without moving the body.
- Brief questions and answers stay inside the scrollable AI Elements conversation, with the composer and summary separate; this keeps the transcript readable without overlays or moving the seated robot.
- Brief completion uses a separate contact form and a public validated server function; contact details and the brief are stored in an RLS-locked table, and downloading unlocks only after a successful submission with consent.
