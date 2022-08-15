import React from "react";
import imagenPrincipal from "../img/principal.png";
import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./ControlPresupuesto";

function Header({
  presupuesto,
  setPresupuesto,
  IsValidPresupuesto,
  setIsValidPresupuesto,
  gastos,
  setGastos
 
}) {
  return (
    <header>
      <div className="headergio">
        <h1>Planificador de Gastos</h1>

        <img src={imagenPrincipal} alt="imagen principal" />
      </div>

      {IsValidPresupuesto ? (
        <ControlPresupuesto presupuesto={presupuesto} 
        gastos={gastos}
        setGastos={setGastos}
        setPresupuesto={setPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        
        />
      ) : (
        <div>
          <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
          />
        </div>
      )}
    </header>
  );
}

export default Header;
