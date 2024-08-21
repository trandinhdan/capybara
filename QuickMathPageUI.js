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
        gifContainer.style.display = 'none';  // Hide GIFs initially
        console.log('New problem generated:', problemElement.textContent);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;

        if (parseInt(answerInput.value) === correctAnswer) {
            feedbackElement.textContent = 'Correct! Well done!';
            console.log('Correct answer. Playing sound and showing GIFs.');
            audio.play();  // Play the audio
            gifContainer.style.display = 'flex';  // Show the GIFs

            // After 5 seconds, hide the GIFs, stop the audio, and generate a new problem
            setTimeout(() => {
                console.log('5 seconds passed. Stopping sound and generating new problem.');
                audio.pause();
                audio.currentTime = 0;
                generateProblem();  // Generate a new problem
            }, 10000);  // 5 seconds
        } else {
            feedbackElement.textContent = `Oops! The answer was incorrect.`;
            console.log('Incorrect answer. Feedback:', feedbackElement.textContent);
        }
    });

    generateProblem();  // Initial problem generation
});
