
### Enhancements
- Splash screen screen
- Only show items after they're done loading/preparing
- make buttons bounce when they're clicked
- find a more stylish font
- show a symbol to indicate you can scroll down
- add a member list and a quick description of what TLS is
- the text is blurry when scaled up. Must fix
- github icon is blurry. Seems to only be a problem on Safari OSX.
- would be cool to fade out the lens flares when the mouse 
hovers over them

### Cleanup
- remove unused styles
- clarify/cleanup style naming
- cleanup use of 'item' vs 'section'
- cleanup use of viewport units vs percentage, make consistent
- add box-sizing border-box to all elements globally
- cleanup use of flex vs flexbox ('flex' is apparently the latest standard)
- use 'undefined' instead of 'null' in teh contents
- split 'options' from 'content'
- rename 'config' to 'options' everywhere
- rename 'item' to section everywhere

### Bugs
- The first/last element does not cover the header correctly
- Re-enable opacity animation and figure out a workaround for IOS (it bounces like crazy when you reach the begin/end)
- IOS: Scroll to end or beginning and keep flicking. Eventually the scrolling will stop working. You can get it going again by just tapping somewhere on the screen.


- DONE: IOS: The window.height or carousel.clientHeight gives weird different values on chrome desktop, safari desktop and IOS so the scrollable area gets the wrong size. Verify by scrolling to the end of the page. This might be related to the use of viewport units vs percentage (the former includes scrollbars and the like).
- DONE: Autoscale background image so that it always fills the items 

