'use client';

import { useEffect, useState } from 'react';

type Profile = {
  id: string;
  username: string | null;
  avatar_url: string | null;
};

export default function ProfilesList() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profiles')
      .then((r) => r.json())
      .then((data) => setProfiles(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading profiles...</div>;

  return (
    <div className="space-y-3">
      {profiles.map((p) => (
        <div key={p.id} className="flex items-center gap-3">
          <img
            src={p.avatar_url ?? 'https://placehold.co/48x48?text=?'}
            alt={p.username ?? 'Avatar'}
            width={48}
            height={48}
            style={{ borderRadius: 9999 }}
          />
          <div>
            <div>{p.username ?? 'Anonymous'}</div>
            <div className="text-xs text-gray-500">{p.id}</div>
          </div>
        </div>
      ))}
    </div>
  );
}


