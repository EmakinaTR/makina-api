// tslint:disable-next-line:quotemark
import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { Question } from './Question'
import { JobAssessment } from './JobAssessment'

@Entity()
export class JobAssessmentSection extends BaseEntry {
  @Column({ type: 'varchar', length: 200 })
  title: string | undefined

  @Column({ type: 'text' })
  content: string | undefined

  @ManyToOne(type => JobAssessment, jobAssessment => jobAssessment.jobAssessmentSection)
  jobAssessment: JobAssessment | undefined

  @ManyToMany(type => Question)
  @JoinTable()
  question: Question[] | undefined
}
