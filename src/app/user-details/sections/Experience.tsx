import ExperienceInput from '@/components/ui/detail-inputs/ExperienceInput';
import { UserDetails } from '@/types/userDetails';

interface ExperienceSectionProps {
  userDetails: UserDetails;
  setUserDetails: (details: UserDetails) => void;
}

export default function ExperienceSection({ userDetails, setUserDetails }: ExperienceSectionProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Work Experience</h2>
      <ExperienceInput
        experience={userDetails.experience || []}
        onChange={(value) => setUserDetails({ ...userDetails, experience: value })}
      />
    </div>
  );
}
