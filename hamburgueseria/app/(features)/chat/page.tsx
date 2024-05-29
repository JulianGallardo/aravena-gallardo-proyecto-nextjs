import React from 'react';
import { Header } from '@/app/ui';
import {Footer} from '@/app/ui';
import Chat from '@/app/ui/asistente/chat';



export default function Page() {
  return (
    <div className='flex flex-row bg-lightgrey text-black dark:bg-dark dark:text-white'>
            <Chat />
        
    </div>
  );
}