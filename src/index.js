import './scss/styles.scss'

import { debounce } from './scripts/util'
import { getCurrentSlideWidth, getVisibleSlideIndex, lastSlide, firstSlide, scrollLeftByOne, scrollRightByOne } from './slider/shiftSlider'

const shiftSlider = (element, opts = {}) => {
  const sliderContainer = element 
  const slider = sliderContainer.querySelector('.slides')
  const slides = Array.from(slider.children)

  // Arrows
  const rightArrow = sliderContainer.querySelector('.right.arrow')
  const leftArrow = sliderContainer.querySelector('.left.arrow')
  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      scrollRightByOne(slider, slides)
    })
  }

  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      scrollLeftByOne(slider, slides)
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
      const currentSlide = getVisibleSlideIndex(slider, slides)
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