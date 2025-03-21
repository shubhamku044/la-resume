import AccomplishmentsInput from '@/components/ui/detail-inputs/AccomplishmentsInput';
import { UserDetails } from '@/types/userDetails';

interface AccomplishmentsSectionProps {
  userDetails: UserDetails;
  setUserDetails: (details: UserDetails) => void;
}

export default function AccomplishmentsSection({
  userDetails,
  setUserDetails,
}: AccomplishmentsSectionProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Accomplishments & Certifications</h2>
      <AccomplishmentsInput
        accomplishments={userDetails.accomplishments || []}
        certifications={userDetails.certifications || []}
        onAccomplishmentsChange={(accomplishments) =>
          setUserDetails({ ...userDetails, accomplishments })
        }
        onCertificationsChange={(certifications) =>
          setUserDetails({ ...userDetails, certifications })
        }
      />
    </div>
  );
}
