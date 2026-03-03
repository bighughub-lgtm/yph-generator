Fix mobile product card layout.
This is a layout consistency issue, not styling.

Breakpoint: 375–430px only.
Do not change tablet or desktop.

1. Make All Cards Equal Height

All product cards must have equal height.

Set fixed card height OR use vertical Auto Layout with space distribution.

Prevent text wrapping from changing card height.

Titles must occupy maximum 2 lines.

Truncate longer titles with ellipsis if needed.

No uneven card heights allowed.

2. Standardize Internal Card Structure

Each card must follow this structure:

Card (Auto Layout Vertical)

Padding: 20px

Gap: 16px

Title row (text + icon aligned)

Image container (fixed height, centered)

Image container:

Same height for all cards

Image centered both horizontally and vertically

No image scaling inconsistencies

3. Fix Grid Math

Mobile grid must use exact 2-column layout:

Side padding: 16px

Gap between cards: 16px

Card width = (available width – 16px gap) / 2

All cards = Fill container

No manual resizing.
No visual imbalance.

4. Align Icon Position

The question mark icon must:

Be vertically aligned with title text

Use same size on all cards

Have equal distance from right edge

5. Visual Result

Grid must look:

Perfectly symmetrical

Same height cards

Same spacing top/bottom

Same alignment left/right

Clean SaaS style