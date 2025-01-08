import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"deploy/dns-register.md","filePath":"deploy/dns-register.md"}');
const _sfc_main = { name: "deploy/dns-register.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><p>domain name registrar provide&quot;:</p><p>data access secure from malicious actors.</p><p>domain hijacking attacks, registration of a domain name without the original registrants’s permission impersonate the original site or disrupt its business.</p><p>The registrar facilitates the transactions and provides support services, ICANN has a published list of every accredited and active domain name registrar on their website.</p><p>domain names can technically only be leased.</p><p>the registrar’s info is provided in the WHOIS listing for that domain, and the registrar acts as a proxy for the registrant.</p><h2 id="dns-lookup-query-resolution" tabindex="-1">DNS lookup/query resolution <a class="header-anchor" href="#dns-lookup-query-resolution" aria-label="Permalink to &quot;DNS lookup/query resolution&quot;">​</a></h2><p>Root nameserver</p><h2 id="dns-infrastructure" tabindex="-1">DNS infrastructure <a class="header-anchor" href="#dns-infrastructure" aria-label="Permalink to &quot;DNS infrastructure&quot;">​</a></h2><p>first stop last stop</p><h2 id="dns-server" tabindex="-1">DNS server <a class="header-anchor" href="#dns-server" aria-label="Permalink to &quot;DNS server&quot;">​</a></h2><p>All DNS servers fall into one of four categories: Recursive resolvers, root nameservers, TLD nameservers, and authoritative nameservers</p><p>assume there is no caching in play</p><p>stub resolver</p><p>recursive resolver</p><p>content hosted on several redundant web servers round-robin move to the recently responded ip back of the queue, operating on a loop.</p><p>makes a request to Netflix , such as the movie thumbnail images, the Netflix logo,</p><h2 id="dns-record" tabindex="-1">DNS record. <a class="header-anchor" href="#dns-record" aria-label="Permalink to &quot;DNS record.&quot;">​</a></h2><p>The &quot;A&quot; stands for &quot;address&quot; NS authoritative name server CNAME the canonical name for an alias</p><table tabindex="0"><thead><tr><th>Domain</th><th>Record Type</th><th>Value</th><th>TTL</th></tr></thead><tbody><tr><td>site.com</td><td>A</td><td>192.0.2.1</td><td>14400</td></tr></tbody></table><p>The &quot;@&quot; symbol indicates that this is a record for the root domain,</p><p>times out or returns an error if no record is found</p><h2 id="dns-provider-authorization-name-server-registration" tabindex="-1">DNS provider/authorization name server registration <a class="header-anchor" href="#dns-provider-authorization-name-server-registration" aria-label="Permalink to &quot;DNS provider/authorization name server registration&quot;">​</a></h2><h2 id="cdn" tabindex="-1">CDN <a class="header-anchor" href="#cdn" aria-label="Permalink to &quot;CDN&quot;">​</a></h2><p>distribute content closer to website visitors</p><p>go the the farm where the food is grown or local grocery store</p><p>load balance distribute requests active health checks steering direct traffic to the fastest origin server pool for a given user</p><p>filtering and monitoring HTTP traffic</p><h2 id="firewall" tabindex="-1">firewall <a class="header-anchor" href="#firewall" aria-label="Permalink to &quot;firewall&quot;">​</a></h2><h2 id="load-balance" tabindex="-1">load balance <a class="header-anchor" href="#load-balance" aria-label="Permalink to &quot;load balance&quot;">​</a></h2><p>runtime environment:on-premise, hybrid, or multi-cloud . An industry leader in marketing automation software</p><p>Investigating: Cloudflare is investigating an issue Identified:The cause of this issue has been identified and we are working toward a fix. fixed:</p><h2 id="cache-dns-record" tabindex="-1">cache DNS record <a class="header-anchor" href="#cache-dns-record" aria-label="Permalink to &quot;cache DNS record&quot;">​</a></h2><p>until time to live (TTL) expires</p><h2 id="cdn-cache-proxy" tabindex="-1">CDN Cache/Proxy <a class="header-anchor" href="#cdn-cache-proxy" aria-label="Permalink to &quot;CDN Cache/Proxy&quot;">​</a></h2><p>the CDN fetches that content from an origin server, and then saves a copy of the content for future requests.</p><h2 id="spectrum-of-dns-attacks" tabindex="-1">spectrum of DNS attacks <a class="header-anchor" href="#spectrum-of-dns-attacks" aria-label="Permalink to &quot;spectrum of DNS attacks&quot;">​</a></h2><p><code>cache hit</code>: client device makes a request to the cache for content, and the cache has that content saved. A cache miss occurs when the cache does not have the requested content.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("deploy/dns-register.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dnsRegister = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  dnsRegister as default
};
