import decode from 'jwt-decode';

export default class ApiService {
    // Initializing important variables
    constructor(domain) {
        this.domain = domain || 'https://www.floriantorres.fr/infostrafootapi/public' // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getTokenInfos = this.getTokenInfos.bind(this)
        this.getMyProfil = this.getMyProfil.bind(this)
        this.getProfil = this.getProfil.bind(this)
        this.getPlayers = this.getPlayers.bind(this)
        this.searchPlayer = this.searchPlayer.bind(this)
        this.home = this.home.bind(this)
        this.getMatches = this.getMatches.bind(this)
        this.getMatch = this.getMatch.bind(this)
        this.addMatch = this.addMatch.bind(this)
        this.deleteMatch = this.deleteMatch.bind(this)
        this.endMatch = this.endMatch.bind(this)
        this.getTeams = this.getTeams.bind(this)
        this.getTeam = this.getTeam.bind(this)
        this.addTeam = this.addTeam.bind(this)
        this.deleteTeam = this.deleteTeam.bind(this)
        this.getGoals = this.getGoals.bind(this)
        this.addGoal = this.addGoal.bind(this)
        this.deleteGoal = this.deleteGoal.bind(this)
    }

    login(credentials) {
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(credentials)
        }).then(res => {
            this.setToken(res.access_token) // Setting the token in sessionStorage
            return res;
        })
    }

    signup(credentials) {
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/players`, {
            method: 'POST',
            body: JSON.stringify(credentials)
        }).then(res => {
            console.log(res)
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // Getting token from sessionStorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
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
        try {
            this.fetch(`${this.domain}/auth/logout`, {
                method: 'POST',
            }).then(res => {
                // Clear user token and profile data from sessionStorage
                sessionStorage.removeItem('id_token');
                console.log(res)
            })
        }
        catch(error) {
            sessionStorage.removeItem('id_token');
            console.log(error)
        }
    }

    getTokenInfos() {
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
            throw response.json()
        }
    }

    // --- AUTH / PROFIL --- //

    getMyProfil() {
        const myInit = {
            method: 'GET'
        };
        return this.fetch(`${this.domain}/auth/player`, myInit)
            .then(function(response, myInit) {
                //console.log(response)
                return response;
            })
            .then(function(datas) {
                //console.log(datas)
                return datas;
            })
            .catch(function(error) {
                //this.setState({error})
                console.log(error)
            });
    }

    // --- PLAYERS --- //

    getProfil(id) {
        const myInit = {
            method: 'GET'
        };
        return this.fetch(`${this.domain}/players/${id}`, myInit)
            .then(function(datas) {
                //console.log(datas)
                return datas;
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    getPlayers() {
        const myInit = {
            method: 'GET'
        };
        return this.fetch(`${this.domain}/players`, myInit)
            .then(function(datas) {
                //console.log(datas)
                return datas;
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    // props can be : username, lastname and / or firstname
    searchPlayer(props) {
        const myInit = {
            method: 'GET'
        };
        const encodedValue = encodeURIComponent(props)
        
        return this.fetch(`${this.domain}/search/players?value=${encodedValue}`, myInit)
            .then(function(datas) {
                //console.log(datas)
                return datas;
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    // --- HOME / STATS --- //

    home() {
        const myInit = {
            method: 'GET'
        };
        return this.fetch(`${this.domain}/home`, myInit)
            .then(function(datas) {
                //console.log(datas)
                return datas;
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    // --- MATCHES --- //

    getMatches() {
        const myInit = {
            method: 'GET'
        };
        return this.fetch(`${this.domain}/matches`, myInit)
            .then(function(datas) {
                console.log(datas)
                return datas;
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    getMatch(match_id) {
        const myInit = {
            method: 'GET'
        };
        return this.fetch(`${this.domain}/matches/${match_id}`, myInit)
            .then(function(datas) {
                console.log(datas)
                return datas;
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    addMatch(id_team1, id_team2) {
        const myInit = {
            method: 'POST',
            body: JSON.stringify({id_team1:id_team1,id_team2:id_team2})
        };
        return this.fetch(`${this.domain}/matches`, myInit)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    deleteMatch(match_id) {
        const myInit = {
            method: 'DELETE'
        };
        return this.fetch(`${this.domain}/matches/${match_id}`, myInit)
            .then(function(datas) {
                //console.log(datas)
                return datas;
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    endMatch(match_id, team_id, end_time) {
        const myInit = {
            method: 'PUT',
            body: JSON.stringify({winner :team_id,end_time:end_time})
        };
        return this.fetch(`${this.domain}/matches/${match_id}`, myInit)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    // --- TEAMS --- //

    getTeams() {
        const myInit = {
            method: 'GET'
        };
        return this.fetch(`${this.domain}/teams`, myInit)
            .then(function(datas) {
                //console.log(datas)
                return datas;
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    getTeam(id) {
        const myInit = {
            method: 'GET'
        };
        return this.fetch(`${this.domain}/teams/${id}`, myInit)
            .then(function(datas) {
                //console.log(datas)
                return datas;
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    addTeam(id_player1, id_player2) {
        const myInit = {
            method: 'POST',
            body: JSON.stringify({id_player1:id_player1,id_player2:id_player2})
        };
        return this.fetch(`${this.domain}/teams`, myInit)
            .then(function(datas) {
                console.log(datas)
                return datas;
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    deleteTeam(team_id) {
        const myInit = {
            method: 'DELETE'
        };
        return this.fetch(`${this.domain}/teams/${team_id}`, myInit)
            .then(function(datas) {
                //console.log(datas)
                return datas;
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    // --- GOALS --- //

    getGoals() {
        const myInit = {
            method: 'GET'
        };
        return this.fetch(`${this.domain}/goals`, myInit)
            .then(function(datas) {
                //console.log(datas)
                return datas;
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    // Parameters : int player_id, int match_id, boolean (int) gamelle, boolean (int) own_goal, string role
    addGoal(player_id, match_id, gamelle, own_goal, role) {
        const myInit = {
            method: 'POST',
            body: JSON.stringify({
                player_id : player_id,
                match_id : match_id,
                gamelle : gamelle,
                own_goal : own_goal,
                role : role
            })
        };
        return this.fetch(`${this.domain}/goals`, myInit)
            .then(function(datas) {
                //console.log(datas)
                return datas;
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    deleteGoal(goal_id) {
        const myInit = {
            method: 'DELETE'
        };
        return this.fetch(`${this.domain}/goals/${goal_id}`, myInit)
            .then(function(datas) {
                //console.log(datas)
                return datas;
            })
            .catch(function(error) {
                console.log(error)
                console.log("You should probably wait few seconds and try again")
            });
    }
}