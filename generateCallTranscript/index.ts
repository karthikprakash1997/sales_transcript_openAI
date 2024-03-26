import { chatCompletion, uploadContentToFile } from "../utils";
import OpenAI from "openai";
import promptSync from 'prompt-sync';
const prompt = promptSync();

//options to choose a language from
const langauges: { [key: string]: string } = {
  "1": "English",
  "2": "French",
  "3": "Spanish",
};

//prompt to generate a sales call transcript
const GENERATE_CALL_TRANSCRIPT_PROMPT = `
Generate a list of twenty made-up sales call between only two represntatives of two tech companies in :{language} along
with their timestamp, name, organization website and message with each item listed on a separate line without using bullet points or slashes.. 
Provide them in the following format: 
timestamp in mm:hh:ss name (organization website): message, with each conversation in each line.`;  //utilized a course material from deeplearning.ai for prompt engineering


//loop in to get a proper selection of language from the user
let languageInput: string = "";

while (!Object.keys(langauges).includes(languageInput)) {
  languageInput = prompt("Enter a language 1-English 2-French 3-Spanish: ");

  if (!Object.keys(langauges).includes(languageInput)) {
    console.error("Invalid input received");
  }
}

//get the filename in which the transcript needs to be stored
let fileName: string = ''

while(!fileName){
  fileName = prompt(
    "Enter the File name where the transcript needs to be stored? "
  );

  if(!fileName) console.error('Please enter a valid filename')
}

//generate transcript based on the user feedback
export const generateCallTranscript = async () => {
  try {
    console.log("Please wait while we cook your transcript.");
    const chosenLanguage = langauges[Number(languageInput)];
    const chatCompletionMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] =
      [
        {
          role: "user",
          content: GENERATE_CALL_TRANSCRIPT_PROMPT.replace(
            ":{language}",
            chosenLanguage
          ),
        },
      ];
    const transcript = await chatCompletion(chatCompletionMessages, 1);
    uploadContentToFile(
      "transcript",
      `${fileName}.txt`,
      transcript?.choices[0].message.content || ""
    );
    return transcript?.choices[0];
  } catch (er) {
    console.log(er);
    throw new Error("Error: error at generateCallTranscript");
  }
};

generateCallTranscript()
  .then((_1) => console.log("Transcript genereated successfully"))
  .catch(console.error);
