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
import { auth, clerkClient } from "@clerk/nextjs/server";
import Head from "next/head";

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

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  const client = await clerkClient()
  const { userId } = await auth();

  try {
    if (userId) {
      const user = await client.users.getUser(userId);
      if (user) {
        if (!user.publicMetadata.role)
          await client.users.updateUserMetadata(userId!, {
            publicMetadata: {
              "role": "User",
            },
          })
      }
    }
  } catch {
  }

  return (
    <ClerkProvider dynamic localization={viVN}>
      <Head>
        <title>Solara - Kĩ năng sinh tồn</title>
        <meta name="description" content="Khám phá các kỹ năng sinh tồn cơ bản, từ cách tạo lửa đến tìm kiếm nước sạch." />
        <meta name="keywords" content="kỹ năng sinh tồn, năng lượng mặt trời, tạo lửa, tìm nước, sống sót, kỹ năng sống" />
        <meta name="author" content="Solara Team" />
        <meta property="og:title" content="Solara - Kỹ Năng Sinh Tồn" />
        <meta property="og:description" content="Học các kỹ năng sinh tồn thiết yếu để xử lí khi gặp tình huống khẩn cấp." />
        <meta property="og:image" content="https://solara.io.vn/_next/image?url=%2Flogo.png&w=256&q=75" />
        <meta property="og:url" content="https://solara.io.vn/" />
        <meta name="robots" content="index, follow" />
      </Head>
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
