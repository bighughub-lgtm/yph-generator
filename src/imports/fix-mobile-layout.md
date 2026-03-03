Fix mobile layout alignment issues.
Tablet and desktop must remain unchanged.

Breakpoint: 375–430px.

1. Step Container Width Issue (Main Problem)

The Step card container is visually narrower than the content grid below.
This creates inconsistent horizontal alignment.

Fix:

Make Step container full-width inside mobile layout.

Side padding must match product grid section.

Use consistent horizontal padding: 16px from screen edge.

Remove extra inner margin inside Step card.

Align left and right edges of:

Step container

Product selection grid

All mobile blocks

Everything must sit on the same vertical grid lines.

Goal: one clean column system.

2. Remove Double Container Effect

Currently it feels like:
Screen → Outer container → Inner Step card → Content

Fix:

Either remove inner card background
OR

Make Step block use same container system as product grid.

Avoid nested card inside card effect.

Keep only one structural layer.

3. Vertical Rhythm Fix

24px spacing between Step block and Product grid.

16px internal padding inside containers.

Keep consistent spacing system (8pt grid).

4. Clean SaaS Layout Rules

All mobile sections must align to same 16px side padding.

No section should be visually narrower than another.

Use consistent border radius (16px).

Remove visual imbalance between blocks.