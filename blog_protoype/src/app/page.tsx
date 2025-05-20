import Image from "next/image";
import Header from "@/components/Header";
import Login from "@/components/Login";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Login />
    </div>
  );
}
