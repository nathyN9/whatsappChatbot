import React from 'react';
import { useForm } from "react-hook-form";
import {post} from '../../httprequest/httprequest'
import Swal from 'sweetalert2'

const RegisterForm =()=>{
    const { register, handleSubmit } = useForm();

    const url = process.env.REACT_APP_API_BASE_URL

    const cbResponse =(response)=>{
        if(response.statusText === "OK"){
            Swal.fire({
                icon: 'success',
                title: 'Te has registrado correctamente',
                showConfirmButton: false,
                timer: 3000
              })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrio un error, intentalo nuevamente',
                footer: '<a href="">Why do I have this issue?</a>'
              })
        }
    }

    const onSubmit = (data) => {post(`${url}/users/create`, {...data, rol: "2"}, cbResponse)};


    return(
        <div className='flex flex-col md:flex-row justify-center item-center h-full'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-80 border-2 p-5 mt-12 mb-12 rounder-lg bg-emerald-50'>
                <h2 className="font-bold mb-3">FORMULARIO DE REGISTRO</h2>

                <label>ID</label>
                <input className="border-2 rounded-lg border-gray-300 row-span-2 h-12 mb-3 px-5" {...register("id", { required: true, maxLength: 11 })} placeholder="53475229" />

                <label>Nombre completo</label>
                <input className="border-2 rounded-lg border-gray-300 row-span-2 h-12 mb-3 px-5" {...register("user_name", { required: true, maxLength: 60 })} placeholder="Carlos Perez" />

                <label>Correo</label>
                <input className="border-2 rounded-lg border-gray-300 row-span-2 h-12 mb-3 px-5" type="email" {...register("email", { required: true, maxLength: 100 })} placeholder="carlos@dominio.com" />

                <label>Numero de telefono</label>
                <input className="border-2 rounded-lg border-gray-300 row-span-2 h-12 mb-5 px-5" {...register("phone", { required: true, maxLength: 15 })} placeholder="3203459090" />
                
                <label>Tipo de identificacion</label>
                <select className="border-2 rounded-lg border-gray-300 row-span-2 h-12 mb-3 px-5" {...register("id_type", { required: true})}>
                    <option value="1">1. C.C.-Cedula de ciudadania</option>
                    <option value="2">2. N.I.T.-Numero de Identificacion Tributaria</option>
                    <option value="3">3. C.E.-Cedula de extranjeria</option>
                    <option value="4">4. P.P.-Pasaporte</option>
                    <option value="5">5. P.T.T.-Permiso Temporal de trabajo</option>
                </select>

                <input type="submit" className="bg-emerald-600 rounded-lg h-10" />
            </form>

        </div>
    )

}

export default RegisterForm