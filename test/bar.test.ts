// test that parse(stringify(obj) deepEqu

import { assertEquals } from 'https://deno.land/std@0.51.0/testing/asserts.ts'

import * as ini from '../ini.ts'
const { test } = Deno

interface MockData {
  [index:string]: any
}

const data: MockData = {
  'number':  {count: 10},
  'string':  {drink: 'white russian'},
  'boolean': {isTrue: true},
  'nested boolean': {theDude: {abides: true, rugCount: 1}}
}

test("stringifyThenParse", function () {
  for (var k in data) {
    const s = ini.stringify(data[k])
    assertEquals(ini.parse(s), data[k])
  }
})
