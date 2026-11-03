import { migrate } from './db/index.js';
import './index.js';

migrate().catch(console.error);
