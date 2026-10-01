import { supabase } from "@/db/supabase";
import type { RsvpFormData, RsvpResponse } from "@/types/types";

/**
 * Submit or update an RSVP response.
 * If the guest_name already exists, the row is updated (upsert by name).
 */
export async function submitRsvp(
  data: RsvpFormData,
): Promise<{ success: boolean; error?: string }> {
  // Check for existing entry with the same name (case-insensitive)
  const { data: existing } = await supabase
    .from("rsvp_responses")
    .select("id")
    .ilike("guest_name", data.guest_name.trim())
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("rsvp_responses")
      .update({
        status: data.status.trim(),
        email: data.email.trim(),
        phone_number: data.phone_number.trim(),
        drink_preference: data.drink_preference.trim(),
        relationship: data.relationship.trim(),
        attending: data.attending,
        message: data.message?.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    if (error) return { success: false, error: error.message };
    return { success: true };
  }

  const { error } = await supabase.from("rsvp_responses").insert({
    status: data.status.trim(),
    guest_name: data.guest_name.trim(),
    email: data.email.trim(),
    phone_number: data.phone_number.trim(),
    drink_preference: data.drink_preference.trim(),
    relationship: data.relationship.trim(),
    attending: data.attending,
    message: data.message?.trim() || null,
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

/**
 * Get the total counts of attending / not attending responses.
 */
export async function getRsvpCounts(): Promise<{
  attending: number;
  declining: number;
}> {
  const { data, error } = await supabase
    .from("rsvp_responses")
    .select("attending")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error || !data) return { attending: 0, declining: 0 };

  const rows = Array.isArray(data) ? data : [];
  return {
    attending: rows.filter((r: Pick<RsvpResponse, "attending">) => r.attending)
      .length,
    declining: rows.filter((r: Pick<RsvpResponse, "attending">) => !r.attending)
      .length,
  };
}
