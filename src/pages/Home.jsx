import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionCategory from "../components/QuestionCategory";

const Home = (props) => {
  const [newQuestions, setNewQuestions] = useState([]);
  const [doneQuestions, setDoneQuestions] = useState([]);
  const authedId = useSelector((state) => state.authedUser?.id);
  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (questions) {
      const newQuestions = [];
      const doneQuestions = [];
      Object.keys(questions).forEach((key) => {
        let question = { ...questions[key] };
        question.user = users[question.author];
        if (
          question.optionOne.votes.indexOf(authedId) < 0 &&
          question.optionTwo.votes.indexOf(authedId) < 0
        ) {
          newQuestions.push(question);
        } else {
          doneQuestions.push(question);
        }
      });
      setNewQuestions(newQuestions.sort((a, b) => b.timestamp - a.timestamp));
      setDoneQuestions(doneQuestions.sort((a, b) => b.timestamp - a.timestamp));
    }
  }, [dispatch, authedId, users, questions]);

  return (
    <div>
      <QuestionCategory title="New Questions" questions={newQuestions} />
      <QuestionCategory title="Done" questions={doneQuestions} />
    </div>
  );
};
export default Home;
