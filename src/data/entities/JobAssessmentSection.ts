// tslint:disable-next-line:quotemark
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { JobAssessment } from './JobAssessment'
import { JobAssessmentQuestion } from './JobAssessmentQuestion'

@Entity()
export class JobAssessmentSection extends BaseEntry {
  @Column({ type: 'varchar', length: 200 })
  title: string | undefined

  @Column({ type: 'text' })
  content: string | undefined

  @ManyToOne(type => JobAssessment, jobAssessment => jobAssessment.jobAssessmentSection)
  jobAssessment: JobAssessment | undefined

  @OneToMany(type => JobAssessmentQuestion, jobAssessmentQuestion => jobAssessmentQuestion.jobAssessmentSection)
  jobAssessmentQuestion: JobAssessmentQuestion[] | undefined
}
