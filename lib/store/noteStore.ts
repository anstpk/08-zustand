import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DraftNote {
  title: string;
  content: string;
  tag: string;
}

interface NoteState {
  draft: DraftNote;
  setDraft: (updatedFields: Partial<DraftNote>) => void;
  clearDraft: () => void;
}

const initialDraft: DraftNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (updatedFields) =>
        set((state) => ({
          draft: { ...state.draft, ...updatedFields },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-storage', // Ключ у localStorage
    }
  )
);