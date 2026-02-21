import PopularActivityCarouselWrapper from '@/domain/activity/components/display/PopularActivitySection/PopularActivityCarouselWrapper';
import { activityQueryOptions } from '@/domain/activity/utils/queryOptions';
import { getDehydratedInfiniteQueryClient } from '@/utils/react-query/getDehydratedInfiniteQueryClient';
import { Hydrate } from '@/utils/react-query/getQueryClient';

export default async function PopularActivityPrefetch() {
  const hydratedInfiniteActivities = await getDehydratedInfiniteQueryClient({
    ...activityQueryOptions.all({
      sort: 'most_reviewed',
      method: 'cursor',
      size: 8,
    }),
    initialPageParam: undefined,
  });

  return (
    <Hydrate state={hydratedInfiniteActivities}>
      <PopularActivityCarouselWrapper />
    </Hydrate>
  );
}
