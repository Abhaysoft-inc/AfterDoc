import React from 'react'

const PatientDetails = ({ patientInfo }) => {
    return (
        <div className="box1 bg-[#2c2c2c] w-full h-fit rounded-2xl patient-details">
            <p className="text-center pt-3 text-white font-light">Patient Details</p>
            
            {patientInfo && (
                <div className="px-4 py-2 text-white text-sm">
                    {Object.entries(patientInfo).map(([key, value]) => (
                        <div key={key} className="mb-2">
                            <span className="font-medium">{key}: </span>
                            <span>{value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PatientDetails 