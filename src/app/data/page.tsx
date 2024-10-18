'use client'

import { useEffect, useState } from 'react';

export default function FilesList() {
    const [messages, setMessages] = useState<string[]>([]);
    const [shared, setShared] = useState<string[]>([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const messagesResponse = await fetch('/api/messages');
            const messagesData = await messagesResponse.json();
            setMessages(messagesData);

            const sharedResponse = await fetch('/api/shared');
            const sharedData = await sharedResponse.json();
            setShared(sharedData);
        };

        fetchFiles();
    }, []);

    return (
        <div>
            <h1>Файлы сообщений</h1>
            <ul>
                {messages.map((file) => (
                    <li key={file}>
                        <a href={`/api/messages/${file}`} target="_blank" rel="noopener noreferrer">
                            {file}
                        </a>
                    </li>
                ))}
            </ul>
            <hr />
            <h1>Файлы в shared</h1>
            <ul>
                {shared.map((file) => (
                    <li key={file}>
                        <a href={`/api/shared/${file}`} target="_blank" rel="noopener noreferrer">
                            {file}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

