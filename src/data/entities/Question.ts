import { Entity, Column, ManyToMany, JoinTable } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { Group } from './Group'

@Entity()
export class Question extends BaseEntry {
  @Column({ type: 'varchar', length: 200 })
  title: string | null = null

  @Column({ type: 'text' })
  content: string | null = null

  @Column({ type: 'json' })
  data: string | null = null

  @Column({ type: 'tinyint' })
  required: string | null = null

  @Column({ type: 'int' })
  type: 'text' | 'select' | 'code' = 'text'

  @ManyToMany(type => Group)
  @JoinTable()
  group: Group[] | undefined
}
