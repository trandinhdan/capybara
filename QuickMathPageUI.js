document.addEventListener('DOMContentLoaded', () => {
    const problemElement = document.getElementById('problem');
    const feedbackElement = document.getElementById('feedback');
    const form = document.getElementById('mathForm');
    const answerInput = document.getElementById('answer');
    const audio = document.getElementById('audio');
    const gifContainer = document.getElementById('gifContainer');

    let num1 = 0;
    let num2 = 0;
    let operator = '+';

    const generateProblem = () => {
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * 10);

        if (num1 < num2) [num1, num2] = [num2, num1];

        operator = Math.random() > 0.5 ? '+' : '-';

        problemElement.textContent = `${num1} ${operator} ${num2} = ?`;
        answerInput.value = '';
        feedbackElement.textContent = '';
        gifContainer.style.display = 'none';
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;

        if (parseInt(answerInput.value) === correctAnswer) {
            feedbackElement.textContent = 'Correct! Well done!';
            audio.play();
            gifContainer.style.display = 'flex';

            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
                generateProblem();
            }, 10000); // 10 seconds
        } else {
            feedbackElement.textContent = `Oops! The correct answer was ${correctAnswer}.`;
        }
    });

    generateProblem();
});
