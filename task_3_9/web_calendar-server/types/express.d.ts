import { AuthJwtPayload } from 'src/auth/types/auth-jwtPayload';

declare global {
    namespace Express {
        interface Request {
            user?: { id: string } & AuthJwtPayload;
        }
    }
}