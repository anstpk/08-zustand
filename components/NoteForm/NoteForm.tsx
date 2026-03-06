'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import css from './NoteForm.module.css';

// Оновлений список тегів згідно з ТЗ
const TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraft({ [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(draft);
  };

  return (
    <div className={css.formWrapper}>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.fieldGroup}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            id="title"
            value={draft.title}
            onChange={handleChange}
            className={css.input}
            required
          />
        </div>

        <div className={css.fieldGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            value={draft.content}
            onChange={handleChange}
            className={css.textarea}
          />
        </div>

        <div className={css.fieldGroup}>
          <label htmlFor="tag">Tag</label>
          <select
            name="tag"
            id="tag"
            value={draft.tag}
            onChange={handleChange}
            className={css.select}
            required
          >
            {/* Рендеримо оновлені теги */}
            {TAGS.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        <div className={css.buttons}>
          <button type="button" className={css.cancelBtn} onClick={() => router.back()}>
            Cancel
          </button>
          <button 
            type="submit" 
            className={css.submitBtn} 
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Saving...' : 'Create Note'}
          </button>
        </div>
      </form>
    </div>
  );
}