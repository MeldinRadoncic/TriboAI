import { Settings2Icon } from "lucide-react";

import Heading from "@/components/Heading";
import colors from "@/config/colors";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";

const SettingsPage = async () => {
  // Check if the user is on a free trial or not
  const isPro =
    await checkSubscription();
  return (
    <div>
      <Heading
        title='Settings'
        description='Manage your account'
        icon={
          <Settings2Icon
            size={24}
            color={colors.settingsIcon}
          />
        }
      />

      <div className='px-4 lg:px-8 space-y-4'>
        <div className='text-muted-foreground'>
          {isPro
            ? <div className='w-full flex justify-center items-center my-4'>
            <p className="text-xl my-8">You are on a Pro Plan</p>
         </div>
            :(
              <div className='w-full flex justify-center items-center my-4'>
                 <p className="text-xl my-8">You are on a FREE trial</p>
              </div>
            )}
        </div>
        <div className="w-full flex justify-center items-center">
        <SubscriptionButton
          isPro={isPro}
        />

        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
