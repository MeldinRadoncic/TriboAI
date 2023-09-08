"use client"

import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import TypewriterComponent from "typewriter-effect"
import { Button } from "./ui/button"

const font = Montserrat({
    weights: [400, 700],
    subsets: ["latin"],
})


const LandingHero = () => {
    // Check if the user is logged in
    const { isSignedIn } = useAuth()

    return (
        <div className="text-white font-bold  py-14 sm:py-14 md:py-24 lg:py-24 text-center space-y-5">
            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold flex items-center flex-col justify-center">
                <Image 
                src="/images/logo-transparent.png"
                alt="triboai logo"
                width={60}
                height={60}
                className="-mb-6 z-0 rotate-[25deg]"
                />
                <h1 className={cn("tracking-wide z-30", font.className)}>TriboAI</h1>

                

            </div>

            <div className="text-xl  text-[#5A9]">
                    <TypewriterComponent
                    options={{
                        strings:[
                            "Chatbot",
                            "Image Generator",
                            "Video Generator",
                            "Music Generator",
                            "Code Generator",
                        ],
                        autoStart:true,
                        loop:true,
                    }}
                    />

                </div>

                <div className='text-sm md:text-xl font-light text-zinc-400
                '>
                <p className="text-sm md:text=base lg:text-base"> Create content <span className="text-base text-purple-400 font-bold">10x</span> faster using TriboAI 
</p>
                </div>

                <div>
                    <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
                        
                             <Button variant='premium' className='text-white rounded-full px-12 py-6 md:py-8 lg:py-8 text-sm md:text-xl font-bold mt-12'>
                                    FREE Trial
                             </Button>
                        
                    </Link>
                </div>
                <div className="text-sm text-muted-foreground">
                    No credit card required
                </div>

        </div>
    )

}

export default LandingHero