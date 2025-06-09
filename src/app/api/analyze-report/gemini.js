import { GoogleGenerativeAI } from '@google/generative-ai';
import { cleanAndParseJSON } from './utils';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to analyze medical report
export async function analyzeReport(fileContent, fileType) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `Analyze this medical report and extract the following information in a structured format:
  1. Patient Information
  2. Test Type (MRI, X-Ray, ECG, etc.)
  3. Test Date
  4. Findings/Results
  5. Recommendations
  6. Any critical values or abnormalities (return as an array of objects with 'name' and 'value' properties)
  7. Major complaints (Must be in single line or points)
  
  For critical values, format them as an array of objects like this:
  "Any critical values or abnormalities": [
    {
      "name": "Test/Parameter name",
      "value": "Actual value with units"
    }
  ]
  
  Return ONLY a JSON object without any markdown formatting or additional text.`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        mimeType: fileType,
        data: fileContent.toString('base64')
      }
    }
  ]);

  const response = await result.response;
  return cleanAndParseJSON(response.text());
}

// Function to get health recommendations
export async function getHealthRecommendations(abnormalities, patientInfo) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `Based on the following medical abnormalities and patient information, provide general health recommendations and lifestyle guidance in a structured format:

Patient Information:
${JSON.stringify(patientInfo)}

Abnormalities:
${JSON.stringify(abnormalities)}

Return a JSON object with the following structure:
{
  "generalRecommendations": [
    {
      "category": "category name",
      "description": "detailed description of the recommendation",
      "importance": "high/medium/low",
      "expectedOutcome": "what to expect from following this recommendation"
    }
  ],
  "lifestyleChanges": [
    {
      "change": "specific lifestyle change",
      "reason": "why this change is recommended",
      "implementation": "how to implement this change"
    }
  ],
  "dietaryGuidelines": [
    {
      "foodGroup": "specific food group or type",
      "recommendation": "what to include or avoid",
      "benefits": "why this is beneficial"
    }
  ],
  "monitoringInstructions": [
    {
      "whatToMonitor": "what to keep track of",
      "frequency": "how often to monitor",
      "warningSigns": ["list of warning signs to watch for"]
    }
  ],
  "followUpTests": [
    {
      "testName": "name of recommended test",
      "purpose": "why this test is recommended",
      "timing": "when to get this test"
    }
  ],
  "precautions": [
    {
      "precaution": "specific precaution to take",
      "reason": "why this precaution is important"
    }
  ],
  "expectedRecoveryTime": "estimated time for improvement",
  "whenToSeekHelp": ["list of situations when to seek medical help"]
}

Return ONLY a JSON object without any markdown formatting or additional text.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return cleanAndParseJSON(response.text());
} 