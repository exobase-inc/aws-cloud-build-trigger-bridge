import _ from 'radash'
import { Props } from '@exobase/core'
import { useLambda } from '@exobase/lambda'
import { useApiKeyAuthentication } from '@exobase/auth'
import { useJsonArgs } from '@exobase/hooks'
import { CodeBuildClient, StartBuildCommand } from '@aws-sdk/client-codebuild'


const config = {
  projectName: process.env['AWS_CODE_BUILD_PROJECT_NAME'],
  apiKey: process.env['BRIDGE_API_KEY']
}

type Args = {
  args: any
}

async function triggerBuild({ args }: Props<Args>) {
  const client = new CodeBuildClient({
    region: 'us-east-1'
  })
  const command = new StartBuildCommand({
    projectName: config.projectName,
    environmentVariablesOverride: [{
      name: 'TASK_ARGS',
      value: Buffer.from(
        JSON.stringify(args.args)
      ).toString('base64')
    }]
  })
  await client.send(command)
}

export default _.compose(
  useLambda(),
  useApiKeyAuthentication(config.apiKey),
  useJsonArgs<Args>(yup => ({
    args: yup.mixed().default({})
  })),
  triggerBuild
)