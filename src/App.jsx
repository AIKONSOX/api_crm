import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Layouts
import Layout from "./layout/Layout";

//Paginas
import Inicio from "./paginas/Inicio";
import EditarCliente from "./paginas/EditarCliente";
import VerCliente from "./paginas/VerCliente";
import NuevoCliente from "./paginas/NuevoCliente";

function App() {

console.log(import.meta.env);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
          <Route path=":id" element={<VerCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
