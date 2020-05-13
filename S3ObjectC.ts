import { summon, AsOpaque } from "./summoner";
import * as utils from "@morphic-ts/batteries/lib/usage/utils";

// ---- Morph creation C  NOT WORKING ----------------
const S3ObjectC_ = summon((F) =>
  F.interface(
    {
      Key: F.string(),
    },
    "S3ObjectC"
  )
);
export interface S3ObjectC extends utils.AType<typeof S3ObjectC_> {}
export interface S3ObjectCRaw extends utils.EType<typeof S3ObjectC_> {}
export const S3ObjectC = AsOpaque<S3ObjectCRaw, S3ObjectC>()(S3ObjectC_);
// ---- END ------------------------------------------

// ---- Morph creation F  NOT WORKING ----------------
export const decode = (key: string) => S3ObjectC.type.decode(key)
// ---- END ------------------------------------------