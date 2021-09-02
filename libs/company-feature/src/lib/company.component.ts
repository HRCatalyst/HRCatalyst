import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/company/company.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'hrcatalyst-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  selectedCompany: Company;

  constructor(private router: Router) {
    const xtra = this.router.getCurrentNavigation().extras.state;

    if (xtra != null) {
      this.selectedCompany = xtra.payload;
    }
  }

  ngOnInit() {
  }

  showErrors() {
    this.router.navigate(['/errors']);
  }
}
