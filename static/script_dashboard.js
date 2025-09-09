document.addEventListener('DOMContentLoaded', () => {
    // 1. Highlight the active navigation link based on the current page URL
    const navLinks = document.querySelectorAll('.options .option-item');
    const currentPath = window.location.pathname.split('/').pop(); // e.g., "dashboard.html"

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active'); // Add a CSS class for styling the active link
        }
    });

    // 2. Animate the sidebar progress bar
    const progressBar = document.querySelector('.progress-bar-fill');
    if (progressBar) {
        const targetWidth = progressBar.style.width;
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.transition = 'width 1s ease-in-out';
            progressBar.style.width = targetWidth;
        }, 300);
    }

    // 3. Add hover effect to profile picture
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

    // 4. Optional: You can add card hover effects here
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02)';
            card.style.transition = 'transform 0.2s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
});
