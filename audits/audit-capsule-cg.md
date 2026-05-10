# Audit pédagogique - Capsule CG mardi 12 mai 2026

**Document interne CADP - À destination de Kévin Vidard**
**Capsule** : `capsule-cg-mardi.html`
**Cible** : BTS NDRC 2A - Promo 2426
**Épreuve cible** : E1 Culture Générale et Expression - mardi 12 mai 2026, 8h-12h
**Thème national 2026** : *Les animaux et nous : imaginer, connaître, comprendre l'animal* (BO n°17 du 24 avril 2025, MENS2508196N)

---

## 1. Cadrage du livrable

### 1.1 Décisions de cadrage validées

| Paramètre | Valeur retenue |
|-----------|----------------|
| Format général | Capsule web autonome, auto-corrigée, déployable sur GitHub Pages |
| Architecture | 4 phases différenciées |
| Mécanique blocage QCM | Indice progressif sur 4 essais (cohérence avec capsule CEJM) |
| Densité QCM | 20 thématiques + 15 méthodologie + 15 sur textes-ressources = **50 QCM** |
| Densité productions | 3 ouvertes thématiques + 3 méthodologie + 3 analyses de textes + 3 préparatoires + 1 sujet d'écriture = **13 productions ouvertes** |
| Anti-bâclage | Tirage aléatoire phases 1-2 + seuils de mots + alerte 30 min minimale |
| Charte | CADP standard (Navy #0B1929, Or #C9A84C, Playfair Display + Source Sans 3) |
| Adresse mailto récap | `kevin.vidard@cadp.pro` |
| Identification | LocalStorage, modale d'identification au lancement |
| Persistance | LocalStorage incrémental (clé `cadp-ndrc-cg-*`) |

### 1.2 Décision spécifique pour la phase 3

Contrairement aux phases 1 et 2 où les QCM sont tirés au sort dans un pool plus large, **les QCM de la phase 3 sont fixes** car attachés aux textes-ressources spécifiques. Cohérence pédagogique : un QCM d'analyse de texte ne peut pas être tiré au sort indépendamment du texte qu'il interroge.

### 1.3 Articulation avec le contenu CG existant

Le repo NDRC contient déjà une **capsule CG E1 synthèse "Les animaux et nous"** produite en avril 2026. La présente capsule du 12 mai est complémentaire, non redondante :

| Capsule existante (avril) | Capsule nouvelle (12 mai) |
|---------------------------|---------------------------|
| Centrée sur la **synthèse** de documents | Couvre la synthèse ET l'écriture personnelle |
| Sujet d'écriture personnelle : *L'animal de compagnie est-il devenu un substitut au lien humain ?* | Sujet d'écriture personnelle : *L'animal n'est-il pour l'homme qu'un miroir de lui-même ?* |
| Approche par dossiers de documents | Approche par textes-ressources synthétiques + travail méthodologique structuré |

Aucune redondance volumétrique. Les deux capsules peuvent s'utiliser en alternance ou en complément.

---

## 2. Architecture pédagogique

### 2.1 Phase 1 - Connaissances thématiques (60 min cible)

**Pool de 30 QCM thématiques (T01-T30)**, **tirage aléatoire de 20**.

Couverture :
- **Bibliographie BO 2026** intégrée explicitement : Cyrano de Bergerac (T01), Descartes/animal-machine (T02), Kundera/Karénine (T03), Ponge/Le Parti pris des choses (T04), Deleuze/devenir-animal (T05), Pastoureau (T06), Rosa Bonheur (T15), Pierre Bonnard (T16), Politix La Question animale (T26)
- **Concepts philosophiques** : anthropocentrisme (T07), anthropomorphisme (T08), Bentham/sensibilité (T09), Singer/spécisme (T10), Derrida/visage de l'animal (T21)
- **Histoire culturelle** : Actéon (T11), La Fontaine (T12), Plaute/Hobbes/loup (T14), Arche de Noé (T24), Aristote/zoon politikon (T28)
- **Langage** : expressions péjoratives (T13, T27)
- **Statut juridique** : article 515-14 du Code civil (T22)
- **Éthique animale contemporaine** : Élisabeth de Fontenay (T18), Florence Burgat (T23), Donna Haraway (T29)
- **Représentation artistique** : Miyazaki (T19), Franz Marc (T30), Bonheur (T15), Bonnard (T16)
- **Notions techniques** : zoonose (T20), bien-être animal (T17), éthologie (T25)

**3 questions ouvertes thématiques (150 mots min chacune)** :
1. Langage et expressions péjoratives - ce qu'elles révèlent
2. Animal comme miroir / emblème / repoussoir (cite explicitement la formule du BO)
3. Statut juridique 515-14 - effet pratique ?

### 2.2 Phase 2 - Méthodologie (60 min cible)

**Pool de 22 QCM méthodologiques (M01-M22)**, **tirage aléatoire de 15**.

Couverture :
- **Cadre formel de l'épreuve** : durée 4h (M01), barème 40/20 (M02), gestion temps (M03)
- **Synthèse de documents** : structure (M04), neutralité/objectivité (M05), références aux documents (M06), introduction (M07), problématique (M13), tableau de confrontation (M14), paragraphes (M15), proportion intro/conclusion (M19)
- **Écriture personnelle** : longueur 600 mots (M08), nature argumentative (M09), nombre d'arguments (M10), références culturelles (M11), citation correcte (M12), articulation avec corpus (M16), erreur autobiographique (M17), accroche (M18), pertinence/illustration (M20), connecteurs (M22)
- **Relecture** : phase finale (M21)

**3 questions ouvertes méthodologiques (150 mots min chacune)** :
1. Construction d'une problématique solide pour la synthèse
2. Intégrer une référence sans étalage (avec mauvais et bon exemple)
3. Gestion du temps détaillée sur 4h

### 2.3 Phase 3 - Analyse de textes-ressources (75 min cible)

**3 textes originaux signés par auteurs fictifs** (cohérence copyright avec la pratique CADP).

| Texte | Angle | Auteur fictif | Source fictive | Densité |
|-------|-------|---------------|----------------|---------|
| 1. *Le miroir trouble* | Anthropologique | Marguerite Vassal | Éditions des Sentes, 2024 | 5 QCM + 1 analyse 200 mots |
| 2. *Le bœuf de l'aube* | Éthique alimentaire | Théo Lambert | La Pensée Vive éditions, 2023 | 5 QCM + 1 analyse 200 mots |
| 3. *L'oiseau de la fenêtre* | Littéraire-poétique | Aurélien Bréville | Éditions des Saisons Vives, 2022 | 5 QCM + 1 analyse 200 mots |

**Structure de chaque texte** :
- Texte d'environ 250-330 mots (longueur réaliste pour un extrait dans un corpus de synthèse)
- 5 QCM d'analyse (compréhension globale, repérage de concept, structure argumentative, référence interne, conclusion)
- 1 question ouverte d'analyse approfondie avec éléments de correction structurés (références mobilisables)

**Variété des angles** :
- Texte 1 = approche anthropologique : Nagel, anthropomorphisme, altérité
- Texte 2 = approche éthique-politique : invisibilité de la mise à mort, responsabilité de la consommation
- Texte 3 = approche littéraire : Ponge, attention partagée, refus simultané de l'anthropomorphisme et de l'indifférence cartésienne

**Verrouillage cascade** : un QCM est verrouillé tant que le précédent n'est pas résolu. Le texte 2 est inaccessible avant la résolution complète du texte 1, etc. Cohérence avec la mécanique des phases 1 et 2 (verrouillage par cascade).

### 2.4 Phase 4 - Sujet d'écriture personnelle (45 min cible)

**3 questions préparatoires (150 mots min)** :
1. Inventaire des fonctions assignées aux animaux dans la culture (miroir/emblème/repoussoir/objet de science/compagnon/victime/énigme)
2. Limites de la thèse "l'animal n'est qu'un miroir" - 3 objections argumentées
3. Position personnelle nuancée (avec exemples de positions possibles)

**1 sujet d'écriture personnelle structuré (350 mots min)** :
- **Sujet** : *L'animal n'est-il pour l'homme qu'un miroir de lui-même ?*
- **Citation d'amorce** : la formule exacte du BO 2026 ("L'homme n'a cessé de rêver les animaux qui l'entourent comme autant de miroirs, d'emblèmes voire de repoussoirs de lui-même.")
- **Critères affichés** : structure introduction/développement/conclusion, références culturelles, position argumentée
- **Corrigé-type complet** : introduction modèle, plan en 3 axes développé, conclusion modèle, conseil pédagogique méta

---

## 3. Mécaniques pédagogiques

### 3.1 QCM bloquants à indice progressif (cohérence CEJM)

Identique à la capsule CEJM lundi : 4 essais maximum avec progression :
- Essai 1 : message d'erreur simple
- Essai 2 : élimination automatique d'une mauvaise réponse
- Essai 3 : indice ciblé propre à la question
- Essai 4 : dévoilement de la bonne réponse + explication développée

### 3.2 Verrouillage cascade

**Phases 1 et 2** : verrouillage classique (QCM N+1 inaccessible tant que QCM N non résolu).
**Phase 3** : verrouillage à deux niveaux (entre les QCM d'un même texte ET entre les textes successifs).
**Phase 4** : pas de verrouillage entre les questions préparatoires (l'étudiant peut les traiter dans l'ordre qu'il préfère). Le sujet final est accessible librement.

### 3.3 Compteurs de mots et seuils

| Production | Seuil minimum |
|------------|---------------|
| Questions ouvertes thématiques | 150 mots |
| Questions ouvertes méthodologiques | 150 mots |
| Analyses de textes | 200 mots |
| Questions préparatoires | 150 mots |
| Sujet d'écriture personnelle | 350 mots |

Les seuils sont signalés visuellement par couleur (rouge sous le seuil, jaune intermédiaire, vert au-dessus).

### 3.4 Anti-bâclage temporel

Cohérence avec la capsule CEJM : alerte si tentative de passage à la phase suivante en moins de 30 minutes, avec confirmation à deux clics.

### 3.5 Sauvegarde et restauration

LocalStorage incrémental avec clés CG-spécifiques :
- `cadp-ndrc-cg-selection` : tirage aléatoire mémorisé
- `cadp-ndrc-cg-etat` : état des QCM et productions
- `cadp-ndrc-cg-phase-N-completed` : phases déjà validées

L'étudiant peut fermer et revenir : le tirage aléatoire reste identique, ses réponses sont conservées, son progrès est restauré.

### 3.6 Mailto récapitulatif

Génération automatique d'un email vers `kevin.vidard@cadp.pro` avec :
- Identification (nom, prénom, classe, date)
- Compteurs (QCM résolus / 50, QCM dès le 1er essai / 50, productions validées / 13)
- Texte intégral des productions (questions ouvertes thématiques, méthodologiques, analyses de textes, questions préparatoires, sujet d'écriture)

---

## 4. Auto-critique pédagogique

### 4.1 Trois forces de la capsule

**Force 1 - Couverture exhaustive de la bibliographie BO 2026.** Tous les auteurs et œuvres cités dans le BO du 24 avril 2025 sont mobilisés au moins une fois dans le pool thématique : Cyrano, Descartes, Kundera, Ponge, Deleuze, Pastoureau, Rosa Bonheur, Bonnard, Politix La Question animale, et les expressions populaires citées explicitement. Si un étudiant fait sérieusement la phase 1, il aura mobilisé en mémoire l'essentiel des références attendues.

**Force 2 - Méthodologie explicite et opérationnelle.** La phase 2 ne se contente pas de tester des connaissances méthodologiques abstraites : elle propose des questions ouvertes très opérationnelles (comment construire une problématique, comment intégrer une référence, comment gérer son temps). Ces 3 questions ouvertes représentent à elles seules un mémo méthodologique complet.

**Force 3 - Échelle progressive de la phase 3 à la phase 4.** Les textes-ressources de la phase 3 servent explicitement de tremplin pour le sujet d'écriture personnelle de la phase 4. Le texte 1 (anthropologique) prépare à mobiliser la question de l'altérité ; le texte 2 (éthique) prépare à mobiliser la dimension morale ; le texte 3 (littéraire) prépare à mobiliser une posture poétique. L'étudiant qui a sérieusement traité la phase 3 a déjà 90% des références nécessaires pour traiter le sujet final.

### 4.2 Trois fragilités identifiées

**Fragilité 1 - Complexité cognitive de la phase 3.** Lire 3 textes denses, traiter 15 QCM d'analyse, et produire 3 analyses approfondies de 200 mots dans une fenêtre de 75 minutes peut être lourd pour des étudiants moins à l'aise. Atténuation : le verrouillage cascade les empêche de se décourager (ils restent sur le texte 1 jusqu'à le maîtriser), et les QCM sont calibrés sur la compréhension littérale (pas l'interprétation savante).

**Fragilité 2 - Le sujet d'écriture personnelle final fait écho frontal au BO.** Le sujet *L'animal n'est-il pour l'homme qu'un miroir de lui-même ?* mobilise quasi-littéralement la formulation du BO. Cela peut sembler trop facile (l'étudiant attend ce sujet) ou trop difficile (le sujet de l'épreuve réelle pourrait être plus oblique). Atténuation : la consigne et le corrigé-type expliquent comment traiter ce type de sujet général, ce qui est transférable à tout autre sujet sur le thème.

**Fragilité 3 - Densité globale et risque de fatigue.** 50 QCM + 13 productions ouvertes représentent environ 4h de travail (cohérent avec l'épreuve réelle), mais en mode auto-corrigé sur écran, c'est beaucoup. Les étudiants peuvent abandonner en cours. Atténuation : le système de sauvegarde permet de revenir, et la progression visuelle (% par phase) maintient la motivation.

---

## 5. Audit cohérence inter-sections

### 5.1 Cohérence avec la capsule CEJM lundi

| Point | CEJM lundi | CG mardi | Cohérence |
|-------|------------|----------|-----------|
| Mécanique QCM | 4 essais à indice progressif | 4 essais à indice progressif | OK |
| Pool aléatoire | 28 par discipline (tirage 20) | 30 thema / 22 methode (tirage 20/15) | OK proportionnel |
| Anti-bâclage 30 min | Activé | Activé | OK |
| Charte graphique | CADP standard | CADP standard | OK |
| LocalStorage | Clés `cadp-ndrc-cejm-*` | Clés `cadp-ndrc-cg-*` | OK (clés différenciées) |
| Mailto récap | `kevin.vidard@cadp.pro` | `kevin.vidard@cadp.pro` | OK |
| Documents originaux | Univers Roc d'Avise / Crown Cellars | Textes signés par auteurs fictifs | OK (logique cohérente) |
| Bouton final | Score + mailto | Score + mailto | OK |

### 5.2 Cohérence interne CG

| Point | Vérification |
|-------|--------------|
| Pas de redondance avec capsule CG E1 synthèse existante | OK : sujet d'écriture différent, angles différents |
| Bibliographie BO 2026 mobilisée | OK : 9 références BO sur 30 QCM thématiques |
| Verrouillage cascade phase 3 spécifique | OK : `appliquerVerrouillageTextes()` distinct de `appliquerVerrouillage()` |
| Mailto exhaustif (toutes productions remontent) | OK : 13 productions distinctes intégrées |
| Charte CADP respectée | OK : navy/or, Playfair/Source Sans, encadrés |
| Tutoiement | OK : "tu", "ta", "te" partout |
| Pas de pictogrammes Unicode | OK : aucun emoji ni pictogramme |
| Compteurs de mots opérationnels | OK : 13 compteurs autonomes |
| Score final pondéré 50/50 (QCM 1er essai + productions) | OK : `miseAJourScoreFinal()` cohérente |

### 5.3 Vérification syntaxique

- HTML : 5 `<section>` ouverts / 5 fermés, 102 `<div>` ouverts / 102 fermés.
- JS : accolades 242/242, crochets 230/230, parsing Node.js validé sans erreur.
- Aucun placeholder résiduel, aucune référence aux constantes CEJM.

### 5.4 Auto-correction native

Toutes les corrections sont en JavaScript natif, sans aucune dépendance externe. Aucun appel API, aucun coût pour les étudiants. Conformité totale avec l'exigence CADP.

---

## 6. Pistes d'évolution post-épreuve

Si la capsule fonctionne bien et que tu souhaites la faire évoluer pour les promos suivantes :

- **Banque de sujets d'écriture rotative** : produire 3 ou 4 sujets d'écriture personnelle au lieu d'un seul, avec tirage au sort. L'étudiant qui refait la capsule retravaille un autre sujet.
- **Variantes de textes-ressources** : produire 2 ou 3 jeux de textes-ressources tirés au sort, pour casser l'effet de mémorisation entre promos.
- **Module de comparaison entre productions de l'étudiant** : envoi automatique d'un comparatif anonyme avec la médiane de la promo (techniquement complexe, à arbitrer).

Ces évolutions ne sont **pas prioritaires** pour le 12 mai 2026.

---

*Audit produit le 10 mai 2026 - Méthodologie CADP-Claude*
