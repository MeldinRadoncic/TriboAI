import Image from 'next/image'

const Empty = ({ label }) => {
  return (
    <div className="p-20 h-full flex flex-col justify-center items-center">
        <div className="relative">
                <h1 className='text-8xl font-extrabold text-[#55AA99]/40 mb-2'>TriboAI</h1>
        </div>
        <p className='text-muted-foreground text-sm text-center'>
            {label}
        </p>

    </div>
  )
}

export default Empty