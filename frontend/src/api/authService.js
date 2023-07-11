import axios from "axios";
import Cookies from "js-cookie";

class AuthService {
  constructor() {
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isLogedIn = this.isLogedIn.bind(this);
  }

  async login(email, password) {
    const url = process.env.REACT_APP_BACKEND_API;
    const api = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
        "X-Token": Cookies.get("user"),
      },
    });

    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.data.token !== undefined) {
        const token = response.data.token;
        Cookies.set("user", token, { expires: 1, path: "", secure: true });
        localStorage.setItem("user", token);
        sessionStorage.setItem("user", token);
        return (window.location.href = "/dashboard");
      }
    } catch (error) {
      console.log("Logging in failed\n", error);
    }
  }

  async logout() {
    const url = process.env.REACT_APP_BACKEND_API;
    const api = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
        "X-Token": Cookies.get("user"),
      },
    });

    try {
      const res = await api.get("/auth/logout");

      if (res.status === 204) {
        Cookies.remove("user", { path: "" });
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        return (window.location.href = "/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(
          "Unauthorized: Only authenticated users can access the data\n",
          error
        );
      }
    }
  }

  isAuthenticated() {
    try {
      const user =
        Cookies.get("user") ||
        localStorage.getItem("user") ||
        sessionStorage.getItem("user");
      if (user && user.token && user.token.expiresAt > Date.now()) {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  isLogedIn() {
    return (
      Cookies.get("user") ||
      localStorage.getItem("user") ||
      sessionStorage.getItem("user")
    );
  }
}

export default AuthService;
