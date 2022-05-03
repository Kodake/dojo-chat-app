import { useEffect, useState } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollection = (collection: string) => {
    const [documents, setDocuments] = useState<any[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Get the collection ref
        // let ref = projectFirestore.collection(collection);

        // Get the collection ref using query
        let ref = projectFirestore.collection(collection);

        const unsubscribe = ref.onSnapshot((snapshot: any) => {
            let results: any[] = [];            

            snapshot.docs.forEach((doc: any) => {
                results.push({ ...doc.data(), id: doc.id })
            });

            // Update state
            setDocuments(results);
            setError(null);
        }, (error) => {
            console.log(error);
            setError('Could not fetch the data');
        });

        // Unsubscribe from events when the component unmounts
        return () => {
            unsubscribe();
        }

    }, [collection]);

    return { documents, error };

}
