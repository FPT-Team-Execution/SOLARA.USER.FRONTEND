import { useState } from "react";
import { Tabs, Button, Input, Collapse, notification } from "antd";
import useUserStore from "@/zustand/useUserStore";
import axiosClient from "@/utils/axios/axiosClient";
import { ReferralReferRequest } from "@/types/referral";
import { getCookie } from "cookies-next";
import { POST_REFERRAL_REFER_API } from "@/constants/apis";
import { IBaseModel } from "@/interfaces/general";

const { TabPane } = Tabs;
const { Panel } = Collapse;

const UserReferral = () => {
    const { user } = useUserStore();
    const [inputCode, setInputCode] = useState("");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(user!.referralCode!);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async () => {

        if (inputCode.trim() == "") {
            notification.warning({
                message: 'Thất bại!',
                description: "Bạn chưa nhập mã!"
            })
            return
        }

        const request: ReferralReferRequest = {
            referredUserId: getCookie("__appUserId") as string,
            referrerCode: inputCode
        }
        const response = await axiosClient.post<IBaseModel<null>>(POST_REFERRAL_REFER_API, request);

        if (response.data.isSuccess) {
            notification.success({
                message: 'Thành công!',
                description: "Đã nhận mã giới thiệu!"
            })
            setInputCode("");
        } else {
            notification.warning({
                message: 'Thất bại!',
                description: "Mã đã được sử dụng!"
            })
        }
    };

    return (
        <div className="w-full">
            <Collapse>
                <Panel header="Mã giới thiệu" key="1">
                    <Tabs className="flex items-center justify-center flex-col" defaultActiveKey="1">
                        <TabPane tab="Mã của bạn" key="1">
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f3f3", padding: "10px", borderRadius: "8px", marginBottom: "16px" }}>
                                <span style={{ fontSize: "18px", fontFamily: "monospace" }}>{user?.referralCode}</span>
                                <Button onClick={handleCopy} style={{ marginLeft: "8px" }}>
                                    {copied ? "✔ Đã sao chép" : "📋 Sao chép"}
                                </Button>
                            </div>
                        </TabPane>
                        <TabPane tab="Nhập mã giới thiệu" key="2">
                            <Input
                                type="text"
                                placeholder="Nhập mã giới thiệu"
                                value={inputCode}
                                onChange={(e) => setInputCode(e.target.value)}
                                style={{ marginBottom: "16px" }}
                            />
                            <Button disabled={inputCode.trim() == ""} className="!bg-green-600" type="primary" onClick={handleSubmit} block>
                                Gửi
                            </Button>
                        </TabPane>
                    </Tabs>
                </Panel>
            </Collapse>
        </div>
    );
};

export default UserReferral;
