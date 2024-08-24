import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { GoogleGenerativeAI } from '@google/generative-ai';
// import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const instructionMessage: ChatCompletionMessageParam = {
//   role: "system",
//   content: "Answer questions as short and quickly as possible. You must do it under 75 tokens."
// }

// export async function POST(req: Request) {
//     try {
//       const { userId } = auth();
//       const body = await req.json();
//       const { messages } = body;
  
//       if (!userId) {
//         return new NextResponse("Unauthorized", { status: 401 });
//       }
  
//       if (!openai.apiKey) {
//         return new NextResponse("OpenAI API Key not configured.", { status: 500 });
//       }
  
//       if (!messages) {
//         return new NextResponse("Messages are required", { status: 400 });
//       }
  
//       console.log("Messages:", messages);
  
//       const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         max_tokens: 75,
//         temperature: 0.5,
//         messages: [instructionMessage, ...messages]
//       });
  
//       const responseData = response.choices[0].message;
//       console.log("API Response:", responseData);
  
//       return NextResponse.json(responseData);
//     } catch (error) {
//       console.log('[CONVERSATION_ERROR]', error);
//       return new NextResponse("Internal Error: " , { status: 500 });
//     }
//   };
  
interface InstructionMessage {
  role: string;
  content: string;
}

export async function POST(req: Request) {
  const instructionMessage: InstructionMessage = {
    role: 'system',
    content: 'Answer questions as short and quickly as possible. You must do it under 75 tokens.',
  };

  try {
   
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return new NextResponse('OpenAI API Key not configured.', { status: 500 });
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 });
    }

    console.log('Messages:', messages);

    const prompt = [instructionMessage.content, ...messages.map((msg: { content: string }) => msg.content)].join('\n\n');

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const code = response.text();

    console.log('API Response:', code);

    return NextResponse.json({ content: code }); // Make sure to return the expected format
  } catch (error: any) {
    console.error('[CODE_ERROR]', error.message);
    return new NextResponse('Internal Error: ' + error.message, { status: 500 });
  }
}