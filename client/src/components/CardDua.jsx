
const CardDua = ({ thumbnail, judul, onClick }) => {
  const handleCardClick = () => {
    if (onClick) {

      onClick()
    }
  };
  return (
    <div className='w-[460px] h-[150px] bg-slate-50 flex mb-5' onClick={handleCardClick}>
      <div className='w-[230px] h-[150px] bg-slate-200 '>
        <img src={thumbnail} alt='konten' className="h-full w-full" />
      </div>
      <div className="w-[130px]">
        <p className="p-2 text-sm">{judul}</p>
      </div>
    </div>
  )
}

export default CardDua
