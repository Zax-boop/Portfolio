"use client"

import { useEffect, useState } from 'react';
import supabase from "../../../utils/supabaseclient"
import { User } from '@supabase/supabase-js';

export default function ProtectedPage() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    getSession();
  }, []);

  if (!user) {
    return <p>Access Denied: Please Sign In</p>;
  }

  return <p>Welcome, {user.email}!</p>;
}