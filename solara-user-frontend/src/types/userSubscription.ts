import { LearningPackageDto } from "./package";
import { User } from "./user";

export type UserSubscription = {
    id: string;
    user: User;
    package: LearningPackageDto;
    startDate: string;
    endDate: string;
};

