import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

import { summon, AsOpaque } from "./summoner";
import * as utils from "@morphic-ts/batteries/lib/usage/utils";
import * as S3ObjectC from './S3ObjectC'

// ---- Morph creation A  NOT WORKING ----------------
const S3Object_ = summon((F) =>
  F.interface(
    {
      Key: F.string(),
    },
    "S3Object"
  )
);
interface S3Object extends utils.AType<typeof S3Object_> {}
interface S3ObjectRaw extends utils.EType<typeof S3Object_> {}
const S3Object = AsOpaque<S3ObjectRaw, S3Object>()(S3Object_);
// ---- END ------------------------------------------

// -- Lambda (within step functions) Permissi
const lambdaRole = new aws.iam.Role("lambdaRole", {
  assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
    Service: "lambda.amazonaws.com",
  }),
});

new aws.iam.RolePolicy("lambdaRolePolicy", {
  role: lambdaRole.id,
  policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ],
        Resource: "arn:aws:logs:*:*:*",
      },
    ],
  },
});

const unzipFunction = new aws.serverless.Function(
  "unzipFunction",
  { role: lambdaRole},
  async (event: any, context, callback) => {
    // ---- Morph creation B WORKING ----------------
    const S3ObjectB_ = summon((F) =>
      F.interface(
        {
          Key: F.string(),
        },
        "S3ObjectB"
      )
    );
    interface S3ObjectB extends utils.AType<typeof S3ObjectB_> {}
    interface S3ObjectBRaw extends utils.EType<typeof S3ObjectB_> {}
    const S3ObjectB = AsOpaque<S3ObjectBRaw, S3ObjectB>()(S3ObjectB_);
    // ---- END ------------------------------------------
    
    // ---- Morph creation D SERIALIZATION WORKING ----------------
    // const runtimeImport = await import('./S3ObjectC')
    // ---- END ------------------------------------------
    
    
    S3ObjectB.type.decode({ Key: "Hello" }); // WORKING :) 

    // S3Object.type.decode({ Key: "Hello" }); // NOT WORKING! SERIALIZATION ERROR
    // S3ObjectC.S3ObjectC.type.decode({ Key: "Hello" });// NOT WORKING! SERIALIZATION ERROR
    // S3ObjectC.decode('Hello') // NOT WORKING! SERIALIZATION ERROR
    // runtimeImport.S3ObjectC.type.decode({ Key: "Hello" }); // NOT WORKING! RUNTIME ERROR not finding module './S3ObjectC'
    // runtimeImport.decode('Hello') // NOT WORKING! RUNTIME ERROR not finding module './S3ObjectC'
    

    callback(null, {
      statusCode: 200,
      body: "Success",
    });
  }
);

export const lambda = unzipFunction.lambda.arn;
