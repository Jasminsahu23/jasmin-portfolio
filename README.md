# Jasmin Sahu — Portfolio

React + Vite, plain CSS, no UI framework. Only runtime dependencies: `react`, `react-dom`, `lucide-react`.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview  # test the production build
```

## Replace the placeholders

| What | Where |
| --- | --- |
| Email, LinkedIn, GitHub | `src/data/site.js` (anything containing `your-` is shown with a "Placeholder" tag) |
| Resume PDF | overwrite `public/Jasmin-Sahu-Resume.pdf` (keep the filename) |
| Project GitHub / live demo links | `src/data/projects.js` → `github`, `demo` (`null` shows a disabled "soon" button) |
| Project screenshots | put images in `public/projects/`, then set `image: '/projects/name.webp'` in `projects.js`; the illustrated concept visual is replaced and the image lazy-loads |
| Open Graph image / URL | uncomment and fill the note in `index.html` |

The contact form opens the visitor's email app (`mailto:`) once a real email is set in `site.js`. For a hosted form later, swap the `onSubmit` in `src/components/Contact.jsx` for Formspree, Web3Forms, etc.

## Deploy to Vercel

1. Push the folder to GitHub.
2. Vercel → Add New Project → import the repo. Framework preset: **Vite** (already set in `vercel.json`).
3. Deploy. No environment variables needed.

## Accessibility and motion

Semantic landmarks, skip link, visible focus states, ARIA tabs for skills, keyboard-friendly mobile menu (Esc closes). All animation respects `prefers-reduced-motion`; the custom cursor and magnetic buttons only run on fine-pointer devices.
