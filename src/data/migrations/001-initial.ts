import fs from 'fs'
import { MigrationInterface, QueryRunner } from 'typeorm' // eslint-disable-line no-unused-vars

export class Migration1546370194676 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    const sql = fs.readFileSync(`${__dirname}/001-initial.up.sql`, 'utf8')
    await queryRunner.query(sql)
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    const sql = fs.readFileSync(`${__dirname}/001-initial.down.sql`, 'utf8')
    await queryRunner.query(sql)
  }
}
