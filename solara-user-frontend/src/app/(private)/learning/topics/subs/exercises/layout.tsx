import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Learning - Solara",
    description: "Solara - Học kỹ năng sinh tồn MIỄN PHÍ qua flashcard trực quan. Trang bị kiến thức thoát hiểm, sơ cứu và sinh tồn trong mọi tình huống khẩn cấp. Truy cập ngay để bảo vệ bản thân và gia đình!",
    icons: {
        icon: '../../../',
    },
};

const layout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <>
            {children}
        </>
    )
}

export default layout
