export type DocTypeDTO = {
    name: string;
};

export type DocTypesListDTO = DocTypeDTO[];

export type DocTypeEntity = ReturnType<() => DocTypeDTO['name']>;

export type DocTypesList = DocTypeEntity[];
