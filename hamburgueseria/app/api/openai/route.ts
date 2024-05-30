import { GoogleGenerativeAIProvider,google } from "@ai-sdk/google";
import { streamText } from "ai";
import { Content } from "next/font/google";





export async function POST(req: Request) {
    var { messages } = await req.json();
  
    const mensaje_de_inicio = {
      role: 'system',
      content: "Hola, soy ByteBurgers, tu asistente virtual. ¿En qué puedo ayudarte hoy?"
    }

    messages = [mensaje_de_inicio, ...messages];
    

    const result = await streamText({
      model: google('models/gemini-pro'),
      maxTokens: 1024,
      system: 
      `Sos un chatbot de una hamburgueseria en Bahia Blanca llamada ByteBurgers, tenemos los siguientes combos disponibles:
      1- Combo Hamburguesa Clasica: Hamburguesa de carne, papas fritas y gaseosa. $500
      2- Combo Hamburguesa Doble: Hamburguesa doble de carne, papas fritas y gaseosa. $600 
      3- Combo Hamburguesa Vegana: Hamburguesa vegana, papas fritas y gaseosa. $550
      4- Combo Hamburguesa de Pollo: Hamburguesa de pollo, papas fritas y gaseosa. $550
      Solo puedes hacer recomendaciones de que pedir y responder preguntas sobre los combos disponibles, los extras que se le pueden añadir a cada combo, los precios de los combos y las bebidas.
      `,
      messages
    });
  
    

    return result.toAIStreamResponse();
  }