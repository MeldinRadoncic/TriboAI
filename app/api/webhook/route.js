import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import tribodb from "@/postgresql/connectDB";

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
             process.env.STRIPE_WEBHOOK_SECRET,
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

         // Extract necessary data
    const userId = session.metadata.userId;
    const name = session.customer_details.name;
    const email = session.customer_details.email;
    const stripeCustomerId = subscription.customer;
    const stripeSubscriptionId = subscription.id;
    const stripePriceId = subscription.items.data[0].price.id;
    const stripeCurrentPeriodEnd = new Date(subscription.current_period_end * 1000)

        // Add the user subscription to the database
        await tribodb.query(`INSERT INTO usersubscription (userId, name, email, stripeCustomerId, stripeSubscriptionId, stripePriceId, stripeCurrentPeriodEnd) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
    [userId, name, email, stripeCustomerId, stripeSubscriptionId, stripePriceId, stripeCurrentPeriodEnd]);

console.log("Checkout session completed: ", email);
    }

        if(event.type === "invoice_payment_succeeded"){
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription
            );

            // await prisma_db.userSubscription.update({
            //     where: {
            //         stripeSubscriptionId: subscription.id,
            //     },
                
            //     data:{
            //         stripePriceId: subscription.items.data[0].price.id,
            //         stripeCurrentPeriodEnd: new Date(
            //             subscription.current_period_end * 1000),   
            //     }

            
            //     // If user cancels subscription, delete the user from userSubscription table on the end data of the subscription

                
        
            // });

            await tribodb.query(`UPDATE usersubscription SET stripePriceId = $1, stripeCurrentPeriodEnd = $2 WHERE stripeSubscriptionId = $3`, [subscription.items.data[0].price.id, new Date(subscription.current_period_end * 1000), subscription.id]);
            console.log("INVOICE PAYMENT SUCCEEDED: ", event.data.object.customer_details.email);


        }           

        return new NextResponse( session, { status: 200 })
}