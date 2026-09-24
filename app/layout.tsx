import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BeU | BeUs Eyewear",
  description: "Accessible luxury eyewear for every version of you.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${roboto.variable} h-full antialiased`}>
      <body className="site-body">
        <script dangerouslySetInnerHTML={{ __html: `try { var saved = localStorage.getItem('beu-theme'); var dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; document.documentElement.dataset.theme = dark ? 'dark' : 'light'; } catch (error) {}` }} />
        <SiteHeader />
        <div className="site-main">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
