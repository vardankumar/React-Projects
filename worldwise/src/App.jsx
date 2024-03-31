import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import { useEffect, useState } from "react";
import CountriesList from "./components/CountriesList";

export default function App() {

  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const URL= 'http://localhost:8000'

  useEffect(() => {
    async function fetchCities(){
      try {
        setIsLoading(true)
      const res = await fetch(`${URL}/cities`)
      const data = await res.json()
      setCities(data)
    } catch{
      alert('There was an error loading data')
    } finally{
      setIsLoading(false)
    }
    }

    fetchCities()

  }, [])

  return <BrowserRouter>
    <Routes>
      <Route index element={<HomePage/>} />
      <Route path='product' element={<Product/>} />
      <Route path='pricing' element={<Pricing/>} />
      <Route path='/app' element={<AppLayout/>}>
          <Route index element={<Navigate replace to='cities' />} />
          <Route path='cities/:id' element={<City/>} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="countries" element={<CountriesList cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<Form/>} />
      </Route>
      <Route path='/login' element={<Login/>} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
  </BrowserRouter>
}
