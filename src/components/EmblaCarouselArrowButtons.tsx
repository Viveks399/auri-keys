import React from 'react'
import { EmblaCarouselType } from 'embla-carousel'

interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
  direction: 'prev' | 'next';
}

const ArrowButton = React.memo(({ onClick, disabled, direction }: ButtonProps) => {
  const paths = {
    prev: "M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2L355.66 11.354Z",
    next: "M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.39c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0a5994246.277 5994246.277 0 0 0 229.332 229.454 35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2L176.34 520.646Z"
  };

  return (
    <button
      className={`embla__button embla__button--${direction}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${direction === 'prev' ? 'Previous' : 'Next'} slide`}
    >
      <svg className="embla__button__svg" viewBox="0 0 532 532">
        <path fill="currentColor" d={paths[direction]} />
      </svg>
    </button>
  );
});

ArrowButton.displayName = 'ArrowButton';

export const PrevButton = (props: Omit<ButtonProps, 'direction'>) => <ArrowButton {...props} direction="prev" />;
export const NextButton = (props: Omit<ButtonProps, 'direction'>) => <ArrowButton {...props} direction="next" />;

export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true)

  const onPrevButtonClick = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  React.useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}
