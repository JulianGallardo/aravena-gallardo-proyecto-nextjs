"use client"

import {useChat} from 'ai/react';
import Image from 'next/image';
import {useEffect,useRef} from 'react';
import ByteBurgersLogo from '@/public/ByteBurgersLogo.png';
import UserLogo from '@/public/user-avatar-default.png';

const Chat = () => {
    const {messages,input,handleInputChange,handleSubmit} = useChat({
        api: '/api/openai',
    });

    const chatContainer = useRef<HTMLDivElement>(null);

    const scroll = () => {
        const {offsetHeight,scrollHeight,scrollTop} = chatContainer.current as HTMLDivElement;
        if(scrollHeight>= scrollTop + offsetHeight){
            chatContainer.current?.scrollTo(0,scrollHeight+200);
        }
    }

    useEffect(() => {
        scroll();
    },[messages]);

    const renderResponse = () => {
        return (
            <div className=''>
                {
                    messages.map((message, index) => {
                        return (
                            <div key={index} className={(message.role=='user') ? "chat flex-row-reverse chat-end" : "chat flex-row chat-start"  }>
                                <div className='chat-image'>
                                    <Image
                                        src={(message.role=='user') ? UserLogo:ByteBurgersLogo}
                                        alt='Avatar'
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <div className='chat-bubble'>
                                    <p className='message'>
                                        {message.content}
                                    </p>
                                    {
                                        index < messages.length - 1 && <div className='divider'/>
                                    }
                                </div>
                            </div>
                        );
                    })

                }
            </div>

        );
    };


    return(
        <div ref={chatContainer} className='chat h-full bg-lightgrey flex flex-col'>
            {renderResponse()}
            <form onSubmit={handleSubmit} className='items-center flex gap-5 w-full mt-5'>
                <input
                    type='text'
                    name='input-field'
                    onChange={handleInputChange}
                    placeholder='Escribe tu mensaje'
                    value={input}
                    className='input w-full'
                />
                <button type='submit' className='btn'>
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default Chat;