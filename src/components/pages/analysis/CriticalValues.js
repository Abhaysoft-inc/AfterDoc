import React from 'react'

const CriticalValues = ({ criticalValues }) => {
    const getValueColor = (value, name) => {
        // Reference ranges for different tests
        const ranges = {
            "Hemoglobin (Hb)": { min: 13.5, max: 17.5 },
            "Packed Cell Volume (PCV)": { min: 40, max: 50 },
            "Platelet Count": { min: 150000, max: 450000 }
        };

        const range = ranges[name];
        if (!range) return "text-gray-100";

        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) return "text-gray-100";

        if (numericValue < range.min) return "text-red-400";
        if (numericValue > range.max) return "text-yellow-400";
        return "text-green-400";
    };

    return (
        <div className="box1 bg-[#2c2c2c] w-full h-40 rounded-2xl">
            <p className="text-center pt-3 text-white font-light">Critical Values</p>
            {criticalValues && Array.isArray(criticalValues) && (
                <div className="px-4 py-2 text-white text-sm h-[calc(100%-40px)] overflow-y-auto custom-scrollbar">
                    <div className="pb-4">
                        {criticalValues.map((item, index) => (
                            <div key={index} className="mb-2">
                                <span className="font-medium">{item.Name}: </span>
                                <span className={getValueColor(item.Value, item.Name)}>
                                    {item.Value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CriticalValues 