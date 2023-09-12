import React from 'react';
import { useForm } from "react-hook-form";
import {get} from '../../httprequest/httprequest'
import Swal from 'sweetalert2'
import{
     useNavigate
} from "react-router-dom"

const LoginForm =()=>{
    const { register, handleSubmit } = useForm();
    const navigate =useNavigate()
    const url = process.env.REACT_APP_API_BASE_URL
    const cbResponse =(response)=>{
        if(response.statusText === "OK"){
            Swal.fire({
                icon: 'success',
                title: 'Bienvenido',
                showConfirmButton: false,
                timer: 3000
              })

              const cbRedirect=()=>{
                navigate('/account')
            }  
            cbRedirect()
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El usuario no es valido',
                footer: '<a href="">Why do I have this issue?</a>'
              })
              
        }

    }
    
    const onSubmit = (data) => {
        data=get(`${url}/users/authUser/${data.id}`, cbResponse).then(res=>console.log("Resultado "+ res))
        console.log("Data obtenida " +data);
    };
    

    return(
        <div className='flex flex-col md:flex-row justify-center item-center h-full'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-80 border-2 p-5 mt-12 mb-12 rounder-lg bg-emerald-50'>
                <h2 className="font-bold mb-3">INGRESA A TU CUENTA</h2>
                
                <label>Identificacion</label>
                <input className="border-2 rounded-lg border-gray-300 row-span-2 h-12 mb-3 px-5" {...register("id", { required: true, maxLength: 100 })} placeholder="1" />

                <input type="submit" className="bg-emerald-600 rounded-lg h-10" />
            </form>
        </div>
    )

}

export default LoginForm
