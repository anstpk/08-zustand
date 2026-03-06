import { Metadata } from "next";

// Додаємо метадані згідно з вимогами ТЗ
export const metadata: Metadata = {
  title: "NoteHub - Сторінку не знайдено",
  description: "На жаль, такої сторінки не існує. Поверніться на головну, щоб продовжити роботу з нотатками.",
  openGraph: {
    title: "404 - Сторінку не знайдено",
    description: "Вибачте, але ми не змогли знайти сторінку, яку ви шукаєте.",
    url: "https://your-vercel-domain.vercel.app/404", // Бажано вказати актуальний URL
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 Error",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div style={{ padding: '100px 40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', color: '#333' }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
        Page not found
      </h2>
      <p style={{ color: '#666', maxWidth: '400px', margin: '0 auto' }}>
        Sorry, the page you are looking for does not exist on NoteHub.
      </p>
    </div>
  );
}