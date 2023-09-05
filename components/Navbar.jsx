import { UserButton } from '@clerk/nextjs';

import MobileSidebar from '@/components/MobileSidebar';
import { getAPILimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const Navbar = async () => {

    // Get the API limit count for the current user from the database using getAPILimitCount() function located in lib/api-limit.js
  const apiLimitCount = await getAPILimitCount();  

  // Check if the user is on a Pro plan and if yes do not show the free counter in the sidebar
  const isPro = await checkSubscription();

    return (
        <div className='flex items-center p-4'>

            {/* Render Mobile Sidebar  */}   
            <MobileSidebar apiLimitCount={apiLimitCount}
            isPro={isPro}
            />
            
            <div className='flex w-full justify-end'>  
                {/* Render User Button  */}
                <UserButton afterSignOutUrl='/'/>
                </div>

        </div>
    );
}

    export default Navbar;