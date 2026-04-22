import Link from "next/link";
import Image from "next/image";

export default function Catalogue() {
  return (
    <div className="px-4 md:px-10">
      <h1 className="text-3xl font-bold mb-6">Catalogue</h1>

      <div className="flex flex-col gap-6">
        {/* Kids Card */}
        <Link href="/catalogue/kids" className="block">
          <div className="border-4 border-black rounded-xl bg-gray-300 flex items-center justify-between p-6 h-48 md:h-64 overflow-hidden relative cursor-pointer transition hover:scale-[1.02]">
            {/* Text */}
            <h2 className="text-white text-2xl md:text-3xl font-bold z-10">
              Kids Wear
            </h2>

            {/* Image */}
            <div className="relative h-full w-32 md:w-40">
              <Image
                src="/images/banners/kids.png"
                alt="Kids wear"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </Link>

        {/* Mens Card */}
        <Link href="/catalogue/men" className="block">
          <div className="border-4 border-black rounded-xl bg-gray-300 flex items-center justify-between p-6 h-48 md:h-64 overflow-hidden relative cursor-pointer transition hover:scale-[1.02]">
            {/* Text */}
            <h2 className="text-white text-2xl md:text-3xl font-bold z-10">
              Mens Wear
            </h2>

            {/* Image */}
            <div className="relative h-full w-32 md:w-40">
              <Image
                src="/images/banners/men.png"
                alt="Mens wear"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
