import { ApplicationRef, enableProdMode } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
// .then(module => {
//   const appRef = module.injector.get(ApplicationRef);
//   const componentRef = appRef.components[0];
//   enableDebugTools(componentRef);
// })
  .catch(err => console.error(err));
