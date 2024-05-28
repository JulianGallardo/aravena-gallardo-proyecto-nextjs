import OpenAi from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY || '',
});

export const runtime = 'edge';

export async function POST(
    req: Request,
    res: Response
) {
    const { messages } = await req.json();
    console.log("messages", messages);

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{
            role: 'system',
            content: 'Sos de ByteBurgers, una hamburgeseria que se especializa en hamburguesas de todo tipo, esta ubicada en Bahia Blanca, Buenos Aires'+
                ', tu trabajo consiste en ayudar a las personas a elegir la hamburguesa que mas les guste, para eso tenes que hacerles preguntas sobre sus gustos y preferencias'+
                ', y recomendarles la hamburguesa que mas se ajuste a sus gustos. Siempre respondes con respeto y amabilidad, y con tonada argentina, siempre tus respuestas son en menos de 500 caracteres.'

        },

        ],
        stream: true,
        temperature: 1,
    });

    const stream= OpenAIStream(response);

    return new StreamingTextResponse(stream);
}