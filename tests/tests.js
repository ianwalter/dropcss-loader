const { join } = require('path')
const { test } = require('@ianwalter/bff')
const webpack = require('webpack')
const MemoryFileSystem = require('memory-fs')

test('unused CSS rules are removed', ({ expect }) => {
  return new Promise (resolve => {
    const compiler = webpack({
      entry: join(__dirname, './fixtures/example.css'),
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              {
                loader: '@ianwalter/callback-loader',
                options: {
                  callback (content) {
                    expect(content).toMatchSnapshot()
                    resolve()
                  }
                }
              },
              {
                loader: join(__dirname, '../'),
                options: { html: join(__dirname, 'fixtures/example.html') }
              }
            ]
          }
        ]
      }
    })
    compiler.outputFileSystem = new MemoryFileSystem()
    compiler.run()
  })
})
