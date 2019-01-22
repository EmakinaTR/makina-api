import {MigrationInterface, QueryRunner} from "typeorm";

export class initial31548157547829 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `group` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `title` varchar(200) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `question` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `title` varchar(200) NOT NULL, `content` text NOT NULL, `data` json NOT NULL, `required` tinyint NOT NULL, `type` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `job_assessment_section` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `title` varchar(200) NOT NULL, `content` text NOT NULL, `jobAssessmentId` bigint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `job_candidate_reviewer` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `jobCandidateId` bigint NULL, `profileId` bigint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `job_candidate_assessment` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `expiresAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `token` varchar(200) NOT NULL, `content` json NOT NULL, `jobAssessmentId` bigint NULL, `jobCandidateId` bigint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `job_candidate_comment` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `content` text NOT NULL, `jobCandidateId` bigint NULL, `profileId` bigint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `job_candidate` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `state` int NOT NULL, `jobOpeningId` bigint NULL, `profileId` bigint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `profile_organization_role` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `joinedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `leftAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `parentProfileOrganizationRoleId` bigint NULL, `organizationRoleId` bigint NULL, `profileId` bigint NULL, UNIQUE INDEX `REL_9ff8ff5d33b6d153899eade563` (`parentProfileOrganizationRoleId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `profile` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `email` varchar(200) NOT NULL, `firstName` varchar(200) NOT NULL, `lastName` varchar(200) NOT NULL, `birthDate` varchar(255) NOT NULL, `address` varchar(1000) NOT NULL, `phone` varchar(200) NOT NULL, `placeId` bigint NULL, `birthPlaceId` bigint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `place` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(200) NOT NULL, `type` int NOT NULL, `parentPlaceId` bigint NULL, UNIQUE INDEX `REL_213607cd0bcd0232c33a3defe2` (`parentPlaceId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `organization` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(200) NOT NULL, `type` int NOT NULL, `address` varchar(1000) NOT NULL, `phone` varchar(200) NOT NULL, `parentOrganizationId` bigint NULL, `placeId` bigint NULL, UNIQUE INDEX `REL_afbf6a8f88904c057bd1ec528e` (`parentOrganizationId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `organization_role` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `name` varchar(200) NOT NULL, `organizationId` bigint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `job_opening` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `type` int NOT NULL, `experience` int NOT NULL, `expiresAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `title` varchar(200) NOT NULL, `content` text NOT NULL, `jobAssessmentId` bigint NULL, `organizationRoleId` bigint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `job_assessment` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `title` varchar(200) NOT NULL, `content` text NOT NULL, `state` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `question_group_group` (`questionId` bigint NOT NULL, `groupId` bigint NOT NULL, PRIMARY KEY (`questionId`, `groupId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `job_assessment_section_question_question` (`jobAssessmentSectionId` bigint NOT NULL, `questionId` bigint NOT NULL, PRIMARY KEY (`jobAssessmentSectionId`, `questionId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `job_assessment_section` ADD CONSTRAINT `FK_78104a249b69ca5e607ed3a87c0` FOREIGN KEY (`jobAssessmentId`) REFERENCES `job_assessment`(`id`)");
        await queryRunner.query("ALTER TABLE `job_candidate_reviewer` ADD CONSTRAINT `FK_0e9bf166396c48f95cc071e317f` FOREIGN KEY (`jobCandidateId`) REFERENCES `job_candidate`(`id`)");
        await queryRunner.query("ALTER TABLE `job_candidate_reviewer` ADD CONSTRAINT `FK_5a152a777f4123c3848e995e993` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`)");
        await queryRunner.query("ALTER TABLE `job_candidate_assessment` ADD CONSTRAINT `FK_9a58a7f724158c9a412ad212f05` FOREIGN KEY (`jobAssessmentId`) REFERENCES `job_assessment`(`id`)");
        await queryRunner.query("ALTER TABLE `job_candidate_assessment` ADD CONSTRAINT `FK_b422cf4d3f04fabb3b155f16f3f` FOREIGN KEY (`jobCandidateId`) REFERENCES `job_candidate`(`id`)");
        await queryRunner.query("ALTER TABLE `job_candidate_comment` ADD CONSTRAINT `FK_bbc0ce8765de660cca94746ebdf` FOREIGN KEY (`jobCandidateId`) REFERENCES `job_candidate`(`id`)");
        await queryRunner.query("ALTER TABLE `job_candidate_comment` ADD CONSTRAINT `FK_6026276dbff7e9c005cc7b59494` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`)");
        await queryRunner.query("ALTER TABLE `job_candidate` ADD CONSTRAINT `FK_424fe16a664f9dfcc25147fb754` FOREIGN KEY (`jobOpeningId`) REFERENCES `job_opening`(`id`)");
        await queryRunner.query("ALTER TABLE `job_candidate` ADD CONSTRAINT `FK_81adb164a50c9f8499c3873b64c` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`)");
        await queryRunner.query("ALTER TABLE `profile_organization_role` ADD CONSTRAINT `FK_9ff8ff5d33b6d153899eade5639` FOREIGN KEY (`parentProfileOrganizationRoleId`) REFERENCES `profile_organization_role`(`id`)");
        await queryRunner.query("ALTER TABLE `profile_organization_role` ADD CONSTRAINT `FK_47c771a9d8a54f0a0ae6441e9d4` FOREIGN KEY (`organizationRoleId`) REFERENCES `organization_role`(`id`)");
        await queryRunner.query("ALTER TABLE `profile_organization_role` ADD CONSTRAINT `FK_db91fc5e96720aebb3e4d773c80` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`)");
        await queryRunner.query("ALTER TABLE `profile` ADD CONSTRAINT `FK_3ac669b74bc2aef23424e0b58bd` FOREIGN KEY (`placeId`) REFERENCES `place`(`id`)");
        await queryRunner.query("ALTER TABLE `profile` ADD CONSTRAINT `FK_67505d5407c89d0013b1bef3840` FOREIGN KEY (`birthPlaceId`) REFERENCES `place`(`id`)");
        await queryRunner.query("ALTER TABLE `place` ADD CONSTRAINT `FK_213607cd0bcd0232c33a3defe20` FOREIGN KEY (`parentPlaceId`) REFERENCES `place`(`id`)");
        await queryRunner.query("ALTER TABLE `organization` ADD CONSTRAINT `FK_afbf6a8f88904c057bd1ec528e6` FOREIGN KEY (`parentOrganizationId`) REFERENCES `organization`(`id`)");
        await queryRunner.query("ALTER TABLE `organization` ADD CONSTRAINT `FK_ec879e18f5d768c1ef37ec491bb` FOREIGN KEY (`placeId`) REFERENCES `place`(`id`)");
        await queryRunner.query("ALTER TABLE `organization_role` ADD CONSTRAINT `FK_d0089c004f5545d75bf696286aa` FOREIGN KEY (`organizationId`) REFERENCES `organization`(`id`)");
        await queryRunner.query("ALTER TABLE `job_opening` ADD CONSTRAINT `FK_36d83696223d362acdbcea3c444` FOREIGN KEY (`jobAssessmentId`) REFERENCES `job_assessment`(`id`)");
        await queryRunner.query("ALTER TABLE `job_opening` ADD CONSTRAINT `FK_879c9a75627ba22d822bd1e0ccd` FOREIGN KEY (`organizationRoleId`) REFERENCES `organization_role`(`id`)");
        await queryRunner.query("ALTER TABLE `question_group_group` ADD CONSTRAINT `FK_7ccd62381a99d9c04afbfb6343e` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `question_group_group` ADD CONSTRAINT `FK_ac5b16aac5c1181786ff926af27` FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `job_assessment_section_question_question` ADD CONSTRAINT `FK_53d817f8da0248073eb53bcc7da` FOREIGN KEY (`jobAssessmentSectionId`) REFERENCES `job_assessment_section`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `job_assessment_section_question_question` ADD CONSTRAINT `FK_29ab864bd272e58a7a5ff98c119` FOREIGN KEY (`questionId`) REFERENCES `question`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `job_assessment_section_question_question` DROP FOREIGN KEY `FK_29ab864bd272e58a7a5ff98c119`");
        await queryRunner.query("ALTER TABLE `job_assessment_section_question_question` DROP FOREIGN KEY `FK_53d817f8da0248073eb53bcc7da`");
        await queryRunner.query("ALTER TABLE `question_group_group` DROP FOREIGN KEY `FK_ac5b16aac5c1181786ff926af27`");
        await queryRunner.query("ALTER TABLE `question_group_group` DROP FOREIGN KEY `FK_7ccd62381a99d9c04afbfb6343e`");
        await queryRunner.query("ALTER TABLE `job_opening` DROP FOREIGN KEY `FK_879c9a75627ba22d822bd1e0ccd`");
        await queryRunner.query("ALTER TABLE `job_opening` DROP FOREIGN KEY `FK_36d83696223d362acdbcea3c444`");
        await queryRunner.query("ALTER TABLE `organization_role` DROP FOREIGN KEY `FK_d0089c004f5545d75bf696286aa`");
        await queryRunner.query("ALTER TABLE `organization` DROP FOREIGN KEY `FK_ec879e18f5d768c1ef37ec491bb`");
        await queryRunner.query("ALTER TABLE `organization` DROP FOREIGN KEY `FK_afbf6a8f88904c057bd1ec528e6`");
        await queryRunner.query("ALTER TABLE `place` DROP FOREIGN KEY `FK_213607cd0bcd0232c33a3defe20`");
        await queryRunner.query("ALTER TABLE `profile` DROP FOREIGN KEY `FK_67505d5407c89d0013b1bef3840`");
        await queryRunner.query("ALTER TABLE `profile` DROP FOREIGN KEY `FK_3ac669b74bc2aef23424e0b58bd`");
        await queryRunner.query("ALTER TABLE `profile_organization_role` DROP FOREIGN KEY `FK_db91fc5e96720aebb3e4d773c80`");
        await queryRunner.query("ALTER TABLE `profile_organization_role` DROP FOREIGN KEY `FK_47c771a9d8a54f0a0ae6441e9d4`");
        await queryRunner.query("ALTER TABLE `profile_organization_role` DROP FOREIGN KEY `FK_9ff8ff5d33b6d153899eade5639`");
        await queryRunner.query("ALTER TABLE `job_candidate` DROP FOREIGN KEY `FK_81adb164a50c9f8499c3873b64c`");
        await queryRunner.query("ALTER TABLE `job_candidate` DROP FOREIGN KEY `FK_424fe16a664f9dfcc25147fb754`");
        await queryRunner.query("ALTER TABLE `job_candidate_comment` DROP FOREIGN KEY `FK_6026276dbff7e9c005cc7b59494`");
        await queryRunner.query("ALTER TABLE `job_candidate_comment` DROP FOREIGN KEY `FK_bbc0ce8765de660cca94746ebdf`");
        await queryRunner.query("ALTER TABLE `job_candidate_assessment` DROP FOREIGN KEY `FK_b422cf4d3f04fabb3b155f16f3f`");
        await queryRunner.query("ALTER TABLE `job_candidate_assessment` DROP FOREIGN KEY `FK_9a58a7f724158c9a412ad212f05`");
        await queryRunner.query("ALTER TABLE `job_candidate_reviewer` DROP FOREIGN KEY `FK_5a152a777f4123c3848e995e993`");
        await queryRunner.query("ALTER TABLE `job_candidate_reviewer` DROP FOREIGN KEY `FK_0e9bf166396c48f95cc071e317f`");
        await queryRunner.query("ALTER TABLE `job_assessment_section` DROP FOREIGN KEY `FK_78104a249b69ca5e607ed3a87c0`");
        await queryRunner.query("DROP TABLE `job_assessment_section_question_question`");
        await queryRunner.query("DROP TABLE `question_group_group`");
        await queryRunner.query("DROP TABLE `job_assessment`");
        await queryRunner.query("DROP TABLE `job_opening`");
        await queryRunner.query("DROP TABLE `organization_role`");
        await queryRunner.query("DROP INDEX `REL_afbf6a8f88904c057bd1ec528e` ON `organization`");
        await queryRunner.query("DROP TABLE `organization`");
        await queryRunner.query("DROP INDEX `REL_213607cd0bcd0232c33a3defe2` ON `place`");
        await queryRunner.query("DROP TABLE `place`");
        await queryRunner.query("DROP TABLE `profile`");
        await queryRunner.query("DROP INDEX `REL_9ff8ff5d33b6d153899eade563` ON `profile_organization_role`");
        await queryRunner.query("DROP TABLE `profile_organization_role`");
        await queryRunner.query("DROP TABLE `job_candidate`");
        await queryRunner.query("DROP TABLE `job_candidate_comment`");
        await queryRunner.query("DROP TABLE `job_candidate_assessment`");
        await queryRunner.query("DROP TABLE `job_candidate_reviewer`");
        await queryRunner.query("DROP TABLE `job_assessment_section`");
        await queryRunner.query("DROP TABLE `question`");
        await queryRunner.query("DROP TABLE `group`");
    }

}
