import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import LoginBtn from "./loginBtn";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Navbar from "./layout/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions); // 현재 로그인된 유저이름 이메일 등이 남음

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar session={session} />
        <div className="w-full">{children}</div>
        <footer className="container max-w-5xl py-6 text-center mt-8">
          <p className="text-gray-700 text-sm">
            Built with Next.js, React.js, Tailwind CSS, and MongoDB, deployed
            with Vercel. Coded in Visual Studio Code.
          </p>
        </footer>
      </body>
    </html>
  );
}