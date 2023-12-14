
const Cards = ({ thumnail, judul, channel, avatar, onClick , type}) => {
    const handleCardClick = () => {
        if (onClick) {

            onClick(); 
        }
    };

    return (
        <div className='w-[330px] h-[300px] rounded-md' onClick={handleCardClick}>
            <div className='w-[330px] h-[190px] bg-slate-100'>
                <img src={thumnail} alt='Konten' className="w-full h-full" />
            </div>
            <div>
                <div className='w-full flex '>
                    <div className='w-[20%] p-2'>
                        <img src={avatar} alt='Profile' className="rounded-full w-[40px]" />
                    </div>
                    <div className='w-[80%]'>
                        <p>{channel}</p>
                        <p>{judul}</p>
                    </div>
                    {type =="favorite" ? 
                        <div className='w-[20%] p-2'>
                            <button className="w-[55px] border-[1px]  rounded-md bg-red-500 text-white" onClick={(e)=> handleDelete(e)}>Delete</button>
                        </div>
                    : null}
                </div>
            </div>
        </div>
    )
}

export default Cards
