const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://vgkxckhszfmzjkazrmkd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZna3hja2hzemZtemprYXpybWtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDYxOTIzMSwiZXhwIjoyMDkwMTk1MjMxfQ.SFrg8-7Z7oMmU4is-lEjy7axn-rT-YEedmB3iGd4Pck'
);

async function check() {
  const { data: profiles, error } = await supabase.from('profiles').select('*');
  if (error) {
      console.log("Error querying profiles:", error);
  } else {
      console.log(`Found ${profiles.length} profiles.`);
      console.log(profiles);
  }
}
check();
