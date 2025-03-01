'use client';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { format, parseISO, parse } from 'date-fns';
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
import {
  useGetPersonalInfoQuery,
  useUpdatePersonalInfoMutation,
} from '@/store/services/personalInfoApi';
import { useUser } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';

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

export default function PersonalInfo() {
  const { user, isLoaded: isClerkLoaded } = useUser();
  const userId = user?.id;
  const [formInitialized, setFormInitialized] = useState(false);

  const [updatePersonalInfo] = useUpdatePersonalInfoMutation();
  const {
    data: userData,
    isSuccess,
    isLoading: isQueryLoading,
  } = useGetPersonalInfoQuery(userId!, { skip: !userId, refetchOnMountOrArgChange: true });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      dob: '',
      address: '',
      linkedin: '',
      github: '',
      twitter: '',
      portfolio: '',
      skills: ['reactjs', 'golang'],
      languages: ['english', 'spanish'],
    },
  });

  useEffect(() => {
    if (isSuccess && userId && !formInitialized) {
      const defaultValues = {
        fullName: user?.fullName || '',
        email: user?.primaryEmailAddress?.emailAddress || '',
        phone: '',
        dob: '',
        address: '',
        linkedin: '',
        github: '',
        twitter: '',
        portfolio: '',
        skills: ['reactjs', 'golang'],
        languages: ['english', 'spanish'],
      };

      if (userData) {
        const skills = Array.isArray(userData.skills) ? userData.skills : ['reactjs', 'golang'];
        const languages = Array.isArray(userData.languages)
          ? userData.languages
          : ['english', 'spanish'];

        form.reset({
          ...defaultValues,
          fullName: userData.fullName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          dob: userData.dob ? format(parseISO(userData.dob), 'dd/MM/yyyy') : '',
          address: userData.address || '',
          linkedin: userData.linkedin || '',
          github: userData.github || '',
          twitter: userData.twitter || '',
          portfolio: userData.portfolio || '',
          skills,
          languages,
        });
      } else {
        form.reset(defaultValues);
      }

      setFormInitialized(true);
    }
  }, [userData, isSuccess, form, formInitialized, userId, user]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formattedDob = values.dob
        ? parse(values.dob, 'dd/MM/yyyy', new Date()).toISOString()
        : undefined;

      if (userId)
        await updatePersonalInfo({
          clerk_id: userId,
          ...values,
          dob: formattedDob,
        });
    } catch (error) {
      toast.error('Failed to submit the form. Please try again.');
      console.error('Error in submitting the form', error);
    }
  }

  const isLoading = !isClerkLoaded || !userId || isQueryLoading;

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-4 text-xl font-bold">Personal Info</h2>
        <div className="mx-auto max-w-3xl space-y-2">
          <FormSkeleton />
        </div>
      </div>
    );
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
                      value={field.value as string[]}
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
                      value={field.value as string[]}
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

function FormSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-[200px]" />
      <div className="space-y-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <div className="flex flex-wrap gap-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-full" />
            ))}
          </div>
        </div>
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}
