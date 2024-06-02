import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Provider from "./components/Provider";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WhatToDo!",
  description: "WhatToDo! a todo list app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className={quicksand.className + ' h-dvh flex flex-col'}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            <Navbar />
            <div className=" overflow-y-scroll grow bg-slate-700 dark:bg-slate-900">
              {children}
            </div>
          </Provider>
        </ThemeProvider>
      </body>

    </html>
  );
}