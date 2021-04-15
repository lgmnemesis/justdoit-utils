const path = require('path')
const fs = require('fs')

const coreBaseDir = '../../justdoit-core'
const coreBuildContractsDir = `${coreBaseDir}/build/contracts`
const interfaceBaseDir = '../../justdoit-interface'
const interfaceContractsAbiDir = `${interfaceBaseDir}/src/constants/abis`

const rDirectoryPath = path.join(__dirname, coreBuildContractsDir)

fs.readdir(rDirectoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to read directory: ' + err)
  }

  console.log(`Copying ABIs from core to interface`)
  console.log(`Destination: ${interfaceContractsAbiDir}`)
  files.forEach((file) => {
    if (!file.match('.json')) return
    if (file.match('Migrations')) return
    const json = require(`${coreBuildContractsDir}/${file}`)
    const wDirectoryPath = path.join(
      __dirname,
      `${interfaceContractsAbiDir}/${file}`,
    )
    fs.writeFileSync(wDirectoryPath, JSON.stringify(json.abi, null, 2))
    console.log(`Copied: ${file}`)
  })
})
