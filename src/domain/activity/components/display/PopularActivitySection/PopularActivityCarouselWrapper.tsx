'use client';
import { useEffect, useRef, useState } from 'react';
import { toast } from '@/components/toast';
import Spinner from '@/components/ui/Spinner';
import Card from '@/domain/activity/components/display/Card';
import ArrowButtons from '@/domain/activity/components/display/PopularActivitySection/CarouselButtons';
import { useInfiniteActivities } from '@/domain/activity/hooks/useActivitiesService';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const CARDS_PER_PAGE = 4;
const DESKTOP_QUERY = '(min-width: 1280px)';

export default function PopularActivityCarouselWrapper() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);

  const {
    items: activities,
    isFetchingNextPage,
    hasNextPage,
    isPending,
    error,
    setPage,
  } = useInfiniteActivities({
    sort: 'most_reviewed',
  });

  const { loader } = useIntersectionObserver({
    loading: isPending || isFetchingNextPage || isDesktop,
    hasMore: !isDesktop && hasNextPage,
    setPage,
    rootRef: sliderRef,
    rootMargin: '0px 200px 0px 0px',
    threshold: 0.2,
  });

  const pageSize = Math.max(1, Math.ceil(activities.length / CARDS_PER_PAGE));
  const hasPrevPage = currentPage > 1;
  const hasLocalNextPage = currentPage < pageSize;
  const hasDesktopNext = hasLocalNextPage || hasNextPage;

  const getScrollPosition = (nextPage: number) => {
    const cardIndex = (nextPage - 1) * CARDS_PER_PAGE;
    const cards = sliderRef.current?.querySelectorAll<HTMLElement>(
      '[data-carousel-card="true"]'
    );

    if (!cards?.[cardIndex]) {
      return null;
    }

    return cards[cardIndex].offsetLeft - 6;
  };

  const moveToPage = (nextPage: number) => {
    const scrollPosition = getScrollPosition(nextPage);

    if (scrollPosition === null || !sliderRef.current) {
      return;
    }
    setCurrentPage(nextPage);
    sliderRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  };

  const onClickPrev = () => {
    if (!hasPrevPage) {
      return;
    }
    moveToPage(currentPage - 1);
  };

  const onClickRight = () => {
    if (hasLocalNextPage) {
      moveToPage(currentPage + 1);

      return;
    }

    if (!hasNextPage || isFetchingNextPage) {
      return;
    }
    setCurrentPage((prev) => prev + 1);
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(DESKTOP_QUERY);

    const updateViewport = () => {
      setIsDesktop(mediaQuery.matches);
    };

    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);

    return () => {
      mediaQuery.removeEventListener('change', updateViewport);
    };
  }, []);

  useEffect(() => {
    if (error) {
      toast({ message: error.message, eventType: 'error' });
    }
  }, [error]);

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    const scrollPosition = getScrollPosition(currentPage);

    if (scrollPosition === null || !sliderRef.current) {
      return;
    }
    sliderRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  }, [activities.length, currentPage, isDesktop]);

  return (
    <>
      <div
        ref={sliderRef}
        className={
          'scrollbar-hide flex w-full items-center gap-3.5 overflow-x-scroll px-1.5'
        }
      >
        {activities.map((activity) => {
          return (
            <div
              className='w-[8.25rem] shrink-0 snap-start md:w-[20.75rem] xl:w-[16.6rem]'
              data-carousel-card='true'
              key={`card-${activity.id}`}
            >
              <Card
                activity={activity}
                alt={activity.title}
                sizes='(min-width: 1280px) 428px, (min-width: 780px) 533px, 283px'
              />
            </div>
          );
        })}
        <div className='h-px w-px shrink-0' ref={loader} />
        {isDesktop && (
          <ArrowButtons
            hasNextPage={hasDesktopNext}
            hasPrevPage={hasPrevPage}
            onClickPrev={onClickPrev}
            onClickRight={onClickRight}
          />
        )}
        <div className='absolute top-1/2 left-1/2 flex min-h-10 -translate-1/2'>
          {isFetchingNextPage && <Spinner size='md' />}
        </div>
      </div>
    </>
  );
}
