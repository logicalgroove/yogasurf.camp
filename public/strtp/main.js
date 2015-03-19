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

  $('#modal1').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var plan = button.data('plan');
    var modal = $(this);
    modal.find('#plan').val(plan);
  })

  $('.btn-submit:not(.btn-disabled)').click(function() {
    var name = $('#name').val();
    var email = $('#email').val();
    var plan = $('#plan').val();
    var month = $('#month').val();
    var phone = $('#phone').val();
    var form_valid = true;
    var form_error = '';
    $('.form-group').removeClass('has-error');

    if (name == null || name == '') {
      form_valid = false;
      $('#name').parent().addClass('has-error');
    }

    if (phone == null || phone == '') {
      form_valid = false;
      $('#phone').parent().addClass('has-error');
    }

    if (email == null || email == '' || !validateEmail(email)) {
      form_valid = false;
      $('#email').parent().addClass('has-error');
    }

    if (form_valid) {
      $('.btn-submit').addClass('btn-disabled');
      $('.form-group').removeClass('has-error');
      $.ajax({
        type: 'POST',
        url: "http://readissimo.com/api/v1/submit_surf",
        //url: "http://showsofa.com:3003/api/v1/submit_surf",
        crossDomain: true,
        dataType: 'json',
        data: { surfer: {name: name, email: email, plan: plan, phone: phone, month: month} },
        success: function( data ) {
          $('.submit_form').hide();
          $('.thanks').removeClass('hidden');
          $('.modal-footer').hide();
        }
      });
    }
  })

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


});
