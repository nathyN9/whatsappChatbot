import React from 'react';
import {
    Link,
    Outlet,
  } from "react-router-dom";
import logo from "../../assets/images/chatbot.png"

const LayoutLogin =()=>{

    return(
    <div>
        <div> 
            <ul className="w-full flex items-center flex-row h-auto bg-emerald-400 text-black justify-between px-20 py-3">
                <img src={logo} alt="Chatbot" height={60} width={60}/>
                <div className="flex flex-row">
                    <li className='mx-5 text-lg font-bold'>
                    <Link to="/users">Usuarios</Link>
                    </li>
                    <li className='mx-5 text-lg font-bold'>
                    <Link to="/sessions">Sesiones</Link>
                    </li>
                    <li className='mx-5 text-lg font-bold'>
                    <Link to="/questions">Preguntas</Link>
                    </li>
                    <li className='mx-5 text-lg font-bold'>
                    <Link to="/">Cerrar sesion</Link>
                    </li>        
                </div>
            </ul>
                
            <Outlet />
        </div>
        <footer className="w-full h-full bg-emerald-400 text-black">
            <p className="w-full text-center">Desarrollado por @ Rick & Nathy</p>
        </footer>
    </div>
    )

}

export default LayoutLogin