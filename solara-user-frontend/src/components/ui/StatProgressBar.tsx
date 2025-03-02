// Progress bar component
const StatProgressBar = ({ value, label, max = 100 }: { value: number; label: string; max?: number }) => {
    const percentage = (value / max) * 100;
    return (
        <div className="mb-2">
            <div className="flex justify-between mb-1">
                <span>{label}: {value}{max !== 100 ? ` °C` : ''}</span>
            </div>
            <div className="w-full bg-gray-200 rounded">
                <div
                    className="bg-green-500 text-xs font-medium text-white text-center p-0.5 h-3 leading-none rounded"
                    style={{ width: `${percentage}%` }}>
                </div>
            </div>
        </div>
    );
};

export default StatProgressBar;