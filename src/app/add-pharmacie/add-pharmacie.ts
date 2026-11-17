import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Pharmacie } from '../model/pharmacie.model';
import { TypePharmacie } from '../model/type-pharmacie.model';
import { PharmacieService } from '../services/pharmacie-service';

@Component({
  selector: 'app-add-pharmacie',
  imports: [FormsModule],
  templateUrl: './add-pharmacie.html',
  styleUrl: './add-pharmacie.css'
})
export class AddPharmacie {
  newPharmacie = new Pharmacie();
  types: TypePharmacie[];
  idType!: number;

  constructor(
    private pharmacieService: PharmacieService,
    private router: Router
  ) {
    this.types = this.pharmacieService.listeTypes();
  }

  addPharmacie() {
    const existe = this.pharmacieService.listePharmacies()
      .some(p => p.idPharmacie == this.newPharmacie.idPharmacie);

    if (existe) {
      alert('Cet ID existe déjà, choisis-en un autre.');
      return;
    }

    this.newPharmacie.typePharmacie = this.pharmacieService.consulterType(this.idType);
    this.pharmacieService.ajouterPharmacie(this.newPharmacie);
    this.router.navigate(['pharmacies']);
  }
}