import './scss/styles.scss'

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

const shiftSlider = (element, opts = {}) => {
  const sliderContainer = element 
  const slider = sliderContainer.querySelector('.slides')
  const slides = Array.from(slider.children)
  
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

  const scrollToSlideAtIndex = (selectedIndex) => {
    slider.scrollLeft = selectedIndex * getCurrentSlideWidth()
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


  // Arrows
  const rightArrow = sliderContainer.querySelector('.right.arrow')
  const leftArrow = sliderContainer.querySelector('.left.arrow')
  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      scrollRightByOne()
    })
  }

  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      scrollLeftByOne()
    })
  }

  // Dots Container
  const dotsContainer = sliderContainer.querySelector('.slide-dots')

  if (dotsContainer) {
    slides.forEach((slide) => {
    let li = document.createElement('li')
      li.classList = 'slide-dot'
      dotsContainer.appendChild(li)
    })
    dotsContainer.children[0].classList.add('active')

    const updateSlideNumber = () => {
      const currentSlide = getVisibleSlideIndex()
      const dots = dotsContainer.children
    
      Array.from(dots).forEach((dot) => {
        dot.classList.remove('active')
      })
    
      slides.forEach(slide => {
        slide.classList.remove('active')
      })
    
      slides[currentSlide]?.classList.add('active')
      dots[currentSlide]?.classList.add('active')
    }

    slider.addEventListener('scroll', debounce(updateSlideNumber, 100));

    sliderContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('slide-dot')) {
        const dots = Array.from(dotsContainer.children)
        const index = dots.findIndex(dot => dot == e.target)
    
        scrollToSlideAtIndex(index)
      }
    })
  }

  const timer = sliderContainer.dataset.timer

  if (timer) {
    setInterval(function(){ scrollRightByOne(); }, timer);
  }
}

const shiftSliders = document.querySelectorAll('.shift-slider-wrapper')

shiftSliders.forEach(slider => shiftSlider(slider))

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