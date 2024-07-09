// Create PostgreSQL Connection Pool here !
import * as pg from "pg";
const { Pool } = pg.default;

const connectionPool = new Pool({
  connectionString:
    "postgresql://postgres.eevwdhkennuvbylwnfzp:pu36wwEE7MntQa9r@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres",
});

export default connectionPool;