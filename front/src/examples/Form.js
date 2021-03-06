import React from 'react';

class Form extends React.Component {
 state = {
     username: '',
     password: '',
     firstname: '',
     lastname: '',
     birthdate: '',
     mail: ''
 }

 change = e => {
     this.setState({
         [e.target.name]: e.target.value
     });
 };

 clearState = () => {
    this.setState({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        birthdate: '',
        mail: ''
    })
 };

 checkFields = () => {
    return true;
 };

 loadPlayers = () => {
    const myInit = { method: 'get',
                   mode: 'no-cors'
                    };

    const url = 'https://www.floriantorres.fr/infostrafootapi/public/players'
    fetch(url)
    .then(function(response, myInit) {
      return response.json();
    })
    .then(function(myBlob) {
        console.log(myBlob)
    });    
 }

 onSubmit = e => {
    e.preventDefault();
    (this.checkFields() && this.props.onSubmit(this.state));
    // Transmitting state to App.onSubmit function
    //this.clearState();
};

 render() {
    this.loadPlayers()
     return (
        <form action="https://www.floriantorres.fr/infostrafootapi/public/player" method="post">
            <input
                name="username"
                placeholder='Username'
                value={this.state.username}
                onChange={e => this.change(e)}
            />
            <br />
            <input
                name="password"
                placeholder='Password'
                type="password"
                value={this.state.password}
                onChange={e => this.change(e)}
            />
            <br />
            <input
                name="firstname"
                placeholder='First name'
                value={this.state.firstname}
                onChange={e => this.change(e)}
            />
            <br />
            <input
                name="lastname"
                placeholder='Last Name'
                value={this.state.lastname}
                onChange={e => this.change(e)}
            />
            <br />
            <input
                name="birthdate"
                placeholder='Birthdate'
                value={this.state.birthdate}
                onChange={e => this.change(e)}
            />
            <br />
            <input
                name="mail"
                placeholder='Email'
                value={this.state.mail}
                onChange={e => this.change(e)}
            />
            <br />
            <button onClick={e => this.onSubmit(e)}>Subscribe</button>
        </form>
     );
 }
}

export default Form;