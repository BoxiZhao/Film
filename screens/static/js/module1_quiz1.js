$(document).ready(function () {
    let isDragging = false;
    let startX = 0, startY = 0;
    let imgX = 0, imgY = 0;
    let currentScale = 1;
    let currentRotation = 0;

  
    const $img = $('#image');
    const $frame = $('#frame');

    $('#check').on('click', function () {
        checkAnswer();
      });      
  
    // Center and scale the image to the frame on load
    $img.on('load', function () {
        const frameWidth = $frame.width();
        const frameHeight = $frame.height();
      
        $img.css({
          width: frameWidth + 'px',
          height: frameHeight + 'px'
        });
      
        const defaultScale = 137;
        const defaultRotation = 10;
      
        $('#scale').val(defaultScale);
        $('#scaleVal').val(defaultScale);
        $('#rotate').val(defaultRotation);
        $('#rotateVal').val(defaultRotation);
      
        currentScale = defaultScale / 100;
        currentRotation = defaultRotation;

        imgX = 50;
        imgY = 0;
      
        updateTransform();
      });
      
      // ✅ If image is already loaded (e.g., from cache), trigger it manually
      if ($img[0].complete) {
        $img.trigger('load');
      }
  
    // Click and hold to start dragging
    $img.on('mousedown', function (e) {
      e.preventDefault();
      isDragging = true;
      startX = e.pageX - imgX;
      startY = e.pageY - imgY;
      $img.css('cursor', 'grabbing');
    });
  
    // Move while dragging
    $(document).on('mousemove', function (e) {
      if (isDragging) {
        imgX = e.pageX - startX;
        imgY = e.pageY - startY;
        enableCheckButton();
        updateTransform();
      }
    });
  
    // Stop dragging
    $(document).on('mouseup', function () {
      if (isDragging) {
        isDragging = false;
        $img.css('cursor', 'grab');
      }
    });
  
    // Handle scaling and rotating
    $('#scale').on('input', function () {
        const val = $(this).val();
        $('#scaleVal').val(val);
        enableCheckButton();
        updateTransform();
      });
      
      $('#scaleVal').on('change', function () {
        let val = parseInt($(this).val());
        if (isNaN(val)) return;
        val = Math.max(50, Math.min(200, val)); // clamp
        $(this).val(val);
        $('#scale').val(val);
        updateTransform();
      });

      $('#scaleVal').on('keypress', function(e) {
        if (e.which === 13) { // Enter key
          $(this).trigger('change');
        }
      });      
      
      
  
      $('#rotate').on('input', function () {
        const val = $(this).val();
        $('#rotateVal').val(val);  // sync number box
        enableCheckButton();
        updateTransform();
      });
      
      $('#rotateVal').on('change', function () {
        let val = parseInt($(this).val());
        if (isNaN(val)) return;
        val = Math.max(-180, Math.min(180, val));
        $(this).val(val);
        $('#rotate').val(val);
        updateTransform();
      });
      
      $('#rotateVal').on('keypress', function (e) {
        if (e.which === 13) {
          $(this).trigger('change');
        }
      });
      
      
  
    function updateTransform() {
      const scale = $('#scale').val() / 100;
      const rotate = $('#rotate').val();
      $img.css('transform', `translate(${imgX}px, ${imgY}px) scale(${scale}) rotate(${rotate}deg)`);
    }

    function checkAnswer() {
        // Fixed anchor point defined in FRAME coordinates (as visual target)
        const targetX = 92;
        const targetY = 200;
        const tolerance = 30;
      
        // Anchor in IMAGE coordinates (relative to current size of image in frame)
        // Since we define target in frame space, we reverse transform the frame point
        // But it's easier to say: "where does the original anchor land *after transform*?"
        const anchorX = 92;
        const anchorY = 200;
      
        const scale = parseFloat($('#scale').val()) / 100;
        const rotation = parseFloat($('#rotate').val());
        const angle = rotation * Math.PI / 180;
      
        // Apply scale
        const scaledX = anchorX * scale;
        const scaledY = anchorY * scale;
      
        // Apply rotation around top-left
        const rotatedX = scaledX * Math.cos(angle) - scaledY * Math.sin(angle);
        const rotatedY = scaledX * Math.sin(angle) + scaledY * Math.cos(angle);
      
        // Apply drag translation
        const finalX = rotatedX + imgX;
        const finalY = rotatedY + imgY;
      
        // Check distance to original anchor
        const dx = finalX - targetX;
        const dy = finalY - targetY;
        const distance = Math.sqrt(dx * dx + dy * dy);
      
        const isCorrect = distance < tolerance;
      
        if (isCorrect) {
            $('.frame').removeClass('wrong');
            $('.frame').addClass('correct');
          $('#feedback-title').text('Correct!').css('color', 'green').show();
          $('#feedback-info').text("The natural “lines” in the photo are placed along gridlines. For example, the boundary between lake and land. Major sections are also placed largely within a column or row. For example, the tree and mountain in the left column.").show();
          $('#check').hide();
            $('#next').show();
        } else {
            $('.frame').removeClass('correct');
            $('.frame').addClass('wrong');
          $('#feedback-title').text('Not quite.').css('color', 'orange').show();
          $('#feedback-info').text("The natural “lines” in the photo are placed along gridlines. For example, the boundary between lake and land. Major sections are also placed largely within a column or row. For example, the tree and mountain in the left column.").show();
        }
      }

      let hasInteracted = false;

        function enableCheckButton() {
        if (!hasInteracted) {
            $('#check').prop('disabled', false);
            hasInteracted = true;
        }
        }



      
      
      
      
      
  });
  