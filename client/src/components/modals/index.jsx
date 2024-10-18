import PropTypes from 'prop-types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import cn from '@/utils/tailwind-merge';

export const Modal = ({
  buttonText,
  variant,
  buttonStyles,
  header,
  description,
  onClick,
  actionButtonText,
  actionButtonStyles,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          className={buttonStyles ? buttonStyles : ''}
        >
          {buttonText}
        </Button>
      </AlertDialogTrigger>
      {/* Modal Header */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{header}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* Modal Footer */}
        <AlertDialogFooter>
          <AlertDialogCancel className="mr-2">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onClick}
            className={cn(
              `${
                actionButtonStyles
                  ? actionButtonStyles
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`,
            )}
          >
            {actionButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

Modal.propTypes = {
  buttonText: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]),
  variant: PropTypes.string,
  buttonStyles: PropTypes.string,
  header: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  actionButtonText: PropTypes.string,
  actionButtonStyles: PropTypes.string,
};
