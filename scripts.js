document.addEventListener('DOMContentLoaded', function() {
    console.log('Bienvenue sur le site de Belgium Wheelers ASBL');

    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        console.log('Hamburger menu clicked');
        navLinks.classList.toggle('nav-active');
    });

    const bannerImages = [
        'assets/images/Head-Green-1.png',
        'assets/images/Head-Mauve-1.png',
        'assets/images/Head-Orange-1.png',
        'assets/images/Head-Pink-1.png',
        'assets/images/Head-Yellow-1.png'
    ];
    let currentImageIndex = 0;
    const lowResBanner = document.getElementById('low-res-banner');
    const highResBanner = document.getElementById('high-res-banner');

    function changeBannerImage() {
        const nextImage = new Image();
        nextImage.src = bannerImages[currentImageIndex];
        nextImage.onload = () => {
            highResBanner.classList.remove('show');
            setTimeout(() => {
                highResBanner.src = nextImage.src;
                highResBanner.classList.add('show');
            }, 1000); // Augmenter le délai pour permettre une transition plus douce
        };
        currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
    }

    highResBanner.onload = function() {
        lowResBanner.style.opacity = '0';
        highResBanner.style.display = 'block'; // Assurez-vous que l'image haute résolution est visible
        setTimeout(() => {
            highResBanner.classList.add('show');
            setInterval(changeBannerImage, 12000); // Changer l'image toutes les 12 secondes
        }, 1000); // Délai pour démarrer la transition d'opacité
    };

    highResBanner.src = bannerImages[currentImageIndex]; // Charger la première image haute résolution

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
                try {
                    var translations = JSON.parse(xhr.responseText);
                    applyTranslations(translations);
                } catch (e) {
                    console.error("JSON parsing error: ", e);
                }
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
