/* ============================================================
   CADP — Moteur de capsules de révision BTS NDRC 2026
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // CONFIGURATION GLOBALE
  // ============================================================
  const CADP = window.CADP = window.CADP || {};
  CADP.email = 'kevin.vidard@cadp.pro';
  CADP.exercices = []; // Registre des exercices déclarés sur la page
  CADP.dateDebut = new Date();

  // ============================================================
  // UTILITAIRES
  // ============================================================
  function $(selector, parent = document) {
    return parent.querySelector(selector);
  }

  function $$(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
  }

  function normaliserTexte(texte) {
    return (texte || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // accents
      .replace(/[^\w\s]/g, ' ')        // ponctuation
      .replace(/\s+/g, ' ')            // espaces multiples
      .trim();
  }

  function formaterDuree(secondes) {
    const h = Math.floor(secondes / 3600);
    const m = Math.floor((secondes % 3600) / 60);
    if (h > 0) return `${h}h${m.toString().padStart(2, '0')}`;
    return `${m} min`;
  }

  // ============================================================
  // ENREGISTREMENT D'UN EXERCICE
  // ============================================================
  CADP.enregistrerExercice = function (config) {
    // config = { id, type, points, evaluer: fn(), resume: fn() }
    CADP.exercices.push(config);
  };

  // ============================================================
  // QCM — Cases à cocher / Boutons radio
  // bonnesReponses : objet { 'nom-de-question': 'valeur' ou ['v1','v2'] }
  // ============================================================
  CADP.qcm = function (idExercice, points, bonnesReponses) {
    const conteneur = document.getElementById(idExercice);
    if (!conteneur) return;

    // Compte le nombre total de "bonnes réponses" attendues (tous items confondus)
    let totalAttendu = 0;
    Object.values(bonnesReponses).forEach(v => {
      totalAttendu += Array.isArray(v) ? v.length : 1;
    });

    CADP.enregistrerExercice({
      id: idExercice,
      type: 'qcm',
      points: points,
      evaluer: function () {
        let bonnes = 0;
        let mauvaises = 0;

        // Reset visuel
        $$('.cadp-qcm__option', conteneur).forEach(opt => {
          opt.classList.remove('correct', 'incorrect', 'attendu');
        });

        // Pour chaque question définie
        Object.entries(bonnesReponses).forEach(([nomQuestion, attendu]) => {
          const inputs = $$(`input[name="${nomQuestion}"]`, conteneur);
          const valeursAttendues = Array.isArray(attendu) ? attendu : [attendu];

          inputs.forEach(input => {
            const opt = input.closest('.cadp-qcm__option');
            const estCoche = input.checked;
            const estBon = valeursAttendues.includes(input.value);

            if (estCoche && estBon) {
              if (opt) opt.classList.add('correct');
              bonnes++;
            } else if (estCoche && !estBon) {
              if (opt) opt.classList.add('incorrect');
              mauvaises++;
            } else if (!estCoche && estBon) {
              if (opt) opt.classList.add('attendu');
            }
          });
        });

        // Score : (bonnes - mauvaises) / total attendu * points
        const score = totalAttendu === 0 ? 0 :
          Math.max(0, Math.round(((bonnes - mauvaises) / totalAttendu) * points * 10) / 10);
        return Math.max(0, Math.min(score, points));
      },
      resume: function () {
        const reponses = [];
        Object.keys(bonnesReponses).forEach(nomQuestion => {
          const cochees = $$(`input[name="${nomQuestion}"]:checked`, conteneur)
            .map(i => i.value);
          reponses.push(`${nomQuestion}: ${cochees.length > 0 ? cochees.join(',') : '∅'}`);
        });
        return reponses.join(' | ');
      }
    });
  };

  // ============================================================
  // SAISIE COURTE — Texte ou nombre, avec tolérance
  // ============================================================
  CADP.saisie = function (idExercice, points, reponsesAcceptees, options) {
    options = options || {};
    const conteneur = document.getElementById(idExercice);
    if (!conteneur) return;

    CADP.enregistrerExercice({
      id: idExercice,
      type: 'saisie',
      points: points,
      evaluer: function () {
        const input = $('input', conteneur);
        if (!input) return 0;
        const valeur = input.value.trim();
        if (!valeur) return 0;

        let estCorrect = false;

        if (options.numerique) {
          const num = parseFloat(valeur.replace(',', '.'));
          const tolerance = options.tolerance || 0;
          estCorrect = reponsesAcceptees.some(r => Math.abs(num - r) <= tolerance);
        } else {
          const valNorm = normaliserTexte(valeur);
          estCorrect = reponsesAcceptees.some(r => normaliserTexte(r) === valNorm);
        }

        input.classList.toggle('correct', estCorrect);
        input.classList.toggle('incorrect', !estCorrect);
        return estCorrect ? points : 0;
      },
      resume: function () {
        const input = $('input', conteneur);
        return input ? (input.value.trim() || '(non répondu)') : '';
      }
    });
  };

  // ============================================================
  // PRODUCTION LIBRE — Auto-évaluation guidée
  // ============================================================
  CADP.production = function (idExercice, pointsTotaux, criteres) {
    // criteres : [{ libelle, description, points }]
    const conteneur = document.getElementById(idExercice);
    if (!conteneur) return;

    CADP.enregistrerExercice({
      id: idExercice,
      type: 'production',
      points: pointsTotaux,
      evaluer: function () {
        // Affichage de la grille d'auto-évaluation
        const autoeval = $('.cadp-autoeval', conteneur);
        if (autoeval) autoeval.classList.add('visible');

        // Calcul du score depuis les radio cochés
        let total = 0;
        criteres.forEach((c, i) => {
          const radio = $(`input[name="${idExercice}-c${i}"]:checked`, conteneur);
          if (radio) {
            const note = parseFloat(radio.value);
            const max = parseFloat(radio.dataset.max);
            total += (note / max) * c.points;
          }
        });
        return Math.round(total * 10) / 10;
      },
      resume: function () {
        const textarea = $('textarea', conteneur);
        const texte = textarea ? textarea.value.trim() : '';
        if (!texte) return '(non répondu)';
        // On envoie un extrait pour que le formateur ait une trace
        return texte.length > 500 ? texte.substring(0, 500) + '...[suite tronquée]' : texte;
      }
    });
  };

  // ============================================================
  // GLISSER-DÉPOSER — Classement d'éléments dans des colonnes
  // ============================================================
  CADP.dnd = function (idExercice, points, solution) {
    // solution : { idItem: idColonneCorrecte, ... }
    const conteneur = document.getElementById(idExercice);
    if (!conteneur) return;

    // Initialisation drag&drop
    let elementDrague = null;

    $$('.cadp-dnd__item', conteneur).forEach(item => {
      item.draggable = true;
      item.addEventListener('dragstart', e => {
        elementDrague = item;
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });
    });

    $$('.cadp-dnd__zone', conteneur).forEach(zone => {
      zone.addEventListener('dragover', e => {
        e.preventDefault();
        zone.classList.add('cadp-dnd__zone--over');
      });
      zone.addEventListener('dragleave', () => {
        zone.classList.remove('cadp-dnd__zone--over');
      });
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('cadp-dnd__zone--over');
        if (elementDrague) {
          zone.appendChild(elementDrague);
        }
      });
    });

    CADP.enregistrerExercice({
      id: idExercice,
      type: 'dnd',
      points: points,
      evaluer: function () {
        let bonnesReponses = 0;
        const total = Object.keys(solution).length;

        Object.entries(solution).forEach(([idItem, idColAttendue]) => {
          const item = $(`[data-item="${idItem}"]`, conteneur);
          if (!item) return;
          const colParent = item.closest('.cadp-dnd__zone');
          if (colParent && colParent.dataset.colonne === idColAttendue) {
            bonnesReponses++;
            item.style.borderColor = 'var(--succes)';
            item.style.backgroundColor = 'var(--succes-fond)';
          } else {
            item.style.borderColor = 'var(--erreur)';
            item.style.backgroundColor = 'var(--erreur-fond)';
          }
        });

        return Math.round((bonnesReponses / total) * points * 10) / 10;
      },
      resume: function () {
        const placement = {};
        $$('.cadp-dnd__item', conteneur).forEach(item => {
          const colParent = item.closest('.cadp-dnd__zone');
          if (colParent) {
            placement[item.dataset.item] = colParent.dataset.colonne;
          }
        });
        return JSON.stringify(placement);
      }
    });
  };

  // ============================================================
  // BOUTONS DE CORRECTION
  // ============================================================
  document.addEventListener('click', function (e) {
    // Bouton "Vérifier mes réponses"
    if (e.target.matches('[data-action="verifier"]')) {
      const idExercice = e.target.dataset.exercice;
      const exercice = CADP.exercices.find(ex => ex.id === idExercice);
      if (exercice) {
        const score = exercice.evaluer();
        exercice.scoreObtenu = score;

        // Affiche feedback de score sur l'exercice
        let badge = $(`#${idExercice} .cadp-score-badge`);
        if (!badge) {
          badge = document.createElement('div');
          badge.className = 'cadp-score-badge';
          badge.style.cssText = 'margin-top:1rem;padding:0.6rem 1rem;background:var(--blanc-creme);border-left:4px solid var(--or-principal);border-radius:6px;font-weight:600;color:var(--navy-profond);';
          e.target.parentNode.insertBefore(badge, e.target.nextSibling);
        }

        if (exercice.type === 'production') {
          badge.innerHTML = `Score auto-évalué : <strong>${score} / ${exercice.points}</strong>`;
        } else {
          badge.innerHTML = `Score : <strong>${score} / ${exercice.points}</strong>`;
        }
      }
    }

    // Bouton "Voir le corrigé"
    if (e.target.matches('[data-action="corrige"]')) {
      const idExercice = e.target.dataset.exercice;
      const corrige = $(`#${idExercice} .cadp-corrige`);
      if (corrige) {
        corrige.classList.toggle('visible');
        e.target.textContent = corrige.classList.contains('visible')
          ? 'Masquer le corrigé'
          : 'Voir le corrigé';
      }
    }

    // Bouton "Envoyer mes résultats"
    if (e.target.matches('[data-action="envoyer"]')) {
      envoyerResultats(e.target.dataset.cas || document.title);
    }
  });

  // ============================================================
  // ENVOI DES RÉSULTATS PAR MAILTO
  // ============================================================
  function envoyerResultats(titreCas) {
    const nom = ($('#cadp-nom') || {}).value || '';
    const prenom = ($('#cadp-prenom') || {}).value || '';

    if (!nom.trim() || !prenom.trim()) {
      alert('Merci de saisir ton nom et ton prénom en haut de la page avant d\'envoyer tes résultats.');
      $('#cadp-prenom').focus();
      return;
    }

    // Calcule le score total
    let totalObtenu = 0;
    let totalMax = 0;
    const detailsExercices = [];

    CADP.exercices.forEach((ex, i) => {
      const score = ex.scoreObtenu !== undefined ? ex.scoreObtenu : ex.evaluer();
      ex.scoreObtenu = score;
      totalObtenu += score;
      totalMax += ex.points;
      detailsExercices.push(
        `Exercice ${i + 1} (${ex.type}) : ${score} / ${ex.points} pts\n` +
        `  Réponse : ${ex.resume()}\n`
      );
    });

    const dureeSec = Math.round((new Date() - CADP.dateDebut) / 1000);
    const pourcentage = totalMax > 0 ? Math.round((totalObtenu / totalMax) * 100) : 0;

    // Affichage du résultat à l'écran
    afficherResultatFinal(totalObtenu, totalMax, pourcentage, dureeSec);

    // Construction du mail
    const sujet = `[Révisions BTS NDRC] ${prenom} ${nom} - ${titreCas} - ${pourcentage}%`;
    const corps = [
      `Résultats de révision BTS NDRC - Session 2026`,
      `=====================================================`,
      ``,
      `Étudiant(e) : ${prenom} ${nom}`,
      `Cas traité : ${titreCas}`,
      `Date : ${new Date().toLocaleString('fr-FR')}`,
      `Durée passée : ${formaterDuree(dureeSec)}`,
      ``,
      `SCORE GLOBAL : ${totalObtenu} / ${totalMax} (${pourcentage}%)`,
      ``,
      `=====================================================`,
      `DÉTAIL DES EXERCICES`,
      `=====================================================`,
      ``,
      ...detailsExercices,
      ``,
      `=====================================================`,
      `Capsule envoyée automatiquement depuis le portail de révisions CADP.`,
      `Campus Alternance Drôme Provence - Pierrelatte (26)`
    ].join('\n');

    // Ouverture du client mail
    const mailto = `mailto:${CADP.email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
    window.location.href = mailto;
  }

  function afficherResultatFinal(obtenu, max, pourcentage, dureeSec) {
    let zone = $('#cadp-resultat-final');
    if (!zone) {
      zone = document.createElement('div');
      zone.id = 'cadp-resultat-final';
      zone.className = 'cadp-resultat';
      const btnEnvoi = $('[data-action="envoyer"]');
      if (btnEnvoi) btnEnvoi.parentNode.insertBefore(zone, btnEnvoi);
    }

    let mention = '';
    if (pourcentage >= 80) mention = 'Excellent travail !';
    else if (pourcentage >= 60) mention = 'Bon travail, continue ainsi.';
    else if (pourcentage >= 40) mention = 'Des révisions ciblées te seront utiles.';
    else mention = 'Reprends le corrigé point par point pour progresser.';

    zone.innerHTML = `
      <div class="cadp-resultat__titre">Résultat global</div>
      <div class="cadp-resultat__score">${obtenu} / ${max}</div>
      <div class="cadp-resultat__detail">
        Soit ${pourcentage}% — Durée : ${formaterDuree(dureeSec)}<br>
        ${mention}
      </div>
    `;

    zone.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ============================================================
  // COMPTEUR DE CARACTÈRES POUR PRODUCTIONS
  // ============================================================
  document.addEventListener('input', function (e) {
    if (e.target.matches('.cadp-production textarea')) {
      const compteur = e.target.parentNode.querySelector('.cadp-production__compteur');
      if (compteur) {
        const nbMots = e.target.value.trim().split(/\s+/).filter(Boolean).length;
        compteur.textContent = `${nbMots} mots`;
      }
    }
  });

  // ============================================================
  // SAUVEGARDE LOCALE (reprise après fermeture)
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
    const cleStockage = 'cadp_' + window.location.pathname.replace(/\//g, '_');

    // Restauration des champs nom/prénom
    try {
      const nom = localStorage.getItem('cadp_nom');
      const prenom = localStorage.getItem('cadp_prenom');
      if (nom && $('#cadp-nom')) $('#cadp-nom').value = nom;
      if (prenom && $('#cadp-prenom')) $('#cadp-prenom').value = prenom;
    } catch (e) { /* localStorage indispo */ }

    // Sauvegarde nom/prénom à la saisie
    if ($('#cadp-nom')) {
      $('#cadp-nom').addEventListener('change', e => {
        try { localStorage.setItem('cadp_nom', e.target.value); } catch (err) {}
      });
    }
    if ($('#cadp-prenom')) {
      $('#cadp-prenom').addEventListener('change', e => {
        try { localStorage.setItem('cadp_prenom', e.target.value); } catch (err) {}
      });
    }
  });

})();
