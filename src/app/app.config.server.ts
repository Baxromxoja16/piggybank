import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { accountInterceptor } from './core/account.interceptor';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(withInterceptors([accountInterceptor])),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
