import { Modal } from "antd";
import useUserStore from "@/zustand/useUserStore"
import { useRequest } from "ahooks";
import LoadingBar from "./LoadingBar";
import clock from '../../../public/clock.png';
import hourGlass from '../../../public/hourglass.png';
import { useState } from "react";
import Image from "next/image";

const UserSubcription = () => {
    const { userSubcriptions, getUserSubsctiptions } = useUserStore();
    const { loading } = useRequest(async () => {
        if (!userSubcriptions) {
            await getUserSubsctiptions();
        }
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {loading ? (
                <LoadingBar />
            ) : (
                <div className="w-full">
                    <div
                        onClick={handleOpenModal}
                        key={userSubcriptions![0].package.id}
                        className="p-4 bg-gray-100 rounded-lg transition-shadow duration-300 hover:shadow-lg cursor-pointer"
                    >
                        <div className="flex items-center">
                            <h2 className="text-2xl font-semibold text-green-600 mb-2">
                                {userSubcriptions![0].package.name}
                            </h2>

                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div>
                                    <Image src={clock} alt="" width={32} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Duration</p>
                                    <p className="text-lg font-bold text-gray-800">
                                        {userSubcriptions![0].package.durationDay} days
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div>
                                    <Image src={hourGlass} alt="" width={28} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Days Left</p>
                                    <p className="text-gray-800">
                                        {Math.max(
                                            0,
                                            Math.ceil(
                                                (new Date(userSubcriptions![0].endDate).getTime() -
                                                    new Date().getTime()) /
                                                (1000 * 60 * 60 * 24)
                                            )
                                        )}{" "}
                                        days
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal */}
                    <Modal
                        title="Chi tiết gói"
                        open={isModalOpen}
                        onOk={handleCloseModal}
                        onCancel={handleCloseModal}
                        footer={[

                        ]}
                    >
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Name:</span>
                                <span className="text-gray-800">{userSubcriptions![0].package.name}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Description:</span>
                                <span className="text-gray-800">{userSubcriptions![0].package.description}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Features:</span>
                                <span className="text-gray-800">{userSubcriptions![0].package.features}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Price:</span>
                                <span className="text-green-600 font-bold">${userSubcriptions![0].package.price}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Discount Price:</span>
                                <span className="text-red-500 font-bold">${userSubcriptions![0].package.discountPrice}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Final Price:</span>
                                <span className="text-blue-600 font-bold">${userSubcriptions![0].package.finalPrice}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Duration:</span>
                                <span className="text-gray-800">{userSubcriptions![0].package.durationDay} days</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Start Date:</span>
                                <span className="text-gray-800">
                                    {new Date(userSubcriptions![0].startDate).toLocaleDateString('vi-VM')}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">End Date:</span>
                                <span className="text-gray-800">
                                    {new Date(userSubcriptions![0].endDate).toLocaleDateString('vi-VM')}
                                </span>
                            </div>
                        </div>
                    </Modal>
                </div>
            )}
        </>
    );
};

export default UserSubcription;
