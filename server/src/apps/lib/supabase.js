import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = "https://eevwdhkennuvbylwnfzp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVldndkaGtlbm51dmJ5bHduZnpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0Mzk0MzksImV4cCI6MjAzNjAxNTQzOX0.CVVyTutL6pl2Ui5pvw4AfMI1tGI-7Ww7QZ_54HMdhTQ";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
