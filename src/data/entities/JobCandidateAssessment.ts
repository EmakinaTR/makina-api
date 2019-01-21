import { Entity, Column, ManyToOne, CreateDateColumn } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { JobCandidate } from './JobCandidate'
import { JobAssessment } from './JobAssessment'

@Entity()
export class JobCandidateAssessment extends BaseEntry {
  @CreateDateColumn()
  expiresAt: Date | undefined

  @Column({ type: 'varchar', length: 200 })
  token: string | undefined

  @Column({ type: 'json' })
  content: string | undefined

  @ManyToOne(type => JobAssessment, jobAssessment => jobAssessment.jobCandidateAssessment)
  jobAssessment: JobAssessment | undefined

  @ManyToOne(type => JobCandidate, jobCandidate => jobCandidate.jobCandidateAssessment)
  jobCandidate: JobCandidate | undefined
}
