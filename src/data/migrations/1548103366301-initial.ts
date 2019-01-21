import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1548103366301 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `job_assessment_question` (`id` bigint NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `title` varchar(200) NOT NULL, `content` text NOT NULL, `data` json NOT NULL, `required` tinyint NOT NULL, `type` int NOT NULL, `jobAssessmentSectionId` bigint NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `job_candidate_assessment` DROP COLUMN `content`");
        await queryRunner.query("ALTER TABLE `job_candidate_assessment` ADD `content` json NOT NULL");
        await queryRunner.query("ALTER TABLE `job_assessment_question` ADD CONSTRAINT `FK_a2ee18bc694f01438a581715b5b` FOREIGN KEY (`jobAssessmentSectionId`) REFERENCES `job_assessment_section`(`id`)");
        await queryRunner.query("ALTER TABLE `job_assessment_section` ADD CONSTRAINT `FK_78104a249b69ca5e607ed3a87c0` FOREIGN KEY (`jobAssessmentId`) REFERENCES `job_assessment`(`id`)");
        await queryRunner.query("ALTER TABLE `job_candidate_reviewer` ADD CONSTRAINT `FK_0e9bf166396c48f95cc071e317f` FOREIGN KEY (`jobCandidateId`) REFERENCES `job_candidate`(`id`)");
        await queryRunner.query("ALTER TABLE `job_candidate_reviewer` ADD CONSTRAINT `FK_5a152a777f4123c3848e995e993` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`)");
        await queryRunner.query("ALTER TABLE `job_candidate_assessment` ADD CONSTRAINT `FK_9a58a7f724158c9a412ad212f05` FOREIGN KEY (`jobAssessmentId`) REFERENCES `job_assessment`(`id`)");
        await queryRunner.query("ALTER TABLE `job_candidate_assessment` ADD CONSTRAINT `FK_b422cf4d3f04fabb3b155f16f3f` FOREIGN KEY (`jobCandidateId`) REFERENCES `job_candidate`(`id`)");
        await queryRunner.query("ALTER TABLE `job_candidate_comment` ADD CONSTRAINT `FK_bbc0ce8765de660cca94746ebdf` FOREIGN KEY (`jobCandidateId`) REFERENCES `job_candidate`(`id`)");
        await queryRunner.query("ALTER TABLE `job_candidate_comment` ADD CONSTRAINT `FK_6026276dbff7e9c005cc7b59494` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`)");
        await queryRunner.query("ALTER TABLE `job_candidate` ADD CONSTRAINT `FK_424fe16a664f9dfcc25147fb754` FOREIGN KEY (`jobOpeningId`) REFERENCES `job_opening`(`id`)");
        await queryRunner.query("ALTER TABLE `job_candidate` ADD CONSTRAINT `FK_81adb164a50c9f8499c3873b64c` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`)");
        await queryRunner.query("ALTER TABLE `profile_organization_role` ADD CONSTRAINT `FK_47c771a9d8a54f0a0ae6441e9d4` FOREIGN KEY (`organizationRoleId`) REFERENCES `organization_role`(`id`)");
        await queryRunner.query("ALTER TABLE `profile_organization_role` ADD CONSTRAINT `FK_db91fc5e96720aebb3e4d773c80` FOREIGN KEY (`profileId`) REFERENCES `profile`(`id`)");
        await queryRunner.query("ALTER TABLE `profile` ADD CONSTRAINT `FK_3ac669b74bc2aef23424e0b58bd` FOREIGN KEY (`placeId`) REFERENCES `place`(`id`)");
        await queryRunner.query("ALTER TABLE `profile` ADD CONSTRAINT `FK_67505d5407c89d0013b1bef3840` FOREIGN KEY (`birthPlaceId`) REFERENCES `place`(`id`)");
        await queryRunner.query("ALTER TABLE `organization` ADD CONSTRAINT `FK_ec879e18f5d768c1ef37ec491bb` FOREIGN KEY (`placeId`) REFERENCES `place`(`id`)");
        await queryRunner.query("ALTER TABLE `organization_role` ADD CONSTRAINT `FK_d0089c004f5545d75bf696286aa` FOREIGN KEY (`organizationId`) REFERENCES `organization`(`id`)");
        await queryRunner.query("ALTER TABLE `job_opening` ADD CONSTRAINT `FK_36d83696223d362acdbcea3c444` FOREIGN KEY (`jobAssessmentId`) REFERENCES `job_assessment`(`id`)");
        await queryRunner.query("ALTER TABLE `job_opening` ADD CONSTRAINT `FK_879c9a75627ba22d822bd1e0ccd` FOREIGN KEY (`organizationRoleId`) REFERENCES `organization_role`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `job_opening` DROP FOREIGN KEY `FK_879c9a75627ba22d822bd1e0ccd`");
        await queryRunner.query("ALTER TABLE `job_opening` DROP FOREIGN KEY `FK_36d83696223d362acdbcea3c444`");
        await queryRunner.query("ALTER TABLE `organization_role` DROP FOREIGN KEY `FK_d0089c004f5545d75bf696286aa`");
        await queryRunner.query("ALTER TABLE `organization` DROP FOREIGN KEY `FK_ec879e18f5d768c1ef37ec491bb`");
        await queryRunner.query("ALTER TABLE `profile` DROP FOREIGN KEY `FK_67505d5407c89d0013b1bef3840`");
        await queryRunner.query("ALTER TABLE `profile` DROP FOREIGN KEY `FK_3ac669b74bc2aef23424e0b58bd`");
        await queryRunner.query("ALTER TABLE `profile_organization_role` DROP FOREIGN KEY `FK_db91fc5e96720aebb3e4d773c80`");
        await queryRunner.query("ALTER TABLE `profile_organization_role` DROP FOREIGN KEY `FK_47c771a9d8a54f0a0ae6441e9d4`");
        await queryRunner.query("ALTER TABLE `job_candidate` DROP FOREIGN KEY `FK_81adb164a50c9f8499c3873b64c`");
        await queryRunner.query("ALTER TABLE `job_candidate` DROP FOREIGN KEY `FK_424fe16a664f9dfcc25147fb754`");
        await queryRunner.query("ALTER TABLE `job_candidate_comment` DROP FOREIGN KEY `FK_6026276dbff7e9c005cc7b59494`");
        await queryRunner.query("ALTER TABLE `job_candidate_comment` DROP FOREIGN KEY `FK_bbc0ce8765de660cca94746ebdf`");
        await queryRunner.query("ALTER TABLE `job_candidate_assessment` DROP FOREIGN KEY `FK_b422cf4d3f04fabb3b155f16f3f`");
        await queryRunner.query("ALTER TABLE `job_candidate_assessment` DROP FOREIGN KEY `FK_9a58a7f724158c9a412ad212f05`");
        await queryRunner.query("ALTER TABLE `job_candidate_reviewer` DROP FOREIGN KEY `FK_5a152a777f4123c3848e995e993`");
        await queryRunner.query("ALTER TABLE `job_candidate_reviewer` DROP FOREIGN KEY `FK_0e9bf166396c48f95cc071e317f`");
        await queryRunner.query("ALTER TABLE `job_assessment_section` DROP FOREIGN KEY `FK_78104a249b69ca5e607ed3a87c0`");
        await queryRunner.query("ALTER TABLE `job_assessment_question` DROP FOREIGN KEY `FK_a2ee18bc694f01438a581715b5b`");
        await queryRunner.query("ALTER TABLE `job_candidate_assessment` DROP COLUMN `content`");
        await queryRunner.query("ALTER TABLE `job_candidate_assessment` ADD `content` text NOT NULL");
        await queryRunner.query("DROP TABLE `job_assessment_question`");
    }

}
