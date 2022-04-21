import { useEffect, useState } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // Sign user out
    try {
      // Update online status
      const { uid } = user;

      await projectFirestore.collection('users').doc(uid).update({
        online: false
      });

      // Signup the user out
      await projectAuth.signOut();

      // Dispatch logout action
      dispatch({ type: 'LOGOUT' });

      // Update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err: any) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  }

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    }
  }, []);

  return { logout, error, isPending };
}
