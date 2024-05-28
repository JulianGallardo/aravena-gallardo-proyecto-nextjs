import React from 'react';
import { Header } from '@/app/ui';
import {Footer} from '@/app/ui';
import Chat from '@/app/ui/asistente/chat';



export default function Page() {
  return (
    <div>
        <div className='mt-20 h-screen'>
            <Chat />
        </div>
    </div>
  );
}