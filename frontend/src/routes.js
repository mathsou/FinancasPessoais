import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import {autenticado} from './services/auth';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/profile';
import Cartoes from './pages/cartoes';
import Compras from './pages/compras';
import novoCartao from './pages/novoCartao';
import editaCartao from './pages/editaCartao';
import novaCompra from './pages/novaCompra';
import editaCompra from './pages/editaCompra';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        autenticado() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{pathname: '/', state: {from: props.location}}}/>
        )
    )}/>
);

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <PrivateRoute path="/profile" exact component={Profile}/>
                <PrivateRoute path="/profile/cartoes" exact component={Cartoes}/>
                <PrivateRoute path="/profile/cartoes/novoCartao" exact component={novoCartao}/>
                <PrivateRoute path="/profile/cartoes/editaCartao" exact component={editaCartao}/>
                <PrivateRoute path="/profile/compras" exact component={Compras}/>
                <PrivateRoute path="/profile/compras/novaCompra" exact component={novaCompra}/>
                <PrivateRoute path="/profile/compras/editaCompra" exact component={editaCompra}/>
            </Switch>
        </BrowserRouter>
    );
}
