import React from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/auth.context";
import {NavBar} from "./components/NavBar";
import {Loader} from "./components/Loader";
import 'materialize-css'

function App() {
    const {login, logout, token, userId, ready, role} = useAuth()
    const isAuthenticated = !!token
    const isAdmin = (role === "ADMIN")
    const routes = useRoutes(isAuthenticated)

    if(!ready){
        return <Loader/>
    }

  return (
      <AuthContext.Provider value={{
          login, logout, token, userId, isAuthenticated, role, isAdmin
      }}>
          <Router>
              <NavBar/>
              <div className="container">
                  {routes}
              </div>
          </Router>
      </AuthContext.Provider>
  )
}

export default App
