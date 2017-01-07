// @flow
/**
 *    Login
 *
 * Login Component handles login and user authentication as well as displaying
 * error messages from the attempts.
 *
 *
 */
import React, {Component} from 'react'
import {loginUser, logoutUser} from '../actions/actions'
export default class Login extends Component {
    handleClick(event : Event) : void {
        let creds: {
            username : string,
            password : string
        } = {
            username: this.refs.username.value.trim(),
            password: this.refs.password.value.trim()
        }
        this.props.dispatch(loginUser(creds));
    }
    render() {
        const {errorMessage, dispatch, isAuthenticated} = this.props
        return (
            <div>
                {!isAuthenticated && <div>
                    <input type='text' ref='username' className="form-control" placeholder='Username'/>
                    <input type='password' ref='password' className="form-control" placeholder='Password'/>
                    <button onClick={(event : Event) => this.handleClick(event)} className="btn btn-primary">
                        Login
                    </button>
                </div>}
                {isAuthenticated && <button onClick={() => dispatch(logoutUser())} className="btn btn-primary">
                    Logout
                </button>}
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        )
    }
}
