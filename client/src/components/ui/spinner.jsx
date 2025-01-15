import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

export const LoadingSpinner = ({ className }) => {
  return (
    
    <div className={cn('w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin', className)}></div>
  );
};

// Prop Types
LoadingSpinner.propTypes = {
  className: PropTypes.string,
};
