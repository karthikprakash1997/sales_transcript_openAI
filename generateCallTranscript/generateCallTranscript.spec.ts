const { generateCallTranscript } = require("./index");
const fs = require("fs");
import { readFromFile } from "../utils";

//create a jest mock to add user input
jest.mock("prompt-sync", () => {
 jest.requireActual("prompt-sync");
  return jest.fn(() => (question: string) => {
    switch (question) {
      case "Enter a language 1-English 2-French 3-Spanish: ":
        return "1";
      case "Enter the File name where the transcript needs to be stored? ":
        return "test";
      default:
        return "";
    }
  });
});

describe("Check for generate call transcript", () => {
  const fileName = "./transcript/test.txt";

  //check for all console.log
  beforeEach(() => {
    jest.spyOn(console, "log");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Check if file is generated for test case for english language", async () => {
    await expect(generateCallTranscript()).resolves.toBeDefined();
    expect(console.log).toHaveBeenCalledWith(
      "Please wait while we cook your transcript."
    ); //check if the console log message has been printed
    expect(fs.existsSync(fileName)); //check if a file under the name is created
  }); 

  test("Check if file is generated for test case english is not empty", async () => {
    const content = readFromFile(fileName); //read from file
    expect(content).toBeDefined(); //check if the file has content
  });
});
