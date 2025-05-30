import React from 'react'

const TestResults = ({ findings }) => {
    // Reference ranges for different tests
    const referenceRanges = {
        "Hemoglobin (Hb)": { min: 13.5, max: 17.5, unit: "g/dL" },
        "Total RBC count": { min: 4.5, max: 5.5, unit: "mill/cumm" },
        "Packed Cell Volume (PCV)": { min: 40, max: 50, unit: "%" },
        "Mean Corpuscular Volume (MCV)": { min: 80, max: 100, unit: "fL" },
        "MCH": { min: 27, max: 33, unit: "pg" },
        "MCHC": { min: 32, max: 36, unit: "g/dL" },
        "RDW": { min: 11.5, max: 14.5, unit: "%" },
        "Total WBC count": { min: 4000, max: 11000, unit: "cumm" },
        "Neutrophils": { min: 40, max: 60, unit: "%" },
        "Lymphocytes": { min: 20, max: 40, unit: "%" },
        "Eosinophils": { min: 1, max: 6, unit: "%" },
        "Monocytes": { min: 2, max: 10, unit: "%" },
        "Basophils": { min: 0, max: 2, unit: "%" },
        "Platelet Count": { min: 150000, max: 450000, unit: "cumm" }
    };

    const getValueColor = (testName, value) => {
        const range = referenceRanges[testName];
        if (!range) return "text-gray-100"; // Default color if no range defined

        // Extract numeric value from the string (e.g., "12.5 g/dL" -> 12.5)
        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) return "text-gray-100";

        if (numericValue < range.min) return "text-red-400";
        if (numericValue > range.max) return "text-yellow-400";
        return "text-green-400";
    };

    const renderValue = (value) => {
        if (typeof value === 'object' && value !== null) {
            return (
                <div className="pl-4 border-l-2 border-gray-600">
                    {Object.entries(value).map(([subKey, subValue]) => (
                        <div key={subKey} className="mb-2">
                            <span className="font-medium">{subKey}: </span>
                            <span>{subValue}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return <span>{value}</span>;
    };

    return (
        <div className="box1 bg-[#2c2c2c] w-full h-50 rounded-2xl major-compaints">
            <p className="text-center pt-3 text-white font-light">Test Results</p>
            {findings && (
                <div className="px-4 py-2 text-white text-sm h-[calc(100%-40px)] overflow-y-auto custom-scrollbar">
                    <div className="pb-4">
                        {Object.entries(findings).map(([key, value]) => (
                            <div key={key} className="mb-2">
                                <span className="font-medium">{key}: </span>
                                <span className={getValueColor(key, value)}>
                                    {renderValue(value)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TestResults 