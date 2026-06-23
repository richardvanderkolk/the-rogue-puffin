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

  const isAdmin = user.email?.toLowerCase()?.includes('richard') || false;

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

export async function applyPromoCode(code: string, product: 'bootcamp' | 'mastery') {
  if (code.toLowerCase().trim() !== 'educator') {
    return { success: false, message: 'Invalid promo code' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: 'Please log in first to apply promo codes.' }
  }

  const updateFields: any = {};
  if (product === 'bootcamp') {
    updateFields.has_paid_bootcamp = true;
  } else if (product === 'mastery') {
    updateFields.subscription_status = 'active';
    updateFields.subscription_tier = 'educator';
  }

  const { error } = await supabase
    .from('profiles')
    .update(updateFields)
    .eq('id', user.id)

  if (error) {
    console.error('Error applying promo code in profile:', error)
    // Fallback if profile row doesn't exist yet: insert it
    const insertFields: any = {
      id: user.id,
      email: user.email,
      bootcamp_progress_day: 1,
      has_paid_bootcamp: product === 'bootcamp',
      subscription_status: product === 'mastery' ? 'active' : null,
      subscription_tier: product === 'mastery' ? 'educator' : 'free'
    };
    
    const { error: insertError } = await supabase
      .from('profiles')
      .insert(insertFields)
    
    if (insertError) {
      return { success: false, message: insertError.message }
    }
  }

  revalidatePath('/bootcamp', 'page')
  revalidatePath('/mastery', 'page')
  return { success: true }
}
