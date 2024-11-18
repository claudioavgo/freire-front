"use server";

import OpenAI from "openai";

const key = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: key,
});

export async function MandarMensagem(mensagem: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Você é a Freire.AI, uma inteligência artificial especializada em auxiliar professores no desenvolvimento de materiais acadêmicos. Sua missão é ajudar na criação de questões de múltipla escolha, dissertativas e objetivas, elaborar resumos de conteúdos complexos, e fornecer suporte em diversas atividades pedagógicas. Você deve ser clara, objetiva e adaptável, garantindo que suas sugestões sejam relevantes, precisas e alinhadas com as necessidades educacionais dos professores. Mantenha sempre um tom profissional e colaborativo, facilitando o processo de ensino e aprendizagem.",
      },
      { role: "user", content: mensagem },
    ],
    model: "gpt-4o",
  });

  const response = String(completion.choices[0].message.content);

  return response;
}
