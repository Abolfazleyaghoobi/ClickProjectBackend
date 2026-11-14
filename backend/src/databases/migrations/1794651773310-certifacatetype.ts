import { MigrationInterface, QueryRunner } from "typeorm";

export class Certifacatetype1794651773310 implements MigrationInterface {
    name = 'Certifacatetype1794651773310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_certificates\` (\`user_id\` bigint UNSIGNED NOT NULL, \`certificate_type_id\` bigint UNSIGNED NOT NULL, \`awarded_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`source\` varchar(50) NOT NULL DEFAULT 'path_completion', \`source_ref_id\` bigint UNSIGNED NULL, INDEX \`idx_user_certificates_user_id\` (\`user_id\`), INDEX \`idx_user_certificates_certificate_type_id\` (\`certificate_type_id\`), PRIMARY KEY (\`user_id\`, \`certificate_type_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`certificate_types\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`key\` varchar(50) NOT NULL, \`title\` varchar(100) NOT NULL, \`icon_key\` varchar(50) NOT NULL, \`color\` varchar(50) NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_7df907c6bddba53f1ffd98c401\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`display_name\` \`display_name\` varchar(60) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`bio\` \`bio\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`github_url\` \`github_url\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`portolio_url\` \`portolio_url\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`avatar_url\` \`avatar_url\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`banner_url\` \`banner_url\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`label\` \`label\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`last_used_at\` \`last_used_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`revoked_at\` \`revoked_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`expires_at\` \`expires_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`project_url\` \`project_url\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`phone_verification_codes\` CHANGE \`consumed_at\` \`consumed_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_verified_at\` \`phone_verified_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_active_at\` \`last_active_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_certificates\` ADD CONSTRAINT \`FK_0fb66c2b2d4edbb223682730e86\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_certificates\` ADD CONSTRAINT \`FK_747fa0438a7c0873270649152da\` FOREIGN KEY (\`certificate_type_id\`) REFERENCES \`certificate_types\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_certificates\` DROP FOREIGN KEY \`FK_747fa0438a7c0873270649152da\``);
        await queryRunner.query(`ALTER TABLE \`user_certificates\` DROP FOREIGN KEY \`FK_0fb66c2b2d4edbb223682730e86\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_active_at\` \`last_active_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_verified_at\` \`phone_verified_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`phone_verification_codes\` CHANGE \`consumed_at\` \`consumed_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`project_url\` \`project_url\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`expires_at\` \`expires_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`revoked_at\` \`revoked_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`last_used_at\` \`last_used_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` CHANGE \`label\` \`label\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`banner_url\` \`banner_url\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`avatar_url\` \`avatar_url\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`portolio_url\` \`portolio_url\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`github_url\` \`github_url\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`bio\` \`bio\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` CHANGE \`display_name\` \`display_name\` varchar(60) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`IDX_7df907c6bddba53f1ffd98c401\` ON \`certificate_types\``);
        await queryRunner.query(`DROP TABLE \`certificate_types\``);
        await queryRunner.query(`DROP INDEX \`idx_user_certificates_certificate_type_id\` ON \`user_certificates\``);
        await queryRunner.query(`DROP INDEX \`idx_user_certificates_user_id\` ON \`user_certificates\``);
        await queryRunner.query(`DROP TABLE \`user_certificates\``);
    }

}
