import{u as l,c as p,a0 as c,j as e,t,k as n,a as s,o as d}from"./chunks/framework.CGHvQLJz.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"devtool/vitepress.md","filePath":"devtool/vitepress.md"}'),h={name:"devtool/vitepress.md"},f=Object.assign(h,{setup(u){const{theme:i,page:r,frontmatter:o}=l();return(m,a)=>(d(),p("div",null,[a[0]||(a[0]=c(`<ul><li><p>prefetch page chunks for links within viewport. possbily be the next navigation</p></li><li><p>preload <code>&lt;link rel=&quot;preload&quot; href=&quot;welocome.mp4&quot; as=&quot;track&quot;/&gt;</code> in the current navigation,not inside the viewport, will be seen soon<code>font,fetch,image,script,style,track</code></p></li></ul><h2 id="install-requirement" tabindex="-1">install requirement <a class="header-anchor" href="#install-requirement" aria-label="Permalink to &quot;install requirement&quot;">​</a></h2><h2 id="setup-wizard-intergrated-side-project" tabindex="-1">setup wizard/intergrated side project <a class="header-anchor" href="#setup-wizard-intergrated-side-project" aria-label="Permalink to &quot;setup wizard/intergrated side project&quot;">​</a></h2><h2 id="file-structure" tabindex="-1">file structure <a class="header-anchor" href="#file-structure" aria-label="Permalink to &quot;file structure&quot;">​</a></h2><h3 id="the-project-root" tabindex="-1">the project root <a class="header-anchor" href="#the-project-root" aria-label="Permalink to &quot;the project root&quot;">​</a></h3><p>the docs directory is consider as the project root for the vitePress site.</p><p>reserved location for VitePress&#39; config file, dev server cache, build output, and optional theme customization code.</p><div class="language-tree vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">tree</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- docs # porject root</span></span>
<span class="line"><span>    - .vitepress # config dir</span></span>
<span class="line"><span>        - config.js</span></span>
<span class="line"><span>        - dist/</span></span>
<span class="line"><span>        - cache/</span></span>
<span class="line"><span>    - src # source dir</span></span>
<span class="line"><span>    -</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="up-and-running" tabindex="-1">up and running <a class="header-anchor" href="#up-and-running" aria-label="Permalink to &quot;up and running&quot;">​</a></h2><h2 id="deployment" tabindex="-1">deployment <a class="header-anchor" href="#deployment" aria-label="Permalink to &quot;deployment&quot;">​</a></h2><h2 id="config" tabindex="-1">config <a class="header-anchor" href="#config" aria-label="Permalink to &quot;config&quot;">​</a></h2><div class="language-typescript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> nav</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">D</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>the <code>srcDir</code> option is resovled reltive to project root</p><p>link between pages(files) linking to assets</p><h3 id="site-config" tabindex="-1">site config <a class="header-anchor" href="#site-config" aria-label="Permalink to &quot;site config&quot;">​</a></h3><h3 id="frontmatter-config" tabindex="-1">frontmatter config <a class="header-anchor" href="#frontmatter-config" aria-label="Permalink to &quot;frontmatter config&quot;">​</a></h3><p>forntmatter enable page based configuration.can be used to override side-level or theme-level config.</p><p>You can access frontmatter data via the $frontmatter global in Vue expressions:</p>`,18)),e("pre",null," "+t(n(i)),1),a[1]||(a[1]=e("h3",{id:"page-data",tabindex:"-1"},[s("Page Data "),e("a",{class:"header-anchor",href:"#page-data","aria-label":'Permalink to "Page Data"'},"​")],-1)),e("pre",null,t(n(r)),1),a[2]||(a[2]=e("h3",{id:"page-frontmatter",tabindex:"-1"},[s("Page Frontmatter "),e("a",{class:"header-anchor",href:"#page-frontmatter","aria-label":'Permalink to "Page Frontmatter"'},"​")],-1)),e("pre",null,t(n(o)),1)]))}});export{b as __pageData,f as default};
