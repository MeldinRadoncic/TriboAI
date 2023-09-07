

import colors from '@/config/colors'


const LandingLayout = ( { children } ) => {

    return (
        <main className="h-full overflow-auto" style={{
            backgroundColor: colors?.sidebarColor
        }}>
            <div className='mx-auto max-w-screen-xl h-full w-full'>
                { children }
            </div>
            </main>
    )
}

export default LandingLayout