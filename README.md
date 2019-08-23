[![CircleCI](https://circleci.com/gh/the-lost-souls/tls-home/tree/master.svg?style=svg)](https://circleci.com/gh/the-lost-souls/workflows/tls-home)


### Deployments
[Prod](https://the-lost-souls.github.io/tls-home/) | 
[Dev](https://the-lost-souls.github.io/tls-home/builds/latest) | 
[All](builds.md)

### Gotchas
- using Z-index for layering gives inconcistent behavior across Chrome (OSX) and Safari (OSX) when combined with transforms, so using translateZ for ordering instead.
- animating opacity triggers a bug on ios webkit that makes the page bounce all over the place when you scroll to either end.
- Tried first using the css filter: blur and image-mask features, but the app performed horribly on chrome (osx). Safari (OSX) and IOS was fine. Ended up pre-processing the images with libraries instead, both for blur and masking.
- The scroll-snap css feature has inconsistent behavior across Chrome (OSX) and Safari (OSX). In order for it to work on Safari I had to wrap every scrolling element in another div
- The image size of the blurred background seems to make a big difference in performance, especially on Chrome (OSX)
