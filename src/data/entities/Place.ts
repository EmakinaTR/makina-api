import { Entity, Column } from 'typeorm'
import { BaseEntry } from './BaseEntry'

@Entity()
export class Place extends BaseEntry {
  @Column({ type: 'varchar' })
  name: string | null = null

  @Column({ type: 'enum' })
  type: 'country' | 'state' | 'region' | 'city' | 'district' = 'city'
}
