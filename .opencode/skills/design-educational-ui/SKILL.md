---
name: design-educational-ui
description: "Build the educational HTML/CSS/JS interface. Use for layout, tabs, anchors, notebook content presentation, accessibility or visual changes."
---

1. Read the task, approved content and READY design. Define the educational purpose
   and rendering contract; refer physical ambiguities to quantum.
2. Implement a long page with title/section anchors at the top and Example/Math/Code
   tabs at the end. Select Example initially. Stack each tab's content vertically.
   Keep native semantic elements and stable IDs; omit Previous/Next and Open Editor.
3. Use Catppuccin Mocha tokens with sufficient contrast and simple differentiated
   tab backgrounds. Keep CSS separate, with English section/palette comments.
   Respect keyboard focus, tab semantics, mobile widths and reduced motion.
4. Present team-supplied notebook text, source and corresponding outputs as blocks.
   Keep display content separate from the whole-example execution function.
   Use output identifiers agreed with quantum, and label static examples honestly.
   Insert text/code using safe DOM text APIs; do not render untrusted HTML.
5. Reuse native JS/CSS. Add a maintained math/highlighting library only when required
   and loadable in Qollab. Keep entry files short and cohesive modules in frontend/.
6. Exercise anchors, tab selection, rendered outputs and relevant asynchronous
   loading/failure states. Check desktop/mobile and keyboard; return actual evidence.

Sources: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
https://www.w3.org/WAI/test-evaluate/
https://github.com/catppuccin/catppuccin
