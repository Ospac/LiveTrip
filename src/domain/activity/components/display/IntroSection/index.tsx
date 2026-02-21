import dynamic from 'next/dynamic';
import HeroBanner from '@/domain/activity/components/display/IntroSection/HeroBanner';

const SearchForm = dynamic(
  () => import('@/domain/activity/components/display/IntroSection/SearchForm')
);

export default function IntroSection() {
  return (
    <>
      <HeroBanner />
      <div className='mb-6 flex w-full flex-col gap-3 md:mb-8 md:gap-9'>
        <h1 className='text-16 md:text-32 text-center font-bold'>
          무엇을 체험하고 싶으신가요?
        </h1>
        <SearchForm />
      </div>
    </>
  );
}
