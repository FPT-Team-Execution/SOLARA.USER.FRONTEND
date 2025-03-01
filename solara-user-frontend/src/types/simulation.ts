export type VirtualGameState = {
    status: string;
    situation: Situation;
    actionFeedback: ActionFeedback;
    nextPrompt: string;
    suggestedActions: SuggestedAction[];
    score?: number | undefined,
    finalFeedback?: string | undefined
};

export type Situation = {
    description: string;
    environment: Environment;
    character: Character;
    danger: Danger;
};

export type Environment = {
    terrain: string;
    weather: string;
    time: string;
    resources: string;
};

export type Character = {
    equipment: string;
    items: string[];
    healthStatus: string;
    skills: string;
};

export type Danger = {
    threat: string;
    level: string;
    unexpectedEvents: string;
};

export type ActionFeedback = {
    evaluation: Record<string, unknown>;
    statsUpdate: StatsUpdate;
};

export type StatsUpdate = {
    health: Stat;
    hunger: Stat;
    thirst: Stat;
    spirit: Stat;
    bodyTemperature: Stat;
    fatigue: Stat;
};

export type Stat = {
    value: number;
    change: number;
    reason: string;
};

export type SuggestedAction = {
    option: string;
};

export const mockGameState: VirtualGameState = {
    status: "in_progress",
    situation: {
        description: "Bạn quyết định tìm một nơi trú ẩn tạm thời. Trong bóng tối mờ ảo, bạn lần mò xung quanh, cố gắng tìm kiếm một gốc cây lớn, một hốc đá, hoặc bất kỳ địa điểm nào có thể che chắn phần nào khỏi gió lạnh và sương đêm. Bạn chú ý đến một lùm cây rậm rạp, có vẻ như có thể tạo thành một bức tường tự nhiên. Khi đến gần, bạn nhận thấy phía sau lùm cây là một khoảng trống nhỏ, đủ để bạn có thể ngồi hoặc nằm xuống. Tuy nhiên, mùi ẩm mốc và mục rữa xộc thẳng vào mũi, báo hiệu nơi này có thể không an toàn.",
        environment: {
            terrain: "rừng già, nhiều cây cỏ thu và bụi rậm, có lùm cây rậm rạp",
            weather: "lạnh, ẩm ướt, không mưa",
            time: "đêm khuya",
            resources: "cây cối, lá khô, có thể có côn trùng trong lùm cây"
        },
        character: {
            equipment: "áo khoác mỏng, quần jeans, giày leo núi",
            items: ["dao nhỏ (đã nắng)", "bật lửa (còn khoảng 50% nhiên liệu)"],
            healthStatus: "khỏe mạnh, mệt mỏi và lo lắng",
            skills: "không có kỹ năng sinh tồn đặc biệt, kiến thức cơ bản về sử dụng dao và bật lửa"
        },
        danger: {
            threat: "Lùm cây có thể không an toàn, có thể chứa côn trùng, rắn rết hoặc thậm chí động vật hoang dã.",
            level: "Trung bình",
            unexpectedEvents: "Bị côn trùng cắn, rắn rết tấn công, hoặc bị động vật hoang dã phát hiện."
        }
    },
    actionFeedback: {
        evaluation: {},
        statsUpdate: {
            health: { value: 90, change: 0, reason: "" },
            hunger: { value: 35, change: -5, reason: "" },
            thirst: { value: 45, change: -5, reason: "" },
            spirit: { value: 35, change: -10, reason: "" },
            bodyTemperature: { value: 36.3, change: -0.2, reason: "" },
            fatigue: { value: 50, change: +5, reason: "" }
        }
    },
    nextPrompt: "Bạn sẽ làm gì tiếp theo? Có nên kiểm tra kỹ lùm cây trước khi vào trú ẩn, hay tìm kiếm một nơi khác an toàn hơn?",
    suggestedActions: [
        { option: "Kiểm tra lùm cây cẩn thận (sử dụng dao để xua đuổi động vật nếu có)" },
        { option: "Tìm kiếm một nơi trú ẩn khác (mất thêm thời gian và sức lực)" },
        { option: "Bỏ qua lùm cây và nhóm lửa ngay tại chỗ (tăng nguy cơ bị phát hiện, nhưng có thể xua đuổi động vật)" }
    ]
};