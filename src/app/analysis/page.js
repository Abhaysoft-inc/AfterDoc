import Navbar from '@/components/pages/analysis/Navbar'
import React from 'react'

const AnalysisPage = () => {
    return (
        <>
            <div className=" mx-0 py-3 bg-[#1c1c1c]">
                <div className="flex justify-center w-full">
                    <Navbar />
                </div>

                {/* mainscreen */}

                <div className="main-screen flex justify-between px-6 mt-2">
                    <div className="left w-70  px-1 py-1 space-y-4">

                        <div className="box1 bg-[#2c2c2c] w-full h-50 rounded-2xl patient-details">
                            <p className="text-center pt-3 text-white font-light">Patient Details</p>

                        </div>
                        <div className="box1 bg-[#2c2c2c] w-full h-50 rounded-2xl major-compaints">
                            <p className="text-center pt-3 text-white font-light">Major Complaints</p>
                        </div>
                        <div className="box1 bg-[#2c2c2c] w-full h-30 rounded-2xl">
                            <p className="text-center text-white font-light pt-3">Find a Doctor</p> </div>
                    </div>

                    <div className="right   w-70 grid grid-cols-1 px-1 py-1 space-y-2">
                        <div className="box1 bg-[#2c2c2c] w-full h-50 rounded-2xl"> </div>
                        <div className="box1 bg-[#2c2c2c] w-full h-50 rounded-2xl"> </div>
                        <div className="box1 bg-[#2c2c2c] w-full h-50 rounded-2xl"> </div>


                    </div>

                </div>

            </div>
        </>
    )
}

export default AnalysisPage