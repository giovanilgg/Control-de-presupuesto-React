import React from "react";
import { useState } from "react";
import Mensaje from "./Mensaje";
function NuevoPresupuesto({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) {
  const [mensaje, setMensaje] = useState("");

  const handlePresupuesto = (e) => {
    e.preventDefault();
    if (!presupuesto || presupuesto < 0) {
      setMensaje("No es un presupuesto valido");
      return;
    }
    setIsValidPresupuesto(true);
    setMensaje("");
    console.log("presupuesto valido");
  };
  console.log(presupuesto);
  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={handlePresupuesto}>
        <div className="campo">
          <label>Definir presupuesto</label>
          <input
            className="nuevo-presupuesto"
            placeholder="Añade tu presupuesto"
            type="number"
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>

        <input type="submit" value="Añadir" />
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
}

export default NuevoPresupuesto;
