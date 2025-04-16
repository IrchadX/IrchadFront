import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex min-h-screen
antialiased font-montserrat bg-white`}>
      <div className="flex min-h-screen">
        <div className=" h-screen overflow-hidden sticky top-0">
          <Sidebar userRole="admin" />
        </div>

        <div className="flex-1 flex flex-col px-8 xl:px-10">
          <Header />
          <main className="flex-1 overflow-y-auto ">{children}</main>
        </div>
      </div>
    </div>
  );
}
