import "../styles/Paises.css";
import { useState, useEffect } from "react";

const Vuelos = ({
  inputValueDestino,
  inputValueOrigen,
  fechaIda,
  fechaRegreso,
  setOnButton,
  setInputValueDestino,
  setInputValueOrigen,
  setFechaIda,
  setFechaRegreso,
}) => {
  const [listVuelosIda, setListVuelosIda] = useState([]);
  const [listVuelosRegreso, setListVuelosRegreso] = useState([]);
  const [conEscala, setConEscala] = useState(false);

  useEffect(() => {
    fetchMostrarOrigenes();
  }, []);

  const fetchMostrarOrigenes = async () => {
    try {
      const listVueloIda = [];
      const listVueloRegreso = [];
      const infVuelo = await fetch(
        `http://127.0.0.1:5000/servicio-2/buscar-vuelos-sin-escala?origen=${inputValueOrigen}&destino=${inputValueDestino}`
      );
      if (infVuelo.ok) {
        let infVueloJs = await infVuelo.json();
        const resultVuelo = infVueloJs?.obj;
        if (
          resultVuelo &&
          resultVuelo.length > 0 &&
          resultVuelo[0]?.ciudad_intermedia
        ) {
          for (let vuelo of resultVuelo) {
            listVueloIda.push({
              destino: vuelo?.destino,
              duracion: vuelo?.duracion_total,
              hora: vuelo?.hora_ciudad_destino,
              origen: vuelo?.origen,
              precio: vuelo?.total_vuelo,
              escala: vuelo?.ciudad_intermedia,
              hora_intermedia: vuelo?.hora_ciudad_intermedia,
              duracion_intermedia: vuelo?.duracion_ciudad_intermedia,
              duracion_destino: vuelo?.duracion_ciudad_destino,
            });
          }
          setConEscala(true);
          setListVuelosIda(listVueloIda);
        } else {
          for (let vuelo of resultVuelo) {
            listVueloIda.push({
              destino: vuelo?.destino,
              duracion: vuelo?.duracion,
              hora: vuelo?.hora,
              origen: vuelo?.origen,
              precio: vuelo?.precio,
            });
          }
          setListVuelosIda(listVueloIda);
        }
      }
      const infVueloRegreso = await fetch(
        `http://127.0.0.1:5000/servicio-2/buscar-vuelos-sin-escala?origen=${inputValueDestino}&destino=${inputValueOrigen}`
      );
      if (infVueloRegreso.ok) {
        let infVueloRegresoJs = await infVueloRegreso.json();
        const resultVueloRegreso = infVueloRegresoJs?.obj;
        if (
          resultVueloRegreso &&
          resultVueloRegreso.length > 0 &&
          resultVueloRegreso[0]?.ciudad_intermedia
        ) {
          for (let vueloRegreso of resultVueloRegreso) {
            listVueloRegreso.push({
              destino: vueloRegreso?.destino,
              duracion: vueloRegreso?.duracion_total,
              hora: vueloRegreso?.hora_ciudad_destino,
              origen: vueloRegreso?.origen,
              precio: vueloRegreso?.total_vuelo,
              escala: vueloRegreso?.ciudad_intermedia,
              hora_intermedia: vueloRegreso?.hora_ciudad_intermedia,
              duracion_intermedia: vueloRegreso?.duracion_ciudad_intermedia,
              duracion_destino: vueloRegreso?.duracion_ciudad_destino,
            });
          }
          setListVuelosRegreso(listVueloRegreso);
          setConEscala(true);
        } else {
          for (let vuelo of resultVueloRegreso) {
            listVueloRegreso.push({
              destino: vuelo?.destino,
              duracion: vuelo?.duracion,
              hora: vuelo?.hora,
              origen: vuelo?.origen,
              precio: vuelo?.precio,
            });
          }
          setListVuelosRegreso(listVueloIda);
        }
      }
    } catch (error) {
      console.log("El error es: ", error);
    }
  };

  const limpiarDatos = () => {
    setInputValueDestino("");
    setFechaRegreso(null);
    setInputValueOrigen("");
    setFechaIda(null);
    setOnButton(false);
  };

  return (
    <>
      <div
        style={{
          width: "80%",
          backgroundColor: "white",
          marginLeft: "120px",
          position: "absolute",
          marginTop: "-240px",
        }}
      >
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          {listVuelosIda.length > 0
            ? "Vuelos Disponibles"
            : "Vuelos No Disponibles"}
        </h1>
        {conEscala && (
          <>
            <label htmlFor="" style={{ marginLeft: "20px", padding: "20px" }}>
              Vuelos de Ida - Fecha {fechaIda}
            </label>
            <div className="table-container">
              <table className="table-bordered">
                <thead>
                  <tr>
                    <th>Hora Salida</th>
                    <th>Ciudad Salida</th>
                    <th>Destino</th>
                    <th>Duración</th>
                    <th></th>
                    <th>Hora Salida</th>
                    <th>Ciudad Salida</th>
                    <th>Destino</th>
                    <th>Duración</th>
                    <th></th>
                    <th>Duración Total</th>
                    <th>Precio Total</th>
                  </tr>
                </thead>
                <tbody>
                  {listVuelosIda.map((item, id) => (
                    <tr key={id}>
                      <td>{item.hora_intermedia}</td>
                      <td>{item.origen}</td>
                      <td>{item.escala}</td>
                      <td>{item.duracion_intermedia}</td>
                      <th></th>
                      <td>{item.hora}</td>
                      <td>{item.escala}</td>
                      <td>{item.destino}</td>
                      <td>{item.duracion_destino}</td>
                      <th></th>
                      <td>{item.duracion}</td>
                      <td>{item.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: "20px" }}></div>
            <label htmlFor="" style={{ marginLeft: "20px", padding: "20px" }}>
              Vuelos de Regreso - Fecha {fechaRegreso}
            </label>
            <div className="table-container">
              <table className="table-bordered">
                <thead>
                  <tr>
                    <th>Hora Salida</th>
                    <th>Ciudad Salida</th>
                    <th>Destino</th>
                    <th>Duración</th>
                    <th></th>
                    <th>Hora Salida</th>
                    <th>Ciudad Salida</th>
                    <th>Destino</th>
                    <th>Duración</th>
                    <th></th>
                    <th>Duración Total</th>
                    <th>Precio Total</th>
                  </tr>
                </thead>
                <tbody>
                  {listVuelosRegreso.map((item, id) => (
                    <tr key={id}>
                      <td>{item.hora_intermedia}</td>
                      <td>{item.origen}</td>
                      <td>{item.escala}</td>
                      <td>{item.duracion_intermedia}</td>
                      <th></th>
                      <td>{item.hora}</td>
                      <td>{item.escala}</td>
                      <td>{item.destino}</td>
                      <td>{item.duracion_destino}</td>
                      <th></th>
                      <td>{item.duracion}</td>
                      <td>{item.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {!conEscala && (
          <>
            <label htmlFor="" style={{ marginLeft: "20px", padding: "20px" }}>
              Vuelos de Ida - Fecha {fechaIda}
            </label>
            <div className="table-container">
              <table className="table-bordered">
                <thead>
                  <tr>
                    <th>Hora</th>
                    <th>Ciudad Origen</th>
                    <th>Destino</th>
                    <th>Duración</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {listVuelosIda.map((item, id) => (
                    <tr key={id}>
                      <td>{item.hora}</td>
                      <td>{item.origen}</td>
                      <td>{item.destino}</td>
                      <td>{item.duracion}</td>
                      <td>{item.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding: "20px" }}></div>
            <label htmlFor="" style={{ marginLeft: "20px", padding: "20px" }}>
              Vuelos de Regreso - Fecha {fechaRegreso}
            </label>
            <div className="table-container">
              <table className="table-bordered">
                <thead>
                  <tr>
                    <th>Hora</th>
                    <th>Ciudad Origen</th>
                    <th>Destino</th>
                    <th>Duración</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {listVuelosRegreso.map((item, id) => (
                    <tr key={id}>
                      <td>{item.hora}</td>
                      <td>{item.destino}</td>
                      <td>{item.origen}</td>
                      <td>{item.duracion}</td>
                      <td>{item.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <button onClick={limpiarDatos}>Volver</button>
      </div>
    </>
  );
};
 
export default Vuelos;
