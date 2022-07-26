import type { Information } from '../../types/information.ts'

export default <Information> {
  description: 'cp command for copi :D',
  options: [
    {
      names: ['-h', '--help'],
      description: 'Print information.'
    },
    {
      names: ['-V', '--version'],
      description: 'Print version.'
    }
  ],
  version: 'deno cp 0.0.1',
}
