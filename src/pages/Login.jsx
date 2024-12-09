import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { login } from "../actions/authedUser";
import { handleLoadingUsers } from "../actions/users";

const Login = () => {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading.default);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [impersonateUser, setImpersonateUser] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const redirect = query.get("redirect") || "/";
  useEffect(() => {
    dispatch(handleLoadingUsers());
  }, []);

  useEffect(() => {
    if (authedUser && !loading) {
      navigate(redirect);
    }
  }, [navigate, authedUser, loading, redirect]);

  const handleLogin = async (e) => {
    e.preventDefault();
    let user = null;
    if (users[username] && users[username].password === password) {
      user = users[username];
    }
    if (!user) {
      alert("Username or password incorrect.");
      return;
    }
    dispatch(login(user));
    navigate(redirect);
  };

  const handleImpersonate = () => {
    if (users[impersonateUser]) {
      dispatch(login(users[impersonateUser]));
      navigate(redirect);
    }
  };

  if (authedUser) return null;
  return (
    <div className="d-flex flex-column">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            User
            <br />
            <input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              data-testid="username"
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <br />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="password"
            />
          </label>
        </div>
        <button className="btn btn-primary" disabled={loading} type="submit">
          Login
        </button>
      </form>

      <div className="d-flex flex-column m-auto">
        <h2>Impersonate</h2>
        <select
          value={impersonateUser}
          onChange={(e) => setImpersonateUser(e.target.value)}
        >
          <option value="">Select user</option>
          {Object.values(users).map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={handleImpersonate}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
