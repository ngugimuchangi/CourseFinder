import axios from 'axios';
import Cookies from 'js-cookie';


class AuthService {
        constructor() {
          this.isAuthenticated = this.isAuthenticated.bind(this);
          this.login = this.login.bind(this);
          this.logout = this.logout.bind(this);
          this.isLogedIn = this.isLogedIn.bind(this);
        }

        async login(email, password) {
          const api = axios.create({
            baseURL: 'http://127.0.0.1:1245',
            headers: {
              'Content-Type': 'application/json',
              'X-Token': Cookies.get('user')
          }})
          try {
            const response = await api.post('/auth/login' , {email, password});
            if (!(response.data.token === undefined)) {
              Cookies.set('user', JSON.stringify(response.data.token), { expires: 1/24, path: '', secure: true});
              localStorage.setItem('user', response.data.token, { expires: 1/24, path: '', secure: true});
              sessionStorage.setItem('user', response.data.token, { expires: 1/24, path: '/', secure: true});
              console.log(response.data.token)
              return window.location.href="/dashboard";
            }
          } catch (error) {
            console.log(error);
          }
      }

      async logout() {
        try {
            Cookies.remove('user', { path: '' })
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
            console.log("your loggedout");
            return window.location.href="/";
        } catch (error) {
          console.log("Something in your code is not right fix the sessions", error);
        }
      }

      isAuthenticated() {
        try {
          const user = Cookies.get('user') || localStorage.getItem('user') || sessionStorage.getItem('user');
          if (user && user.token && user.token.expiresAt > Date.now()) {
            return user
          }
        } catch (error) {
          console.log(error);
        }
      }

      isLogedIn() {
          return Cookies.get('user') || localStorage.getItem('user') || sessionStorage.getItem('user'); 
      }
}

export default AuthService;
