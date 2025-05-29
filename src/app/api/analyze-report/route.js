import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { analyzeReport, getHealthRecommendations } from './gemini';
import { validateFileType } from './utils';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const getRecommendations = formData.get('getRecommendations') === 'true';
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    validateFileType(file);

    // Save the file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempPath = `/tmp/${Date.now()}-${file.name}`;
    await fs.writeFile(tempPath, buffer);

    try {
      // Read file content
      const fileContent = await fs.readFile(tempPath);
      
      // Analyze the report
      const parsedData = await analyzeReport(fileContent, file.type);

      // If abnormalities are found and recommendations are requested
      let treatmentRecommendations = null;
      if (getRecommendations && parsedData["Critical Values or Abnormalities"] && 
          Object.keys(parsedData["Critical Values or Abnormalities"]).length > 0) {
        treatmentRecommendations = await getHealthRecommendations(
          parsedData["Critical Values or Abnormalities"],
          parsedData["Patient Information"]
        );
      }

      // Return structured data
      return NextResponse.json({
        success: true,
        data: parsedData,
        treatmentRecommendations
      });

    } finally {
      // Clean up temporary file
      await fs.unlink(tempPath).catch(console.error);
    }

  } catch (error) {
    console.error('Error processing report:', error);
    return NextResponse.json(
      { error: 'Error processing report', details: error.message },
      { status: 500 }
    );
  }
} 