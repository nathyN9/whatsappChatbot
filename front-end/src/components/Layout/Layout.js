import React from 'react';
import {
    Link,
    Outlet,
  } from "react-router-dom";
import logo from "../../assets/images/chatbot.png"

const Layout =()=>{

    return(
    <div>
        <div> 
            <ul className="w-full flex items-center flex-row h-auto bg-emerald-400 text-black justify-between px-20 py-3">
                <Link to="/"><img src={logo} alt="Chatbot" height={60} width={60}/></Link>
                <div className="flex flex-row">
                    <li className='mx-5 text-lg font-bold'>
                    <Link to="/Register">Registrarse</Link>
                    </li>
                    <li className='mx-5 text-lg font-bold'>
                    <Link to="/Login">miCuenta</Link>
                    </li>        
                </div>
            </ul>
                
            <Outlet />
        </div>
        <footer className="w-full h-full bg-emerald-400 text-black">
            <div className="flex justify-between px-11">
                <div className="mt-2 mb-2">
                    <h6 className="text-black font-bold">Sobre nosotros</h6>
                    <p className="text-justify">
                        Creamos soluciones para tu negocio desde la tecnologia que permiten hacer tus suenos realidad.
                    </p>
                </div>
                <div className="px-11"></div>
                <div className="mt-2 mb-2 px-20">
                    <h6 className="text-black font-bold">Menu</h6>
                    <ul className="flex flex-col px-6 text-justify">
                        <li className="text-emerald-700">
                        <Link to="/">Inicio</Link>
                        </li>
                        <li className="text-emerald-700">
                        <Link to="/register">Registarse</Link>
                        </li>
                        <li className="text-emerald-700">
                        <Link to="/login">miCuenta</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <section className="w-full">
                <p className="w-full text-center">Desarrollado por @ Rick & Nathy</p>
            </section>
        </footer>
    </div>
    )

}

export default Layout