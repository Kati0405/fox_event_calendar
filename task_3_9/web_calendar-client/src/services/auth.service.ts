import axios from 'axios';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from 'src/firebase/firebaseConfig';
import { User } from 'src/types/types';

interface IRequest<T, S> {
    data: T;
    ok: S;
    status: number;
    error?: string
}

const provider = new GoogleAuthProvider();


const getUserProfile = async (token: string) => {
    return axios.get('http://localhost:3000/user/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

const validateUser = (firebaseUser: FirebaseUser | null): User | null => {
    if (!firebaseUser) return null;
    return {
        firstName: firebaseUser.displayName?.split(' ')[0] || 'Unknown First Name',
        lastName: firebaseUser.displayName?.split(' ')[1] || 'Unknown Last Name',
        email: firebaseUser.email || 'Unknown Email',
        avatar: firebaseUser.photoURL || '',
    };
};

// const signInWithGoogle = async (): Promise<IRequest<User | null, boolean>> => {
//     try {
//         const result = await signInWithPopup(auth, provider);
//         return {
//             data: result.user ? {
//                 name: result.user.displayName || 'Unknown User',
//                 email: result.user.email || 'Unknown Email',
//                 avatar: result.user.photoURL || '',
//             } : null,
//             ok: true,
//             status: 200,
//         };
//     } catch (error) {
//         console.error('Google sign-in error:', error);
//         return {
//             data: null,
//             ok: false,
//             status: 500,
//         };
//     }
// };

const signInWithGoogle = async (): Promise<IRequest<User | null, boolean>> => {
    try {
        const result = await signInWithPopup(auth, provider);
        const googleToken = await result.user.getIdToken();

        const response = await axios.post('http://localhost:3000/auth/google/login', { token: googleToken });
        const { jwtToken, user } = response.data;

        localStorage.setItem('jwtToken', jwtToken);


        return {
            data: user,
            ok: true,
            status: 200,
        };
    } catch (error) {
        console.error('Google sign-in error:', error);
        return {
            data: null,
            ok: false,
            status: 500,
            error: 'Authentication failed. Please try again.',
        };
    }
};

const listenToAuthChanges = (callback: (response: IRequest<User | null, boolean>) => void) => {
    return onAuthStateChanged(auth, (firebaseUser) => {
        const user = firebaseUser
            ? {
                firstName: firebaseUser.displayName?.split(' ')[0] || 'Unknown First Name',
                lastName: firebaseUser.displayName?.split(' ')[1] || 'Unknown Last Name',
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

export default { signInWithGoogle, listenToAuthChanges, logout, validateUser, getUserProfile };
