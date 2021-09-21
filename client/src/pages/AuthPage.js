import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {Message} from "../components/Message";

export const AuthPage = ()=>{
    const auth = useContext(AuthContext)
    const {loading,  request, error, clearError, okMessage} = useHttp()
    const [form, setForm] = useState({
        email: "", password: ""
    })
    useEffect(()=>{
        clearError()
        window.M.updateTextFields()
    }, [clearError])

    const ChangeHandler = event =>{
        setForm({...form, [event.target.name]: event.target.value})
    }

    const RegHandler = async ()=>{
        try {
            const data = await request('/api/auth/reg', 'POST', {...form})
            await LogHandler()
        }
        catch (e){}
    }

    const LogHandler = async ()=>{
        try{
            const data = await request('/api/auth/log', 'POST', {...form})
            auth.login(data.token, data.userId, data.role)
        }
        catch (e) {}
    }

    return (
        <div className='row'>
            <div className="col s10 offset-s1">
                <h1 className='black-text'>Книги для сочинения</h1>
                <div className="card accent">
                    <div className="card-content black-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        name='email'
                                        id="email" type="email"
                                        placeholder='Введите Email'
                                        onChange={ChangeHandler}
                                    />
                                        <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field col s12">
                                    <input
                                        name='password'
                                        id="password"
                                        type="password"
                                        placeholder='Введите пароль'
                                        onChange={ChangeHandler}
                                    />
                                    <label htmlFor="password">Пароль</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn deep-orange darken-2 z-depth-1"
                            style={{marginRight: "50px"}}
                            onClick={LogHandler}
                            disabled={loading}
                        >
                            Вход
                        </button>
                        <button
                            className="btn deep-orange darken-2 z-depth-1"
                            style={{marginRight: "50px"}}
                            onClick={RegHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                        <Message text={error}/>
                    </div>
                </div>
            </div>
        </div>
    )
}