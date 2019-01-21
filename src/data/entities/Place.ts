import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { Profile } from './Profile'
import { Organization } from './Organization'

/**
 * Entity class mapping rows in 'place' table.
 * @class
 */
@Entity()
export class Place extends BaseEntry {
  @Column({ type: 'varchar', length: 200 })
  name: string | null = null

  @Column({ type: 'int' })
  type: 'country' | 'state' | 'region' | 'city' | 'district' = 'city'

  @OneToMany(type => Profile, profile => profile.place)
  profile: Profile[] | undefined;

  @OneToMany(type => Organization, organization => organization.place)
  organization: Organization[] | undefined;
}
