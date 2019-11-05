import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEducationAndResumeTables1572177538333
  implements MigrationInterface {
  name = "AddEducationAndResumeTables1572177538333";

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "CREATE TABLE `resume` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `phoneNumber` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    );
    await queryRunner.query(
      "CREATE TABLE `education` (`id` int NOT NULL AUTO_INCREMENT, `degree` varchar(255) NOT NULL, `resumeId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
      undefined
    );
    await queryRunner.query(
      "ALTER TABLE `education` ADD CONSTRAINT `FK_0f65a811d17b239cbcd6afdcc58` FOREIGN KEY (`resumeId`) REFERENCES `resume`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION",
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `education` DROP FOREIGN KEY `FK_0f65a811d17b239cbcd6afdcc58`",
      undefined
    );
    await queryRunner.query("DROP TABLE `education`", undefined);
    await queryRunner.query("DROP TABLE `resume`", undefined);
  }
}
