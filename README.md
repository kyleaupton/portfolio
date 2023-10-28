[![Netlify Status](https://api.netlify.com/api/v1/badges/e36cf977-aaaa-40d9-904b-42d14111d19e/deploy-status)](https://app.netlify.com/sites/lustrous-nougat-969a99/deploys)

# Kyle Upton's Portfolio Site

## Todo

- [x] Create landing CLI animation
- [x] Add projects viewer
- [x] Create toast system for copying email
- [x] Create modal system
- [ ] Add resume

## Overview

This is my portfolio site to showcase various projects I work on. It's written with vite + vue 3 + ts, and deployed on Netlify. Most things are written from scratch, however I do use a few libraries. `fitty` is used to calculate the landing animation's current size, `floating-vue` for the tooltips, and `marked` + `highlight.js` for the markdown readmes.

While this project is open-source for the purpose of visibility, it was not created as a template for other people rip. If you choose to do that please at least change things up a good bit.

# CD

Any commit to `main` will trigger a new build on Netlify's platform, creating an easy CD pipeline. There is also a `develop` branch if I want to commit work w/o building.

## Icons

I'm currently transitioning from a cusom half-baked icon solution to Fontawesome's free set. Eventually all icons that aren't language images will be moved over.
