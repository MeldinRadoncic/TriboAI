import Image from 'next/image'

const Empty = ({ label }) => {
  return (
    <div className="p-20 h-full flex flex-col items-center">
        <div className="relative">
                <Image
                src="/images/appwizardpro.png"
                width={144}
                height={144}
                alt="Empty Image"
                />
        </div>
        <p className='text-muted-foreground text-sm text-center'>
            {label}
        </p>

    </div>
  )
}

export default Empty