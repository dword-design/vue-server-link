import { endent } from '@dword-design/functions'
import tester from '@dword-design/tester'
import testerPluginComponent from '@dword-design/tester-plugin-component'
import testerPluginPuppeteer from '@dword-design/tester-plugin-puppeteer'
import { createRequire } from 'module'

const _require = createRequire(import.meta.url)

export default tester(
  {
    active: {
      page: endent`
        <template>
          <self class="foo" :to="{ name: 'index' }">
            Foo
          </self>
        </template>

      `,
      async test() {
        await this.page.goto('http://localhost:3000')
        await this.page.waitForSelector('.foo.nuxt-link-active')
      },
    },
    activeClass: {
      page: endent`
        <template>
          <self class="foo" active-class="is-active" :to="{ name: 'index' }">
            Foo
          </self>
        </template>

      `,
      async test() {
        await this.page.goto('http://localhost:3000')
        await this.page.waitForSelector('.foo.is-active')
      },
    },
    navigation: {
      files: {
        'pages/other.vue': endent`
          <template>
            <div class="bar">
              Bar
            </div>
          </template>
        `,
      },
      page: endent`
        <template>
          <self class="foo" :to="{ name: 'other' }">
            Foo
          </self>
        </template>

      `,
      async test() {
        await this.page.goto('http://localhost:3000')

        const foo = await this.page.waitForSelector('.foo')
        expect(await foo.evaluate(el => el.innerText)).toEqual('Foo')
        await foo.click()
        await this.page.waitForNavigation()

        const bar = await this.page.waitForSelector('.bar')
        expect(await bar.evaluate(el => el.innerText)).toEqual('Bar')
      },
    },
    tag: {
      page: endent`
        <template>
          <self class="foo" tag="button" :to="{ name: 'index' }">
            Foo
          </self>
        </template>

      `,
      async test() {
        await this.page.goto('http://localhost:3000')
        await this.page.waitForSelector('button.foo')
      },
    },
  },
  [
    testerPluginComponent({ componentPath: _require.resolve('./index.vue') }),
    testerPluginPuppeteer(),
  ],
)
