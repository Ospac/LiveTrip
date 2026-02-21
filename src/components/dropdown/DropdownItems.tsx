import type { ReactNode } from 'react';
import { useDropdownContext } from '@/components/dropdown/dropdownContext';
import type { Variant } from '@/components/dropdown/type';
import { cx } from '@/utils/cx';

interface DropdownItemsProps {
  variant?: Variant;
  children: ReactNode;
  value: string;
  onSelect: (value: string) => void;
  selected?: boolean;
}

const DESIGN = {
  detailPage: 'px-4',
  mainPage: 'justify-center',
};

function getDesign(variant: Variant = 'mainPage') {
  if (variant === 'detailPage') {
    return DESIGN.detailPage;
  }

  return DESIGN.mainPage;
}

export default function DropdownItems({
  variant = 'mainPage',
  children,
  value,
  onSelect,
  selected = false,
}: DropdownItemsProps) {
  const { close, triggerId } = useDropdownContext();

  const BASE =
    'hover:bg-primary-100 flex h-[48px] items-center text-gray-900 hover:text-gray-600 hover:rounded-xl';
  const className = cx(BASE, getDesign(variant));

  const focusSiblingItem = (
    currentButton: HTMLButtonElement,
    movement: 'next' | 'prev' | 'first' | 'last'
  ) => {
    const menu = currentButton.closest('[role="listbox"]');

    if (!menu) {
      return;
    }

    const items = [
      ...menu.querySelectorAll<HTMLButtonElement>('[data-dropdown-item]'),
    ];
    const currentIndex = items.indexOf(currentButton);

    if (items.length === 0 || currentIndex === -1) {
      return;
    }

    if (movement === 'first') {
      items[0]?.focus();

      return;
    }
    if (movement === 'last') {
      items[items.length - 1]?.focus();

      return;
    }

    if (movement === 'next') {
      items[(currentIndex + 1) % items.length]?.focus();

      return;
    }

    items[(currentIndex - 1 + items.length) % items.length]?.focus();
  };

  return (
    <button
      data-dropdown-item
      type='button'
      role='option'
      tabIndex={-1}
      aria-selected={selected}
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(value);
        close();
      }}
      onKeyDown={(e) => {
        const { currentTarget, key } = e;

        if (key === 'ArrowDown') {
          e.preventDefault();
          focusSiblingItem(currentTarget, 'next');
        }

        if (key === 'ArrowUp') {
          e.preventDefault();
          focusSiblingItem(currentTarget, 'prev');
        }

        if (key === 'Home') {
          e.preventDefault();
          focusSiblingItem(currentTarget, 'first');
        }

        if (key === 'End') {
          e.preventDefault();
          focusSiblingItem(currentTarget, 'last');
        }

        if (key === 'Escape') {
          e.preventDefault();
          close();
          const trigger = document.querySelector<HTMLElement>(
            `[id="${triggerId}"]`
          );

          trigger?.focus();
        }
      }}
    >
      <li className={className}>{children}</li>
    </button>
  );
}
