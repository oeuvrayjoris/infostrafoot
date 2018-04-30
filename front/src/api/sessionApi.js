class SessionApi {  
  static login(credentials) {
    const request = new Request('https://www.floriantorres.fr/infostrafootapi/public/auth/login', {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }), 
      body: JSON.stringify(credentials)
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  } 
}

export default SessionApi;  