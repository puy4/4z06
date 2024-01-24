import '@/app/ui/global.css';
import { poppins } from '@/app/ui/fonts';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { NextUIProvider } from "@nextui-org/react";
import { Providers } from './providers';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">


      <body className={`${poppins.className} antialiased`}><Providers>{children}</Providers></body>
                

    </html>
  )
}
