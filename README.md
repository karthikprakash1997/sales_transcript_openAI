# Project README for Momentum Assignment

Welcome to our Node.js project! This guide will help you run the various scripts and test suites included in the project.

## Getting Started

To get started, make sure that you have `Node.js` and `npm` installed on your system. If you don't have them installed, please follow the [official Node.js installation guide](https://nodejs.org/en/download/).

### Installation

Before running any scripts, install the project dependencies by executing the following command in your terminal:

```bash
npm install
```

This will install all the required packages listed under `dependencies` and `devDependencies` in the `package.json` file.

## Running Scripts

In this project, we have several npm scripts set up to run different tasks:

- **questionAnswerAgent**: Runs the script for the Question Answer Agent.
- **generateCallTranscript**: Executes the script to generate call transcripts.
- **summarizeCallTranscript**: Triggers the script that summarizes call transcripts.

**utils** folder has helper functions that are used across the services/scripts like database helpers, fileStorageHelper, openAIHelper. Each folder has a test file with .spec.ts extension.

To run any of these scripts, use the `npm run` command followed by the script name. For example:

```bash
npm run questionAnswerAgent
```

## Testing

The project uses Jest for testing. There are individual test commands for different parts of the application as well as a combined test script that runs all tests sequentially.

Here's how you can run tests:

- To run tests for generating call transcripts:
  ```bash
  npm run test1
  ```
- To run tests for summarizing call transcripts:
  ```bash
  npm run test2
  ```
- To run tests for the Question Answer Agent:
  ```bash
  npm run test3
  ```

If you wish to run all tests together in the specified sequence, you can simply execute:

```bash
npm test
```

This will run `test1`, `test2`, and `test3` in order.

Remember that tests might take some time to complete, especially since they're configured with a timeout of 60000ms (60 seconds). They are also run in-band to avoid conflicts when accessing resources, and forced to exit after completion to prevent hanging processes.


## Note
Ensure you have the necessary `.env` file at the root of your project containing all the environment variables needed for the scripts and tests to run correctly. your .env file should contain:

 - OPENAI_API_KEY=**open ai key**
 - MONGO_URL=mongodb+srv://karthiktestunofficial:FjqahsxobY5KJ4m4@cluster0.y1fmbvm.mongodb.net/ **your own mongoDB if needed i have used a hosted mongoDB here**
 - DB_NAME=developmentalone

**Code Explanation**

**1. GenerateCallTranscript:** The working of generate call transcript is as follows,

 - Prompt the user to select a language
 - Prompt the user to choose a valid filename to store the transcript
 - Leverage open ai and add adequate prompt with the required format to the openai and store the response in the file 
 - Used Temperate paramter as 1 so that response is quite creative and varies which is suitable for content generation

 **2. SummarizeCallTranscript:** The working of summarize call transcript is as follows,
 
 - Prompt the user to select the file needs to be summarized
 - After reading the contents in the file will send the summary prompt to openai and receive the summary within 100 words.
 - Log the response for the user.
 - Temperature is set to zero as the content should be as close the input text as possible and not varying, and also the max_token is not set as we have mentioned the word length in prompt.

  **2. QuestionAnswerAgent:** The working of question answer agent is as follows,

  - Prompt the user to select the file
  - Leveraged a tool called Llama index to store the document as a vector store and queried the required content and send it to openAI and return the response to the user, though this method is not much suited for small texts when we need to create a RAG based application with large context window or size then the chunking and querying using this framework becomes easier. 
  - Report the answer to the user and store the chat history in the Database.

Also added three utility files to reuse the functions and helpers for reading, writing and deleting file and values in DB as well as openAI sdk.


**Enhancements:**
- Add more test cases and improve test coverage
- Can improve accuracy of the response by adding few shot prompting if more examples are provided
- Utilise langchain for more accurate text generation format 
- Add more language selection

Note: The codebase also contains a folder called transcipt which have some demo transripts being generated for various temperatures 0, 1, 0.85

Open AI usage: Open ai has been used at a minimal level especially in adding boilder plate code for storing chat history and also in test cases, since llama index is new framework the openAI is not aware of that, with respect to the prompts i refered to my notes from deeplearning.ai prompt engineering course. 



