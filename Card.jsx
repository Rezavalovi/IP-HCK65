import React from "react"

const Card = () => {
  return (
    <div className='w-[330px] h-[300px] bg-slate-300 rounded-md'>
      <div className='w-[330px] h-[190px] bg-slate-100'>
        <img src='' alt='Konten' />
      </div>
      <div>
        <div className='w-full flex '>
          <div className='w-[20%]'>
            <img src='' alt='Profile' />
          </div>
          <div className='w-[80%]'>
            <p>Judul</p>
            <p>Nama Channel</p>
            <p>Keterangan</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
