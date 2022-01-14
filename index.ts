import { readdirSync, readFileSync, writeFileSync } from "fs";
import * as _ from "underscore";

const lines = readdirSync("logs")
  .map((name) => readFileSync(`logs/${name}`, "utf-8"))
  .map((file) =>
    file
      .trim()
      .split("\n")
      .map((l) => l.replace(/(\d\.\d|\d|\[{\\\\.+}]})+/g, "x"))
  )
  .reduce((all, lines) => all.concat(lines), []);

const report = _.values(_(lines).groupBy())
  .map((group) => ({
    action: group[0],
    count: group.length,
  }))
  .sort((a, b) => b.count - a.count);

writeFileSync("report.json", JSON.stringify(report));
