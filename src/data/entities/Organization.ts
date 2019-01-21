import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { Place } from './Place'
import { OrganizationRole } from './OrganizationRole'

/**
 * Entity class mapping rows in 'organization' table.
 * @class
 */
@Entity()
export class Organization extends BaseEntry {
  @Column({ type: 'varchar', length: 200 })
  name: string | null = null

  @Column({ type: 'int' })
  type: 'business' | 'government' | 'other' = 'other'

  @Column({ type: 'varchar', length: 1000 })
  address: string | null = null

  @Column({ type: 'varchar', length: 200 })
  phone: string | null = null

  @ManyToOne(type => Place, place => place.organization)
  place: Place | undefined

  @OneToMany(type => OrganizationRole, organizationRole => organizationRole.organization)
  organizationRole: OrganizationRole[] | undefined;
}
