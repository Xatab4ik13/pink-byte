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
- Project slides remain mounted with eagerly loaded, async-decoded images and transition only transform/opacity; keep their wrapper out of Reveal transforms so rapid navigation avoids image-load delays and nested entrance animation.
- Hero eye animation uses a clean visor baked into the original alpha-preserving robot base and emissive-only RGBA eye crops; a shared gaze wrapper translates both eyes while child layers blink, so neither old eyes nor visor texture can leave moving shadows. Preserve chrome pixels and silhouette outside the visor.
- Brief robot uses a dedicated edited sitting render, separate from home assets, with its seat line aligned to the modal bottom; a CSS mouth layer animates briefly per question without moving the body.
- Brief questions use a separately keyed overlay with reserved conversation space; CSS sequences its entrance and a cancellable client-side animation frame types text so changing questions never moves the robot or shifts the composer.
