export const resumes = {
  classic: {
    name: 'Classic Resume',
    description: 'A traditional resume format with a clean layout.',
    sections: {
      personal_info: {
        label: 'Personal Info',
        fields: ['name', 'email', 'phone', 'linkedin'],
      },
      education: {
        label: 'Education',
        fields: [
          {
            degree: 'degree',
            university: 'university',
            year: 'year',
          },
        ],
      },
      experience: {
        label: 'Experience',
        fields: [
          {
            job_title: 'job_title',
            company: 'company',
            duration: 'duration',
          },
        ],
      },
      skills: {
        label: 'Technical Skills',
        fields: ['programming_languages', 'databases', 'frameworks', 'developer_tools'],
      },
      projects: {
        label: 'Projects',
        fields: [
          {
            project_name: 'project_name',
            project_url: 'project_url',
            project_description: 'project_description',
          },
        ],
      },
      honors_awards: {
        label: 'Honors & Awards',
        fields: [
          {
            award_title: 'award_title',
            award_description: 'award_description',
          },
        ],
      },
    },
    image: '/templates/classic.jpeg',
    previewComponent: 'ClassicResumePreview',
    latex_template: '/latex/classic_template.tex',
  },
} as const

export type ResumeTemplateKey = keyof typeof resumes
