import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

const useDocument = (collection: string, id: string) => {
  const [document, setDocument] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Realtime data for document

  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id);

    const unsubscribe = ref.onSnapshot((snapshot: any) => {
      if (snapshot.data()) {
        setDocument({ ...snapshot.data(), id: snapshot.id });
        setError(null);
      } else {
        setError('No such document exists');
      }
    }, (err) => {
      console.log(err.message);
      setError('Failed to get document');
    });

    return () => unsubscribe();

  }, [collection, id]);

  return { document, error }
}

export default useDocument;