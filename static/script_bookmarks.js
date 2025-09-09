document.addEventListener("DOMContentLoaded", () => {
    
     // 1. Highlight the current nav link
    const navLinks = document.querySelectorAll('.options .option-item');
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // 2. Optional: Handle clicking on bookmark items (e.g., unbookmark feature)
    const bookmarkItems = document.querySelectorAll(".bookmark-item");

    bookmarkItems.forEach(item => {
        item.addEventListener("click", () => {
            // Example: log which lesson was clicked
            const title = item.querySelector("h4")?.textContent || "Unknown Lesson";
            console.log(`Bookmarked item clicked: ${title}`);
            // Optionally remove the item:
            // item.remove();
        });
    });
});
