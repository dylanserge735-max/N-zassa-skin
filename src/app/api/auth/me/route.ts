import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get('session')?.value;

    if (!session) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const userResult = await db.select().from(users).where(eq(users.uuid, session)).limit(1);
    
    if (userResult.length === 0) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 401 }
      );
    }

    const user = userResult[0];

    return NextResponse.json({
      user: {
        id: user.id,
        uuid: user.uuid,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        age: user.age,
        country: user.country,
        city: user.city,
        profileImage: user.profileImage,
        referralCode: user.referralCode,
        loyaltyPoints: user.loyaltyPoints,
        isAdmin: user.isAdmin,
        isVendor: user.isVendor,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}
