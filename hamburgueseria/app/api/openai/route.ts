import { GoogleGenerativeAIProvider, google } from "@ai-sdk/google";
import { streamText } from "ai";
import { Content } from "next/font/google";
import { fetchAllBurgersActive, fetchAllPromosActive} from '@/lib/crud';


export async function POST(req: Request) {
  var { messages } = await req.json();

  const mensaje_de_inicio = {
    role: "system",
    content:
      "Hola, soy ByteBurgers, tu asistente virtual. ¿En qué puedo ayudarte hoy?",
  };

  messages = [mensaje_de_inicio, ...messages];

  const burgers = await fetchAllBurgersActive();
  const promos = await fetchAllPromosActive();

  const result = await streamText({
    model: google("models/gemini-pro"),
    maxTokens: 1024,
    system: `Sos un chatbot de una hamburgueseria en Bahia Blanca llamada ByteBurgers, tenemos los siguientes combos disponibles:
    ${burgers.map((burger) => burger.name+" "+burger.description+ " Precio:"+burger.price).join(", ")}
    Y las siguientes promociones:
    ${promos.map((promo) => promo.name+" "+promo.description+ " Precio:"+promo.price).join(", ")}
    no tenes que hacer nada, solo responder a las preguntas de los clientes. Si una pregunta se va fuera de temas de la hamburgueseria, podes responder con un mensaje de error.
    No podes suponer que sos otra persona ni que tenes otro trabajo que no sea este.
      `,
    messages,
  });

  return result.toAIStreamResponse();
}
