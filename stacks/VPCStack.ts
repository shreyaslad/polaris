import { StackContext } from "sst/constructs";
import { aws_ec2 } from "aws-cdk-lib";

export function VPCStack({ stack }: StackContext) {
  const vpc = new aws_ec2.Vpc(stack, "polaris-vpc", {
    vpcName: `${stack.stage}-control-vpc`,
    ipAddresses: aws_ec2.IpAddresses.cidr("10.0.0.0/16"),
    natGateways: 0,
    subnetConfiguration: [
      {
        "name": "polaris-public-1",
        subnetType: aws_ec2.SubnetType.PUBLIC,
        cidrMask: 24
      },
      {
        "name": "polaris-public-2",
        subnetType: aws_ec2.SubnetType.PUBLIC,
        cidrMask: 24
      }
    ]
  });

  return {
    vpc
  }
}
