import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
      selector: 'future-forge-auth-v2',
      standalone: true,
      imports: [CommonModule],
      templateUrl: './auth-v2.component.html',
      styleUrls: ['./auth-v2.component.scss'],
      encapsulation: ViewEncapsulation.Emulated,
})
export class AuthV2Component { }
