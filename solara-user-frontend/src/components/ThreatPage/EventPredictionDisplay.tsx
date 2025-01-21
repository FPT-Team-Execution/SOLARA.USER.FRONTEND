import { LocationPrediction } from "@/types/prediction";
import { Card, List, Collapse, Tag, Popover } from "antd";

const EventPredictionDisplay = ({ data }: { data: LocationPrediction[] }) => {
    return (
        <div className="p-6">
            <List
                itemLayout="vertical"
                size="large"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item key={index}>
                        <Card title={item.location} hoverable className="shadow-lg" bordered={true}>
                            <div>
                                <p>
                                    <strong>Ngày:</strong> {new Date(item.date).toLocaleDateString("vi-VN")}
                                </p>
                                <p>
                                    <strong>Nhiệt độ:</strong> {item.weather.temperature}
                                </p>
                                <p>
                                    <strong>Tình trạng thời tiết:</strong> {item.weather.condition}
                                </p>
                                <p>
                                    <strong>Khả năng mưa:</strong> {item.weather.precipitationChance}
                                </p>
                            </div>

                            <Collapse>
                                <Collapse.Panel header="Các rủi ro thiên tai" key="1">
                                    <List
                                        size="small"
                                        bordered
                                        dataSource={item.risks}
                                        renderItem={(risk) => {
                                            // Nội dung của Popover
                                            const popoverContent = (
                                                <div className="md:max-w-2xl p-2 space-y-3">
                                                    <p className="text-gray-700">
                                                        <span className="font-semibold text-gray-800">Mô tả:</span> {risk.riskDescription}
                                                    </p>
                                                    <p className="text-gray-700">
                                                        <span className="font-semibold text-gray-800">Mức độ:</span>
                                                        <span className={`ml-2 px-2 py-1 rounded-lg text-white text-sm ${risk.severity === 'Cao' ? 'bg-red-500' : risk.severity === 'Trung bình' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                                                            {risk.severity}
                                                        </span>
                                                    </p>
                                                    <p className="text-gray-700">
                                                        <span className="font-semibold text-gray-800">Hành động:</span> {risk.responseAction}
                                                    </p>
                                                </div>

                                            );

                                            return (
                                                <List.Item>
                                                    <Popover
                                                        className=""
                                                        content={popoverContent}
                                                        title={risk.riskType}
                                                        trigger="hover"
                                                    >
                                                        <Tag color="volcano">{risk.riskType}</Tag>
                                                    </Popover>
                                                </List.Item>
                                            );
                                        }}
                                    />
                                </Collapse.Panel>
                            </Collapse>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default EventPredictionDisplay;
