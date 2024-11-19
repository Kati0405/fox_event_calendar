import { Calendar } from '@/types/types';
import axiosInstance from 'src/api/axiosInstance';

export const fetchCalendars = async (): Promise<Calendar[]> => {
    try {
        const response = await axiosInstance.get(`/calendars`);
        return response.data;
    } catch (error) {
        console.error('Error fetching calendars:', error);
        throw error;
    }
};

export const createCalendar = async (calendarData: {
    title: string;
    colorClass: string;
}): Promise<Calendar> => {
    try {
        const response = await axiosInstance.post('calendars', calendarData);
        return response.data;
    } catch (error) {
        console.error('Error creating calendar:', error);
        throw error;
    }
}

export const updateCalendar = async (
    id: string,
    calendarData: { title: string; colorClass: string }
): Promise<Calendar> => {
    try {
        const response = await axiosInstance.put(`calendars/${id}`, calendarData);
        return response.data;
    } catch (error) {
        console.error('Error updating calendar:', error);
        throw error;
    }
}

export const deleteCalendar = async (id: string): Promise<Calendar> => {
    try {
        const response = await axiosInstance.delete(`calendars/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting calendar:', error);
        throw error;
    }
}