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

    // 2. Animate the sidebar progress bar
    const progressBar = document.querySelector('.progress-bar-fill');
    if (progressBar) {
        const finalWidth = progressBar.style.width;
        progressBar.style.width = '0%';
        progressBar.style.transition = 'width 1s ease-in-out';
        setTimeout(() => {
            progressBar.style.width = finalWidth;
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

    // 4. Hover effect on lesson cards
    const lessonCards = document.querySelectorAll('.lesson-card');
    lessonCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hovered');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hovered');
        });
    });

});


 function redi(){
        window.location.href = '/lsn';
    }

