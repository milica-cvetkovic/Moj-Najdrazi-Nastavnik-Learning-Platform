import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaProfilneSlikeDialogComponent } from './promena-profilne-slike-dialog.component';

describe('PromenaProfilneSlikeDialogComponent', () => {
  let component: PromenaProfilneSlikeDialogComponent;
  let fixture: ComponentFixture<PromenaProfilneSlikeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaProfilneSlikeDialogComponent]
    });
    fixture = TestBed.createComponent(PromenaProfilneSlikeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
