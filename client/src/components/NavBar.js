import React, {useContext} from "react";
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/auth.context";

export const NavBar = ()=>{
    const auth = useContext(AuthContext)
    const history = useHistory()
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return(

        <nav>
            <div className="nav-wrapper deep-orange darken-2">
                <ul className="right">
                    <li><NavLink to='/books'>Книги</NavLink></li>
                    {auth.isAuthenticated && <li><NavLink to='/books/create'>Добавить книгу</NavLink></li>}

                    {auth.isAuthenticated &&
                        <li className='grey'>
                            <a onClick={logoutHandler}>
                                <span className='black-text'>Выйти</span>
                            </a>
                        </li>
                    }

                    {!auth.isAuthenticated && <li className='grey'><NavLink className='black-text' to='/auth/'>Вход</NavLink> </li> }
                </ul>
            </div>
        </nav>

    )
}