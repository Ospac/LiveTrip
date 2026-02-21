import {
  ArtIcon,
  BusIcon,
  FoodIcon,
  TourIcon,
  WellbeingIcon,
} from '@/domain/activity/components/display/AllActivitySection/CategoryTabs/svg';

export const categoryTabs = [
  {
    icon: <ArtIcon />,
    title: '문화 · 예술',
  },
  {
    icon: <FoodIcon />,
    title: '식음료',
  },
  {
    icon: <TourIcon />,
    title: '투어',
  },
  {
    icon: <BusIcon />,
    title: '관광',
  },
  {
    icon: <WellbeingIcon />,
    title: '웰빙',
  },
];
export const tabEmojiMapping: Record<string, string> = {
  '문화 · 예술': '🎨',
  식음료: '🥗',
  투어: '🏕️',
  관광: '✈️',
  웰빙: '🧘‍♀️',
};
