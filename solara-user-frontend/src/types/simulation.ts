export type VirtualGameState = {
    status: string;
    situation: Situation;
    actionFeedback: ActionFeedback;
    nextPrompt: string;
    suggestedActions: SuggestedAction[];
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