import React, { createContext, useState, useContext } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import themeContext from '../theme/themeContext';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  const showAlert = ( message, type = 'success') => {
    setAlert({ show: true, message, type });
  };

  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };

  const renderAlert = () => {

    const theme = useContext(themeContext)

    return (
      <AwesomeAlert
        show={alert.show}
        title={
            alert.type === 'success'
            ? 'Success'
            : alert.type === 'error'
            ? 'Error'
            : 'Loading...'}
        message={alert.type === 'loading' ? '' : alert.message}
        closeOnTouchOutside={alert.type === 'loading' ? true : false}
        closeOnHardwareBackPress={true}
        showConfirmButton={alert.type !== 'loading' ? true : false}
        confirmText={            
            alert.type === 'success'
            ? 'Ok'
            : alert.type === 'error'
            ? 'Ok'
            : ''}
        confirmButtonColor={            
            alert.type === 'success'
            ? '#00bb00'
            : alert.type === 'error'
            ? '#e23636'
            : false}
        contentContainerStyle={{
            backgroundColor: theme.bg2, 
            borderRadius: 10,
        }}
        onConfirmPressed={() => hideAlert}
      />
    );
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {renderAlert()}
    </AlertContext.Provider>
  );
};
