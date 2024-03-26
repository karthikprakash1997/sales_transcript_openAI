import {chatCompletion, readFromFile} from '../utils';
import OpenAI from 'openai';
import promptSync from 'prompt-sync';
const prompt = promptSync();

//prompt to summarize the transcript generated
const SUMMARIZE_CALL_TRANSCRIPT_PROMPT = `
Your task is to generate a short summary of a sales call highlighting the key points.
Summarize the below sales call, in at most 100 words. :{salescall}` //utilized a course material from deeplearning.ai for prompt engineering

//get the transcript document from the user to be summarized
let readTranscript: string | undefined = ''
while (!readTranscript){
    const fileName = prompt('Enter the File which you want to summarize? ');
    readTranscript = readFromFile(`./transcript/${fileName}`);
}

//summazie the transcript
export const summarizeCallTranscript = async() =>{
    try{
        if(!readTranscript) throw new Error('Error: enter a valid file name')
        console.log('Please wait while i am summarizing your transcript');
        const chatCompletionMessages:OpenAI.Chat.Completions.ChatCompletionMessageParam[]  = [
            { role: 'user', content: SUMMARIZE_CALL_TRANSCRIPT_PROMPT.replace(':{salescall}',readTranscript )}
         ]
        const summary = await chatCompletion(chatCompletionMessages)
        console.log(`Summary: ${summary?.choices[0].message.content}`)
        return summary?.choices[0];
    }
    catch(er){
        console.log(er)
        throw new Error("Error: error at summarizereadTranscript");
    }
}

summarizeCallTranscript().then().catch(console.error);
