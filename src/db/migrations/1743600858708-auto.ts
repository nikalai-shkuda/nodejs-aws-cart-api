import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1743600858708 implements MigrationInterface {
    name = 'Auto1743600858708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('OPEN', 'APPROVED', 'CONFIRMED', 'SENT', 'COMPLETED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "cart_id" uuid NOT NULL, "payment" json NOT NULL DEFAULT '{}', "delivery" json NOT NULL DEFAULT '{}', "comments" text, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'OPEN', "total" integer NOT NULL, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_f42b1d95404c45b10bf2451d814" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_f42b1d95404c45b10bf2451d814"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    }

}
