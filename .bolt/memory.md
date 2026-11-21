# Project memory

## Product intent & audience

- Portfolio for an Assistant Product Manager, redesigned in a sports-editorial style.
- Showcases shipped work case studies and independent product teardowns.
- Audience: recruiters, hiring managers, product teams evaluating PM capability.

## Brand personality & voice

- Runner-culture aesthetic: high-energy, athletic, editorial.
- Tone: confident, dynamic, performance-driven.

## Visual design & UX direction

- Sports-editorial layout with "player profile" framing for the owner.
- Two distinct portrait contexts: a hero portrait (unchanged) and a player-profile photo (sports-card style crop).
- Player-profile photo composition: subject's head positioned higher in frame, jaw visible.
- User is precise about image crop and composition per context — hero vs. player-profile crops are treated separately.
- High-energy interactions expected throughout.

## Decisions, constraints & rationale

- Hero portrait and player-profile photo are independent; crop changes apply only to the requested context.
- Build verification expected after visual corrections.
- Stack: Vite + React, Tailwind CSS, Lucide React icons, `@/` path alias for imports. No extra UI packages unless explicitly requested.

## Open questions & assumptions

- "Player version" likely refers to a sports-card-style profile section/component distinct from the hero.
- Exact section inventory and navigation structure not yet fully defined.
- Case study content (specific products, teardowns) details pending.