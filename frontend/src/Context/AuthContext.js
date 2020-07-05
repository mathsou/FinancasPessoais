import React, {createContext, useState, useEffect} from 'react';
import api from '../services/api'
import history from '../history';

const Context = createContext();

function AuthProvider({children}){
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token){
            api.defaults.headers.authorization = `Bearer ${token}`;
            setAuthenticated(true);
        }

        setLoading(false)
    }, [])

    async function handleLogin(login){
        const {data: {token}} = await api.post('session', login);

        localStorage.setItem('token', token);
        api.defaults.headers.authorization = `Bearer ${token}`;
        setAuthenticated(true);
        history.push('/profile');        
        
    }

    function handleLogout(){
        setAuthenticated(true);
        localStorage.removeItem('token');
        api.defaults.headers.authorization = undefined;
        history.push('/');
    }

    if(loading){
        return null;
    }
    return (
        <Context.Provider value={{authenticated, handleLogin, handleLogout}}>
            {children}
        </Context.Provider>
    );
}

export {Context, AuthProvider};