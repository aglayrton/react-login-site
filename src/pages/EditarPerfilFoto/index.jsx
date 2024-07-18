import React, { useState } from 'react';
import { api } from '../../config/configApi';

function EditarPerfilFoto() {

    const[image, setImage] = useState("");
    const [status, setStatus] = useState({
        type:"",
        mensagem: ""
    })

    const editarUsuario = async(e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        const headers = {
            "Authorization":"Bearer "+localStorage.getItem("token")
        }
        
        await api.put("/editar-foto-perfil", formData,{headers}).then(
            (response)=>{
                console.log(response.data)
                setStatus(
                    {
                        type: response.data.erro,
                        mensagem: response.data.mensagem
                    }
                )
            }
        ).catch(
            (err)=>{
                if(err.response){
                    console.log(err.response.data)
                }
            }
        )
    }


    return (
    <React.Fragment>
        <h1>Editar Foto</h1>
        <form onSubmit={editarUsuario}>
        <label>Foto*: </label>
        <input type='file' name='image' onChange={e=>setImage(e.target.files[0])}/>
        <button type='submit'>Salvar</button>
        </form>
    </React.Fragment>
    );
}

export default EditarPerfilFoto;
