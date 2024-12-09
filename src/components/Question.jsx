import { useNavigate } from "react-router-dom";

const Question = ({ question }) => {
  const navigate = useNavigate();
  const handleShow = (e) => {
    e.preventDefault();
    navigate(`/questions/${question.id}`);
  };
  return (
    <div>
      <div>
        <div>
          <img
            height={80}
            width={80}
            className="rounded-circle"
            src={question.user.avatarURL ?? "/default-user.jpg"}
            alt={question.user.name}
          />
        </div>
        <div>
          <strong>{question.user.name}</strong>
          <div>{new Date(question.timestamp).toLocaleString()}</div>
        </div>
        <div>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleShow}
          >
            Show
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
