import React from "react";
import {NavLink} from "react-router-dom";
import {Loader} from "./Loader";

export const BooksView = ({books})=>{
    if(!books){
        return (
            <Loader/>
        )
    }

    return(
        <div className='accent z-depth-1'>
            <table>
                <thead>
                <tr>
                    <th>Автор</th>
                    <th>Название</th>
                    <th>Жанр</th>
                    <th>Направление</th>
                    <th>Время прочтения</th>
                </tr>
                </thead>

                <tbody>
                {books.map(book => {
                    return(
                        <tr key={book._id}>
                            <td>{book.author}</td>
                            <td><NavLink to={'/books/'+book._id}>{book.title}</NavLink></td>
                            <td>{book.genre}</td>
                            <td>{book.direction}</td>
                            <td>{book.time}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}