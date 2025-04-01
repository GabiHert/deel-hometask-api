import { Request, Response, NextFunction } from 'express';

interface ProfileRequest extends Request {
    profile?: any;
}

export const getProfile = async (req: ProfileRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { Profile } = req.app.get('models');
        const profile = await Profile.findOne({ where: { id: req.get('profile_id') || 0 } });
        if (!profile) {
            res.status(401).end();
            return; // Explicitly return to avoid further execution
        }
        req.profile = profile;
        next(); // Pass control to the next middleware
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
