document.addEventListener('DOMContentLoaded', () => {

    // 1. Highlight the current nav link
    const navLinks = document.querySelectorAll('.options .option-item');
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // 2. Animate progress bar
    const progressBar = document.querySelector('.progress-bar-fill');
    if (progressBar) {
        const targetWidth = progressBar.style.width;
        progressBar.style.width = '0%';
        progressBar.style.transition = 'width 1s ease-in-out';
        setTimeout(() => {
            progressBar.style.width = targetWidth;
        }, 300);
    }

    // 3. Hover effect on profile picture
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        profilePic.addEventListener('mouseenter', () => {
            profilePic.style.transform = 'scale(1.05) rotate(3deg)';
            profilePic.style.transition = 'transform 0.3s ease';
        });
        profilePic.addEventListener('mouseleave', () => {
            profilePic.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // 4. Quiz Logic

    const quizData = {
        kinematics: [
            {
                question: "What is the study of motion without considering its causes?",
                options: ["Dynamics", "Statics", "Kinematics", "Thermodynamics"],
                answer: "Kinematics"
            },
            {
                question: "Which of the following is a scalar quantity?",
                options: ["Velocity", "Displacement", "Acceleration", "Speed"],
                answer: "Speed"
            }
        ],
        biology: [
            {
                question: "What is the powerhouse of the cell?",
                options: ["Nucleus", "Mitochondria", "Ribosome", "Cytoplasm"],
                answer: "Mitochondria"
            }
        ],
        calculus: [
            {
                question: "What is the integral of x^2?",
                options: ["2x", "x^3/3", "x^3", "x"],
                answer: "x^3/3"
            }
        ],
        computers: [
            {
                question: "Which component is considered the 'brain' of the computer?",
                options: ["RAM", "Motherboard", "CPU", "Hard Drive"],
                answer: "CPU"
            }
        ]
    };

    const quizList = document.querySelector('.quiz-list');
    const quizContainer = document.getElementById('quiz-container');
    const quizResults = document.getElementById('quiz-results');
    const quizQuestions = document.getElementById('quiz-questions');
    const quizTitle = document.getElementById('quiz-title');
    const submitBtn = document.getElementById('submit-quiz-btn');
    const finalScoreEl = document.getElementById('final-score');
    const totalQuestionsEl = document.getElementById('total-questions');
    const retakeBtn = document.getElementById('retake-quiz-btn');
    const backBtn = document.getElementById('back-to-quizzes-btn');

    let currentQuiz = [];
    let selectedAnswers = {};

    // Load quiz on button click
    document.querySelectorAll('.start-quiz-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const quizId = e.target.closest('.quiz-item').dataset.quiz;
            currentQuiz = quizData[quizId];
            selectedAnswers = {};

            quizTitle.textContent = quizId.charAt(0).toUpperCase() + quizId.slice(1) + " Quiz";

            renderQuiz(currentQuiz);
            quizList.parentElement.style.display = 'none';
            quizContainer.style.display = 'block';
            quizResults.style.display = 'none';
        });
    });

    function renderQuiz(quiz) {
        quizQuestions.innerHTML = '';

        quiz.forEach((q, index) => {
            const card = document.createElement('div');
            card.classList.add('question-card');
            card.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                <ul class="options-list">
                    ${q.options.map(option => `<li data-option="${option}">${option}</li>`).join('')}
                </ul>
            `;
            quizQuestions.appendChild(card);
        });

        // Add click events to options
        document.querySelectorAll('.options-list li').forEach(option => {
            option.addEventListener('click', (e) => {
                const selected = e.target;
                const list = selected.closest('.options-list');
                const questionIndex = Array.from(quizQuestions.children).indexOf(selected.closest('.question-card'));

                list.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
                selected.classList.add('selected');

                selectedAnswers[questionIndex] = selected.dataset.option;
            });
        });
    }

    // Submit Quiz
    submitBtn.addEventListener('click', () => {
        let score = 0;

        currentQuiz.forEach((q, index) => {
            const userAnswer = selectedAnswers[index];
            const correctAnswer = q.answer;

            const options = quizQuestions.children[index].querySelectorAll('li');
            options.forEach(option => {
                option.style.pointerEvents = 'none';
                if (option.dataset.option === correctAnswer) {
                    option.classList.add('correct');
                }
                if (option.dataset.option === userAnswer && userAnswer !== correctAnswer) {
                    option.classList.add('incorrect');
                }
            });

            if (userAnswer === correctAnswer) {
                score++;
            }
        });

        finalScoreEl.textContent = score;
        totalQuestionsEl.textContent = currentQuiz.length;

        quizContainer.style.display = 'none';
        quizResults.style.display = 'block';
    });

    // Retake Quiz
    retakeBtn.addEventListener('click', () => {
        selectedAnswers = {};
        renderQuiz(currentQuiz);
        quizContainer.style.display = 'block';
        quizResults.style.display = 'none';
    });

    // Back to quiz list
    backBtn.addEventListener('click', () => {
        quizList.parentElement.style.display = 'block';
        quizContainer.style.display = 'none';
        quizResults.style.display = 'none';
    });

});
