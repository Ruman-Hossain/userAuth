import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "CLEAR_AUTH":
      return {
        user: null,
        token: "",
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, {
    user: null,
    token: "",
  });

  // axios config
  axios.defaults.baseURL = process.env.REACT_APP_API;

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (token) {
      axios.defaults.headers.common["token"] = token;
      dispatch({ type: "SET_AUTH", payload: { token } });
    }
  }, []);

  const login = async (email, password, rememberMe = false) => {
    try {
      const response = await axios.post("/user/login", { email, password });
      const { user, token } = response.data;
      axios.defaults.headers.common["token"] = token;
      dispatch({ type: "SET_AUTH", payload: { user, token } });
      if (rememberMe) {
        localStorage.setItem("auth", token);
      } else {
        sessionStorage.setItem("auth", token);
      }
    } catch (error) {
      console.error(error);
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    dispatch({ type: "CLEAR_AUTH" });
    delete axios.defaults.headers.common["token"];
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
