export const Header = () => {
  return (
    <header className="flex-col backdrop-blur-2xl bg-transparent bg-gradient-to-tl from-transparent to-rose-500 border-b border-white flex justify-center text-center items-center py-8 px-[3.5vw] sticky w-full top-0 left-0 z-10">
      <h1 className="text-white text-2xl font-bold leading-10">
        📑 Haid Notes
      </h1>
      <p className="text-white">Write your notes for haid here. 🧕</p>
      <p className="text-white mt-5">
        🩸 Keluar darah ke-2 keluar di atas hari ke-15 (Metode penyempurna
        suci).
      </p>
      <p className="text-white">
        🩸 Keluar darah ke-2 keluar sebelum hari ke-15 dan berlanjut hingga
        lebih dari 15 (Dikembalikan ke adat haid dan adat sucinya).
      </p>
    </header>
  );
};
