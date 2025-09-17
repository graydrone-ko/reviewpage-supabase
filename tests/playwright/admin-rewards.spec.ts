import { test, expect } from '@playwright/test';

const baseUrl = 'https://reviewpage-frontend3.vercel.app';
const adminEmail = 'admin@reviewpage.com';
const adminPassword = '7300gray';

async function loginAsAdmin(page) {
  await page.goto(`${baseUrl}/login`);
  await page.getByPlaceholder('이메일').fill(adminEmail);
  await page.getByPlaceholder('비밀번호').fill(adminPassword);
  await Promise.all([
    page.waitForURL(/\/admin\//),
    page.getByRole('button', { name: '로그인' }).click()
  ]);
}

test('리워드 관리 필터와 상태 뱃지 확인', async ({ page }) => {
  await loginAsAdmin(page);
  await page.goto(`${baseUrl}/admin/rewards`);

  // 상태 필터 옵션 확인
  const filter = page.getByRole('combobox');
  await expect(filter).toBeVisible();
  await expect(filter).toContainText('리워드 적립');
  await expect(filter).toContainText('지급 대기');
  await expect(filter).toContainText('지급 완료');

  // 테이블 로드 확인
  const table = page.locator('table');
  await expect(table).toBeVisible();

  // 상태 배지 텍스트가 존재하는지 확인
  const earnedCount = await page.locator('span', { hasText: '리워드 적립' }).count();
  const pendingCount = await page.locator('span', { hasText: '지급 대기' }).count();
  const paidCount = await page.locator('span', { hasText: '지급 완료' }).count();

  expect(earnedCount + pendingCount + paidCount).toBeGreaterThan(0);
});
