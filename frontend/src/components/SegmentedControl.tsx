interface SegmentedControlProps {
  options: string[];
  selected: string;
  onChange: (option: string) => void;
}

export function SegmentedControl({ options, selected, onChange }: SegmentedControlProps) {
  return (
    <div className="inline-flex p-1 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`
            px-6 py-2.5 rounded-xl transition-all duration-300 ease-out
            ${selected === option 
              ? 'bg-gradient-to-r from-purple-200/80 to-pink-200/80 text-purple-900 shadow-md' 
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
