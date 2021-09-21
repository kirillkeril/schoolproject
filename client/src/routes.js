import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {CreateBook} from "./pages/CreateBook";
import {DetailBook} from "./pages/DetailBook";
import {BooksPage} from "./pages/BooksPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/books/create/" exact>
                    <CreateBook />
                </Route>
                <Route path="/books/:id">
                    <DetailBook />
                </Route>
                <Route path="/books/">
                    <BooksPage/>
                </Route>
                <Redirect to="/books/"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path='/auth/'>
                <AuthPage/>
            </Route>
            <Route path="/books/:id">
                <DetailBook />
            </Route>
            <Route path="/books/">
                <BooksPage/>
            </Route>
            <Redirect to="/books"/>
        </Switch>
    )
}
