import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Papas Love Children's Ministry | Hope • Care • Brighter Futures", description: "Faith-driven care, education and opportunity for vulnerable and orphaned children in Uganda." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }