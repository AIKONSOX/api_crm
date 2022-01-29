import { useState, useEffect } from 'react';
import Cliente from '../components/Cliente';

const Inicio = () => {

    //useState para los clientes
    const [clientes, setClientes] = useState([]);

    //Al estar lista la pagina obtenemos los clientes
    useEffect(() => {
        const obtenerClientesAPI = async () => {
            try {
                const url = 'http://localhost:4000/clientes';
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setClientes(resultado);
            } catch (error) {
                console.log(error);
            }
        }

        obtenerClientesAPI();
    }, []);

    //Método para eliminar un cliente
    const handleEliminar = async id => {
        if (window.confirm("Seguro(a) de eliminar al cliente?")) {

            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const respuesta = await fetch(url, {
                    method: 'DELETE'
                });
                await respuesta.json();
                
                //Reflejar el listado de clientes una vez eliminado el cliente seleccionado
                const arrayClientes = clientes.filter(cliente => cliente.id !== id);
                setClientes(arrayClientes); 
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <h1 className='font-black text-4xl text-gray-600'>Clientes</h1>
            <p className='mt-3'>Administra tus clientes</p>

            <table className='w-full mt-5 table-auto shadow bg-white'>
                <thead className='bg-gray-800 text-white'>
                    <tr>
                        <th className='p-2'>Nombre</th>
                        <th className='p-2'>Contacto</th>
                        <th className='p-2'>Empresa</th>
                        <th className='p-2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <Cliente
                            key={cliente.id}
                            cliente={cliente}
                            handleEliminar={handleEliminar}
                        />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Inicio
