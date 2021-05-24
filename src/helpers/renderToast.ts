import { ReactText } from 'react';
import { toast } from 'react-toastify';

export const renderSuccesToast = (title: string): ReactText => toast.success(title, {
  position: toast.POSITION.TOP_RIGHT,
});

export const renderErrorToast = (title: string): ReactText => toast.success(title, {
  position: toast.POSITION.TOP_RIGHT,
});


