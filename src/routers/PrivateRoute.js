import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

export const PrivateRoute = ({ 
    isAuthenticated, // <-- we get this value from mapStateToProps which gets it from application's state
    component: Component, // "component" is passed as props from AppRouter.js, here we simply rename it to "Component"
    ...rest // Spread rest of the props, here "rest" is just a variable name those props are assigned to. 
}) => (
    // Below, with "...rest", we simply spread props like "path" onto the Route Component
    // We're using an arrow function inside Route, because the component prop on a Route requires a function because react-router calls it and passes in props as an argument
    // ^^ props inside that arrow function contains information the Route needs (try {console.log(props)} inside div tags)
    // Lowercase "component" is what <Route> normally takes in, this is not to be confused with destructured "component" above
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        ) : (
            <Redirect to="/" />
        )
    )} />
);

// If statement inside Route:
//  - if isAuthenticated is true -> render Header and whatever Component we're dealing with at the moment
//  - if isAuthenticated is false -> redirect to "/" (need "Redirect" to be imported frm "react-router-dom")

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid // uid is undefined if user is authenticated, otherwise a string. Here we convert them to boolean values and assign to "isAuthenticated"
});

export default connect (mapStateToProps)(PrivateRoute);