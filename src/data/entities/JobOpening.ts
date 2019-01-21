import { Entity, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm'
import { BaseEntry } from './BaseEntry'
import { OrganizationRole } from './OrganizationRole'
import { JobAssessment } from './JobAssessment'
import { JobCandidate } from './JobCandidate'

/**
 * Entity class mapping rows in 'place' table.
 * @class
 */
@Entity()
export class JobOpening extends BaseEntry {
  @Column({ type: 'int' })
  type: 'full_time' | 'part_time' | 'temporary' | 'contract' | 'internship' | 'commission' | 'other' = 'temporary'

  @Column({ type: 'int' })
  experience: 'junior_level' | 'mid_level' | 'senior_level' | 'other' = 'other'

  @CreateDateColumn()
  expiresAt: Date | undefined

  @Column({ type: 'varchar', length: 200 })
  title: string | undefined

  @Column({ type: 'text' })
  content: string | undefined

  @ManyToOne(type => JobAssessment, jobAssessment => jobAssessment.jobOpening)
  jobAssessment: JobAssessment | undefined

  @ManyToOne(type => OrganizationRole, organizationRole => organizationRole.jobOpening)
  organizationRole: OrganizationRole | undefined

  @OneToMany(type => JobCandidate, jobCandidate => jobCandidate.jobOpening)
  jobCandidate: JobOpening[] | undefined;
}
