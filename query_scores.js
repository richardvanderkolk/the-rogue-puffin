const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data: b, error: e1 } = await supabase.from('benchmarks').select('*').order('created_at', { ascending: false }).limit(5);
  console.log(b, e1);

  const { data: a, error: e2 } = await supabase.from('anonymous_tests').select('*').order('created_at', { ascending: false }).limit(5);
  console.log(a, e2);
}
run();
