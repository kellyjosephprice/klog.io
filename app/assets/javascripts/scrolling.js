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
        offset: -100,
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
    var $anchors = $('.parallax');
    var windowHeight = $(window).height();
    var tooSmall = false;

    $anchors.each(function (index, obj) {
      var contentHeight = $(this).next('section').height();
      var parallaxHeight = windowHeight - 100 - contentHeight;

      if (parallaxHeight > 400) parallaxHeight = 400;
      if (parallaxHeight < 100) parallaxHeight = 100;
      if (contentHeight > windowHeight - 200) tooSmall = true;

      $(obj).css({
        height: parallaxHeight + "px"
      });
    });

    $('body').css({ overflow: (tooSmall) ? "auto" : "hidden" });
  };

  $('body').css({ overflow: "hidden" });
  $(window).mousewheel(handleScroll);
  $(window).resize(handleResize);
  $('a').smoothScroll({
    offset: -100
  });

  handleResize();
});
