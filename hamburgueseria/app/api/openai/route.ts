import { streamText } from "ai";
import {google} from '@ai-sdk/google'

export async function POST(req: Request) {
    const { messages } = await req.json();
  
    const result = await streamText({
      model: google('models/gemini-pro'),
      messages,
    });
  
    return result.toAIStreamResponse();
  }