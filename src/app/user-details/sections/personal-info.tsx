'use client';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { TagsInput } from '@/components/ui/tags-input';
import { useUpdateUserDetailsMutation } from '@/store/services/userDetailsApi';
import { useGetPersonalInfoQuery } from '@/store/services/personalInfoApi';

interface IProps {
  userId: string;
}
const formSchema = z.object({
  fullName: z.string().min(1),
  email: z.string(),
  phone: z.string(),
  dob: z.string().min(1).optional(),
  address: z.string().min(1).max(100).optional(),
  linkedin: z.string().min(1).optional(),
  github: z.string().min(1).optional(),
  twitter: z.string().min(1).optional(),
  portfolio: z.string().min(1).optional(),
  skills: z.array(z.string()).nonempty('Please at least one item').optional(),
  languages: z.array(z.string()).nonempty('Please at least one item').optional(),
});

export default function PersonalInfoSection({ userId }: IProps) {
  const [formInitialized, setFormInitialized] = useState(false);
  const [updatePersonalInfo] = useUpdateUserDetailsMutation();
  const { data: userData, isLoading, error, isSuccess } = useGetPersonalInfoQuery(userId);

  console.log('userData', userData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: ['reacjs', 'golang'],
      languages: ['english', 'spanish'],
    },
  });
  useEffect(() => {
    if (userData) {
      console.log('User data received:', userData);
    }
  }, [userData]);
  useEffect(() => {
    if (isSuccess && userData && userData.personalInfo && !formInitialized) {
      const personalInfo = userData.personalInfo;
      console.log('Setting form values with:', personalInfo);

      // Make sure we have default arrays if data is missing
      const skills = Array.isArray(personalInfo.skills)
        ? personalInfo.skills
        : ['reactjs', 'golang'];
      const languages = Array.isArray(personalInfo.languages)
        ? personalInfo.languages
        : ['english', 'spanish'];

      form.reset({
        fullName: personalInfo.fullName || '',
        email: personalInfo.email || '',
        phone: personalInfo.phone || '',
        dob: personalInfo.dob || '',
        address: personalInfo.address || '',
        linkedin: personalInfo.linkedin || '',
        github: personalInfo.github || '',
        twitter: personalInfo.twitter || '',
        portfolio: personalInfo.portfolio || '',
        skills,
        languages,
      });

      setFormInitialized(true);
    }
  }, [userData, isSuccess, form, formInitialized]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('userId', userId);
      console.log(values);
      await updatePersonalInfo({
        clerk_id: userId,
        personalInfo: values,
      });
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Personal Info</h2>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-3xl space-y-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon Doe" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Enter your fullname</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jhondoe@email.com" type="email" {...field} />
                  </FormControl>
                  <FormDescription>Enter your email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput placeholder="620xxxxxxx" {...field} defaultCountry="IN" />
                  </FormControl>
                  <FormDescription>Enter your phone number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DOB</FormLabel>
                  <FormControl>
                    <Input placeholder="01/02/2003" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Enter your DOB</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="6th Lane, NYC" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Enter your address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Linkedin</FormLabel>
                      <FormControl>
                        <Input placeholder="linkedin.com/in/username" type="text" {...field} />
                      </FormControl>
                      <FormDescription>Enter your linkedin</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Github</FormLabel>
                      <FormControl>
                        <Input placeholder="github.com/username" type="text" {...field} />
                      </FormControl>
                      <FormDescription>Enter your github</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>X</FormLabel>
                      <FormControl>
                        <Input placeholder="x.com/username" type="text" {...field} />
                      </FormControl>
                      <FormDescription>Enter your X</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="portfolio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio</FormLabel>
                      <FormControl>
                        <Input placeholder="someurl.com" type="text" {...field} />
                      </FormControl>
                      <FormDescription>Enter your portfolio</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Enter your tags"
                    />
                  </FormControl>
                  <FormDescription>Enter your skills</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="languages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Languages know</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Enter your tags"
                    />
                  </FormControl>
                  <FormDescription>Enter your languages</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}