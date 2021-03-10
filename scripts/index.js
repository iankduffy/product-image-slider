const slider = document.querySelector('.slides')
const rightArrow = document.querySelector('.right.arrow')
const leftArrow = document.querySelector('.left.arrow')
const slides = Array.from(slider.children)

const getCurrentSlideWidth = () => {
  return slides.length > 0 ? slides[0].offsetWidth : 500
}

const scrollLeftByOne = () => {
  slider.scrollLeft -= getCurrentSlideWidth()
}

const scrollRightByOne = () => {
  slider.scrollLeft += getCurrentSlideWidth()
}

rightArrow.addEventListener('click', () => {
  scrollRightByOne()
})

leftArrow.addEventListener('click', () => {
  scrollLeftByOne()
})

const getVisibleSlideIndex = () => {
  const scrollLeft = slider.scrollLeft

  return slides.findIndex((slide) => slide.offsetLeft === scrollLeft)
}

// const callback = (entries, observer) => {
//   entries.forEach(entry => {
//     const { target } = entry;
//     console.log(entry, target)
    
//     if (entry.intersectionRatio >= 0.50) {
//       target.classList.add("is-visible");
//       target.classList.remove("non-visible");
//     } else {
//       target.classList.remove("is-visible");
//       target.classList.add("non-visible");
//     }
//   });
// };

// let options = {
//   root: slider,
//   rootMargin: "0px",
//   threshold: 0
// };

// const observer = new IntersectionObserver(callback, options)

// slides.forEach((section, index) => {
//   observer.observe(section);
// })