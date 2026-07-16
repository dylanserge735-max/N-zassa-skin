// src/app/api/authentification/registre/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";                      // ✅ Fix #1 : bon import Drizzle
import { users } from "@/db/schema";            // ✅ Fix #1 : bon import schema
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ✅ Fix #2 : variables sans espaces (camelCase)
    const {
      email,
      motDePasse,
      prenom,
      nomDeFamille,
      genre,
      age,
      pays,
      ville,
      consentementTraitement,   // était : "consentement au traitement des données"
    } = body;

    // Valider les champs obligatoires
    if (!email || !motDePasse || !prenom || !nomDeFamille) {
      return NextResponse.json(
        { erreur: "Veuillez remplir tous les champs obligatoires." },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const utilisateurExistant = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()));

    if (utilisateurExistant.length > 0) {
      return NextResponse.json(
        { erreur: "Un compte existe déjà avec cette adresse e-mail." },
        { status: 400 }
      );
    }

    // Hacher le mot de passe
    const motDePasseHache = await bcrypt.hash(motDePasse, 12);

    // Générer un code de parrainage
    const codeReference = uuidv4().substring(0, 8).toUpperCase();

    // Créer un utilisateur
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
        consentementTraitement,   // ✅ Fix #2 : plus d'espaces
      })
      .returning();

    // Créer une réponse avec cookie de session
    const reponse = NextResponse.json({
      succes: true,
      utilisateur: {
        identifiant: nouvelUtilisateur[0].id,
        email: nouvelUtilisateur[0].email,
        prenom: nouvelUtilisateur[0].prenom,
        nomDeFamille: nouvelUtilisateur[0].nomDeFamille,
      },
    });

    // Définir le cookie de session
    reponse.cookies.set("session", nouvelUtilisateur[0].id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 jours
      path: "/",
    });

    return reponse;

  } catch (erreur) {
    // ✅ Fix #3 : on renvoie le vrai message d'erreur
    console.error("Erreur d'inscription :", erreur);

    const message =
      erreur instanceof Error ? erreur.message : "Erreur inconnue";

    return NextResponse.json(
      {
        erreur: "Une erreur est survenue lors de l'inscription.",
        detail: process.env.NODE_ENV !== "production" ? message : undefined,
      },
      { status: 500 }
    );
  }
}
