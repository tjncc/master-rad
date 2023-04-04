export default function authHeader() {
    const token = JSON.parse(localStorage.getItem('jwtToken'));
  
    if (token) {
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
  }