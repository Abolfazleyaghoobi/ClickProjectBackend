import { MigrationInterface, QueryRunner } from "typeorm";

export class CourseStep1795608745601 implements MigrationInterface {
    name = 'CourseStep1795608745601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Link\` (\`id\` int NOT NULL AUTO_INCREMENT, \`link_title\` varchar(60) NOT NULL, \`url\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`stepId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`stepId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Research\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`stepId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`steps\` (\`id\` int NOT NULL AUTO_INCREMENT, \`step_title\` varchar(60) NOT NULL, \`step_description\` text NOT NULL, \`project_description\` varchar(150) NULL, \`rules_description\` varchar(150) NULL, \`is_published\` enum ('yes', 'no') NOT NULL DEFAULT 'no', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`courseId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`conference\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`stepId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`support_conversations\` CHANGE \`last_message_id\` \`last_message_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`support_conversations\` CHANGE \`last_message_at\` \`last_message_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`support_conversations\` CHANGE \`user_last_read_at\` \`user_last_read_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`support_conversations\` CHANGE \`support_last_read_at\` \`support_last_read_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`admins\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`display_name\` \`display_name\` varchar(60) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`bio\` \`bio\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`github_url\` \`github_url\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`portolio_url\` \`portolio_url\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`avatar_url\` \`avatar_url\` varchar(150) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`banner_url\` \`banner_url\` varchar(150) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`label\` \`label\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`last_used_at\` \`last_used_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`revoked_at\` \`revoked_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`expires_at\` \`expires_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`certificate_types\` CHANGE \`color\` \`color\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_certificates\` CHANGE \`source_ref_id\` \`source_ref_id\` bigint UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`project_url\` \`project_url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`phone_verification_codes\` CHANGE \`consumed_at\` \`consumed_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_verified_at\` \`phone_verified_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_active_at\` \`last_active_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`paths\` CHANGE \`image_ulr\` \`image_ulr\` varchar(150) NULL`);
        await queryRunner.query(`ALTER TABLE \`paths\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`Path_List\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`PathList_course\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`courses\` CHANGE \`image_ulr\` \`image_ulr\` varchar(150) NULL`);
        await queryRunner.query(`ALTER TABLE \`courses\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`Link\` ADD CONSTRAINT \`FK_db50956218daec781de3af534b0\` FOREIGN KEY (\`stepId\`) REFERENCES \`steps\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Image\` ADD CONSTRAINT \`FK_41835c051a710d4d1a3a4f91a6a\` FOREIGN KEY (\`stepId\`) REFERENCES \`steps\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Research\` ADD CONSTRAINT \`FK_f11909f94fad8e3bef619da7b9d\` FOREIGN KEY (\`stepId\`) REFERENCES \`steps\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`steps\` ADD CONSTRAINT \`FK_4d3cc5f211c3ff8b26a47f362fc\` FOREIGN KEY (\`courseId\`) REFERENCES \`courses\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`conference\` ADD CONSTRAINT \`FK_431d91053bf94bd190eb24f1da8\` FOREIGN KEY (\`stepId\`) REFERENCES \`steps\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`conference\` DROP FOREIGN KEY \`FK_431d91053bf94bd190eb24f1da8\``);
        await queryRunner.query(`ALTER TABLE \`steps\` DROP FOREIGN KEY \`FK_4d3cc5f211c3ff8b26a47f362fc\``);
        await queryRunner.query(`ALTER TABLE \`Research\` DROP FOREIGN KEY \`FK_f11909f94fad8e3bef619da7b9d\``);
        await queryRunner.query(`ALTER TABLE \`Image\` DROP FOREIGN KEY \`FK_41835c051a710d4d1a3a4f91a6a\``);
        await queryRunner.query(`ALTER TABLE \`Link\` DROP FOREIGN KEY \`FK_db50956218daec781de3af534b0\``);
        await queryRunner.query(`ALTER TABLE \`courses\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`courses\` CHANGE \`image_ulr\` \`image_ulr\` varchar(150) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`PathList_course\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Path_List\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`paths\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`paths\` CHANGE \`image_ulr\` \`image_ulr\` varchar(150) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_active_at\` \`last_active_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_verified_at\` \`phone_verified_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`phone_verification_codes\` CHANGE \`consumed_at\` \`consumed_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`project_url\` \`project_url\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_certificates\` CHANGE \`source_ref_id\` \`source_ref_id\` bigint UNSIGNED NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`certificate_types\` CHANGE \`color\` \`color\` varchar(50) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`expires_at\` \`expires_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`revoked_at\` \`revoked_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`last_used_at\` \`last_used_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`label\` \`label\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`banner_url\` \`banner_url\` varchar(150) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`avatar_url\` \`avatar_url\` varchar(150) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`portolio_url\` \`portolio_url\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`github_url\` \`github_url\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`bio\` \`bio\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`display_name\` \`display_name\` varchar(60) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`admins\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`support_conversations\` CHANGE \`support_last_read_at\` \`support_last_read_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`support_conversations\` CHANGE \`user_last_read_at\` \`user_last_read_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`support_conversations\` CHANGE \`last_message_at\` \`last_message_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`support_conversations\` CHANGE \`last_message_id\` \`last_message_id\` bigint NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`conference\``);
        await queryRunner.query(`DROP TABLE \`steps\``);
        await queryRunner.query(`DROP TABLE \`Research\``);
        await queryRunner.query(`DROP TABLE \`Image\``);
        await queryRunner.query(`DROP TABLE \`Link\``);
    }

}
