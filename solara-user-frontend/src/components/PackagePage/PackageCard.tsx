import { LearningPackageDto } from '@/types/package';
import React from 'react';
import { Card, Button, Typography, notification } from 'antd';
import { CiCircleCheck } from 'react-icons/ci';

const { Title, Paragraph } = Typography;

interface IProps {
  package: LearningPackageDto;
}

const PackageCard = (props: IProps) => {
  const { package: pkg } = props;

  const formatPrice = (price: number | undefined) => {
    if (!price) return '₫0';
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  return (
    <Card
      className="max-w-xs shadow-lg hover:shadow-xl transition-shadow duration-300"
      hoverable
      cover={<div className="bg-gray-200 rounded-t-lg"></div>}
    >
      <Title level={3} className="text-gray-800 mb-4">
        {pkg.name}
      </Title>

      <Paragraph className="text-gray-600 text-sm mb-6 min-h-16">{pkg.description}</Paragraph>


      <div className="text-center mb-4">
        <p className="text-3xl font-extrabold">
          {formatPrice(pkg.finalPrice)}
        </p>
        {pkg.discountPrice && (
          <p className="text-sm text-gray-500 line-through">
            {formatPrice(pkg.price)}
          </p>
        )}
        <p className="text-gray-500 text-sm">{pkg.durationDay} ngày</p>
      </div>

      <Button onClick={() => notification.success({ message: "Bạn muốn mua cái này?" })} className='w-full mb-6 !py-6 !font-bold !text-lg !bg-green-600 !text-white'>Đăng ký ngay</Button>

      <hr className='mb-4' />

      <ul className="text-gray-600 text-left text-sm list-none">
        {pkg.features?.split(',').map((feature, index) => (
          <li className='flex items-center gap-2' key={index}><CiCircleCheck className='text-green-500' /> {feature.trim()}</li>
        ))}
      </ul>

    </Card>
  );
};

export default PackageCard;
