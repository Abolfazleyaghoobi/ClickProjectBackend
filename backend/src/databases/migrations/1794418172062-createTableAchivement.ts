import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableAchivement1794418172062 implements MigrationInterface {
    name = 'CreateTableAchivement1794418172062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_achievements\` (\`user_id\` bigint UNSIGNED NOT NULL, \`achievement_id\` bigint UNSIGNED NOT NULL, \`unlocked_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`idx_user_achievements_user_id\` (\`user_id\`), INDEX \`idx_user_achievements_achievement_id\` (\`achievement_id\`), PRIMARY KEY (\`user_id\`, \`achievement_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`achievement_definitions\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`key\` varchar(50) NOT NULL, \`title\` varchar(100) NOT NULL, \`description\` text NOT NULL, \`icon_key\` varchar(50) NOT NULL, \`condition_type\` varchar(50) NOT NULL, \`condition_value\` int UNSIGNED NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX \`idx_achievement_key\` (\`key\`), UNIQUE INDEX \`IDX_adc1b2ad1d45000502502ec540\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
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
        await queryRunner.query(`ALTER TABLE \`user_achievements\` ADD CONSTRAINT \`FK_c755e3741cd46fc5ae3ef06592c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_achievements\` ADD CONSTRAINT \`FK_36b4a912357ad1342b735d4d4c8\` FOREIGN KEY (\`achievement_id\`) REFERENCES \`achievement_definitions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_achievements\` DROP FOREIGN KEY \`FK_36b4a912357ad1342b735d4d4c8\``);
        await queryRunner.query(`ALTER TABLE \`user_achievements\` DROP FOREIGN KEY \`FK_c755e3741cd46fc5ae3ef06592c\``);
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
        await queryRunner.query(`DROP INDEX \`IDX_adc1b2ad1d45000502502ec540\` ON \`achievement_definitions\``);
        await queryRunner.query(`DROP INDEX \`idx_achievement_key\` ON \`achievement_definitions\``);
        await queryRunner.query(`DROP TABLE \`achievement_definitions\``);
        await queryRunner.query(`DROP INDEX \`idx_user_achievements_achievement_id\` ON \`user_achievements\``);
        await queryRunner.query(`DROP INDEX \`idx_user_achievements_user_id\` ON \`user_achievements\``);
        await queryRunner.query(`DROP TABLE \`user_achievements\``);
    }

}
