/**
 * utils
 * --------------------
 */

window._utils = {
  debounce: function (func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  swiperI18n: () => {
    let prevSlideMessage = "Previous slide";
    let nextSlideMessage = "Next slide";
    let firstSlideMessage = "This is the first slide";
    let lastSlideMessage = "This is the last slide";
    let paginationBulletMessage = "Go to slide {{index}}";

    if ($("html").attr("lang") === "zh-hk") {
      prevSlideMessage = "上一個";
      nextSlideMessage = "下一個";
      firstSlideMessage = "這是第一個";
      lastSlideMessage = "這是最後一個";
      paginationBulletMessage = "轉到第 {{index}} 個";
    } else if ($("html").attr("lang") === "zh-cn") {
      prevSlideMessage = "上一个";
      nextSlideMessage = "下一个";
      firstSlideMessage = "这是第一个";
      lastSlideMessage = "这是最后一个";
      paginationBulletMessage = "转到第 {{index}} 个";
    }

    return {
      enabled: true,
      prevSlideMessage: prevSlideMessage,
      nextSlideMessage: nextSlideMessage,
      firstSlideMessage: firstSlideMessage,
      lastSlideMessage: lastSlideMessage,
      paginationBulletMessage: paginationBulletMessage,
    };
  },
};

// ####################
