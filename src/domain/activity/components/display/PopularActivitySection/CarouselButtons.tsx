import {
  LeftArrowButton,
  RightArrowButton,
} from '@/components/button/ArrowButton';

export default function CarouselButtons({
  hasPrevPage,
  hasNextPage,
  onClickPrev,
  onClickRight,
}: {
  hasPrevPage: boolean;
  hasNextPage: boolean;
  onClickPrev: () => void;
  onClickRight: () => void;
}) {
  return (
    <>
      {hasPrevPage && (
        <LeftArrowButton
          ariaLabel='이전 페이지'
          className='border-gray-25 -left-5 z-10 hidden hover:border-1 xl:block'
          onClick={onClickPrev}
        />
      )}
      {hasNextPage && (
        <RightArrowButton
          ariaLabel='다음 페이지'
          className='border-gray-25 -right-5 z-10 hidden hover:border-1 xl:block'
          onClick={onClickRight}
        />
      )}
    </>
  );
}
