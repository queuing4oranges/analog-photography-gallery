"use client";
import React from "react";
import Link from "next/link";

export default function LoginModal({ openModal, onClose, setEmail, setPassword, email, password, handleLogin }) {

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
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
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin(email, password);
                }}
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
                  <Link
                    href="/albums/create"
                    className="me-2 w-full bg-white text-black hover:bg-white/85 px-5 py-2 h-9 text-xs mt-4 uppercase tracking-wider flex items-center justify-center"
                  >
                    Login as Guest
                  </Link>
                  <button
                    className="ms-2 w-full bg-white text-black hover:bg-white/85 px-5 py-2 h-9 text-xs mt-4 uppercase tracking-wider"
                    type="submit"
                  >
                    Login as Admin
                  </button>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full border border-white/30 text-white/60 hover:text-white hover:border-white/60 px-5 py-2 h-9 text-xs uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
              </form>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
