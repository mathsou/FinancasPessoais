import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiLogIn, FiEyeOff, FiEye } from 'react-icons/fi';

import api from '../../services/api'
import './styles.css';

import titulo from '../../assets/name.svg'
import logo from '../../assets/logo.png'

var mSenha = false;

export default function Login(){
    const history = useHistory();
    
    const [user, setUser] = useState('');
    const [senha, setSenha] = useState('');
    var conectado = false;
    const manterConectado = localStorage.getItem('manterConectado');
    
    useEffect(() => {
    localStorage.clear();
    }, [history]);

    function mostraSenha(){
        if(mSenha){
            document.getElementById("eyeOffSenha").style.display = 'block';
            document.getElementById("eyeSenha").style.display = 'none';

            document.getElementById('senha').type = 'password';
            mSenha = !mSenha
        }
        else{
            document.getElementById("eyeOffSenha").style.display = 'none';
            document.getElementById("eyeSenha").style.display = 'block';

            document.getElementById('senha').type = 'text';
            mSenha = !mSenha
        }
    }
    async function handleLogin(e){
        e.preventDefault();
        const data = {
            user,
            senha,
        };
        try{
            const response = await api.post('session', data);
            if(response.data.error){
                alert(response.data.error);
            }
            else{
                localStorage.setItem('JWT', response.data.token);
                history.push('/profile');
            }
            
        }
        catch(err){
            alert("falha no login, tente novamente")
        }
    }

    return (
        <div className="login-container">

            <section className="titulo">
                <img src={titulo} alt="controle de dividas"/>
            </section>
            
            <div className="content">
            <section className="calculadora">
                <img src={logo} alt="calculadora"/>
            </section>
            

            <section className="form">
                <form onSubmit={handleLogin}>
                    <input 
                        id="user"
                        type="text" 
                        placeholder="Nome de usuario ou E-mail" 
                        value={user}
                        onChange={e => setUser(e.target.value)}
                        required
                        autoFocus
                    />
                    <input 
                        id="senha"
                        type="password" 
                        placeholder="Senha"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        required
                    />
                    <FiEyeOff
                            id="eyeOffSenha" 
                            size={24} 
                            color="#a4a4a4" 
                            onClick={mostraSenha}
                            style={{display: 'block'}}
                        />
                        <FiEye 
                            id="eyeSenha"
                            size={24} 
                            color="#a4a4a4" 
                            onClick={mostraSenha}
                            style={{display: 'none'}}
                        />
                    
                    <input id="conectado" type="checkbox" name="conectado" onClick={() =>{conectado = !conectado}}/>
                    <label htmlFor="conectado">Manter Conectado</label>
                    <button className="button" type="submit">Entrar</button><p>.</p>
                    
                    <Link to="/register">
                    <FiLogIn id="registrar" size={16} color="#336EC6"/>
                    Cadastrar
                    </Link>
                </form>
            </section>
            </div>
        </div>
    );
}