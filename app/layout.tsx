import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ToggleProvider } from "@/lib/contexts/toggle-context";
import { ChristmasProvider } from "@/lib/contexts/christmas-context";
import { SolanaWalletProvider } from "@/components/wallet-provider";
import { ReCaptchaProvider } from "@/components/recaptcha-provider";
import { Navbar } from "@/components/navbar";
import { Dock, DockIcon } from "@/components/magicui/dock";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "$HAPPINESS - The Happiest Meme Coin on Solana",
  description: "Funding daily live charity shows via creator trading fees",
  icons: {
    icon: '/files/logo.png',
    shortcut: '/files/logo.png',
    apple: '/files/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <SolanaWalletProvider>
            <ReCaptchaProvider>
              <ToggleProvider>
                <ChristmasProvider>
                  <Navbar />
                  <main className="min-h-screen">{children}</main>
                  <Dock>
                    <DockIcon 
                      id="dock-x-main"
                      href="https://x.com/projecthappysol"
                      logo="/files/cryptologos/Twitter Logo.png"
                      alt="X / Twitter"
                      tooltip="X / Twitter"
                    />
                    <DockIcon 
                      id="dock-pumpfun"
                      href="https://pump.fun"
                      logo="/files/cryptologos/PumpFun Logo.png"
                      alt="Pump.fun"
                      tooltip="Pump.fun"
                    />
                    <DockIcon 
                      id="dock-x-community"
                      href="https://x.com/projecthappysol"
                      logo="/files/cryptologos/Twitter Logo.png"
                      alt="X Community"
                      tooltip="X Community"
                    />
                    <DockIcon 
                      id="dock-dexscreener"
                      href="https://dexscreener.com"
                      logo="/files/cryptologos/Dexscreener Logo.png"
                      alt="DexScreener"
                      tooltip="DexScreener"
                    />
                  </Dock>
                </ChristmasProvider>
              </ToggleProvider>
            </ReCaptchaProvider>
          </SolanaWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

