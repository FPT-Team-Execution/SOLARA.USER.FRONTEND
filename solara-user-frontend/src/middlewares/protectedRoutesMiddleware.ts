import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Các route cần bảo vệ
const protectedRoutes = ['/learning'];

export async function middleware(req: NextRequest) {
    const {userId} = await auth();

    // Kiểm tra nếu đang truy cập route được bảo vệ
    if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        // Nếu không có token, redirect về trang login
        if (!userId) {
            return NextResponse.redirect(new URL('/signin', req.url));
        }
    }

    // Nếu đã đăng nhập hoặc route không được bảo vệ, tiếp tục
    return NextResponse.next();
}

// Xác định scope áp dụng middleware
export const config = {
    matcher: ['/learning/:path*'], // Chỉ áp dụng middleware cho các route trong /learning
};
