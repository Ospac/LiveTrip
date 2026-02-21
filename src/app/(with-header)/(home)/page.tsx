import dynamic from 'next/dynamic';
import GridCardListSkeleton from '@/domain/activity/components/display/GridCardListSkeleton';
import IntroSection from '@/domain/activity/components/display/IntroSection';
import PopularActivitySectionSkeleton from '@/domain/activity/components/display/PopularActivitySection/PopularActivitySectionSkeleton';
import type { homeSearchParams } from '@/domain/activity/types';

const AllActivitySection = dynamic(
  () => import('@/domain/activity/components/display/AllActivitySection')
);

const AllActivityPrefetch = dynamic(
  () =>
    import(
      '@/domain/activity/components/display/AllActivitySection/AllActivityPrefetch'
    ),
  { loading: () => <GridCardListSkeleton length={8} /> }
);

const PopularActivitySection = dynamic(
  () => import('@/domain/activity/components/display/PopularActivitySection'),
  { loading: () => <PopularActivitySectionSkeleton /> }
);

const PopularActivityPrefetch = dynamic(
  () =>
    import(
      '@/domain/activity/components/display/PopularActivitySection/PopularActivityPrefetch'
    ),
  { loading: () => <PopularActivitySectionSkeleton /> }
);

const ToastLayer = dynamic(
  () => import('@/domain/activity/components/display/ToastLayer')
);

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<homeSearchParams>;
}) {
  const { sort, category } = await searchParams;

  return (
    <>
      <IntroSection />
      <div className='flex-center w-full flex-col gap-20'>
        <PopularActivitySection>
          <PopularActivityPrefetch />
        </PopularActivitySection>
        <AllActivitySection sort={sort} category={category}>
          <AllActivityPrefetch
            key={`${sort}-${category}`}
            sort={sort}
            category={category}
          />
        </AllActivitySection>
      </div>
      <ToastLayer />
    </>
  );
}
