import test from 'ava';
import path from 'path';
import fs from 'fs-extra';
import WebappWebpackPlugin from '..';

import {logo, generate, mkdir, compare, expected} from './util';

test('should generate the expected default result', async t => {
  t.context.root = await mkdir();
  const dist = path.join(t.context.root, 'dist');
  const stats = await generate({
    context: t.context.root,
    output: {
      path: dist,
    },
    plugins: [new WebappWebpackPlugin({logo})]
  });


  const diff = await compare(dist, path.resolve(expected, 'default'));
  t.deepEqual(diff, []);
});

test.afterEach(t => fs.remove(t.context.root));