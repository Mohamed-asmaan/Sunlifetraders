export type RoiState = "kerala" | "tamilnadu";

export const ROI_STATES: Record<RoiState, { label: string; tariff: number; sunHours: number }> = {
  kerala: { label: "Kerala (KSEB)", tariff: 7.1, sunHours: 4.6 },
  tamilnadu: { label: "Tamil Nadu (TANGEDCO)", tariff: 6.3, sunHours: 4.9 },
};

const COST_PER_KW = 58000;
const SAVINGS_RATIO = 0.9;
const LOAN_RATE = 0.09;
const LOAN_MONTHS = 84;

export function formatInr(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function subsidyFor(kw: number) {
  if (kw <= 1) return Math.round(kw * 30000);
  if (kw <= 2) return 30000 + Math.round((kw - 1) * 30000);
  if (kw < 3) return 60000 + Math.round((kw - 2) * 18000);
  return 78000;
}

export function calcRoi(bill: number, state: RoiState, hasEv: boolean) {
  const meta = ROI_STATES[state];
  const units = bill / meta.tariff;
  const evBoost = hasEv ? 1.25 : 1;
  const kw = Math.max(1, Math.min(10, (units * evBoost) / (meta.sunHours * 30)));
  const sysKw = Math.round(kw * 2) / 2;
  const gross = sysKw * COST_PER_KW;
  const subsidy = subsidyFor(sysKw);
  const net = gross - subsidy;
  const monthlySavings = bill * SAVINGS_RATIO;
  const r = LOAN_RATE / 12;
  const emi = (net * r * Math.pow(1 + r, LOAN_MONTHS)) / (Math.pow(1 + r, LOAN_MONTHS) - 1);
  const paybackYears = net / (monthlySavings * 12);
  const twentyFive = monthlySavings * 12 * 25 - net;
  return { sysKw, gross, subsidy, net, monthlySavings, emi, paybackYears, twentyFive, ...meta };
}
