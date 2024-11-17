import Image from "next/image";
import Link from "next/link";
import CustomButton from "./Button/CustomButton";

export default function Home() {
    return (
        <div style={{ position: 'relative', textAlign: 'center' }}>
            <Image
                src="/banner.png"
                alt="banner"
                width={1962}
                height={1303}
                priority
            />
            
            <div style={{
                position: 'absolute',
                top: '45%',
                width: '100%',
                color: 'white',
                fontSize: '20px',
                fontFamily: 'Open Sans',
                fontWeight: 400,
                wordWrap: 'break-word',
                textAlign: 'center'
            }}>
                Học kỹ năng sinh tồn cho mọi tình huống
            </div>

            <div style={{
                position: 'absolute',
                top: '55%',
                width: '100%',
                color: 'white',
                fontSize: '48px',
                fontFamily: 'Open Sans',
                fontWeight: 700,
                wordWrap: 'break-word',
                textAlign: 'center'
            }}>
                Chuẩn Bị Cho Những Điều Không Ngờ Tới!
            </div>

            <div style={{
                position: 'absolute',
                top: '70%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                gap: '32px' // Added space between the buttons
            }}>
                <Link href="/learning">
                    <CustomButton style={{ minWidth: '150px' }}>Học ngay</CustomButton>
                </Link>
                <Link href="/simulation">
                    <CustomButton style={{ minWidth: '250px' }} className="bg-white text-green-900 hover:bg-gray-200">Khám phá giả lập</CustomButton>
                </Link>
            </div>
        </div>
    );
}
