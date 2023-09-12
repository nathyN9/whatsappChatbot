import React from 'react';
import img from '../../assets/images/chat.jpg'
import img2 from '../../assets/images/qr-chatbot-try.png'
import img3 from '../../assets/images/store.jpg'

const HomeComponent=()=>{
    return(
        <div className="w-full">
           <section className="w-full flex flex-col justify-between items-center h-auto px-20">
           <h2 className="text-4xl text-emerald-700 text-center mt-10 mb-10">Encuentra a tu bot ideal para tu negocio</h2>
                <div className="w-ful flex flex-col md:flex-row h-auto items-center px-40">
                    <img src={img} alt="img" height={300} width={300}/>
                    <p className="text-lg text-gray-700 mb-12 px-16">
                        Haz que tu negocio sea mas eficiente con la ayuda de un Bot que estara para ti, tu negocio y tus clientes 24/7
                    </p>
                </div>
           </section>
           <section className="w-full flex flex-col bg-emerald-50 items-center h-auto px-20 py-3">
                <h2 className="text-4xl text-emerald-700 text-center mt-10 mb-10">El ChatBot ideal para las empresas</h2>
                    <div className="w-ful flex flex-col md:flex-row h-auto items-center px-40">    
                        <div className="flex flex-col">
                            <p className="text-lg text-gray-700 mb-12 px-16 mt-10">
                                Escanea este codigo QR y prueba como un ChatBot puede cambiar tu vida y la de tu negocio
                            </p>
                            <p className="text-lg text-gray-700 mb-12 px-16">
                                INTENTALO!
                            </p>
                        </div>
                    <img src={img2} alt="img" height={200} width={200}/>
                    </div>
           </section>
           <section className="w-full flex flex-col justify-between items-center h-auto px-20 py-3">
           <h2 className="text-4xl text-emerald-700 text-center mt-10 mb-10">Tu negocio y un bot a medida</h2>
                <div className="w-ful flex flex-col md:flex-row h-auto items-center px-40">
                    <img src={img3} alt="img" height={300} width={300}/>
                    <div className="flex flex-col">
                        <p className="text-lg text-gray-700 mb-12 px-16">
                            Especializado para micro y pequenas empresas.
                        </p>
                        <p className="text-lg text-gray-700 mb-12 px-16">
                            Haz que crezca tu negocio, mientras tienes mas control de tus pedidos y clientes.
                        </p>
                    </div>
                </div>
           </section>    
        </div>
    )

}

export default HomeComponent