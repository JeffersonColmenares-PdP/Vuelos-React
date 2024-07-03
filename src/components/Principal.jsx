import { useState, useEffect } from "react";
import Vuelos from "./Vuelos";
import { ToastContainer, toast } from "react-toastify"; //Para mensaje notificacion flotante
import "react-toastify/dist/ReactToastify.css"; //Para mensaje notificacion flotante
import "../styles/Paises.css";
import "../styles/Principal.css";
import "../styles/TablaPaises.css";
 
const Principal = () => {
  const [inputValueOrigen, setInputValueOrigen] = useState("");
  const [optionsOrigen, setOptionsOrigen] = useState([]);
  const [showoptionsOrigen, setShowoptionsOrigen] = useState(false);
  const [listOrigen, setListOrigen] = useState([]);

  const [inputValueDestino, setInputValueDestino] = useState("");
  const [optionsDestino, setOptionsDestino] = useState([]);
  const [showoptionsDestino, setShowoptionsDestino] = useState(false);
  const [listDestino, setListDestino] = useState([]);

  const [onButton, setOnButton] = useState(false);
  const [fechaIda, setFechaIda] = useState(null);
  const [fechaRegreso, setFechaRegreso] = useState(null);
  const [buttonDisable, setButtonDisable] = useState(true);

  const fetchMostrarOrigenes = async () => {
    try {
      const listOrigenes = [];
      const infOrigenes = await fetch(
        `http://127.0.0.1:5000/servicio-2/consulta-origen?nombre=${inputValueOrigen}`
      );
      if (infOrigenes.ok) {
        let infOrigenJs = await infOrigenes.json();
        const resultOrigen = infOrigenJs?.obj;
        for (let origen of resultOrigen) {
          listOrigenes.push(origen["origen"]);
        }
        setListOrigen(listOrigenes);
      }
    } catch (error) {
      console.log("El error es: ", error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValueOrigen(value);

    if (value.length >= 3) {
      setShowoptionsOrigen(true);
    } else {
      setShowoptionsOrigen(false);
    }

    const filteredoptionsOrigen = listOrigen.filter((option) =>//hace un filtro para actualizar las opciones de acuerdo a la actualizacion del imput
      option.toLowerCase().includes(value.toLowerCase())
    );

    setOptionsOrigen(filteredoptionsOrigen);
  };

  const handleOptionClick = (option) => {
    setInputValueOrigen(option);
    setShowoptionsOrigen(false);
  };

  useEffect(() => {
    if (inputValueOrigen.length >= 2) {
      fetchMostrarOrigenes();
    }
    if (inputValueDestino.length >= 2) {
      fetchMostrarDestinos();
    }
    if (
      inputValueDestino !== "" &&
      inputValueOrigen !== "" &&
      fechaIda !== null &&
      fechaRegreso !== null
      ) {
        setButtonDisable(false);// habilita boton buscar cuando se llenan todos los campos
        }
  }, [inputValueOrigen, inputValueDestino, fechaIda, fechaRegreso]);

  const fetchMostrarDestinos = async () => {
    try {
      const listDestinos = [];
      const infDestinos = await fetch(
        `http://127.0.0.1:5000/servicio-2/consulta-destino?nombre=${inputValueDestino}`
      );
      if (infDestinos.ok) {
        let infDestinosJs = await infDestinos.json();
        const resultDestino = infDestinosJs?.obj;
        for (let destino of resultDestino) {
          listDestinos.push(destino["destino"]);
        }
        setListDestino(listDestinos);
      }
    } catch (error) {
      console.log("El error es: ", error);
    }
  };

  const handleChangeDestino = (e) => {
    const value = e.target.value;
    setInputValueDestino(value);

    if (value.length >= 3) {
      setShowoptionsDestino(true);
    } else {
      setShowoptionsDestino(false);
    }

    const filteredoptionsDestino = listDestino.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );

    setOptionsDestino(filteredoptionsDestino);
  };

  const handleOptionClickDestino = (option) => {//hace un filtro para actualizar las opciones de acuerdo a la actualizacion del imput
    setInputValueDestino(option);
    setShowoptionsDestino(false);
  };

  const handleButtonClick = () => {
    if (!listDestino.includes(inputValueDestino)) {
      toast.error("Debe seleccionar un destino válido", {
        position: "top-center",
      });
    } else if (!listOrigen.includes(inputValueOrigen)) {
      toast.error("Debe seleccionar un origen válido", {
        position: "top-center",
      });
    } else {
      setOnButton(true);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          display: "flex",
          gap: "20px",
          margin: "100px",
          marginLeft: "400px",
        }}
      >
        <div style={{ position: "relative", width: "300px" }}>
          <label>ORIGEN</label>
          <input
            type="text"
            value={inputValueOrigen}
            onChange={handleChange}
            onBlur={() => setTimeout(() => setShowoptionsOrigen(false), 200)}
            placeholder="Origen..."
            style={{
              width: "93%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
            }}
          />
          {showoptionsOrigen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                backgroundColor: "white",
                border: "1px solid #ccc",
                zIndex: 10,
              }}
            >
              {optionsOrigen.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ccc",
                    fontSize: "16px",
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ position: "relative", width: "300px" }}>
          <label>DESTINO</label>
          <input
            type="text"
            value={inputValueDestino}
            onChange={handleChangeDestino}
            onBlur={() => setTimeout(() => setShowoptionsDestino(false), 200)}
            placeholder="Destino..."
            style={{
              width: "93%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
            }}
          />
          {showoptionsDestino && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                backgroundColor: "white",
                border: "1px solid #ccc",
                zIndex: 10,
              }}
            >
              {optionsDestino.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClickDestino(option)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ccc",
                    fontSize: "16px",
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          height: "30px",
          marginTop: "-50px",
          marginLeft: "450px",
        }}
      >
        <label htmlFor="">Fecha Ida</label>
        <input type="date" onChange={(e) => setFechaIda(e.target.value)} />
        <label htmlFor="">Fecha Regreso</label>
        <input type="date" onChange={(e) => setFechaRegreso(e.target.value)} />
      </div>
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          height: "30px",
          margin: "20px",
          marginTop: "40px",
          marginLeft: "680px",
          width: "100px",
        }}
        disabled={buttonDisable}
        onClick={handleButtonClick}
      >
        Buscar
      </button>
      {onButton && (
        <Vuelos
          inputValueDestino={inputValueDestino}
          inputValueOrigen={inputValueOrigen}
          fechaIda={fechaIda}
          fechaRegreso={fechaRegreso}
          setOnButton={setOnButton}
          setInputValueDestino={setInputValueDestino}
          setInputValueOrigen={setInputValueOrigen}
          setFechaIda={setFechaIda}
          setFechaRegreso={setFechaRegreso}
        />
      )}
    </>
  );
};

export default Principal;
