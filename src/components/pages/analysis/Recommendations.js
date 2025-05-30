import React from 'react'

const Recommendations = ({ recommendations }) => {
    return (
        <div className="box1 bg-[#2c2c2c] w-full h-fit rounded-2xl pb-3">
            {recommendations && (
                <div className="px-4 py-2">
                    <p className="text-center pt-3 text-white font-light">Recommendations</p>
                    <div className="text-white text-sm mt-2">
                        {recommendations ? (
                            <p>{recommendations}</p>
                        ) : (
                            <p>No specific recommendations provided</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Recommendations 