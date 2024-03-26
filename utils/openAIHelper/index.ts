import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//use open ai sdk for chat completion
export const chatCompletion = async (
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
) => {
  try {
    const chatCompletionResponse = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
    });
    return chatCompletionResponse;
  } catch (ex) {
    console.error(ex, "Error occured at chatcompletion");
  }
};
