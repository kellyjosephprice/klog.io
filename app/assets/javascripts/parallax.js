// http://code.tutsplus.com/tutorials/simple-parallax-scrolling-technique--net-27641
$(document).ready(function () {

  $window = $(window);

  $('section[data-type="background"]').each(function () {
    var $bgobj = $(this);

    $window.scroll(function () {
      var yPos = -($window.srollTop() / $bgobj.data('speed'));

      var coords = '50% ' + yPos + 'px';

      $bgobj.css({ backgroundPosition: coords });
    };
  });
});
