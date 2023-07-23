import { useState } from 'react';

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [visibility, setVisibility] = useState('Show');

  const handlePasswordVisibility = () => {
    if (visibility === 'Show') {
      setVisibility('Hide');
      setPasswordVisibility(!passwordVisibility);
    } else if (visibility === 'Hide') {
      setVisibility('Show');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    visibility,
    handlePasswordVisibility,
  };
};
