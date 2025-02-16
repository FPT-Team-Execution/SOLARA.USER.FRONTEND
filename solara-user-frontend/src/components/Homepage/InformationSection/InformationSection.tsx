import { LEARNING_SIMULATIONS_ROUTE, LEARNING_THREATS_ROUTE, LEARNING_TOPICS_ROUTE, MARKET_ROUTE } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const InformationSection = () => {
    return (
        <footer id="InformationSection" className="bg-white py-10 px-6 md:px-20 text-gray-900 text-start">
            <div className="flex flex-wrap md:justify-center gap-8">
                {/* Logo và địa chỉ */}
                <div>
                    <Link href="/">
                        <Image
                            alt=""
                            src="/logo.png"
                            width={100}
                            height={0}
                        />
                    </Link>
                    <p className="mt-2 font-semibold text-green-800">Học kỹ năng sinh tồn cho mọi tình huống</p>
                    <p className="mt-4">Địa chỉ</p>
                    <p className="mt-2 text-sm">Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh, Vietnam</p>
                    <p className="mt-4">Liên lạc</p>
                    <p className="mt-2 text-sm">012 345 6788</p>
                </div>

                {/* Tính năng */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Tính năng</h3>
                    <ul className="space-y-1 text-sm">
                        <li><Link href={LEARNING_TOPICS_ROUTE} className="hover:text-green-600 text-black">Flashcard tương tác</Link></li>
                        <li><Link href={LEARNING_SIMULATIONS_ROUTE} className="hover:text-green-600 text-black">Giả lập thực tế</Link></li>
                        <li><Link href={LEARNING_THREATS_ROUTE} className="hover:text-green-600 text-black">Lời khuyên & Hướng dẫn từ Chuyên gia</Link></li>
                        <li><Link href={MARKET_ROUTE} className="hover:text-green-600 text-black">Chợ dụng cụ sinh tồn</Link></li>
                    </ul>
                </div>

                {/* Về Solara */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Về SOLARA</h3>
                    <ul className="space-y-1 text-sm ">
                        <li><Link href="#MainBanner" className="hover:text-green-600 text-black">Giới thiệu</Link></li>
                        <li><Link href="#SpecialFeatures" className="hover:text-green-600 text-black">Các tính năng nổi bật</Link></li>
                        <li><Link href="#Reviews" className="hover:text-green-600 text-black">Đánh giá từ khách hàng</Link></li>
                        <li><Link href="#PartnerSection" className="hover:text-green-600 text-black">Đối tác & Nhà bán hàng</Link></li>
                        <li><Link href="#InformationSection" className="hover:text-green-600 text-black">Liên hệ</Link></li>
                    </ul>
                </div>
            </div>

            {/* Social Media */}
            <div className="flex justify-center mt-6 space-x-4">
                <Link href="https://www.facebook.com/solaravn.official" className="text-gray-600 hover:text-blue-600">
                    <FaFacebookF size={20} />
                </Link>
                <Link href="" className="text-gray-600 hover:text-pink-500">
                    <FaInstagram size={20} />
                </Link>
                <Link href="" className="text-gray-600 hover:text-red-500">
                    <FaYoutube size={20} />
                </Link>
            </div>
        </footer>
    );
};

export default InformationSection;
