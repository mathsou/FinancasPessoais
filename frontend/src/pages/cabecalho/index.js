import React, {useState} from 'react';
import logo from '../../assets/logo.png';
import usuario from '../../assets/usuario.png';
import {Link, useHistory} from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import Modal from 'react-modal';

import './style.css'

Modal.setAppElement('#root');


export default function Cabecalho(){
    const nome = localStorage.getItem('Nome');
    const salarioB = localStorage.getItem('salarioB');    
    const history = useHistory();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    
    function handleLogOut(){
        localStorage.clear();
        history.push('/');
    }
    return(
        <header>
                <img src={logo} alt="Logo" id="logo"/>
                <h1>CONTROLE DE DÍVIDAS PESSOAIS</h1>
                <button className="unvisible" onClick={() => setModalIsOpen(true)}><img src={usuario} alt="" className="user"/></button>
                <Modal 
                    className="box" 
                    isOpen={modalIsOpen} 
                    onRequestClose={() => setModalIsOpen(false)}
                    style={{
                        overlay: {
                          backgroundColor: 'rgba(0, 0, 0, 0.8)'
                        }}}
                    >
                    <img src={usuario} alt="Logo" id="user"/><br/>
                    <h1>{nome}</h1><br/>
                    <ul>
                        <li>
                            <Link to="/profile/settings">
                                <FiSettings size={20} color="#fff" />
                                Configurações
                            </Link>
                        </li>
                        <li><p>Salário Bruto<br/>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(salarioB)}</p></li>
                        <li><h2 onClick={handleLogOut}>Desconectar</h2></li>
                    </ul>                    
                </Modal>
            </header>
    );
}
