import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTableAchivement1794421533432 implements MigrationInterface {
    name = 'UpdateTableAchivement1794421533432'

    public async up(queryRunner: QueryRunner): Promise<void> {
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
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_verified_at\` \`phone_verified_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_active_at\` \`last_active_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_active_at\` \`last_active_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_verified_at\` \`phone_verified_at\` datetime NULL DEFAULT 'NULL'`);
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
    }

}
