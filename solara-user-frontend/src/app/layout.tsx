import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ClerkProvider } from "@clerk/nextjs";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import AppHeader from "@/components/layout/AppHeader";
import AutoAuthen from "@/components/layout/AutoAuthen";
import { viVN } from '@clerk/localizations'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const contentStyle: React.CSSProperties = {
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 70px)',
};

const layoutStyle = {
  overflow: 'hidden',
};

export const metadata: Metadata = {
  title: "Home - Solara",
  description: "Learning survival course application",
  icons: {
    icon: './',
  },
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <ClerkProvider dynamic localization={viVN}>
      <head>
        <link rel="icon" href="sm-logo.png" />
      </head>
      <html lang="vn">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AntdRegistry>
            <Layout style={layoutStyle}>
              <AutoAuthen></AutoAuthen>
              <AppHeader></AppHeader>
              <Content style={contentStyle}>{children}</Content>
            </Layout>
          </AntdRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
