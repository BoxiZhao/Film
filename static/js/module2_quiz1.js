document.addEventListener('DOMContentLoaded', function() {
    const stepsContainer = document.querySelector('.steps-container');
    const steps = document.querySelectorAll('.step');
    let draggedItem = null;
    let draggedIndex = -1;

    // 初始化拖拽
    steps.forEach((step, index) => {
        step.setAttribute('draggable', true);
        step.dataset.index = index;

        step.addEventListener('dragstart', function(e) {
            draggedItem = this;
            draggedIndex = parseInt(this.dataset.index);
            this.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });

        step.addEventListener('dragend', function() {
            this.classList.remove('dragging');
            steps.forEach(step => step.classList.remove('drag-over'));
        });

        step.addEventListener('dragover', function(e) {
            e.preventDefault();
            if (this !== draggedItem) {
                this.classList.add('drag-over');
            }
        });

        step.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });

        step.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            if (this !== draggedItem) {
                const dropIndex = parseInt(this.dataset.index);
                const allSteps = [...steps];
                
                // 移除被拖动的项
                allSteps.splice(draggedIndex, 1);
                // 在目标位置插入
                allSteps.splice(dropIndex, 0, draggedItem);
                
                // 更新DOM
                allSteps.forEach((step, index) => {
                    step.dataset.index = index;
                    stepsContainer.appendChild(step);
                });
            }
        });
    });

    // 检查按钮逻辑
    const checkButton = document.getElementById('check');
    const nextButton = document.getElementById('next');
    const feedback = document.getElementById('feedback');

    checkButton.addEventListener('click', function() {
        const currentOrder = [...steps].map(step => parseInt(step.dataset.step));
        const correctOrder = [1, 2, 3, 4, 5];
        
        const isCorrect = currentOrder.every((step, index) => step === correctOrder[index]);
        
        if (isCorrect) {
            feedback.className = 'quiz-feedback correct';
            feedback.textContent = 'Correct! The steps are in the right order.';
            checkButton.style.display = 'none';
            nextButton.style.display = 'flex';
        } else {
            feedback.className = 'quiz-feedback incorrect';
            feedback.textContent = 'Incorrect. Please try again.';
        }
    });
}); 