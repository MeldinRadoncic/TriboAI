import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar.jsx";
import colors from "@/config/colors";
import { getAPILimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({
  children,
}) => {
  // Get the API limit count for the current user from the database using getAPILimitCount() function
  const apiLimitCount =
    await getAPILimitCount();
  // Check if the user is on a Pro plan and if yes do not show the free counter in the sidebar
  const isPro =
    await checkSubscription();

  return (
    <div className='h-full relative'>
      <div
        className={`hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[50]`}>
        {/* Pass the apiLimitCount to the Sidebar prop */}
        <Sidebar
          apiLimitCount={apiLimitCount}
          isPro={isPro}
        />
      </div>
      <main className='md:pl-72'>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
