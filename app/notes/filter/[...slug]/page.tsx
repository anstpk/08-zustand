import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import React from 'react';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

// Функція для SEO
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const resolvedParams = await props.params;
  const filter = resolvedParams.slug?.[0] || 'all';
  const title = `NoteHub - ${filter.toUpperCase()} Notes`;

  return {
    title,
    description: `Browse all your ${filter} notes efficiently.`,
    openGraph: {
      title,
      description: `Browse all your ${filter} notes efficiently.`,
      url: `https://your-domain/notes/filter/${filter}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NotesPage(props: PageProps) {
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;

  const queryClient = new QueryClient();
  const tagFromUrl = slug?.[0];
  const tagToFetch = (tagFromUrl === 'all' || !tagFromUrl) ? undefined : tagFromUrl;

  try {
    await queryClient.prefetchQuery({
      queryKey: ['notes', tagToFetch], 
      queryFn: () => fetchNotes(1, 12, '', tagToFetch), 
    });
  } catch (error) {
    console.error("Prefetch error:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tagToFetch} />
    </HydrationBoundary>
  );
}