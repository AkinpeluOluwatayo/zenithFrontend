import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Provider"; // Ensure this path matches where you saved providers.js

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Zenith | Financial Intelligence",
    description: "Master your money with precision.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Wrap children in the Providers component */}
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}