'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PrescriptionAnalysis() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [getMedicineUses, setGetMedicineUses] = useState(false);
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
      formData.append('getMedicineUses', getMedicineUses);

      const response = await fetch('/api/analyze-prescription', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze prescription');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Prescription Analysis
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Prescription
              </label>
              <div 
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
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
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, JPG, PNG up to 10MB
                  </p>
                  {fileName && (
                    <p className="text-sm text-indigo-600 mt-2">
                      Selected file: {fileName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="medicine-uses"
                name="medicine-uses"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={getMedicineUses}
                onChange={(e) => setGetMedicineUses(e.target.checked)}
              />
              <label
                htmlFor="medicine-uses"
                className="ml-2 block text-sm text-gray-900"
              >
                Get detailed information about medicine uses and applications
              </label>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze Prescription'}
            </button>
          </form>

          {result && (
            <div className="mt-8 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Prescription Analysis
                </h2>
                
                {/* Patient Information */}
                {result.prescription.patientInfo && (
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-700 mb-2">
                      Patient Information
                    </h3>
                    <div className="bg-white p-4 rounded-md shadow">
                      <pre className="whitespace-pre-wrap text-sm text-gray-600">
                        {JSON.stringify(result.prescription.patientInfo, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Doctor Information */}
                {result.prescription.doctorInfo && (
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-700 mb-2">
                      Doctor Information
                    </h3>
                    <div className="bg-white p-4 rounded-md shadow">
                      <pre className="whitespace-pre-wrap text-sm text-gray-600">
                        {JSON.stringify(result.prescription.doctorInfo, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Prescribed Medicines */}
                {result.prescription.medicines && (
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-700 mb-2">
                      Prescribed Medicines
                    </h3>
                    <div className="space-y-4">
                      {result.prescription.medicines.map((medicine, index) => (
                        <div key={index} className="bg-white p-4 rounded-md shadow">
                          <h4 className="font-medium text-gray-900 mb-2">
                            {medicine.name}
                          </h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Dosage:</span>{' '}
                              {medicine.dosage}
                            </div>
                            <div>
                              <span className="font-medium">Frequency:</span>{' '}
                              {medicine.frequency}
                            </div>
                            <div>
                              <span className="font-medium">Duration:</span>{' '}
                              {medicine.duration}
                            </div>
                            <div>
                              <span className="font-medium">Primary Uses:</span>{' '}
                              {medicine.primaryUses}
                            </div>
                            <div>
                              <span className="font-medium">How it works:</span>{' '}
                              {medicine.howItWorks}
                            </div>
                            <div>
                              <span className="font-medium">Side Effects:</span>{' '}
                              {medicine.sideEffects}
                            </div>
                          </div>

                          {/* Detailed Medicine Uses */}
                          {result.medicineUses && result.medicineUses[medicine.name] && (
                            <div className="mt-4 pt-4 border-t">
                              <h5 className="font-medium text-gray-900 mb-2">
                                Detailed Uses and Applications
                              </h5>
                              <div className="text-sm text-gray-600">
                                <div className="grid grid-cols-1 gap-4">
                                  <div>
                                    <span className="font-medium">Conditions Treated:</span>{' '}
                                    {result.medicineUses[medicine.name].primaryConditions}
                                  </div>
                                  <div>
                                    <span className="font-medium">Off-label Uses:</span>{' '}
                                    {result.medicineUses[medicine.name].offLabelUses}
                                  </div>
                                  <div>
                                    <span className="font-medium">Mechanism of Action:</span>{' '}
                                    {result.medicineUses[medicine.name].howItWorks}
                                  </div>
                                  <div>
                                    <span className="font-medium">Expected Benefits:</span>{' '}
                                    {result.medicineUses[medicine.name].expectedBenefits}
                                  </div>
                                  <div>
                                    <span className="font-medium">When to Expect Results:</span>{' '}
                                    {result.medicineUses[medicine.name].expectedResults}
                                  </div>
                                  <div>
                                    <span className="font-medium">Common Combinations:</span>{' '}
                                    {result.medicineUses[medicine.name].commonCombinations}
                                  </div>
                                  <div>
                                    <span className="font-medium">Age Considerations:</span>{' '}
                                    {result.medicineUses[medicine.name].ageConsiderations}
                                  </div>
                                  <div>
                                    <span className="font-medium">Lifestyle Recommendations:</span>{' '}
                                    {result.medicineUses[medicine.name].lifestyleRecommendations}
                                  </div>
                                  <div>
                                    <span className="font-medium">Warning Signs:</span>{' '}
                                    {result.medicineUses[medicine.name].warningSigns}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Instructions */}
                {result.prescription.additionalInstructions && (
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-700 mb-2">
                      Additional Instructions
                    </h3>
                    <div className="bg-white p-4 rounded-md shadow">
                      <p className="text-sm text-gray-600">
                        {result.prescription.additionalInstructions}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 