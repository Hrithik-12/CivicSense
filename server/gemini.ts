
// Updated gemini.ts file
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Add these types at the top of the file
interface GeminiResponse {
  summary: string;
  explanation: string;
  keyPoints: string[];
}

interface ExplanationResult {
  id: number;
  query: string;
  summary: string;
  explanation: string;
  keyPoints: string[];
  timestamp: string;
}

// Load environment variables
dotenv.config();

// Get API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('GEMINI_API_KEY is not set in environment variables');
  throw new Error('GEMINI_API_KEY is not set in environment variables');
}

// Initialize the Google Generative AI with API key
const genAI = new GoogleGenerativeAI(API_KEY);

// Get the Gemini model
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

/**
 * Simplifies complex legal text into an easy-to-understand explanation
 * @param text - The legal text to simplify
 * @param type - The type of text (policy or document)
 * @param language - The language for the explanation
 * @returns Simplified explanation with summary and key points
 */
export async function explainLegalText(
  text: string, 
  type: string = 'policy',
  language: string = 'en'
): Promise<ExplanationResult> {
  if (!text?.trim()) {
    throw new Error('Text input is required');
  }

  try {
    // Adjust the prompt based on the type
    let contextPrefix = '';
    if (type === 'policy') {
      contextPrefix = 'law or policy';
    } else if (type === 'document') {
      contextPrefix = 'legal document';
    } else {
      contextPrefix = 'text';
    }

    const prompt = `
      Please analyze the following ${contextPrefix} and provide in ${language} language:
      1. A brief summary (1-2 sentences) that captures the essence of the document
      2. A detailed explanation in simple, everyday language (4-5 sentences)
      3. 3-5 key points that are important to understand
      
      Format the response as JSON with the following structure:
      {
        "summary": "Brief summary here",
        "explanation": "Detailed explanation here",
        "keyPoints": ["Key point 1", "Key point 2", "Key point 3"]
      }
      
      Here is the text to explain:
      ${text}
    `.trim();

    console.log('Sending prompt to Gemini:', prompt.substring(0, 100) + '...');
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const textResponse = response.text();
    
    console.log('Received response from Gemini:', textResponse.substring(0, 100) + '...');

    // Extract and validate JSON response
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Failed to parse JSON from response:', textResponse);
      throw new Error('Failed to parse response from Gemini API');
    }

    let parsedResponse: GeminiResponse;
    try {
      parsedResponse = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Response:', textResponse);
      throw new Error('Invalid JSON format in Gemini response');
    }

    // Validate response structure
    if (!parsedResponse.summary || !parsedResponse.explanation || !Array.isArray(parsedResponse.keyPoints)) {
      console.error('Invalid response structure:', parsedResponse);
      throw new Error('Invalid response structure from Gemini API');
    }

    return {
      id: Date.now(),
      query: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      summary: parsedResponse.summary,
      explanation: parsedResponse.explanation,
      keyPoints: parsedResponse.keyPoints,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error explaining legal text with Gemini:', error);
    throw new Error(
      error instanceof Error
        ? `Failed to generate explanation: ${error.message}`
        : 'Failed to generate explanation. Please try again.'
    );
  }
}
