# Audit pédagogique - Capsule CEJM lundi 11 mai 2026

**Capsule** : Révision E3 CEJM - QCM bloquants à indice progressif
**Promotion** : BTS NDRC 2A - Promo 2426
**Fichier** : `capsule-cejm-lundi.html` (115 ko)
**Production** : 10 mai 2026 par Claude pour Kévin Vidard - CADP

---

## 1. Cadrage validé en début de session

| Point | Décision |
|---|---|
| Format | QCM bloquants à indice progressif (4 essais max) + questions ouvertes pédagogiques + mini-cas + cas transverse |
| Pondération CEJM | 33 / 33 / 33 (Économie / Droit / Management) |
| Densité | 60 QCM bloquants + 9 ouvertes + 3 mini-cas + 1 cas transverse |
| Anti-bâclage | Combiné : tirage aléatoire dans pool de 84 / minimum mots sur ouvertes / alerte temps souple à 30 min |
| Univers narratif | Personnages NDRC connus de la promo (Domaine du Roc d'Avise à Mercurol-Veaunes, Élise Forestier, Mathéo Roussel, Crown Cellars Ltd, James Whitaker) |
| Charte | CADP standard (Navy / Or / Playfair / Source Sans 3) |
| Mailto récap | `kevin.vidard@cadp.pro` |

---

## 2. Architecture pédagogique

### 2.1 Phase 1 - Économie (75 min)

- **20 QCM bloquants** tirés au sort dans un pool de 28 questions couvrant : marchés et concurrence, intervention publique, monnaie et BCE, PIB et croissance, chômage, mondialisation, RSE, économie circulaire, politique de l'offre vs demande, FMN, PME.
- **3 questions ouvertes** (150 mots minimum chacune) :
  1. Pourquoi l'État intervient-il dans l'économie de marché ? (avec aide structurée : défaillances de marché → fonctions de Musgrave)
  2. Quels sont les enjeux et limites de la mondialisation pour l'économie française ?
  3. En quoi la transformation numérique modifie-t-elle l'économie et les modèles d'affaires ?
- **1 mini-cas** (200 mots minimum) : *Le Domaine du Roc d'Avise face à la concurrence internationale*. Mobilise les concepts d'avantages comparatifs, de compétitivité prix vs hors-prix, d'élasticité-prix, et oriente vers une stratégie de différenciation.

### 2.2 Phase 2 - Droit (75 min)

- **20 QCM bloquants** tirés au sort dans un pool de 28 questions couvrant : hiérarchie des normes, conditions du contrat, responsabilité civile, juridictions (Tribunal de commerce, Conseil de prud'hommes), droit du travail (CDD, clause de non-concurrence), RGPD, droit de la consommation (rétractation, garanties, clauses abusives), propriété intellectuelle (brevet, droit d'auteur, marque), formes juridiques (SARL), force majeure, abus de position dominante.
- **3 questions ouvertes** :
  1. Comment le droit français protège-t-il le consommateur ? (information, rétractation, garanties, clauses abusives, pratiques déloyales)
  2. Quelles sont les obligations RGPD d'une entreprise ?
  3. Qu'est-ce que la clause de non-concurrence et à quelles conditions est-elle valable ?
- **1 mini-cas** : *Mathéo Roussel et la clause de non-concurrence chez Crown Cellars Ltd*. Application pratique des 5 conditions de validité avec une clause manifestement nulle (absence de contrepartie, durée excessive, activités floues).

### 2.3 Phase 3 - Management (75 min)

- **20 QCM bloquants** tirés au sort dans un pool de 28 questions couvrant : gouvernance et parties prenantes (Freeman), stratégies génériques de Porter, SWOT, RSE et développement durable, culture d'entreprise (Schein), management participatif, structures organisationnelles (hiérarchique, matricielle), avantage concurrentiel et VRIO, GPEC, KPI, chaîne de valeur, innovation incrémentale vs disruptive, bilan social, stratégie émergente (Mintzberg), fusions-acquisitions, BCG, leadership transformationnel, Maslow, diversification, externalisation, MBO (Drucker), coopétition, transformation digitale.
- **3 questions ouvertes** :
  1. En quoi la prise en compte des parties prenantes modifie-t-elle la stratégie ?
  2. Comment concilier performance économique et démarche RSE ?
  3. Quels sont les enjeux managériaux de la transformation digitale pour les équipes commerciales ?
- **1 mini-cas** : *Pivot stratégique au Domaine du Roc d'Avise : tensions managériales*. Cartographie des parties prenantes, stratégie de différenciation focalisée Premium, conduite du changement.

### 2.4 Phase 4 - Cas transverse (15 min)

**Crown Cellars Ltd, l'export et l'enjeu RSE** : 300 mots minimum, mobilise simultanément les trois disciplines :
- Économique : Brexit, diversification d'approvisionnement, avantages comparatifs
- Juridique : devoir de vigilance, risques réputationnels et contractuels, RGPD
- Managérial : conduite du changement, parties prenantes, leadership transformationnel

C'est exactement le format attendu à l'épreuve E3 CEJM : croiser les regards économique, juridique et managérial sur une situation complète.

---

## 3. Mécanique du QCM bloquant à indice progressif

| Essai | Comportement |
|---|---|
| 1 | Si erreur : message "Pas la bonne réponse" + une mauvaise option grisée |
| 2 | Si erreur : indice "j'élimine une autre mauvaise réponse" + option grisée |
| 3 | Si erreur : indice spécifique à la question (champ `indice` du JSON) |
| 4 | Dévoilement de la bonne réponse + explication complète. Question débloquée pour la suivante. |

**Vérouillage cascade** : impossible de répondre à la question N+1 tant que la question N n'est pas résolue (ou dévoilée après 4 essais).

---

## 4. Mécaniques anti-bâclage

| Mécanisme | Détail |
|---|---|
| **Tirage aléatoire** | 60 QCM tirés au sort dans 84 (pool 28 par discipline). Une seconde session ne tombera pas sur les mêmes questions. Pas de mémorisation utile. |
| **Compteur de mots** | Toutes les productions ouvertes ont un seuil minimum (150 / 200 / 300 mots). Tant que non atteint, la zone est marquée "non validée" (pas de blocage strict mais visualisation du score). |
| **Alerte temps souple** | Si tentative de passage à la phase suivante en moins de 30 min, alerte popup "Es-tu sûr d'avoir terminé ?" demandant 2 clics de confirmation. |
| **Sauvegarde localStorage** | Progression conservée à chaque action. L'étudiante peut fermer et reprendre. |
| **Score consolidé** | Note finale 50% QCM (réussis dès le 1er essai) + 50% productions validées. Les bachage se reflète dans le score. |

---

## 5. Cohérence narrative avec les capsules NDRC précédentes

L'univers fictif réutilise les personnages déjà connus de la promo 2426 :

- **Domaine du Roc d'Avise** (Mercurol-Veaunes, Drôme) : vignoble familial AOC Crozes-Hermitage. Présent dans le mini-cas Économie et le mini-cas Management.
- **Élise Forestier** : responsable export du Domaine. Présente dans les mini-cas Économie et Management.
- **Mathéo Roussel** : commercial export. Personnage central du mini-cas Droit.
- **Crown Cellars Ltd** : négociant britannique de vins français, cliente puis employeuse de Mathéo. Présente dans les mini-cas Droit et le cas transverse.
- **James Whitaker** : directeur de Crown Cellars Ltd. Présent dans le mini-cas Droit et le cas transverse.

Cette continuité renforce l'engagement (les étudiantes retrouvent un univers familier) et crédibilise les situations.

---

## 6. Forces et fragilités

### Trois forces

1. **Anti-bâclage robuste** : tirage aléatoire + compteur de mots + alerte temps + verrouillage progressif. Difficile de finir vite sans avoir vraiment travaillé.
2. **Pédagogie de l'erreur** : le QCM bloquant à indice progressif transforme chaque erreur en opportunité d'apprentissage. L'étudiante n'est pas punie d'avoir eu faux, elle est guidée vers la bonne réponse.
3. **Cohérence avec l'épreuve E3** : le cas transverse final reproduit exactement le format attendu à l'oral E3 (analyse mobilisant les 3 disciplines sur une situation d'entreprise réelle).

### Trois fragilités à surveiller

1. **Charge cognitive** : 60 QCM + 9 ouvertes + 3 mini-cas + 1 cas transverse, c'est dense pour 4h. Si une étudiante bloque sur les premières questions de la phase 1, elle peut prendre du retard. Le verrouillage cascade peut alors devenir frustrant. **Recommandation** : tu peux suggérer aux étudiantes de te demander un déblocage manuel si elles bloquent vraiment.
2. **Subjectivité des productions ouvertes** : le seuil 150 mots n'est qu'un proxy quantitatif. Une étudiante peut écrire 150 mots vides. Le corrigé indicatif déroulable aide à l'auto-évaluation, mais ne remplace pas une correction humaine. **Recommandation** : tu peux balayer les productions reçues par mail pour repérer les copier-coller IA et les analyses superficielles.
3. **Univers narratif circonscrit** : seuls 3 mini-cas mobilisent l'univers Domaine du Roc d'Avise / Crown Cellars. Les 60 QCM restent généralistes. **Recommandation** : c'est volontaire (les QCM testent les notions, pas l'univers), mais à signaler aux étudiantes pour qu'elles ne s'attendent pas à un cas filé du début à la fin.

---

## 7. Workflow de validation pré-déploiement

**Test ergonomique recommandé (10-15 min)** :

1. Ouvrir le fichier en local, identifier-toi (modale)
2. Vérifier que la phase 1 affiche 20 QCM tirés au sort
3. Tester le QCM bloquant : faire 4 essais sur la 1ère question pour vérifier la mécanique d'indice progressif (essai 1 → 2 → 3 → 4 → dévoilement)
4. Vérifier que la 2e question est bloquée tant que la 1ère n'est pas résolue
5. Saisir 150 mots dans une question ouverte → vérifier que le compteur passe au vert
6. Tenter de passer à la phase 2 en moins de 30 min → vérifier l'alerte popup avec 2 clics de confirmation
7. Vérifier que le score final est calculable (phase 4)
8. Cliquer sur le mailto → vérifier l'ouverture du client mail avec le récapitulatif

Si les 8 points passent, la capsule est prête.

---

*Audit produit le 10 mai 2026 par Claude pour Kévin Vidard - CADP*
*Méthodologie CADP-Claude (5 gardes-fous) appliquée*
