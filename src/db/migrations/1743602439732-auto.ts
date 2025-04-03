import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1743602439732 implements MigrationInterface {
    name = 'Auto1743602439732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea"`);
    }

}
