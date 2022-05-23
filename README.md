# Bridge API for Exobase Task Runners

> Exobase provides build packs that provision task runner _like_ applications on AWS, GCP, and other cloud platforms. This API exposes a single `/trigger/build` endpoint that knows how to interact with specific implementations of a task runner in each cloud provider. If you move your task runner from AWS to GCP this bridge API does not change, your code does not change.

## Supported Build Packs
These build packs are provided by Exobase and designed to work with this bridge API
- terraform-aws-exo-ts-code-build-task-runner