import React, { useState, useContext } from 'react';
import { AlertContext } from '../../context';

/**
 * Alert component to display differnt types of alert messages.
 * 
 * @example
 * const alertType = 'success';
 * const alertMessage = 'This is a success message!';
 * 
 * @typedef {Object} AlertProps
 * @property {('success'|'info'|'warning'|'error')} alertType - The type of alert to display.
 * @property {string} alertMessage - The message to display in the alert.
 *
 * @param {AlertProps} props - The props for the Alert component
 *
 */
const Alert = () => {
  let className;
  let svgClassName;
  const [showAlert, setShowAlert] = useState(true);
  const { alertType, alertMessage } = useContext(AlertContext);

  switch (alertType) {
    case 'success':
      className = 'bg-green dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 w-3/4 sm:w-1/4 mx-auto mt-4';
      svgClassName = 'text-green-600';
      break;
    case 'error':
      className = 'bg-red dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100';
      svgClassName = 'text-red-600';
      break;
    default:
      className = '';
  }

  return (
    <>
      {
        showAlert &&
        (alertType ? (
          <div 
            role="alert" 
            className={`${className} p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-${alertType === 'success' ? 'green' : 'red'}-200 dark:hover:bg-${alertType === 'success' ? 'green' : 'red'}-800 transform hover:scale-105 hover:cursor-pointer w-3/4 sm:w-1/4 fixed inset-x-0 mx-auto z-10`}
            onClick={() => { setShowAlert(false)}} 
          >
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className={`h-5 w-5 flex-shrink-0 mr-2 ${svgClassName}`} xmlns="http://www.w3.org/2000/svg">
              <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            <p className="text-xs font-semibold">{alertMessage}</p>
            <div className="mr-0 ml-auto text-gray-600 hover:text-gray-900">
              <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        ) : null)
      }
    </>
  );
}

export default Alert;