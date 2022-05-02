import { reqJSONBin } from "../helpers";
import config from "../config.js";

const res = await reqJSONBin("get", config.tile_id);
const exitCode = res.result ? 0 : 1;

console.log(exitCode);

process.exit(exitCode);
