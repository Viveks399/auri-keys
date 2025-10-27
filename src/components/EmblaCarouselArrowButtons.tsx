import React from 'react'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: any // eslint-disable-line @typescript-eslint/no-explicit-any
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true)

  const onPrevButtonClick = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = React.useCallback((emblaApi: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
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

type ButtonPropType = {
  onClick: () => void
  disabled: boolean
}

export const PrevButton: React.FC<ButtonPropType> = ({ onClick, disabled }) => (
  <button
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    <span className="material-symbols-outlined">chevron_left</span>
  </button>
)

export const NextButton: React.FC<ButtonPropType> = ({ onClick, disabled }) => (
  <button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    <span className="material-symbols-outlined">chevron_right</span>
  </button>
)
