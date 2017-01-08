// @flow
 /**
 *      middleware
 *
 * Our middleware api only attaches an authorization header
 * to an action that is type 'API_CALL'. All other actions just pass through
 * just fine.
 *
 */

type token = string | null
const url = 'http://localhost:4500/'

function apiCall(endpoint, authenticated, sentence) {

    let token: token = localStorage.getItem('token') || null

    let config = {}

    //set headers for authenticated request
    if (authenticated) {
        config = {
            method: "POST",
            body: `sentence=${sentence}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    }

    return fetch(url + endpoint, config)
        .then(response =>
            response.json().then(body => {
                if (!response.ok) {
                    return Promise.reject(response.status)
                }
                console.log(body)
                return body
            })).catch(err => console.log(err))

}

export const API_CALL = Symbol('API_CALL')

export default (store: any) => (next: any) => (action: any) => {

    const apiCALL = action[API_CALL]

    // only applies if out action if api call matches.
    if (typeof apiCALL === 'undefined') {
        return next(action)
    }

    // Thank you destructuring
    let {
        endpoint,
        types,
        sentence,
        authenticated
    } = apiCALL
    const [requestType, successType, errorType] = types

    // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
    return apiCall(endpoint, authenticated, sentence).then(
        response =>
        next({
            sentiment: response.sentiment,
            confidence: response.confidence,
            sentence,
            authenticated,
            type: successType
        }),
        error => next({
            error: error.message || 'There was an error.',
            type: errorType
        })
    )
}
