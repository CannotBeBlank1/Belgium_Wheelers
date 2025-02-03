
document.addEventListener('DOMContentLoaded', function() {
    console.log('Bienvenue sur le site de Belgium Wheelers ASBL');

    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });

    // Code pour la bannière d'images
    const bannerImages = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Ajouter les URLs des images
    let currentImageIndex = 0;
    const banner = document.querySelector('.banner');

    function changeBannerImage() {
        banner.style.backgroundImage = `url(${bannerImages[currentImageIndex]})`;
        currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
    }

    setInterval(changeBannerImage, 3000); // Changer l'image toutes les 3 secondes
});
