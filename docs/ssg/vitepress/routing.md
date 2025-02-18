---
outline: deep
---

# Routing

vitepress map between visited url and served file

## File_Based Routing

access url to generated HTML pages are mapped from the file strcture of the  source markdown files 
<<<<<<< HEAD

## Root and Source directory

the pieces in the file strcture of a vitepress project: the **project root** and the **source directory**

### Project root

The project root is where vitepress will try to look the look for the `.vitepress` reserved direcotry. the `.vitepress` directory is reserved location for vitepress's config file, dev server cache, build output

when you run `vitepress dev` or `vitepress build` from the command line, the vitepress will use the current working direcotry(will be treated) as proejct root. To specify to a sbu-directory as root, you need to pass the relatvie path to command. For example, if your VitePress project is located in `./docs`, you should run `vitepress dev docs`



## Source Directory

Source directory is where you put you markdown source files.
the can config it via the `srcDir` config option.

the `srcDir` option is resolved to relative to project root.
with `srcDir: 'src'`, you file strcture should look like this

```
. # project root
- .vitepress/ #config dir
- src # source dir
    - reference.md
    - guide.md
    - index.md
```
=======
## fs resolution and url path resolution

base path

src dir and project root

###  source to url mapping
>>>>>>> c0b92e26c968f3071803735dff5d74461a5245e4

The rusulting source-to-url mapping
```
src/index.md --> /index.html(accessible as /)
src/guide.md --> /guide.html
```
<<<<<<< HEAD

## Linking Between Page
=======
### project root

`.vitepress`: reserved location for `vitepress config file`, `dev server cache`, `build output`, `optional theme customization`

Project root is where vitepress will try to look the look for the `.vitpress`


when you run `vitepress dev` or `vitepress build` from the command line, 
the vitepress will use the current working direcotry(will be treated) as proejct root.

`project root`: default to `process.cwd()` or specify sub directory `vitepress dev docs`



## File reference
>>>>>>> c0b92e26c968f3071803735dff5d74461a5245e4

you can use both absolute and relative path when linking between page


```md
<!-- sibling/peer directory  -->
<<<<<<< HEAD
[reference](../reference/site-co.md)
=======
[reference](./reference/site-co.md)
>>>>>>> c0b92e26c968f3071803735dff5d74461a5245e4
<!-- under same/current directory -->
[](../guide/routing.md)
```


<<<<<<< HEAD
> learn more about linking to assets such images in [Asset Handling](./asset-handling)

=======
>>>>>>> c0b92e26c968f3071803735dff5d74461a5245e4
### Linking to Non-vitepress page

::: tip Note

Alternatively, you can directly use the anchor tag syntax:

```md
<a href="/pure.html" target="_self">Link to pure.html</a>
```

:::

## cleaner URL

:::
To serve clean URLs with VitePress, server-side support is required.
:::


hosting platforms (for example Netlify, Vercel, GitHub Pages) provide the ability to map a URL like `/foo` to `/foo.html` if it exists, without a redirect:



- Netlify and GitHub Pages support this by default.
- Vercel requires enabling the [`cleanUrls` option in `vercel.json`](https://vercel.com/docs/concepts/projects/project-configuration#cleanurls).

<<<<<<< HEAD
enable vitepress' own [`cleanUrls`](../reference/site-config#cleanurls) config option


## Route Rewrites


```
.
└─ packages
   ├─ pkg-a
   │  └─ src
   │     ├─ foo.md
   │     └─ index.md
   └─ pkg-b
      └─ src
         ├─ bar.md
         └─ index.md
```

And you want the VitePress pages to be generated like this:

```
packages/pkg-a/src/index.md  -->  /pkg-a/index.html
packages/pkg-a/src/foo.md    -->  /pkg-a/foo.html
packages/pkg-b/src/index.md  -->  /pkg-b/index.html
packages/pkg-b/src/bar.md    -->  /pkg-b/bar.html
```

You can achieve this by configuring the [`rewrites`](../reference/site-config#rewrites) option like this:

```ts
// .vitepress/config.js
export default {
  rewrites: {
    'packages/pkg-a/src/index.md': 'pkg-a/index.md',
    'packages/pkg-a/src/foo.md': 'pkg-a/foo.md',
    'packages/pkg-b/src/index.md': 'pkg-b/index.md',
    'packages/pkg-b/src/bar.md': 'pkg-b/bar.md'
  }
}
```
The `rewrites` option also supports dynamic route paramete

```ts
export default {
  rewrites: {
    'packages/:pkg/src/:slug*': ':pkg/:slug*'
  }
}
```

## Render the raw content

```md
<!-- @content -->
```

## 测试 
=======


## Route Rewrites
>>>>>>> c0b92e26c968f3071803735dff5d74461a5245e4
