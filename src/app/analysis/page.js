"use client"

import Navbar from '@/components/pages/analysis/Navbar'
import PatientDetails from '@/components/pages/analysis/PatientDetails'
import TestResults from '@/components/pages/analysis/TestResults'
import CriticalValues from '@/components/pages/analysis/CriticalValues'
import TestInfo from '@/components/pages/analysis/TestInfo'
import Recommendations from '@/components/pages/analysis/Recommendations'
import MajorComplaints from '@/components/pages/analysis/MajorComplaints'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AnalysisPage = () => {
    const [result, setResult] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Get the analysis results from localStorage
        const storedResults = localStorage.getItem('analysisResults');
        if (storedResults) {
            try {
                const parsedResults = JSON.parse(storedResults);
                // Ensure all nested objects are properly handled
                if (parsedResults?.data?.["Findings/Results"]) {
                    Object.entries(parsedResults.data["Findings/Results"]).forEach(([key, value]) => {
                        if (typeof value === 'string') {
                            try {
                                // Try to parse if it's a stringified object
                                parsedResults.data["Findings/Results"][key] = JSON.parse(value);
                            } catch (e) {
                                // If parsing fails, keep the original string value
                                parsedResults.data["Findings/Results"][key] = value;
                            }
                        }
                    });
                }
                setResult(parsedResults);
            } catch (error) {
                console.error('Error parsing stored results:', error);
                router.push('/');
            }
        } else {
            router.push('/');
        }
    }, [router]);

    return (
        <>
            <div className="mx-0 py-2 min-h-screen bg-[#171717]">
                <div className="flex justify-center w-full">
                    <Navbar />
                </div>

                {/* mainscreen */}
                <div className="main-screen flex justify-between px-6 mt-2">
                    <div className="left w-70 px-1 py-1 space-y-3">
                        <PatientDetails patientInfo={result?.data?.["Patient Information"]} />
                        <TestResults findings={result?.data?.["Findings/Results"]} />
                        <CriticalValues criticalValues={result?.data?.["Any critical values or abnormalities"]} />
                    </div>

                    <div className="right w-70 px-1 py-1 space-y-3">
                        <TestInfo
                            testType={result?.data?.["Test Type"]}
                            testDate={result?.data?.["Test Date"]}
                        />
                        {/* Major Complaints */}
                        {result?.data?.["Major complaints"] && (
                            <MajorComplaints complaints={result?.data?.["Major complaints"]} />
                        )}
                        {/* Recommendations */}
                        {result?.data?.Recommendations && (
                            <Recommendations recommendations={result?.data?.Recommendations} />
                        )}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1c1c1c;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #404040;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #505050;
                }
            `}</style>
        </>
    )
}

export default AnalysisPage