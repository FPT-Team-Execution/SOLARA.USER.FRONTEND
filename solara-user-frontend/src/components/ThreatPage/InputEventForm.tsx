import React, { useState } from "react";
import { Input, Button, List, Form, message, Modal } from "antd";
import axiosClient from "@/utils/axios/axiosClient";
import { CiEdit } from "react-icons/ci";
import { AiOutlineEdit } from "react-icons/ai";
import { LuDelete } from "react-icons/lu";
import { DisasterRisk } from "./EventPredictionDisplay";
import { IBaseModel } from "@/interfaces/general";
import { MdAddCircleOutline, MdBatchPrediction } from "react-icons/md";

interface Event {
    time: string;
    location: string;
}

interface IProps {
    setData: (data: DisasterRisk[]) => void
}

const InputEventForm = ({ setData }: IProps) => {
    const [inputEvents, setInputEvents] = useState<Event[]>([]);
    const [time, setTime] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [minPrediction, setMinPrediction] = useState<number>(1);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingEvent, setEditingEvent] = useState<Event>({ time: "", location: "" });
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [predictionLoading, setPredictionLoading] = useState<boolean>(false);

    const handleAddEvent = () => {
        if (inputEvents.length >= 10){
            message.error("Bạn chỉ được phép nhập tối đa 10 sự kiện!");
            return
        }
        if (time && location) {
            setInputEvents([...inputEvents, { time, location }]);
            setTime("");
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
        setEditingEvent({ time: "", location: "" });
    };

    const handleDeleteEvent = (index: number) => {
        const updatedEvents = inputEvents.filter((_, i) => i !== index);
        setInputEvents(updatedEvents);
    };

    const handleSubmit = async () => {
        try {
            
            if (inputEvents.length <= 0) {
                message.error("Chưa có sự kiện nào được lên lịch!");
                return
            }
            setPredictionLoading(true);
            const payload = { inputEvents, minPrediction };
            const response = await axiosClient.post<IBaseModel<DisasterRisk[]>>("/issue-prediction", payload);
            console.log("Response:", response.data);
            message.success("Gửi thành công!");
            setData(response.data.responseRequest!)
            setPredictionLoading(false);
        } catch (error) {
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
                    <Input
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="Thời gian"
                    />
                </Form.Item>


                <Button icon={<MdAddCircleOutline />} type="default" onClick={handleAddEvent} className="mb-4 hover:!text-green-600 hover:!border-green-600">
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
                            actions={[
                                <Button
                                    type="link"
                                    onClick={() => handleEditEvent(index)}
                                    icon={<AiOutlineEdit />}
                                >
                                </Button>,
                                <Button
                                    icon={<LuDelete />}
                                    type="link"
                                    onClick={() => handleDeleteEvent(index)}
                                >
                                </Button>,
                            ]}
                        >
                            <div className="md:w-full">
                                {event.time} - {event.location}
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
                            <Input
                                value={editingEvent.time}
                                onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
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
