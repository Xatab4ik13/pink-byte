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
- Journal is a separate content route that reuses Header and Footer; shared navigation uses root-qualified home anchors so sections remain reachable from other pages.
- Project discussion buttons share a root-mounted BriefProvider; the prototype uses session-only sequential questions and AI Elements for messages, scrolling and composition, with no AI calls or file uploads. Keep brief generation in a pure model for testing and later replacement.
- Keep BriefContext and its consumer hook in a separate non-component module so refreshing the dialog does not recreate the context used by mounted navigation buttons.
- Keep the brief opener stable and draft input state inside the composer; fixed questions use plain text inside AI Elements message shells to avoid page-wide updates and streaming-renderer work while typing.
- Project slides use a mounted horizontal rail with boundary clones, eager async-decoded images and transform-only movement; reset boundary clones without transition and retain only the latest pending direction to avoid click backlogs. Keep the rail outside Reveal transforms and images uncropped.
- Hero eye animation uses a clean visor baked into the original alpha-preserving robot base and emissive-only RGBA eye crops; a shared gaze wrapper translates both eyes while child layers blink, so neither old eyes nor visor texture can leave moving shadows. Preserve chrome pixels and silhouette outside the visor.
- Brief robot uses a dedicated edited sitting render, separate from home assets, with its seat line aligned to the modal bottom; a CSS mouth layer animates briefly per question without moving the body.
- Brief questions and answers stay inside the scrollable AI Elements conversation, with the composer and summary separate; this keeps the transcript readable without overlays or moving the seated robot.
- Brief completion uses a separate contact form and a public validated server function; contact details and the brief are stored in an RLS-locked table, and downloading unlocks only after a successful submission with consent.
