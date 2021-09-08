import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '@hrcatalyst/shared-feature';

@Component({
  selector: 'hrcatalyst-company',
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
