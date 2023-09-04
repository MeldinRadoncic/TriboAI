import { auth, currentUser } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import  prisma_db  from '@/lib/prismadb'
import { stripe } from '@/lib/stripe'
import { absoluteUrl } from '@/lib/utils'

// create a setting url 
const settingsUrl = absoluteUrl('/settings')

export async function GET() {
    try{
        const { userId } = auth();
        // Get the userId and User obj from Clerk
        const { user } = await currentUser();

        // If the user is not logged in, send Unauthorized
        if (!userId || !user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        // Find the user subscription based on current user id
        const userSubscription = await prisma_db.userSubscription.findUnique({
            where: {
                userId: userId,
            },
        })

        // If user is subscribed, send a redirect to the settings page
        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            })
            return new NextResponse(JSON.stringify({ url: stripeSession.url }))
        }

        // If user is not subscribed, send a redirect to the checkout page
        const stripeSession = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            billing_address_collection:'auto',
            line_items: [
                {
                    price_data:{
                        currency:"usd",
                        product_data: {
                            name : "TriboAI Pro",
                            description: "Unlimited access to TriboAI Pro",
                        },
                        unit_amount: 1499,
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                },
            ],

            metadata: {
                userId: userId,
            },
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            customer_email: user.emailAddresses[0].emailAddress,
        })

        return new NextResponse(JSON.stringify({ url: stripeSession.url }))

    }catch(error) {
        console.log("STRIPE_ERROR: ",error.message)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
