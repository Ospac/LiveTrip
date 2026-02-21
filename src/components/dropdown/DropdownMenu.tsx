import type { ReactNode } from 'react';
import { useDropdownContext } from '@/components/dropdown/dropdownContext';

interface DropdownMenuProps {
  children?: ReactNode;
  position?: string;
}

export default function DropdownMenu({
  children,
  position,
}: DropdownMenuProps) {
  const { isOpen, width, menuId, triggerId } = useDropdownContext();

  return (
    <div>
      {isOpen && (
        <ul
          id={menuId}
          role='listbox'
          aria-labelledby={triggerId}
          className={`${position} absolute z-10 flex max-h-48 w-full flex-col gap-1 overflow-y-auto rounded-2xl border border-gray-300 bg-white px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
          style={{ width }}
        >
          {children}
        </ul>
      )}
    </div>
  );
}
