import React from "react";
import ReactDOM from "react-dom";
import { signup, login, logout } from './actions/session_actions'
import configureStore from './store/store'
import Root from './components/root'

window.login = login;
window.signup = signup;
window.logout = logout;

// document.addEventListener("DOMContentLoaded", () => {
//   const root = document.getElementById("root");
//   ReactDOM.render(<h1>Welcome to Astra</h1>, root);
// });

document.addEventListener("DOMContentLoaded", () => {

  let store;
  if (window.currentUser) {
  const preloadedState = {
      entities: {
      users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
  };
  store = configureStore(preloadedState);
  delete window.currentUser;
  } else {
  store = configureStore();
  }

const root = document.getElementById("root");
ReactDOM.render(<Root store={store}/>, root);
});