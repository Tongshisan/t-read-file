#!/usr/bin/env node

import { program } from "commander";
import fs from "fs";
import clipboardy from "clipboardy";

program.version("1.0.10").description("这是一个读取文件的命令行工具");

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

program
  .command("copy <path>")
  .description("复制指定文件的内容到剪贴板")
  .action((path) => {
    try {
      const fileContent = fs.readFileSync(path, "utf-8");
      clipboardy.writeSync(fileContent);
      console.log(`文件 "${path}" 的内容已成功复制到剪贴板。`);
    } catch (err) {
      if (err.code === "ENOENT") {
        console.error(`错误：文件 "${path}" 未找到。`);
      } else if (err.message && err.message.includes("read-only")) {
        console.error("错误：无法写入剪贴板。请确保剪贴板可用。");
      } else {
        console.error("操作失败:", err.message);
      }
    }
  });

program.parse(process.argv);
