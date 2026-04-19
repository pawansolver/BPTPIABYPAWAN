import { redirect } from 'next/navigation';

export default function MediaPage() {
  // Automatically redirect to Photo Gallery as it's the primary media content
  redirect('/media/photos');
}
