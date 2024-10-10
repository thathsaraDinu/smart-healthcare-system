import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import propTypes from 'prop-types';
import { useState } from 'react';

export function DeleteModal({
  description,
  btnText,
  title,
  btnClassName = '',
  onYes,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNoClick = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={btnClassName}
          onClick={() => setIsOpen(true)}
        >
          {btnText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-gray-500 text-white hover:bg-gray-400 hover:text-white"
            // Close the modal
            onClick={handleNoClick}
          >
            No
          </Button>
          <Button
            type="submit"
            onClick={onYes}
            className="bg-red-500 text-white hover:bg-red-400 hover:text-white"
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Prop Types
DeleteModal.propTypes = {
  description: propTypes.string.isRequired,
  btnText: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  btnClassName: propTypes.string,
  onYes: propTypes.func.isRequired,
};
