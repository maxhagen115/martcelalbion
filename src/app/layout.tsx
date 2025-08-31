import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Martcel Albion — Art & Photography",
  description: "Clean showcase of paintings and photography by Martcel Albion.",
  metadataBase: new URL("https://martcelalbion.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased font-['Raleway']">
        {children}
      </body>
    </html>
  );
}
