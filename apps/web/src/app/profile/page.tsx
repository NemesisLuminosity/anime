'use client';

import { useEffect, useState } from 'react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

type Profile = {
  id: string;
  username: string | null;
  avatar_url: string | null;
};

export default function ProfilePage() {
  const { user, loading, signIn, signUp, signOut } = useSupabaseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }
    const run = async () => {
      setStatus('Loading profile...');
      const res = await fetch(`/api/profiles/${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setUsername(data?.username ?? '');
        setAvatarUrl(data?.avatar_url ?? '');
        setStatus('');
      } else {
        setProfile(null);
        setStatus('No profile found yet. Create one below.');
      }
    };
    run();
  }, [user]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Signing up...');
    const { error } = await signUp(email, password, username || undefined);
    setStatus(error ? `Sign up failed: ${error.message}` : 'Signed up. Check email if confirmation is needed.');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Signing in...');
    const { error } = await signIn(email, password);
    setStatus(error ? `Sign in failed: ${error.message}` : 'Signed in.');
  };

  const createProfile = async () => {
    if (!user) return;
    setStatus('Creating profile...');
    const res = await fetch('/api/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user.id, username, avatar_url: avatarUrl || null }),
    });
    if (res.ok) {
      const data = await res.json();
      setProfile(data);
      setStatus('Profile created.');
    } else {
      const err = await res.json().catch(() => ({}));
      setStatus(`Create failed: ${err.error ?? res.statusText}`);
    }
  };

  const updateProfile = async () => {
    if (!user) return;
    setStatus('Updating profile...');
    const res = await fetch(`/api/profiles/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, avatar_url: avatarUrl || null }),
    });
    if (res.ok) {
      const data = await res.json();
      setProfile(data);
      setStatus('Profile updated.');
    } else {
      const err = await res.json().catch(() => ({}));
      setStatus(`Update failed: ${err.error ?? res.statusText}`);
    }
  };

  const handleSignOut = async () => {
    setStatus('Signing out...');
    await signOut();
    setStatus('Signed out.');
  };

  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Profile Editor</h1>
      {status && <div style={{ color: '#555' }}>{status}</div>}

      {loading ? (
        <div>Loading auth...</div>
      ) : user ? (
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-500">Signed in as</div>
            <div className="font-mono break-all">{user.email ?? user.id}</div>
          </div>

          <div className="space-y-2">
            <label>
              <div>Username</div>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="border px-2 py-1 w-full" />
            </label>
            <label>
              <div>Avatar URL</div>
              <input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} className="border px-2 py-1 w-full" />
            </label>

            {!profile ? (
              <button onClick={createProfile} className="border px-3 py-1">Create Profile</button>
            ) : (
              <button onClick={updateProfile} className="border px-3 py-1">Update Profile</button>
            )}
          </div>

          <div>
            <button onClick={handleSignOut} className="border px-3 py-1">Sign Out</button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <form onSubmit={handleSignIn} className="space-y-2">
            <div className="font-semibold">Sign In</div>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border px-2 py-1 w-full" />
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border px-2 py-1 w-full" />
            <button type="submit" className="border px-3 py-1">Sign In</button>
          </form>

          <form onSubmit={handleSignUp} className="space-y-2">
            <div className="font-semibold">Sign Up</div>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border px-2 py-1 w-full" />
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border px-2 py-1 w-full" />
            <input placeholder="Username (optional)" value={username} onChange={(e) => setUsername(e.target.value)} className="border px-2 py-1 w-full" />
            <button type="submit" className="border px-3 py-1">Sign Up</button>
          </form>
        </div>
      )}
    </main>
  );
}


