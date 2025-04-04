import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1743756491991 implements MigrationInterface {
    name = 'Auto1743756491991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_6385a745d9e12a89b859bb25623"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_0585b0c8594d105d1e3f0dffd30" PRIMARY KEY ("cart_id", "id")`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_6385a745d9e12a89b859bb25623"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_0585b0c8594d105d1e3f0dffd30"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "cart_items" ALTER COLUMN "cart_id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_6385a745d9e12a89b859bb25623" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_6385a745d9e12a89b859bb25623"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ALTER COLUMN "cart_id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_0585b0c8594d105d1e3f0dffd30" PRIMARY KEY ("cart_id", "id")`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_6385a745d9e12a89b859bb25623" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_0585b0c8594d105d1e3f0dffd30"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_6385a745d9e12a89b859bb25623" PRIMARY KEY ("cart_id")`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "id"`);
    }

}
