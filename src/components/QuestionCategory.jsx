import Question from "./Question";

const QuestionCategory = ({ title, questions }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div className="row">
        {questions && questions.length
          ? questions.map((question) => (
              <div className="col-4" key={question.id}>
                <Question question={question} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default QuestionCategory;
