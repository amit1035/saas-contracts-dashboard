/**
 * Date utility functions for the SaaS Contracts Dashboard
 */

/**
 * Format a date string to a more readable format
 * @param {string} dateString - The date string to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, mergedOptions);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format a date string to include time
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  
  return formatDate(dateString, options);
};

/**
 * Calculate the number of days until a date
 * @param {string} dateString - The target date
 * @returns {number} Number of days until the date (negative if date is in the past)
 */
export const daysUntil = (dateString) => {
  try {
    const targetDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  } catch (error) {
    console.error('Error calculating days until:', error);
    return 0;
  }
};

/**
 * Check if a date is expired
 * @param {string} dateString - The date to check
 * @returns {boolean} True if the date is in the past
 */
export const isExpired = (dateString) => {
  return daysUntil(dateString) < 0;
};

/**
 * Check if a date is within a certain number of days from now
 * @param {string} dateString - The date to check
 * @param {number} days - Number of days from now
 * @returns {boolean} True if the date is within the specified days
 */
export const isWithinDays = (dateString, days) => {
  const daysLeft = daysUntil(dateString);
  return daysLeft >= 0 && daysLeft <= days;
};

/**
 * Get a human-readable relative time (e.g., "2 days ago", "in 3 days")
 * @param {string} dateString - The date to convert
 * @returns {string} Human-readable relative time
 */
export const getRelativeTime = (dateString) => {
  const days = daysUntil(dateString);
  
  if (days === 0) return 'today';
  if (days === 1) return 'tomorrow';
  if (days === -1) return 'yesterday';
  if (days > 0) return `in ${days} days`;
  if (days < 0) return `${Math.abs(days)} days ago`;
  
  return 'on ' + formatDate(dateString);
};

/**
 * Get the status of a contract based on its expiry date
 * @param {string} expiryDate - The expiry date of the contract
 * @returns {string} Status: 'Active', 'Expired', or 'Renewal Due'
 */
export const getContractStatus = (expiryDate) => {
  if (isExpired(expiryDate)) {
    return 'Expired';
  } else if (isWithinDays(expiryDate, 30)) {
    return 'Renewal Due';
  } else {
    return 'Active';
  }
};