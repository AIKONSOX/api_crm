import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente, handleEliminar }) => {

    //Hook de navegación
    const navigate = useNavigate();

    //Valores de cada cliente
    let { nombre, empresa, email, telefono, notas, id } = cliente;

    return <tr className="border-b hover:bg-gray-300"> 
        <td className="p-3 text-center">{nombre}</td>
        <td className="p-3 text-center">
            <p><span className="text-gray-800 uppercase font-bold">Email:</span> {email}</p>
            <p><span className="text-gray-800 uppercase font-bold">Telefono:</span> {telefono}</p>
        </td>
        <td className="p-3 text-center">{empresa}</td>
        <td className="p-3 text-center">
            <button 
                type="button" 
                className="bg-blue-500 hover:bg-blue-700 block w-full rounded p-2 uppercase font-bold text-gray-200 text-xs"
                onClick={() => navigate(`/clientes/${id}`)}
            >
                Ver
            </button>
            <button 
                type="button" 
                className="mt-2 bg-green-500 hover:bg-green-700 block w-full rounded p-2 uppercase font-bold text-gray-200 text-xs"
                onClick={() => navigate(`/clientes/editar/${id}`)}
            >
                Editar
            </button>
            <button 
                type="button" 
                className="mt-2 bg-red-500 hover:bg-red-700 block w-full rounded p-2 uppercase font-bold text-gray-200 text-xs"
                onClick={() => handleEliminar(id)}
            >
                Eliminar
            </button>
        </td>
    </tr>;
};

export default Cliente;
