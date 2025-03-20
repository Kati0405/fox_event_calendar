import { useContext } from 'react';
import { Context } from 'src/context/context';

export const useCalendarContext = () => {
    const context = useContext(Context);

    if (!context) {
        throw new Error('useCalendarContext must be used within a ContextProvider');
    }

    return { loading: false, data: context };
};