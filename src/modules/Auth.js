/*
** Author: Harsh
** Date : 13-06-2026
*/

const Auth = {
  
user_token: JSON.parse(localStorage.getItem("auth")) || {},

getToken() {
    return this.user_token.token;
},

getUserId() {
    return this.user_token.user_id;
},

getUserDetails() {
    return this.user_token;
},

setUserToken(new_token) {
    this.user_token = new_token;
    localStorage.setItem("auth", JSON.stringify(new_token));
},

logout() {
    localStorage.removeItem("auth");
    this.user_token = {};
},

};

export default Auth;
