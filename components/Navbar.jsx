import { UserButton } from '@clerk/nextjs';

import MobileSidebar from '@/components/MobileSidebar';

const Navbar = () => {
    
    return (
        <div className='flex items-center p-4'>

            {/* Render Mobile Sidebar  */}   
            <MobileSidebar />
            
            <div className='flex w-full justify-end'>  
                {/* Render User Button  */}
                <UserButton afterSignOutUrl='/'/>
                </div>

        </div>
    );
}

    export default Navbar;