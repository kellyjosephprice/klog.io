$(document).ready(function () {

  var activeNavIndex = function (selector) {
    var $navs = $(selector);
    var activeIndex = 0;

    $navs.each(function (index, obj) {
      if ($(obj).hasClass('active')) activeIndex = index;
    });

    return activeIndex;
  };

  var anchorOffset = function (deltaY, selector) {
    var index = activeNavIndex(selector);

    var newNavSelector = selector + ":nth-child(" + (index - deltaY + 1) + ")";
    var $link = $(newNavSelector + " a");

    if ($link.length === 0) {
      return undefined;
    } else {
      var $anchor = $($link.attr('href'));
      return $anchor.offset().top;
    }
  };

  var scrolling = false;
  var handleScroll = function (event) {
    if (scrolling) return;
    scrolling = true;

    var offset = anchorOffset(event.deltaY, "#navbar-pagelinks li");

    if (offset !== undefined) {
      $('body').animate({
        scrollTop: offset
      }, {
        duration: 500,
        complete: function () {
          scrolling = false;
        }
      });
    } else {
      scrolling = false;
    }
  };

  $('body').css({ overflow: "hidden" });
  $(window).mousewheel(handleScroll);

});
