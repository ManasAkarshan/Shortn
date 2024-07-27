import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div className='min-h-screen container'>
        <main>
            {/* HEADER */}
            <Header/>
            <Outlet/>
        </main>
        {/* FOOTER */}
    </div>
  )
}

export default AppLayout