import { assertEquals } from 'testing/asserts.ts'

import expected from '../../test-data/expected-errors.ts'

import { cmd, decode } from '../../utils/tests.ts'

Deno.test('copy src file no exist', async t => {
  const process = Deno.run({
    cmd: cmd(['./res/no-exist.txt','./res/dest-file.txt']),
    stderr: 'piped'
  })

  await t.step('status code diferent to 0', async () => {
    const actualStatus = await process.status()

    assertEquals(
      actualStatus,
      expected.status
    )
  })
  
  const rawErrorOutput = await process.stderrOutput()
  
  await t.step('error output', () => {
    const actualErrotOutput = decode(rawErrorOutput)
    
    assertEquals(
      actualErrotOutput,
      expected.err.NoSuch.File
      )
    })
  
  process.close()
})

Deno.test('copy src dir no exist', async t => {
  const process = Deno.run({
    cmd: cmd(['./res/no-exist/','./res/dest-file.txt']),
    stderr: 'piped'
  })

  await t.step('status code diferent to 0', async () => {
    const actualStatus = await process.status()

    assertEquals(
      actualStatus,
      expected.status
    )
  })
  
  const rawErrorOutput = await process.stderrOutput()
  
  await t.step('error output', () => {
    const actualErrotOutput = decode(rawErrorOutput)
    
    assertEquals(
      actualErrotOutput,
      expected.err.NoSuch.Dir
      )
    })
  
  process.close()
})

Deno.test('copy one file in not exist dir', async t => {
  const process = Deno.run({
    cmd: cmd(['./res/copy-file-1.txt', './res/no-exist/in']),
    stderr: 'piped'
  })

  await t.step('status code diferent to 0', async () => {
    const actualStatus = await process.status()

    assertEquals(
      actualStatus,
      expected.status
    )
  })

  const rawErrorOutput = await process.stderrOutput()

  await t.step('error output', () => {
    const actualErrorOutput = decode(rawErrorOutput)

    assertEquals(
      actualErrorOutput,
      expected.err.NoSuch.InDir
    )
  })

  process.close()
})

Deno.test('copy one dir in not exist dir', async t => {
  const process = Deno.run({
    cmd: cmd(['./res/copy-dir', './res/no-exist/in']),
    stderr: 'piped'
  })

  await t.step('status code diferent to 0', async () => {
    const actualStatus = await process.status()

    assertEquals(
      actualStatus,
      expected.status
    )
  })

  const rawErrorOutput = await process.stderrOutput()

  await t.step('error output', () => {
    const actualErrorOutput = decode(rawErrorOutput)

    assertEquals(
      actualErrorOutput,
      expected.err.NoSuch.InDir
    )
  })

  process.close()
})

Deno.test('copy miltiples files in not exist dir', async t => {
  const process = Deno.run({
    cmd: cmd(['./res/copy-file-1.txt', './res/copy-file-1.txt', './res/no-exist/in']),
    stderr: 'piped'
  })

  await t.step('status code diferent to 0', async () => {
    const actualStatus = await process.status()

    assertEquals(
      actualStatus,
      expected.status
    )
  })

  const rawErrorOutput = await process.stderrOutput()

  await t.step('error output', () => {
    const actualErrorOutput = decode(rawErrorOutput)

    assertEquals(
      actualErrorOutput,
      expected.err.NoSuch.InDir
    )
  })

  process.close()
})
