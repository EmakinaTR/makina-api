import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { Profile } from './Profile'
import { JobOpening } from './JobOpening'
import { JobCandidateReviewer } from './JobCandidateReviewer'
import { JobCandidateAssessment } from './JobCandidateAssessment'
import { JobCandidateComment } from './JobCandidateComment'

/**
 * Entity class mapping rows in 'place' table.
 * @class
 */
@Entity()
export class JobCandidate extends BaseEntry {
  @Column({ type: 'int' })
  state: 'missing_information' | 'pending_review' | 'pending_assessment' | 'pending_approval' | 'approved' | 'declined' | 'completed' | 'canceled' = 'missing_information'

  @ManyToOne(type => JobOpening, jobOpening => jobOpening.jobCandidate)
  jobOpening: JobOpening | undefined

  @ManyToOne(type => Profile, profile => profile.jobCandidate)
  profile: Profile | undefined

  @OneToMany(type => JobCandidateReviewer, jobCandidateReviewer => jobCandidateReviewer.jobCandidate)
  JobCandidateReviewer: JobCandidateReviewer[] | undefined;

  @OneToMany(type => JobCandidateAssessment, jobCandidateAssessment => jobCandidateAssessment.jobCandidate)
  jobCandidateAssessment: JobCandidateAssessment[] | undefined;

  @OneToMany(type => JobCandidateComment, jobCandidateComment => jobCandidateComment.jobCandidate)
  jobCandidateComment: JobCandidateComment[] | undefined;
}
