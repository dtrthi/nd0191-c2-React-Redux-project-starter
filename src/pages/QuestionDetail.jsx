import classNames from "classnames";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { handleSaveQuestionAnwser } from "../actions/questions";

const QuestionDetail = () => {
  const { questionId } = useParams();
  const authedId = useSelector((state) => state.authedUser.id);
  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions);
  const loading = useSelector((state) => state.loading.default);
  const [user, question, votedQuestion] = useMemo(() => {
    if (questions[questionId]) {
      let question = {
        ...questions[questionId],
        optionOne: {
          ...questions[questionId].optionOne,
          isVoted: false,
        },
        optionTwo: {
          ...questions[questionId].optionTwo,
          isVoted: false,
        },
      };
      const user = users[question.author];
      const totalVote =
        question.optionOne.votes.length + question.optionTwo.votes.length;
      question.optionOne.isVoted =
        question.optionOne.votes.indexOf(authedId) !== -1;
      question.optionOne.percent = 0;
      if (totalVote) {
        question.optionOne.percent =
          (question.optionOne.votes.length / totalVote) * 100;
      }
      question.optionTwo.isVoted =
        question.optionTwo.votes.indexOf(authedId) !== -1;
      question.optionTwo.percent = 0;
      if (totalVote) {
        question.optionTwo.percent =
          (question.optionTwo.votes.length / totalVote) * 100;
      }
      const voted = question.optionTwo.isVoted || question.optionOne.isVoted;

      return [user, question, voted];
    }
    return [null, null, false];
  }, [authedId, questionId, questions, users]);
  const dispatch = useDispatch();

  const handleVote = async (ev, option) => {
    ev.preventDefault();
    const answer = {
      authedUser: authedId,
      qid: questionId,
      answer: option,
    };
    dispatch(handleSaveQuestionAnwser(answer));
  };
  if (!question) return <h1>Not Found</h1>;

  return (
    <div>
      <h1 className="text-center">Poll by {user.name}</h1>
      <div className="d-flex justify-content-center">
        <img
          src={user.avatarURL ?? "/default-user.jpg"}
          width={80}
          height={80}
          alt={user.name}
          className="bg-info rounded-circle"
        />
      </div>
      <p className="text-center">Would You Rather</p>
      <div className="row">
        <div className="col-md-6">
          <div
            className={classNames("border rounded text-center", {
              "border-primary bg-primary text-white":
                question.optionOne.isVoted,
            })}
          >
            <div>{question.optionOne.text}</div>
            {votedQuestion ? (
              <div>
                {question.optionOne.votes.length} votes -{" "}
                {question.optionOne.percent}%
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={(ev) => handleVote(ev, "optionOne")}
                disabled={loading}
              >
                Click
              </button>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div
            className={classNames("border rounded text-center", {
              "border-primary bg-primary text-white":
                question.optionTwo.isVoted,
            })}
          >
            <div className="fw-bold">{question.optionTwo.text}</div>
            {votedQuestion ? (
              <div>
                {question.optionTwo.votes.length} votes -{" "}
                {question.optionTwo.percent}%
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={(ev) => handleVote(ev, "optionTwo")}
                disabled={loading}
              >
                Click
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuestionDetail;
