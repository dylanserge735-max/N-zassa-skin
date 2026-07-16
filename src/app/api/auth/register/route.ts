// src/app/api/authentification/registre/route.ts

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
      nomDeFamille,
      genre,
      age,
      pays,
      ville,
      consentementTraitement,
    } = body;

    if (!email ||!motDePasse ||!prenom ||!nomDeFamille) {
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
    const codeReference = uuidv4().substring(0, 8).toUpperCase();

    const nouvelUtilisateur = await db
     .insert(users)
     .values({
        email: email.toLowerCase(),
        motDePasse: motDePasseHache,
        prenom,
        nomDeFamille,
        genre,
        age,
        pays,
        ville,
        codeReference,
        consentementTraitement,
      })
     .returning();

    const reponse = NextResponse.json({
      succes: true,
      message: "Inscription réussie! Bienvenue sur Peau de N-zassa 🎉",
      utilisateur: {
        identifiant: nouvelUtilisateur[0].id,
        email: nouvelUtilisateur[0].email,
        prenom: nouvelUtilisateur[0].prenom,
        nomDeFamille: nouvelUtilisateur[0].nomDeFamille,
      },
    });

    reponse.cookies.set("session", nouvelUtilisateur[0].id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return reponse;

  } catch (erreur) {
    console.error("Erreur d'inscription :", erreur);
    const message = erreur instanceof Error? erreur.message : "Erreur inconnue";

    return NextResponse.json(
      {
        erreur: "Une erreur est survenue lors de l'inscription.",
        detail: process.env.NODE_ENV!== "production"? message : undefined,
        message: ""
      },
      { status: 500 }
    );
  }
}
