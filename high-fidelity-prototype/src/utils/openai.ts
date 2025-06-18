import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true // Required for client-side usage
});

export interface TLDRSummary {
  summary: string;
  keyPoints: string[];
}

export async function generateTLDR(content: string, title: string): Promise<TLDRSummary> {
  console.log('🚀 Starting TLDR generation...');
  console.log('📄 Post title:', title);
  console.log('📝 Content length:', content.length, 'characters');
  console.log('🔑 API key configured:', !!process.env.NEXT_PUBLIC_OPENAI_API_KEY);
  console.log('🔑 API key preview:', process.env.NEXT_PUBLIC_OPENAI_API_KEY ? 
    process.env.NEXT_PUBLIC_OPENAI_API_KEY.substring(0, 10) + '...' : 'Not set');

  if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    console.error('❌ OpenAI API key not configured');
    throw new Error('OpenAI API key not configured');
  }

  try {
    const prompt = `Please provide a TLDR (Too Long; Didn't Read) summary for the following blog post.

Title: "${title}"

Content: "${content}"

Please respond with a JSON object containing:
1. A brief "summary" (2-3 sentences max)
2. An array of 3-5 "keyPoints" (each point should be one short sentence)

Format your response as valid JSON only, no additional text.`;

    console.log('📤 Sending request to OpenAI...');
    console.log('📤 Request details:', {
      model: "gpt-4o-mini-2024-07-18",
      max_tokens: 300,
      temperature: 0.3,
      promptLength: prompt.length
    });

    const startTime = Date.now();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant that creates concise, accurate summaries of blog posts. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.3,
    });
    const endTime = Date.now();

    console.log('📥 Received response from OpenAI');
    console.log('⏱️ Request took:', endTime - startTime, 'ms');
    console.log('📊 Usage:', completion.usage);
    console.log('🎯 Completion details:', {
      id: completion.id,
      model: completion.model,
      choices: completion.choices.length
    });

    const response = completion.choices[0]?.message?.content;
    console.log('📝 Raw response:', response);
    
    if (!response) {
      console.error('❌ No response content from OpenAI');
      throw new Error('No response from OpenAI');
    }

    console.log('🔄 Parsing JSON response...');

    // --- BEGIN Robust JSON Parsing ---
    let jsonText = response.trim();

    // Remove code block markers like ```json or ```
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```[a-zA-Z]*\n?/g, '').replace(/```$/g, '').trim();
    }

    // Try direct JSON parse first
    let parsedResponse: any;
    try {
      parsedResponse = JSON.parse(jsonText);
    } catch (primaryErr) {
      console.warn('⚠️ Direct JSON.parse failed, attempting fallback extraction');
      // Attempt to extract JSON substring
      const firstBrace = jsonText.indexOf('{');
      const lastBrace = jsonText.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        const possibleJson = jsonText.substring(firstBrace, lastBrace + 1);
        try {
          parsedResponse = JSON.parse(possibleJson);
        } catch (secondaryErr) {
          console.error('❌ Fallback JSON.parse also failed');
          console.error('Primary error:', primaryErr);
          console.error('Secondary error:', secondaryErr);
          throw new Error('Failed to parse JSON from OpenAI response');
        }
      } else {
        console.error('❌ Could not locate JSON braces in response');
        throw new Error('Failed to parse JSON from OpenAI response');
      }
    }
    console.log('✅ Successfully parsed JSON:', parsedResponse);
    // --- END Robust JSON Parsing ---
    
    // Validate the response structure
    console.log('🔍 Validating response structure...');
    console.log('📄 Summary exists:', !!parsedResponse.summary);
    console.log('📋 Key points is array:', Array.isArray(parsedResponse.keyPoints));
    console.log('📋 Key points count:', parsedResponse.keyPoints?.length);
    
    if (!parsedResponse.summary || !Array.isArray(parsedResponse.keyPoints)) {
      console.error('❌ Invalid response format:', {
        hasSummary: !!parsedResponse.summary,
        keyPointsIsArray: Array.isArray(parsedResponse.keyPoints),
        actualResponse: parsedResponse
      });
      throw new Error('Invalid response format from OpenAI');
    }

    const result = {
      summary: parsedResponse.summary,
      keyPoints: parsedResponse.keyPoints
    };

    console.log('🎉 TLDR generation completed successfully!');
    console.log('📄 Final summary length:', result.summary.length, 'characters');
    console.log('📋 Final key points:', result.keyPoints.length, 'items');
    
    return result;
  } catch (error) {
    console.error('💥 Error in generateTLDR:', error);
    
    // Enhanced error logging
    if (error instanceof Error) {
      console.error('❌ Error name:', error.name);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error stack:', error.stack);
    }
    
    // Check for specific error types
    // if (error.message?.includes('API key')) {
    //   console.error('🔑 API Key Error - Check your environment variables');
    // } else if (error.message?.includes('JSON')) {
    //   console.error('📝 JSON Parsing Error - OpenAI response was not valid JSON');
    // } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
    //   console.error('🌐 Network Error - Check your internet connection');
    // } else if (error.message?.includes('rate limit')) {
    //   console.error('⏰ Rate Limit Error - Too many requests to OpenAI');
    // } else if (error.message?.includes('quota')) {
    //   console.error('💳 Quota Error - Check your OpenAI billing/credits');
    // }
    
    throw new Error('Failed to generate AI summary. Please try again.');
  }
} 