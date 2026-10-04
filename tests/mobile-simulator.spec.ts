import { test, expect, Page } from '@playwright/test';

// Keep expectations independent of the rendered catalog: these are the supplied apps.
const apps = [
  ['Uguide', 'com.uguideapp'],
  ['Fanith', 'com.fanithapp'],
  ['Heal 24/7', 'com.heal247.patient'],
  ['Delyfy', 'com.delyfy'],
  ['BRPL Power', 'com.bses.bsesapp'],
  ['BYPL Connect', 'com.bses.bypl.prod'],
  ['G10 Gold', 'com.goldsaving'],
  ['Zeppico', 'com.zeppicocustomer'],
  ['Supraa', 'com.supraa'],
];

const simulator = (page: Page) => page.getByRole('dialog', { name: 'Mobile simulator' });
const run = (page: Page) => page.getByRole('button', { name: 'Run Project Demo', exact: true });

const dismissMobileExplorer = async (page: Page) => {
  const toggle = page.getByRole('button', { name: 'Toggle Explorer', exact: true });
  if (await toggle.isVisible()) await toggle.click();
};

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await dismissMobileExplorer(page);
});

test('Run shows all nine local logos and exact store links without changing the editor', async ({ page }, testInfo) => {
  await expect(run(page)).toBeInViewport();
  await run(page).click();
  const dialog = simulator(page);
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('link')).toHaveCount(9);
  await expect(dialog.getByRole('button', { name: 'Close simulator' })).toBeFocused();
  for (const [name, id] of apps) {
    const link = dialog.getByRole('link', { name: `Open ${name} on Google Play (opens in a new tab)`, exact: true });
    await expect(link).toHaveAttribute('href', `https://play.google.com/store/apps/details?id=${id}&hl=en_IN`);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    await expect.poll(() => link.locator('img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  }
  const bounds = await dialog.boundingBox();
  const viewport = page.viewportSize()!;
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.y).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width);
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height);
  await dialog.getByRole('link').last().scrollIntoViewIfNeeded();
  await expect(dialog.getByRole('link').last()).toBeInViewport();
  await dialog.locator('.simulator-launcher').evaluate((element) => { element.scrollTop = 0; });
  await page.screenshot({ path: testInfo.outputPath('simulator.png'), animations: 'disabled' });
  if (testInfo.project.name === 'desktop') {
    await page.setViewportSize({ width: 1280, height: 960 });
    await expect(dialog.getByRole('link').last()).toBeInViewport();
    await page.screenshot({ path: testInfo.outputPath('simulator-tall.png'), animations: 'disabled' });
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole('heading', { name: 'Mohammad Abrar', exact: true })).toBeVisible();
});

test('app click opens a new tab while keeping the phone open', async ({ page, context }) => {
  await context.route('https://play.google.com/**', (route) => route.fulfill({
    status: 200, contentType: 'text/html', body: '<title>Google Play test destination</title>',
  }));
  await run(page).click();
  const newTab = context.waitForEvent('page');
  await simulator(page).getByRole('link', { name: 'Open Fanith on Google Play (opens in a new tab)', exact: true }).click();
  const store = await newTab;
  await expect(store).toHaveURL('https://play.google.com/store/apps/details?id=com.fanithapp&hl=en_IN');
  await expect(simulator(page)).toBeVisible();
  await store.close();
});

test('keyboard focus stays in the phone and dismissal restores Run focus', async ({ page }) => {
  await run(page).click();
  await expect(simulator(page).getByRole('button', { name: 'Close simulator' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(simulator(page).getByRole('link').last()).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(simulator(page).getByRole('button', { name: 'Close simulator' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(simulator(page)).not.toBeVisible();
  await expect(run(page)).toBeFocused();
  await run(page).click();
  await expect(page.locator('dialog[open]')).toHaveCount(1);
  await simulator(page).getByRole('button', { name: 'Close simulator' }).click();
  await expect(run(page)).toBeFocused();
});

test('backdrop closes the phone but clicking inside it does not', async ({ page }) => {
  await run(page).click();
  await simulator(page).getByRole('heading', { name: "Apps I've worked on" }).click();
  await expect(simulator(page)).toBeVisible();
  await page.mouse.click(3, 3);
  await expect(simulator(page)).not.toBeVisible();
  await expect(run(page)).toBeFocused();
});

test('sidebar Launch uses the same simulator and restores its trigger', async ({ page }) => {
  await page.getByRole('button', { name: 'Run and Debug (⇧⌘D)', exact: true }).click();
  const launch = page.getByRole('button', { name: 'Launch Mobile App', exact: true });
  await launch.click();
  await expect(page.locator('dialog[open]')).toHaveCount(1);
  await expect(simulator(page).getByRole('link')).toHaveCount(9);
  await simulator(page).getByRole('button', { name: 'Close simulator' }).click();
  await expect(launch).toBeFocused();
});

test('Run remains available with every editor tab closed', async ({ page }) => {
  const closeTabs = page.getByRole('button', { name: /^Close .*\.(tsx|html|js|json|ts|css|md)$/ });
  while (await closeTabs.count()) await closeTabs.first().click();
  await expect(page.getByText('No open files. Choose a file from the Explorer.')).toBeVisible();
  await expect(run(page)).toBeInViewport();
  await run(page).click();
  await expect(simulator(page)).toBeVisible();
});

test('a failed logo shows initials while its app stays clickable', async ({ page }) => {
  await page.route('**/app-icons/delyfy.jpg', (route) => route.abort());
  await run(page).click();
  const delyfy = simulator(page).getByRole('link', { name: 'Open Delyfy on Google Play (opens in a new tab)', exact: true });
  await expect(delyfy.locator('img')).toHaveCount(0);
  await expect(delyfy.locator('.simulator-app-initials')).toHaveText('D');
  await expect(delyfy).toHaveAttribute('href', 'https://play.google.com/store/apps/details?id=com.delyfy&hl=en_IN');
});

test('alternate theme and reduced motion retain usable phone controls', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => {
    localStorage.setItem('abrar-portfolio-theme', 'rose-pine');
  });
  await page.reload();
  await dismissMobileExplorer(page);
  await run(page).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'rose-pine');
  await expect(simulator(page)).toHaveCSS('animation-name', 'none');
  await simulator(page).getByRole('link').last().scrollIntoViewIfNeeded();
  await expect(simulator(page).getByRole('link').last()).toBeInViewport();
  await page.screenshot({ path: testInfo.outputPath('simulator-rose-pine.png'), animations: 'disabled' });
  await simulator(page).getByRole('button', { name: 'Close simulator' }).click();
  await expect(run(page)).toBeFocused();
});
