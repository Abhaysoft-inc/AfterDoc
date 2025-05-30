import React from 'react'

const TestInfo = ({ testType, testDate }) => {
    return (
        <div className="box1 bg-[#2c2c2c] w-full h-50 rounded-2xl">
            {testType && (
                <div className="px-4 py-2">
                    <p className="text-center pt-3 text-white font-light">Test Information</p>
                    <div className="text-white text-sm mt-2">
                        <p><span className="font-medium">Test Type:</span> {testType}</p>
                        {testDate && (
                            <p><span className="font-medium">Test Date:</span> {testDate}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TestInfo 