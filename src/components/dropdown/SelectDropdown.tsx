'use client';

import { useId, useState } from 'react';
import Dropdown from '@/components/dropdown/Dropdown';
import type { Variant } from '@/components/dropdown/type';

const DEFAULT_POSITION = 'top-15';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label?: string;
  required?: boolean;
  variant?: Variant;
  width?: number;
  position?: string;
  options: DropdownOption[];
  placeholder?: string;
  onSelect: (value: string) => void;
  defaultValue?: string;
}

/**
 * placeholder 색상 지정
 */
function getDesign(variant: Variant, selected?: string) {
  if (variant === 'detailPage') {
    return selected ? 'text-gray-950' : 'text-gray-400';
  }

  return 'text-gray-950';
}

export default function SelectDropdown({
  label: titleLabel,
  required,
  variant = 'detailPage',
  width,
  position = DEFAULT_POSITION,
  options,
  placeholder = '선택하세요',
  onSelect,
  defaultValue,
}: DropdownProps) {
  const labelId = useId();
  const [selected, setSelected] = useState<string | undefined>(defaultValue);

  const handleSelect = (value: string) => {
    onSelect(value);
    setSelected(value);
  };

  const displayLabel = selected
    ? options.find((o) => o.value === selected)?.label
    : placeholder;

  const triggerDesign = getDesign(variant, selected);

  return (
    <div>
      {titleLabel && (
        <label id={labelId} className='mb-2 block text-sm text-black'>
          {titleLabel}
          {required ? <span className='ml-1 text-red-500'>*</span> : null}
        </label>
      )}
      <Dropdown width={width}>
        <Dropdown.Trigger
          variant={variant}
          ariaLabelledBy={titleLabel ? labelId : undefined}
        >
          <div className={triggerDesign}>{displayLabel}</div>
        </Dropdown.Trigger>
        <Dropdown.Menu position={position}>
          {options.map((option) => {
            return (
              <Dropdown.Items
                key={option.value}
                value={option.value}
                variant={variant}
                selected={selected === option.value}
                onSelect={handleSelect}
              >
                {option.label}
              </Dropdown.Items>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
