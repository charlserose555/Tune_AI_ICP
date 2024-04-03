import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileSidebar from './MobileSidebar'
import { useSelector } from '../../store';

function Sidebar() {

  const { isPlaying, isSports } = useSelector((state) => state.menu);

  return (
    <>
      <DesktopSidebar />
    </>
  )
}

export default Sidebar
