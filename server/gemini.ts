import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Get the Gemini model
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

/**
 * Simplifies complex legal text into an easy-to-understand explanation
 * @param text - The legal text to simplify
 * @returns Simplified explanation with summary and key points
 */
export async function explainLegalText(text: string) {
  try {
    const prompt = `
      Please analyze the following legal document or policy and provide:
      1. A brief summary (1-2 sentences) that captures the essence of the document
      2. A detailed explanation in simple, everyday language (4-5 sentences)
      3. 3-5 key points that are important to understand
      
      Format the response as JSON with the following structure:
      {
        "summary": "Brief summary here",
        "explanation": "Detailed explanation here",
        "keyPoints": ["Key point 1", "Key point 2", "Key point 3"]
      }
      
      Here is the legal text to explain:
      
      ${text}
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const textResponse = response.text();
    
    // Extract the JSON part from the response
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse response from Gemini API');
    }
    
    // Parse the JSON
    const parsedResponse = JSON.parse(jsonMatch[0]);
    
    return {
      id: Date.now(),  // Generate a unique ID for the explanation
      query: text,
      summary: parsedResponse.summary,
      explanation: parsedResponse.explanation,
      keyPoints: parsedResponse.keyPoints
    };
  } catch (error) {
    console.error('Error explaining legal text with Gemini:', error);
    throw new Error('Failed to generate explanation. Please try again.');
  }
}