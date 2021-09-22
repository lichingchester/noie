/**
 * Global functions
 * ---------------------
 */

document.addEventListener("DOMContentLoaded", () => {
  $("body").addClass("loaded");
});

$(() => {
  /**
   * set vh to fit 100% height for ios
   *
   * in css, you can set (var(--vh, 1vh) * 100) to present 100vh
   */
  function fitVH() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", vh + "px");
  }

  // init
  fitVH();

  // on resize event
  $(window).resize(() => {
    fitVH();
  });
});

// ####################
