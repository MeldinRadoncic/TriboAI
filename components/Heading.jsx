
import colors from '@/config/colors'


const Heading = ({ title, description, icon }) => {
  return (
    <div className="px-4 lg-px-8 flex items-center gap-x-3 mb-8">
        <div className="p-2 w-fit rounded-md">
         { icon }
        </div>
        <div>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold'>
                {title}
            </h1>
            <p className='text-base md:text-lg lg:text-xl text-muted-foreground'>
                {description}
            </p>

        </div>

    </div>
  )
}

export default Heading