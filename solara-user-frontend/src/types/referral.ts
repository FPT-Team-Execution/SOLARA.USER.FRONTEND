import { User } from "./user"

export type ReferralReferRequest = {
    referrerCode: string,
    referredUserId: string
}
export type ByReferred = {
    referrerId: string,
    referredUser: User
}