import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { login, logout } from "./actions/auth";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase.js";
import LoadingPage from "./components/LoadingPage";


// Gets us access to .dispatch() , .getState() and .subscribe()
const store = configureStore();
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

// This makes sure the app only renders single time
let hasRendered = false;
const renderApp = () => {
    // If we have not rendered
    if (!hasRendered) {
        // We're going to render
        ReactDOM.render(jsx, document.getElementById("app"));
        hasRendered = true;
    } // If we have rendered -> do nothing
}

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

// Observer, if login state changes, check what's the state and act accordingly
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // If user is logged in, login the user and fetch the expenses
        store.dispatch(login(user.uid));
        // After expenses are fetched -> render the app
        renderApp();
        // If we're on the login page -> redirect to /dashboard
        if (history.location.pathname === "/") {
            history.push("/dashboard")
        }
    } else {
        // If user is not logged in, logout and redirect to login page
        store.dispatch(logout());
        renderApp();
        history.push("/");
    }
});
