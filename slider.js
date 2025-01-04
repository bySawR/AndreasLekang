
        const slides = document.querySelector('.slides');
        const slide = document.querySelectorAll('.slide');
        const prev = document.querySelector('.prev');
        const next = document.querySelector('.next');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = lightbox.querySelector('img');
        const lightboxClose = document.querySelector('.lightbox-close');

        let index = 0;
        let isAnimating = false;

        function showSlide(i) {
            if (isAnimating) return;
            isAnimating = true;

            if (i >= slide.length) {
                // Append first slide at the end
                const firstSlide = slide[0].cloneNode(true);
                slides.appendChild(firstSlide);
                slides.style.transition = 'transform 0.5s ease-in-out';
                slides.style.transform = `translateX(-${slide.length * 100}%)`;

                setTimeout(() => {
                    slides.style.transition = 'none';
                    slides.style.transform = `translateX(0)`;
                    slides.removeChild(firstSlide);
                    isAnimating = false;
                }, 500);

                index = 0;
            } else if (i < 0) {
                // Prepend last slide at the beginning
                const lastSlide = slide[slide.length - 1].cloneNode(true);
                slides.style.transition = 'none';
                slides.style.transform = `translateX(-${slide.length * 100}%)`;
                slides.insertBefore(lastSlide, slide[0]);

                setTimeout(() => {
                    slides.style.transition = 'transform 0.5s ease-in-out';
                    slides.style.transform = `translateX(-${(slide.length - 1) * 100}%)`;
                }, 0);

                setTimeout(() => {
                    slides.style.transition = 'none';
                    slides.removeChild(lastSlide);
                    slides.style.transform = `translateX(-${(slide.length - 1) * 100}%)`;
                    isAnimating = false;
                }, 500);

                index = slide.length - 1;
            } else {
                index = i;
                slides.style.transition = 'transform 0.5s ease-in-out';
                slides.style.transform = `translateX(-${index * 100}%)`;

                setTimeout(() => {
                    isAnimating = false;
                }, 500);
            }
        }

        function nextSlide() {
            showSlide(index + 1);
        }

        next.addEventListener('click', nextSlide);
        prev.addEventListener('click', () => showSlide(index - 1));

        slide.forEach((s) => {
            s.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = s.querySelector('img').src;
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // Auto-play slider
        setInterval(nextSlide, 5000);

        showSlide(index);