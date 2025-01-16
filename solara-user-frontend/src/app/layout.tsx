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
  title: 'Solara - Kỹ Năng Sinh Tồn',
  description: 'Khám phá các kỹ năng sinh tồn cơ bản, từ cách tạo lửa đến tìm kiếm nước sạch.',
  keywords: 'kỹ năng sinh tồn, năng lượng mặt trời, tạo lửa, tìm nước, sống sót, kỹ năng sống',
  authors: { name: "Solara" },
  openGraph: {
    title: 'Solara - Kỹ Năng Sinh Tồn',
    description: 'Học các kỹ năng sinh tồn thiết yếu để xử lí khi gặp tình huống khẩn cấp.',
    images: [
      {
        url: 'https://solara.io.vn/_next/image?url=%2Flogo.png&w=256&q=75',
        width: 256,
        height: 256,
      },
    ],
    url: 'https://solara.io.vn/',
  },
  robots: 'index, follow',
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
      <head>
        <link rel="icon" href="../../public/sm-logo.png" />
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
