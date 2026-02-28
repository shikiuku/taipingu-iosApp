import { useCallback, useEffect, useState } from 'react';
import { Word } from '../../../constants/words';

export const useTypingLogic = (targetWord: Word | null, onComplete: () => void) => {
    const [userInput, setUserInput] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setUserInput('');
        setCurrentIndex(0);
    }, [targetWord]);

    const handleKeyPress = useCallback((key: string) => {
        if (!targetWord) return;

        const targetRomaji = targetWord.romaji[0]; // TODO: 複数パターン対応
        const expectedChar = targetRomaji[currentIndex];

        if (key.toLowerCase() === expectedChar.toLowerCase()) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex);

            if (nextIndex === targetRomaji.length) {
                onComplete();
            }
        } else {
            // TODO: ミス入力の処理
        }
    }, [targetWord, currentIndex, onComplete]);

    return {
        currentIndex,
        handleKeyPress,
        targetRomaji: targetWord?.romaji[0] || '',
    };
};
