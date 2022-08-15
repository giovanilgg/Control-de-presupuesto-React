import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setIsValidPresupuesto
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);


 const handleResetApp=()=>{
    const resultado = confirm('Deseas reiniciar presupuesto y gastos')
    if(resultado){
    setGastos([])
    setPresupuesto(0)
    setIsValidPresupuesto(false)

    }

   }
  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
   //resetear la app
  
    //calcular porcentaje gastado

    const totalDisponible = presupuesto - totalGastado;
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 900);

    setGastado(totalGastado);
    setDisponible(totalDisponible);
  }, [gastos]);
  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-Us", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div className="alinear">
        <div>
          <CircularProgressbar
            text={`${porcentaje} % Gastado`}
            styles={buildStyles({
              pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
              trailColor: "#F5F5F5",
              textColor: "#3B82F6",
            })}
            value={porcentaje}
          />
        </div>
      </div>
      <div className="contenido-presupuesto">

        <button className="reset-app"
        type="button"
        onClick={handleResetApp}
        >Resetear App</button>
        <p>
          <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible:</span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado:</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
