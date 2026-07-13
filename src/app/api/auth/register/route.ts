import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, gender, age, country, city, consentDataProcessing } = body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);
    
    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'Un compte existe déjà avec cette adresse e-mail' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate referral code
    const referralCode = uuidv4().substring(0, 8).toUpperCase();

    // Create user
    const newUser = await db.insert(users).values({
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      gender,
      age,
      country,
      city,
      referralCode,
      consentDataProcessing,
    }).returning();

    // Create response with session cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser[0].id,
        email: newUser[0].email,
        firstName: newUser[0].firstName,
        lastName: newUser[0].lastName,
      },
    });

    // Set session cookie
    response.cookies.set('session', newUser[0].uuid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    );
  }
}
