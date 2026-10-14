import * as migration_20261014_164235_initial from './20261014_164235_initial';

export const migrations = [
  {
    up: migration_20261014_164235_initial.up,
    down: migration_20261014_164235_initial.down,
    name: '20261014_164235_initial'
  },
];
