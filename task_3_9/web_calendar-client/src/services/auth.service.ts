import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from 'src/firebase/firebaseConfig';
import { User } from 'src/types/types';

interface IRequest<T, S> {
    data: T;
    ok: S;
    status: number;
}

const provider = new GoogleAuthProvider();

const validateUser = (firebaseUser: FirebaseUser | null): User | null => {
    if (!firebaseUser) return null;
    return {
        name: firebaseUser.displayName || 'Unknown User',
        email: firebaseUser.email || 'Unknown Email',
        avatar: firebaseUser.photoURL || '',
    };
};

const signInWithGoogle = async (): Promise<IRequest<User | null, boolean>> => {
    try {
        const result = await signInWithPopup(auth, provider);
        return {
            data: result.user ? {
                name: result.user.displayName || 'Unknown User',
                email: result.user.email || 'Unknown Email',
                avatar: result.user.photoURL || '',
            } : null,
            ok: true,
            status: 200,
        };
    } catch (error) {
        console.error('Google sign-in error:', error);
        return {
            data: null,
            ok: false,
            status: 500,
        };
    }
};

const listenToAuthChanges = (callback: (response: IRequest<User | null, boolean>) => void) => {
    return onAuthStateChanged(auth, (firebaseUser) => {
        const user = firebaseUser
            ? {
                name: firebaseUser.displayName || 'Unknown User',
                email: firebaseUser.email || 'Unknown Email',
                avatar: firebaseUser.photoURL || '',
            }
            : null;
        callback({
            data: user,
            ok: true,
            status: user ? 200 : 204,
        });
    });
};

const logout = async (): Promise<IRequest<null, boolean>> => {
    try {
        await signOut(auth);
        return {
            data: null,
            ok: true,
            status: 200,
        };
    } catch (error) {
        console.error('Logout error:', error);
        return {
            data: null,
            ok: false,
            status: 500,
        };
    }
};

export default { signInWithGoogle, listenToAuthChanges, logout, validateUser };
