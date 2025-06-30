import { RiMenu3Line } from "react-icons/ri";

interface HeaderProps {
  onOpenSidebar: () => void;
}

export function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 lg:hidden">
      <button
        aria-label="Open Sidebar"
        className="cursor-pointer hover:text-zinc-400"
        onClick={onOpenSidebar}
      >
        <RiMenu3Line size={24} />
      </button>
      <div className="text-xl font-bold">Chatbot</div>
      <div className="w-6"></div>
    </div>
  );
}
