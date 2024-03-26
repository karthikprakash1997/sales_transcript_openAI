const { questionAnswerBot, loadTranscript } = require("./index");
const fs = require("fs");
const { deleteFile } = require("../utils");
import promptSync from "prompt-sync";
import { readFromFile } from "../utils";
import { deleteChatHistory, getChatHistory } from "../utils/databaseHelper";
const prompt = promptSync();

jest.mock("prompt-sync", () => {
  jest.requireActual("prompt-sync");
  return jest.fn(() => (question: string) => {
    switch (question) {
      case "Enter a valid user name to store the conversations: ":
        return "John Doe";
      case "Enter the File which you have a query with? ":
        return "test.txt";
      case "Your question? (To Exit type :qa): ":
          return 'Write a suitable heading for the conversation?'
      default:
        return "";
    }
  });
});

describe("Check for test file generation", () => {
  const fileName = "./transcript/test.txt";

  beforeEach(() => {
    jest.spyOn(console, "log");
  });

  afterEach(() => {
    // Clean up the file after each test.
    jest.restoreAllMocks();
  });

  test("Check if the chatbot is providing a valid response", async () => {
    await loadTranscript()
    await expect(questionAnswerBot()).resolves;
    expect(console.log).toHaveBeenCalledWith(
      "Thinking..."
    );
  });

  test("Check if file is chat history is stored", async () => {
    const query = {userName: 'John Doe'}
    const response = await getChatHistory(query)
    expect(response).toBeDefined();
    await deleteChatHistory(query)
    deleteFile(fileName);
  });
});
