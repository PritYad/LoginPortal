import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MqInputComponent } from './mq-input.component';

describe('MqInputComponent', () => {
  let component: MqInputComponent;
  let fixture: ComponentFixture<MqInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MqInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MqInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
