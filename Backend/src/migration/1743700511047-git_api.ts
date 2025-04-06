import { MigrationInterface, QueryRunner } from "typeorm";

export class GitApi1743700511047 implements MigrationInterface {
    name = 'GitApi1743700511047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`api\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`full_name\` varchar(255) NOT NULL, \`created_at\` varchar(255) NOT NULL, \`updated_at\` varchar(255) NOT NULL, \`pushed_at\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`api\``);
    }

}
