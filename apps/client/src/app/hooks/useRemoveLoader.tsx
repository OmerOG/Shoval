import { useEffect } from 'react';

export function useRemoveLoader() {
    useEffect(() => {
        const loaderElement = document.querySelector('.loader-container');
        if (loaderElement) loaderElement.remove();
    }, []);
}
