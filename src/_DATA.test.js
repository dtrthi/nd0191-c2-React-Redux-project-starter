import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("_saveQuestion", () => {
  it("should save data success", async () => {
    const result = await _saveQuestion({
      author: "sarahedo",
      optionOneText: "option 1",
      optionTwoText: "option 2",
    });
    expect(result.author).toEqual("sarahedo");
    expect(result.optionOne.text).toEqual("option 1");
    expect(result.optionTwo.text).toEqual("option 2");
  });

  it("should save data failed", async () => {
    await expect(_saveQuestion({ author: "sarahedo" })).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author",
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should save data success", async () => {
    const result = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    });
    expect(result).toEqual(true);
  });

  it("should save data failed", async () => {
    await expect(_saveQuestionAnswer({})).rejects.toEqual(
      "Please provide authedUser, qid, and answer",
    );
  });
});
