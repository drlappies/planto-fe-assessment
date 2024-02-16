import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  return <p>File: {router.query.fileId}</p>;
}
