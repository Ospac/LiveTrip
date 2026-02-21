import type { ReactNode } from 'react';

export default function PopularActivitySection({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className='relative w-full'>
      <h2 className='text-18 md:text-24 mb-6 font-bold md:mb-8'>
        🔥 인기 체험
      </h2>
      {children}
    </section>
  );
}
