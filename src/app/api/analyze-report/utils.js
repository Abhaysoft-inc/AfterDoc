// Helper function to clean and parse JSON response
export function cleanAndParseJSON(text) {
  try {
    // Remove markdown code block syntax if present
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw new Error('Failed to parse model response as JSON');
  }
}

// Helper function to validate file type
export function validateFileType(file) {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.');
  }
  return true;
} 