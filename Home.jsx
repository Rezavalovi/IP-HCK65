import React from "react"
import logo from "../assets/icons/YouTube.svg"
import Card from "../components/Card"

const Home = () => {
  return (
    <div className='px-5 w-full bg-slate-200'>
      <div className='w-full flex  justify-between items-center'>
        <div>
          <img src={logo} alt='logo-Youtube' className='w-32' />
        </div>
        <div>
          <input
            type='text'
            name='search'
            id='search'
            className='w-[500px] h-[40px] border-[1px] border-slate-200 rounded-xl placeholder:px-3'
            placeholder='Telusuri'
            autoComplete='off'
          />
        </div>
      </div>

      <div className='w-full flex flex-wrap gap-5 pb-10'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default Home
