import { Dialog, DialogBody, Spinner } from "@material-tailwind/react";

interface SpinnerModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
}

export default function SpinnerModal({ isOpen, handleCloseModal }: SpinnerModalProps) {
  if (isOpen) {
    return (
      <Dialog open={isOpen} handler={handleCloseModal} className="outline-none relative p-5 tablet:p-15 desktop:p-10">
        <DialogBody>
          <div className="w-full flex items-start justify-center">
            <Spinner color="green" />
          </div>
        </DialogBody>
      </Dialog>
    );
  }
}
