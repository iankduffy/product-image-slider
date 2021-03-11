const slider = document.querySelector('.slides')
const rightArrow = document.querySelector('.right.arrow')
const leftArrow = document.querySelector('.left.arrow')
const slides = Array.from(slider.children)
const dotsContainer = document.querySelector('.slide-dots')

const getCurrentSlideWidth = () => {
  return slides.length > 0 ? slides[0].offsetWidth : 500
}

const getVisibleSlideIndex = () => {
  const scrollLeft = slider.scrollLeft

  return slides.findIndex((slide) => slide.offsetLeft === scrollLeft)
}

const lastSlide = () => {
  const index = getVisibleSlideIndex()
  return index == slides.length - 1
}

const firstSlide = () => {
  const index = getVisibleSlideIndex()
  return index == 0
}

const scrollLeftByOne = () => {
  const lastSlide = slides.length - 1
  if (firstSlide()) {
    scrollToSlideAtIndex(lastSlide)
  } else {
    slider.scrollLeft -= getCurrentSlideWidth()
  }
}

const scrollRightByOne = () => {
  if (lastSlide()) {
    scrollToSlideAtIndex(0)
  } else {
    slider.scrollLeft += getCurrentSlideWidth()
  }
}

rightArrow.addEventListener('click', () => {
  scrollRightByOne()
})

leftArrow.addEventListener('click', () => {
  scrollLeftByOne()
})

getVisibleSlideIndex()

const scrollToSlideAtIndex = (selectedIndex) => {
  slider.scrollLeft = selectedIndex * getCurrentSlideWidth()
}

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

  Array.from(dots).forEach((dot) => {
    dot.classList.remove('active')
  })

  slides.forEach(slide => {
    slide.classList.remove('active')
  })

  slides[currentSlide].classList.add('active')
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

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('slide-dot')) {
    const dots = Array.from(dotsContainer.children)
    const index = dots.findIndex(dot => dot == e.target)

    scrollToSlideAtIndex(index)
  }
})