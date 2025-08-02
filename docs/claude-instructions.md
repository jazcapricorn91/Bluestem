# Claude Code Instructions for Bluestem Project

## Core Principles
1. **Follow Bluestem Project Standards** - See docs/Bluestem-Project-Standards.md
2. **Anti-AI Code Patterns** - Avoid generic, obviously AI-generated code
3. **Modular Architecture** - Create reusable components
4. **School Brand Consistency** - Only use approved colors and fonts

## Specific Rules
- **CSS**: No !important, use school colors only, modular components
- **JavaScript**: Vanilla JS only, proper error handling, descriptive names  
- **HTML**: Semantic markup, minimal nesting, accessibility first
- **Comments**: Explain WHY and complex interactions, not obvious things

## Modal Functionality Requirements
When working with modals:
- Find ALL modal-related code blocks, not just individual lines
- Create separate modal.css and modal.js files
- Use consistent data attributes
- Implement proper accessibility
- Clean separation from other functionality

## What NOT to Generate
- Generic wrapper divs
- Inline styles mixed with CSS
- jQuery mixed with vanilla JS
- !important everywhere
- Copy-paste code blocks
- Obvious comments like "// This is a button"