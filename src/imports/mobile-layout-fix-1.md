Fix the mobile layout by restructuring the frame hierarchy.
This is a structural Auto Layout issue.

⚠️ Do NOT adjust styling only.
⚠️ Rebuild the layout structure if needed.
⚠️ Tablet and desktop must remain unchanged.
Breakpoint: 375–430px only.

1. Rebuild Mobile Container Structure

Create ONE main mobile container with:

Width: 100%

Vertical Auto Layout

Side padding: 16px

Section spacing: 32px

No nested containers with their own horizontal padding

All sections must live inside this one container.

2. Fix Step Section Width

The Step section is currently narrower than the product grid.

Fix it by:

Removing any extra wrapper around Step section

Set Step frame to:

Width: Fill container

Horizontal constraints: Left & Right

Remove internal horizontal padding inside Step section

Align left and right edges with product grid

Step section must share the same vertical grid lines as product cards.

3. Fix Product Grid Width Logic

Ensure product grid:

Width: Fill container

No additional side margins

2-column layout using exact math:

Total width minus 32px side padding

16px gap between columns

Cards must have equal width

No uneven resizing.
No nested width constraints.

4. Remove Double Container Effect

There should NOT be:

Screen
→ Container
→ Card container
→ Content

Replace with:

Screen
→ Main container
→ Step section
→ Product grid

Only one horizontal alignment system.

5. Auto Layout Rules

For all mobile sections:

Width: Fill container

Height: Hug contents

No Hug width on section wrappers

No Fixed width on main sections

Expected Result

Step section and product grid must:

Align perfectly left and right

Share the same side padding (16px)

Appear as part of one unified layout system

Have no visual width difference