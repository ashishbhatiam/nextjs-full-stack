'use client'
import React from 'react'
import { useSession } from 'next-auth/react';

const Home = () => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading'

  return (
    <div>
    {isLoading ? 'Loading' : (session ? (
      <p>Welcome, {session?.user?.name}!</p>
    ) : (
      <p>Please <a href="/auth/login">sign in</a> to access this page.</p>
    ))}
  </div>
  )
}

export default Home