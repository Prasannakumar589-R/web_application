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

    // ---------------------------
    // 2. Animate sidebar progress bar
    // ---------------------------
    const progressBar = document.querySelector('.progress-bar-fill');
    if (progressBar) {
        const targetWidth = progressBar.style.width;
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.transition = 'width 1s ease';
            progressBar.style.width = targetWidth;
        }, 300);
    }

    fetch('/get_achievements')
    .then(res => res.json())
    .then(data => {
        if (data.error) {
        console.error(data.error);
        return;
        }

        // Update badges and quizzes
        document.querySelector('.stat-card:nth-child(1) p').innerText = data.badges_earned;
        document.querySelector('.stat-card:nth-child(2) p').innerText = data.quizzes_passed;

        // Update chart bars
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const bars = document.querySelectorAll('.chart-bar');
        bars.forEach((bar, i) => {
        const height = data.daily_lessons[days[i]] + '%';
        bar.style.height = '0%';
        setTimeout(() => {
            bar.style.transition = 'height 0.8s ease';
            bar.style.height = height;
        }, 200 + i * 150);
        });

        // Update achievements list
        const list = document.querySelector('.achievements-list');
        list.innerHTML = '';
        data.achievements_list.forEach(title => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="badge-icon">🏅</span> ${title}`;
        list.appendChild(li);
        });
    });

});
