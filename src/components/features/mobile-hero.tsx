import Image from "next/image";

const HERO_HEIGHT_PX = 600;
const CAN_WIDTH = 114;
const CAN_HEIGHT = 304;

/**
 * Mobile-only hero (below md). Static can + gradient — no video scrub.
 */
export function MobileHero() {
  return (
    <section
      className="relative flex flex-col items-center overflow-hidden px-6 pt-14 md:hidden"
      style={{
        height: HERO_HEIGHT_PX,
        backgroundImage: "linear-gradient(180deg, #94C145 0%, #3096A3 100%)",
      }}
      aria-label="CITRA hero"
    >
      <header className="relative z-10 flex flex-col items-center text-center">
        <h1 className="font-display text-[clamp(3.5rem,18vw,4.5rem)] leading-none tracking-tight text-black">
          CITRA
        </h1>
        <p className="mt-3 font-sans text-[0.7rem] tracking-[0.28em] text-black uppercase">
          SPARKLING CITRUS
        </p>
      </header>

      <div className="relative z-10 mt-8 flex flex-1 items-start justify-center">
        <Image
          src="/products/Product_1.png"
          alt="CITRA Grove"
          width={CAN_WIDTH}
          height={CAN_HEIGHT}
          className="object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.22)]"
          style={{ width: CAN_WIDTH, height: CAN_HEIGHT }}
          sizes="114px"
          priority
        />
      </div>
    </section>
  );
}
