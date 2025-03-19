const StatProgressBar = ({ 
    value, 
    label, 
    max = 100, 
    className = "bg-green-600" 
  }: { 
    value: number; 
    label: string; 
    max?: number;
    className?: string;
  }) => {
    const percentage = (value / max) * 100;
    
    // Xác định màu dựa trên giá trị khi không có className tùy chỉnh
    const getColorClass = () => {
      if (className) return className;
      
      if (percentage > 66) return "bg-green-600";
      if (percentage > 33) return "bg-yellow-500";
      return "bg-red-500";
    };
    
    return (
      <div className="mb-3">
        {label && (
          <div className="flex justify-between mb-1">
            <span className="text-gray-700 font-medium">{label}: {value}{max !== 100 ? ` °C` : '%'}</span>
          </div>
        )}
        <div className="w-full bg-gray-200 rounded shadow-inner overflow-hidden">
          <div
            className={`${getColorClass()} text-xs font-medium text-white text-center p-0.5 h-2.5 leading-none rounded transition-all duration-300`}
            style={{ width: `${percentage}%` }}>
          </div>
        </div>
      </div>
    );
  };
  
  export default StatProgressBar;