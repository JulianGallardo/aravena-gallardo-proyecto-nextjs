"use client"
import { useChat } from 'ai/react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import ByteBurgersLogo from '@/public/ByteBurgersLogo.png';
import UserLogo from '@/public/user-avatar-default.png';

const Chat = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/openai',
    });

    function convertToStrong(text: string) {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }

    const chatContainer = useRef<HTMLDivElement>(null);

    const scroll = () => {
        const { offsetHeight, scrollHeight, scrollTop } = chatContainer.current as HTMLDivElement;
        if (scrollHeight >= scrollTop + offsetHeight) {
            chatContainer.current?.scrollTo(0, scrollHeight + 200);
        }
    };

    useEffect(() => {
        scroll();
    }, [messages]);

    const renderResponse = () => {
        return (
            <div className='flex flex-col flex-grow'>
                {messages.map((message, index) => (
                    <div key={index} className={(message.role === 'user') ? 'flex flex-row-reverse items-end mb-4 chat chat-end' : 'flex flex-row items-start mb-4 chat chat-start'}>
                        <div className='min-w-12 min-h-12 max-w-14 max-h-14 w-fit h-fit chat-image bg-white rounded-full p-2 relative'>
                            <Image
                                src={(message.role === 'user') ? UserLogo : ByteBurgersLogo}
                                alt='Avatar'
                                className=''
                                width={50}
                                height={50}
                            />
                        </div>
                        <div className=''>
                            <p className='text-sm chat-bubble bg-darkblue dark:bg-lightgrey dark:text-black' dangerouslySetInnerHTML={{ __html: convertToStrong(message.content) }} />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='flex flex-grow flex-col min-h-screen mt-14'>
            <div ref={chatContainer} className='flex-grow flex-col p-4'>
                {renderResponse()}
            </div>
            <form onSubmit={handleSubmit} className='flex items-center gap-4 p-4 mb-14 '>
                <input
                    type='text'
                    name='input-field'
                    onChange={handleInputChange}
                    placeholder='Escribe tu mensaje'
                    value={input}
                    className='flex-grow p-2 border border-dark rounded-lg w-full'
                />
                <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded-lg bg-dark  border-white hover:border-2 '>
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default Chat;
