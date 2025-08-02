# !important Cleanup Plan

## Why This Matters
- `!important` overrides ALL other styles, including mobile-specific fixes
- Causes touch event blocking on mobile devices
- Makes debugging nearly impossible
- Creates maintenance nightmares

## Found 70 !important declarations

### Priority 1: Button/Touch Blockers
- [ ] Line 1229: `z-index: 25 !important` on principle cards
- [ ] Line 1240: `z-index: 30 !important` on principle visual
- [ ] Line 1241: `pointer-events: auto !important`
- [ ] Line 1246: `pointer-events: none !important`
- [ ] Line 1254: `pointer-events: auto !important`

### Priority 2: Layout Breakers
- [ ] Line 1239: `position: relative !important`
- [ ] Line 1717-1721: Multiple sticky header !important rules
- [ ] Transform: none !important (multiple instances)

### Priority 3: Style Overrides
- [ ] Colors with !important
- [ ] Backgrounds with !important
- [ ] Padding/margin with !important

## Replacement Strategy
Instead of `!important`, use:
1. More specific selectors
2. Cascade order (put styles later in file)
3. Inline styles only when absolutely necessary
4. CSS custom properties for flexibility

## Testing After Cleanup
1. Test all mobile buttons
2. Check principle card interactions
3. Verify modal functionality
4. Test on real devices (not just Chrome DevTools)