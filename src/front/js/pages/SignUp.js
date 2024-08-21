import axios from "axios"
import React from "react"
import { useState } from "react"



export default function SignUp() {
    const [signupData, setSignUpData] = useState({
        email: "",
        password: ""

    })

    const handleChange = (e) => {
        setSignUpData({
            ...signupData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(process.env.BACKEND_URL + "/registrar", signupData)
            console.log("Respuesta del servidor:", response); // Verifica la respuesta del servidor
            console.log("Usuario registrado:", response.data);
        }
        catch (error){
            console.log("Ha habido un error" + error)
        }
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" placeholder="introduzca su contraseña"></label>
                <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={signupData.email}
                    onChange={handleChange}
                    required
                >

                </input>
                <label htmlFor="password" placeholder="introduzca su contraseña"></label>
                <input type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={signupData.password}
                    onChange={handleChange}
                    required
                >

                </input>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

