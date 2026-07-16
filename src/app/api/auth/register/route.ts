// src/app/api/auth/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      email,
      motDePasse,
      prenom,
      nonDeFamille,
      genre,
      age,
      pays,
      ville,
      consentementTraitement,
    } = body;

    if (!email || !motDePasse || !prenom || !nonDeFamille) {
      return NextResponse.json(
        { erreur: "Veuillez remplir tous les champs obligatoires.", message: "" },
        { status: 400 }
      );
    }

    const utilisateurExistant = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()));

    if (utilisateurExistant.length > 0) {
      return NextResponse.json(
        { erreur: "Un compte existe déjà avec cette adresse e-mail.", message: "" },
        { status: 400 }
      );
    }

    const motDe
