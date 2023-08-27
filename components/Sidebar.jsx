"use client" 
import Link from "next/link";
import Image from "next/image";


const Sidebar = () => {

    return(
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image 
                        src={'/images/appwizardpro.png'}
                        width={32}
                        height={32}
                        alt="AppWizardPro Logo"
                        className="rounded-full"
                        />

                    </div>

                  </Link>

            </div>

        </div>
    )
}

export default Sidebar;