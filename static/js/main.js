
// Main JavaScript (jQuery) for client‑side interactions
$(function () {

    // Landing page: rotate photo every minute
    function updatePhoto () {
        $.getJSON('/next_photo', function (data) {
            $('#landing-photo').attr('src', data.file);
            $('#photo-caption').text(data.caption);
            $('#photo-metadata').text(data.location + ' | Film: ' + data.film);
        });
    }

    if ($('#landing-photo').length) {
        updatePhoto();              // initial
        setInterval(updatePhoto, 60000); // every minute
    }

    // "Begin" button on landing page
    $('#begin-btn').on('click', function () {
        const moduleId = $('input[name="module-select"]:checked').val();
        window.location.href = '/module/' + moduleId + '/';
    });
});
