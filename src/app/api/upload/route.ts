import { NextRequest, NextResponse } from 'next/server';
import cloudinary, { uploadOptions } from '@/lib/cloudinary';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
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

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string || 'skinAnalysis';

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Le fichier doit être une image' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'L\'image ne doit pas dépasser 10MB' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Get upload options based on type
    const options = uploadOptions[type as keyof typeof uploadOptions] || uploadOptions.skinAnalysis;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      ...options,
      public_id: `${user.id}_${Date.now()}`,
      resource_type: 'image',
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload de l\'image' },
      { status: 500 }
    );
  }
}

// Delete an image from Cloudinary
export async function DELETE(request: NextRequest) {
  try {
    const session = request.cookies.get('session')?.value;
    if (!session) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'ID de l\'image non fourni' },
        { status: 400 }
      );
    }

    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'image' },
      { status: 500 }
    );
  }
}
