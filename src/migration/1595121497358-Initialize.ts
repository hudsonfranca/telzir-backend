import { MigrationInterface, QueryRunner } from 'typeorm';

export default class Initialize1595121497358 implements MigrationInterface {
    name = 'Initialize1595121497358';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "price" ("id" SERIAL NOT NULL, "price" numeric(5,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "destinationId" integer NOT NULL, "sourceId" integer NOT NULL, CONSTRAINT "PK_d163e55e8cce6908b2e0f27cea4" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "ddd" ("id" SERIAL NOT NULL, "code" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e55b03cd9a63acb8a8ed26ac260" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "plans" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "minutes" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3720521a81c7c24fe9b7202ba61" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "price" ADD CONSTRAINT "FK_11c0370a45851f4ce275dd8ef5e" FOREIGN KEY ("destinationId") REFERENCES "ddd"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "price" ADD CONSTRAINT "FK_9b3499e117438238a50d67346a4" FOREIGN KEY ("sourceId") REFERENCES "ddd"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "price" DROP CONSTRAINT "FK_9b3499e117438238a50d67346a4"`,
        );
        await queryRunner.query(
            `ALTER TABLE "price" DROP CONSTRAINT "FK_11c0370a45851f4ce275dd8ef5e"`,
        );
        await queryRunner.query(`DROP TABLE "plans"`);
        await queryRunner.query(`DROP TABLE "ddd"`);
        await queryRunner.query(`DROP TABLE "price"`);
    }
}
