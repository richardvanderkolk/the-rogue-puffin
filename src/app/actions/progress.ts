'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateBootcampProgress(newProgressDay: number) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    // If not logged in, we silently fail the DB update and let localStorage handle it for preview users
    return { success: false, message: 'Not logged in' }
  }

  // Update progress only if the new day is greater than the current day
  // (We don't want to revert progress if they revisit an old day)
  let { data: profile } = await supabase
    .from('profiles')
    .select('bootcamp_progress_day')
    .eq('id', user.id)
    .single()

  const isAdmin = user.email?.toLowerCase().includes('richard') || false;

  if (!profile) {
    const { error } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email,
        bootcamp_progress_day: newProgressDay,
        has_paid_bootcamp: isAdmin
      })

    if (error) {
      console.error('Error inserting profile:', error)
      return { success: false, error: error.message }
    }
  } else if (newProgressDay > profile.bootcamp_progress_day) {
    const { error } = await supabase
      .from('profiles')
      .update({ bootcamp_progress_day: newProgressDay })
      .eq('id', user.id)

    if (error) {
      console.error('Error updating progress:', error)
      return { success: false, error: error.message }
    }
  }

  revalidatePath('/bootcamp', 'page')
  return { success: true }
}
