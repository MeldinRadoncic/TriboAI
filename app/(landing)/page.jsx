import Link from "next/link";

import { Button } from '@/components/ui/button'

const LandingPage = () => {

    return (
        <>
        <div>
            <h1>Landing Page (Unprotected)</h1>
        </div>
        <div>
            <Link href="/sign-in">
                <Button>Sign In</Button>
            </Link>
            <Link href="/sign-up">
                <Button>Sign Up</Button>
            </Link>
            
        </div>
        </>
    )

}

export default LandingPage;