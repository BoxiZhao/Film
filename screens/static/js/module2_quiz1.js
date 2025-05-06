document.addEventListener('DOMContentLoaded', function() {
    const stepsContainer = document.querySelector('.steps-container');
    const steps = document.querySelectorAll('.step');
    const checkButton = document.querySelector('.check-answer');
    const feedback = document.querySelector('.quiz-feedback');

    // Correct order of steps
    const correctOrder = [
        'Load the film',
        'Development',
        'Wash (Stopping)',
        'Fixing',
        'Wash and Dry'
    ];

    // Shuffle steps on page load
    const stepsArray = Array.from(steps);
    for (let i = stepsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        stepsContainer.appendChild(stepsArray[j]);
    }

    let draggedStep = null;
    let touchStartX = 0;

    // Make steps draggable
    steps.forEach(step => {
        step.setAttribute('draggable', true);
        
        // Mouse events
        step.addEventListener('dragstart', (e) => {
            draggedStep = step;
            step.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });

        step.addEventListener('dragend', () => {
            draggedStep = null;
            step.classList.remove('dragging');
        });

        // Touch events
        step.addEventListener('touchstart', (e) => {
            draggedStep = step;
            touchStartX = e.touches[0].clientX;
            step.classList.add('dragging');
        });

        step.addEventListener('touchend', () => {
            draggedStep = null;
            step.classList.remove('dragging');
        });

        step.addEventListener('touchmove', (e) => {
            if (!draggedStep) return;
            e.preventDefault();
            const touch = e.touches[0];
            const touchX = touch.clientX;
            
            const siblings = [...stepsContainer.querySelectorAll('.step:not(.dragging)')];
            const nextSibling = siblings.find(sibling => {
                const box = sibling.getBoundingClientRect();
                return touchX < box.left + box.width / 2;
            });

            if (nextSibling) {
                stepsContainer.insertBefore(draggedStep, nextSibling);
            } else {
                stepsContainer.appendChild(draggedStep);
            }
            
            touchStartX = touchX;
        });
    });

    // Handle drag and drop
    stepsContainer.addEventListener('dragover', e => {
        e.preventDefault();
        if (!draggedStep) return;
        
        const siblings = [...stepsContainer.querySelectorAll('.step:not(.dragging)')];
        const nextSibling = siblings.find(sibling => {
            const box = sibling.getBoundingClientRect();
            const offset = e.clientX - box.left - box.width / 2;
            return offset < 0;
        });

        if (nextSibling) {
            stepsContainer.insertBefore(draggedStep, nextSibling);
        } else {
            stepsContainer.appendChild(draggedStep);
        }
    });

    // Check answer
    $('#check').on('click', function () {
        // Get current order of steps
        const currentSteps = $('.step');
        const currentOrder = currentSteps.map(function () {
            return $(this).find('.step-text').text().trim();
        }).get(); // Converts jQuery object to plain array
    
        // Compare arrays
        const isCorrect = currentOrder.length === correctOrder.length &&
                          currentOrder.every(function (step, index) {
                              return step === correctOrder[index];
                          });
    
        // Update feedback
        if(isCorrect){
            $('#feedback').text('Correct! You have successfully ordered the film development steps.').show();
            $('#check').hide();
            $('#next').show();
        }
        else{
            $('#feedback').text('Not quite. Please try again to get the correct order.').show();
        }
    });
    
}); 