import { Toaster } from "sonner";
import { Providers } from "@/app/providers";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

export default function PublicRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Header />
      <div className="flex-1">
        <Providers>{children}</Providers>
      </div>
      <Toaster richColors position="top-center" />
      <Footer />
    </div>
  );
}
