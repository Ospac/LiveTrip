import Image from 'next/image';
import type { KeyboardEvent, ReactNode } from 'react';
import ArrowDown from '@/components/dropdown/assets/arrow-down.svg';
import { useDropdownContext } from '@/components/dropdown/dropdownContext';
import type { Variant } from '@/components/dropdown/type';
import { cx } from '@/utils/cx';

interface DropDownTriggerProps {
  variant?: Variant;
  children: ReactNode;
  ariaLabelledBy?: string;
}

const DESIGN = {
  detailPage: 'justify-between',
  mainPage: 'justify-center',
};

function getDesign(variant: Variant = 'mainPage') {
  if (variant === 'detailPage') {
    return DESIGN.detailPage;
  }

  return DESIGN.mainPage;
}

export default function DropdownTrigger({
  variant = 'mainPage',
  children,
  ariaLabelledBy,
}: DropDownTriggerProps) {
  const { toggle, isOpen, open, close, menuId, triggerId } =
    useDropdownContext();

  const BASE =
    'flex h-full w-full items-center px-5 rounded-2xl focus:outline-none';
  const className = cx(BASE, getDesign(variant));

  const focusMenuItem = (position: 'first' | 'last') => {
    const menu = document.querySelector<HTMLElement>(`[id="${menuId}"]`);

    if (!menu) {
      return;
    }

    const items = menu.querySelectorAll<HTMLButtonElement>(
      '[data-dropdown-item]'
    );

    if (items.length === 0) {
      return;
    }

    if (position === 'last') {
      items[items.length - 1].focus();

      return;
    }

    items[0].focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        open();
      }
      requestAnimationFrame(() => {
        focusMenuItem('first');
      });
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        open();
      }
      requestAnimationFrame(() => {
        focusMenuItem('last');
      });
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  };

  return (
    <button
      id={triggerId}
      className={className}
      type='button'
      aria-haspopup='listbox'
      aria-expanded={isOpen}
      aria-controls={menuId}
      aria-labelledby={ariaLabelledBy}
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        e.stopPropagation();
        toggle();
      }}
    >
      {children}
      <Image className='h-[24px] w-[24px]' src={ArrowDown} alt='메뉴 열기' />
    </button>
  );
}
