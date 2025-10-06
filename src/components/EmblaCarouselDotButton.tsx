import React from 'react'
import { EmblaCarouselType } from 'embla-carousel'

type DotButtonProps = {
  selected: boolean
  onClick: () => void
}

export const DotButton: React.FC<DotButtonProps> = (props) => {
  const { selected, onClick } = props

  return (
    <button
      className={`embla__dot ${selected ? 'embla__dot--selected' : ''}`}
      type="button"
      onClick={onClick}
      aria-label="Go to slide"
    />
  )
}

export const useDotButton = (emblaApi: EmblaCarouselType | undefined) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onInit = React.useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  React.useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick
  }
}
