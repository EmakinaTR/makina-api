import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { Place } from './Place'
import { JobCandidate } from './JobCandidate'
import { JobCandidateReviewer } from './JobCandidateReviewer'
import { JobCandidateComment } from './JobCandidateComment'
import { ProfileOrganizationRole } from './ProfileOrganizationRole'

/**
 * Entity class mapping rows in 'profile' table
 * @class
 */
@Entity()
export class Profile extends BaseEntry {
  @Column({ type: 'varchar', length: 200 })
  email: string | null = null

  @Column({ type: 'varchar', length: 200 })
  firstName: string | null = null

  @Column({ type: 'varchar', length: 200 })
  lastName: string | null = null

  @Column({ type: 'varchar' })
  birthDate: Date | null = null

  @Column({ type: 'varchar', length: 1000 })
  address: string | null = null

  @Column({ type: 'varchar', length: 200 })
  phone: string | null = null

  @ManyToOne(type => Place, place => place.profile)
  place: Place | undefined;

  @ManyToOne(type => Place, birthPlace => birthPlace.profile)
  birthPlace: Place | undefined;

  @OneToMany(type => JobCandidate, jobCandidate => jobCandidate.profile)
  jobCandidate: JobCandidate[] | undefined;

  @OneToMany(type => JobCandidateReviewer, jobCandidateReviewer => jobCandidateReviewer.profile)
  jobCandidateReviewer: JobCandidateReviewer[] | undefined;

  @OneToMany(type => JobCandidateComment, jobCandidateComment => jobCandidateComment.profile)
  jobCandidateComment: JobCandidateComment[] | undefined;

  @OneToMany(type => ProfileOrganizationRole, profileOrganizationRole => profileOrganizationRole.profile)
  profileOrganizationRole: ProfileOrganizationRole[] | undefined;
}
