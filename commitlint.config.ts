import type { UserConfig } from '@commitlint/types';

// Enforces Conventional Commits format:
// type(scope): subject
// e.g. feat(events): add ICS export, fix(queries): validate email domain
const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
};

export default config;
