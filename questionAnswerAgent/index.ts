import {
  TextFileReader,
  VectorStoreIndex,
  OpenAI,
  serviceContextFromDefaults,
  Metadata,
  Document
} from "llamaindex";
import { updateDataToMongo } from "../utils/databaseHelper";
import promptSync from 'prompt-sync';
const prompt = promptSync();

//get username to store the chat history in DB
const userName = prompt('Enter a valid user name to store the conversations: ');

//retreive the text document from the stored transcripts
let retreiveDocument : Document<Metadata>[] | undefined;
export const loadTranscript = async() =>{
    while (!retreiveDocument?.length){
        const fileName = prompt('Enter the File which you have a query with? ');
      try{
        retreiveDocument =  await new TextFileReader().loadData(`./transcript/${fileName}`)
      }catch(er){
        console.error('Error: enter a valid file stored')
      }
    }
}

//initializing the llm requirements
const openaiLLM = new OpenAI({
    model: "gpt-3.5-turbo",
  });
  
const serviceContext = serviceContextFromDefaults({ llm: openaiLLM });

//generate response from the chatbot for every query
export const questionAnswerBot = async (query:string) => {
    try {
      if(!retreiveDocument) throw new Error('Enter a valid Document')
      console.log("Thinking...");

      const vectorStoreIndexing = await VectorStoreIndex.fromDocuments(
        retreiveDocument,
        { serviceContext }
      ); //create a vector store and split the text and store as embeddings
      const queryEngine = vectorStoreIndexing.asQueryEngine(); //query the index or relevant inforamation related to the query
      const queryResponse = await queryEngine.query({ query }); //send to openai and return the response
      await updateDataToMongo({
        userName,
        query,
        response: queryResponse.response,
        createdAt: new Date().toISOString() //store as utc time format to maintain time consistency while receiving
      }) //store the data to the mongoDB
      console.log(queryResponse.response)
      return queryResponse.response;
    } catch (er) {
      console.log(er);
    }
  }; //Code refernced from the llama index documentation


//send each conversation to chatbot and return response
loadTranscript().then(async(_1)=>{
    let query: string = ''
    while (query!==':qa'){
        query = prompt('Your question? (To Exit type :qa): ');
        if(query==':qa') {
            console.log('Thank you for utilizing me.')
            return
        } //exit
        await questionAnswerBot(query).catch(console.error);
    }
}).catch(console.error);  

// testEnglishSalesCallTranscript


