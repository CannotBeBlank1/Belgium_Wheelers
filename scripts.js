document.addEventListener('DOMContentLoaded', function() {
    console.log('Bienvenue sur le site de Belgium Wheelers ASBL');

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        console.log('Hamburger menu clicked');
        navLinks.classList.toggle('nav-active');
    });

    // Load the banner.html dynamically and initialize the banner
    fetch('banner.html').then(response => response.text()).then(data => {
        document.getElementById('banner-placeholder').innerHTML = data;
        loadBannerImages();
    });

    function loadBannerImages() {
        const bannerImages = [
            'assets/images/Head-Green-1.png',
            'assets/images/Head-Mauve-1.png',
            'assets/images/Head-Orange-1.png',
            'assets/images/Head-Pink-1.png',
            'assets/images/Head-Yellow-1.png'
        ];
        const highResContainer = document.getElementById('high-res-container');
        bannerImages.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.id = `high-res-banner-${index}`;
            img.classList.add('banner');
            img.style.display = 'none';
            img.onload = () => checkAllImagesLoaded();
            highResContainer.appendChild(img);
        });
    }

    function checkAllImagesLoaded() {
        const highResImages = document.querySelectorAll('#high-res-container img');
        const allLoaded = Array.from(highResImages).every(img => img.complete);
        if (allLoaded) {
            startImageTransition();
        }
    }

    function startImageTransition() {
        const lowResBanner = document.getElementById('low-res-banner');
        const highResContainer = document.getElementById('high-res-container');
        const highResImages = document.querySelectorAll('#high-res-container img');
        let currentImageIndex = 0;

        lowResBanner.style.opacity = '0';
        highResContainer.style.display = 'block';
        setInterval(() => {
            highResImages.forEach(img => img.style.display = 'none');
            highResImages[currentImageIndex].style.display = 'block';
            currentImageIndex = (currentImageIndex + 1) % highResImages.length;
        }, 40000); // Changer l'image toutes les 40 secondes
    }

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
