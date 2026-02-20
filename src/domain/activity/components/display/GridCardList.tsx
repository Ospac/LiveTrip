import Card from '@/domain/activity/components/display/Card';
import type { Activity } from '@/domain/activity/types';

interface GridCardListProps {
  activities: Activity[];
}
export default function GridCardList({ activities }: GridCardListProps) {
  return (
    <div className='grid w-full grid-cols-2 gap-3.5 overflow-x-scroll md:justify-items-center md:gap-5 md:overflow-hidden xl:grid-cols-4'>
      {activities.map((activity) => {
        return (
          <Card
            activity={activity}
            alt={activity.title}
            key={`card-${crypto.randomUUID()}`}
            sizes='(min-width: 1280px) calc(25vw - 2.187rem), calc(50vw - 1.375rem)'
            imageClassNames='aspect-1/1'
          />
        );
      })}
    </div>
  );
}
