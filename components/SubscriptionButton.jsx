"use client";

import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const SubscriptionButton = ({
  isPro = true,
}) => {
    const [loading, setLoading] = useState(false);
    // When the user clicks on the button, we make a request to the server(/api/stripe) to get the Stripe billing URL(page) whether the user is on a free trial or not
    const onBilling = async () => {
        try{
            setLoading(true);
            const response = await axios.get('/api/stripe')

            window.location.href = response.data.url
        }catch(err){
            console.log("BILLING_ERROR: ", err.message);
        }finally{
            setLoading(false);
        }
    };

  return (
    <Button
    disabled={loading}
      variant={
        isPro ? "default" : "premium"
      }
      onClick={onBilling}
      >
      {isPro
        ? "Manage subscription"
        : "Upgrade"}
      {!isPro && (
        <Zap className='w-4 h-4 ml-2 fill-white' />
      )}
    </Button>
  );
};

export default SubscriptionButton;
