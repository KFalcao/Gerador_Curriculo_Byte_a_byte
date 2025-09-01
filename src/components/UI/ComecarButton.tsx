type ComecarButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function ComecarButton({
  children,
  onClick,
}: ComecarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        btn-comecar 
        bg-transparent 
        cursor-pointer 
        text-white 
        px-4 py-2 
        border border-blue-200 
        rounded-lg 
        mt-10
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:text-blue-300 hover:border-blue-300
        active:scale-110 active:text-blue-400 active:border-blue-400"
    >
      {children}
    </button>
  );
}
