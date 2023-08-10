export type OrganizationDTO = {
    name: string;
};

export type OrganizationsListDTO = OrganizationDTO[];

export type OrganizationEntity = ReturnType<() => OrganizationDTO['name']>

export type OrganizationsList = OrganizationEntity[];
