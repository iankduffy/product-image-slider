const slider = document.querySelector('.slides')
const rightArrow = document.querySelector('.right.arrow')
const leftArrow = document.querySelector('.left.arrow')
const slides = Array.from(slider.children)
const dotsContainer = document.querySelector('.slide-dots')

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
  const allSlide = Array.from(slider.children)
  console.log(scrollLeft)

  return slides.findIndex((slide) => slide.offsetLeft === scrollLeft)
}

getVisibleSlideIndex()

const addSlideDots = () => {
  slides.forEach((slide) => {
    let li = document.createElement('li')
    li.classList = 'slide-dot'
    dotsContainer.appendChild(li)
  })
  dotsContainer.children[0].classList.add('active')
}

addSlideDots()

const updateSlideNumber = () => {
  const currentSlide = getVisibleSlideIndex()
  const dots = dotsContainer.children

  Array.from(dots).forEach((slide) => {
    slide.classList.remove('active')
  })

  dots[currentSlide].classList.add('active')
}

function debounce (func, wait, immediate) {
  var timeout
  return function debouncedFunction () {
    var context = this
    var args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

// function throttle(func, timeFrame) {
//   var lastTime = 0;
//   return function (...args) {
//       var now = new Date();
//       if (now - lastTime >= timeFrame) {
//           func(...args);
//           lastTime = now;
//       }
//   };
// }

slider.addEventListener('scroll', debounce(updateSlideNumber, 100));

// slider.addEventListener('scroll', updateSlideNumber);





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