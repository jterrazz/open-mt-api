export type IRepositoryPersist<EntityType> = (
    entity: EntityType,
) => Promise<EntityType>;
export type IRepositoryFindById<EntityType> = (
    id: string,
) => Promise<EntityType | null>;
export type IRepositoryFindByHandle<EntityType> = (
    handle: string,
) => Promise<EntityType | null>;
export type IRepositoryMerge<EntityType> = (
    entity: EntityType,
) => Promise<EntityType>;
