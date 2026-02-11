import { Outlet } from "react-router-dom";
import Footer from "../components/footer/footer";
export default function LayoutPage() {
  return (
    <div
      className="w-full min-h-[100vh] border-white bg-black flex flex-col bg-starting-banner bg-cover bg-bottom text-white
    "
    >
      <Outlet />
      <Footer />
    </div>
  );
}
