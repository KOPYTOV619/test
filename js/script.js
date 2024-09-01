(function() {
    let currentWidth = window.innerWidth;
    let debounceTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(function() {
            const newWidth = window.innerWidth;
            if (Math.abs(newWidth - currentWidth) > 250) {
                currentWidth = newWidth;
                location.reload();
            }
        }, 500);
    });
})();

document.addEventListener('DOMContentLoaded', function () {
    const carouselElement = document.querySelector('#card-carousel');
    if (carouselElement) {
        const splideConfig = {
            type: 'slide',
            perPage: 4,
            gap: 24,
            autoplay: false,
            drag: false,
            pagination: false,
            perMove: 1,
            arrows: false,
            breakpoints: {
                460: { drag: false, perPage: 1 },
                768: { drag: false, perPage: 2 },
                1024: { drag: false, perPage: 2, gap: 10, },
            },
        };

        const splide = new Splide(carouselElement, splideConfig).mount();

        const prevButton = document.getElementById('prev-slide');
        const nextButton = document.getElementById('next-slide');

        function updateButtons() {
            const currentSlide = splide.index;
            const totalSlides = splide.Components.Slides.getLength() - splide.options.perPage;

            if (currentSlide === 0) {
                prevButton.classList.add('slider-button-inactive');
            } else {
                prevButton.classList.remove('slider-button-inactive');
            }

            if (currentSlide >= totalSlides) {
                nextButton.classList.add('slider-button-inactive');
            } else {
                nextButton.classList.remove('slider-button-inactive');
            }
        }

        document.addEventListener('click', function(event) {
            if (event.target.closest('#prev-slide')) {
                splide.go('<');
            } else if (event.target.closest('#next-slide')) {
                splide.go('>');
            }
            updateButtons();
        });

        splide.on('mounted move', updateButtons);
        updateButtons();
    }
});


