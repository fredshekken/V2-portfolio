"use client";

import Image, { type ImageProps } from "next/image";
import { useState, type ReactNode } from "react";

type ImageWithFallbackProps = ImageProps & {
  fallback: ReactNode;
};

export default function ImageWithFallback({ alt, fallback, onError, ...props }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) return fallback;

  return <Image {...props} alt={alt} onError={(event) => { setHasError(true); onError?.(event); }} />;
}