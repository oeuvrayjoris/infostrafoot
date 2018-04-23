import React from 'react';
import { Link } from 'react-router-dom'

const LoginForm = (props) => (
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