// Main JavaScript (jQuery) for client‑side interactions
$(function () {

    // Landing page: rotate photo every minute
    function updatePhoto () {
        $.getJSON('/next_photo', function (data) {
            $('.landing-wrapper').css('background-image', 'url(' + data.file + ')');
            $('#photo-caption').text(data.caption);
            $('#photo-metadata').text(data.location);
            $('#photo-film').text(data.film);
        });
    }

    if ($('.landing-wrapper').length) {
        updatePhoto();              // initial
        setInterval(updatePhoto, 60000); // every minute
    }

    // "Begin" button on landing page
    $('#begin-btn').on('click', function (e) {
        e.preventDefault(); // Prevent any default form submission
        console.log('Begin button clicked');
        
        const moduleId = $('input[name="module-select"]:checked').val();
        console.log('Selected module:', moduleId);
        
        if (!moduleId) {
            console.error('No module selected');
            return;
        }
        
        const url = '/module/' + moduleId + '/';
        console.log('Redirecting to:', url);
        window.location.href = url;
    });

    // Handle sidebar chapter expansion
    $('.module-link').on('click', function(e) {
        e.preventDefault();
        const moduleId = $(this).attr('href').split('/')[2];
        const url = '/module/' + moduleId + '/';
        window.location.href = url;
    });

    // Handle sub-module link clicks
    $('.sub-module-link').on('click', function(e) {
        e.preventDefault();
        const href = $(this).attr('href');
        window.location.href = href;
    });
});
