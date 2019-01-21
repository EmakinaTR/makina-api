import { Entity, ManyToOne } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { Profile } from './Profile'
import { JobCandidate } from './JobCandidate'

/**
 * Entity class mapping rows in 'place' table.
 * @class
 */
@Entity()
export class JobCandidateReviewer extends BaseEntry {
  @ManyToOne(type => JobCandidate, jobCandidate => jobCandidate.JobCandidateReviewer)
  jobCandidate: JobCandidate | undefined

  @ManyToOne(type => Profile, profile => profile.jobCandidateReviewer)
  profile: Profile | undefined
}
