// CI 冒烟测试文件：用于验证 server 的 tsc 能通过。
// 这个 PR 验证完即可关闭，不需要合并。
export function ciSmoke(): string {
  return 'server build ok';
}
