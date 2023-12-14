
const Cards = ({thumnail, judul, channel, avatar}) => {
    return (
        <div className='w-[330px] h-[300px] rounded-md'>
            <div className='w-[330px] h-[190px] bg-slate-100'>
                <img src={thumnail} alt='Konten' />
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
                </div>
            </div>
        </div>
    )
}

export default Cards
