import { UserButton } from '@clerk/nextjs';

import MobileSidebar from '@/components/MobileSidebar';
import { getAPILimitCount } from '@/lib/api-limit';

const Navbar = async () => {

    // Get the API limit count for the current user from the database using getAPILimitCount() function located in lib/api-limit.js
  const apiLimitCount = await getAPILimitCount();  

    return (
        <div className='flex items-center p-4'>

            {/* Render Mobile Sidebar  */}   
            <MobileSidebar apiLimitCount={apiLimitCount} />
            
            <div className='flex w-full justify-end'>  
                {/* Render User Button  */}
                <UserButton afterSignOutUrl='/'/>
                </div>

        </div>
    );
}

    export default Navbar;