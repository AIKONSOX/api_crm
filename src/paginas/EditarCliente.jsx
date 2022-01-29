import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";


const EditarCliente = () => {

    //useState
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);

    //useParams es un hook que nos permite saber los parametros que pasemos por una URL
    const { id } = useParams();

    //Al estar listo el componente consultamos la API REST para obtener la info del usuario
    useEffect(() => {
        const obtenerCliente = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }
            setCargando(!cargando);
        }

        obtenerCliente();
    }, []);

    return (
        <>
            <h1 className='font-black text-4xl text-gray-600'>Editar Cliente</h1>
            <p className='mt-3'>Utilice este formulario para editar datos de un cliente</p>
            {cliente?.nombre
                ?
                <Formulario
                    cliente={cliente}
                    cargando={cargando}
                />
                : <p>Cliente ID no válido</p>
            }
        </>
    )
}

export default EditarCliente
