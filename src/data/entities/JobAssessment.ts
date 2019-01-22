import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { JobAssessmentSection } from './JobAssessmentSection'
import { JobOpening } from './JobOpening'
import { JobCandidateAssessment } from './JobCandidateAssessment'

/**
 * Entity class mapping rows in 'place' table.
 * @class
 */
@Entity()
export class JobAssessment extends BaseEntry {
  @Column({ type: 'varchar', length: 200 })
  title: string | undefined

  @Column({ type: 'text' })
  content: string | undefined

  @Column({ type: 'int' })
  state: 'draft' | 'published' = 'draft'

  @OneToMany(type => JobAssessmentSection, jobAssessmentSection => jobAssessmentSection.jobAssessment)
  jobAssessmentSection: JobAssessmentSection[] | undefined

  @OneToMany(type => JobOpening, jobOpening => jobOpening.jobAssessment)
  jobOpening: JobOpening[] | undefined

  @OneToMany(type => JobCandidateAssessment, jobCandidateAssessment => jobCandidateAssessment.jobAssessment)
  jobCandidateAssessment: JobCandidateAssessment[] | undefined
}
