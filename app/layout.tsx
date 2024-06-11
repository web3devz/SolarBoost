import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import { Inter } from "next/font/google";

import "./globals.css";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;