export type VirtualGameState = {
    status: string;
    situation: Situation;
    action_feedback: ActionFeedback;
    next_prompt: string;
    suggested_actions: SuggestedAction[];
    score?: number | undefined,
    final_feedback?: string | undefined
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
    health_status: string;
    skills: string;
};

export type Danger = {
    threat: string;
    level: string;
    unexpected_events: string;
};

export type ActionFeedback = {
    evaluation: Record<string, unknown>;
    stats_update: StatsUpdate;
};

export type StatsUpdate = {
    health: Stat;
    hunger: Stat;
    thirst: Stat;
    spirit: Stat;
    body_temperature: Stat;
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

export type SimulationShow = {
    id: number;
    title: string;
    image: string;
    year: string;
    rating: string;
    genre: string;
    category: string;
    mood: string;
    type: string;
    description: string;
};

export type Promt = {
    userChat: string
}
