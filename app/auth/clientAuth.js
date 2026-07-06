import { supabase } from "../lib/supabaseClient";

export async function login(email, password) {
  if (!email || !password) {
    return {
      success: false,
      error: "Missing credentials",
      user: null,
    };
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      success: false,
      error,
      user: null,
    };
  }

  if (!data?.session) {
    return {
      success: false,
      error: { message: "Login succeeded but no session was created. Check if your email is confirmed in Supabase." },
      user: null,
    };
  }

  return {
    success: true,
    error: null,
    user: data.user,
  };
}

export async function isLoggedIn() {
  const { data: { user, error } } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      success: false,
      message: "Only admin can create an album",
      user: null,
    }
  }
  
  return {
    success: true,
    user,
  }
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  return { error };
}
