import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptWizardComponent } from './prompt-wizard.component';
import it from '@angular/common/locales/it';

describe('PromptWizardComponent', () => {
  let component: PromptWizardComponent;
  let fixture: ComponentFixture<PromptWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptWizardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PromptWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
