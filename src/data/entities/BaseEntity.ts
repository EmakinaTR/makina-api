import { PrimaryGeneratedColumn } from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number = 0
}
