interface PrimaryButtonProps {
    onClick: () => void;
    text: string;
    disabled?: boolean;
}
export const PrimaryButton = ({ onClick, text, disabled }: PrimaryButtonProps) => {

    return (
        <button 
        onClick={onClick} 
        type="button" 
        className="
          text-white 
          bg-gradient-to-r 
          from-gray-800 
          to-black 
          focus:outline-none 
          shadow-lg 
          font-medium 
          rounded-lg 
          text-base 
          px-5 
          py-2.5 
          text-center 
          mr-2 
          mb-2
        "
        disabled={disabled}
      >
        {text}
      </button>
      
    );
}

