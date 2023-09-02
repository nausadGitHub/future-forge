import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthV2Component } from './auth-v2.component';

describe('AuthV2Component', () => {
  let component: AuthV2Component;
  let fixture: ComponentFixture<AuthV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthV2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
