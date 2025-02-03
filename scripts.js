
document.addEventListener('DOMContentLoaded', function() {
    console.log('Bienvenue sur le site de Belgium Wheelers ASBL');

    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });

    // Code pour la bannière d'images
    const bannerImages = [
        'assets/images/Head-Green-1.png',
        'assets/images/Head-Mauve-1.png',
        'assets/images/Head-Orange-1.png',
        'assets/images/Head-Pink-1.png',
        'assets/images/Head-Yellow-1.png'];
    let currentImageIndex = 0;
    const banner = document.querySelector('.banner');

    function changeBannerImage() {
        banner.style.backgroundImage = `url(https://cannotbeblank1.github.io/Belgium_Wheelers/${bannerImages[currentImageIndex]})`;
        currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
    }

    setInterval(changeBannerImage, 3000); // Changer l'image toutes les 3 secondes
});
