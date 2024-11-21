import Image from "next/image";
import Link from "next/link";
import CustomButton from "../Button/CustomButton";
import styles from "./MainBanner.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            {/* Hình ảnh banner */}
            <Image
                src="/banner.png"
                alt="banner"
                layout="responsive"
                width={1962}
                height={1303}
                priority
                className={styles.bannerImage}
            />

            {/* Tiêu đề phụ */}
            <div className={`${styles.subtitle} ${styles.responsiveText}`}>
                Học kỹ năng sinh tồn cho mọi tình huống
            </div>

            {/* Tiêu đề chính */}
            <div className={`${styles.title} ${styles.responsiveTitle}`}>
                Chuẩn Bị Cho Những Điều Không Ngờ Tới!
            </div>

            {/* Nút */}
            <div className={styles.buttonContainer}>
                <Link href="/learning">
                    <CustomButton className={styles.learnButton}>
                        Học ngay
                    </CustomButton>
                </Link>
                <Link href="/simulation">
                    <CustomButton className={`${styles.simulationButton}`}>
                        Khám phá giả lập
                    </CustomButton>
                </Link>
            </div>
        </div>
    );
}
