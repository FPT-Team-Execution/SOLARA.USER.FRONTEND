import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Các route cần bảo vệ
const protectedRoutes = ['/learning'];

export async function middleware(req: NextRequest) {
    try {
        const { userId } = await auth();

        // Kiểm tra nếu đang truy cập route được bảo vệ
        if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
            // Nếu chưa đăng nhập
            if (!userId) {
                return NextResponse.redirect(new URL('/signin', req.url));
            }
        }

        // Tiếp tục nếu đã đăng nhập
        return NextResponse.next();
    } catch (error) {
        console.error('Lỗi xác thực trong middleware:', error);

        // Redirect đến trang lỗi hoặc đăng nhập nếu xảy ra lỗi không mong muốn
        return NextResponse.redirect(new URL('/signin', req.url));
    }
}

// Xác định scope áp dụng middleware
export const config = {
    matcher: ['/learning/:path*'], // Áp dụng middleware cho các route con trong /learning
};
