import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsers1794049798472 implements MigrationInterface {
    name = 'UpdateUsers1794049798472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`level\` int UNSIGNED NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`xp\` int UNSIGNED NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`xp_to_next_level\` int UNSIGNED NOT NULL DEFAULT '1000'`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`step_balance\` int UNSIGNED NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_verified_at\` \`phone_verified_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_active_at\` \`last_active_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`last_active_at\` \`last_active_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone_verified_at\` \`phone_verified_at\` datetime NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`step_balance\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`xp_to_next_level\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`xp\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`level\``);
    }

}
