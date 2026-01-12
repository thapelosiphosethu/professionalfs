const slides = document.querySelectorAll('.hero-slideshow .slide');
let currentSlide = 0;
const slideInterval = 5000;
let intervalId;

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
      slide.style.zIndex = 2;

      const video = slide.querySelector('video');
      if (video) {
        video.currentTime = 0;
        video.play();
      }
    } else {
      slide.style.zIndex = 1;

      // Delay removal so fade overlaps
      setTimeout(() => {
        slide.classList.remove('active');

        const video = slide.querySelector('video');
        if (video) video.pause();
      }, 700); // match CSS transition time
    }
  });
}


function nextSlide(){ currentSlide=(currentSlide+1)%slides.length; showSlide(currentSlide); }
function prevSlide(){ currentSlide=(currentSlide-1+slides.length)%slides.length; showSlide(currentSlide); }

function startSlideshow(){ intervalId=setInterval(nextSlide,slideInterval); }
function stopSlideshow(){ clearInterval(intervalId); }

const slideshow = document.querySelector('.hero-slideshow');
slideshow.addEventListener('mouseenter',stopSlideshow);
slideshow.addEventListener('mouseleave',startSlideshow);



// arrows
const prevArrow = document.createElement('div');
const nextArrow = document.createElement('div');
prevArrow.className='slide-arrow prev-arrow';
nextArrow.className='slide-arrow next-arrow';
prevArrow.innerHTML='&#10094;';
nextArrow.innerHTML='&#10095;';
slideshow.appendChild(prevArrow);
slideshow.appendChild(nextArrow);

prevArrow.addEventListener('click',()=>{ prevSlide(); stopSlideshow(); startSlideshow(); });
nextArrow.addEventListener('click',()=>{ nextSlide(); stopSlideshow(); startSlideshow(); });

showSlide(currentSlide);
startSlideshow();
function sendToWhatsApp(event) {
  event.preventDefault();

  const name = event.target[0].value;
  const email = event.target[1].value;

  const message = `CV Submission:%0AName: ${name}%0AEmail: ${email}`;

  window.open(
    "https://wa.me/27820731691?text=" + message,
    "_blank"
  );
}
const aboutBtn = document.querySelector(".about-btn");
const aboutModal = document.getElementById("about-info");
const closeBtn = document.querySelector(".close-btn");

aboutBtn.addEventListener("click", () => {
  aboutModal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  aboutModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === aboutModal) {
    aboutModal.style.display = "none";
  }
});
// ===== SCROLL COUNT UP (RUNS ONCE) =====
const counters = document.querySelectorAll('.counter');

const speed = 200;

const countUp = (counter) => {
  const target = +counter.dataset.target;
  let current = 0;
  const increment = target / speed;

  const update = () => {
    current += increment;
    if (current < target) {
      counter.innerText = Math.floor(current).toLocaleString() + "+";
      requestAnimationFrame(update);
    } else {
      counter.innerText = target.toLocaleString() + "+";
    }
  };

  update();
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

counters.forEach(counter => observer.observe(counter));
