const { summarizeCallTranscript } = require("./index");
const fs = require("fs");
const { deleteFile } = require("../utils");

jest.mock("prompt-sync", () => {
  jest.requireActual("prompt-sync");
  return jest.fn(() => (question: string) => {
    switch (question) {
      case "Enter the File which you want to summarize? ":
        return "test.txt";
      default:
        return "";
    }
  });
});

describe("Check for test file generation", () => {
  beforeEach(() => {
    jest.spyOn(console, "log");
  });

  afterEach(() => {
    // Clean up the file after each test.
    jest.restoreAllMocks();
  });

  test("Check if the summary is valid", async () => {
    await expect(summarizeCallTranscript()).resolves;
    expect(console.log).toHaveBeenCalledWith(
      "Please wait while i am summarizing your transcript"
    );
    expect(console.log).toBeDefined();
  });
});
