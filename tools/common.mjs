import pg from 'pg'
import fs from 'fs'
import request from 'request'

export const client = new pg.Client(
  'postgres://postgres:Wv9355eV4zwQQg@db.rfndxcxkcqasizztcqva.supabase.co:6543/postgres',
)

/**
 * @param {string} url
 * @returns {Promise<import('request').Response>}
 */
export function downloadFile(url) {
  return new Promise((resolve, reject) => {
    request({ url, encoding: null }, (error, response) => {
      if (error) return reject(error)

      switch (response.statusCode) {
        case 200:
          resolve(response)
          break

        case 301:
        case 302:
          if (response.headers.location) downloadFile(response.headers.location).then(resolve, reject)
          else reject(new Error(`Unable to redirect, missing Location header in response`))

        default:
          response.resume()
          reject(new Error(`Error ${response.statusCode}: ${response.statusMessage}`))
      }
    })
  })
}

/**
 *
 * @param {import('stream').Readable} stream
 * @param {string} path
 * @returns  {Promise<import('stream').Readable>}
 */
export function saveStream(stream, path) {
  return new Promise((resolve, reject) => {
    stream
      .pipe(fs.createWriteStream(path))
      .on('error', (error) => reject(error))
      .once('close', () => resolve(stream))
  })
}

/**
 *
 * @param {import('stream').Readable} stream
 * @returns  {Promise<Buffer>}
 */
export async function streamToBuffer(stream) {
  const chunks = []

  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk))
  }

  return Buffer.concat(chunks)
}
