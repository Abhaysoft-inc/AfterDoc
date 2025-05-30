'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/pages/analysis/Navbar';

export default function PrescriptionAnalysis() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/analyze-prescription', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 503) {
          throw new Error('The AI service is temporarily unavailable. Please try again in a few moments.');
        }
        throw new Error(data.error || 'Failed to analyze prescription');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleSubmit(new Event('submit'));
  };

  const handleNewUpload = () => {
    setResult(null);
    setFile(null);
    setFileName('');
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c]">
      <div className="mx-0 py-2">
        <div className="flex justify-center w-full">
          <Navbar />
        </div>
        
        <div className="mt-2">
          {/* Upload Section - Only show if no result */}
          {!result && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-[#2c2c2c] rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-bold text-center text-white mb-8">
                  Prescription Analysis
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <div 
                      className="flex justify-center px-6 pt-8 pb-8 border-2 border-dashed border-gray-600 rounded-xl hover:border-indigo-500 transition-all duration-300 bg-[#1c1c1c]"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <div className="space-y-4 text-center">
                        <div className="flex justify-center">
                          <svg
                            className="h-16 w-16 text-indigo-500"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                          >
                            <span>Choose a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="text-sm text-gray-400">or drag and drop</p>
                          <p className="text-xs text-gray-500">
                            PDF, JPG, PNG up to 10MB
                          </p>
                        </div>
                        {fileName && (
                          <p className="text-sm text-indigo-400 mt-2">
                            Selected: {fileName}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-lg bg-red-900/50 p-4 border border-red-800">
                      <div className="flex flex-col space-y-2">
                        <h3 className="text-sm font-medium text-red-200">{error}</h3>
                        <button
                          onClick={handleRetry}
                          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
                        >
                          Click here to retry
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-300"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Analyzing Prescription...</span>
                      </div>
                    ) : (
                      'Analyze Prescription'
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Results Section */}
          {result?.prescription && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Prescription List */}
              <div className="lg:col-span-2">
                <div className="bg-[#2c2c2c] rounded-2xl p-6 shadow-xl">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Prescribed Medicines</h2>
                    <button
                      onClick={handleNewUpload}
                      className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-300 flex items-center space-x-1"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      <span>New Upload</span>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(() => {
                      const prescriptionArray = Array.isArray(result.prescription) 
                        ? result.prescription 
                        : result.prescription?.prescription;

                      if (!Array.isArray(prescriptionArray)) {
                        return (
                          <div className="text-gray-400 text-center py-8">
                            No prescription data available
                          </div>
                        );
                      }

                      return prescriptionArray.map((medicine, index) => (
                        <div 
                          key={index} 
                          className="bg-[#1c1c1c] rounded-xl p-6 hover:border hover:border-indigo-500/50 transition-all duration-300"
                        >
                          <h3 className="text-xl font-semibold text-white mb-4">
                            {medicine["Medicine name"] || medicine.medicine_name}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div>
                                <span className="text-sm font-medium text-gray-400">Dosage</span>
                                <p className="text-white mt-1">
                                  {medicine.Dosage || medicine.dosage}
                                </p>
                              </div>
                              <div>
                                <span className="text-sm font-medium text-gray-400">Primary Uses</span>
                                <p className="text-white mt-1">
                                  {medicine["Primary uses"] || medicine.primary_uses}
                                </p>
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-gray-400">Side Effects</span>
                              <p className="text-white mt-1">
                                {medicine["Common side effects"] || medicine.common_side_effects}
                              </p>
                            </div>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="lg:col-span-1">
                <div className="bg-[#2c2c2c] rounded-2xl p-6 shadow-xl">
                  <h2 className="text-2xl font-bold text-white mb-6">Important Information</h2>
                  <div className="space-y-6">
                    <div className="bg-[#1c1c1c] rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">Safety Guidelines</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-3 text-gray-300">
                          <svg className="h-5 w-5 text-indigo-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Take all medications exactly as prescribed by your doctor</span>
                        </li>
                        <li className="flex items-start space-x-3 text-gray-300">
                          <svg className="h-5 w-5 text-indigo-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Complete the full course of antibiotics even if you feel better</span>
                        </li>
                        <li className="flex items-start space-x-3 text-gray-300">
                          <svg className="h-5 w-5 text-indigo-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Consult your doctor if you experience any severe side effects</span>
                        </li>
                        <li className="flex items-start space-x-3 text-gray-300">
                          <svg className="h-5 w-5 text-indigo-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Keep medications out of reach of children</span>
                        </li>
                        <li className="flex items-start space-x-3 text-gray-300">
                          <svg className="h-5 w-5 text-indigo-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Store medications in a cool, dry place</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 