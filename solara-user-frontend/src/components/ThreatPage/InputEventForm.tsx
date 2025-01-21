import { useState } from "react";
import { Input, Button, List, Form, message, Modal, DatePicker } from "antd";
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
            const payload = { inputEvents, minPrediction };
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
                    <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Địa điểm"
                    />
                </Form.Item>

                <Form.Item>
                    <DatePicker
                        value={time ? dayjs(time) : null}
                        onChange={(date) => setTime(date?.toDate() || null)}
                        showTime
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
                                    key={index}
                                    type="link"
                                    onClick={() => handleEditEvent(index)}
                                    icon={<AiOutlineEdit />}
                                ></Button>,
                                <Button
                                    key={index}
                                    icon={<LuDelete />}
                                    type="link"
                                    onClick={() => handleDeleteEvent(index)}
                                ></Button>,
                            ]}
                        >
                            <div key={index} className="md:w-full">
                                {dayjs(event.time).format("YYYY-MM-DD HH:mm")} - {event.location}
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
                >
                    <Form>
                        <Form.Item label="Thời gian">
                            <DatePicker
                                value={dayjs(editingEvent.time)}
                                onChange={(date) =>
                                    setEditingEvent({ ...editingEvent, time: date?.toDate() || new Date() })
                                }
                                showTime
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                        <Form.Item label="Địa điểm">
                            <Input
                                value={editingEvent.location}
                                onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            )}

            <Form.Item label="Số lượng dự đoán tối thiểu">
                <Input
                    type="number"
                    value={minPrediction}
                    onChange={(e) => setMinPrediction(Number(e.target.value))}
                    min="1"
                    style={{ width: 100 }}
                />
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
