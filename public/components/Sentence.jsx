// @flow
/**
 *
 * Sentence is where we make out API call. We require an authenticated
 * user to be allowed to even see the sentence submission form and the header
 * with the authorization token is added via middleware with the request.
 *
 * Response from API contains the sentiment results.
 *
 */
import React, {Component} from 'react'
import {sendSentence, failMessage, logoutUser} from '../actions/actions'
//import our styles
import styles from '../css/style.css'
import {Alert} from 'react-bootstrap'

export default class Sentence extends Component {

    handleClick(event : Event) {
        // get sentence input value
        let sentence : string = this.refs.sentence.value
        // Let's dispatch our custom failMessage action if the sentence is too short/long
        if (sentence.length < 7 || !sentence) {
            this.props.dispatch(failMessage("Your Sentences are too short!!! Type more!!"))
        } else if (sentence.length > 45) {
            this.props.dispatch(failMessage("Your sentences are too damn long! Shorter, under 45 characters"))
        } else {
            // dispatch our sendSentence action with sentence
            this.props.dispatch(sendSentence(this.refs.sentence.value))
        }
    }
    render() {
        // Our imported props
        const {
            dispatch,
            isAuthenticated,
            confidence,
            sentiment,
            sentence,
            message,
            errorMessage
        } = this.props

        return (
            <div className="row">
                {isAuthenticated &&
                   <div className='col-md-5'>
                    <input type='text' ref='sentence' className="form-control textBar" placeholder='Enter your Sentences'/>
                    <button onClick={() => dispatch(logoutUser())} className="btn btn-primary">
                        Logout
                    </button>
                    <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
                        Get Sentiment
                    </button>
                </div>
                }
                <div className='col-md-7'>
                    {message && !sentiment && isAuthenticated &&
                       <Alert bsStyle="warning">
                        <strong>{message}</strong>
                    </Alert>}
                    {errorMessage  &&
                       <Alert bsStyle="danger">
                        <strong>{message}</strong>
                    </Alert>
                    }
                    {sentence && isAuthenticated && <h4>Sentence: {sentence}</h4>}
                    {sentiment && isAuthenticated && <h4>Sentiment: {sentiment}</h4>}
                    {confidence && isAuthenticated && <h4>Accuracy: {confidence}</h4>}
                </div>
            </div>
        )
    }
}
