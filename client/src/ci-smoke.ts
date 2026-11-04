// CI 冒烟测试文件：用于验证 client 的 vue-tsc + vite build 能通过。
// 这个 PR 验证完即可关闭，不需要合并。
export function ciSmoke(): string {
  return 'client build ok'
}
