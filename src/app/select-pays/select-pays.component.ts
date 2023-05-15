import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, debounce, debounceTime, from, fromEvent, map, startWith } from 'rxjs';

@Component({
  selector: 'app-select-pays',
  templateUrl: './select-pays.component.html',
  styleUrls: ['./select-pays.component.css'],
})
export class SelectPaysComponent implements AfterViewInit, OnDestroy {

  sub: Subscription;

  @ViewChild('input')
  inputText: ElementRef;

  pays: Array<Pays> = [
    {
      code: 'FR',
      libelle: 'France',
    },
    {
      code: 'NC',
      libelle: 'Nouvelle Calédonie',
    },
    {
      code: 'WF',
      libelle: 'Wallis et Futuna',
    },
    {
      code: 'US',
      libelle: 'Etats-Unis',
    },
  ];

  currentPays: Array<Pays> = [];

  constructor() {}

  ngAfterViewInit() {
    this.sub = fromEvent(this.inputText.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        map((x) => this.inputText.nativeElement.value)
      )
      .subscribe((x) => {
        if (x.trim().length == 0) {
          this.currentPays = [];
        } else {
          this.currentPays = this.pays.filter((y) =>
            y.libelle.toLowerCase().startsWith(x.toLowerCase())
          );
        }
      });
  }

  onBlur() {
    let meComponent = this;
    setTimeout(function () {
      meComponent.currentPays = [];
    }, 150);
  }

  onFocus() {
    if (this.inputText.nativeElement.value.trim().length > 0) {
      this.currentPays = this.pays.filter((y) =>
        y.libelle
          .toLowerCase()
          .startsWith(this.inputText.nativeElement.value.toLowerCase())
      );
    }
  }

  selectPays(event) {
    this.inputText.nativeElement.value = event.target.innerText;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
