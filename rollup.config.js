/*!
 * Copyright © 2021 Amin NAIRI
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {resolve} from "path";
import {terser} from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";

export default {
  input: resolve("sources", "index.ts"),
  plugins: [
    typescript(),
    terser({
      ecma: 5,
      module: false,
      toplevel: true,
      nameCache: null,
      ie8: false,
      keep_classnames: false,
      keep_fnames: false,
      safari10: false,
      parse: {
        bare_returns: false,
        html5_comments: false,
        shebang: false,
        spidermonkey: false
      },
      compress: {
        defaults: false,
        arrows: true,
        arguments: true,
        booleans: true,
        booleans_as_integers: true,
        collapse_vars: true,
        comparisons: true,
        computed_props: true,
        conditionals: true,
        dead_code: true,
        directives: true,
        drop_console: true,
        drop_debugger: true,
        ecma: 5,
        evaluate: true,
        expression: false,
        global_defs: {},
        hoist_funs: false,
        hoist_vars: false,
        hoist_props: false,
        if_return: true,
        inline: true,
        join_vars: true,
        keep_classnames: false,
        keep_fargs: false,
        keep_fnames: false,
        keep_infinity: false,
        loops: true,
        module: false,
        negate_iife: true,
        passes: 2,
        properties: true,
        pure_funcs: ["validate", "string", "number", "boolean", "nil", "array", "index", "object", "property", "optionalProperty", "oneOf"],
        pure_getters: [],
        reduce_vars: true,
        reduce_funcs: true,
        sequences: true,
        side_effects: true,
        switches: true,
        toplevel: true,
        typeofs: true,
        unused: true
      },
      format: {
        ascii_only: false,
        beautify: false,
        braces: false,
        comments: false,
        ecma: 5,
        indent_level: 0,
        indent_start: 0,
        inline_script: true,
        keep_numbers: false,
        keep_quoted_props: false,
        max_line_len: false,
        preamble: null,
        quote_keys: false,
        quote_style: 1,
        preserve_annotations: false,
        safari10: false,
        semicolons: true,
        shebang: false,
        spidermonkey: false,
        webkit: false,
        wrap_iife: false,
        wrap_func_args: true
      }
    }),
    copy({
      targets: [
        {
          src: resolve("sources", "index.ts"),
          dest: resolve("")
        }
      ]
    })
  ],
  output: [
    {
      file: resolve("index.js"),
      format: "umd",
      name: "aminnairi.jsonvalidator"
    },
    {
      file: resolve("index.mjs"),
      format: "esm"
    }
  ]
};
