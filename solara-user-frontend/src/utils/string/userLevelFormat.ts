import { UserLevel } from "@/enums/userLevel";

export function getLevelDescription(level: keyof typeof UserLevel): string {
    return UserLevel[level] || '';
}