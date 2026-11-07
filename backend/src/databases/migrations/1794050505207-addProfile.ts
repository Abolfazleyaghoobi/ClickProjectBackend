import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProfile1794050505207 implements MigrationInterface {
    name = 'AddProfile1794050505207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_profiles\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`user_id\` bigint UNSIGNED NOT NULL, \`display_name\` varchar(60) NULL, \`bio\` text NULL, \`avatar_url\` text NULL, \`banner_url\` text NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`UQ_user_profiles_user_id\` (\`user_id\`), UNIQUE INDEX \`REL_6ca9503d77ae39b4b5a6cc3ba8\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_verified_at\` \`phone_verified_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_active_at\` \`last_active_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` ADD CONSTRAINT \`FK_user_profiles_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_profiles\` DROP FOREIGN KEY \`FK_user_profiles_user_id\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_active_at\` \`last_active_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_verified_at\` \`phone_verified_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP INDEX \`REL_6ca9503d77ae39b4b5a6cc3ba8\` ON \`user_profiles\``);
        await queryRunner.query(`DROP INDEX \`UQ_user_profiles_user_id\` ON \`user_profiles\``);
        await queryRunner.query(`DROP TABLE \`user_profiles\``);
    }

}
