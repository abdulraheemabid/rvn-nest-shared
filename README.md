# raven-nest-shared
It holds the common code needed accross the nest application such as utility functions, class & types etc. 

Plus it holds the contracts/clients of each microservice so whenever someone adds or updates a microservice, they need to update contract/clients here as well. This way consumers only have to update their rvn-nest-shared version number and they will receive the changes without having to implement the code themselves and keeping it consistent between all consumers.

## Microservice contracts & clients
1. Whenever a new microservice is created, two files should be created 
  1. `{msname}.contract.ds` in contracts folder
  2. `{msname}.client.ts` in ms-clients folder
2. In contract, three things will be required:
  1. An __interface__ which will act as a contract for clients. these interfaces should have all available methods listed with input/ouput types.
  2. A __ContractMessage class__ which should implement `IContactMessages`. Purpose of this class is to provide the message pattern for each method in each module which are exposed from that microservice. Clients will use these message patterns when they want to invoke a certain method.
  3. Lastly all the __DTOs__ should be listed as well
3. Client file is *optional* but recommended for ease of use. 
   1. This client class will implement the contract created from point 2.1.
   2. This class should accept a `clientProxy`, `logger` and `timeout` to configure. NOTE: *This may change in the future when service gateway is in place*.
   3. Instantiate MSClient class from this package using the variables from point 2.
   4. Use `MSClient` to call the required methods with messages and inputs/outputs defined in step 2.
4. Now the consumers just need to use inherit the client class from here and all communications would be abstracted.

See exising contract and clients in this package for reference.

Example of consuming microservice client created in this package:

```javascript

import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { DASClient } from '@abdulraheemabid/rvn-nest-shared';

@Injectable()
export class DasClientService extends DASClient {
    constructor(@Inject('RVN_MS_CLIENT') private client: ClientProxy, @Inject("timeout") private timeoutForMS: number) {
        super(client, new Logger(DasClientService.name, true), timeoutForMS);
    }
}

@Injectable()
export class FormService {
    constructor(private dasClient: DasClientService) { }

    async fetchAllForms() {
        return this.dasClient.fetchAllDefinitions()
    }
}

```

## Publish
1. Set local `.npmrc`
   ```
    //npm.pkg.github.com/:_authToken={GENERERATED_GITHUB_PERSONAL_ACCESS_TOKEN}
    @abdulraheemabid:registry=https://npm.pkg.github.com/
   ```
2. Make relevant changes and commit the changes to get clean working tree. 
3. Run `npm publish:patch | npm publish:minor | npm publish:major`.
4. You will see the updated package version in the console

## Consume
`npm install @abdulraheemabid/rvn-shared@0.0.1`
