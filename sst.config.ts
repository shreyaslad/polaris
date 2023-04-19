import { SSTConfig } from "sst";
import { VPCStack } from "./stacks/VPCStack";

export default {
  config(_input) {
    return {
      name: "control",
      region: "us-west-2",
    };
  },
  stacks(app) {
    app.stack(VPCStack);
  }
} satisfies SSTConfig;
