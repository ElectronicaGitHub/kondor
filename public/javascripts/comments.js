$(function () {
  if (localStorage.getItem('kndr_cmmnt_snd')) {
    $('.no-more-comments').show(0);
    $('#create_comment').hide(0);
    $('.form-group').hide(0);
  }

  $(document).on('click', '#create_comment', function (e) {

    e.preventDefault();
    
    var btn = $(this);
    var data = btn.closest('form').serialize();

    btn.attr('disabled', true);

    btn.html('<i class="fa fa-spinner fa-spin"></i>');

    $.post('/create_comment', data, function (err, ok) {
      btn.hide(0);
      $('.after-action').show(0);
      localStorage.setItem('kndr_cmmnt_snd', true);
    });
  });
});