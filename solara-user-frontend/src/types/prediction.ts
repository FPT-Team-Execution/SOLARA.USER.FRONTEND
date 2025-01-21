export interface Weather {
    temperature: string;
    condition: string;
    precipitationChance: string;
}

export interface RiskDetail {
    riskType: string;
    riskDescription: string;
    severity: string;
    responseAction: string;
}

export interface LocationPrediction {
    location: string;
    date: string;
    weather: Weather;
    risks: RiskDetail[];
}