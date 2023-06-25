import { Controller } from '@domain/controllers/controller';
import { User } from '@domain/models/user/user';

export type GetUserController = Controller<number, User>;
