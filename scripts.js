
document.addEventListener('DOMContentLoaded', function() {
    console.log('Bienvenue sur le site de Belgium Wheelers ASBL');

    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        console.log('Hamburger menu clicked');
        navLinks.classList.toggle('nav-active');
        console.log(navLinks.classList);
        console.log('nav-links classes:', navLinks.classList);
        console.log('nav-links left:', getComputedStyle(navLinks).left);

    });

    hamburger.addEventListener('click', () => {
    console.log('Hamburger menu clicked');
    navLinks.classList.toggle('nav-active');
    });

    // Code pour la bannière d'images
    const bannerImages = [
//        'assets/images/Head-Green-1.png',
        'assets/images/Head-Mauve-1.png',
        'assets/images/Head-Orange-1.png',
        'assets/images/Head-Pink-1.png',
        'assets/images/Head-Yellow-1.png'];
    let currentImageIndex = 0;

    //    const banner = document.querySelector('.banner');
    const lowResBanner = document.getElementById('low-res-banner');
    const highResBanner = document.getElementById('high-res-banner');

    
//    function changeBannerImage() {
//        banner.style.backgroundImage = `url(${bannerImages[currentImageIndex]})`;
//        currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
//    }

    function changeBannerImage() {
        highResBanner.src = bannerImages[currentImageIndex];
        currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
    }
    highResBanner.onload = function() {
        lowResBanner.style.display = 'none';
        highResBanner.style.display = 'block';
        setInterval(changeBannerImage, 9000); // Changer l'image toutes les 9 secondes
    };

    highResBanner.src = 'assets/images/Head-Green-1.png'; // Charger la première image haute résolution
//});

    // Charger le sélecteur de langue
    var languagePlaceholder = document.getElementById('language-selector-placeholder');
    var xhrLanguage = new XMLHttpRequest();
    xhrLanguage.open('GET', 'language-selector.html', true);
    xhrLanguage.onreadystatechange = function() {
        if (xhrLanguage.readyState === 4 && xhrLanguage.status === 200) {
            languagePlaceholder.innerHTML = xhrLanguage.responseText;

            var languageSelector = document.getElementById('language-selector');
            languageSelector.addEventListener('change', function() {
                var selectedLanguage = languageSelector.value;
                loadLanguageFile(selectedLanguage);
            });
        }
    };
    xhrLanguage.send();

    function loadLanguageFile(language) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'locales/' + language + '.json', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var translations = JSON.parse(xhr.responseText);
                applyTranslations(translations);
            }
        };
        xhr.send();
    }

    function applyTranslations(translations) {
        document.querySelectorAll('[data-translate-key]').forEach(function(element) {
            var key = element.getAttribute('data-translate-key');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });
    }
});
