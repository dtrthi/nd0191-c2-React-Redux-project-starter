import { useMemo } from "react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const users = useSelector((state) => state.users);
  const listUser = useMemo(() => {
    const usrs = Object.keys(users)
      .map((key) => {
        return {
          ...users[key],
          totalAnswer: Object.keys(users[key].answers).length,
          totalQuestion: users[key].questions.length,
        };
      })
      .sort(
        (a, b) =>
          b.totalAnswer + b.totalQuestion - (a.totalAnwser + a.totalQuestion),
      );
    return usrs;
  }, [users]);

  return (
    <div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col">Users</th>
            <th scope="col">Answered</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.map((user) => (
              <tr key={user.id}>
                <td>
                  <img
                    src={user.avatarURL ?? "/default-user.jpg"}
                    alt={user.name}
                    height={30}
                    width={30}
                    className="bg-info rounded-circle"
                  />
                  {user.name}
                </td>
                <td>{user.totalAnswer}</td>
                <td>{user.totalQuestion}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Leaderboard;
