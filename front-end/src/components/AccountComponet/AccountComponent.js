import React from 'react';

const AccountComponent=()=>{
    return(
        <div className="w-full">
           <section className="w-full flex flex-col justify-between items-center h-auto px-20">
           <h2 className="text-4xl text-emerald-700 text-center mt-10 mb-10">Bienvenido Administrador!</h2>
                <div className="w-ful flex flex-col md:flex-row h-auto items-center px-40">
                    <p className="text-lg text-gray-700 mb-12 px-16">
                        Gestiona tus preguntas, revisa las sesiones y registra, modifica y elimina tus usuarios.
                    </p>
                </div>
           </section>    
        </div>
    )

}

export default AccountComponent