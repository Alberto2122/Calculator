import { useState, FormEvent} from 'react'
import './App.css'

import logoImg from './assets/logo.png'


interface infoPomps{
  title: string;
  Gasoline: string | number;
  Alcohol: string | number;
}

function App() {
   const[gasolineInput, setGasolineInput] = useState(0)
   const[alcoholInput, setAlcoholInput] = useState(0)
   const[info, setInfo] = useState<infoPomps>()

   function Calculate(event: FormEvent){
    event.preventDefault();

    const calculation = (alcoholInput / gasolineInput)

    if( calculation <= 0.7){
      setInfo({
        title: "It's worth using Alcohol",
        Gasoline: formatCurrency(gasolineInput),
        Alcohol: formatCurrency(alcoholInput)
      })
    } else{
      setInfo({
        title: "It's worth using Gasoline",
        Gasoline: formatCurrency(gasolineInput),
        Alcohol: formatCurrency(alcoholInput)
      })
    }

   }

   function formatCurrency(value: number){
     const formatCurrency = value.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
     })

     return formatCurrency;
   }

  return (
    <div>
    <main className='container'>

      <img className='logo' src={logoImg} alt='Logo'/>

      <h1 className='title'>which is the best option?</h1>

      <form className='form' onSubmit={Calculate}>
        <label>Alcohol (price per liquid):</label>

        <input className='input' type='number' placeholder='4.90' min={1} step={0.01} required 
        value={alcoholInput} onChange={(e)=> setAlcoholInput(Number(e.target.value))}/>

        <label>Gasoline (price per liquid):</label>

        <input className='input' type='number' placeholder='4.90' min={1} step={0.01} required
         value={gasolineInput} onChange={(e)=> setGasolineInput(Number(e.target.value))}/>

        <input className='button' type="submit" value="Calculate"/>
      </form> 

      {info && Object.keys(info).length > 0 && (
        <section className='result'>
        <h2 className='result-title'>{info.title}</h2>

        <span>Alcohol: {info.Alcohol}</span>
        <span>Gasoline: {info.Gasoline}</span>
      </section>
      )}

    </main>
    </div>
  
  )
}

export default App
