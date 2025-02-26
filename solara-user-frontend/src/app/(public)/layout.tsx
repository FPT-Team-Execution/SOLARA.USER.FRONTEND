import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Market - Solara",
    description: "Solara - Học kỹ năng sinh tồn MIỄN PHÍ qua flashcard trực quan. Trang bị kiến thức thoát hiểm, sơ cứu và sinh tồn trong mọi tình huống khẩn cấp. Truy cập ngay để bảo vệ bản thân và gia đình!",
    icons: {
        icon: '../../',
    },
};

const MarketLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default MarketLayout
