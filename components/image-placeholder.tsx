import { Glasses } from "lucide-react";

type ImagePlaceholderProps = {
  label: string;
};

export default function ImagePlaceholder({ label }: ImagePlaceholderProps) {
  return (
    <div className="image-placeholder" role="img" aria-label={`${label} placeholder`}>
      <Glasses aria-hidden="true" size={52} strokeWidth={1.25} />
      <span>{label}</span>
    </div>
  );
}