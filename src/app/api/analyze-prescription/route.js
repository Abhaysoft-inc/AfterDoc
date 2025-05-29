import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { cleanAndParseJSON } from '../analyze-report/utils';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function analyzePrescription(fileContent, fileType) {
  const prompt = `Analyze this medical prescription and extract the list of prescribed medicines. 
  For each medicine, provide the following information in a structured JSON format:
  1. Medicine name
  2. Dosage
  3. Frequency
  4. Duration
  5. Primary uses and conditions it treats
  6. How it works (brief mechanism of action)
  7. Common side effects
  8. Important precautions
  9. Whether it's prescription-only or OTC
  10. Any specific instructions from the doctor

  Format the response as a clean JSON object without any markdown formatting.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return cleanAndParseJSON(text);
  } catch (error) {
    console.error('Error analyzing prescription:', error);
    throw new Error('Failed to analyze prescription');
  }
}

async function getMedicineUsesInfo(medicineName) {
  const prompt = `Provide detailed information about the uses and applications of "${medicineName}". Include:
  1. Primary medical conditions it treats
  2. Common off-label uses
  3. How it works in the body
  4. Typical treatment duration
  5. Expected benefits
  6. When to expect results
  7. Common combinations with other medicines
  8. Special considerations for different age groups
  9. Lifestyle recommendations while taking this medicine
  10. Warning signs to watch for

  Format the response as a clean JSON object without any markdown formatting.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return cleanAndParseJSON(text);
  } catch (error) {
    console.error('Error getting medicine uses:', error);
    throw new Error(`Failed to get uses for ${medicineName}`);
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const getMedicineUses = formData.get('getMedicineUses') === 'true';
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Save the file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempPath = `/tmp/${Date.now()}-${file.name}`;
    await fs.writeFile(tempPath, buffer);

    try {
      // Read file content
      const fileContent = await fs.readFile(tempPath);
      
      // Analyze the prescription
      const prescriptionData = await analyzePrescription(fileContent, file.type);

      // If detailed medicine uses are requested
      let medicineUses = null;
      if (getMedicineUses && prescriptionData.medicines) {
        medicineUses = {};
        for (const medicine of prescriptionData.medicines) {
          medicineUses[medicine.name] = await getMedicineUsesInfo(medicine.name);
        }
      }

      // Return structured data
      return NextResponse.json({
        success: true,
        prescription: prescriptionData,
        medicineUses
      });

    } finally {
      // Clean up temporary file
      await fs.unlink(tempPath).catch(console.error);
    }

  } catch (error) {
    console.error('Error processing prescription:', error);
    return NextResponse.json(
      { error: 'Error processing prescription', details: error.message },
      { status: 500 }
    );
  }
}