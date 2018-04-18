import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import SignUp from './views/SignUp'
import Profile from './views/Profile'
import Match from './views/Match'
import Comparator from './views/Comparator'
import Search from './views/Search'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={SignUp}/>
      <Route path='/profile' component={Profile}/>
      <Route path='/match' component={Match}/>
      <Route path='/comparator' component={Comparator}/>
      <Route path='/search' component={Search}/>
    </Switch>
  </main>
)

export default Main;