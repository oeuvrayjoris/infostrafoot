import decode from 'jwt-decode';

export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.domain = domain || 'https://www.floriantorres.fr/infostrafootapi/public/' // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(credentials) {
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: JSON.stringify(credentials)
        }).then(res => {
            this.setToken(res.api_token) // Setting the token in sessionStorage
            return Promise.resolve(res);
        })
    }

    signup(credentials) {
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/player`, {
            method: 'POST',
            body: JSON.stringify(credentials)
        }).then(res => {
            this.setToken(/*res.api_token*/'yo') // Setting the token in sessionStorage
            return Promise.resolve(res);
        })

    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // Getting token from sessionStorage
        console.log(!!token && !this.isTokenExpired(token))
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < (Date.now() + 60 * 60 * 1000)/ 1000) { // Checking if token is expired.
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to sessionStorage
        sessionStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from sessionStorage
        return sessionStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from sessionStorage
        sessionStorage.removeItem('id_token');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
        //Example return decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o")
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}