Fix layout structure for mobile breakpoint (375–430px).

This is a structural issue, not styling.

1. Remove Nested Container Structure

Current structure:
Screen
→ Outer container
→ Step card container
→ Product grid container

Fix it to:

Screen
→ One main mobile container (max width 100%)
→ Step block
→ Product grid

Remove extra inner wrapper around Step section.

All sections must share the same parent container.

2. Unify Mobile Container System

Create one mobile container rule:

Width: 100%

Side padding: 16px

No additional inner horizontal margin

Vertical spacing between sections: 32px

All blocks must align to same left and right grid lines.

3. Fix Product Grid Math (Very Important)

Mobile grid must follow exact formula:

Screen width
– 32px total side padding
= usable width

If 2-column grid:

Gap: 16px

Card width = (usable width – 16px gap) / 2

No manual resizing.
No uneven card widths.
No inconsistent internal margins.

4. Remove Visual Width Illusion

Step block currently looks narrower because:

It has extra inner padding.

It has card background inside a padded container.

Fix:

Either:
A) Remove card background from Step section
OR
B) Make it full width same as product cards container.

Do not keep double padding layers.

5. Align Vertical Rhythm

Use strict 8pt system:

16px internal padding

24px between title and grid

32px between sections