import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // 1. Tworzymy tradycyjną pulę połączeń Postgres (Pool) z paczki 'pg'
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });

    // 2. Opakowujemy pulę w dedykowany adapter Prismy
    const adapter = new PrismaPg(pool);

    // 3. Przekazujemy adapter do klienta Prisma 7
    super({ adapter });
  }
  async onModuleInit() {
    await this.$connect();
  }
}