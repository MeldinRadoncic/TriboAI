import Navbar from "@/components/Navbar";
import  Sidebar  from "@/components/Sidebar.jsx";

const DashboardLayout = ({
  children,
}) => {
  return (
    <div className='h-full relative'>
      <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-yellow-900'>

<Sidebar />

      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
