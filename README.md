# CICD-test

[![CI Pipeline](https://github.com/wfeng0514/CICD-test/actions/workflows/ci.yml/badge.svg)](https://github.com/wfeng0514/CICD-test/actions/workflows/ci.yml)
[![CD Pipeline](https://github.com/wfeng0514/CICD-test/actions/workflows/cd.yml/badge.svg)](https://github.com/wfeng0514/CICD-test/actions/workflows/cd.yml)

基于 **GitHub Actions** 的 CI/CD 测试项目，集成了完整的代码质量保障体系——从本地 git hooks 到服务端 CI/CD 流水线。

## 📁 项目结构

```
CICD-test/
├── .github/
│   └── workflows/
│       ├── ci.yml                # CI 流水线（Lint → Test → Build）
│       └── cd.yml                # CD 流水线（Deploy → Release）
├── .husky/
│   ├── commit-msg                # 提交信息校验（commitlint）
│   └── pre-push                  # 推送前检查（lint + test）
├── .vscode/
│   ├── settings.json             # 编辑器配置（保存自动格式化 + ESLint 提示）
│   └── extensions.json           # 推荐扩展（ESLint + Prettier）
├── src/
│   ├── index.js                  # 应用入口
│   └── index.test.js             # 单元测试（15 个用例）
├── .eslintrc.json                # ESLint 规则配置
├── .prettierrc                   # Prettier 格式化规则
├── commitlint.config.js          # Commit 信息校验规则
├── .gitignore                    # Git 忽略规则
├── .gitattributes                # 行尾符统一（强制 LF）
├── package.json
└── README.md
```

## 🏗️ 质量保障体系

本项目的质量保障覆盖了三层防线：

```
git commit ──→ commit-msg ──→ 校验提交格式 <type>: <desc>
                                  ❌ 不合法 → 拦截提交
                                  ✅ 合法   → 提交成功

git push ────→ pre-push ────→ ESLint 代码检查
                          ──→ Jest 单元测试
                                  ❌ 失败 → 拦截推送
                                  ✅ 通过 → 推送至 GitHub

GitHub ──────→ CI Pipeline ─→ Lint (ESLint)
                          ─→ Test (Node 18/20/22 矩阵)
                          ─→ Build
                                  ❌ 失败 → PR 不允许合并 *
                                  ✅ 通过 → 允许合并 + CD 部署
```

> \* 需在 GitHub Settings → Branches 配置分支保护规则，勾选 Required status checks。

## ⚙️ CI/CD 流水线

### CI 流水线 ([.github/workflows/ci.yml](.github/workflows/ci.yml))

触发条件：`push` / `pull_request` 到 `main` 或 `develop` 分支

| 阶段 | 说明 |
|------|------|
| **Lint** | ESLint 代码规范检查，`--max-warnings 0` 零容忍 |
| **Test** | Jest 在 Node.js 18 / 20 / 22 三版本矩阵并行测试，Node 20 上传覆盖率报告 |
| **Build** | 构建项目并产出构建物 |

依赖链：`Lint` → `Test` → `Build`（前一个失败，后续阶段全部跳过）

### CD 流水线 ([.github/workflows/cd.yml](.github/workflows/cd.yml))

触发条件：`push` 到 `main` 分支 / 手动触发

| 阶段 | 说明 |
|------|------|
| **Deploy** | 部署到 staging / production 环境（支持手动选择环境） |
| **Release** | production 部署时自动创建 GitHub Release |

## 📝 Commit 规范

所有提交必须遵循 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
<type>: <description>
```

可用的 type：

| type | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 bug |
| `docs` | 文档变更 |
| `style` | 格式调整（不影响逻辑） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具/依赖 |
| `ci` | CI/CD 配置 |
| `revert` | 回滚 |

示例：`feat: add user login`、`fix: resolve crash on startup`、`chore: update eslint config`

配置规则见 [commitlint.config.js](commitlint.config.js)。

## 🔧 代码规范

### ESLint

基于 `eslint:recommended` + `eslint-config-prettier`（避免与 Prettier 冲突），规则见 [.eslintrc.json](.eslintrc.json)。

### Prettier

| 配置项 | 值 |
|--------|-----|
| 分号 | `true` |
| 单引号 | `true` |
| 尾逗号 | `all` |
| 行宽 | `100` |

规则见 [.prettierrc](.prettierrc)。

### VSCode 集成

打开项目后 VSCode 会自动提示安装推荐扩展。保存文件时自动执行：
- **Prettier** 格式化代码
- **ESLint** 修复可自动修复的问题

实时编辑时 ESLint 错误会显示红色波浪线。

## 🚀 快速开始

### 前置要求

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9
- [VSCode](https://code.visualstudio.com/)（推荐）+ ESLint & Prettier 扩展

### 本地运行

```bash
git clone https://github.com/wfeng0514/CICD-test.git
cd CICD-test
npm install

npm start        # 启动应用
npm test         # 运行测试 + 覆盖率
npm run lint     # 代码检查
npm run format   # 格式化代码
```

### 代理配置（如需要）

```bash
git config --global http.proxy http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897
```

## 📋 可用脚本

| 命令 | 说明 |
|------|------|
| `npm start` | 启动应用 |
| `npm test` | 运行测试并生成覆盖率报告 |
| `npm run test:watch` | 监听模式运行测试 |
| `npm run lint` | ESLint 代码检查 |
| `npm run lint:fix` | ESLint 自动修复 |
| `npm run format` | Prettier 格式化代码 |
| `npm run format:check` | 检查格式是否合规 |
| `npm run build` | 构建项目 |

## 🔧 技术栈

| 类别 | 工具 |
|------|------|
| 运行时 | Node.js |
| 测试 | Jest（覆盖率报告） |
| 代码检查 | ESLint |
| 代码格式化 | Prettier |
| Git Hooks | Husky |
| 提交规范 | Commitlint + Conventional Commits |
| CI/CD | GitHub Actions |
| 编辑器 | VSCode（settings + extensions 团队共享） |

## 📄 License

MIT © [wfeng0514](https://github.com/wfeng0514)
