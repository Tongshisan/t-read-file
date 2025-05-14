#!/usr/bin/env node

import { program } from "commander";
import fs from "fs";

program.version("1.0.8").description("这是一个读取文件的命令行工具");

program
  .command("read <path>")
  .description("读取文件内容")
  .option("-l, --lines <number>", "读取指定行数", "10")
  .action((path, options) => {
    try {
      const content = fs.readFileSync(path, "utf-8");
      const lines = content.split("\n").slice(0, parseInt(options.lines));
      console.log(lines.join("\n"));
    } catch (err) {
      console.error("读取文件失败:", err.message);
    }
  });

program.parse(process.argv);
