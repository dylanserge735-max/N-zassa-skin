import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users, skinAnalyses } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

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

    const analysisResult = await db
      .select()
      .from(skinAnalyses)
      .where(eq(skinAnalyses.userId, userResult[0].id))
      .orderBy(desc(skinAnalyses.analysisDate))
      .limit(1);

    if (analysisResult.length === 0) {
      return NextResponse.json({ analysis: null });
    }

    return NextResponse.json({ analysis: analysisResult[0] });
  } catch (error) {
    console.error('Error fetching analysis:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}
