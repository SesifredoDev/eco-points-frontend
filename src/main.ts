import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { defineCustomElements } from 'simple-circular-progress';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  defineCustomElements(window); // call the function here at the end of the file