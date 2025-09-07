export async function improveSummaryOpenAI(apiKey: string, summary: string) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-instruct",
        messages: [
          {
            role: "system",
            content:
              "Você é um especialista em escrita de currículos. Melhore esse resumo e corrija se houver erros, mantendo tom profissional e objetivo.",
          },
          { role: "user", content: summary },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Falha OpenAI: ${response.status} - ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
