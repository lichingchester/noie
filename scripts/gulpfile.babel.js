/**
 * build js using gulp
 *
 * TODO: remove .map file before send to CG
 */

import gulp from "gulp";
import gulpLoadPlugins from "gulp-load-plugins";
import autoprefixer from "autoprefixer";
import browserSync from "browser-sync";
import del from "del";
import minimist from "minimist";

import ejs from "./ejs-compiler.js";

const reload = browserSync.reload;
const $ = gulpLoadPlugins();

// check if production
let isProd = minimist(process.argv.slice(2)).env === "production";

const SOURCE = {
  // all assets path, eg. images, videos, fonts
  assets: "../src/web/**/*",

  // all js
  js: "../src/assets/js/*.js",

  // app.scss will import all other scss files
  scss: "../src/assets/scss/app.scss",

  // all downloaded modules such as bootstrap, jquery, etc.
  vendor: {
    css: "../src/assets/modules/**/*.css",
    js: "../src/assets/modules/**/*.js",
  },

  // all ejs template
  ejs: {
    layouts: "../src/layouts/*.ejs",
    pages: "../src/pages/*.ejs",
  },

  // all watch files by task
  watch: {
    html: "../src/**/*.@(ejs|html|json)",
    scss: "../src/assets/scss/**/*.scss",
    js: "../src/assets/js/*.js",
    bundle: "../src/assets/modules/**/*.@(css|js)",
    assets: "../src/web",
  },
};

const DEST = {
  default: "../dist",
  html: "../dist/*.html",
  assets: "../dist/web",
  assetsClean: ["!../dist/web/js", "!../dist/web/css", "!../dist/web/vendor"],
  js: "../dist/web/js",
  css: "../dist/web/css",
  vendor: "../dist/web/vendor",
};

/**
 * delete dist folder first
 */
const clean = () => del(DEST.default, { force: true });

/**
 * delete specific folder
 */
const cleanHTML = () => del(DEST.html, { force: true });
const cleanCSS = () => del(DEST.css, { force: true });
const cleanJS = () => del(DEST.js, { force: true });
const cleanVendor = () => del(DEST.vendor, { force: true });
const cleanAssets = () => del(DEST.assetsClean, { force: true });

/**
 * copy assets file
 */
const assets = () => gulp.src(SOURCE.assets).pipe(gulp.dest(DEST.assets));

/**
 * compile scss file with expanded and minify version
 */
const sass = () => {
  return gulp
    .src(SOURCE.scss)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass({
        outputStyle: "expanded",
      })
    )
    .pipe($.postcss([autoprefixer()]))
    .pipe(gulp.dest(DEST.css))
    .pipe($.cleanCss())
    .pipe($.rename({ extname: ".min.css" }))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(DEST.css))
    .pipe(browserSync.stream());
};

/**
 * bundle css file
 */
const bundleCSS = () => {
  return gulp.src(SOURCE.vendor.css).pipe($.plumber()).pipe($.sourcemaps.init()).pipe($.concat("bundle.min.css")).pipe($.sourcemaps.write(".")).pipe(gulp.dest(DEST.vendor)).pipe(browserSync.stream());
};

/**
 * compile es6 js to es5
 */
const babelJS = () => {
  return gulp
    .src(SOURCE.js)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(
      $.babel({
        presets: ["@babel/env"],
      })
    )
    .pipe($.concat("app.js"))
    .pipe(gulp.dest(DEST.js))
    .pipe(
      $.uglify({
        compress: {
          drop_console: true,
        },
      })
    )
    .pipe($.rename({ extname: ".min.js" }))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(DEST.js))
    .pipe(browserSync.stream());
};

/**
 * bundle js file
 */
const bundleJS = () => {
  return gulp
    .src(SOURCE.vendor.js)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.order(["jquery-*/**/*.js", "hammer-*/**/*.js", "bootstrap-*/**/*.js"]))
    .pipe($.concat("bundle.min.js"))
    .pipe($.sourcemaps.write("."))
    .pipe(gulp.dest(DEST.vendor))
    .pipe(browserSync.stream());
};

/**
 * compile ejs template and reload the browser
 * @param {Function} cb callback function
 */
const html = (cb) => {
  ejs(isProd);
  reload();
  cb();
};

/**
 * create locale server target to dist folder
 */
const browser = () => {
  browserSync.init({
    server: {
      baseDir: "../dist",
      reloadDebounce: 2000,
    },
  });
};

/**
 * watch file changes
 */
const watch = () => {
  gulp.watch(SOURCE.watch.html, gulp.series(cleanHTML, html));
  gulp.watch(SOURCE.watch.scss, gulp.series(cleanCSS, sass));
  gulp.watch(SOURCE.watch.js, gulp.series(cleanJS, babelJS));
  gulp.watch(SOURCE.watch.bundle, gulp.series(cleanVendor, gulp.parallel(bundleCSS, bundleJS)));
  gulp.watch(SOURCE.watch.assets, gulp.series(cleanAssets, assets));
};

/**
 * npm run dev tasks
 */
exports.dev = gulp.series(gulp.series(clean, assets), gulp.parallel(html, sass, bundleCSS, babelJS, bundleJS), gulp.parallel(watch, browser));

/**
 * npm run build tasks
 */
exports.build = gulp.series(clean, assets, html, sass, bundleCSS, babelJS, bundleJS);
