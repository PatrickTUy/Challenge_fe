import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const ToastComponent = ({
  message,
  type,
  promise,
  successMessage,
  errorMessage,
}) => {
  let notify;
  switch (type) {
    case 'success':
      notify = () => toast.success(message);
      notify();
      break;
    case 'error':
      notify = () => toast.error(message);
      notify();
      break;
    case 'loading':
      notify = () => toast.loading(message);
      notify();
      break;
    case 'multiline':
      notify = () =>
        toast(message, {
          duration: 5000,
        });
      notify();
      break;
    case 'promise':
      notify = () =>
        toast.promise(
          promise,
          {
            loading: 'Loading',
            success: (data) => `${successMessage}`,
            error: (err) => `${errorMessage}`,
          },
          {
            style: {
              minWidth: '250px',
            },
            success: {
              duration: 5000,
            },
          }
        );
      notify();
      break;
    default:
      notify = () => toast(message);
      notify();
      break;
  }
};

export const ToasterComponent = ({ position = 'top-center' }) => {
  return (
    <Toaster
      position={'top-center'} // top-right, top-center, top-left, bottom-right, bottom-center, bottom-left
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: '',
        duration: 5000,
        style: {
          background: '#363636',
          color: '#fff',
        },

        // Default options for specific types
        success: {
          duration: 3000,
          theme: {
            primary: 'green',
            secondary: 'black',
          },
        },
        error: {
          duration: 3000,
          theme: {
            primary: 'red',
            secondary: 'black',
          },
        },
      }}
    />
  );
};
