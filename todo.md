
### Enhancements
- Splash screen screen
- Only show items after they're done loading/preparing
- make buttons bounce when they're clicked
- find a more stylish font

### Cleanup
- remove unused styles
- clarify/cleanup style naming
- cleanup use of 'item' vs 'section'
- cleanup use of viewport units vs percentage, make consistent
- add box-sizing border-box to all elements globally

### Bugs
- The first/last element does not cover the header correctly
- Re-enable opacity animation and figure out a workaround for IOS (it bounces like crazy when you reach the begin/end)
- IOS: Scroll to end or beginning and keep flicking. Eventually the scrolling will stop working. You can get it going again by just tapping somewhere on the screen.


- DONE: IOS: The window.height or carousel.clientHeight gives weird different values on chrome desktop, safari desktop and IOS so the scrollable area gets the wrong size. Verify by scrolling to the end of the page. This might be related to the use of viewport units vs percentage (the former includes scrollbars and the like).
- DONE: Autoscale background image so that it always fills the items 

