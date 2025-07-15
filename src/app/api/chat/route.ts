import { NextResponse } from "next/server";

const OLLAMA_MODEL_NAME = process.env.OLLAMA_MODEL_NAME || "llama2";
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return new NextResponse("Prompt é obrigatório", { status: 400 });
  }

  try {
    const ollamaApiUrl = `${OLLAMA_BASE_URL}/api/generate`;

    const ollamaResponse = await fetch(ollamaApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL_NAME,
        prompt: prompt,
        stream: true,
      }),
    });

    if (!ollamaResponse.ok || !ollamaResponse.body) {
      const errorText = await ollamaResponse.text();
      console.error("Erro na API do Ollama:", errorText);
      return new NextResponse(`Erro na API do Ollama: ${errorText}`, {
        status: ollamaResponse.status,
      });
    }

    const readableStream = new ReadableStream({
      async start(controller) {
        const reader = ollamaResponse.body!.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.trim() === "") continue;
            try {
              const data = JSON.parse(line);
              if (data.response) {
                controller.enqueue(data.response);
              }
              if (data.done) {
                controller.close();
                return;
              }
            } catch (e) {
              console.error(
                "Erro ao fazer parse do JSON do stream:",
                e,
                "Linha:",
                line,
              );
            }
          }
        }
        controller.close();
      },
      cancel() {
        console.log("Stream cancelado pelo cliente.");
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Erro geral no manipulador da API:", error);
    return new NextResponse(
      "Erro interno do servidor ao processar a solicitação.",
      { status: 500 },
    );
  }
}
