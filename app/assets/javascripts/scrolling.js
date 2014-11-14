$(document).ready(function () {

  var activeNavIndex = function (selector) {
    var $navs = $(selector);
    var activeIndex = 0;

    $navs.each(function (index, obj) {
      if ($(obj).hasClass('active')) activeIndex = index;
    });

    return activeIndex;
  };

  var nextNav = function (deltaY, selector) {
    var index = activeNavIndex(selector);

    var newNavSelector = selector + ":nth-child(" + (index - deltaY + 1) + ")";
    var $link = $(newNavSelector + " a");

    if ($link.length === 0) {
      return undefined;
    } else {
      var $anchor = $($link.attr('href'));
      return $anchor;
    }
  };

  var scrolling = false;
  var handleScroll = function (event) {
    if (scrolling) return;
    scrolling = true;

    var $target = nextNav(event.deltaY, "#navbar-pagelinks li");

    if ($target !== undefined) {
      $.smoothScroll({
        scrollTarget: $target,
        afterScroll: function () {
          scrolling = false;
        }
      });
    } else {
      scrolling = false;
    }
  };

  var handleResize = function (event) {
    var height = $(window).height();
    var $anchors = $('.parallax .smooth-scroll');
    var bottom = 176;

    $anchors.each(function (index, obj) {
      $(obj).css({
        top: "auto",
        bottom: "176px"
      });
    });
  };

  $('body').css({ overflow: "hidden" });
  $(window).mousewheel(handleScroll);
  $(window).resize(handleResize);
  $('a').smoothScroll();
});
