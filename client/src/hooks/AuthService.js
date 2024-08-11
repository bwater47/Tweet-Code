// Import decode from jwt-decode.
import decode from "jwt-decode";
// Define the AuthService class.
class AuthService {
  // Define the getProfile method.
  getProfile() {
    return decode(this.getToken());
  }
  // Define the isLoggedIn method.
  loggedIn() {
    // Checks if there is a saved token and it's still valid.
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  // Define the isTokenExpired method.
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }
  // Define the getToken method.
  getToken() {
    // Retrieves the user token from localStorage.
    return localStorage.getItem("id_token");
  }
  login(idToken) {
    // Saves user token to localStorage.
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }
  logout() {
    // Clear user token and profile data from localStorage.
    localStorage.removeItem("id_token");
    // This will reload the page and reset the state of the application.
    window.location.assign("/");
  }
}
// Export an instance of the AuthService class.
export default new AuthService();
