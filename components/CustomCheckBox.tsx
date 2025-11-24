'use client';

import { useState } from 'react';

export function CustomCheckbox({
  value,
  onChange,
}: {
  value: boolean;
  onChange: () => void;
}) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  //   const isUnchecked = !value;
  const showIcon = value || hover || active;

  // Icon color logic
  const iconColor = value
    ? 'white'
    : active
    ? '#878787'
    : hover
    ? '#E3E3E3'
    : 'transparent';

  return (
    <div
      onClick={onChange}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      className={`
        relative w-[23px] h-[23px] rounded-md cursor-pointer transition-all duration-150
        flex items-center justify-center select-none
        
        ${
          value
            ? 'bg-[#5087F8] hover:bg-[#2469F6] border border-[#E3E3E3]'
            : 'bg-white border border-[#CDCDCD] opacity-60 hover:opacity-100 hover:border-[#BDBDBD]'
        }

        ${active ? 'shadow-[0_0_0_3px_rgba(36,105,246,0.1)]' : ''}
      `}
    >
      {showIcon && (
        <svg
          width={17}
          height={13}
          viewBox="0 0 17 13"
          fill="none"
          className="absolute pointer-events-none"
          style={{ top: '5.52px', left: '3.68px' }}
        >
          <path
            d="M0.500008 6.572L6.0488 11.5072C6.06926 11.5254 6.10056 11.5237 6.11899 11.5035L16.14 0.5"
            stroke={iconColor}
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}
