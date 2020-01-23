import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import ResultadoClima from './components/ResultadoClima';

function App() {

  //State principal
  //ciudad = state, guardarCiudad = this.setState
  const [ ciudad, guardarCiudad ] = useState('');
  const [ pais, guardarPais ] = useState('');
  const [ error, guardarError ] = useState(false);
  const [ resultado, guardarResultado ] = useState({});

  useEffect(() => {
    //Prevenir  ejecucion
    if (ciudad === '') {
      return;
    }

    const consultarAPI = async() => {

      const appId = 'e9f6dd4f68d7294337a234ae59ac8425';
  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
      //Cosultar la URL
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
  
      guardarResultado(resultado);
    }

    consultarAPI();
  }, [ ciudad, pais ])

  const datosConsulta = (datos) => {
    
    //Validar campos que no esten vacios
    if(datos.ciudad === '' || datos.pais === '') {
      //Error 
      guardarError(true);
      return;
    }

    //Ciudad y pais existen, agregarlos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }

  //Cargar un componente condicionalmente
  let componente;
  if (error) {
    //Hay un error, mostrarlo
    componente = <Error mensaje='Ambos campos son obligatorios' />
  } else if(resultado.cod === '404') {
    componente = <Error mensaje='La ciudad no fue encotrada' />
  } else {
    //No hay errores, mostrar el clima
    componente= <ResultadoClima resultado={resultado} />
  }

  return(
    <div className="App">
      <Header titulo='Clima React App' />    
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario 
                datosConsulta={datosConsulta}
              />
            </div>

            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
