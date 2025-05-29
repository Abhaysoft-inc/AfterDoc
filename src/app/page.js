'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [getRecommendations, setGetRecommendations] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
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
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('getRecommendations', getRecommendations);

      const response = await fetch('/api/analyze-report', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze report');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Medical Report Analysis</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Medical Report (PDF, JPEG, or PNG)
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="getRecommendations"
                checked={getRecommendations}
                onChange={(e) => setGetRecommendations(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="getRecommendations" className="ml-2 block text-sm text-gray-700">
                Get health recommendations if abnormalities are found
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Analyzing...' : 'Analyze Report'}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-8">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Analysis Results</h2>
              <div className="space-y-4">
                {Object.entries(result.data).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-200 pb-4">
                    <h3 className="font-medium text-gray-700 capitalize mb-2">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    {typeof value === 'object' ? (
                      <pre className="bg-gray-50 p-3 rounded-md overflow-x-auto">
                        {JSON.stringify(value, null, 2)}
                      </pre>
                    ) : (
                      <p className="text-gray-600">{value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {result.treatmentRecommendations && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Health Recommendations</h2>
                <div className="space-y-6">
                  {result.treatmentRecommendations.generalRecommendations && (
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">General Recommendations</h3>
                      <div className="space-y-4">
                        {result.treatmentRecommendations.generalRecommendations.map((rec, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium text-blue-600">{rec.category}</h4>
                            <div className="mt-2 space-y-1">
                              <p><span className="font-medium">Description:</span> {rec.description}</p>
                              <p><span className="font-medium">Importance:</span> {rec.importance}</p>
                              <p><span className="font-medium">Expected Outcome:</span> {rec.expectedOutcome}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.treatmentRecommendations.lifestyleChanges && (
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Lifestyle Changes</h3>
                      <div className="space-y-4">
                        {result.treatmentRecommendations.lifestyleChanges.map((change, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium text-blue-600">{change.change}</h4>
                            <div className="mt-2 space-y-1">
                              <p><span className="font-medium">Reason:</span> {change.reason}</p>
                              <p><span className="font-medium">Implementation:</span> {change.implementation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.treatmentRecommendations.dietaryGuidelines && (
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Dietary Guidelines</h3>
                      <div className="space-y-4">
                        {result.treatmentRecommendations.dietaryGuidelines.map((guideline, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium text-blue-600">{guideline.foodGroup}</h4>
                            <div className="mt-2 space-y-1">
                              <p><span className="font-medium">Recommendation:</span> {guideline.recommendation}</p>
                              <p><span className="font-medium">Benefits:</span> {guideline.benefits}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.treatmentRecommendations.monitoringInstructions && (
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Monitoring Instructions</h3>
                      <div className="space-y-4">
                        {result.treatmentRecommendations.monitoringInstructions.map((instruction, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium text-blue-600">{instruction.whatToMonitor}</h4>
                            <div className="mt-2 space-y-1">
                              <p><span className="font-medium">Frequency:</span> {instruction.frequency}</p>
                              {instruction.warningSigns && (
                                <div>
                                  <p className="font-medium">Warning Signs:</p>
                                  <ul className="list-disc list-inside">
                                    {instruction.warningSigns.map((sign, i) => (
                                      <li key={i} className="text-gray-600">{sign}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.treatmentRecommendations.followUpTests && (
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Follow-up Tests</h3>
                      <div className="space-y-4">
                        {result.treatmentRecommendations.followUpTests.map((test, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium text-blue-600">{test.testName}</h4>
                            <div className="mt-2 space-y-1">
                              <p><span className="font-medium">Purpose:</span> {test.purpose}</p>
                              <p><span className="font-medium">Timing:</span> {test.timing}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.treatmentRecommendations.precautions && (
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Precautions</h3>
                      <div className="space-y-4">
                        {result.treatmentRecommendations.precautions.map((precaution, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-md">
                            <h4 className="font-medium text-blue-600">{precaution.precaution}</h4>
                            <p className="mt-2"><span className="font-medium">Reason:</span> {precaution.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.treatmentRecommendations.expectedRecoveryTime && (
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Expected Recovery Time</h3>
                      <p className="text-gray-600">{result.treatmentRecommendations.expectedRecoveryTime}</p>
                    </div>
                  )}

                  {result.treatmentRecommendations.whenToSeekHelp && (
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">When to Seek Medical Help</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {result.treatmentRecommendations.whenToSeekHelp.map((situation, index) => (
                          <li key={index} className="text-gray-600">{situation}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
