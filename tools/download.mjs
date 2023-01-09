import https from 'https'
import fs from 'fs'

const ids = [
  { id: '0e1c333f-f9f3-4695-8472-f26d71743a1d.jpg', width: 1200, height: 900 },
  { id: 'd3b2bc36-f526-44b0-b042-87f886ba5c37.jpg', width: 1920, height: 1920 },
  { id: '2633b4e1-277f-4cae-974f-852a4ffd26a9.jpg', width: 2400, height: 1467 },
  { id: 'ddfadc19-dd38-4318-9ab0-f957b814f8bb.png', width: 790, height: 857 },
  { id: 'fe935287-3215-4549-93fd-c1102ba38f78.jpg', width: 3332, height: 3333 },
  { id: '407442ea-cd5e-4c18-aba5-6827622c5952.jpg', width: 824, height: 463 },
  { id: '511f2db2-be69-43ed-8a71-9b46d25311ad.jpg', width: 1920, height: 1440 },
  { id: '8586ee2d-1aee-4008-9bd0-6ae0db819a0f.jpg', width: 1824, height: 1216 },
  { id: '83bdaa5a-23e8-48c8-8d13-ba4a33ba4030.JPG', width: 2880, height: 1400 },
  { id: 'a4298cdc-c205-48bc-82bc-550c33810389.jpg', width: 847, height: 847 },
  { id: '986a53f2-ed8f-4e2a-9e01-b7d016bf16e5.jpg', width: 1500, height: 938 },
  { id: 'ee42fff3-9382-400e-bcbd-ad2a777f1577.jpg', width: 1100, height: 688 },
  { id: 'bba73dac-86cf-4caf-b04a-ef52a02bdce4.jpg', width: 1200, height: 799 },
  { id: 'fd32c91e-3b1a-48e3-8617-a2670a1002c2.jpg', width: 3240, height: 2160 },
  { id: 'b7020926-1b98-44b6-a90d-45fa774afa42.jpg', width: 620, height: 349 },
  { id: 'f74959f9-0679-4c85-98d3-7c326567449f.jpg', width: 780, height: 520 },
  { id: '42620783-e934-40b6-8db9-6e5499632fb0.jpg', width: 1298, height: 827 },
  { id: 'ca804fcc-9d49-4602-850c-908db9a147b7.jpg', width: 1600, height: 1600 },
  { id: '24d1c755-ba26-429a-b2ee-c7e67cf6ac4d.jpg', width: 1158, height: 776 },
  { id: '14bbd062-6c5a-4547-8284-7be454877340.png', width: 1245, height: 701 },
  { id: '43005ef0-686a-495a-90fa-6dec8083ffd2.jpg', width: 1999, height: 1124 },
  { id: '28b3a08e-df50-43a9-af23-15d7f90fa6e9.JPG', width: 1515, height: 934 },
  { id: '1831d486-1c7e-45be-a14f-919ecbaa8207.jpg', width: 950, height: 628 },
]

function download(imageUrl, imageName) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading from ${imageUrl}`)

    https.get(imageUrl, (response) => {
      console.log(typeof response.statusCode, response.statusCode)
      if (response.statusCode === 200) {
        response
          .pipe(fs.createWriteStream(imageName))
          .on('error', reject)
          .once('close', () => {
            console.log(`Image downloaded as ${imageName}`)
            resolve(response)
          })
      } else if (response.statusCode === 302) {
        download(response.headers.location, imageName).then(resolve, reject)
      } else {
        response.resume()
        reject(new Error(`Error ${response.statusCode}: ${response.statusMessage}`))
      }
    })
  })
}

try {
  for (const { id, width, height } of ids) {
    const imageUrl = `https://picsum.photos/seed/${id}/${width}/${height}`
    const imageName = `./uploads/${id}`
    await download(imageUrl, imageName)
  }
} catch (error) {
  console.error(error.message)
}
