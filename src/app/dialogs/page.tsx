'use client'

import { useEffect, useState } from 'react';

export default function FilesList() {
    const [dialogs, setDialogs] = useState<string[]>([]);
    const [shared, setShared] = useState<string[]>([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const dialogsResponse = await fetch('/api/dialogs');
            const dialogsData = await dialogsResponse.json();
            setDialogs(dialogsData);

            const sharedResponse = await fetch('/api/shared');
            const sharedData = await sharedResponse.json();
            setShared(sharedData);
        };

        fetchFiles();
    }, []);

    return (
        <div>
            <h1>Файлы Диалогов</h1>
            <ul>
                {dialogs.map((file) => (
                    <li key={file}>
                        <a href={`/api/dialogs/${file}`} target="_blank" rel="noopener noreferrer">
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

