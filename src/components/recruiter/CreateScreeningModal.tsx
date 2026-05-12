// Users/jaydenosafo/Phone_Screening_Platform/src/components/recruiter/CreateScreeningModal.tsx

'use client';


import type { Screening } from '@/types/domain';
import { CreateScreeningWizard } from '@/components/recruiter/create-screening/CreateScreeningWizard';
import { Modal } from '@/components/shared/Modal';
import { useScreenings } from '@/hooks/useScreenings';

type CreateScreeningModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateScreeningModal({ open, onClose }: CreateScreeningModalProps) {
  const { persistNewScreening } = useScreenings();

  const handlePersist = (screening: Screening) => {
    persistNewScreening(screening);
    onClose();
  };

  return (
    <Modal
      panelClassName="max-w-4xl"
      open={open}
      title="Create phone screening blueprint"
      onClose={onClose}
    >
      <CreateScreeningWizard onPersistScreening={handlePersist} />
    </Modal>
  );
}
