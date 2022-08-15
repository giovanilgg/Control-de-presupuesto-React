import imgCerrarModal from "../img/cerrar.png";
import { useState,useEffect } from "react";
import Mensaje from "./Mensaje";

const Modal = ({ setModal, animarModal, setAnimarModal,guardarGasto,gastoEditar,setGastoEditar}) => {
  const [nombre, setNombre] = useState("");
  const [mensaje,setMensaje]=useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [id,setID]=useState('');
  


  useEffect(()=>{
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre)
   
      setCategoria(gastoEditar.categoria) 
      setCantidad(gastoEditar.cantidad)
      setID(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  


  },[])
  const handleSubmit = (e) => {
   e.preventDefault()

   if([nombre,cantidad,categoria].includes('') || cantidad<0
   ){

   
    setMensaje('Todos los campos son obligatorios ');
    setTimeout(() => {
        setMensaje('');  
    }, 2000);

   }else{


    guardarGasto({nombre,cantidad,categoria,id,fecha})

    



   }




  };
  const ocultarModal = () => {
    setGastoEditar({})
    setAnimarModal(false);
   
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={imgCerrarModal}
          alt="Imagen cerrar modal"
          onClick={ocultarModal}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
        {mensaje && <Mensaje tipo='error'> {mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            type="text"
            id="nombre"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="number"
            id="cantidad"
             placeholder="Añade el nombre del gasto"
            value={cantidad}
           
            onChange={(e) => {
              setCantidad(Number(e.target.value));
            }}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
            }}
          >
            <option value="">--Seleccione-- </option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="subscripciones">Subscripciones</option>
          </select>
        </div>
        <input type="submit" value={gastoEditar.nombre ? "Actualizar Gasto" : "Añadir Gasto"}/>
      </form>
    </div>
  );
};

export default Modal;
