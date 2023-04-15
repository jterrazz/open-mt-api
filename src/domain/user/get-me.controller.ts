import { Controller } from '@domain/controller';
import { User } from '@domain/user/user';

export type GetMeController = Controller<number, User>;
