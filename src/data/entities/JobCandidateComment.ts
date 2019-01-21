import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { JobCandidate } from './JobCandidate'
import { Profile } from './Profile'

@Entity()
export class JobCandidateComment extends BaseEntry {
  @Column({ type: 'text' })
  content: string | null = null

  @ManyToOne(type => JobCandidate, jobCandidate => jobCandidate.jobCandidateComment)
  jobCandidate: JobCandidate | undefined

  @ManyToOne(type => Profile, profile => profile.jobCandidateComment)
  profile: Profile | undefined
}
