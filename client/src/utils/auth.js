// Import decode from jwt-decode.
import decode from "jwt-decode";
// Create a class for AuthService.
class AuthService {
  // Create a method to get the profile data from the token.
  getProfile() {
    return decode(this.getToken());
  }
  // Create a method to check if the user is logged in.
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  // Create a method to check if the token is expired.
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
  // Create a method to get the token using localStorage.
  getToken() {
    return localStorage.getItem("id_token");
  }
  // Create a method to log the user with the token in localStorage.
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }
  // Create a method to log the user out by removing the token from localStorage.
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}
// Export the AuthService class.
export default new AuthService();
