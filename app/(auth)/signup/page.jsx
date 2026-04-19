"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";
import AuthForm from "../AuthForm";
import { useRouter } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export default function Signup() {
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setFormError(error.message);
    }

    if (!error) {
      router.push("/verify"); //push to new page
    }
  };

  return (
    <main>
      <h2>Sign up</h2>
      <AuthForm handleSubmit={handleSubmit} />
      {formError && <div>{formError}</div>}
    </main>
  );
}
