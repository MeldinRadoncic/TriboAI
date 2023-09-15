import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import  prisma_db  from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
        
    const body = await req.text();
    const signature = headers().get('Stripe-Signature').trim();


    let event;

    try{

        event = stripe.webhooks.constructEvent(
            body,
             signature,
              process.env.STRIPE_WEBHOOK_SECRET.trim()
              );


    }catch(err){
        console.log("WEBHOOK_ERROR: ", err.message);
        return new NextResponse(`Webhook Error ${err.message}`, {
            
            status: 400 });
    }

    const session = event.data.object;

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const subscription = await stripe.subscriptions.retrieve(session.subscription);

        if(!session?.metadata?.userId){
            return new NextResponse("UserId is required ", { status: 400 });
        }
        console.log("EVENT ", event.data)

        // Add the user subscription to the database
        await prisma_db.userSubscription.create({
            data: {
                userId: session?.metadata?.userId,
                name:event.data.object.customer_details.name,
                email:event.data.object.customer_details.email,               
                stripeCustomerId: subscription.customer,
                stripeSubscriptionId: subscription.id,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
        });
    }

        if(event.type === "invoice_payment_succeeded"){
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription
            );

            await prisma_db.userSubscription.update({
                where: {
                    stripeSubscriptionId: subscription.id,
                },
                
                data:{
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(
                        subscription.current_period_end * 1000),   
                }

            
                // If user cancels subscription, delete the user from userSubscription table on the end data of the subscription
                
                
                    })
                }



            });
        }           

        return new NextResponse( session, { status: 200 })
}