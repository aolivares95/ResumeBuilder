import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUUIDColumn1572186250060 implements MigrationInterface {
    name = 'AddUUIDColumn1572186250060'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `resume` ADD `uuid` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `education` ADD `uuid` varchar(255) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `education` DROP COLUMN `uuid`", undefined);
        await queryRunner.query("ALTER TABLE `resume` DROP COLUMN `uuid`", undefined);
    }

}
