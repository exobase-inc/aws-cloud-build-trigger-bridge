import { getFunctionMap, start, lambdaFrameworkMapper } from '@exobase/local'
import path from 'path'

start({
  port: '7700',
  framework: lambdaFrameworkMapper,
  functions: getFunctionMap({
    moduleDirectoryPath: path.join(__dirname, 'modules'),
    extensions: ['.ts']
  }).map((f) => ({ ...f,
    func: require(f.paths.import).default
  }))
}, (p) => {
  console.log(`Bridge API running at http://localhost:${p}`)
})