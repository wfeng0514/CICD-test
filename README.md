# CICD-test

[![CI Pipeline](https://github.com/wfeng0514/CICD-test/actions/workflows/ci.yml/badge.svg)](https://github.com/wfeng0514/CICD-test/actions/workflows/ci.yml)
[![CD Pipeline](https://github.com/wfeng0514/CICD-test/actions/workflows/cd.yml/badge.svg)](https://github.com/wfeng0514/CICD-test/actions/workflows/cd.yml)

基于 **GitHub Actions** 的 CI/CD 测试项目，演示自动化构建、测试、部署流水线。

## 📁 项目结构

```
CICD-test/
├── .github/
│   └── workflows/
│       ├── ci.yml          # CI 流水线（Lint → Test → Build）
│       └── cd.yml          # CD 流水线（Deploy → Release）
├── src/
│   ├── index.js            # 应用入口
│   └── index.test.js       # 单元测试
├── package.json
├── .gitignore
└── README.md
```

## ⚙️ CI/CD 流水线

### CI 流水线 (`ci.yml`)

触发条件：`push` / `pull_request` 到 `main` 或 `develop` 分支

| 阶段 | 说明 |
|------|------|
| **Lint** | ESLint 代码规范检查 |
| **Test** | Jest 多版本 Node.js 矩阵测试 (18, 20, 22) + 覆盖率报告 |
| **Build** | 构建项目并产出构建物 |

### CD 流水线 (`cd.yml`)

触发条件：`push` 到 `main` 分支 / 手动触发 (`workflow_dispatch`)

| 阶段 | 说明 |
|------|------|
| **Deploy** | 部署到 staging / production 环境 |
| **Release** | production 部署时自动创建 GitHub Release |

## 🚀 快速开始

### 前置要求

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9

### 本地运行

```bash
# 克隆仓库
git clone https://github.com/wfeng0514/CICD-test.git
cd CICD-test

# 安装依赖
npm install

# 运行应用
npm start

# 运行测试
npm test

# 代码检查
npm run lint
```

### 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `NODE_ENV` | 运行环境 | `development` |

## 📋 可用脚本

| 命令 | 说明 |
|------|------|
| `npm start` | 启动应用 |
| `npm test` | 运行测试并生成覆盖率报告 |
| `npm run test:watch` | 监听模式运行测试 |
| `npm run lint` | 代码规范检查 |
| `npm run lint:fix` | 自动修复代码规范问题 |
| `npm run build` | 构建项目 |

## 🔧 技术栈

- **运行时**: Node.js
- **测试框架**: Jest
- **代码检查**: ESLint
- **CI/CD**: GitHub Actions

## 📄 License

MIT © [wfeng0514](https://github.com/wfeng0514)
