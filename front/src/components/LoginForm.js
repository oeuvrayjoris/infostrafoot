import React from 'react';
import { Link } from 'react-router-dom'

const LoginForm = (props) => (
/*
  handleSubmit = e => {
    e.preventDefault();
    (this.checkFields() && props.onSubmit(this.state));
    console.log(JSON.stringify(this.state))

    const myInit = { method: 'post',
                     headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state.credentials)
                  };
    const url = 'https://www.floriantorres.fr/infostrafootapi/public/login'

    fetch(url, myInit)
      .then(function(response) {
        return response.json();
      })
      .then(function(datas) {
        console.log(datas)
      })
      .catch((error) => {
        console.error(error)
      });

    this.loadPlayers()

    // Transmitting state to App.onSubmit function
    //this.clearState();
  };
  */
  <form>
    
    <div className="input-group">
        <span className="input-group-addon" id="basic-addon1"><i className="fas fa-user"></i></span>
        <input
          name="username"
          className="form-control"
          aria-describedby="basic-addon1"
          placeholder='Pseudo'
          value={props.credentials.username}
          onChange={e => props.handleChange(e)}
        />
    </div>

    <div className="input-group">
        <span className="input-group-addon" id="basic-addon2"><i className="fas fa-key"></i></span>
        <input
          name="password"
          className="form-control"
          aria-describedby="basic-addon2"
          placeholder='Mot de passe'
          type="password"
          value={props.credentials.password}
          onChange={e => props.handleChange(e)}
        />
    </div>

    <div className="input-group right">
      <input
        className="btn btn-primary" 
        id="submit" 
        onClick={e => props.handleSubmit(e)}
        value="Connexion"
        type="submit"
      />
    </div>
    <Link to="/signup" className="lien">Pas encore inscrit ?</Link>
  </form>
)

export default LoginForm;