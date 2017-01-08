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
import {Alert} from 'react-bootstrap'

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
            <div className="row">
                {!isAuthenticated &&
                   <div className="col-md-6">
                    <input type='text' ref='username' className="form-control" placeholder='Username'/>
                    <input type='password' ref='password' className="form-control" placeholder='Password'/>
                    <button onClick={(event : Event) => this.handleClick(event)} className="btn btn-primary">
                        Login
                    </button>
                </div>
                }
                <div className="col-md-6">
                    {errorMessage &&
                       <Alert bsStyle="danger">
                        <strong>{errorMessage}</strong>
                    </Alert>
                    }
                </div>
            </div>
        )
    }
}
