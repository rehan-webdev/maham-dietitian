# Maham | Bridal Nutrition & Wellness

A responsive React, Vite, and Tailwind CSS website with an ivory, sage, and blush editorial direction. The application entry point is `src/App.tsx`.

## Included

- Three free, self-guided learning paths with locally saved progress.
- A three-question reading-path finder, not a medical assessment.
- Six journal articles with search, topic filters, bookmarks, and shareable URLs.
- Two recipes with adjustable servings and printable PDF downloads.
- A nine-item wellness checklist with local progress, reset, and PDF export.
- A four-page bridal wellness PDF, generated directly in the browser.
- Accessible native dialogs, keyboard focus restoration, responsive navigation, and reduced-motion support.
- FAQs, privacy controls, educational-use notes, and links to the supplied Instagram profile.

There is no call booking, contact form, mailing list, payment flow, or account requirement.

## Editing

- `src/data/content.ts`: programs, journal articles, recipes, FAQs, guide content, and image URLs.
- `src/App.tsx`: landing-page sections and application state.
- `src/components/Experiences.tsx`: journal, quiz, program, guide, checklist, and legal views.
- `src/index.css`: design system and responsive styles.
- `src/utils/pdf.ts`: PDF layouts and download generation.
- `public/images/`: the two generated editorial photographs.

## Content Provenance

The supplied Instagram profile could not be retrieved during implementation. The site therefore does not invent verified qualifications, a biography, paid service details, prices, or client testimonials. Its named programs are original, free educational website resources, not confirmed clinical offers. Brand copy and professional details should be reviewed by the owner before public launch.

General nutrition fundamentals reference the NHS Eatwell Guide, linked in the relevant articles and PDFs. The website is not a substitute for individual care from a qualified healthcare professional.

The hero and nourishment still life are generated editorial images. Other photography is served from Pexels using the selected media URLs: Antoni Shkraba (breakfast), khezez (journaling), Mikhail Nilov (lemon water), and Valeria Boltneva (salad). Imagery is not presented as client photography or documented outcomes.

## Storage And Privacy

Only article IDs and completion IDs are stored locally, under `maham-saved-articles`, `maham-completed-steps`, and `maham-wellness-checklist`. Quiz answers remain in component state. No personal data is submitted. The Privacy & your data view clears all saved website progress.

Google Fonts and Pexels supply external assets. Instagram and NHS links open external websites. PDF documents are generated locally with jsPDF.

## Verification

The production Vite build has been verified. Interactive browser testing was not available in the implementation tool environment; the responsive layout, keyboard flows, storage behavior, and PDF exports should also receive a browser acceptance check before public launch.