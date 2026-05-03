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
  CADP.sheetUrl = ''; // URL du Google Apps Script (à remplir après déploiement)
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
      let exercice = CADP.exercices.find(ex => ex.id === idExercice);

      // Si pas trouvé en exact, chercher les saisies groupées (ex2-q1, ex2-q2, etc.)
      if (!exercice) {
        const sousExercices = CADP.exercices.filter(ex => ex.id.startsWith(idExercice + '-'));
        if (sousExercices.length > 0) {
          // Créer un exercice virtuel qui agrège les sous-exercices
          exercice = {
            id: idExercice,
            type: 'saisie-groupe',
            points: sousExercices.reduce((sum, ex) => sum + ex.points, 0),
            evaluer: function () {
              return sousExercices.reduce((sum, ex) => sum + ex.evaluer(), 0);
            }
          };
        }
      }

      if (exercice) {
        const score = exercice.evaluer();
        exercice.scoreObtenu = score;

        let badge = document.querySelector('#' + idExercice + ' .cadp-score-badge');
        if (!badge) {
          badge = document.createElement('div');
          badge.className = 'cadp-score-badge';
          badge.style.cssText = 'margin-top:1rem;padding:0.6rem 1rem;background:var(--blanc-creme);border-left:4px solid var(--or-principal);border-radius:6px;font-weight:600;color:var(--navy-profond);';
          e.target.parentNode.insertBefore(badge, e.target.nextSibling);
        }

        if (exercice.type === 'production') {
          badge.innerHTML = 'Score auto-évalué : <strong>' + score + ' / ' + exercice.points + '</strong>';
        } else {
          const arrondi = Math.round(score * 100) / 100;
          badge.innerHTML = 'Score : <strong>' + arrondi + ' / ' + exercice.points + '</strong>';
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

    // Détection de la filière depuis le header
    const mentionEl = $('.cadp-header__mention');
    const filiere = mentionEl ? mentionEl.textContent.trim() : '';

    // Construction du détail texte
    const detailTexte = detailsExercices.join('\n');

    // Données à envoyer
    const payload = {
      prenom: prenom.trim(),
      nom: nom.trim(),
      filiere: filiere,
      cas: titreCas,
      scoreObtenu: Math.round(totalObtenu * 100) / 100,
      scoreMax: totalMax,
      pourcentage: pourcentage,
      duree: formaterDuree(dureeSec),
      detail: detailTexte,
      url: window.location.href
    };

    // Récap texte (pour copier ou mailto en fallback)
    const corpsTexte = [
      'Résultats de révision BTS - Session 2026',
      '=====================================================',
      '',
      'Étudiant(e) : ' + prenom.trim() + ' ' + nom.trim(),
      'Filière : ' + filiere,
      'Cas traité : ' + titreCas,
      'Date : ' + new Date().toLocaleString('fr-FR'),
      'Durée passée : ' + formaterDuree(dureeSec),
      '',
      'SCORE GLOBAL : ' + Math.round(totalObtenu * 100) / 100 + ' / ' + totalMax + ' (' + pourcentage + '%)',
      '',
      '=====================================================',
      'DÉTAIL DES EXERCICES',
      '=====================================================',
      '',
      detailTexte,
      '',
      '=====================================================',
      'Capsule envoyée depuis le portail de révisions CADP.',
      'Campus Alternance Drôme Provence - Pierrelatte (26)'
    ].join('\n');

    const btnEnvoi = $('[data-action="envoyer"]');

    // --- Méthode 1 : envoi via Google Apps Script (si configuré) ---
    if (CADP.sheetUrl && CADP.sheetUrl.length > 10) {
      btnEnvoi.disabled = true;
      btnEnvoi.textContent = 'Envoi en cours...';

      fetch(CADP.sheetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      })
      .then(function () {
        // Avec mode no-cors, on ne peut pas lire la réponse mais l'envoi est fait
        btnEnvoi.textContent = 'Résultats envoyés';
        btnEnvoi.style.backgroundColor = '#2E7D32';
        btnEnvoi.style.borderColor = '#2E7D32';
        afficherConfirmation('Tes résultats ont bien été envoyés à Kévin. Tu peux fermer cette page.');
      })
      .catch(function () {
        // Fallback en cas d'erreur réseau
        btnEnvoi.disabled = false;
        btnEnvoi.textContent = 'Envoyer mes résultats à Kévin';
        afficherFallbackCopier(corpsTexte, titreCas, prenom, nom, pourcentage);
      });

    } else {
      // --- Méthode 2 : fallback copier + mailto ---
      afficherFallbackCopier(corpsTexte, titreCas, prenom, nom, pourcentage);
    }
  }

  function afficherConfirmation(message) {
    var zone = $('#cadp-confirmation-envoi');
    if (!zone) {
      zone = document.createElement('div');
      zone.id = 'cadp-confirmation-envoi';
      zone.style.cssText = 'margin-top:1rem;padding:1rem 1.5rem;background:#E8F5E9;border-left:4px solid #2E7D32;border-radius:6px;color:#1B5E20;font-weight:600;';
      var btn = $('[data-action="envoyer"]');
      if (btn) btn.parentNode.insertBefore(zone, btn.nextSibling);
    }
    zone.textContent = message;
  }

  function afficherFallbackCopier(corpsTexte, titreCas, prenom, nom, pourcentage) {
    var zone = $('#cadp-fallback-copier');
    if (zone) return; // déjà affiché

    zone = document.createElement('div');
    zone.id = 'cadp-fallback-copier';
    zone.style.cssText = 'margin-top:1rem;padding:1.2rem 1.5rem;background:#FFF3E0;border-left:4px solid #E65100;border-radius:6px;text-align:center;';

    zone.innerHTML =
      '<p style="color:#E65100;font-weight:600;margin:0 0 0.8rem 0;">L\'envoi automatique n\'est pas disponible. Utilise l\'un des boutons ci-dessous :</p>' +
      '<button id="cadp-btn-copier" style="padding:0.6rem 1.5rem;background:#0B1929;color:#C9A84C;border:none;border-radius:6px;font-weight:700;cursor:pointer;margin:0.3rem;">Copier mes résultats</button> ' +
      '<button id="cadp-btn-mailto" style="padding:0.6rem 1.5rem;background:#C9A84C;color:#0B1929;border:none;border-radius:6px;font-weight:700;cursor:pointer;margin:0.3rem;">Ouvrir ma messagerie</button>' +
      '<p id="cadp-copie-ok" style="color:#2E7D32;font-weight:600;margin:0.5rem 0 0 0;display:none;">Résultats copiés ! Colle-les dans un email à kevin.vidard@cadp.pro</p>';

    var btn = $('[data-action="envoyer"]');
    if (btn) btn.parentNode.insertBefore(zone, btn.nextSibling);

    // Bouton copier
    document.getElementById('cadp-btn-copier').addEventListener('click', function () {
      navigator.clipboard.writeText(corpsTexte).then(function () {
        document.getElementById('cadp-copie-ok').style.display = 'block';
      }).catch(function () {
        // Fallback pour les navigateurs sans clipboard API
        var ta = document.createElement('textarea');
        ta.value = corpsTexte;
        ta.style.cssText = 'position:fixed;left:-9999px;';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        document.getElementById('cadp-copie-ok').style.display = 'block';
      });
    });

    // Bouton mailto
    document.getElementById('cadp-btn-mailto').addEventListener('click', function () {
      var sujet = '[Révisions BTS] ' + prenom + ' ' + nom + ' - ' + titreCas + ' - ' + pourcentage + '%';
      var mailto = 'mailto:' + CADP.email + '?subject=' + encodeURIComponent(sujet) + '&body=' + encodeURIComponent(corpsTexte);
      window.location.href = mailto;
    });
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
