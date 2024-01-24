'use client';
import '@/app/ui/global.css';
import { poppins } from '@/app/ui/fonts';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
      <body className={`${poppins.className} antialiased`} >{children}</body>
      </UserProvider>
    </html>
  );
}
