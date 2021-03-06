import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '@hrc/shared-feature';

@Component({
  selector: 'hrc-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  selectedCompany?: Company;

  constructor(private router: Router) {
    const xtra = this.router.getCurrentNavigation()?.extras.state;

    if (xtra != null) {
      this.selectedCompany = xtra.payload;
    }
  }

  showErrors() {
    this.router.navigate(['/errors']);
  }
}
