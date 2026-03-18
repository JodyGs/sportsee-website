import { Logo } from "../svgs";

export default function Header() {
  return (
    <header className="flex items-center h-[91px] bg-[#020203] px-7 shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-10 relative">
      <Logo className="w-[178px] h-[61px]" />
      <nav className="flex-1 flex justify-around ml-20">
        <a href="#" className="text-white text-2xl font-medium">
          Accueil
        </a>
        <a href="#" className="text-white text-2xl font-medium">
          Profil
        </a>
        <a href="#" className="text-white text-2xl font-medium">
          Réglage
        </a>
        <a href="#" className="text-white text-2xl font-medium">
          Communauté
        </a>
      </nav>
    </header>
  );
}
