import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { Organization } from './Organization'
import { JobOpening } from './JobOpening'
import { ProfileOrganizationRole } from './ProfileOrganizationRole'

/**
 * Entity class mapping rows in 'organization_role' table.
 * @class
 */
@Entity()
export class OrganizationRole extends BaseEntry {
  @Column({ type: 'varchar', length: 200 })
  name: string | undefined

  @ManyToOne(type => Organization, organization => organization.organizationRole)
  organization: Organization | undefined;

  @OneToMany(type => JobOpening, jobOpening => jobOpening.organizationRole)
  jobOpening: JobOpening[] | undefined;

  @OneToMany(type => ProfileOrganizationRole, profileOrganizationRole => profileOrganizationRole.organizationRole)
  profileOrganizationRole: ProfileOrganizationRole[] | undefined;
}
