import { UserSettingsEntity } from './user-settings.entity';

export interface UserSettingsRepository {
    findByUserId: (userId: number) => Promise<UserSettingsEntity | null>;
}
