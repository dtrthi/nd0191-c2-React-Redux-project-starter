import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { handleAddQuestion } from "../actions/questions";

const AddQuestion = () => {
  const authedId = useSelector((state) => state.authedUser.id);
  const loading = useSelector((state) => state.loading.default);
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    const question = {
      author: authedId,
      optionOneText: optionOne,
      optionTwoText: optionTwo,
    };
    dispatch(
      handleAddQuestion(question, () => {
        navigate("/");
      }),
    );
  };
  return (
    <div>
      <div>
        <h1>Would You Rather</h1>
        <p>Create Your Own Poll</p>
      </div>
      <div>
        <div>
          <form onSubmit={handleSaveQuestion}>
            <div>
              <label>
                Option One
                <br />
                <input
                  type="text"
                  placeholder="Option One"
                  required
                  value={optionOne}
                  onChange={(e) => setOptionOne(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Option Two
                <br />
                <input
                  type="text"
                  placeholder="Option Two"
                  required
                  value={optionTwo}
                  onChange={(e) => setOptionTwo(e.target.value)}
                />
              </label>
            </div>
            <div>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
