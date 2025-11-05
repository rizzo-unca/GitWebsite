// Dynamic Navbar Loading
async function loadNavbar() {
    const container = document.getElementById("navbar-container");
    if (!container) return;
    const response = await fetch("navbar.html");
    const html = await response.text();
    container.innerHTML = html;
    adjustBodyPadding(); // Call after loading
}

// Adjust Body Padding based on navbar height
function adjustBodyPadding() {
    const nav = document.querySelector('.topnav');
    if (!nav) return; // for safety?
    const navHeight = nav.offsetHeight;
    document.body.style.paddingTop = navHeight + 'px';
}

// Run on load & resize
window.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
});
window.addEventListener('resize', adjustBodyPadding);