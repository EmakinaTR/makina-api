// tslint:disable-next-line:quotemark
import { Entity, Column } from 'typeorm'
import { BaseEntry } from './BaseEntry'

@Entity()
export class Group extends BaseEntry {
  @Column({ type: 'varchar', length: 200 })
  title: string | undefined
}
