$(document).ready(function () {
    $('.dot').on('click', function () {
      // Remove 'active' from all, add to clicked one
      $('.dot').removeClass('clicked');
      $(this).addClass('clicked');
  
      // Update the info pane
      $('#control-name').text($(this).data('name'));

      const imageName = $(this).data('img'); // e.g., "shutter-dial.jpg"
      const imagePath = '/static/' + imageName; // adjust path as needed
      $('#control-image').empty().append(`<img src="${imagePath}" style="max-width:50%">`);


      const htmlContent = $(this).attr('data-info');
      $('#control-info').html(htmlContent); 
    });
  });
  