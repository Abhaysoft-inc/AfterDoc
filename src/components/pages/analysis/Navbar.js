import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path) => {
        return pathname === path;
    };

    const handleNavigation = (path) => {
        router.push(path);
    };

    return (
        <div className='bg-[#303030] h-[45px] w-full max-w-[600px] rounded-full flex items-center'>
            <div className="flex justify-between items-center w-full px-1">
                <p 
                    onClick={() => handleNavigation('/analysis')}
                    className={`Analysis py-1 px-5 rounded-full text-lg cursor-pointer transition-all duration-300 ${
                        isActive('/analysis') 
                            ? 'bg-white text-[#4a4a4a]' 
                            : 'text-white hover:bg-[#404040]'
                    }`}
                >
                    Analysis
                </p>
                <p 
                    onClick={() => handleNavigation('/prescription')}
                    className={`Analysis py-1 px-5 rounded-full text-lg cursor-pointer transition-all duration-300 ${
                        isActive('/prescription') 
                            ? 'bg-white text-[#4a4a4a]' 
                            : 'text-white hover:bg-[#404040]'
                    }`}
                >
                    Prescription
                </p>
                <p 
                    onClick={() => handleNavigation('/docfinder')}
                    className={`Analysis py-1 px-5 rounded-full text-lg cursor-pointer transition-all duration-300 ${
                        isActive('/docfinder') 
                            ? 'bg-white text-[#4a4a4a]' 
                            : 'text-white hover:bg-[#404040]'
                    }`}
                >
                    DocFinder
                </p>
                <p 
                    onClick={() => handleNavigation('/altmed')}
                    className={`Analysis py-1 px-5 rounded-full text-lg cursor-pointer transition-all duration-300 ${
                        isActive('/altmed') 
                            ? 'bg-white text-[#4a4a4a]' 
                            : 'text-white hover:bg-[#404040]'
                    }`}
                >
                    AltMed
                </p>
                <p 
                    onClick={() => handleNavigation('/contact')}
                    className={`Analysis py-1 px-5 rounded-full text-lg cursor-pointer transition-all duration-300 ${
                        isActive('/contact') 
                            ? 'bg-white text-[#4a4a4a]' 
                            : 'text-white hover:bg-[#404040]'
                    }`}
                >
                    Contact
                </p>
            </div>
        </div>
    )
}

export default Navbar