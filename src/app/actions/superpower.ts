'use server'

import { createClient } from '@/lib/supabase/server'

export async function saveSuperpower(archetype: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    await supabase
      .from('profiles')
      .update({ learning_archetype: archetype })
      .eq('id', user.id)
  }
}
