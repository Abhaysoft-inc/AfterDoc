import React from 'react'

const Navbar = () => {
    return (
        <div className='bg-[#303030] h-[45px] w-full max-w-[600px] rounded-full flex items-center'>
            <div className="flex justify-between items-center w-full px-1
            ">
                <p className="Analysis bg-white text-[#4a4a4a] py-1 px-5 rounded-full text-lg cursor-pointer">Analysis</p>
                <p className="Analysis  text-white py-1 px-5 rounded-full text-lg font-light cursor-pointer">Prescription</p>
                <p className="Analysis  text-white py-1 px-5 rounded-full text-lg font-light cursor-pointer">DocFinder</p>
                <p className="Analysis  text-white py-1 px-5 rounded-full text-lg font-light cursor-pointer">AltMed</p>
                <p className="Analysis  text-white py-1 px-5 rounded-full text-lg font-light cursor-pointer">Contact</p>
            </div>
        </div>
    )
}

export default Navbar