import React from "react";

interface WeatherCardProps {
    location: string;
    day: string;
    temperatureC: string;
    condition: string;
    rainChange: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
    location,
    day,
    temperatureC,
    condition,
    rainChange
}) => {
    return (
        <div className="gap-4 mx-auto md:flex-row flex-col w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-lg shadow-lg p-6 flex items-center">
            {/* Weather Icon and Condition */}
            <div className="flex-1 flex flex-col items-center">
                {/* Icon */}
                <div className="bg-white bg-opacity-30 rounded-full p-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-12 h-12 text-yellow-300"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 2v2m6.364 1.636l-1.414 1.414M20 12h-2M17.364 18.364l-1.414-1.414M12 20v-2M6.636 17.364l1.414-1.414M4 12h2M6.636 6.636l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
                        />
                    </svg>
                </div>
                {/* Condition */}
                <p className="mt-4 text-lg">{condition}</p>
            </div>

            {/* Weather Details */}
            <div className="flex-1 border-t md:border-t-0 md:border-l border-white  md:pl-6">
                <p className="text-xl font-semibold">{location}</p>
                <p className="text-md text-gray-200">{day}</p>
                <p className="text-3xl font-bold mt-2">{temperatureC}°</p>
                <p className="text-xl mt-2">Khả năng mưa {rainChange}</p>
            </div>
        </div>
    );
};

export default WeatherCard;
