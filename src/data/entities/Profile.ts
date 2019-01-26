import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { Place } from './Place'

/**
 * Entity class mapping rows in 'profile' table
 * @class
 */
@Entity()
export class Profile extends BaseEntry {
  @Column({ type: 'varchar' })
  email: string | null = null

  @Column({ type: 'varchar' })
  firstName: string | null = null

  @Column({ type: 'varchar' })
  lastName: string | null = null

  @Column({ type: 'varchar' })
  birthDate: Date | null = null

  @Column({ type: 'varchar' })
  address: string | null = null

  @Column({ type: 'varchar' })
  phone: string | null = null

  @Column({ type: 'bigint' })
  place_id: number | null = null // eslint-disable-line

  @ManyToOne(type => Place)
  place: Place | null = null
}
