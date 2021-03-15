export const getCurrentSlideWidth = (slides) => {
  return slides.length > 0 ? slides[0].offsetWidth : 500
}

export const getVisibleSlideIndex = (slider, slides) => {
  const scrollLeft = slider.scrollLeft

  return slides.findIndex((slide) => slide.offsetLeft === scrollLeft)
}

export const lastSlide = (slider, slides) => {
  const index = getVisibleSlideIndex(slider, slides)
  return index == slides.length - 1
}

export const firstSlide = (slider, slides) => {
  const index = getVisibleSlideIndex(slider, slides)
  return index == 0
}

export const scrollToSlideAtIndex = (selectedIndex, slider, slides) => {
  slider.scrollLeft = selectedIndex * getCurrentSlideWidth(slides)
}

export const scrollLeftByOne = (slider, slides) => {
  const lastSlide = slides.length - 1
  if (firstSlide(slider, slides)) {
    scrollToSlideAtIndex(lastSlide, slider, slides)
  } else {
    slider.scrollLeft -= getCurrentSlideWidth(slides)
  }
}

export const scrollRightByOne = (slider, slides) => {
  if (lastSlide(slider, slides)) {
    scrollToSlideAtIndex(0, slider, slides)
  } else {
    slider.scrollLeft += getCurrentSlideWidth(slides)
  }
}
