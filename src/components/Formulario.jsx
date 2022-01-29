import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import * as Yup from 'yup';
import Alerta from './Alerta';

const Formulario = ({ cliente, cargando }) => {

    //Hook para realiar navegacion
    const navigate = useNavigate();

    //Esquema de validacion
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .max(25, 'El nombre es muy largo')
            .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
            .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
            .email('E-mail no es valido')
            .required('El e-mail del cliente es obligatorio'),
        telefono: Yup.number()
            .positive('Número no válido')
            .integer('Número no válido')
            .typeError('Número no válido')
    });

    //Función al hacer submit al formulario
    const handleSubmit = async (valores) => {
        try {
            const url = cliente?.id ? `http://localhost:4000/clientes/${cliente.id}` : 'http://localhost:4000/clientes';

            const respuesta = await fetch(url, {
                method: cliente?.id ? 'PUT' : 'POST',
                body: JSON.stringify(valores),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            //Obtener la respuesta en json
            await respuesta.json();

            //Redireccionar al usuario
            navigate('/clientes');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        cargando ? <Spinner /> :
            (<div className='bg-gray-200 mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className='text-gray-700 font-bold text-xl uppercase text-center'>
                    {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                </h1>
                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? '', //otro tipo de ternario indica lo primero si es undefined coloca lo de ??
                        empresa: cliente?.empresa ?? '',
                        email: cliente?.email ?? '',
                        telefono: cliente?.telefono ?? '',
                        notas: cliente?.notas ?? ''
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values);
                        resetForm();
                    }
                    }
                    validationSchema={nuevoClienteSchema}
                >
                    {({ errors, touched }) => {

                        return (
                            <Form className='mt-10'>
                                <div className='mb-4'>
                                    <label htmlFor='nombre' className='text-gray-800'>Nombre</label>
                                    <Field id='nombre' type='text' className='mt-2 block w-full p-3 bg-gray-300' placeholder='Nombre del cliente' name='nombre' />
                                    {errors.nombre && touched.nombre ? (
                                        <Alerta>{errors.nombre}</Alerta>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='empresa' className='text-gray-800'>Empresa</label>
                                    <Field id='empresa' type='text' className='mt-2 block w-full p-3 bg-gray-300' placeholder='Empresa del cliente' name='empresa' />
                                    {errors.empresa && touched.empresa ? (
                                        <Alerta>{errors.empresa}</Alerta>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='email' className='text-gray-800'>E-mail</label>
                                    <Field id='email' type='email' className='mt-2 block w-full p-3 bg-gray-300' placeholder='E-mail del cliente' name='email' />
                                    {errors.email && touched.email ? (
                                        <Alerta>{errors.email}</Alerta>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='telefono' className='text-gray-800'>Télefono</label>
                                    <Field id='telefono' type='tel' className='mt-2 block w-full p-3 bg-gray-300' placeholder='Télefono del cliente' name='telefono' />
                                    {errors.telefono && touched.telefono ? (
                                        <Alerta>{errors.telefono}</Alerta>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='notas' className='text-gray-800'>Notas</label>
                                    <Field as='textarea' id='notas' type='text' className='mt-2 block w-full p-3 bg-gray-300 h-40' placeholder='Notas del cliente' name='notas' />
                                </div>
                                <input
                                    type="submit"
                                    value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                                    className='mt-5 w-full bg-gray-700 text-white p-3 rounded-md shadow hover:bg-gray-800 uppercase font-bold text-lg hover:cursor-pointer'
                                />
                            </Form>
                        )
                    }}
                </Formik>
            </div>)
    )
}

//Default Props funcionan como parametros por default como de un metodo se tratase
Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario
