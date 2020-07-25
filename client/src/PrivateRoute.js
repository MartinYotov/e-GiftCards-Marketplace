import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";

class PrivateRoute extends Component {
    render() {
        const {component: Component, ...rest} = this.props;

        return (
            <Route
                {...rest}
                render={props => this.props.isAuthenticated ? (
                    <Component {...this.props}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: this.props.path,
                        }}
                    />
                )}
            />
        )
    }
}

export default PrivateRoute;