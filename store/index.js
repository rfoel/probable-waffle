import { init } from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';

import * as models from './models';

const loading = createLoadingPlugin();

export const initializeStore = (initialState = {}) =>
  init({
    models,
    redux: {
      initialState,
    },
    plugins: [loading],
  });
