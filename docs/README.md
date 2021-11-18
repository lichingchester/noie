# Template Base

The simple HTML template generator. :joy:

## Table of contents

- [Development](#development)
- [Features](#features)
  - [HTML](#html)
  - [Pages](#pages)
  - [Layouts](#layouts)
  - [Partials](#partials)
  - [Data](#data)
  - [Modules](#modules)
  - [SCSS](#scss)
- [Release Notes](#release-notes)

---

## Development

### Watch

```bash
npm run dev
```

watch files changes and live reload with browserSync

### Build

```bash
npm run build
```

build compiled files to client

---

## Features

### HTML

[https://ejs.co/]

- use `ejs template` to compile to html file
  - usually use the following tags
  - `<%-` to output component
  - `<%` 'Scriptlet' tag, for control-flow, no output
  - `<%=` Outputs the value into the template (HTML escaped)
  - `<%#` Comment tag, no execution, no output

### Pages

- All pages will store here and to be compiled to HTML file which is same name with the .ejs filename.
- There are already build three pages for initial project which are `index.ejs` (for index all pages), `components.ejs` (for all component demo and doc), `components-table.ejs` (for all table components, because of a lot of tables templates will be created in past projects)

### Layouts

- All layouts will store here and usually only one layout we will use here.
- `default.ejs` will templated the base html structure, you can add any external script link here or other function you want.

### Partials

- All partial will store here such as header footer or modals.
- `head.ejs` will store all meta tag, script tag, link tag and so on.

### Data

- `data/{filename}.json` will store all json data to reduce redundant code.
  #### Format
  `<%- data.{filename}.{key} %>`

### Modules

- Preinstalled Bootstrap(JS), GSAP, Hammer, jQuery, Swiper, VideoJS.
- All installed modules will auto compile into the `bundle.min.js` file
- Also, you can install new module you want.
  1. Create a folder and named it with format `{module name}-v{version}`
  2. Put the js and css inside the folder.
  3. The modules will be compiled into `bundle.min.(css|js)` files.

### SCSS

- All scss stored into `src/assets/scss` folder.
- `_variables.scss` can override Bootstrap variable to have customized style.
- `pages/{page}.scss` includes all specified pages style.
- `components/{component name}.scss` includes all components style.
- `main.scss` global style.
- `print.scss` print version style.
- `page-transition.scss` add page transition style here.

---

## Release Notes

### v2.3 `latest`

- add swiper i18n message for wcag
- fix app.js import twice

---

### v2.2

- installed `gulp-html-beautify` to format the HTML files

---

### v2.1

- remove bootstrap bundle css
- add bootstrap via npm, and added into `app.scss` for compiler
- remove redundant files such as `_bootstrap-override.scss`, `_colors.scss`, `_icons.scss` and `_page.scss`
- move style `buttons`, `footer`, `header` and `modals` into `scss/components` folder

---

### v2.0

- use gulp build website
- use babel to compile es6 to es5
- use postcss autoprefixer in css
- use sass to compile scss to css
- use ejs to compile .ejs to .html
- allow data.json to store large data

---

release v1.0
