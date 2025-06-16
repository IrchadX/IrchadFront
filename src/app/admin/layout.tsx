import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex min-h-screen w-full
antialiased font-montserrat `}>
      <div className="flex min-h-screen w-full">
        <div className=" h-screen overflow-hidden sticky top-0">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col px-8 xl:px-10 w-full">
          <Header />
          <main className="flex-1 overflow-y-auto w-full">{children}</main>
        </div>
      </div>
    </div>
  );
}
