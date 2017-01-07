// @flow

/**
 *
 * Sentence is where we make out API call. We require an authenticated
 * user to be allowed to even see the sentence submission form and the header
 * with the authorization token is added via middleware with the request.
 *
 * Response from API contains the sentiments response.
 *
 */

import React, { Component} from 'react'
import { sendSentence, failMessage } from '../actions/actions'

export default class Sentence extends Component {

  handleClick(event: Event) {
    // get sentence input value
    let sentence: string = this.refs.sentence.value
    // Let's dispatch our custom failMessage action if the sentence is too short/long
    if(sentence.length < 7 || !sentence  ) {
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
    const { dispatch, isAuthenticated, confidence, sentiment, sentence, message, errorMessage } = this.props

    return (
<div>
        { isAuthenticated &&
        <div className='col-md-3'>
        <input type='text' ref='sentence' className="form-control"  placeholder='Enter your Sentences'/>
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
              Get Sentiment
            </button>
          </div>
        }
        { !isAuthenticated &&
        <div className='col-md-3'>
        <p> Login in to start quote submission </p>
          </div>
        }

        {message && !sentiment &&
          <p>{message}</p>
          }
          {errorMessage && isAuthenticated &&
            <p>{errorMessage}</p>
          }

        {sentiment && isAuthenticated &&
          <p>{sentiment}</p>
        }
        {sentence && isAuthenticated &&
          <p>{sentence}</p>
        }
        {confidence && isAuthenticated &&
          <p>{confidence}</p>
        }
      </div>

    )
  }
}
