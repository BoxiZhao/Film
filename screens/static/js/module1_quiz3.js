$(document).ready(function () {
    $('.dot').on('click', function () {
        $('#check').prop('disabled', false);
      // Remove 'active' from all, add to clicked one
      $('.dot').removeClass('clicked');
      $(this).addClass('clicked');
    });

    // Handle Begin button click
    $("#check").click(function () {
        const selected = $(".dot.clicked").data("name");
        if (selected == "Aperture Ring" || selected == "Dial") {
            $('#feedback-title').text('Correct!').css('color', 'green').show();
            $('#feedback-info').text("To fix overexposure, you can use a smaller aperture or use a faster shutter speed.");
            $('#check').hide();
            $('#next').show();
        } else {
            $('#feedback-title').text('Not quite.').css('color', 'orange').show();
            $('#feedback-info').text("Overexposure can be controlled by adjusting the aperture or using a faster shutter speed.");
        } 
        });

  });