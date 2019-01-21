import { Entity, ManyToOne, CreateDateColumn } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { Profile } from './Profile'
import { OrganizationRole } from './OrganizationRole'

/**
 * Entity class mapping rows in 'place' table.
 * @class
 */
@Entity()
export class ProfileOrganizationRole extends BaseEntry {
  @CreateDateColumn()
  joinedAt: Date | undefined

  @CreateDateColumn()
  leftAt: Date | undefined

  @ManyToOne(type => OrganizationRole, organizationRole => organizationRole.profileOrganizationRole)
  organizationRole: OrganizationRole | undefined

  @ManyToOne(type => Profile, profile => profile.profileOrganizationRole)
  profile: Profile | undefined
}
