import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub - Create Note",
  description: "Create a new note and keep your thoughts organized.",
  openGraph: {
    title: "NoteHub - Create Note",
    description: "Create a new note and keep your thoughts organized.",
    url: "https://your-domain/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ], // Тепер це масив об'єктів, як вимагає ментор
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}