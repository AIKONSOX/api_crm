import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {

    const location = useLocation(); //Devuelve la ubicacion a cualquier componente.
    const urlActual = location.pathname;

    return (
        <div className='md:flex md:min-h-screen'>
            <div className='md:w-1/4 bg-gray-800 py-10'>
                <h2 className='text-4xl font-black text-center text-white'>CRM-Clientes</h2>
                <nav className='mt-10'>
                    <Link to="/clientes" className={`${urlActual === '/clientes' ? 'text-gray-300 bg-gray-700' : 'text-white'}  text-white text-2xl block mt-2 hover:text-gray-400`}>Clientes</Link>
                    <Link to="/clientes/nuevo" className={`${urlActual === '/clientes/nuevo' ? 'text-gray-300 bg-gray-700' : 'text-white'}  text-white text-2xl block mt-2 hover:text-gray-400`}>Nuevo Cliente</Link>
                </nav>
            </div>
            <div className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
