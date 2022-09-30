import axios from 'axios'
import { useState, useEffect } from 'react'
const API_KEY = process.env.REACT_APP_API_KEY

function CountryInfo({ country }) {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&limit=1&appid=${API_KEY}`).then((res) => {
      const lat = res.data[0].lat
      const lon = res.data[0].lon
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`).then((res) => {
        // console.log(res.data);
        const temp = kelvinToCelsius(res.data.main.temp)
        const wind = res.data.wind.speed
        const desc = res.data.weather[0].description
        const iconId = res.data.weather[0].icon
        const icon = `https://openweathermap.org/img/wn/${iconId}@2x.png`
        const newWeather = { temp, wind, icon, desc }
        setWeather(newWeather)
      })
    })
  }, [])

  const kelvinToCelsius = kelvin => (kelvin - 272.15).toFixed(2)

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>国旗：{country.flag}</div>
      <p>首都：{country.capital}</p>
      <p>面积：{country.area} km<sup>2</sup></p>
      <div>
        语言：
        <ul>
          {Object.values(country.languages).map((value) => <li>{value}</li>)}
        </ul>
      </div>
      <div>
        天气预报：
        <p>温度：{weather ? weather.temp : '（加载中……）'}°C</p>
        <p>风速：{weather ? weather.wind : '（加载中……）'} m/s</p>
        {weather && weather.icon && weather.desc ? <img src={weather.icon} title={weather.desc} alt={weather.desc} /> : '（天气图标加载中……）'}
      </div>
    </div>
  )
}

function Results({ results }) {
  const [countryList, setCountryList] = useState(results.map(result => { result.toggle = false; return result }))
  const toggleInfo = (country) => {
    const copyCountryList = [...countryList]
    copyCountryList.map(c => {
      if (c.name.common === country.name.common) {
        c.toggle = !c.toggle
      }
    })
    setCountryList(copyCountryList)
  }
  return (
    <>
      {countryList && countryList[0] && countryList.map(country =>
        <div>
          {country.name.common}
          <button onClick={() => toggleInfo(country)}>{country.toggle ? '收起' : '展开'}</button>
          {country.toggle ? <CountryInfo country={country} /> : ''}
        </div>
      )}
    </>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])
  const [searchValue, setSearchValue] = useState('')
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(res => {
      setCountries(res.data)
    })
  }, [])
  useEffect(() => {
    setResults(countries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLowerCase())))
  }, [searchValue, countries])

  return (
    <div>
      搜索国家：<input value={searchValue} onChange={({ target }) => setSearchValue(target.value)} />
      {results.length === 1 && <CountryInfo country={results[0]} />}
      {results.length > 1 && results.length <= 10 && <Results results={results} />}
      {results.length > 10 && '符合条件的结果太多！'}
    </div>
  );
}

export default App;
