import { Component } from '@angular/core';
import { TypePharmacie } from '../model/type-pharmacie.model';
import { PharmacieService } from '../services/pharmacie-service';
import { UpdateType } from '../update-type/update-type';

@Component({
  selector: 'app-liste-types',
  imports: [UpdateType],
  templateUrl: './liste-types.html',
  styleUrl: './liste-types.css'
})
export class ListeTypes {
  types: TypePharmacie[];
  updatedType: TypePharmacie = { idType: 0, nomType: '' };
  ajout: boolean = true;
  erreur: string = '';

  constructor(private pharmacieService: PharmacieService) {
    this.types = this.pharmacieService.listeTypes();
  }

  typeUpdated(t: TypePharmacie) {
    console.log('Type updated event', t);
    const nom = t.nomType.trim();
    const idExclu = this.ajout ? undefined : t.idType;

    if (this.pharmacieService.typeExiste(nom, idExclu)) {
      this.erreur = 'Ce type existe déjà.';
      return;
    }

    this.erreur = '';
    if (this.ajout) {
      this.pharmacieService.ajouterType({ idType: 0, nomType: nom });
    } else {
      this.pharmacieService.updateType({ idType: t.idType, nomType: nom });
    }
    this.chargerTypes();
    this.updatedType = { idType: 0, nomType: '' };
    this.ajout = true;
  }

  chargerTypes() {
    this.types = this.pharmacieService.listeTypes();
  }

  updateType(t: TypePharmacie) {
    this.erreur = '';
    this.updatedType = { ...t };
    this.ajout = false;
  }

  supprimerType(t: TypePharmacie) {
    if (confirm('Voulez-vous vraiment supprimer ce type ?')) {
      if (!this.pharmacieService.supprimerType(t)) {
        alert('Suppression impossible : ce type est utilisé par au moins une pharmacie.');
      }
    }
  }
}