export type IRepositoryPersist<EntityType> = (
    entity: EntityType,
) => Promise<EntityType>;
export type IRepositoryFindByString<EntityType> = (
    id: string,
) => Promise<EntityType | null>;
export type IRepositoryFindByHandle<EntityType> = (
    handle: string,
) => Promise<EntityType | null>;
export type IRepositoryFindByEmail<EntityType> = (
    handle: string,
) => Promise<EntityType | null>;
export type IRepositoryMerge<EntityType> = (
    entity: EntityType,
) => Promise<EntityType>;
