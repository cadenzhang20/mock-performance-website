/**
 * STAFF DIVIDER COMPONENT
 * =======================
 *
 * A visual motif: five thin horizontal lines at musical staff spacing.
 * Used between every major section of the page.
 *
 * WHY THIS COMPONENT?
 * 1. Consistency — one component ensures identical spacing everywhere
 * 2. Semantic meaning — it's a visual quote from sheet music
 * 3. Accessibility — aria-hidden since it's decorative
 * 4. Simplicity — five divs with borders, no images needed
 *
 * The spacing (10px gap) is proportional to the width — on wider
 * screens the lines stretch but the gap stays constant, which
 * matches how a printed staff looks.
 */

export function StaffDivider() {
  return (
    <div className="staff-divider w-full" role="presentation" aria-hidden="true">
      <div className="staff-divider__line" />
      <div className="staff-divider__line" />
      <div className="staff-divider__line" />
      <div className="staff-divider__line" />
      <div className="staff-divider__line" />
    </div>
  );
}
