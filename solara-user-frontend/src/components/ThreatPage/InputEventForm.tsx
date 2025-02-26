import { useState } from "react";
import { Input, Button, List, Form, message, Modal, DatePicker, Select } from "antd";
import axiosClient from "@/utils/axios/axiosClient";
import { AiOutlineEdit } from "react-icons/ai";
import { LuDelete } from "react-icons/lu";
import { IBaseModel } from "@/interfaces/general";
import { MdAddCircleOutline, MdBatchPrediction } from "react-icons/md";
import { LocationPrediction } from "@/types/prediction";
import dayjs from "dayjs";

interface Event {
    time: Date;
    location: string;
}

interface IProps {
    setData: (data: LocationPrediction[]) => void;
}

const InputEventForm = ({ setData }: IProps) => {
    const [inputEvents, setInputEvents] = useState<Event[]>([]);
    const [time, setTime] = useState<Date | null>(null);
    const [location, setLocation] = useState<string>("");
    const [minPrediction, setMinPrediction] = useState<number>(1);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingEvent, setEditingEvent] = useState<Event>({ time: new Date(), location: "" });
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [predictionLoading, setPredictionLoading] = useState<boolean>(false);

    const handleAddEvent = () => {
        if (inputEvents.length >= 10) {
            message.error("Bạn chỉ được phép nhập tối đa 10 sự kiện!");
            return;
        }
        if (time && location) {
            setInputEvents([...inputEvents, { time, location }]);
            setTime(null);
            setLocation("");
        } else {
            message.error("Vui lòng nhập đầy đủ thời gian và địa điểm!");
        }
    };

    const handleEditEvent = (index: number) => {
        setEditingIndex(index);
        setEditingEvent(inputEvents[index]);
        setIsModalVisible(true);
    };

    const handleSaveEdit = () => {
        const updatedEvents = [...inputEvents];
        updatedEvents[editingIndex as number] = editingEvent;
        setInputEvents(updatedEvents);
        setIsModalVisible(false);
        setEditingIndex(null);
        setEditingEvent({ time: new Date(), location: "" });
    };

    const handleDeleteEvent = (index: number) => {
        const updatedEvents = inputEvents.filter((_, i) => i !== index);
        setInputEvents(updatedEvents);
    };

    const handleSubmit = async () => {
        try {
            if (inputEvents.length <= 0) {
                message.error("Chưa có sự kiện nào được lên lịch!");
                return;
            }
            setPredictionLoading(true);

            // Chuyển đổi time về dạng YYYY-MM-DD
            const formattedEvents = inputEvents.map(event => ({
                time: dayjs(event.time).format("YYYY-MM-DD"),
                location: event.location
            }));

            const payload = { inputEvents: formattedEvents, minPrediction };
            const response = await axiosClient.post<IBaseModel<LocationPrediction[]>>("/issue-prediction", payload);
            console.log("Response:", response.data);
            message.success("Dự đoán thành công!");
            setData(response.data.responseRequest!);
            setPredictionLoading(false);
        } catch (error) {
            setPredictionLoading(false);
            console.error("Lỗi khi gửi dữ liệu:", error);
            message.error("Đã xảy ra lỗi khi gửi dữ liệu!");
        }
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Nhập Sự Kiện</h1>

            <div className="mb-4">
                <Form.Item>
                    <Select
                        value={location}
                        onChange={(value) => setLocation(value)}
                        placeholder="Chọn tỉnh/thành phố"
                        style={{ width: "100%" }}
                        showSearch
                    >
                        {[
                            "An Giang", "Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre",
                            "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng",
                            "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai",
                            "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang",
                            "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng",
                            "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận",
                            "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị",
                            "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế",
                            "Tiền Giang", "TP. Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
                        ].map((province) => (
                            <Select.Option key={province} value={province}>
                                {province}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <DatePicker
                        value={time ? dayjs(time) : null}
                        onChange={(date) => setTime(date?.toDate() || null)}
                        placeholder="Chọn thời gian"
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Button
                    icon={<MdAddCircleOutline />}
                    type="default"
                    onClick={handleAddEvent}
                    className="mb-4 hover:!text-green-600 hover:!border-green-600"
                >
                    Thêm sự kiện
                </Button>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2">Danh sách sự kiện:</h2>
                <List
                    bordered
                    dataSource={inputEvents}
                    renderItem={(event, index) => (
                        <List.Item
                            key={index}
                            actions={[
                                <Button
                                    className="!text-green-600"
                                    key={index}
                                    type="link"
                                    onClick={() => handleEditEvent(index)}
                                    icon={<AiOutlineEdit />}
                                ></Button>,
                                <Button
                                    className="!text-green-600"
                                    key={index}
                                    icon={<LuDelete />}
                                    type="link"
                                    onClick={() => handleDeleteEvent(index)}
                                ></Button>,
                            ]}
                        >
                            <div key={index} className="md:w-full">
                                {event.location} - {dayjs(event.time).format("YYYY-MM-DD")}
                            </div>
                        </List.Item>
                    )}
                    style={{ height: 180, overflowY: "auto" }}
                />
            </div>

            {editingIndex !== null && (
                <Modal
                    title="Chỉnh sửa sự kiện"
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    onOk={handleSaveEdit}
                    okButtonProps={{ style: { backgroundColor: 'green' } }}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okText='Xác nhận'
                >
                    <Form>
                        <Form.Item label="Địa điểm">
                            <Input
                                value={editingEvent.location}
                                onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item label="Thời gian">
                            <DatePicker

                                value={dayjs(editingEvent.time)}
                                onChange={(date) =>
                                    setEditingEvent({ ...editingEvent, time: date?.toDate() || new Date() })
                                }
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            )}

            <Form.Item label="Số lượng dự đoán tối thiểu">
                <Select
                    value={minPrediction}
                    onChange={(value) => setMinPrediction(value)}
                    style={{ width: 100 }}
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <Select.Option key={num} value={num}>
                            {num}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Button
                loading={predictionLoading}
                icon={<MdBatchPrediction />}
                className="!bg-green-600"
                type="primary"
                onClick={handleSubmit}
                style={{ marginTop: "20px" }}
            >
                Dự đoán
            </Button>
        </div>
    );
};

export default InputEventForm;
