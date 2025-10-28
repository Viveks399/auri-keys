import React, { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
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

// Memoized Image Component for better performance
const MemoizedImage = React.memo(({ src, alt, index, onLoad }: {
  src: string
  alt: string
  index: number
  onLoad: () => void
}) => {
  return (
    <Image
      className="embla__slide__img embla__parallax__img transition-opacity duration-500"
      src={src}
      alt={alt}
      fill
      priority={index === 0}
      unoptimized={true}
      onLoad={onLoad}
      sizes="100vw"
      loading={index === 0 ? "eager" : "lazy"}
    />
  );
});

MemoizedImage.displayName = 'MemoizedImage';

// Memoized Slide Component for better performance
const MemoizedSlide = React.memo(({ slide, index, onImageLoad }: {
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
  onImageLoad: () => void
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleImageLoad = React.useCallback(() => {
    setImageLoaded(true);
    onImageLoad();
  }, [onImageLoad]);

  return (
  <div className="embla__slide">
    <div className="embla__parallax">
      <div className="embla__parallax__layer relative">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}
        <MemoizedImage
          src={slide.src}
          alt={slide.alt}
          index={index}
          onLoad={handleImageLoad}
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/25 z-10" />
    </div>
  </div>
  );
})

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
  onImagesLoaded?: (loaded: boolean) => void
}

const EmblaCarousel: React.FC<PropType> = React.memo((props) => {
  const { slides, options } = props
  
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [isAutoplayActive, setIsAutoplayActive] = React.useState(true)
  const [isPageVisible, setIsPageVisible] = React.useState(true)
  const [loadedImagesCount, setLoadedImagesCount] = React.useState(0)
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  // Track individual image loads
  const handleImageLoad = React.useCallback(() => {
    setLoadedImagesCount(prev => prev + 1)
  }, [])

  // Check if all images are loaded
  React.useEffect(() => {
    if (loadedImagesCount === slides.length && props.onImagesLoaded) {
      props.onImagesLoaded(true)
    }
  }, [loadedImagesCount, slides.length, props])

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

    // Cleanup function
    return () => {
      if (emblaApi) {
        emblaApi.off('reInit', initializeParallax)
        emblaApi.off('reInit', updateParallax)
        emblaApi.off('scroll', updateParallax)
        emblaApi.off('slideFocus', updateParallax)
        emblaApi.off('select', onSelect)
      }
    }
  }, [emblaApi, initializeParallax, updateParallax])

  // Autoplay management
  const startAutoplay = React.useCallback(() => {
    if (!emblaApi || autoplayIntervalRef.current) return
    
    autoplayIntervalRef.current = setInterval(() => {
      if (emblaApi && isAutoplayActive && isPageVisible) {
        emblaApi.scrollNext()
      }
    }, 3000)
  }, [emblaApi, isAutoplayActive, isPageVisible])
  
  const stopAutoplay = React.useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current)
      autoplayIntervalRef.current = null
    }
  }, [])

  // Page visibility detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden
      setIsPageVisible(isVisible)
      
      if (isVisible && isAutoplayActive) {
        // Page became visible, restart autoplay
        startAutoplay()
      } else if (!isVisible) {
        // Page became hidden, stop autoplay
        stopAutoplay()
      }
    }

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Listen for window focus/blur (for minimize/restore)
    const handleFocus = () => {
      setIsPageVisible(true)
      if (isAutoplayActive) startAutoplay()
    }
    
    const handleBlur = () => {
      setIsPageVisible(false)
      stopAutoplay()
    }
    
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('blur', handleBlur)
    }
  }, [isAutoplayActive, startAutoplay, stopAutoplay])

  // Initialize autoplay
  useEffect(() => {
    if (!emblaApi) return
    
    startAutoplay()
    
    return () => {
      stopAutoplay()
    }
  }, [emblaApi, startAutoplay, stopAutoplay])

  // Hover handlers for pause/resume autoplay
  const handleMouseEnter = React.useCallback(() => {
    setIsAutoplayActive(false)
    stopAutoplay()
  }, [stopAutoplay])
  
  const handleMouseLeave = React.useCallback(() => {
    setIsAutoplayActive(true)
    startAutoplay()
  }, [startAutoplay])

  // Memoized slides renderer
  const memoizedSlides = React.useMemo(() => 
    slides.map((slide, index) => (
      <MemoizedSlide 
        key={`${slide.src}-${index}`}
        slide={slide}
        index={index}
        selectedIndex={selectedIndex}
        onImageLoad={handleImageLoad}
      />
    )), [slides, selectedIndex, handleImageLoad]
  )

  return (
    <div className="embla" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {memoizedSlides}
        </div>
      </div>

      <div className="embla__buttons">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  )
});

EmblaCarousel.displayName = 'EmblaCarousel';

export default EmblaCarousel
