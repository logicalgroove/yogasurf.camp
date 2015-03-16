$(function () {
  $('.header-9-sub').css('min-height', $(window).height());
  $('.header-9-sub .background').parallax('20%', 0.3, true)
  $('.header-18 .background').parallax('50%', 0.3, true)
  $('.content-23').each(function(){
    $(this).parallax('50%', 0.3, true);
  });

  $('.faq h3').click(function(){
    $(this).next('.answer').toggle();
  })

  function scrollToAnchor(e){
    var hash = $(e.currentTarget).attr('href').split('#')[1];
    var aTag = $("#"+hash);
    $('html,body').animate({scrollTop: aTag.offset().top - 80},'slow');
    history.pushState({}, hash, '#'+hash);
  }

  $('.header-10 .navbar .nav > li a').click(function(e){
    scrollToAnchor(e);
    e.preventDefault();
  });

  var scrolled = true;

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scrolled) {
      if (scroll >= $(window).height() - 80) {
        $('.navbar').addClass('navbar-fixed-top');
        $('.header-10').css('position', 'fixed').addClass('fake-header');
        startupKit.uiKitHeader._inFixedMode('.header-10');
        scrolled = false;
      }
    }
    if (scroll <= $(window).height()) {
      $('.navbar').removeClass('navbar-fixed-top');
      $('.header-10').css('position', 'relative').removeClass('fake-header');
      startupKit.uiKitHeader._inFixedMode('');
      scrolled = true;
      $('.fake-wrapper-header').remove();
      $('.header-antiflicker').remove();
    }
  });

});
