import { Button } from '@/components/ui/button';
import propTypes from 'prop-types';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded shadow-lg z-10">
        <h2 className="text-lg font-semibold">Confirm</h2>
        <p className="mt-4">Are you sure?</p>
        <div className="mt-6 flex justify-end gap-4">
          <Button onClick={onClose} color="gray">
            No
          </Button>
          <Button onClick={onConfirm} color="success">
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ConfirmationModal };

ConfirmationModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  onConfirm: propTypes.func.isRequired,
};
