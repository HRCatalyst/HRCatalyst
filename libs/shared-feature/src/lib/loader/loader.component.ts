import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from './loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hrc-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnDestroy, OnInit {
  loading = false;
  loaderSubscription$?: Subscription;
  constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.loaderSubscription$ = this.loaderService.isLoading.subscribe((v) => {
      console.log(v);
      this.loading = v;
    });
  }

  ngOnDestroy() {
    if (this.loaderSubscription$ != null) {
      this.loaderSubscription$.unsubscribe();
    }
  }
}
