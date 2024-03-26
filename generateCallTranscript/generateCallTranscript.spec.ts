const { generateCallTranscript } = require("./index");
const fs = require("fs");
const { deleteFile } = require("../utils");
import promptSync from "prompt-sync";
import { readFromFile } from "../utils";
const prompt = promptSync();

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

describe("Check for test file generation", () => {
  const fileName = "./transcript/test.txt";

  beforeEach(() => {
    jest.spyOn(console, "log");
  });

  afterEach(() => {
    // Clean up the file after each test.
    jest.restoreAllMocks();
  });

  test("Check if file is generated for test case for english language", async () => {
    await expect(generateCallTranscript()).resolves.toBeDefined();
    expect(console.log).toHaveBeenCalledWith(
      "Please wait while we cook your transcript."
    );
    expect(fs.existsSync(fileName));
  });

  test("Check if file is generated for test case english is not empty", async () => {
    const content = readFromFile(fileName);
    expect(content).toBeDefined();
    // deleteFile(fileName);
  });
});
