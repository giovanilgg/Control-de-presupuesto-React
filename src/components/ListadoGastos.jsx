import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="Listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>{gastosFiltrados.length ? "Gastos" : "No encontro gastos de esta categoria"}</h2>

          {gastosFiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              setGastoEditar={setGastoEditar}
              gasto={gasto}
              eliminarGasto={eliminarGasto}
            ></Gasto>
          ))}
        </>
      ) : (
        <>
          <h2>{gastos.length ? "Gastos" : "No hay gastos aún"}</h2>

          {gastos.map((gasto) => (
            <Gasto
              key={gasto.id}
              setGastoEditar={setGastoEditar}
              gasto={gasto}
              eliminarGasto={eliminarGasto}
            ></Gasto>
          ))}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
