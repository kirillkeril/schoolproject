import React, {useContext} from "react";
import {useHttp} from "../hooks/http.hook";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/auth.context";

export const BookCard = ({book}) => {
    const {loading} = useHttp()
    const auth = useContext(AuthContext)
    const history = useHistory()

    const goBack = ()=>{
        history.push('/books')
    }
    return(
        <div>
            <h2>{book.title}</h2>
            <h3>Автор: {book.author}</h3>
            <div className='accent details z-depth-1'>
                <p className='Title'>Описание</p>
                <p>{book.description}</p>
                {auth.isAdmin && <p style={{padding:'10px'}} className='grey lighten-1'>Добавил ID: {book.owner}</p>}
                <button
                    className="btn deep-orange darken-2 btn-large z-depth-1"
                    style={{marginRight: "50px"}}
                    onClick={goBack}
                    disabled={loading}
                >
                    Назад
                </button>
            </div>
        </div>
    )
}