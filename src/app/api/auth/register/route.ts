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

    if (!email ||!motDePasse ||!prenom ||!nonDeFamille) {
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

    const motDePasseHache = await bcrypt.hash(motDePasse, 12);
    const referenceDeCode = uuidv4().substring(0, 8).toUpperCase();

    const nouvelUtilisateur = await db
    .insert(users)
    .values({
        email: email.toLowerCase(),
        password: motDePasseHache,
        firstName: prenom,
        lastName: nonDeFamille,
        genre,
        age,
        pays,
        ville,
        codeReferral: referenceDeCode,
        consentementTraitement,
      })
    .returning();

    const reponse = NextResponse.json({
      succes: true,
      message: "Inscription réussie! Bienvenue sur Peau de N-zassa 🎉",
      utilisateur: {
        identifiant: nouvelUtilisateur[0].id,
        email: nouvelUtilisateur[0].email,
        prenom: nouvelUtilisateur[0].firstName,
      },
    });

    return reponse;

  } catch (erreur) {
    console.error(erreur);
    return NextResponse.json(
      { erreur: "Une erreur est survenue lors de l'inscription." },
      { status: 500 }
    );
  }
}
