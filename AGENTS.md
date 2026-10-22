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
- Hero eye animation uses a transparent visor restoration, original cropped eye layers, and alpha-only glow; the original robot body stays intact and opaque full-frame blend layers are avoided to prevent rectangular backgrounds.
