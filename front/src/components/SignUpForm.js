import React from 'react';
import Photo from '../img/photo_example.gif'

const SignUpForm = (props) => (

/*

  onSubmit = e => {
    e.preventDefault();
    (this.checkFields() && props.onSubmit(this.state));
    console.log(JSON.stringify(this.state))

    const myInit = { method: 'post',
                     headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.state)
                  };
    const url = 'https://www.floriantorres.fr/infostrafootapi/public/player'

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
*/

  <form>
    <div className="input-group" id="photoInput">
    <label htmlFor="file">
        <div className="photo">
            <div className="flexbox" style={{ backgroundImage: `url(${Photo})` }}>
                <span><i class="fas fa-camera"></i></span>  
            </div>
        </div>
    </label>
    <input
        id="file"
        type="file"
        name="photo"
        className="input-file"
        onChange={e => props.handleChange(e.target.files)}
    />
    </div>
  <div className="input-group">
    <input
      name="firstname"
      className="form-control"
      placeholder='Prénom'
      value={props.credentials.firstname}
      onChange={e => props.handleChange(e)}
    />
    </div>
    <div className="input-group">
    <input
      name="lastname"
      className="form-control"
      placeholder='Nom'
      value={props.credentials.lastname}
      onChange={e => props.handleChange(e)}
    />
    </div>
    <div className="input-group">
    <input
      name="username"
      className="form-control"
      placeholder='Pseudo'
      value={props.credentials.username}
      onChange={e => props.handleChange(e)}
    />
    </div>
    <div className="input-group">
    <input
      name="mail"
      className="form-control"
      placeholder='Email'
      value={props.credentials.mail}
      onChange={e => props.handleChange(e)}
    />
    </div>
    <div className="input-group">
    <input
      name="password"
      className="form-control"
      placeholder='Mot de passe'
      type="password"
      value={props.credentials.password}
      onChange={e => props.handleChange(e)}
    />
    </div>
    <div className="input-group">
    <input
      name="birthdate"
      className="form-control"
      placeholder='Date de naissance'
      value={props.credentials.birthdate}
      onChange={e => props.handleChange(e)}
    />
    </div>
    <div className="input-group">
      <input
        className="btn btn-primary" 
        id="submit" 
        onClick={e => props.handleSubmit(e)}
        value="S'inscrire"
        type="submit"
      />
    </div>

    </form>
)

export default SignUpForm;