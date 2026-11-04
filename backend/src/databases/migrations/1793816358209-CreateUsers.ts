import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1793816358209 implements MigrationInterface {
    name = 'CreateUsers1793816358209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`username\` varchar(24) NOT NULL, \`username_normalized\` varchar(24) NOT NULL, \`phone\` varchar(11) NOT NULL, \`password_hash\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user', \`status\` enum ('active', 'inactive', 'banned') NOT NULL DEFAULT 'active', \`phone_verified_at\` datetime NULL, \`last_active_at\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`UQ_users_phone\` (\`phone\`), UNIQUE INDEX \`UQ_users_username_normalized\` (\`username_normalized\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_users_username_normalized\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`UQ_users_phone\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
