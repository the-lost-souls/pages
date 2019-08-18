
### Enhancements
- Autoscale background image so that it always fills the items 
- Loading/overlay screen
- Only show items after they're done loading/preparing

### Cleanup
- remove unused styles
- clarify/cleanup style naming

### Bugs
- Re-enable opacity animation and figure out a workaround for IOS (it bounces like crazy when you reach the begin/end)
- IOS: Scroll to end or beginning and keep flicking. Eventually the scrolling will stop working. You can get it going again by just tapping somewhere on the screen.
- IOS: The window.height or carousel.clientHeight gives weird different values on chrome desktop, safari desktop and IOS so the scrollable area gets the wrong size. Verify by scrolling to the end of the page.

