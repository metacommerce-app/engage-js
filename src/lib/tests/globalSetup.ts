import { logger } from '../logging';
import dotenv from 'dotenv';

dotenv.config();

export default async function () {
  logger.info(`Global initialization...`);
}
