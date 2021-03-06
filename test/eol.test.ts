// test that line endings are correct across OS platforms

import * as eol from 'https://deno.land/std@0.51.0/fs/eol.ts'
import { assertEquals } from 'https://deno.land/std@0.51.0/testing/asserts.ts'

import * as ini from '../ini.ts'
const { test } = Deno

const isWindows = Deno.build.os === 'windows'
const EOL = isWindows ? eol.EOL.CRLF : eol.EOL.LF

test('eolLineEndings', function () {
  const res = ini.encode({ foo: { bar: 'baz' } })
  assertEquals(res, `[foo]${EOL}bar=baz${EOL}`)

  assertEquals(ini.encode({ bar: 'baz' }, 'foo'), `[foo]${EOL}bar=baz${EOL}`)

  assertEquals(ini.decode(`=just junk!${EOL}[foo]${EOL}bar${EOL}`),
    { foo: { bar: true } })

  assertEquals(ini.decode(`[x]${EOL}y=1${EOL}y[]=2${EOL}`), {
    x: {
      y: [1, 2]
    }
  })

  assertEquals(ini.unsafe(''), '')
  assertEquals(ini.unsafe('x;y'), 'x')
  assertEquals(ini.unsafe('x  # y'), 'x')
  assertEquals(ini.unsafe('x "\\'), 'x "\\')
})
