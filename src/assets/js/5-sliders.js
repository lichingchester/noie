/**
 * sliders
 * --------------------
 */

$(() => {
  function initSliders() {
    // loop available slide component
    $.map($(".js-component-slider"), function (slider) {
      // init swiper js
      const swiper = new Swiper($(slider).find(".js-swiper-container"));
    });
  }

  initSliders();
});

// ####################
