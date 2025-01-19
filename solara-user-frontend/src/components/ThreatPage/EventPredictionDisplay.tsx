import React from "react";
import { Card, List, Collapse, Tag, message } from "antd";

export interface Weather {
    temperature: string;
    condition: string;
    precipitationChance: string;
}

export interface DisasterRisk {
    location: string;
    weather: Weather;
    disasterRisks: string[];
}

const EventPredictionDisplay = ({ data }: { data: DisasterRisk[] }) => {

    return (
        <div className="p-6">
            <List
                itemLayout="vertical"
                size="large"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item key={item.location}>
                        <Card title={item.location} hoverable className="shadow-lg" bordered={true}>
                            <div>
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
                                        dataSource={item.disasterRisks}
                                        renderItem={(risk) => (
                                            <List.Item>
                                                <Tag color="volcano">{risk}</Tag>
                                            </List.Item>
                                        )}
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
