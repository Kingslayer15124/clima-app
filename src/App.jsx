import { useState } from "react";
import './index.css'

function App(){
  const [ciudad, setCiudad] = useState('')
  const [clima, setClima] =useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  const descripciones = {
    0: "despejado",
    1: 'mayormente despejado',
    2: 'parcialmente nublado',
    3: 'nublado',
    45: 'niebla',
    48: 'niebla con escarcha',
    51: 'llovizna ligera',
    53: 'llovizna',
    55: 'llovizna intensa',
    61: 'lluvia ligera',
    63: 'lluvia',
    65: 'lluvia intensa',
    71: 'nieve ligera',
    73: 'nieve',
    75: 'nieve intensa',
    80: 'chubascos ligeros',
    81: 'chubascos',
    82: 'chubascos intensos',
    95: 'tormentas',
    96: 'tormentas con granizo',
    99: 'tormentas con granizos intensos',
  }

  async function buscarClima(evento) {
    evento.preventDefault()

    setCargando(true)
    setError('')
    setClima(null)

    try {
      const respuestaGeo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ciudad)}&count=1&language=es&format=json`
      )

      const datosGeo = await respuestaGeo.json()

      if (!datosGeo.results || datosGeo.results.length === 0) {
        setError(`No encontre la ciudad ${ciudad}. Por favor revise la ortografia`)
        return
      }

      const {latitude, longitude, name, country} = datosGeo.results[0]

      const respuestaClima = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
      )

      const datosClima = await respuestaClima.json()

      const actual = datosClima.current

      setClima({
        nombre: name,
        pais: country,
        temperatura: actual.temperature_2m,
        humedad: actual.relative_humidity_2m,
        viento: actual.wind_speed_10m,
        descripcion: descripciones[actual.weather_code] ?? 'clima desconocido',
      })
    } catch{
      setError('Ocurrio un problema al consultar la API. Intentalo de nuevo')
    } finally {
      setCargando(false)
    }
  }

  return (
    <main>
      <h1>App del clima</h1>

      <form onSubmit={buscarClima}>
        <input 
          type="text"
          placeholder="Escribe una ciudad (ej. Madrid)"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          />
          <button type="submit" disabled={cargando}>
            {cargando ? 'Buscando...' : 'Buscar clima'}
          </button>
      </form>
      {error && <p className="error">{error}</p>}

      {clima && (
        <div className="tarjeta">
          <h2>
            {clima.nombre}, {clima.pais}
          </h2>
          <p className="temperatura">{clima.temperatura}°C</p>
          <p className="descripcion">{clima.descripcion}</p>
          <div className="detalles">
            <p>Humedad: {clima.humedad}%</p>
            <p>Viento: {clima.viento}km/h</p>
          </div>
        </div>
      )}
    </main>
  )
}
export default App