$(document).ready(function() {
    
    // Handle button selection
    $(".lesson-button").click(function () {
        $('#check').prop('disabled', false);
        $(".lesson-button").removeClass("selected");
        $(this).addClass("selected");
    });

    // Handle Begin button click
    $("#check").click(function () {
    const selected = $(".lesson-button.selected").data("info");
    if (selected === 1) {
        $('#feedback-title').text('Correct!').css('color', 'green').show();
        $('#feedback-info').text("A film photo may be overexposed if the highlights are blown out with no detail, the overall image looks too bright, shadows appear faded or gray, and contrast is low. Colors may seem washed out or unnatural and the image can feel hazy or flat.");
        $('#check').hide();
        $('#next').show();
    } else if (selected === 2) {
        $('#feedback-title').text('Not quite.').css('color', 'orange').show();
    } else if (selected === 3) {
        $('#feedback-title').text('Not quite.').css('color', 'orange').show();
    }
    });
});