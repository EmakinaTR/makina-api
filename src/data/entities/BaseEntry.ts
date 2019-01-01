import { CreateDateColumn } from 'typeorm'
import { BaseEntity } from './BaseEntity'

export abstract class BaseEntry extends BaseEntity {
  @CreateDateColumn({ readonly: true })
  createdAt: Date | null = null

  @CreateDateColumn({ readonly: true })
  updatedAt: Date | null = null
}
