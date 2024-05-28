"use client"

import {useChat} from 'ai/react';
import Image from 'next/image';
import {useEffect,useRef} from 'react';
import ByteBurgersLogo from '@/public/ByteBurgersLogo.png';

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
            <div className='response'>
                {
                    messages.map((message, index) => {
                        return (
                            <div key={index} className='message'>
                                <div className='message-avatar'>
                                    <Image
                                        src={ByteBurgersLogo}
                                        alt='Avatar'
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <div className='message-text'>
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
        <div ref={chatContainer} className='chat h-full flex flex-col'>
            {renderResponse()}
            <form onSubmit={handleSubmit} className='mainForm'>
                <input
                    type='text'
                    name='input-field'
                    onChange={handleInputChange}
                    placeholder='Escribe tu mensaje'
                    value={input}
                    className='input'
                />
                <button type='submit' className='btn'>
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default Chat;