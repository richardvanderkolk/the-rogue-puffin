'use server'

import { createClient } from '@/lib/supabase/server'

export async function saveSuperpower(archetype: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const isAdmin = user.email?.toLowerCase().includes('richard') || false;
    await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        email: user.email,
        learning_archetype: archetype,
        has_paid_bootcamp: isAdmin
      })
  }
}
