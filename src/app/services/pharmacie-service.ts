import { Injectable } from '@angular/core';
import { Pharmacie } from '../model/pharmacie.model';
import { TypePharmacie } from '../model/type-pharmacie.model';

@Injectable({
  providedIn: 'root'
})
export class PharmacieService {
  types: TypePharmacie[] = [
    { idType: 1, nomType: 'Pharmacie de jour' },
    { idType: 2, nomType: 'Pharmacie de nuit' },
    { idType: 3, nomType: 'Parapharmacie' }
  ];

  pharmacies: Pharmacie[] = [
    {
      idPharmacie: 100001,
      nomPharmacie: 'Pharmacie dr. Hajer Missaoui',
      adressePharmacie: 'En face clinique Les Violettes, résidence Ines Av. Dali Jazi, Nabeul',
      telephonePharmacie: '50 930 930',
      dateOuverture: new Date('2015-03-12'),
      typePharmacie: this.types[0]
    },
    {
      idPharmacie: 100002,
      nomPharmacie: 'Pharmacie De Nuit AMIRA BEN JANNET',
      adressePharmacie: 'Avenue Elgarci, Boucharray, Nabeul',
      telephonePharmacie: '70 314 335',
      dateOuverture: new Date('2018-09-01'),
      typePharmacie: this.types[1]
    },
    {
      idPharmacie: 100003,
      nomPharmacie: 'Pharmacie Les Jasmins',
      adressePharmacie: 'Centre Médical Eya, près Clinique el Amen, Av. Hédi Nouira, Nabeul',
      telephonePharmacie: '72 270 840',
      dateOuverture: new Date('2021-06-20'),
      typePharmacie: this.types[0]
    },
    {
      idPharmacie: 100004,
      nomPharmacie: 'Parafendri',
      adressePharmacie: 'centre ville Nabeul',
      telephonePharmacie: '70 273 181',
      dateOuverture: new Date('2026-05-02'),
      typePharmacie: this.types[2]
    }
  ];

  listePharmacies(): Pharmacie[] {
    return this.pharmacies;
  }

  ajouterPharmacie(pharm: Pharmacie): void {
    this.pharmacies.push(pharm);
  }

  supprimerPharmacie(pharm: Pharmacie): void {
    const index = this.pharmacies.indexOf(pharm);
    if (index > -1) {
      this.pharmacies.splice(index, 1);
    }
  }
  typeExiste(nom: string, idExclu?: number): boolean {
  const n = nom.trim().toLowerCase();
  return this.types.some(t =>
    t.nomType.trim().toLowerCase() === n && t.idType !== idExclu
  );
}

  consulterPharmacie(id: number): Pharmacie {
    return this.pharmacies.find(p => p.idPharmacie == id)!;
  }

  updatePharmacie(pharm: Pharmacie): void {
    const index = this.pharmacies.findIndex(p => p.idPharmacie == pharm.idPharmacie);
    this.pharmacies[index] = pharm;
  }

  listeTypes(): TypePharmacie[] {
    return this.types;
  }

  consulterType(id: number): TypePharmacie {
    return this.types.find(t => t.idType == id)!;
  }

  ajouterType(type: TypePharmacie): void {
    const maxId = this.types.length ? Math.max(...this.types.map(t => t.idType)) : 0;
    type.idType = maxId + 1;
    this.types.push(type);
  }

  updateType(type: TypePharmacie): void {
    const t = this.types.find(x => x.idType == type.idType);
    if (t) {
      t.nomType = type.nomType;
    }
  }

  supprimerType(type: TypePharmacie): boolean {
    const utilise = this.pharmacies.some(p => p.typePharmacie.idType == type.idType);
    if (utilise) {
      return false;
    }
    const index = this.types.findIndex(t => t.idType == type.idType);
    if (index > -1) {
      this.types.splice(index, 1);
    }
    return true;
  }
}