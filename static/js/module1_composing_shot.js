$(document).ready(function () {
    $('.full-details summary').on('click', function (e) {
      const parent = $(this).parent();

      // Collapse all others
      $('.full-details').not(parent).removeAttr('open');
    });
  });