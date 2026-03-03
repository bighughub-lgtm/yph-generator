🔧 MASTER LAYOUT NORMALIZATION PROMPT (FIGMA)

Normalize layout structure across all steps of the Mockup Generator.

CRITICAL RULES:

* Do NOT change any visual styling.
* Do NOT change typography, font sizes, weights.
* Do NOT change spacing values visually.
* Do NOT change button sizes.
* Do NOT change colors, borders, shadows.
* Do NOT resize cards or images.
* Do NOT redesign anything.
* Keep everything visually identical.

Only fix structural layout and alignment logic.

---

# 1️⃣ CREATE GLOBAL STRUCTURE

Wrap each step screen inside this exact hierarchy:

Page Wrapper (Full width)
→ Main Wrapper (Auto Layout - Vertical)
→ Fixed Container (Centered)
→ Step Indicator
→ Content Block
→ Button Row

---

# 2️⃣ FIXED CONTAINER RULE

Identify the container width from the FIRST Product screen (the correct reference).

Use that exact width for ALL steps.

Example structure:

Fixed Container:

* Width: SAME as first screen
* Alignment: Center horizontally
* Layout: Vertical Auto Layout
* Gap: Keep existing visual spacing (do not change visually)

This container must be reused across:

* Product
* Brand
* Quantity
* Designs
* Choose mockups
* Finished Files

No step may exceed or shrink this width.

---

# 3️⃣ BUTTON ROW STRUCTURE (CRITICAL FIX)

Inside Fixed Container:

Button Row:

* Auto Layout: Horizontal
* Justify: Space between
* Align items: Center
* Width: 100% of Fixed Container
* No absolute positioning

Buttons must:

* Align exactly with left and right edges of Fixed Container
* Always sit on the same baseline
* Never extend outside container
* Never have extra padding pushing them wider

Remove any outer frames causing misalignment.

---

# 4️⃣ CONTENT BLOCK NORMALIZATION

For every step:

Content Block:

* Width: 100% of Fixed Container
* Do NOT use "Fill container" if it causes width stretch beyond reference
* Remove nested conflicting auto layouts
* Ensure no step has extra horizontal padding

If internal grid is scrollable:

* Scroll container must be INSIDE fixed width container
* Scroll area width must equal container width

---

# 5️⃣ STEP INDICATOR ALIGNMENT

Step indicator must:

* Be inside Fixed Container
* Same width as content block
* Centered perfectly
* Same vertical spacing on all screens

Normalize vertical spacing:

* Step Indicator → Content Block
* Content Block → Button Row

Spacing must be consistent across all steps.

---

# 6️⃣ AUTO LAYOUT CLEANUP

Fix these common problems:

* Remove nested frames that override width
* Remove manual X positioning
* Remove fixed width overrides on child grids
* Convert all major sections to Auto Layout
* Avoid mixed absolute + auto layout

Final structure must be:

Page Wrapper (centered)
→ Main Wrapper (vertical auto layout)
→ Fixed Container (fixed width)
→ Step Indicator
→ Content Block
→ Button Row

---

# 7️⃣ RESPONSIVE BEHAVIOR

Maintain:

* Container centered on large screens
* No content stretching wider than reference
* Consistent left/right margins relative to container

Do NOT make responsive redesign.
Only normalize structure.

---

# 8️⃣ FINISHED FILES SCREEN FIX

Ensure:

* Result grid width equals Fixed Container width
* Download and Generate New buttons align exactly with container edges
* Counter (1/12) stays inside container alignment grid

---

# 9️⃣ FINAL RESULT REQUIREMENT

After fix:

* Every step must visually appear same width
* Buttons must always be on the same grid line
* Left edge of content and left edge of Back button must match perfectly
* Right edge of content and right edge of Continue button must match perfectly
* No layout jumping between steps

Do not modify styling.
Only normalize structure and alignment.

---

