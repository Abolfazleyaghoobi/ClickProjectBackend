import { MigrationInterface, QueryRunner } from "typeorm";

export class UP1795536505968 implements MigrationInterface {
    name = 'UP1795536505968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`support_conversations\` CHANGE \`last_message_id\` \`last_message_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`support_conversations\` CHANGE \`last_message_at\` \`last_message_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`support_conversations\` CHANGE \`user_last_read_at\` \`user_last_read_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`support_conversations\` CHANGE \`support_last_read_at\` \`support_last_read_at\` datetime NULL`);
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
        await queryRunner.query(`ALTER TABLE \`admins\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`paths\` CHANGE \`image_ulr\` \`image_ulr\` varchar(150) NULL`);
        await queryRunner.query(`ALTER TABLE \`paths\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`Path_List\` DROP FOREIGN KEY \`FK_00cac81e885ed200dbfbbad0b4c\``);
        await queryRunner.query(`ALTER TABLE \`Path_List\` ADD UNIQUE INDEX \`IDX_00cac81e885ed200dbfbbad0b4\` (\`pathId\`)`);
        await queryRunner.query(`ALTER TABLE \`Path_List\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`PathList_course\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`courses\` CHANGE \`image_ulr\` \`image_ulr\` varchar(150) NULL`);
        await queryRunner.query(`ALTER TABLE \`courses\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_00cac81e885ed200dbfbbad0b4\` ON \`Path_List\` (\`pathId\`)`);
        await queryRunner.query(`ALTER TABLE \`Path_List\` ADD CONSTRAINT \`FK_00cac81e885ed200dbfbbad0b4c\` FOREIGN KEY (\`pathId\`) REFERENCES \`paths\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Path_List\` DROP FOREIGN KEY \`FK_00cac81e885ed200dbfbbad0b4c\``);
        await queryRunner.query(`DROP INDEX \`REL_00cac81e885ed200dbfbbad0b4\` ON \`Path_List\``);
        await queryRunner.query(`ALTER TABLE \`courses\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`courses\` CHANGE \`image_ulr\` \`image_ulr\` varchar(150) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`PathList_course\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Path_List\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Path_List\` DROP INDEX \`IDX_00cac81e885ed200dbfbbad0b4\``);
        await queryRunner.query(`ALTER TABLE \`Path_List\` ADD CONSTRAINT \`FK_00cac81e885ed200dbfbbad0b4c\` FOREIGN KEY (\`pathId\`) REFERENCES \`paths\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paths\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`paths\` CHANGE \`image_ulr\` \`image_ulr\` varchar(150) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`admins\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
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
        await queryRunner.query(`ALTER TABLE \`support_conversations\` CHANGE \`support_last_read_at\` \`support_last_read_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`support_conversations\` CHANGE \`user_last_read_at\` \`user_last_read_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`support_conversations\` CHANGE \`last_message_at\` \`last_message_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`support_conversations\` CHANGE \`last_message_id\` \`last_message_id\` bigint NULL DEFAULT 'NULL'`);
    }

}
