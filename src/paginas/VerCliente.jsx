import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {

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
        cargando ? <Spinner /> : Object.values(cliente).length === 0 ? <p>No Hay Resultados</p> : (
            <div>
                {
                    cargando ? 'cargando....' : (
                        <>
                            <h1 className='font-black text-4xl text-gray-600'>Ver Cliente: {cliente.nombre}</h1>
                            <p className='mt-3'>Información del cliente</p>

                            <p className="text-4xl text-gray-600 mt-10">
                                <span className="font-bold uppercase text-gray-800">Cliente:</span> {cliente.nombre}
                            </p>
                            {
                                cliente.email && (
                                    <p className="text-2xl text-gray-600 mt-4">
                                        <span className="font-bold uppercase text-gray-800">Email:</span> {cliente.email}
                                    </p>
                                )
                            }
                            {
                                cliente.telefono && (
                                    <p className="text-2xl text-gray-600 mt-4">
                                        <span className="font-bold uppercase text-gray-800">Télefono:</span> {cliente.telefono}
                                    </p>
                                )
                            }
                            {
                                cliente.empresa && (
                                    <p className="text-2xl text-gray-600 mt-4">
                                        <span className="font-bold uppercase text-gray-800">Empresa:</span> {cliente.empresa}
                                    </p>
                                )
                            }
                            {
                                cliente.notas && (
                                    <p className="text-2xl text-gray-600 mt-4">
                                        <span className="font-bold uppercase text-gray-800">Notas:</span> {cliente.notas}
                                    </p>
                                )
                            }
                        </>
                    )
                }
            </div>));
};

export default VerCliente;
