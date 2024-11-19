import { Event } from '@/types/types';
import axiosInstance from 'src/api/axiosInstance';

export const fetchEvents = async (): Promise<Event[]> => {
    try {
        const response = await axiosInstance.get(`/events`);
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw new Error('Could not fetch events');
    }
};

export const createEvent = async (eventData: {
    title: string;
    description: string;
    date: string;
    start_time: string;
    end_time: string;
    calendarId: string;
}): Promise<Event> => {
    try {
        const response = await axiosInstance.post('events', eventData);
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

export const updateEvent = async (
    id: string,
    eventData: { title: string; description: string; date: string; start_time: string; end_time: string; calendarId: string }
): Promise<Event> => {
    try {
        const response = await axiosInstance.put(`events/${id}`, eventData);
        return response.data;
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
};

export const deleteEvent = async (id: string): Promise<Event> => {
    try {
        const response = await axiosInstance.delete(`events/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
};
