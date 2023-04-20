import { SSTConfig } from "sst";

import { VPCStack } from "./stacks/VPCStack";
import { ComputeStack } from "./stacks/ComputeStack";

export default {
  config(_input) {
    return {
      name: "polaris",
      region: "us-west-2",
    };
  },
  stacks(app) {
    app.stack(VPCStack);
    app.stack(ComputeStack);
  }
} satisfies SSTConfig;
