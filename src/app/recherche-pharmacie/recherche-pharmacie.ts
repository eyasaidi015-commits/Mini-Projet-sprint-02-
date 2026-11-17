import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pharmacie } from '../model/pharmacie.model';
import { TypePharmacie } from '../model/type-pharmacie.model';
import { PharmacieService } from '../services/pharmacie-service';
import { SearchFilterPipe } from '../search-filter-pipe';

@Component({
  selector: 'app-recherche-pharmacie',
  imports: [DatePipe, FormsModule, SearchFilterPipe],
  templateUrl: './recherche-pharmacie.html',
  styleUrl: './recherche-pharmacie.css'
})
export class RecherchePharmacie {
  pharmacies: Pharmacie[];
  allPharmacies: Pharmacie[];
  types: TypePharmacie[];
  idTypeFiltre: number | undefined = undefined;
  searchTerm = '';

  constructor(private pharmacieService: PharmacieService) {
    this.allPharmacies = this.pharmacieService.listePharmacies();
    this.pharmacies = this.allPharmacies;
    this.types = this.pharmacieService.listeTypes();
  }

  onChangeType(idType: number | undefined) {
    this.idTypeFiltre = idType;
    this.searchTerm = '';
    if (idType === undefined) {
      this.pharmacies = this.allPharmacies;
    } else {
      this.pharmacies = this.allPharmacies.filter(p => p.typePharmacie.idType == idType);
    }
  }
}