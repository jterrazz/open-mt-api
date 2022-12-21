import { UserSettingsEntity } from '@domain/use-cases/user/user-settings.entity';

export interface UserSettingsRepository {
    findByUserId: (userId: number) => Promise<UserSettingsEntity | null>;
}
