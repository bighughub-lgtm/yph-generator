Add a fully functional "Delete all" button to the existing Upload Designs screen.

IMPORTANT:
Do NOT change layout, spacing, typography, colors, sizes, images or structure.
Keep the button visually identical to the current design.
Only add interaction and state logic.

Button behavior:

Location:

Top right corner of the image upload container

Keep exact size, border radius, padding, and text styling

Default state:

Visible only when at least 1 image is uploaded

Hidden (or 40% opacity + disabled) when no images exist

Hover state:

Background slightly darker (subtle contrast increase)

Cursor: pointer

Smooth 150–200ms ease transition

Active (pressed) state:

Slight darker background

Optional 1px visual press effect

Functional logic:

When clicked:

Instantly remove ALL uploaded images (slots 1–5)

Reset each slot to empty placeholder state

Remove preview thumbnails

Remove individual delete icons

Reset internal image variables to null

Disable Continue button (if upload is required)

Hide "Delete all" button after clearing

Confirmation behavior (optional but recommended):

Before deleting:

Show small confirmation modal:
Title: "Delete all images?"
Text: "This action cannot be undone."
Buttons:

Cancel

Delete (destructive style)

If confirmed → execute delete logic.

Component structure:

Convert upload slots into a component with variants:

Empty

Filled

Hover

Remove visible

Create a Boolean variable:
hasImages = true/false

Bind:

Button visibility → hasImages

Continue button enabled → hasImages

Animation:

Use Smart Animate for:

Image removal

Placeholder reset

Button fade out

Duration: 150–200ms

Do not redesign anything.
Only add interaction states, variants, and logic.