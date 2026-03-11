import Avatar from '@mui/material/Avatar';

import type { ProfileAvatarProps } from './types';

import { useTheme } from '@mui/material';
import stringService from '@utils/services/stringService';

const ProfileAvatar = ({ text, imageUrl, size = 25, textSize = 1, fontWeight = 500, variant = 'circular'}: ProfileAvatarProps) => {
    const theme = useTheme();

    const initials = text ? stringService.getFirstLetters(text, 2).toUpperCase() : ''

    return (
        <Avatar
            src={imageUrl}
            sx={{
                bgcolor: theme.palette.primary.main,
                fontSize: textSize + 'rem',
                height: size,
                width: size,
                fontWeight,
            }}
            variant={variant}
        >
            {!imageUrl && initials}
        </Avatar>
    )
};

export default ProfileAvatar;