// Dynamic Navbar Loading
async function loadNavbar() {
    const container = document.getElementById("navbar-container");
    if (!container) return;
    try {
        const response = await fetch("navbar.html");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const html = await response.text();
        container.innerHTML = html;

        // Get current page and current theme
        const currentPage = window.location.pathname.split("/").pop();
        const params = new URLSearchParams(window.location.search);
        const currentTheme = params.get("theme");

        // Loop through all links in navbar
        const links = container.querySelectorAll("a");
        links.forEach(link => {
            const linkUrl = new URL(link.href, window.location.origin);
            const linkPage = linkUrl.pathname.split("/").pop();

            // Highlight the current page
            if (linkPage === currentPage) {
                link.classList.add("current");
            }

            // Preserve the theme in all navbar links
            if (currentTheme) {
                linkUrl.searchParams.set("theme", currentTheme);
                link.href = linkUrl.toString();
            }
        });

        adjustBodyPadding(); // Call after loading
    } catch (err) {
        console.error("Error loading navbar:", err);
    }
}

// Adjust body padding based on navbar height
function adjustBodyPadding() {
    const nav = document.querySelector('.topnav');
    if (!nav) return;
    const navHeight = nav.offsetHeight;
    document.body.style.paddingTop = navHeight + 'px';
}

// Run on page load and resize
window.addEventListener('DOMContentLoaded', () => loadNavbar());
window.addEventListener('resize', adjustBodyPadding);
