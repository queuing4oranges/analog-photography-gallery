import "server-only";

import { createServerSupabaseClient } from "../lib/server";

export async function isLoggedInServer() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  //TODO delete console logs
  console.log("SERVER USER:", user);
  console.log("SERVER ERROR:", error);
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
