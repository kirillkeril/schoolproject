import React, {useCallback, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {BooksView} from "../components/BooksView";

export const BooksPage = ()=>{
    const {request} = useHttp()
    const [sort, setSort] = useState({
        direction: '',
    })
    const [books, setBooks] = useState()


    const getBooks = useCallback(async (sortBy)=>{
        try{
            const data = await request('/api/books', 'POST', {direction: sortBy.direction})
            await setBooks(data)
        }catch (e) {}
    }, [request])

    useEffect(()=>{
        getBooks(sort)
    }, [getBooks, sort, request])

    const SortBy = event => {
        setSort({direction: event.target.value})
    }
    return(
        <div style={{minWidth: '600px'}}>
            <label className='grey-text text-lighten-4' htmlFor='sort' style={{fontSize:'20px'}}>Сортировка по направлению</label>
            <select id='sort' style={{display:'flex'}} value={sort.direction} onChange={SortBy} className='l5 s12'>
                <option value=''>Все направления</option>
                <option value='Кому на Руси жить хорошо? – вопрос гражданина'>Кому на Руси жить хорошо? – вопрос гражданина</option>
                <option value='Книга (музыка, спектакль, фильм)'>Книга (музыка, спектакль, фильм)</option>
                <option value='Преступление и Наказание'>Преступление и Наказание</option>
                <option value='Цивилизация и технологии'>Цивилизация и технологии</option>
                <option value='Человек путешествующий'>Человек путешествующий</option>
            </select>

            <h1>Книги</h1>
            <BooksView books={books}/>
        </div>
    )
}