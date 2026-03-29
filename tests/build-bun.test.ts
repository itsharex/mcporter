import path from 'node:path';
import { describe, expect, it } from 'vitest';

import { createCompiledEntrypoint } from '../scripts/build-bun';

describe('build-bun entrypoint', () => {
  it('embeds the package version before importing the CLI', () => {
    const projectRoot = '/tmp/mcporter';
    const version = '0.8.1';

    const entrypoint = createCompiledEntrypoint(projectRoot, version);

    expect(entrypoint).toContain(`process.env.MCPORTER_VERSION ??= "${version}";`);
    expect(entrypoint).toContain(`await import(${JSON.stringify(path.join(projectRoot, 'src', 'cli.ts'))});`);
  });
});
