import React from 'react'

const MajorComplaints = ({ complaints }) => {
    return (
        <div className="box1 bg-[#2c2c2c] w-full h-fit rounded-2xl pb-3">
            {complaints && (
                <div className="px-4 py-2">
                    <p className="text-center pt-3 text-white font-light">Major Complaints</p>
                    <div className="text-white text-sm mt-2">
                        <p>{complaints}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MajorComplaints 