import { StackContext, use } from "sst/constructs";
import { aws_ec2 } from "aws-cdk-lib";
import { VPCStack } from "./VPCStack";

export function ComputeStack({ stack }: StackContext) {
  const { vpc: polaris_vpc } = use(VPCStack);

  const master_instance_sg = new aws_ec2.SecurityGroup(stack, "polaris-master-sg", {
    vpc: polaris_vpc
  });

  master_instance_sg.addIngressRule(
    aws_ec2.Peer.anyIpv4(),
    aws_ec2.Port.tcp(22)
  );

  master_instance_sg.addIngressRule(
    aws_ec2.Peer.anyIpv4(),
    aws_ec2.Port.tcp(80)
  );

  master_instance_sg.addIngressRule(
    aws_ec2.Peer.anyIpv4(),
    aws_ec2.Port.tcp(443)
  );

  master_instance_sg.addIngressRule(
    aws_ec2.Peer.anyIpv4(),
    aws_ec2.Port.icmpPing()
  );

  const master_instance = new aws_ec2.Instance(stack, "polaris-master-instance", {
    vpc: polaris_vpc,
    vpcSubnets: {
      subnetType: aws_ec2.SubnetType.PUBLIC
    },
    instanceType: aws_ec2.InstanceType.of(
      aws_ec2.InstanceClass.T3A,
      aws_ec2.InstanceSize.SMALL
    ),
    machineImage: aws_ec2.MachineImage.genericLinux({
      "us-west-2": "ami-0cd489f3b21f7f643"
    }),
    securityGroup: master_instance_sg,
    keyName: "vscpair"
  });
}
