import React, { useCallback, useEffect, useRef } from 'react'
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType
} from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'

const TWEEN_FACTOR_BASE = 0.9

// Memoized Slide Component for better performance
const MemoizedSlide = React.memo(({ slide, index, selectedIndex }: {
  slide: {
    src: string
    alt: string
    title?: string
    subtitle?: string
    description?: string
    features?: string[]
  }
  index: number
  selectedIndex: number
}) => (
  <div className="embla__slide">
    <div className="embla__parallax">
      <div className="embla__parallax__layer">
        <img
          className="embla__slide__img embla__parallax__img"
          src={slide.src}
          alt={slide.alt}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
      
      {/* Content with Parallax Effect */}
      <div className="absolute inset-0 z-20 flex items-end">
        <div className="w-full px-4 sm:px-6 md:px-8 pb-8 sm:pb-12 md:pb-16 text-white">
          {/* Subtitle */}
          {slide.subtitle && (
            <div className="mb-2 sm:mb-3 md:mb-4 transform translate-y-8 opacity-0 transition-all duration-1000 ease-out"
                 style={{
                   transform: selectedIndex === index ? 'translateY(0)' : 'translateY(8px)',
                   opacity: selectedIndex === index ? 1 : 0,
                   transitionDelay: '0ms'
                 }}>
              <span className="text-xs sm:text-sm md:text-base font-medium tracking-wider uppercase text-white/80">
                {slide.subtitle}
              </span>
            </div>
          )}
          
          {/* Main Title */}
          {slide.title && (
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight transform translate-y-8 opacity-0 transition-all duration-1000 ease-out"
                style={{
                  transform: selectedIndex === index ? 'translateY(0)' : 'translateY(8px)',
                  opacity: selectedIndex === index ? 1 : 0,
                  transitionDelay: '200ms'
                }}>
              {slide.title}
            </h2>
          )}
          
          {/* Description */}
          {slide.description && (
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-lg md:max-w-2xl mb-4 sm:mb-6 md:mb-8 leading-relaxed transform translate-y-8 opacity-0 transition-all duration-1000 ease-out"
               style={{
                 transform: selectedIndex === index ? 'translateY(0)' : 'translateY(8px)',
                 opacity: selectedIndex === index ? 0.9 : 0,
                 transitionDelay: '400ms'
               }}>
              {slide.description}
            </p>
          )}
          
          {/* Features List */}
          {slide.features && (
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 transform translate-y-8 opacity-0 transition-all duration-1000 ease-out"
                 style={{
                   transform: selectedIndex === index ? 'translateY(0)' : 'translateY(8px)',
                   opacity: selectedIndex === index ? 1 : 0,
                   transitionDelay: '600ms'
                 }}>
              {slide.features.map((feature, featureIndex) => (
                <span key={featureIndex}
                      className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm md:text-base border border-white/20">
                  {feature}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
))

MemoizedSlide.displayName = 'MemoizedSlide'

type PropType = {
  slides: Array<{
    src: string
    alt: string
    title?: string
    subtitle?: string
    description?: string
    features?: string[]
  }>
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const initializeParallax = useCallback((emblaApi: EmblaCarouselType) => {
    tweenNodes.current = emblaApi.slideNodes().map(slideNode => 
      slideNode.querySelector('.embla__parallax__layer') as HTMLElement
    )
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const updateParallax = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === 'scroll'

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()
            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)
              diffToTarget = sign === -1 
                ? scrollSnap - (1 + scrollProgress)
                : scrollSnap + (1 - scrollProgress)
            }
          })
        }

        const translate = diffToTarget * (-1 * tweenFactor.current) * 100
        const tweenNode = tweenNodes.current[slideIndex]
        if (tweenNode) tweenNode.style.transform = `translateX(${translate}%)`
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    initializeParallax(emblaApi)
    updateParallax(emblaApi)

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())

    emblaApi
      .on('reInit', initializeParallax)
      .on('reInit', updateParallax)
      .on('scroll', updateParallax)
      .on('slideFocus', updateParallax)
      .on('select', onSelect)
  }, [emblaApi, initializeParallax, updateParallax])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <MemoizedSlide 
              key={index}
              slide={slide}
              index={index}
              selectedIndex={selectedIndex}
            />
          ))}
        </div>
      </div>

      <div className="embla__buttons">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  )
}

export default EmblaCarousel
