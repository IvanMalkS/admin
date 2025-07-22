import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin panel for managing the AI Avatar project",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <nav>
              <ul>
                <li className="mb-2">
                  <a href="#" className="block hover:text-gray-300">Users</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="block hover:text-gray-300">Roles</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="block hover:text-gray-300">Sessions</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="block hover:text-gray-300">Dialog History</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="block hover:text-gray-300">FAQs</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="block hover:text-gray-300">Chat</a>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}