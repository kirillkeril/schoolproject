import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {BookCard} from "../components/BookCard";
import {Loader} from "../components/Loader";

export const DetailBook = ()=>{
    const [book, setBook] = useState()
    const id = useParams().id
    const {request, loading} = useHttp()
    const getBook = useCallback(async ()=>{
        try{
            const fetched = await request(`/api/books/${id}`)
            setBook(fetched)
        }
        catch (e){}
    }, [id, request])

    useEffect(()=>{
        getBook().then()
    }, [getBook])

    if(loading){
        return <Loader/>
    }

    return(
        <>
            { !loading && book && <BookCard book={book}/>}
        </>
    )
}