type Btn = {
  text: string;
  className?: string;
  onClick?: (event: any) => void;
};

export default function CustomButton({ text, onClick, className }: Btn) {
  return (
    <button
      className={`py-2 px-3 bg-blue-600 text-white font-light ${className} rounded-md text-xs uppercase`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
