import Image from "next/image";

// mushroom-trimmed.png is 693x619; keep that ratio at any size.
const ASPECT_RATIO = 619 / 693;

type MushroomProps = {
  size: number;
  className?: string;
};

export default function Mushroom({ size, className }: MushroomProps) {
  return (
    <Image
      src="/images/mushroom-trimmed.png"
      alt=""
      width={size}
      height={Math.round(size * ASPECT_RATIO)}
      className={className}
    />
  );
}
