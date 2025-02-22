import PersonalInfoInput from '@/components/ui/detail-inputs/personal-info-input';
import { useAppDispatch } from '@/store/hooks';
import { updateProfile } from '@/store/slices';
import { UserDetails } from '@/types/userDetails';

export default function PersonalInfoSection() {
  const dispatch = useAppDispatch();

  const handlePersonalInfoChange = (updatedPersonalInfo: Partial<UserDetails['personalInfo']>) => {
    dispatch(updateProfile(updatedPersonalInfo));
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Personal Info</h2>
      <PersonalInfoInput onChange={handlePersonalInfoChange} />
    </div>
  );
}
