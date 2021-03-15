import './scss/styles.scss'

import { debounce } from './scripts/util'
import { getCurrentSlideWidth, getVisibleSlideIndex, lastSlide, firstSlide, scrollLeftByOne, scrollRightByOne, scrollToSlideAtIndex } from './slider/shiftSlider'

const carouselComponent = document.querySelectorAll('.js-carousel-comp')

const carouselSlider = (element) => {
  const sliderContainer = element 
  const slider = sliderContainer.querySelector('.slides')
  const slides = Array.from(slider.children)

  const timer = sliderContainer.dataset.timer

  if (timer) {
    setInterval(function(){ scrollRightByOne(slider, slides); }, timer);
  }
}

carouselComponent.forEach(slider => carouselSlider(slider))

const productImageComp = document.querySelectorAll('.js-product-image-slider')

const productImageSlider = (element) => {
  const sliderContainer = element 
  const slider = sliderContainer.querySelector('.slides')
  const slides = Array.from(slider.children)

  // Arrows
  const rightArrow = sliderContainer.querySelector('.right.arrow')
  const leftArrow = sliderContainer.querySelector('.left.arrow')

  rightArrow.addEventListener('click', () => {
    scrollRightByOne(slider, slides)
  })

  leftArrow.addEventListener('click', () => {
    scrollLeftByOne(slider, slides)
  })

  // Dots Container
  const dotsContainer = sliderContainer.querySelector('.slide-dots')

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

  slider.addEventListener('scroll', debounce(updateSlideNumber, 50));

  sliderContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('slide-dot')) {
      const dots = Array.from(dotsContainer.children)
      const index = dots.findIndex(dot => dot == e.target)
    
      scrollToSlideAtIndex(index, slider, slides)
    }
  })
}

productImageComp.forEach(slider => productImageSlider(slider))