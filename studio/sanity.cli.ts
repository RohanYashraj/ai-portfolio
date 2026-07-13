import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "./sanity.config";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "rohanyashraj",
  deployment: { appId: "i4zpwsh0bkeiuukr54op1tfk" },
});
