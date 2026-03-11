import { IconButton, CircularProgress } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

import ProfileAvatar from '@components/profileAvatar';
import ImageCropDialog from '@components/imageCropDialog';
import { HeaderContainer, AvatarWrapper, HiddenInput } from './styles';

import type { ProfileHeaderProps } from './types';

const ProfileHeader = ({
  user,
  uploading,
  cropOpen,
  imageUrl,
  fileInputRef,
  onImageClick,
  onImageChange,
  onCropConfirm,
  onCropCancel
}: ProfileHeaderProps) => {
  return (
    <HeaderContainer>
      <AvatarWrapper>
        {uploading ? (
          <CircularProgress size={40} />
        ) : (
          <ProfileAvatar
            text={user?.name || ""}
            imageUrl={user?.images?.profile}
            size={100}
            fontWeight={800}
            textSize={3}
          />
        )}

        <HiddenInput
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={onImageChange}
        />

        <IconButton
          onClick={onImageClick}
          disabled={uploading}
          size="small"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            bgcolor: 'primary.main',
            color: 'white',
            width: 32,
            height: 32,
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          <PhotoCamera fontSize="small" />
        </IconButton>
      </AvatarWrapper>

      <ImageCropDialog
        open={cropOpen}
        imageUrl={imageUrl}
        onClose={onCropCancel}
        onConfirm={onCropConfirm}
      />
    </HeaderContainer>
  );
};

export default ProfileHeader;