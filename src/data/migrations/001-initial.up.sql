create table `place` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `parent_place_id` bigint,
  `name` varchar(200),
  `type` enum('country', 'state', 'region', 'city', 'district') not null default 'city',

  constraint `pk_place` primary key (`id`),
  constraint `fk_place__parent_place_id` foreign key (`parent_place_id`) references `place` (`id`)
);

create table `organization` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `parent_organization_id` bigint,
  `name` varchar(200),
  `type` enum('business', 'government', 'other') not null default 'other',
  `place_id` bigint,
  `address` varchar(1000),
  `phone` varchar(200),

  constraint `pk_organization` primary key (`id`),
  constraint `fk_organization__parent_organization_id` foreign key (`parent_organization_id`) references `organization` (`id`),
  constraint `fk_organization__place_id` foreign key (`place_id`) references `place` (`id`)
);

create table `organization_role` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `parent_organization_role_id` bigint,
  `organization_id` bigint,
  `name` varchar(200),

  constraint `pk_organization_role` primary key (`id`),
  constraint `fk_organization_role__parent_organization_role_id` foreign key (`parent_organization_role_id`) references `organization_role` (`id`),
  constraint `fk_organization_role__organization_id` foreign key (`organization_id`) references `organization` (`id`)
);

create table `profile` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `email` varchar(200),
  `first_name` varchar(200),
  `last_name` varchar(200),
  `birth_date` datetime,
  `birth_place_id` bigint,
  `place_id` bigint,
  `address` varchar(1000),
  `phone` varchar(200),

  constraint `pk_profile` primary key (`id`),
  constraint `fk_profile__birth_place_id` foreign key (`birth_place_id`) references `place` (`id`),
  constraint `fk_profile__place_id` foreign key (`place_id`) references `place` (`id`),
  constraint `ux_profile__email` unique index (`email`)
);

create table `profile_organization_role` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `profile_id` bigint not null,
  `organization_role_id` bigint not null,
  `joined_at` datetime,
  `left_at` datetime,

  constraint `pk_profile_organization` primary key (`id`),
  constraint `fk_profile_organization__profile_id` foreign key (`profile_id`) references `profile` (`id`),
  constraint `fk_profile_organization__organization_role_id` foreign key (`organization_role_id`) references `organization_role` (`id`)
);

create table `job_assessment` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `title` varchar(200) not null,
  `content` text,

  constraint `pk_job_assessment` primary key (`id`)
);

create table `job_assessment_question` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `type` enum('text', 'select', 'code'),
  `locked` boolean not null default false,
  `title` varchar(200) not null,
  `content` text,
  `data` json,
  `state` enum('draft', 'pending_review', 'approved', 'rejected', 'published') not null default 'draft',

  constraint `pk_job_assessment_question` primary key (`id`)
);

create table `job_assessment_question_review` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `job_assessment_question_id` bigint not null,
  `profile_id` bigint not null,
  `state` enum('pending', 'in_progress', 'approved', 'rejected') not null default 'pending',

  constraint `pk_job_assessment_question_review` primary key (`id`),
  constraint `fk_job_assessment_question_review__job_assessment_question_id` foreign key (`job_assessment_question_id`) references `job_assessment_question` (`id`),
  constraint `fk_job_assessment_question_review__profile_id` foreign key (`profile_id`) references `profile` (`id`)
);

create table `job_assessment_question_comment` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `job_assessment_question_id` bigint not null,
  `profile_id` bigint not null,
  `content` text not null,

  constraint `pk_job_assessment_question_comment` primary key (`id`),
  constraint `fk_job_assessment_question_comment__job_assessment_question_id` foreign key (`job_assessment_question_id`) references `job_assessment_question` (`id`),
  constraint `fk_job_assessment_question_comment__profile_id` foreign key (`profile_id`) references `profile` (`id`)
);

create table `job_assessment_section` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `job_assessment_id` bigint not null,
  `title` varchar(200) not null,
  `content` text,

  constraint `pk_job_assessment_section` primary key (`id`),
  constraint `fk_job_assessment_section__job_assessment_id` foreign key (`job_assessment_id`) references `job_assessment` (`id`)
);

create table `job_assessment_section_question` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `job_assessment_section_id` bigint not null,
  `job_assessment_question_id` bigint not null,

  constraint `pk_job_assessment_section_question` primary key (`id`),
  constraint `fk_job_assessment_section_question__job_assessment_section_id` foreign key (`job_assessment_section_id`) references `job_assessment_section` (`id`),
  constraint `fk_job_assessment_section_question__job_assessment_question_id` foreign key (`job_assessment_question_id`) references `job_assessment_question` (`id`)
);

create table `job_opening` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `organization_role_id` bigint not null,
  `type` enum('full_time', 'part_time', 'temporary', 'contract', 'internship', 'commission', 'other') not null default 'other',
  `experience` enum('junior_level', 'mid_level', 'senior_level', 'other') not null default 'other',
  `expires_at` datetime,
  `title` varchar(200) not null,
  `content` text,
  `job_assessment_id` bigint,
  `state` enum('draft', 'pending_review', 'approved', 'rejected', 'published') not null default 'draft',

  constraint `pk_job_opening` primary key (`id`),
  constraint `fk_job_opening__organization_role_id` foreign key (`organization_role_id`) references `organization_role` (`id`),
  constraint `fk_job_opening__job_assessment_id` foreign key (`job_assessment_id`) references `job_assessment` (`id`)
);

create table `job_opening_assessment` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `job_opening_id` bigint not null,
  `job_assessment_id` bigint not null,

  constraint `pk_job_opening` primary key (`id`),
  constraint `fk_job_opening_assessment__job_opening_id` foreign key (`job_opening_id`) references `job_opening` (`id`),
  constraint `fk_job_opening_assessment__job_assessment_id` foreign key (`job_assessment_id`) references `job_assessment` (`id`)
);

create table `job_opening_review` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `job_opening_id` bigint not null,
  `profile_id` bigint not null,
  `state` enum('pending', 'in_progress', 'approved', 'rejected') not null default 'pending',

  constraint `pk_job_opening_review` primary key (`id`),
  constraint `fk_job_opening_review__job_opening_id` foreign key (`job_opening_id`) references `job_opening` (`id`),
  constraint `fk_job_opening_review__profile_id` foreign key (`profile_id`) references `profile` (`id`)
);

create table `job_opening_comment` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `job_opening_id` bigint not null,
  `profile_id` bigint not null,
  `content` text not null,

  constraint `pk_job_opening_comment` primary key (`id`),
  constraint `fk_job_opening_comment__job_opening_id` foreign key (`job_opening_id`) references `job_opening` (`id`),
  constraint `fk_job_opening_comment__profile_id` foreign key (`profile_id`) references `profile` (`id`)
);

create table `job_candidate` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `job_opening_id` bigint not null,
  `profile_id` bigint not null,
  `state` enum('missing_information', 'pending_review', 'pending_assessment', 'pending_approval', 'approved', 'declined', 'completed', 'canceled') not null default 'pending_review',

  constraint `pk_job_candidate` primary key (`id`),
  constraint `fk_job_candidate__job_opening_id` foreign key (`job_opening_id`) references `job_opening` (`id`),
  constraint `fk_job_candidate__profile_id` foreign key (`profile_id`) references `profile` (`id`)
);

create table `job_candidate_assessment` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `expires_at` datetime,
  `job_candidate_id` bigint not null,
  `job_assessment_id` bigint not null,
  `token` varchar(200),
  `data` json,

  constraint `pk_job_candidate_assessment` primary key (`id`),
  constraint `fk_job_candidate_assessment__job_candidate_id` foreign key (`job_candidate_id`) references `job_candidate` (`id`),
  constraint `fk_job_candidate_assessment__job_assessment_id` foreign key (`job_assessment_id`) references `job_assessment` (`id`),
  constraint `ux_job_candidate_assessment__token` unique index (`token`)
);

create table `job_candidate_review` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `job_candidate_id` bigint not null,
  `profile_id` bigint not null,
  `state` enum('pending', 'in_progress', 'approved', 'rejected') not null default 'pending',

  constraint `pk_job_candidate_review` primary key (`id`),
  constraint `fk_job_candidate_review__job_candidate_id` foreign key (`job_candidate_id`) references `job_candidate` (`id`),
  constraint `fk_job_candidate_review__profile_id` foreign key (`profile_id`) references `profile` (`id`)
);

create table `job_candidate_comment` (
  `id` bigint not null auto_increment,
  `created_at` datetime not null default current_timestamp,
  `updated_at` datetime not null default current_timestamp on update current_timestamp,
  `job_candidate_id` bigint not null,
  `profile_id` bigint not null,
  `content` text not null,

  constraint `pk_job_candidate_comment` primary key (`id`),
  constraint `fk_job_candidate_comment__job_candidate_id` foreign key (`job_candidate_id`) references `job_candidate` (`id`),
  constraint `fk_job_candidate_comment__profile_id` foreign key (`profile_id`) references `profile` (`id`)
);
