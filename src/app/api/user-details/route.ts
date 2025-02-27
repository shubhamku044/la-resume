import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const clerkId = req.nextUrl.searchParams.get('clerk_id');
    if (!clerkId) {
      return NextResponse.json({ error: 'Missing clerk_id' }, { status: 400 });
    }

    const userDetails = await prisma.user.findUnique({
      where: { clerk_id: clerkId },
      include: {
        PersonalInfo: true,
        skills: true,
        education: true,
        experience: true,
        accomplishments: true,
        certifications: true,
        projects: true,
      },
    });

    if (!userDetails) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(userDetails, { status: 200 });
  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { clerk_id, email, first_name, last_name, avatar_url, personalInfo } = await req.json();

    let user = await prisma.user.findUnique({
      where: { clerk_id },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerk_id,
          email,
          first_name,
          last_name,
          avatar_url,
        },
      });
      return NextResponse.json({ error: 'Missing clerk_id' }, { status: 400 });
    }

    console.log('personalInfo', personalInfo);

    if (personalInfo) {
      const { skills, ...personalInfoData } = personalInfo;

      const personalInfoEntry = await prisma.personalInfo.upsert({
        where: { userId: user.id },
        update: personalInfoData,
        create: { ...personalInfoData, userId: user.id },
      });

      console.log('Skills', skills);

      if (skills && skills.length > 0) {
        for (const skillName of skills) {
          let skill = await prisma.skills.findUnique({
            where: {
              name: skillName,
            },
          });

          if (!skill) {
            skill = await prisma.skills.create({ data: { name: skillName } });
          }

          await prisma.userSkills.upsert({
            where: {
              userId_skillId: {
                userId: user.id,
                skillId: skill.id,
              },
            },
            update: {},
            create: {
              userId: user.id,
              skillId: skill.id,
            },
          });
        }
      }

      /*
      if (skills && skills.length > 0) {
        for (const skillName of skills) {
          // let skill = await prisma.skills.findUnique({ where: { name: skillName } });
          if (!skill) {
            skill = await prisma.skills.create({ data: { name: skillName } });
          }

          await prisma.userSkills.upsert({
            where: {
              userId_skillId: {
                userId: user.id,
                skillId: skill.id,
              },
            },
            update: {},
            create: {
              userId: user.id,
              skillId: skill.id,
            },
          });
        }
      }
      */

      return NextResponse.json(personalInfoEntry, { status: 201 });
    }

    return NextResponse.json({});
  } catch (error) {
    console.error('Error updating user details:', error);
    return NextResponse.json({ error: 'Internal server error', message: error }, { status: 500 });
  }
}