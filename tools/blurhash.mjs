import { encode } from 'blurhash'
import { client, downloadFile, streamToBuffer } from './common.mjs'
import sharp from 'sharp'

async function init() {
  await client.connect()

  try {
    const { rows } = /** @type {{rows: {id:string, name: string}[]}} */ (
      await client.query('SELECT id, filename_disk as name from directus_files')
    )

    let i = 0
    for (const { id, name } of rows) {
      console.log(++i, '/', rows.length)
      const url = `https://rfndxcxkcqasizztcqva.supabase.co/storage/v1/object/public/assets/${name}`
      console.log(url)

      const data = await (await downloadFile(url)).body
      const preview = sharp(data).resize({ width: 256 }).ensureAlpha()
      const pixels = new Uint8ClampedArray(await preview.raw().toBuffer())
      const blurhash = encode(pixels, 256, pixels.length / 4 / 256, 8, 8)
      console.log(blurhash)
      await client.query('UPDATE directus_files SET blurhash = $1 WHERE id = $2', [blurhash, id])
    }
  } catch (err) {
    console.error(err)
  } finally {
    await client.end()
  }
}

init()
