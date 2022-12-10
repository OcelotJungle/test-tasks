import { BinaryLike, createHash } from "crypto";

const hash = createHash("sha256");
const sha256 = (data: BinaryLike) => hash.copy().update(data).digest("hex");

export default sha256;