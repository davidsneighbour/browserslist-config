import { createReleaseConfig } from '@dnbhq/release-config';
import type { Config } from 'release-it';

const config: Config = createReleaseConfig({
  overrides: {
    git: {
      requireBranch: 'main',
    },
  },
});

export default config;
