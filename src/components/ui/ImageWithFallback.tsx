'use client';
import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends ImageProps {
  fallback: string;
}
export default function ImageWithFallback({
  fallback,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(props.src);

  return (
    <Image
      {...props}
      src={imgSrc}
      width={props.width}
      height={props.height}
      alt={props.alt}
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
}
