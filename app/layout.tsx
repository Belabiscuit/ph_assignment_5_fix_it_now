import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { Providers } from "@/app/providers";
import "./globals.css";
import { cn } from "@/lib/utils";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FixItNow — Home services, booked in minutes",
  description:
    "Vetted technicians for plumbing, electrics, AC and more across Dhaka. Fixed prices in taka, booked in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        plusJakarta.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col">
        <div>
          <Providers>{children}</Providers>
          <Toaster richColors position="top-center" />
        </div>
      </body>
    </html>
  );
}
