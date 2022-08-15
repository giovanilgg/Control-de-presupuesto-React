import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import nuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal.jsx";
import ListadoGastos from "./components/ListadoGastos.jsx";

import Filtros from "./components/filtros.jsx";

import { generarId } from "./helpers/funciones.js";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [IsValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter((gasto) => {
        return gasto.categoria === filtro;
      });
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto) ?? 0;
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos)) ?? [];
  }, [gastos]);
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //actualiza

      //console.log(gasto);

      const gastoActualizado = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastoActualizado);
      setGastoEditar({});
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };
  const eliminarGasto = (id) => {
    const eliminarGasto = gastos.filter((gasto) => gasto.id != id);
    setGastos(eliminarGasto);
  };
  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        IsValidPresupuesto={IsValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setGastos={setGastos}
      />

     
      {IsValidPresupuesto && (
        <>
          <div> <Filtros filtro={filtro} setFiltro={setFiltro}></Filtros></div>
          <main>
            <ListadoGastos
              gastos={gastos}


              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            >
              {" "}
            </ListadoGastos>
          </main>

          <div className="nuevo-gasto">
            
            <img
              src={nuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
            <div >
              <p>Agrega un gasto nuevo</p>
            </div>
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        >
          {" "}
        </Modal>
      )}
    </div>
  );
}

export default App;
