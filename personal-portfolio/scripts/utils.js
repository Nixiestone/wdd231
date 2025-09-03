// scripts/utils.js
export function formatTools(tools) {
  return tools.map((t) => `<span class="badge">${t}</span>`).join(" ");
}