"use client";
import React from "react";
import Link from "next/link";

export default function LoginModal({ openModal, onClose, setEmail, setPassword, email, password, handleLogin }) {
  
  if (!openModal) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative flex min-h-full items-center justify-center p-4">
        <section className="create-form-container p-10 flex justify-center items-center bg-[#A93F06]">
          <div className="w-full max-w-lg space-y-12" data-testid="login-form">
            <header className="space-y-1">
              <h1 className="text-2xl font-medium tracking-tight">Login</h1>
              <p className="mt-4 text-sm text-white">
                If you login as guest, you dont need to do anything. Just click "Login aus Guest".
              </p>
            </header>
            <section className="space-y-5" data-testid="login-section">
              <form
                className="flex flex-col"
                onSubmit={() => handleLogin(email, password)}
              >
                <label className="my-2 font-medium text-xs uppercase tracking-wider text-white/80">
                  <span>Email:</span>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    className="w-full bg-transparent border border-white/20 px-3 py-2 h-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                  />
                </label>
                <label className="my-2 font-medium text-xs uppercase tracking-wider text-white/80">
                  <span>Password:</span>
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    className="w-full bg-transparent border border-white/20 px-3 py-2 h-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white"
                  />
                </label>
                <div className="flex">
                  <button
                    onClick={() => onClose()}
                    className="me-2 w-full bg-white text-black hover:bg-white/85 px-5 py-2 h-9 text-xs mt-4 uppercase tracking-wider"
                    data-testid="album-submit-btn"

                  >
                    <Link href="/albums/create" onClick={onClose}>
                      Login as Guest
                    </Link>
                  </button>
                  <button
                    className="ms-2 w-full bg-white text-black hover:bg-white/85 px-5 py-2 h-9 text-xs mt-4 uppercase tracking-wider"
                    data-testid="album-submit-btn"
                    type="submit"
                  >
                    Login as Admin
                  </button>
                </div>
              </form>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
