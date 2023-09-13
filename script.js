// Intersection Observer code
function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}

// Create an Intersection Observer
const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
});

// Add elements with the "fade-up" class to the observer
const fadeUpElements = document.querySelectorAll('.fade-up');
fadeUpElements.forEach((element) => {
    observer.observe(element);
});



function showSection(sectionId, scrollToProsjekter) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active-section');
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'block';

    // Update the URL hash fragment
    window.location.hash = sectionId;

    // Check if scrollToProsjekter is true, and scroll to the Prosjekter section within the Home section
    if (scrollToProsjekter && sectionId === 'home') {
        const prosjekterSection = document.getElementById('prosjekter');
        if (prosjekterSection) {
            const offset = prosjekterSection.getBoundingClientRect().top;
            window.scrollTo({
                top: window.scrollY + offset,
                behavior: 'smooth',
            });
        }
    }

    // Update the header link colors
    const headerLinks = document.querySelectorAll('.header a');
    headerLinks.forEach(link => {
        if (link.getAttribute('href').substring(1) === sectionId) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });

    // Update the body background color for the "om-meg" section
    if (sectionId === 'om-meg') {
        document.body.classList.add('active-section');
    } else {
        document.body.classList.remove('active-section');
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const projectWrappers = document.querySelectorAll('.case-wrapper');
    const filterButtons = document.querySelectorAll('.filter-tags button');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTag = button.getAttribute('data-tag');
            const isAlreadySelected = button.classList.contains('selected');

            // Remove the 'selected' class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('selected');
            });

            // Show all projects when "Show All" is clicked or the button is already selected
            if (selectedTag === 'all' || isAlreadySelected) {
                projectWrappers.forEach(wrapper => {
                    wrapper.style.display = 'grid';
                });
            } else {
                // Add the 'selected' class to the clicked button
                button.classList.add('selected');

                // Hide all projects initially
                projectWrappers.forEach(wrapper => {
                    wrapper.style.display = 'none';
                });

                // Show projects with the selected data-tag
                projectWrappers.forEach(wrapper => {
                    const projectTags = wrapper.getAttribute('data-tags');
                    if (projectTags && projectTags.includes(selectedTag)) {
                        wrapper.style.display = 'block';
                    }
                });
            }
        });
    });
});




// Function to open the lightbox
function openLightbox(imageSrc) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");

    lightboxImage.src = imageSrc;
    lightbox.style.display = "flex"; // Display the lightbox when an image is clicked
}

// Rest of your JavaScript remains unchanged

// Function to close the lightbox
function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
}

// Add click event listeners to your gallery images
const galleryImages = document.querySelectorAll(".case-wrapper img");
galleryImages.forEach(img => {
    img.addEventListener("click", function () {
        openLightbox(this.src);
    });
});

    
        function sendEmail() {
            window.location.href = 'mailto:andreas.lekang@gmail.com';
        }
