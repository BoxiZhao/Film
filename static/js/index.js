$(document).ready(function() {
    
    //PHOTO ROTATOR

    const photos = window.photoData;  // this comes from a global variable injected via Jinja
    let index = 0;

    function showPhoto() {
        const photo = photos[index];
        $('#gallery-img').attr('src', photo.url);
        $('#photographer').text(photo.photographer);
        $('#img-title').text(photo.title);
        $('#img-location').text(photo.location);
        $('#img-equipment').text(photo.equipment);
        index = (index + 1) % photos.length;
    }

    showPhoto(); // display first image
    setInterval(showPhoto, 20000); // rotate every 5 seconds



    //SELECTING MODULE


    $(".lesson-button").first().addClass("selected");

    // Handle button selection
    $(".lesson-button").click(function () {
    $(".lesson-button").removeClass("selected");
    $(this).addClass("selected");
    });

    // Handle Begin button click
    $(".begin-button").click(function () {
    const selected = $(".lesson-button.selected").data("lesson");
    if (selected === 1) {
        window.location.href = "/module1";
    } else if (selected === 2) {
        window.location.href = "/module2";
    }
    });
});
