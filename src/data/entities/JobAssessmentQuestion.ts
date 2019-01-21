import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { JobAssessmentSection } from './JobAssessmentSection'

@Entity()
export class JobAssessmentQuestion extends BaseEntry {
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

  @ManyToOne(type => JobAssessmentSection, jobAssessmentSection => jobAssessmentSection.jobAssessmentQuestion)
  jobAssessmentSection: JobAssessmentSection | undefined
}
