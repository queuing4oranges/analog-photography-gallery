import "server-only";

import { createServerSupabaseClient } from "../lib/server";

export async function isLoggedInServer() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      success: false,
      user: null,
    };
  }

  return {
    success: true,
    user,
  };
}
