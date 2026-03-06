import axios from 'axios';
import { Note } from '@/types/note'; // Переконайся, що шлях правильний

// Створюємо екземпляр axios з правильним baseURL від GoIT
const noteApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    // Використовуємо нову назву змінної оточення для Next.js
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// Отримання нотаток з підтримкою тегів, пагінації та пошуку
export const fetchNotes = async (
  page = 1, 
  perPage = 12, 
  search = '', 
  tag?: string // Додаємо опціональний параметр tag
): Promise<FetchNotesResponse> => {
  const { data } = await noteApi.get<FetchNotesResponse>('/notes', {
    // Якщо tag передано (і це не 'all'), додаємо його в params
    params: { 
      page, 
      perPage, 
      search, 
      ...(tag && tag !== 'all' ? { tag } : {}) 
    },
  });
  return data;
};

export interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  // Додаємо <Note> перед дужками виклику post
  const { data } = await noteApi.post<Note>('/notes', noteData);
  return data;
};

// Видалення нотатки
export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await noteApi.delete<Note>(`/notes/${id}`);
  return data;
};

// НОВА ФУНКЦІЯ: Отримання однієї нотатки по ID для динамічного маршруту
export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await noteApi.get<Note>(`/notes/${id}`);
  return data;
};