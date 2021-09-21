import {useContext, useEffect, useState} from "react";
import React from "react";
import {useHttp} from "../hooks/http.hook";
import {Message} from "../components/Message";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/auth.context";


export const CreateBook = ()=>{
    const context = useContext(AuthContext)
    const history = useHistory()

    const [direction, setdirection] = useState('Человек путешествующий')
    const setDirection = (event)=>{
        setdirection(event.target.value)
    }

    const [field, setField] = useState({
        title: "", author: "", time: "", genre: "", direction: `${direction}`, description: ""
    })
    const {loading, request, error} = useHttp()

    const fieldHandler = event =>{
        setField({...field, [event.target.name]: event.target.value})
    }

    const createHandler = async () =>{
        try{
            await request('/api/books/create', 'POST', {...field}, {Authorization: `Bearer ${context.token}`})
            history.push('/books')
        }
        catch (e){}
    }


    return(
        <div>
            <h2>Добавить книгу</h2>
            <div className="row accent z-depth-1">
                <div className="col s12">

                    <div className="row">
                        <div className="input-field col l4 s6">
                            <input className='custom-input' type='text' id="title" name='title' onChange={fieldHandler}></input>
                            <label className='custom-label' htmlFor="title">Название</label>
                        </div>

                        <div className="input-field col l4 s6">
                            <input className='custom-input' type='text' id="author" name='author' onChange={fieldHandler}></input>
                            <label className='custom-label' htmlFor="author">Автор</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col l3 s6">
                            <input className='custom-input' type='text' id="time" name='time' onChange={fieldHandler}></input>
                            <label className='custom-label' htmlFor="time">Время прочтения</label>
                            <span>Формат: "2/5/1 дня/дней/день"</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col l4 s10">
                            <input className='custom-input' type='text' id="genre" name='genre' onChange={fieldHandler}></input>
                            <label className='custom-label' htmlFor="genre">Жанр</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col l4 s10">
                            <select style={{display: 'block'}} name='direction' value={direction} onChange={event => {
                                fieldHandler(event);
                                setDirection(event)
                            }}>
                                <option value='Человек путешествующий'>Человек путешествующий</option>
                                <option value='Цивилизация и технологии'>Цивилизация и технологии</option>
                                <option value='Преступление и Наказание'>Преступление и Наказание</option>
                                <option value='Книга (музыка, спектакль, фильм)'>Книга (музыка, спектакль, фильм)</option>
                                <option value='Кому на Руси жить хорошо? – вопрос гражданина'>Кому на Руси жить хорошо? – вопрос гражданина</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col l10 s12">
                            <textarea id="description" name='description' className="materialize-textarea custom-input" onChange={fieldHandler}></textarea>
                            <label className='custom-label' htmlFor="description">Описание (просьба: укажите источник)</label>
                        </div>
                    </div>

                    <button
                        className="btn deep-orange darken-2 btn-large z-depth-1"
                        style={{marginRight: "50px"}}
                        onClick={createHandler}
                        disabled={loading}
                    >
                        Добавить
                    </button>
                    <Message text={error}/>
                </div>
            </div>
        </div>
    )
}