import LoginSidebar from "@/app/components/loginSidebar/loginSidebar";

export default function TwoLayout({ children }) {
  return (
    <div className="container max-w-5xl mt-16">
      <h1 className="text-3xl font-bold mb-6">Detail Page</h1>
      <div className="grid grid-cols-3 gap-8">
        <LoginSidebar />
        <div className="col-span-2">{children}</div>
      </div>
    </div>
  );
}
