module.exports = [
"[project]/node_modules/@panva/hkdf/dist/node/esm/runtime/fallback.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
const __TURBOPACK__default__export__ = (digest, ikm, salt, info, keylen)=>{
    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
    const prk = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])(digest, salt.byteLength ? salt : new Uint8Array(hashlen)).update(ikm).digest();
    const N = Math.ceil(keylen / hashlen);
    const T = new Uint8Array(hashlen * N + info.byteLength + 1);
    let prev = 0;
    let start = 0;
    for(let c = 1; c <= N; c++){
        T.set(info, start);
        T[start + info.byteLength] = c;
        T.set((0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])(digest, prk).update(T.subarray(prev, start + info.byteLength + 1)).digest(), start);
        prev = start;
        start += hashlen;
    }
    return T.slice(0, keylen);
};
}),
"[project]/node_modules/@panva/hkdf/dist/node/esm/runtime/hkdf.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$panva$2f$hkdf$2f$dist$2f$node$2f$esm$2f$runtime$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@panva/hkdf/dist/node/esm/runtime/fallback.js [app-rsc] (ecmascript)");
;
;
let hkdf;
if (typeof __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["hkdf"] === 'function' && !process.versions.electron) {
    hkdf = async (...args)=>new Promise((resolve, reject)=>{
            __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["hkdf"](...args, (err, arrayBuffer)=>{
                if (err) reject(err);
                else resolve(new Uint8Array(arrayBuffer));
            });
        });
}
const __TURBOPACK__default__export__ = async (digest, ikm, salt, info, keylen)=>(hkdf || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$panva$2f$hkdf$2f$dist$2f$node$2f$esm$2f$runtime$2f$fallback$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(digest, ikm, salt, info, keylen);
}),
"[project]/node_modules/@panva/hkdf/dist/node/esm/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>hkdf,
    "hkdf",
    ()=>hkdf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$panva$2f$hkdf$2f$dist$2f$node$2f$esm$2f$runtime$2f$hkdf$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@panva/hkdf/dist/node/esm/runtime/hkdf.js [app-rsc] (ecmascript)");
;
function normalizeDigest(digest) {
    switch(digest){
        case 'sha256':
        case 'sha384':
        case 'sha512':
        case 'sha1':
            return digest;
        default:
            throw new TypeError('unsupported "digest" value');
    }
}
function normalizeUint8Array(input, label) {
    if (typeof input === 'string') return new TextEncoder().encode(input);
    if (!(input instanceof Uint8Array)) throw new TypeError(`"${label}"" must be an instance of Uint8Array or a string`);
    return input;
}
function normalizeIkm(input) {
    const ikm = normalizeUint8Array(input, 'ikm');
    if (!ikm.byteLength) throw new TypeError(`"ikm" must be at least one byte in length`);
    return ikm;
}
function normalizeInfo(input) {
    const info = normalizeUint8Array(input, 'info');
    if (info.byteLength > 1024) {
        throw TypeError('"info" must not contain more than 1024 bytes');
    }
    return info;
}
function normalizeKeylen(input, digest) {
    if (typeof input !== 'number' || !Number.isInteger(input) || input < 1) {
        throw new TypeError('"keylen" must be a positive integer');
    }
    const hashlen = parseInt(digest.substr(3), 10) >> 3 || 20;
    if (input > 255 * hashlen) {
        throw new TypeError('"keylen" too large');
    }
    return input;
}
async function hkdf(digest, ikm, salt, info, keylen) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$panva$2f$hkdf$2f$dist$2f$node$2f$esm$2f$runtime$2f$hkdf$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(normalizeDigest(digest), normalizeIkm(ikm), normalizeUint8Array(salt, 'salt'), normalizeInfo(info), normalizeKeylen(keylen, digest));
}
;
}),
"[project]/node_modules/preact/dist/preact.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Component",
    ()=>k,
    "Fragment",
    ()=>b,
    "cloneElement",
    ()=>E,
    "createContext",
    ()=>G,
    "createElement",
    ()=>_,
    "createRef",
    ()=>m,
    "h",
    ()=>_,
    "hydrate",
    ()=>D,
    "isValidElement",
    ()=>t,
    "options",
    ()=>l,
    "render",
    ()=>B,
    "toChildArray",
    ()=>H
]);
var n, l, u, t, i, o, r, f, e, c, s, a, h = {}, v = [], p = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, y = Array.isArray;
function d(n, l) {
    for(var u in l)n[u] = l[u];
    return n;
}
function w(n) {
    n && n.parentNode && n.parentNode.removeChild(n);
}
function _(l, u, t) {
    var i, o, r, f = {};
    for(r in u)"key" == r ? i = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];
    if (arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : t), "function" == typeof l && null != l.defaultProps) for(r in l.defaultProps)void 0 === f[r] && (f[r] = l.defaultProps[r]);
    return g(l, f, i, o, null);
}
function g(n, t, i, o, r) {
    var f = {
        type: n,
        props: t,
        key: i,
        ref: o,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        constructor: void 0,
        __v: null == r ? ++u : r,
        __i: -1,
        __u: 0
    };
    return null == r && null != l.vnode && l.vnode(f), f;
}
function m() {
    return {
        current: null
    };
}
function b(n) {
    return n.children;
}
function k(n, l) {
    this.props = n, this.context = l;
}
function x(n, l) {
    if (null == l) return n.__ ? x(n.__, n.__i + 1) : null;
    for(var u; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
    return "function" == typeof n.type ? x(n) : null;
}
function C(n) {
    var l, u;
    if (null != (n = n.__) && null != n.__c) {
        for(n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++)if (null != (u = n.__k[l]) && null != u.__e) {
            n.__e = n.__c.base = u.__e;
            break;
        }
        return C(n);
    }
}
function S(n) {
    (!n.__d && (n.__d = !0) && i.push(n) && !M.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(M);
}
function M() {
    var n, u, t, o, r, e, c, s;
    for(i.sort(f); n = i.shift();)n.__d && (u = i.length, o = void 0, e = (r = (t = n).__v).__e, c = [], s = [], t.__P && ((o = d({}, r)).__v = r.__v + 1, l.vnode && l.vnode(o), O(t.__P, o, r, t.__n, t.__P.namespaceURI, 32 & r.__u ? [
        e
    ] : null, c, null == e ? x(r) : e, !!(32 & r.__u), s), o.__v = r.__v, o.__.__k[o.__i] = o, j(c, o, s), o.__e != e && C(o)), i.length > u && i.sort(f));
    M.__r = 0;
}
function P(n, l, u, t, i, o, r, f, e, c, s) {
    var a, p, y, d, w, _ = t && t.__k || v, g = l.length;
    for(u.__d = e, $(u, l, _), e = u.__d, a = 0; a < g; a++)null != (y = u.__k[a]) && (p = -1 === y.__i ? h : _[y.__i] || h, y.__i = a, O(n, y, p, i, o, r, f, e, c, s), d = y.__e, y.ref && p.ref != y.ref && (p.ref && N(p.ref, null, y), s.push(y.ref, y.__c || d, y)), null == w && null != d && (w = d), 65536 & y.__u || p.__k === y.__k ? e = I(y, e, n) : "function" == typeof y.type && void 0 !== y.__d ? e = y.__d : d && (e = d.nextSibling), y.__d = void 0, y.__u &= -196609);
    u.__d = e, u.__e = w;
}
function $(n, l, u) {
    var t, i, o, r, f, e = l.length, c = u.length, s = c, a = 0;
    for(n.__k = [], t = 0; t < e; t++)null != (i = l[t]) && "boolean" != typeof i && "function" != typeof i ? (r = t + a, (i = n.__k[t] = "string" == typeof i || "number" == typeof i || "bigint" == typeof i || i.constructor == String ? g(null, i, null, null, null) : y(i) ? g(b, {
        children: i
    }, null, null, null) : void 0 === i.constructor && i.__b > 0 ? g(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i).__ = n, i.__b = n.__b + 1, o = null, -1 !== (f = i.__i = L(i, u, r, s)) && (s--, (o = u[f]) && (o.__u |= 131072)), null == o || null === o.__v ? (-1 == f && a--, "function" != typeof i.type && (i.__u |= 65536)) : f !== r && (f == r - 1 ? a-- : f == r + 1 ? a++ : (f > r ? a-- : a++, i.__u |= 65536))) : i = n.__k[t] = null;
    if (s) for(t = 0; t < c; t++)null != (o = u[t]) && 0 == (131072 & o.__u) && (o.__e == n.__d && (n.__d = x(o)), V(o, o));
}
function I(n, l, u) {
    var t, i;
    if ("function" == typeof n.type) {
        for(t = n.__k, i = 0; t && i < t.length; i++)t[i] && (t[i].__ = n, l = I(t[i], l, u));
        return l;
    }
    n.__e != l && (l && n.type && !u.contains(l) && (l = x(n)), u.insertBefore(n.__e, l || null), l = n.__e);
    do {
        l = l && l.nextSibling;
    }while (null != l && 8 === l.nodeType)
    return l;
}
function H(n, l) {
    return l = l || [], null == n || "boolean" == typeof n || (y(n) ? n.some(function(n) {
        H(n, l);
    }) : l.push(n)), l;
}
function L(n, l, u, t) {
    var i = n.key, o = n.type, r = u - 1, f = u + 1, e = l[u];
    if (null === e || e && i == e.key && o === e.type && 0 == (131072 & e.__u)) return u;
    if (t > (null != e && 0 == (131072 & e.__u) ? 1 : 0)) for(; r >= 0 || f < l.length;){
        if (r >= 0) {
            if ((e = l[r]) && 0 == (131072 & e.__u) && i == e.key && o === e.type) return r;
            r--;
        }
        if (f < l.length) {
            if ((e = l[f]) && 0 == (131072 & e.__u) && i == e.key && o === e.type) return f;
            f++;
        }
    }
    return -1;
}
function T(n, l, u) {
    "-" === l[0] ? n.setProperty(l, null == u ? "" : u) : n[l] = null == u ? "" : "number" != typeof u || p.test(l) ? u : u + "px";
}
function A(n, l, u, t, i) {
    var o;
    n: if ("style" === l) if ("string" == typeof u) n.style.cssText = u;
    else {
        if ("string" == typeof t && (n.style.cssText = t = ""), t) for(l in t)u && l in u || T(n.style, l, "");
        if (u) for(l in u)t && u[l] === t[l] || T(n.style, l, u[l]);
    }
    else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/(PointerCapture)$|Capture$/i, "$1")), l = l.toLowerCase() in n || "onFocusOut" === l || "onFocusIn" === l ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? t ? u.u = t.u : (u.u = e, n.addEventListener(l, o ? s : c, o)) : n.removeEventListener(l, o ? s : c, o);
    else {
        if ("http://www.w3.org/2000/svg" == i) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" != l && "height" != l && "href" != l && "list" != l && "form" != l && "tabIndex" != l && "download" != l && "rowSpan" != l && "colSpan" != l && "role" != l && "popover" != l && l in n) try {
            n[l] = null == u ? "" : u;
            break n;
        } catch (n) {}
        "function" == typeof u || (null == u || !1 === u && "-" !== l[4] ? n.removeAttribute(l) : n.setAttribute(l, "popover" == l && 1 == u ? "" : u));
    }
}
function F(n) {
    return function(u) {
        if (this.l) {
            var t = this.l[u.type + n];
            if (null == u.t) u.t = e++;
            else if (u.t < t.u) return;
            return t(l.event ? l.event(u) : u);
        }
    };
}
function O(n, u, t, i, o, r, f, e, c, s) {
    var a, h, v, p, w, _, g, m, x, C, S, M, $, I, H, L, T = u.type;
    if (void 0 !== u.constructor) return null;
    128 & t.__u && (c = !!(32 & t.__u), r = [
        e = u.__e = t.__e
    ]), (a = l.__b) && a(u);
    n: if ("function" == typeof T) try {
        if (m = u.props, x = "prototype" in T && T.prototype.render, C = (a = T.contextType) && i[a.__c], S = a ? C ? C.props.value : a.__ : i, t.__c ? g = (h = u.__c = t.__c).__ = h.__E : (x ? u.__c = h = new T(m, S) : (u.__c = h = new k(m, S), h.constructor = T, h.render = q), C && C.sub(h), h.props = m, h.state || (h.state = {}), h.context = S, h.__n = i, v = h.__d = !0, h.__h = [], h._sb = []), x && null == h.__s && (h.__s = h.state), x && null != T.getDerivedStateFromProps && (h.__s == h.state && (h.__s = d({}, h.__s)), d(h.__s, T.getDerivedStateFromProps(m, h.__s))), p = h.props, w = h.state, h.__v = u, v) x && null == T.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), x && null != h.componentDidMount && h.__h.push(h.componentDidMount);
        else {
            if (x && null == T.getDerivedStateFromProps && m !== p && null != h.componentWillReceiveProps && h.componentWillReceiveProps(m, S), !h.__e && (null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(m, h.__s, S) || u.__v === t.__v)) {
                for(u.__v !== t.__v && (h.props = m, h.state = h.__s, h.__d = !1), u.__e = t.__e, u.__k = t.__k, u.__k.some(function(n) {
                    n && (n.__ = u);
                }), M = 0; M < h._sb.length; M++)h.__h.push(h._sb[M]);
                h._sb = [], h.__h.length && f.push(h);
                break n;
            }
            null != h.componentWillUpdate && h.componentWillUpdate(m, h.__s, S), x && null != h.componentDidUpdate && h.__h.push(function() {
                h.componentDidUpdate(p, w, _);
            });
        }
        if (h.context = S, h.props = m, h.__P = n, h.__e = !1, $ = l.__r, I = 0, x) {
            for(h.state = h.__s, h.__d = !1, $ && $(u), a = h.render(h.props, h.state, h.context), H = 0; H < h._sb.length; H++)h.__h.push(h._sb[H]);
            h._sb = [];
        } else do {
            h.__d = !1, $ && $(u), a = h.render(h.props, h.state, h.context), h.state = h.__s;
        }while (h.__d && ++I < 25)
        h.state = h.__s, null != h.getChildContext && (i = d(d({}, i), h.getChildContext())), x && !v && null != h.getSnapshotBeforeUpdate && (_ = h.getSnapshotBeforeUpdate(p, w)), P(n, y(L = null != a && a.type === b && null == a.key ? a.props.children : a) ? L : [
            L
        ], u, t, i, o, r, f, e, c, s), h.base = u.__e, u.__u &= -161, h.__h.length && f.push(h), g && (h.__E = h.__ = null);
    } catch (n) {
        if (u.__v = null, c || null != r) {
            for(u.__u |= c ? 160 : 128; e && 8 === e.nodeType && e.nextSibling;)e = e.nextSibling;
            r[r.indexOf(e)] = null, u.__e = e;
        } else u.__e = t.__e, u.__k = t.__k;
        l.__e(n, u, t);
    }
    else null == r && u.__v === t.__v ? (u.__k = t.__k, u.__e = t.__e) : u.__e = z(t.__e, u, t, i, o, r, f, c, s);
    (a = l.diffed) && a(u);
}
function j(n, u, t) {
    u.__d = void 0;
    for(var i = 0; i < t.length; i++)N(t[i], t[++i], t[++i]);
    l.__c && l.__c(u, n), n.some(function(u) {
        try {
            n = u.__h, u.__h = [], n.some(function(n) {
                n.call(u);
            });
        } catch (n) {
            l.__e(n, u.__v);
        }
    });
}
function z(u, t, i, o, r, f, e, c, s) {
    var a, v, p, d, _, g, m, b = i.props, k = t.props, C = t.type;
    if ("svg" === C ? r = "http://www.w3.org/2000/svg" : "math" === C ? r = "http://www.w3.org/1998/Math/MathML" : r || (r = "http://www.w3.org/1999/xhtml"), null != f) {
        for(a = 0; a < f.length; a++)if ((_ = f[a]) && "setAttribute" in _ == !!C && (C ? _.localName === C : 3 === _.nodeType)) {
            u = _, f[a] = null;
            break;
        }
    }
    if (null == u) {
        if (null === C) return document.createTextNode(k);
        u = document.createElementNS(r, C, k.is && k), c && (l.__m && l.__m(t, f), c = !1), f = null;
    }
    if (null === C) b === k || c && u.data === k || (u.data = k);
    else {
        if (f = f && n.call(u.childNodes), b = i.props || h, !c && null != f) for(b = {}, a = 0; a < u.attributes.length; a++)b[(_ = u.attributes[a]).name] = _.value;
        for(a in b)if (_ = b[a], "children" == a) ;
        else if ("dangerouslySetInnerHTML" == a) p = _;
        else if (!(a in k)) {
            if ("value" == a && "defaultValue" in k || "checked" == a && "defaultChecked" in k) continue;
            A(u, a, null, _, r);
        }
        for(a in k)_ = k[a], "children" == a ? d = _ : "dangerouslySetInnerHTML" == a ? v = _ : "value" == a ? g = _ : "checked" == a ? m = _ : c && "function" != typeof _ || b[a] === _ || A(u, a, _, b[a], r);
        if (v) c || p && (v.__html === p.__html || v.__html === u.innerHTML) || (u.innerHTML = v.__html), t.__k = [];
        else if (p && (u.innerHTML = ""), P(u, y(d) ? d : [
            d
        ], t, i, o, "foreignObject" === C ? "http://www.w3.org/1999/xhtml" : r, f, e, f ? f[0] : i.__k && x(i, 0), c, s), null != f) for(a = f.length; a--;)w(f[a]);
        c || (a = "value", "progress" === C && null == g ? u.removeAttribute("value") : void 0 !== g && (g !== u[a] || "progress" === C && !g || "option" === C && g !== b[a]) && A(u, a, g, b[a], r), a = "checked", void 0 !== m && m !== u[a] && A(u, a, m, b[a], r));
    }
    return u;
}
function N(n, u, t) {
    try {
        if ("function" == typeof n) {
            var i = "function" == typeof n.__u;
            i && n.__u(), i && null == u || (n.__u = n(u));
        } else n.current = u;
    } catch (n) {
        l.__e(n, t);
    }
}
function V(n, u, t) {
    var i, o;
    if (l.unmount && l.unmount(n), (i = n.ref) && (i.current && i.current !== n.__e || N(i, null, u)), null != (i = n.__c)) {
        if (i.componentWillUnmount) try {
            i.componentWillUnmount();
        } catch (n) {
            l.__e(n, u);
        }
        i.base = i.__P = null;
    }
    if (i = n.__k) for(o = 0; o < i.length; o++)i[o] && V(i[o], u, t || "function" != typeof n.type);
    t || w(n.__e), n.__c = n.__ = n.__e = n.__d = void 0;
}
function q(n, l, u) {
    return this.constructor(n, u);
}
function B(u, t, i) {
    var o, r, f, e;
    l.__ && l.__(u, t), r = (o = "function" == typeof i) ? null : i && i.__k || t.__k, f = [], e = [], O(t, u = (!o && i || t).__k = _(b, null, [
        u
    ]), r || h, h, t.namespaceURI, !o && i ? [
        i
    ] : r ? null : t.firstChild ? n.call(t.childNodes) : null, f, !o && i ? i : r ? r.__e : t.firstChild, o, e), j(f, u, e);
}
function D(n, l) {
    B(n, l, D);
}
function E(l, u, t) {
    var i, o, r, f, e = d({}, l.props);
    for(r in l.type && l.type.defaultProps && (f = l.type.defaultProps), u)"key" == r ? i = u[r] : "ref" == r ? o = u[r] : e[r] = void 0 === u[r] && void 0 !== f ? f[r] : u[r];
    return arguments.length > 2 && (e.children = arguments.length > 3 ? n.call(arguments, 2) : t), g(l.type, e, i || l.key, o || l.ref, null);
}
function G(n, l) {
    var u = {
        __c: l = "__cC" + a++,
        __: n,
        Consumer: function(n, l) {
            return n.children(l);
        },
        Provider: function(n) {
            var u, t;
            return this.getChildContext || (u = new Set, (t = {})[l] = this, this.getChildContext = function() {
                return t;
            }, this.componentWillUnmount = function() {
                u = null;
            }, this.shouldComponentUpdate = function(n) {
                this.props.value !== n.value && u.forEach(function(n) {
                    n.__e = !0, S(n);
                });
            }, this.sub = function(n) {
                u.add(n);
                var l = n.componentWillUnmount;
                n.componentWillUnmount = function() {
                    u && u.delete(n), l && l.call(n);
                };
            }), n.children;
        }
    };
    return u.Provider.__ = u.Consumer.contextType = u;
}
n = v.slice, l = {
    __e: function(n, l, u, t) {
        for(var i, o, r; l = l.__;)if ((i = l.__c) && !i.__) try {
            if ((o = i.constructor) && null != o.getDerivedStateFromError && (i.setState(o.getDerivedStateFromError(n)), r = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n, t || {}), r = i.__d), r) return i.__E = i;
        } catch (l) {
            n = l;
        }
        throw n;
    }
}, u = 0, t = function(n) {
    return null != n && null == n.constructor;
}, k.prototype.setState = function(n, l) {
    var u;
    u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = d({}, this.state), "function" == typeof n && (n = n(d({}, u), this.props)), n && d(u, n), null != n && this.__v && (l && this._sb.push(l), S(this));
}, k.prototype.forceUpdate = function(n) {
    this.__v && (this.__e = !0, n && this.__h.push(n), S(this));
}, k.prototype.render = b, i = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n, l) {
    return n.__v.__b - l.__v.__b;
}, M.__r = 0, e = 0, c = F(!1), s = F(!0), a = 0;
;
 //# sourceMappingURL=preact.module.js.map
}),
"[project]/node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "jsx",
    ()=>u,
    "jsxAttr",
    ()=>p,
    "jsxDEV",
    ()=>u,
    "jsxEscape",
    ()=>_,
    "jsxTemplate",
    ()=>a,
    "jsxs",
    ()=>u
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/preact/dist/preact.mjs [app-rsc] (ecmascript)");
;
;
var t = /["&<]/;
function n(r) {
    if (0 === r.length || !1 === t.test(r)) return r;
    for(var e = 0, n = 0, o = "", f = ""; n < r.length; n++){
        switch(r.charCodeAt(n)){
            case 34:
                f = "&quot;";
                break;
            case 38:
                f = "&amp;";
                break;
            case 60:
                f = "&lt;";
                break;
            default:
                continue;
        }
        n !== e && (o += r.slice(e, n)), o += f, e = n + 1;
    }
    return n !== e && (o += r.slice(e, n)), o;
}
var o = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, f = 0, i = Array.isArray;
function u(e, t, n, o, i, u) {
    t || (t = {});
    var a, c, l = t;
    "ref" in t && (a = t.ref, delete t.ref);
    var p = {
        type: e,
        props: l,
        key: n,
        ref: a,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        constructor: void 0,
        __v: --f,
        __i: -1,
        __u: 0,
        __source: i,
        __self: u
    };
    if ("function" == typeof e && (a = e.defaultProps)) for(c in a)void 0 === l[c] && (l[c] = a[c]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].vnode && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].vnode(p), p;
}
function a(r) {
    var t = u(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        tpl: r,
        exprs: [].slice.call(arguments, 1)
    });
    return t.key = t.__v, t;
}
var c = {}, l = /[A-Z]/g;
function p(e, t) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].attr) {
        var f = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].attr(e, t);
        if ("string" == typeof f) return f;
    }
    if ("ref" === e || "key" === e) return "";
    if ("style" === e && "object" == typeof t) {
        var i = "";
        for(var u in t){
            var a = t[u];
            if (null != a && "" !== a) {
                var p = "-" == u[0] ? u : c[u] || (c[u] = u.replace(l, "-$&").toLowerCase()), _ = ";";
                "number" != typeof a || p.startsWith("--") || o.test(p) || (_ = "px;"), i = i + p + ":" + a + _;
            }
        }
        return e + '="' + i + '"';
    }
    return null == t || !1 === t || "function" == typeof t || "object" == typeof t ? "" : !0 === t ? e : e + '="' + n(t) + '"';
}
function _(r) {
    if (null == r || "boolean" == typeof r || "function" == typeof r) return null;
    if ("object" == typeof r) {
        if (void 0 === r.constructor) return r;
        if (i(r)) {
            for(var e = 0; e < r.length; e++)r[e] = _(r[e]);
            return r;
        }
    }
    return n("" + r);
}
;
 //# sourceMappingURL=jsxRuntime.module.js.map
}),
"[project]/node_modules/preact-render-to-string/dist/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "render",
    ()=>F,
    "renderToStaticMarkup",
    ()=>M,
    "renderToString",
    ()=>D,
    "renderToStringAsync",
    ()=>S
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/preact/dist/preact.mjs [app-rsc] (ecmascript)");
;
var r = /[\s\n\\/='"\0<>]/, o = /^(xlink|xmlns|xml)([A-Z])/, i = /^accessK|^auto[A-Z]|^cell|^ch|^col|cont|cross|dateT|encT|form[A-Z]|frame|hrefL|inputM|maxL|minL|noV|playsI|popoverT|readO|rowS|src[A-Z]|tabI|useM|item[A-Z]/, a = /^ac|^ali|arabic|basel|cap|clipPath$|clipRule$|color|dominant|enable|fill|flood|font|glyph[^R]|horiz|image|letter|lighting|marker[^WUH]|overline|panose|pointe|paint|rendering|shape|stop|strikethrough|stroke|text[^L]|transform|underline|unicode|units|^v[^i]|^w|^xH/, c = new Set([
    "draggable",
    "spellcheck"
]), s = /["&<]/;
function l(e) {
    if (0 === e.length || !1 === s.test(e)) return e;
    for(var t = 0, n = 0, r = "", o = ""; n < e.length; n++){
        switch(e.charCodeAt(n)){
            case 34:
                o = "&quot;";
                break;
            case 38:
                o = "&amp;";
                break;
            case 60:
                o = "&lt;";
                break;
            default:
                continue;
        }
        n !== t && (r += e.slice(t, n)), r += o, t = n + 1;
    }
    return n !== t && (r += e.slice(t, n)), r;
}
var u = {}, f = new Set([
    "animation-iteration-count",
    "border-image-outset",
    "border-image-slice",
    "border-image-width",
    "box-flex",
    "box-flex-group",
    "box-ordinal-group",
    "column-count",
    "fill-opacity",
    "flex",
    "flex-grow",
    "flex-negative",
    "flex-order",
    "flex-positive",
    "flex-shrink",
    "flood-opacity",
    "font-weight",
    "grid-column",
    "grid-row",
    "line-clamp",
    "line-height",
    "opacity",
    "order",
    "orphans",
    "stop-opacity",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "tab-size",
    "widows",
    "z-index",
    "zoom"
]), p = /[A-Z]/g;
function h(e) {
    var t = "";
    for(var n in e){
        var r = e[n];
        if (null != r && "" !== r) {
            var o = "-" == n[0] ? n : u[n] || (u[n] = n.replace(p, "-$&").toLowerCase()), i = ";";
            "number" != typeof r || o.startsWith("--") || f.has(o) || (i = "px;"), t = t + o + ":" + r + i;
        }
    }
    return t || void 0;
}
function d() {
    this.__d = !0;
}
function _(e, t) {
    return {
        __v: e,
        context: t,
        props: e.props,
        setState: d,
        forceUpdate: d,
        __d: !0,
        __h: new Array(0)
    };
}
function v(e, t, n) {
    if (!e.s) {
        if (n instanceof m) {
            if (!n.s) return void (n.o = v.bind(null, e, t));
            1 & t && (t = n.s), n = n.v;
        }
        if (n && n.then) return void n.then(v.bind(null, e, t), v.bind(null, e, 2));
        e.s = t, e.v = n;
        const r = e.o;
        r && r(e);
    }
}
var m = /*#__PURE__*/ function() {
    function e() {}
    return e.prototype.then = function(t, n) {
        var r = new e, o = this.s;
        if (o) {
            var i = 1 & o ? t : n;
            if (i) {
                try {
                    v(r, 1, i(this.v));
                } catch (e) {
                    v(r, 2, e);
                }
                return r;
            }
            return this;
        }
        return this.o = function(e) {
            try {
                var o = e.v;
                1 & e.s ? v(r, 1, t ? t(o) : o) : n ? v(r, 1, n(o)) : v(r, 2, o);
            } catch (e) {
                v(r, 2, e);
            }
        }, r;
    }, e;
}();
function y(e) {
    return e instanceof m && 1 & e.s;
}
function g(e, t, n) {
    for(var r;;){
        var o = e();
        if (y(o) && (o = o.v), !o) return i;
        if (o.then) {
            r = 0;
            break;
        }
        var i = n();
        if (i && i.then) {
            if (!y(i)) {
                r = 1;
                break;
            }
            i = i.s;
        }
        if (t) {
            var a = t();
            if (a && a.then && !y(a)) {
                r = 2;
                break;
            }
        }
    }
    var c = new m, s = v.bind(null, c, 2);
    return (0 === r ? o.then(u) : 1 === r ? i.then(l) : a.then(f)).then(void 0, s), c;
    //TURBOPACK unreachable
    ;
    function l(r) {
        i = r;
        do {
            if (t && (a = t()) && a.then && !y(a)) return void a.then(f).then(void 0, s);
            if (!(o = e()) || y(o) && !o.v) return void v(c, 1, i);
            if (o.then) return void o.then(u).then(void 0, s);
            y(i = n()) && (i = i.v);
        }while (!i || !i.then)
        i.then(l).then(void 0, s);
    }
    function u(e) {
        e ? (i = n()) && i.then ? i.then(l).then(void 0, s) : l(i) : v(c, 1, i);
    }
    function f() {
        (o = e()) ? o.then ? o.then(u).then(void 0, s) : u(o) : v(c, 1, i);
    }
}
function b(e, t) {
    try {
        var n = e();
    } catch (e) {
        return t(!0, e);
    }
    return n && n.then ? n.then(t.bind(null, !1), t.bind(null, !0)) : t(!1, n);
}
var k, w, x, C, S = function(r, o) {
    try {
        var i = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].__s;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].__s = !0, k = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].__b, w = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].diffed, x = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].__r, C = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].unmount;
        var a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["h"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], null);
        return a.__k = [
            r
        ], Promise.resolve(b(function() {
            return Promise.resolve(U(r, o || A, !1, void 0, a, !0, void 0)).then(function(e) {
                var t, n = function() {
                    if (E(e)) {
                        var n = function() {
                            var e = o.join(j);
                            return t = 1, e;
                        }, r = 0, o = e, i = g(function() {
                            return !!o.some(function(e) {
                                return e && "function" == typeof e.then;
                            }) && r++ < 25;
                        }, void 0, function() {
                            return Promise.resolve(Promise.all(o)).then(function(e) {
                                o = e.flat();
                            });
                        });
                        return i && i.then ? i.then(n) : n();
                    }
                }();
                return n && n.then ? n.then(function(n) {
                    return t ? n : e;
                }) : t ? n : e;
            });
        }, function(t, n) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].__c && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].__c(r, L), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].__s = i, L.length = 0, t) throw n;
            return n;
        }));
    } catch (e) {
        return Promise.reject(e);
    }
}, A = {}, L = [], E = Array.isArray, T = Object.assign, j = "";
function D(r, o, i) {
    var a = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].__s;
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].__s = !0, k = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].__b, w = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].diffed, x = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].__r, C = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].unmount;
    var c = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["h"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], null);
    c.__k = [
        r
    ];
    try {
        var s = U(r, o || A, !1, void 0, c, !1, i);
        return E(s) ? s.join(j) : s;
    } catch (e) {
        if (e.then) throw new Error('Use "renderToStringAsync" for suspenseful rendering.');
        throw e;
    } finally{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].__c && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].__c(r, L), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].__s = a, L.length = 0;
    }
}
function P(e, t) {
    var n, r = e.type, o = !0;
    return e.__c ? (o = !1, (n = e.__c).state = n.__s) : n = new r(e.props, t), e.__c = n, n.__v = e, n.props = e.props, n.context = t, n.__d = !0, null == n.state && (n.state = A), null == n.__s && (n.__s = n.state), r.getDerivedStateFromProps ? n.state = T({}, n.state, r.getDerivedStateFromProps(n.props, n.state)) : o && n.componentWillMount ? (n.componentWillMount(), n.state = n.__s !== n.state ? n.__s : n.state) : !o && n.componentWillUpdate && n.componentWillUpdate(), x && x(e), n.render(n.props, n.state, t);
}
function U(t, s, u, f, p, d, v) {
    if (null == t || !0 === t || !1 === t || t === j) return j;
    var m = typeof t;
    if ("object" != m) return "function" == m ? j : "string" == m ? l(t) : t + j;
    if (E(t)) {
        var y, g = j;
        p.__k = t;
        for(var b = 0; b < t.length; b++){
            var S = t[b];
            if (null != S && "boolean" != typeof S) {
                var L, D = U(S, s, u, f, p, d, v);
                "string" == typeof D ? g += D : (y || (y = []), g && y.push(g), g = j, E(D) ? (L = y).push.apply(L, D) : y.push(D));
            }
        }
        return y ? (g && y.push(g), y) : g;
    }
    if (void 0 !== t.constructor) return j;
    t.__ = p, k && k(t);
    var F = t.type, M = t.props;
    if ("function" == typeof F) {
        var W, $, z, H = s;
        if (F === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"]) {
            if ("tpl" in M) {
                for(var N = j, q = 0; q < M.tpl.length; q++)if (N += M.tpl[q], M.exprs && q < M.exprs.length) {
                    var B = M.exprs[q];
                    if (null == B) continue;
                    "object" != typeof B || void 0 !== B.constructor && !E(B) ? N += B : N += U(B, s, u, f, t, d, v);
                }
                return N;
            }
            if ("UNSTABLE_comment" in M) return "\x3c!--" + l(M.UNSTABLE_comment) + "--\x3e";
            $ = M.children;
        } else {
            if (null != (W = F.contextType)) {
                var I = s[W.__c];
                H = I ? I.props.value : W.__;
            }
            var O = F.prototype && "function" == typeof F.prototype.render;
            if (O) $ = P(t, H), z = t.__c;
            else {
                t.__c = z = _(t, H);
                for(var R = 0; z.__d && R++ < 25;)z.__d = !1, x && x(t), $ = F.call(z, M, H);
                z.__d = !0;
            }
            if (null != z.getChildContext && (s = T({}, s, z.getChildContext())), O && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].errorBoundaries && (F.getDerivedStateFromError || z.componentDidCatch)) {
                $ = null != $ && $.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"] && null == $.key && null == $.props.tpl ? $.props.children : $;
                try {
                    return U($, s, u, f, t, d, v);
                } catch (e) {
                    return F.getDerivedStateFromError && (z.__s = F.getDerivedStateFromError(e)), z.componentDidCatch && z.componentDidCatch(e, A), z.__d ? ($ = P(t, s), null != (z = t.__c).getChildContext && (s = T({}, s, z.getChildContext())), U($ = null != $ && $.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"] && null == $.key && null == $.props.tpl ? $.props.children : $, s, u, f, t, d, v)) : j;
                } finally{
                    w && w(t), t.__ = null, C && C(t);
                }
            }
        }
        $ = null != $ && $.type === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"] && null == $.key && null == $.props.tpl ? $.props.children : $;
        try {
            var V = U($, s, u, f, t, d, v);
            return w && w(t), t.__ = null, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].unmount && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].unmount(t), V;
        } catch (n) {
            if (!d && v && v.onError) {
                var K = v.onError(n, t, function(e) {
                    return U(e, s, u, f, t, d, v);
                });
                if (void 0 !== K) return K;
                var G = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$preact$2f$dist$2f$preact$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["options"].__e;
                return G && G(n, t), j;
            }
            if (!d) throw n;
            if (!n || "function" != typeof n.then) throw n;
            return n.then(function e() {
                try {
                    return U($, s, u, f, t, d, v);
                } catch (n) {
                    if (!n || "function" != typeof n.then) throw n;
                    return n.then(function() {
                        return U($, s, u, f, t, d, v);
                    }, e);
                }
            });
        }
    }
    var J, Q = "<" + F, X = j;
    for(var Y in M){
        var ee = M[Y];
        if ("function" != typeof ee || "class" === Y || "className" === Y) {
            switch(Y){
                case "children":
                    J = ee;
                    continue;
                case "key":
                case "ref":
                case "__self":
                case "__source":
                    continue;
                case "htmlFor":
                    if ("for" in M) continue;
                    Y = "for";
                    break;
                case "className":
                    if ("class" in M) continue;
                    Y = "class";
                    break;
                case "defaultChecked":
                    Y = "checked";
                    break;
                case "defaultSelected":
                    Y = "selected";
                    break;
                case "defaultValue":
                case "value":
                    switch(Y = "value", F){
                        case "textarea":
                            J = ee;
                            continue;
                        case "select":
                            f = ee;
                            continue;
                        case "option":
                            f != ee || "selected" in M || (Q += " selected");
                    }
                    break;
                case "dangerouslySetInnerHTML":
                    X = ee && ee.__html;
                    continue;
                case "style":
                    "object" == typeof ee && (ee = h(ee));
                    break;
                case "acceptCharset":
                    Y = "accept-charset";
                    break;
                case "httpEquiv":
                    Y = "http-equiv";
                    break;
                default:
                    if (o.test(Y)) Y = Y.replace(o, "$1:$2").toLowerCase();
                    else {
                        if (r.test(Y)) continue;
                        "-" !== Y[4] && !c.has(Y) || null == ee ? u ? a.test(Y) && (Y = "panose1" === Y ? "panose-1" : Y.replace(/([A-Z])/g, "-$1").toLowerCase()) : i.test(Y) && (Y = Y.toLowerCase()) : ee += j;
                    }
            }
            null != ee && !1 !== ee && (Q = !0 === ee || ee === j ? Q + " " + Y : Q + " " + Y + '="' + ("string" == typeof ee ? l(ee) : ee + j) + '"');
        }
    }
    if (r.test(F)) throw new Error(F + " is not a valid HTML tag name in " + Q + ">");
    if (X || ("string" == typeof J ? X = l(J) : null != J && !1 !== J && !0 !== J && (X = U(J, s, "svg" === F || "foreignObject" !== F && u, f, t, d, v))), w && w(t), t.__ = null, C && C(t), !X && Z.has(F)) return Q + "/>";
    var te = "</" + F + ">", ne = Q + ">";
    return E(X) ? [
        ne
    ].concat(X, [
        te
    ]) : "string" != typeof X ? [
        ne,
        X,
        te
    ] : ne + X + te;
}
var Z = new Set([
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
]), F = D, M = D;
const __TURBOPACK__default__export__ = D;
;
 //# sourceMappingURL=index.module.js.map
}),
"[project]/node_modules/oauth4webapi/build/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AUTHORIZATION_RESPONSE_ERROR",
    ()=>AUTHORIZATION_RESPONSE_ERROR,
    "AuthorizationResponseError",
    ()=>AuthorizationResponseError,
    "ClientSecretBasic",
    ()=>ClientSecretBasic,
    "ClientSecretJwt",
    ()=>ClientSecretJwt,
    "ClientSecretPost",
    ()=>ClientSecretPost,
    "DPoP",
    ()=>DPoP,
    "HTTP_REQUEST_FORBIDDEN",
    ()=>HTTP_REQUEST_FORBIDDEN,
    "INVALID_REQUEST",
    ()=>INVALID_REQUEST,
    "INVALID_RESPONSE",
    ()=>INVALID_RESPONSE,
    "INVALID_SERVER_METADATA",
    ()=>INVALID_SERVER_METADATA,
    "JSON_ATTRIBUTE_COMPARISON",
    ()=>JSON_ATTRIBUTE_COMPARISON,
    "JWT_CLAIM_COMPARISON",
    ()=>JWT_CLAIM_COMPARISON,
    "JWT_TIMESTAMP_CHECK",
    ()=>JWT_TIMESTAMP_CHECK,
    "JWT_USERINFO_EXPECTED",
    ()=>JWT_USERINFO_EXPECTED,
    "KEY_SELECTION",
    ()=>KEY_SELECTION,
    "MISSING_SERVER_METADATA",
    ()=>MISSING_SERVER_METADATA,
    "None",
    ()=>None,
    "OperationProcessingError",
    ()=>OperationProcessingError,
    "PARSE_ERROR",
    ()=>PARSE_ERROR,
    "PrivateKeyJwt",
    ()=>PrivateKeyJwt,
    "REQUEST_PROTOCOL_FORBIDDEN",
    ()=>REQUEST_PROTOCOL_FORBIDDEN,
    "RESPONSE_BODY_ERROR",
    ()=>RESPONSE_BODY_ERROR,
    "RESPONSE_IS_NOT_CONFORM",
    ()=>RESPONSE_IS_NOT_CONFORM,
    "RESPONSE_IS_NOT_JSON",
    ()=>RESPONSE_IS_NOT_JSON,
    "ResponseBodyError",
    ()=>ResponseBodyError,
    "TlsClientAuth",
    ()=>TlsClientAuth,
    "UNSUPPORTED_OPERATION",
    ()=>UNSUPPORTED_OPERATION,
    "UnsupportedOperationError",
    ()=>UnsupportedOperationError,
    "WWWAuthenticateChallengeError",
    ()=>WWWAuthenticateChallengeError,
    "WWW_AUTHENTICATE_CHALLENGE",
    ()=>WWW_AUTHENTICATE_CHALLENGE,
    "_expectedIssuer",
    ()=>_expectedIssuer,
    "_nodiscoverycheck",
    ()=>_nodiscoverycheck,
    "_nopkce",
    ()=>_nopkce,
    "allowInsecureRequests",
    ()=>allowInsecureRequests,
    "authorizationCodeGrantRequest",
    ()=>authorizationCodeGrantRequest,
    "backchannelAuthenticationGrantRequest",
    ()=>backchannelAuthenticationGrantRequest,
    "backchannelAuthenticationRequest",
    ()=>backchannelAuthenticationRequest,
    "calculatePKCECodeChallenge",
    ()=>calculatePKCECodeChallenge,
    "checkProtocol",
    ()=>checkProtocol,
    "clientCredentialsGrantRequest",
    ()=>clientCredentialsGrantRequest,
    "clockSkew",
    ()=>clockSkew,
    "clockTolerance",
    ()=>clockTolerance,
    "customFetch",
    ()=>customFetch,
    "deviceAuthorizationRequest",
    ()=>deviceAuthorizationRequest,
    "deviceCodeGrantRequest",
    ()=>deviceCodeGrantRequest,
    "discoveryRequest",
    ()=>discoveryRequest,
    "dynamicClientRegistrationRequest",
    ()=>dynamicClientRegistrationRequest,
    "expectNoNonce",
    ()=>expectNoNonce,
    "expectNoState",
    ()=>expectNoState,
    "formPostResponse",
    ()=>formPostResponse,
    "generateKeyPair",
    ()=>generateKeyPair,
    "generateRandomCodeVerifier",
    ()=>generateRandomCodeVerifier,
    "generateRandomNonce",
    ()=>generateRandomNonce,
    "generateRandomState",
    ()=>generateRandomState,
    "genericTokenEndpointRequest",
    ()=>genericTokenEndpointRequest,
    "getContentType",
    ()=>getContentType,
    "getValidatedIdTokenClaims",
    ()=>getValidatedIdTokenClaims,
    "introspectionRequest",
    ()=>introspectionRequest,
    "isDPoPNonceError",
    ()=>isDPoPNonceError,
    "issueRequestObject",
    ()=>issueRequestObject,
    "jweDecrypt",
    ()=>jweDecrypt,
    "jwksCache",
    ()=>jwksCache,
    "modifyAssertion",
    ()=>modifyAssertion,
    "nopkce",
    ()=>nopkce,
    "processAuthorizationCodeResponse",
    ()=>processAuthorizationCodeResponse,
    "processBackchannelAuthenticationGrantResponse",
    ()=>processBackchannelAuthenticationGrantResponse,
    "processBackchannelAuthenticationResponse",
    ()=>processBackchannelAuthenticationResponse,
    "processClientCredentialsResponse",
    ()=>processClientCredentialsResponse,
    "processDeviceAuthorizationResponse",
    ()=>processDeviceAuthorizationResponse,
    "processDeviceCodeResponse",
    ()=>processDeviceCodeResponse,
    "processDiscoveryResponse",
    ()=>processDiscoveryResponse,
    "processDynamicClientRegistrationResponse",
    ()=>processDynamicClientRegistrationResponse,
    "processGenericTokenEndpointResponse",
    ()=>processGenericTokenEndpointResponse,
    "processIntrospectionResponse",
    ()=>processIntrospectionResponse,
    "processPushedAuthorizationResponse",
    ()=>processPushedAuthorizationResponse,
    "processRefreshTokenResponse",
    ()=>processRefreshTokenResponse,
    "processResourceDiscoveryResponse",
    ()=>processResourceDiscoveryResponse,
    "processRevocationResponse",
    ()=>processRevocationResponse,
    "processUserInfoResponse",
    ()=>processUserInfoResponse,
    "protectedResourceRequest",
    ()=>protectedResourceRequest,
    "pushedAuthorizationRequest",
    ()=>pushedAuthorizationRequest,
    "refreshTokenGrantRequest",
    ()=>refreshTokenGrantRequest,
    "resolveEndpoint",
    ()=>resolveEndpoint,
    "resourceDiscoveryRequest",
    ()=>resourceDiscoveryRequest,
    "revocationRequest",
    ()=>revocationRequest,
    "skipAuthTimeCheck",
    ()=>skipAuthTimeCheck,
    "skipStateCheck",
    ()=>skipStateCheck,
    "skipSubjectCheck",
    ()=>skipSubjectCheck,
    "userInfoRequest",
    ()=>userInfoRequest,
    "validateApplicationLevelSignature",
    ()=>validateApplicationLevelSignature,
    "validateAuthResponse",
    ()=>validateAuthResponse,
    "validateCodeIdTokenResponse",
    ()=>validateCodeIdTokenResponse,
    "validateDetachedSignatureResponse",
    ()=>validateDetachedSignatureResponse,
    "validateJwtAccessToken",
    ()=>validateJwtAccessToken,
    "validateJwtAuthResponse",
    ()=>validateJwtAuthResponse
]);
let USER_AGENT;
if (typeof navigator === 'undefined' || !navigator.userAgent?.startsWith?.('Mozilla/5.0 ')) {
    const NAME = 'oauth4webapi';
    const VERSION = 'v3.8.3';
    USER_AGENT = `${NAME}/${VERSION}`;
}
function looseInstanceOf(input, expected) {
    if (input == null) {
        return false;
    }
    try {
        return input instanceof expected || Object.getPrototypeOf(input)[Symbol.toStringTag] === expected.prototype[Symbol.toStringTag];
    } catch  {
        return false;
    }
}
const ERR_INVALID_ARG_VALUE = 'ERR_INVALID_ARG_VALUE';
const ERR_INVALID_ARG_TYPE = 'ERR_INVALID_ARG_TYPE';
function CodedTypeError(message, code, cause) {
    const err = new TypeError(message, {
        cause
    });
    Object.assign(err, {
        code
    });
    return err;
}
const allowInsecureRequests = Symbol();
const clockSkew = Symbol();
const clockTolerance = Symbol();
const customFetch = Symbol();
const modifyAssertion = Symbol();
const jweDecrypt = Symbol();
const jwksCache = Symbol();
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function buf(input) {
    if (typeof input === 'string') {
        return encoder.encode(input);
    }
    return decoder.decode(input);
}
let encodeBase64Url;
if (Uint8Array.prototype.toBase64) {
    encodeBase64Url = (input)=>{
        if (input instanceof ArrayBuffer) {
            input = new Uint8Array(input);
        }
        return input.toBase64({
            alphabet: 'base64url',
            omitPadding: true
        });
    };
} else {
    const CHUNK_SIZE = 0x8000;
    encodeBase64Url = (input)=>{
        if (input instanceof ArrayBuffer) {
            input = new Uint8Array(input);
        }
        const arr = [];
        for(let i = 0; i < input.byteLength; i += CHUNK_SIZE){
            arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)));
        }
        return btoa(arr.join('')).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    };
}
let decodeBase64Url;
if (Uint8Array.fromBase64) {
    decodeBase64Url = (input)=>{
        try {
            return Uint8Array.fromBase64(input, {
                alphabet: 'base64url'
            });
        } catch (cause) {
            throw CodedTypeError('The input to be decoded is not correctly encoded.', ERR_INVALID_ARG_VALUE, cause);
        }
    };
} else {
    decodeBase64Url = (input)=>{
        try {
            const binary = atob(input.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, ''));
            const bytes = new Uint8Array(binary.length);
            for(let i = 0; i < binary.length; i++){
                bytes[i] = binary.charCodeAt(i);
            }
            return bytes;
        } catch (cause) {
            throw CodedTypeError('The input to be decoded is not correctly encoded.', ERR_INVALID_ARG_VALUE, cause);
        }
    };
}
function b64u(input) {
    if (typeof input === 'string') {
        return decodeBase64Url(input);
    }
    return encodeBase64Url(input);
}
class UnsupportedOperationError extends Error {
    code;
    constructor(message, options){
        super(message, options);
        this.name = this.constructor.name;
        this.code = UNSUPPORTED_OPERATION;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class OperationProcessingError extends Error {
    code;
    constructor(message, options){
        super(message, options);
        this.name = this.constructor.name;
        if (options?.code) {
            this.code = options?.code;
        }
        Error.captureStackTrace?.(this, this.constructor);
    }
}
function OPE(message, code, cause) {
    return new OperationProcessingError(message, {
        code,
        cause
    });
}
async function calculateJwkThumbprint(jwk) {
    let components;
    switch(jwk.kty){
        case 'EC':
            components = {
                crv: jwk.crv,
                kty: jwk.kty,
                x: jwk.x,
                y: jwk.y
            };
            break;
        case 'OKP':
            components = {
                crv: jwk.crv,
                kty: jwk.kty,
                x: jwk.x
            };
            break;
        case 'AKP':
            components = {
                alg: jwk.alg,
                kty: jwk.kty,
                pub: jwk.pub
            };
            break;
        case 'RSA':
            components = {
                e: jwk.e,
                kty: jwk.kty,
                n: jwk.n
            };
            break;
        default:
            throw new UnsupportedOperationError('unsupported JWK key type', {
                cause: jwk
            });
    }
    return b64u(await crypto.subtle.digest('SHA-256', buf(JSON.stringify(components))));
}
function assertCryptoKey(key, it) {
    if (!(key instanceof CryptoKey)) {
        throw CodedTypeError(`${it} must be a CryptoKey`, ERR_INVALID_ARG_TYPE);
    }
}
function assertPrivateKey(key, it) {
    assertCryptoKey(key, it);
    if (key.type !== 'private') {
        throw CodedTypeError(`${it} must be a private CryptoKey`, ERR_INVALID_ARG_VALUE);
    }
}
function assertPublicKey(key, it) {
    assertCryptoKey(key, it);
    if (key.type !== 'public') {
        throw CodedTypeError(`${it} must be a public CryptoKey`, ERR_INVALID_ARG_VALUE);
    }
}
function normalizeTyp(value) {
    return value.toLowerCase().replace(/^application\//, '');
}
function isJsonObject(input) {
    if (input === null || typeof input !== 'object' || Array.isArray(input)) {
        return false;
    }
    return true;
}
function prepareHeaders(input) {
    if (looseInstanceOf(input, Headers)) {
        input = Object.fromEntries(input.entries());
    }
    const headers = new Headers(input ?? {});
    if (USER_AGENT && !headers.has('user-agent')) {
        headers.set('user-agent', USER_AGENT);
    }
    if (headers.has('authorization')) {
        throw CodedTypeError('"options.headers" must not include the "authorization" header name', ERR_INVALID_ARG_VALUE);
    }
    return headers;
}
function signal(url, value) {
    if (value !== undefined) {
        if (typeof value === 'function') {
            value = value(url.href);
        }
        if (!(value instanceof AbortSignal)) {
            throw CodedTypeError('"options.signal" must return or be an instance of AbortSignal', ERR_INVALID_ARG_TYPE);
        }
        return value;
    }
    return undefined;
}
function replaceDoubleSlash(pathname) {
    if (pathname.includes('//')) {
        return pathname.replace('//', '/');
    }
    return pathname;
}
function prependWellKnown(url, wellKnown, allowTerminatingSlash = false) {
    if (url.pathname === '/') {
        url.pathname = wellKnown;
    } else {
        url.pathname = replaceDoubleSlash(`${wellKnown}/${allowTerminatingSlash ? url.pathname : url.pathname.replace(/(\/)$/, '')}`);
    }
    return url;
}
function appendWellKnown(url, wellKnown) {
    url.pathname = replaceDoubleSlash(`${url.pathname}/${wellKnown}`);
    return url;
}
async function performDiscovery(input, urlName, transform, options) {
    if (!(input instanceof URL)) {
        throw CodedTypeError(`"${urlName}" must be an instance of URL`, ERR_INVALID_ARG_TYPE);
    }
    checkProtocol(input, options?.[allowInsecureRequests] !== true);
    const url = transform(new URL(input.href));
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    return (options?.[customFetch] || fetch)(url.href, {
        body: undefined,
        headers: Object.fromEntries(headers.entries()),
        method: 'GET',
        redirect: 'manual',
        signal: signal(url, options?.signal)
    });
}
async function discoveryRequest(issuerIdentifier, options) {
    return performDiscovery(issuerIdentifier, 'issuerIdentifier', (url)=>{
        switch(options?.algorithm){
            case undefined:
            case 'oidc':
                appendWellKnown(url, '.well-known/openid-configuration');
                break;
            case 'oauth2':
                prependWellKnown(url, '.well-known/oauth-authorization-server');
                break;
            default:
                throw CodedTypeError('"options.algorithm" must be "oidc" (default), or "oauth2"', ERR_INVALID_ARG_VALUE);
        }
        return url;
    }, options);
}
function assertNumber(input, allow0, it, code, cause) {
    try {
        if (typeof input !== 'number' || !Number.isFinite(input)) {
            throw CodedTypeError(`${it} must be a number`, ERR_INVALID_ARG_TYPE, cause);
        }
        if (input > 0) return;
        if (allow0) {
            if (input !== 0) {
                throw CodedTypeError(`${it} must be a non-negative number`, ERR_INVALID_ARG_VALUE, cause);
            }
            return;
        }
        throw CodedTypeError(`${it} must be a positive number`, ERR_INVALID_ARG_VALUE, cause);
    } catch (err) {
        if (code) {
            throw OPE(err.message, code, cause);
        }
        throw err;
    }
}
function assertString(input, it, code, cause) {
    try {
        if (typeof input !== 'string') {
            throw CodedTypeError(`${it} must be a string`, ERR_INVALID_ARG_TYPE, cause);
        }
        if (input.length === 0) {
            throw CodedTypeError(`${it} must not be empty`, ERR_INVALID_ARG_VALUE, cause);
        }
    } catch (err) {
        if (code) {
            throw OPE(err.message, code, cause);
        }
        throw err;
    }
}
async function processDiscoveryResponse(expectedIssuerIdentifier, response) {
    const expected = expectedIssuerIdentifier;
    if (!(expected instanceof URL) && expected !== _nodiscoverycheck) {
        throw CodedTypeError('"expectedIssuerIdentifier" must be an instance of URL', ERR_INVALID_ARG_TYPE);
    }
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    if (response.status !== 200) {
        throw OPE('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.issuer, '"response" body "issuer" property', INVALID_RESPONSE, {
        body: json
    });
    if (expected !== _nodiscoverycheck && new URL(json.issuer).href !== expected.href) {
        throw OPE('"response" body "issuer" property does not match the expected value', JSON_ATTRIBUTE_COMPARISON, {
            expected: expected.href,
            body: json,
            attribute: 'issuer'
        });
    }
    return json;
}
function assertApplicationJson(response) {
    assertContentType(response, 'application/json');
}
function notJson(response, ...types) {
    let msg = '"response" content-type must be ';
    if (types.length > 2) {
        const last = types.pop();
        msg += `${types.join(', ')}, or ${last}`;
    } else if (types.length === 2) {
        msg += `${types[0]} or ${types[1]}`;
    } else {
        msg += types[0];
    }
    return OPE(msg, RESPONSE_IS_NOT_JSON, response);
}
function assertContentTypes(response, ...types) {
    if (!types.includes(getContentType(response))) {
        throw notJson(response, ...types);
    }
}
function assertContentType(response, contentType) {
    if (getContentType(response) !== contentType) {
        throw notJson(response, contentType);
    }
}
function randomBytes() {
    return b64u(crypto.getRandomValues(new Uint8Array(32)));
}
function generateRandomCodeVerifier() {
    return randomBytes();
}
function generateRandomState() {
    return randomBytes();
}
function generateRandomNonce() {
    return randomBytes();
}
async function calculatePKCECodeChallenge(codeVerifier) {
    assertString(codeVerifier, 'codeVerifier');
    return b64u(await crypto.subtle.digest('SHA-256', buf(codeVerifier)));
}
function getKeyAndKid(input) {
    if (input instanceof CryptoKey) {
        return {
            key: input
        };
    }
    if (!(input?.key instanceof CryptoKey)) {
        return {};
    }
    if (input.kid !== undefined) {
        assertString(input.kid, '"kid"');
    }
    return {
        key: input.key,
        kid: input.kid
    };
}
function psAlg(key) {
    switch(key.algorithm.hash.name){
        case 'SHA-256':
            return 'PS256';
        case 'SHA-384':
            return 'PS384';
        case 'SHA-512':
            return 'PS512';
        default:
            throw new UnsupportedOperationError('unsupported RsaHashedKeyAlgorithm hash name', {
                cause: key
            });
    }
}
function rsAlg(key) {
    switch(key.algorithm.hash.name){
        case 'SHA-256':
            return 'RS256';
        case 'SHA-384':
            return 'RS384';
        case 'SHA-512':
            return 'RS512';
        default:
            throw new UnsupportedOperationError('unsupported RsaHashedKeyAlgorithm hash name', {
                cause: key
            });
    }
}
function esAlg(key) {
    switch(key.algorithm.namedCurve){
        case 'P-256':
            return 'ES256';
        case 'P-384':
            return 'ES384';
        case 'P-521':
            return 'ES512';
        default:
            throw new UnsupportedOperationError('unsupported EcKeyAlgorithm namedCurve', {
                cause: key
            });
    }
}
function keyToJws(key) {
    switch(key.algorithm.name){
        case 'RSA-PSS':
            return psAlg(key);
        case 'RSASSA-PKCS1-v1_5':
            return rsAlg(key);
        case 'ECDSA':
            return esAlg(key);
        case 'Ed25519':
        case 'ML-DSA-44':
        case 'ML-DSA-65':
        case 'ML-DSA-87':
            return key.algorithm.name;
        case 'EdDSA':
            return 'Ed25519';
        default:
            throw new UnsupportedOperationError('unsupported CryptoKey algorithm name', {
                cause: key
            });
    }
}
function getClockSkew(client) {
    const skew = client?.[clockSkew];
    return typeof skew === 'number' && Number.isFinite(skew) ? skew : 0;
}
function getClockTolerance(client) {
    const tolerance = client?.[clockTolerance];
    return typeof tolerance === 'number' && Number.isFinite(tolerance) && Math.sign(tolerance) !== -1 ? tolerance : 30;
}
function epochTime() {
    return Math.floor(Date.now() / 1000);
}
function assertAs(as) {
    if (typeof as !== 'object' || as === null) {
        throw CodedTypeError('"as" must be an object', ERR_INVALID_ARG_TYPE);
    }
    assertString(as.issuer, '"as.issuer"');
}
function assertClient(client) {
    if (typeof client !== 'object' || client === null) {
        throw CodedTypeError('"client" must be an object', ERR_INVALID_ARG_TYPE);
    }
    assertString(client.client_id, '"client.client_id"');
}
function formUrlEncode(token) {
    return encodeURIComponent(token).replace(/(?:[-_.!~*'()]|%20)/g, (substring)=>{
        switch(substring){
            case '-':
            case '_':
            case '.':
            case '!':
            case '~':
            case '*':
            case "'":
            case '(':
            case ')':
                return `%${substring.charCodeAt(0).toString(16).toUpperCase()}`;
            case '%20':
                return '+';
            default:
                throw new Error();
        }
    });
}
function ClientSecretPost(clientSecret) {
    assertString(clientSecret, '"clientSecret"');
    return (_as, client, body, _headers)=>{
        body.set('client_id', client.client_id);
        body.set('client_secret', clientSecret);
    };
}
function ClientSecretBasic(clientSecret) {
    assertString(clientSecret, '"clientSecret"');
    return (_as, client, _body, headers)=>{
        const username = formUrlEncode(client.client_id);
        const password = formUrlEncode(clientSecret);
        const credentials = btoa(`${username}:${password}`);
        headers.set('authorization', `Basic ${credentials}`);
    };
}
function clientAssertionPayload(as, client) {
    const now = epochTime() + getClockSkew(client);
    return {
        jti: randomBytes(),
        aud: as.issuer,
        exp: now + 60,
        iat: now,
        nbf: now,
        iss: client.client_id,
        sub: client.client_id
    };
}
function PrivateKeyJwt(clientPrivateKey, options) {
    const { key, kid } = getKeyAndKid(clientPrivateKey);
    assertPrivateKey(key, '"clientPrivateKey.key"');
    return async (as, client, body, _headers)=>{
        const header = {
            alg: keyToJws(key),
            kid
        };
        const payload = clientAssertionPayload(as, client);
        options?.[modifyAssertion]?.(header, payload);
        body.set('client_id', client.client_id);
        body.set('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer');
        body.set('client_assertion', await signJwt(header, payload, key));
    };
}
function ClientSecretJwt(clientSecret, options) {
    assertString(clientSecret, '"clientSecret"');
    const modify = options?.[modifyAssertion];
    let key;
    return async (as, client, body, _headers)=>{
        key ||= await crypto.subtle.importKey('raw', buf(clientSecret), {
            hash: 'SHA-256',
            name: 'HMAC'
        }, false, [
            'sign'
        ]);
        const header = {
            alg: 'HS256'
        };
        const payload = clientAssertionPayload(as, client);
        modify?.(header, payload);
        const data = `${b64u(buf(JSON.stringify(header)))}.${b64u(buf(JSON.stringify(payload)))}`;
        const hmac = await crypto.subtle.sign(key.algorithm, key, buf(data));
        body.set('client_id', client.client_id);
        body.set('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer');
        body.set('client_assertion', `${data}.${b64u(new Uint8Array(hmac))}`);
    };
}
function None() {
    return (_as, client, body, _headers)=>{
        body.set('client_id', client.client_id);
    };
}
function TlsClientAuth() {
    return None();
}
async function signJwt(header, payload, key) {
    if (!key.usages.includes('sign')) {
        throw CodedTypeError('CryptoKey instances used for signing assertions must include "sign" in their "usages"', ERR_INVALID_ARG_VALUE);
    }
    const input = `${b64u(buf(JSON.stringify(header)))}.${b64u(buf(JSON.stringify(payload)))}`;
    const signature = b64u(await crypto.subtle.sign(keyToSubtle(key), key, buf(input)));
    return `${input}.${signature}`;
}
async function issueRequestObject(as, client, parameters, privateKey, options) {
    assertAs(as);
    assertClient(client);
    parameters = new URLSearchParams(parameters);
    const { key, kid } = getKeyAndKid(privateKey);
    assertPrivateKey(key, '"privateKey.key"');
    parameters.set('client_id', client.client_id);
    const now = epochTime() + getClockSkew(client);
    const claims = {
        ...Object.fromEntries(parameters.entries()),
        jti: randomBytes(),
        aud: as.issuer,
        exp: now + 60,
        iat: now,
        nbf: now,
        iss: client.client_id
    };
    let resource;
    if (parameters.has('resource') && (resource = parameters.getAll('resource')) && resource.length > 1) {
        claims.resource = resource;
    }
    {
        let value = parameters.get('max_age');
        if (value !== null) {
            claims.max_age = parseInt(value, 10);
            assertNumber(claims.max_age, true, '"max_age" parameter');
        }
    }
    {
        let value = parameters.get('claims');
        if (value !== null) {
            try {
                claims.claims = JSON.parse(value);
            } catch (cause) {
                throw OPE('failed to parse the "claims" parameter as JSON', PARSE_ERROR, cause);
            }
            if (!isJsonObject(claims.claims)) {
                throw CodedTypeError('"claims" parameter must be a JSON with a top level object', ERR_INVALID_ARG_VALUE);
            }
        }
    }
    {
        let value = parameters.get('authorization_details');
        if (value !== null) {
            try {
                claims.authorization_details = JSON.parse(value);
            } catch (cause) {
                throw OPE('failed to parse the "authorization_details" parameter as JSON', PARSE_ERROR, cause);
            }
            if (!Array.isArray(claims.authorization_details)) {
                throw CodedTypeError('"authorization_details" parameter must be a JSON with a top level array', ERR_INVALID_ARG_VALUE);
            }
        }
    }
    const header = {
        alg: keyToJws(key),
        typ: 'oauth-authz-req+jwt',
        kid
    };
    options?.[modifyAssertion]?.(header, claims);
    return signJwt(header, claims, key);
}
let jwkCache;
async function getSetPublicJwkCache(key, alg) {
    const { kty, e, n, x, y, crv, pub } = await crypto.subtle.exportKey('jwk', key);
    const jwk = {
        kty,
        e,
        n,
        x,
        y,
        crv,
        pub
    };
    if (kty === 'AKP') jwk.alg = alg;
    jwkCache.set(key, jwk);
    return jwk;
}
async function publicJwk(key, alg) {
    jwkCache ||= new WeakMap();
    return jwkCache.get(key) || getSetPublicJwkCache(key, alg);
}
const URLParse = URL.parse ? (url, base)=>URL.parse(url, base) : (url, base)=>{
    try {
        return new URL(url, base);
    } catch  {
        return null;
    }
};
function checkProtocol(url, enforceHttps) {
    if (enforceHttps && url.protocol !== 'https:') {
        throw OPE('only requests to HTTPS are allowed', HTTP_REQUEST_FORBIDDEN, url);
    }
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw OPE('only HTTP and HTTPS requests are allowed', REQUEST_PROTOCOL_FORBIDDEN, url);
    }
}
function validateEndpoint(value, endpoint, useMtlsAlias, enforceHttps) {
    let url;
    if (typeof value !== 'string' || !(url = URLParse(value))) {
        throw OPE(`authorization server metadata does not contain a valid ${useMtlsAlias ? `"as.mtls_endpoint_aliases.${endpoint}"` : `"as.${endpoint}"`}`, value === undefined ? MISSING_SERVER_METADATA : INVALID_SERVER_METADATA, {
            attribute: useMtlsAlias ? `mtls_endpoint_aliases.${endpoint}` : endpoint
        });
    }
    checkProtocol(url, enforceHttps);
    return url;
}
function resolveEndpoint(as, endpoint, useMtlsAlias, enforceHttps) {
    if (useMtlsAlias && as.mtls_endpoint_aliases && endpoint in as.mtls_endpoint_aliases) {
        return validateEndpoint(as.mtls_endpoint_aliases[endpoint], endpoint, useMtlsAlias, enforceHttps);
    }
    return validateEndpoint(as[endpoint], endpoint, useMtlsAlias, enforceHttps);
}
async function pushedAuthorizationRequest(as, client, clientAuthentication, parameters, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, 'pushed_authorization_request_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(parameters);
    body.set('client_id', client.client_id);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    if (options?.DPoP !== undefined) {
        assertDPoP(options.DPoP);
        await options.DPoP.addProof(url, headers, 'POST');
    }
    const response = await authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
    options?.DPoP?.cacheNonce(response, url);
    return response;
}
class DPoPHandler {
    #header;
    #privateKey;
    #publicKey;
    #clockSkew;
    #modifyAssertion;
    #map;
    #jkt;
    constructor(client, keyPair, options){
        assertPrivateKey(keyPair?.privateKey, '"DPoP.privateKey"');
        assertPublicKey(keyPair?.publicKey, '"DPoP.publicKey"');
        if (!keyPair.publicKey.extractable) {
            throw CodedTypeError('"DPoP.publicKey.extractable" must be true', ERR_INVALID_ARG_VALUE);
        }
        this.#modifyAssertion = options?.[modifyAssertion];
        this.#clockSkew = getClockSkew(client);
        this.#privateKey = keyPair.privateKey;
        this.#publicKey = keyPair.publicKey;
        branded.add(this);
    }
    #get(key) {
        this.#map ||= new Map();
        let item = this.#map.get(key);
        if (item) {
            this.#map.delete(key);
            this.#map.set(key, item);
        }
        return item;
    }
    #set(key, val) {
        this.#map ||= new Map();
        this.#map.delete(key);
        if (this.#map.size === 100) {
            this.#map.delete(this.#map.keys().next().value);
        }
        this.#map.set(key, val);
    }
    async calculateThumbprint() {
        if (!this.#jkt) {
            const jwk = await crypto.subtle.exportKey('jwk', this.#publicKey);
            this.#jkt ||= await calculateJwkThumbprint(jwk);
        }
        return this.#jkt;
    }
    async addProof(url, headers, htm, accessToken) {
        const alg = keyToJws(this.#privateKey);
        this.#header ||= {
            alg,
            typ: 'dpop+jwt',
            jwk: await publicJwk(this.#publicKey, alg)
        };
        const nonce = this.#get(url.origin);
        const now = epochTime() + this.#clockSkew;
        const payload = {
            iat: now,
            jti: randomBytes(),
            htm,
            nonce,
            htu: `${url.origin}${url.pathname}`,
            ath: accessToken ? b64u(await crypto.subtle.digest('SHA-256', buf(accessToken))) : undefined
        };
        this.#modifyAssertion?.(this.#header, payload);
        headers.set('dpop', await signJwt(this.#header, payload, this.#privateKey));
    }
    cacheNonce(response, url) {
        try {
            const nonce = response.headers.get('dpop-nonce');
            if (nonce) {
                this.#set(url.origin, nonce);
            }
        } catch  {}
    }
}
function isDPoPNonceError(err) {
    if (err instanceof WWWAuthenticateChallengeError) {
        const { 0: challenge, length } = err.cause;
        return length === 1 && challenge.scheme === 'dpop' && challenge.parameters.error === 'use_dpop_nonce';
    }
    if (err instanceof ResponseBodyError) {
        return err.error === 'use_dpop_nonce';
    }
    return false;
}
function DPoP(client, keyPair, options) {
    return new DPoPHandler(client, keyPair, options);
}
class ResponseBodyError extends Error {
    cause;
    code;
    error;
    status;
    error_description;
    response;
    constructor(message, options){
        super(message, options);
        this.name = this.constructor.name;
        this.code = RESPONSE_BODY_ERROR;
        this.cause = options.cause;
        this.error = options.cause.error;
        this.status = options.response.status;
        this.error_description = options.cause.error_description;
        Object.defineProperty(this, 'response', {
            enumerable: false,
            value: options.response
        });
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class AuthorizationResponseError extends Error {
    cause;
    code;
    error;
    error_description;
    constructor(message, options){
        super(message, options);
        this.name = this.constructor.name;
        this.code = AUTHORIZATION_RESPONSE_ERROR;
        this.cause = options.cause;
        this.error = options.cause.get('error');
        this.error_description = options.cause.get('error_description') ?? undefined;
        Error.captureStackTrace?.(this, this.constructor);
    }
}
class WWWAuthenticateChallengeError extends Error {
    cause;
    code;
    response;
    status;
    constructor(message, options){
        super(message, options);
        this.name = this.constructor.name;
        this.code = WWW_AUTHENTICATE_CHALLENGE;
        this.cause = options.cause;
        this.status = options.response.status;
        this.response = options.response;
        Object.defineProperty(this, 'response', {
            enumerable: false
        });
        Error.captureStackTrace?.(this, this.constructor);
    }
}
const tokenMatch = "[a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+";
const token68Match = '[a-zA-Z0-9\\-\\._\\~\\+\\/]+={0,2}';
const quotedMatch = '"((?:[^"\\\\]|\\\\[\\s\\S])*)"';
const quotedParamMatcher = '(' + tokenMatch + ')\\s*=\\s*' + quotedMatch;
const paramMatcher = '(' + tokenMatch + ')\\s*=\\s*(' + tokenMatch + ')';
const schemeRE = new RegExp('^[,\\s]*(' + tokenMatch + ')');
const quotedParamRE = new RegExp('^[,\\s]*' + quotedParamMatcher + '[,\\s]*(.*)');
const unquotedParamRE = new RegExp('^[,\\s]*' + paramMatcher + '[,\\s]*(.*)');
const token68ParamRE = new RegExp('^(' + token68Match + ')(?:$|[,\\s])(.*)');
function parseWwwAuthenticateChallenges(response) {
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    const header = response.headers.get('www-authenticate');
    if (header === null) {
        return undefined;
    }
    const challenges = [];
    let rest = header;
    while(rest){
        let match = rest.match(schemeRE);
        const scheme = match?.['1'].toLowerCase();
        if (!scheme) {
            return undefined;
        }
        const afterScheme = rest.substring(match[0].length);
        if (afterScheme && !afterScheme.match(/^[\s,]/)) {
            return undefined;
        }
        const spaceMatch = afterScheme.match(/^\s+(.*)$/);
        const hasParameters = !!spaceMatch;
        rest = spaceMatch ? spaceMatch[1] : undefined;
        const parameters = {};
        let token68;
        if (hasParameters) {
            while(rest){
                let key;
                let value;
                if (match = rest.match(quotedParamRE)) {
                    ;
                    [, key, value, rest] = match;
                    if (value.includes('\\')) {
                        try {
                            value = JSON.parse(`"${value}"`);
                        } catch  {}
                    }
                    parameters[key.toLowerCase()] = value;
                    continue;
                }
                if (match = rest.match(unquotedParamRE)) {
                    ;
                    [, key, value, rest] = match;
                    parameters[key.toLowerCase()] = value;
                    continue;
                }
                if (match = rest.match(token68ParamRE)) {
                    if (Object.keys(parameters).length) {
                        break;
                    }
                    ;
                    [, token68, rest] = match;
                    break;
                }
                return undefined;
            }
        } else {
            rest = afterScheme || undefined;
        }
        const challenge = {
            scheme,
            parameters
        };
        if (token68) {
            challenge.token68 = token68;
        }
        challenges.push(challenge);
    }
    if (!challenges.length) {
        return undefined;
    }
    return challenges;
}
async function processPushedAuthorizationResponse(as, client, response) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 201, 'Pushed Authorization Request Endpoint');
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.request_uri, '"response" body "request_uri" property', INVALID_RESPONSE, {
        body: json
    });
    let expiresIn = typeof json.expires_in !== 'number' ? parseFloat(json.expires_in) : json.expires_in;
    assertNumber(expiresIn, true, '"response" body "expires_in" property', INVALID_RESPONSE, {
        body: json
    });
    json.expires_in = expiresIn;
    return json;
}
async function parseOAuthResponseErrorBody(response) {
    if (response.status > 399 && response.status < 500) {
        assertReadableResponse(response);
        assertApplicationJson(response);
        try {
            const json = await response.clone().json();
            if (isJsonObject(json) && typeof json.error === 'string' && json.error.length) {
                return json;
            }
        } catch  {}
    }
    return undefined;
}
async function checkOAuthBodyError(response, expected, label) {
    if (response.status !== expected) {
        checkAuthenticationChallenges(response);
        let err;
        if (err = await parseOAuthResponseErrorBody(response)) {
            await response.body?.cancel();
            throw new ResponseBodyError('server responded with an error in the response body', {
                cause: err,
                response
            });
        }
        throw OPE(`"response" is not a conform ${label} response (unexpected HTTP status code)`, RESPONSE_IS_NOT_CONFORM, response);
    }
}
function assertDPoP(option) {
    if (!branded.has(option)) {
        throw CodedTypeError('"options.DPoP" is not a valid DPoPHandle', ERR_INVALID_ARG_VALUE);
    }
}
async function resourceRequest(accessToken, method, url, headers, body, options) {
    assertString(accessToken, '"accessToken"');
    if (!(url instanceof URL)) {
        throw CodedTypeError('"url" must be an instance of URL', ERR_INVALID_ARG_TYPE);
    }
    checkProtocol(url, options?.[allowInsecureRequests] !== true);
    headers = prepareHeaders(headers);
    if (options?.DPoP) {
        assertDPoP(options.DPoP);
        await options.DPoP.addProof(url, headers, method.toUpperCase(), accessToken);
    }
    headers.set('authorization', `${headers.has('dpop') ? 'DPoP' : 'Bearer'} ${accessToken}`);
    const response = await (options?.[customFetch] || fetch)(url.href, {
        body,
        headers: Object.fromEntries(headers.entries()),
        method,
        redirect: 'manual',
        signal: signal(url, options?.signal)
    });
    options?.DPoP?.cacheNonce(response, url);
    return response;
}
async function protectedResourceRequest(accessToken, method, url, headers, body, options) {
    const response = await resourceRequest(accessToken, method, url, headers, body, options);
    checkAuthenticationChallenges(response);
    return response;
}
async function userInfoRequest(as, client, accessToken, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, 'userinfo_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const headers = prepareHeaders(options?.headers);
    if (client.userinfo_signed_response_alg) {
        headers.set('accept', 'application/jwt');
    } else {
        headers.set('accept', 'application/json');
        headers.append('accept', 'application/jwt');
    }
    return resourceRequest(accessToken, 'GET', url, headers, null, {
        ...options,
        [clockSkew]: getClockSkew(client)
    });
}
let jwksMap;
function setJwksCache(as, jwks, uat, cache) {
    jwksMap ||= new WeakMap();
    jwksMap.set(as, {
        jwks,
        uat,
        get age () {
            return epochTime() - this.uat;
        }
    });
    if (cache) {
        Object.assign(cache, {
            jwks: structuredClone(jwks),
            uat
        });
    }
}
function isFreshJwksCache(input) {
    if (typeof input !== 'object' || input === null) {
        return false;
    }
    if (!('uat' in input) || typeof input.uat !== 'number' || epochTime() - input.uat >= 300) {
        return false;
    }
    if (!('jwks' in input) || !isJsonObject(input.jwks) || !Array.isArray(input.jwks.keys) || !Array.prototype.every.call(input.jwks.keys, isJsonObject)) {
        return false;
    }
    return true;
}
function clearJwksCache(as, cache) {
    jwksMap?.delete(as);
    delete cache?.jwks;
    delete cache?.uat;
}
async function getPublicSigKeyFromIssuerJwksUri(as, options, header) {
    const { alg, kid } = header;
    checkSupportedJwsAlg(header);
    if (!jwksMap?.has(as) && isFreshJwksCache(options?.[jwksCache])) {
        setJwksCache(as, options?.[jwksCache].jwks, options?.[jwksCache].uat);
    }
    let jwks;
    let age;
    if (jwksMap?.has(as)) {
        ;
        ({ jwks, age } = jwksMap.get(as));
        if (age >= 300) {
            clearJwksCache(as, options?.[jwksCache]);
            return getPublicSigKeyFromIssuerJwksUri(as, options, header);
        }
    } else {
        jwks = await jwksRequest(as, options).then(processJwksResponse);
        age = 0;
        setJwksCache(as, jwks, epochTime(), options?.[jwksCache]);
    }
    let kty;
    switch(alg.slice(0, 2)){
        case 'RS':
        case 'PS':
            kty = 'RSA';
            break;
        case 'ES':
            kty = 'EC';
            break;
        case 'Ed':
            kty = 'OKP';
            break;
        case 'ML':
            kty = 'AKP';
            break;
        default:
            throw new UnsupportedOperationError('unsupported JWS algorithm', {
                cause: {
                    alg
                }
            });
    }
    const candidates = jwks.keys.filter((jwk)=>{
        if (jwk.kty !== kty) {
            return false;
        }
        if (kid !== undefined && kid !== jwk.kid) {
            return false;
        }
        if (jwk.alg !== undefined && alg !== jwk.alg) {
            return false;
        }
        if (jwk.use !== undefined && jwk.use !== 'sig') {
            return false;
        }
        if (jwk.key_ops?.includes('verify') === false) {
            return false;
        }
        switch(true){
            case alg === 'ES256' && jwk.crv !== 'P-256':
            case alg === 'ES384' && jwk.crv !== 'P-384':
            case alg === 'ES512' && jwk.crv !== 'P-521':
            case alg === 'Ed25519' && jwk.crv !== 'Ed25519':
            case alg === 'EdDSA' && jwk.crv !== 'Ed25519':
                return false;
        }
        return true;
    });
    const { 0: jwk, length } = candidates;
    if (!length) {
        if (age >= 60) {
            clearJwksCache(as, options?.[jwksCache]);
            return getPublicSigKeyFromIssuerJwksUri(as, options, header);
        }
        throw OPE('error when selecting a JWT verification key, no applicable keys found', KEY_SELECTION, {
            header,
            candidates,
            jwks_uri: new URL(as.jwks_uri)
        });
    }
    if (length !== 1) {
        throw OPE('error when selecting a JWT verification key, multiple applicable keys found, a "kid" JWT Header Parameter is required', KEY_SELECTION, {
            header,
            candidates,
            jwks_uri: new URL(as.jwks_uri)
        });
    }
    return importJwk(alg, jwk);
}
const skipSubjectCheck = Symbol();
function getContentType(input) {
    return input.headers.get('content-type')?.split(';')[0];
}
async function processUserInfoResponse(as, client, expectedSubject, response, options) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    checkAuthenticationChallenges(response);
    if (response.status !== 200) {
        throw OPE('"response" is not a conform UserInfo Endpoint response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    let json;
    if (getContentType(response) === 'application/jwt') {
        const { claims, jwt } = await validateJwt(await response.text(), checkSigningAlgorithm.bind(undefined, client.userinfo_signed_response_alg, as.userinfo_signing_alg_values_supported, undefined), getClockSkew(client), getClockTolerance(client), options?.[jweDecrypt]).then(validateOptionalAudience.bind(undefined, client.client_id)).then(validateOptionalIssuer.bind(undefined, as));
        jwtRefs.set(response, jwt);
        json = claims;
    } else {
        if (client.userinfo_signed_response_alg) {
            throw OPE('JWT UserInfo Response expected', JWT_USERINFO_EXPECTED, response);
        }
        json = await getResponseJsonBody(response);
    }
    assertString(json.sub, '"response" body "sub" property', INVALID_RESPONSE, {
        body: json
    });
    switch(expectedSubject){
        case skipSubjectCheck:
            break;
        default:
            assertString(expectedSubject, '"expectedSubject"');
            if (json.sub !== expectedSubject) {
                throw OPE('unexpected "response" body "sub" property value', JSON_ATTRIBUTE_COMPARISON, {
                    expected: expectedSubject,
                    body: json,
                    attribute: 'sub'
                });
            }
    }
    return json;
}
async function authenticatedRequest(as, client, clientAuthentication, url, body, headers, options) {
    await clientAuthentication(as, client, body, headers);
    headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    return (options?.[customFetch] || fetch)(url.href, {
        body,
        headers: Object.fromEntries(headers.entries()),
        method: 'POST',
        redirect: 'manual',
        signal: signal(url, options?.signal)
    });
}
async function tokenEndpointRequest(as, client, clientAuthentication, grantType, parameters, options) {
    const url = resolveEndpoint(as, 'token_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    parameters.set('grant_type', grantType);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    if (options?.DPoP !== undefined) {
        assertDPoP(options.DPoP);
        await options.DPoP.addProof(url, headers, 'POST');
    }
    const response = await authenticatedRequest(as, client, clientAuthentication, url, parameters, headers, options);
    options?.DPoP?.cacheNonce(response, url);
    return response;
}
async function refreshTokenGrantRequest(as, client, clientAuthentication, refreshToken, options) {
    assertAs(as);
    assertClient(client);
    assertString(refreshToken, '"refreshToken"');
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set('refresh_token', refreshToken);
    return tokenEndpointRequest(as, client, clientAuthentication, 'refresh_token', parameters, options);
}
const idTokenClaims = new WeakMap();
const jwtRefs = new WeakMap();
function getValidatedIdTokenClaims(ref) {
    if (!ref.id_token) {
        return undefined;
    }
    const claims = idTokenClaims.get(ref);
    if (!claims) {
        throw CodedTypeError('"ref" was already garbage collected or did not resolve from the proper sources', ERR_INVALID_ARG_VALUE);
    }
    return claims;
}
async function validateApplicationLevelSignature(as, ref, options) {
    assertAs(as);
    if (!jwtRefs.has(ref)) {
        throw CodedTypeError('"ref" does not contain a processed JWT Response to verify the signature of', ERR_INVALID_ARG_VALUE);
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = jwtRefs.get(ref).split('.');
    const header = JSON.parse(buf(b64u(protectedHeader)));
    if (header.alg.startsWith('HS')) {
        throw new UnsupportedOperationError('unsupported JWS algorithm', {
            cause: {
                alg: header.alg
            }
        });
    }
    let key;
    key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, b64u(encodedSignature));
}
async function processGenericAccessTokenResponse(as, client, response, additionalRequiredIdTokenClaims, decryptFn, recognizedTokenTypes) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 200, 'Token Endpoint');
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.access_token, '"response" body "access_token" property', INVALID_RESPONSE, {
        body: json
    });
    assertString(json.token_type, '"response" body "token_type" property', INVALID_RESPONSE, {
        body: json
    });
    json.token_type = json.token_type.toLowerCase();
    if (json.expires_in !== undefined) {
        let expiresIn = typeof json.expires_in !== 'number' ? parseFloat(json.expires_in) : json.expires_in;
        assertNumber(expiresIn, true, '"response" body "expires_in" property', INVALID_RESPONSE, {
            body: json
        });
        json.expires_in = expiresIn;
    }
    if (json.refresh_token !== undefined) {
        assertString(json.refresh_token, '"response" body "refresh_token" property', INVALID_RESPONSE, {
            body: json
        });
    }
    if (json.scope !== undefined && typeof json.scope !== 'string') {
        throw OPE('"response" body "scope" property must be a string', INVALID_RESPONSE, {
            body: json
        });
    }
    if (json.id_token !== undefined) {
        assertString(json.id_token, '"response" body "id_token" property', INVALID_RESPONSE, {
            body: json
        });
        const requiredClaims = [
            'aud',
            'exp',
            'iat',
            'iss',
            'sub'
        ];
        if (client.require_auth_time === true) {
            requiredClaims.push('auth_time');
        }
        if (client.default_max_age !== undefined) {
            assertNumber(client.default_max_age, true, '"client.default_max_age"');
            requiredClaims.push('auth_time');
        }
        if (additionalRequiredIdTokenClaims?.length) {
            requiredClaims.push(...additionalRequiredIdTokenClaims);
        }
        const { claims, jwt } = await validateJwt(json.id_token, checkSigningAlgorithm.bind(undefined, client.id_token_signed_response_alg, as.id_token_signing_alg_values_supported, 'RS256'), getClockSkew(client), getClockTolerance(client), decryptFn).then(validatePresence.bind(undefined, requiredClaims)).then(validateIssuer.bind(undefined, as)).then(validateAudience.bind(undefined, client.client_id));
        if (Array.isArray(claims.aud) && claims.aud.length !== 1) {
            if (claims.azp === undefined) {
                throw OPE('ID Token "aud" (audience) claim includes additional untrusted audiences', JWT_CLAIM_COMPARISON, {
                    claims,
                    claim: 'aud'
                });
            }
            if (claims.azp !== client.client_id) {
                throw OPE('unexpected ID Token "azp" (authorized party) claim value', JWT_CLAIM_COMPARISON, {
                    expected: client.client_id,
                    claims,
                    claim: 'azp'
                });
            }
        }
        if (claims.auth_time !== undefined) {
            assertNumber(claims.auth_time, true, 'ID Token "auth_time" (authentication time)', INVALID_RESPONSE, {
                claims
            });
        }
        jwtRefs.set(response, jwt);
        idTokenClaims.set(json, claims);
    }
    if (recognizedTokenTypes?.[json.token_type] !== undefined) {
        recognizedTokenTypes[json.token_type](response, json);
    } else if (json.token_type !== 'dpop' && json.token_type !== 'bearer') {
        throw new UnsupportedOperationError('unsupported `token_type` value', {
            cause: {
                body: json
            }
        });
    }
    return json;
}
function checkAuthenticationChallenges(response) {
    let challenges;
    if (challenges = parseWwwAuthenticateChallenges(response)) {
        throw new WWWAuthenticateChallengeError('server responded with a challenge in the WWW-Authenticate HTTP Header', {
            cause: challenges,
            response
        });
    }
}
async function processRefreshTokenResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
function validateOptionalAudience(expected, result) {
    if (result.claims.aud !== undefined) {
        return validateAudience(expected, result);
    }
    return result;
}
function validateAudience(expected, result) {
    if (Array.isArray(result.claims.aud)) {
        if (!result.claims.aud.includes(expected)) {
            throw OPE('unexpected JWT "aud" (audience) claim value', JWT_CLAIM_COMPARISON, {
                expected,
                claims: result.claims,
                claim: 'aud'
            });
        }
    } else if (result.claims.aud !== expected) {
        throw OPE('unexpected JWT "aud" (audience) claim value', JWT_CLAIM_COMPARISON, {
            expected,
            claims: result.claims,
            claim: 'aud'
        });
    }
    return result;
}
function validateOptionalIssuer(as, result) {
    if (result.claims.iss !== undefined) {
        return validateIssuer(as, result);
    }
    return result;
}
function validateIssuer(as, result) {
    const expected = as[_expectedIssuer]?.(result) ?? as.issuer;
    if (result.claims.iss !== expected) {
        throw OPE('unexpected JWT "iss" (issuer) claim value', JWT_CLAIM_COMPARISON, {
            expected,
            claims: result.claims,
            claim: 'iss'
        });
    }
    return result;
}
const branded = new WeakSet();
function brand(searchParams) {
    branded.add(searchParams);
    return searchParams;
}
const nopkce = Symbol();
async function authorizationCodeGrantRequest(as, client, clientAuthentication, callbackParameters, redirectUri, codeVerifier, options) {
    assertAs(as);
    assertClient(client);
    if (!branded.has(callbackParameters)) {
        throw CodedTypeError('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', ERR_INVALID_ARG_VALUE);
    }
    assertString(redirectUri, '"redirectUri"');
    const code = getURLSearchParameter(callbackParameters, 'code');
    if (!code) {
        throw OPE('no authorization code in "callbackParameters"', INVALID_RESPONSE);
    }
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set('redirect_uri', redirectUri);
    parameters.set('code', code);
    if (codeVerifier !== nopkce) {
        assertString(codeVerifier, '"codeVerifier"');
        parameters.set('code_verifier', codeVerifier);
    }
    return tokenEndpointRequest(as, client, clientAuthentication, 'authorization_code', parameters, options);
}
const jwtClaimNames = {
    aud: 'audience',
    c_hash: 'code hash',
    client_id: 'client id',
    exp: 'expiration time',
    iat: 'issued at',
    iss: 'issuer',
    jti: 'jwt id',
    nonce: 'nonce',
    s_hash: 'state hash',
    sub: 'subject',
    ath: 'access token hash',
    htm: 'http method',
    htu: 'http uri',
    cnf: 'confirmation',
    auth_time: 'authentication time'
};
function validatePresence(required, result) {
    for (const claim of required){
        if (result.claims[claim] === undefined) {
            throw OPE(`JWT "${claim}" (${jwtClaimNames[claim]}) claim missing`, INVALID_RESPONSE, {
                claims: result.claims
            });
        }
    }
    return result;
}
const expectNoNonce = Symbol();
const skipAuthTimeCheck = Symbol();
async function processAuthorizationCodeResponse(as, client, response, options) {
    if (typeof options?.expectedNonce === 'string' || typeof options?.maxAge === 'number' || options?.requireIdToken) {
        return processAuthorizationCodeOpenIDResponse(as, client, response, options.expectedNonce, options.maxAge, options[jweDecrypt], options.recognizedTokenTypes);
    }
    return processAuthorizationCodeOAuth2Response(as, client, response, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
async function processAuthorizationCodeOpenIDResponse(as, client, response, expectedNonce, maxAge, decryptFn, recognizedTokenTypes) {
    const additionalRequiredClaims = [];
    switch(expectedNonce){
        case undefined:
            expectedNonce = expectNoNonce;
            break;
        case expectNoNonce:
            break;
        default:
            assertString(expectedNonce, '"expectedNonce" argument');
            additionalRequiredClaims.push('nonce');
    }
    maxAge ??= client.default_max_age;
    switch(maxAge){
        case undefined:
            maxAge = skipAuthTimeCheck;
            break;
        case skipAuthTimeCheck:
            break;
        default:
            assertNumber(maxAge, true, '"maxAge" argument');
            additionalRequiredClaims.push('auth_time');
    }
    const result = await processGenericAccessTokenResponse(as, client, response, additionalRequiredClaims, decryptFn, recognizedTokenTypes);
    assertString(result.id_token, '"response" body "id_token" property', INVALID_RESPONSE, {
        body: result
    });
    const claims = getValidatedIdTokenClaims(result);
    if (maxAge !== skipAuthTimeCheck) {
        const now = epochTime() + getClockSkew(client);
        const tolerance = getClockTolerance(client);
        if (claims.auth_time + maxAge < now - tolerance) {
            throw OPE('too much time has elapsed since the last End-User authentication', JWT_TIMESTAMP_CHECK, {
                claims,
                now,
                tolerance,
                claim: 'auth_time'
            });
        }
    }
    if (expectedNonce === expectNoNonce) {
        if (claims.nonce !== undefined) {
            throw OPE('unexpected ID Token "nonce" claim value', JWT_CLAIM_COMPARISON, {
                expected: undefined,
                claims,
                claim: 'nonce'
            });
        }
    } else if (claims.nonce !== expectedNonce) {
        throw OPE('unexpected ID Token "nonce" claim value', JWT_CLAIM_COMPARISON, {
            expected: expectedNonce,
            claims,
            claim: 'nonce'
        });
    }
    return result;
}
async function processAuthorizationCodeOAuth2Response(as, client, response, decryptFn, recognizedTokenTypes) {
    const result = await processGenericAccessTokenResponse(as, client, response, undefined, decryptFn, recognizedTokenTypes);
    const claims = getValidatedIdTokenClaims(result);
    if (claims) {
        if (client.default_max_age !== undefined) {
            assertNumber(client.default_max_age, true, '"client.default_max_age"');
            const now = epochTime() + getClockSkew(client);
            const tolerance = getClockTolerance(client);
            if (claims.auth_time + client.default_max_age < now - tolerance) {
                throw OPE('too much time has elapsed since the last End-User authentication', JWT_TIMESTAMP_CHECK, {
                    claims,
                    now,
                    tolerance,
                    claim: 'auth_time'
                });
            }
        }
        if (claims.nonce !== undefined) {
            throw OPE('unexpected ID Token "nonce" claim value', JWT_CLAIM_COMPARISON, {
                expected: undefined,
                claims,
                claim: 'nonce'
            });
        }
    }
    return result;
}
const WWW_AUTHENTICATE_CHALLENGE = 'OAUTH_WWW_AUTHENTICATE_CHALLENGE';
const RESPONSE_BODY_ERROR = 'OAUTH_RESPONSE_BODY_ERROR';
const UNSUPPORTED_OPERATION = 'OAUTH_UNSUPPORTED_OPERATION';
const AUTHORIZATION_RESPONSE_ERROR = 'OAUTH_AUTHORIZATION_RESPONSE_ERROR';
const JWT_USERINFO_EXPECTED = 'OAUTH_JWT_USERINFO_EXPECTED';
const PARSE_ERROR = 'OAUTH_PARSE_ERROR';
const INVALID_RESPONSE = 'OAUTH_INVALID_RESPONSE';
const INVALID_REQUEST = 'OAUTH_INVALID_REQUEST';
const RESPONSE_IS_NOT_JSON = 'OAUTH_RESPONSE_IS_NOT_JSON';
const RESPONSE_IS_NOT_CONFORM = 'OAUTH_RESPONSE_IS_NOT_CONFORM';
const HTTP_REQUEST_FORBIDDEN = 'OAUTH_HTTP_REQUEST_FORBIDDEN';
const REQUEST_PROTOCOL_FORBIDDEN = 'OAUTH_REQUEST_PROTOCOL_FORBIDDEN';
const JWT_TIMESTAMP_CHECK = 'OAUTH_JWT_TIMESTAMP_CHECK_FAILED';
const JWT_CLAIM_COMPARISON = 'OAUTH_JWT_CLAIM_COMPARISON_FAILED';
const JSON_ATTRIBUTE_COMPARISON = 'OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED';
const KEY_SELECTION = 'OAUTH_KEY_SELECTION_FAILED';
const MISSING_SERVER_METADATA = 'OAUTH_MISSING_SERVER_METADATA';
const INVALID_SERVER_METADATA = 'OAUTH_INVALID_SERVER_METADATA';
function checkJwtType(expected, result) {
    if (typeof result.header.typ !== 'string' || normalizeTyp(result.header.typ) !== expected) {
        throw OPE('unexpected JWT "typ" header parameter value', INVALID_RESPONSE, {
            header: result.header
        });
    }
    return result;
}
async function clientCredentialsGrantRequest(as, client, clientAuthentication, parameters, options) {
    assertAs(as);
    assertClient(client);
    return tokenEndpointRequest(as, client, clientAuthentication, 'client_credentials', new URLSearchParams(parameters), options);
}
async function genericTokenEndpointRequest(as, client, clientAuthentication, grantType, parameters, options) {
    assertAs(as);
    assertClient(client);
    assertString(grantType, '"grantType"');
    return tokenEndpointRequest(as, client, clientAuthentication, grantType, new URLSearchParams(parameters), options);
}
async function processGenericTokenEndpointResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
async function processClientCredentialsResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
async function revocationRequest(as, client, clientAuthentication, token, options) {
    assertAs(as);
    assertClient(client);
    assertString(token, '"token"');
    const url = resolveEndpoint(as, 'revocation_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(options?.additionalParameters);
    body.set('token', token);
    const headers = prepareHeaders(options?.headers);
    headers.delete('accept');
    return authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
}
async function processRevocationResponse(response) {
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 200, 'Revocation Endpoint');
    return undefined;
}
function assertReadableResponse(response) {
    if (response.bodyUsed) {
        throw CodedTypeError('"response" body has been used already', ERR_INVALID_ARG_VALUE);
    }
}
async function introspectionRequest(as, client, clientAuthentication, token, options) {
    assertAs(as);
    assertClient(client);
    assertString(token, '"token"');
    const url = resolveEndpoint(as, 'introspection_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(options?.additionalParameters);
    body.set('token', token);
    const headers = prepareHeaders(options?.headers);
    if (options?.requestJwtResponse ?? client.introspection_signed_response_alg) {
        headers.set('accept', 'application/token-introspection+jwt');
    } else {
        headers.set('accept', 'application/json');
    }
    return authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
}
async function processIntrospectionResponse(as, client, response, options) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 200, 'Introspection Endpoint');
    let json;
    if (getContentType(response) === 'application/token-introspection+jwt') {
        assertReadableResponse(response);
        const { claims, jwt } = await validateJwt(await response.text(), checkSigningAlgorithm.bind(undefined, client.introspection_signed_response_alg, as.introspection_signing_alg_values_supported, 'RS256'), getClockSkew(client), getClockTolerance(client), options?.[jweDecrypt]).then(checkJwtType.bind(undefined, 'token-introspection+jwt')).then(validatePresence.bind(undefined, [
            'aud',
            'iat',
            'iss'
        ])).then(validateIssuer.bind(undefined, as)).then(validateAudience.bind(undefined, client.client_id));
        jwtRefs.set(response, jwt);
        if (!isJsonObject(claims.token_introspection)) {
            throw OPE('JWT "token_introspection" claim must be a JSON object', INVALID_RESPONSE, {
                claims
            });
        }
        json = claims.token_introspection;
    } else {
        assertReadableResponse(response);
        json = await getResponseJsonBody(response);
    }
    if (typeof json.active !== 'boolean') {
        throw OPE('"response" body "active" property must be a boolean', INVALID_RESPONSE, {
            body: json
        });
    }
    return json;
}
async function jwksRequest(as, options) {
    assertAs(as);
    const url = resolveEndpoint(as, 'jwks_uri', false, options?.[allowInsecureRequests] !== true);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    headers.append('accept', 'application/jwk-set+json');
    return (options?.[customFetch] || fetch)(url.href, {
        body: undefined,
        headers: Object.fromEntries(headers.entries()),
        method: 'GET',
        redirect: 'manual',
        signal: signal(url, options?.signal)
    });
}
async function processJwksResponse(response) {
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    if (response.status !== 200) {
        throw OPE('"response" is not a conform JSON Web Key Set response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response, (response)=>assertContentTypes(response, 'application/json', 'application/jwk-set+json'));
    if (!Array.isArray(json.keys)) {
        throw OPE('"response" body "keys" property must be an array', INVALID_RESPONSE, {
            body: json
        });
    }
    if (!Array.prototype.every.call(json.keys, isJsonObject)) {
        throw OPE('"response" body "keys" property members must be JWK formatted objects', INVALID_RESPONSE, {
            body: json
        });
    }
    return json;
}
function supported(alg) {
    switch(alg){
        case 'PS256':
        case 'ES256':
        case 'RS256':
        case 'PS384':
        case 'ES384':
        case 'RS384':
        case 'PS512':
        case 'ES512':
        case 'RS512':
        case 'Ed25519':
        case 'EdDSA':
        case 'ML-DSA-44':
        case 'ML-DSA-65':
        case 'ML-DSA-87':
            return true;
        default:
            return false;
    }
}
function checkSupportedJwsAlg(header) {
    if (!supported(header.alg)) {
        throw new UnsupportedOperationError('unsupported JWS "alg" identifier', {
            cause: {
                alg: header.alg
            }
        });
    }
}
function checkRsaKeyAlgorithm(key) {
    const { algorithm } = key;
    if (typeof algorithm.modulusLength !== 'number' || algorithm.modulusLength < 2048) {
        throw new UnsupportedOperationError(`unsupported ${algorithm.name} modulusLength`, {
            cause: key
        });
    }
}
function ecdsaHashName(key) {
    const { algorithm } = key;
    switch(algorithm.namedCurve){
        case 'P-256':
            return 'SHA-256';
        case 'P-384':
            return 'SHA-384';
        case 'P-521':
            return 'SHA-512';
        default:
            throw new UnsupportedOperationError('unsupported ECDSA namedCurve', {
                cause: key
            });
    }
}
function keyToSubtle(key) {
    switch(key.algorithm.name){
        case 'ECDSA':
            return {
                name: key.algorithm.name,
                hash: ecdsaHashName(key)
            };
        case 'RSA-PSS':
            {
                checkRsaKeyAlgorithm(key);
                switch(key.algorithm.hash.name){
                    case 'SHA-256':
                    case 'SHA-384':
                    case 'SHA-512':
                        return {
                            name: key.algorithm.name,
                            saltLength: parseInt(key.algorithm.hash.name.slice(-3), 10) >> 3
                        };
                    default:
                        throw new UnsupportedOperationError('unsupported RSA-PSS hash name', {
                            cause: key
                        });
                }
            }
        case 'RSASSA-PKCS1-v1_5':
            checkRsaKeyAlgorithm(key);
            return key.algorithm.name;
        case 'ML-DSA-44':
        case 'ML-DSA-65':
        case 'ML-DSA-87':
        case 'Ed25519':
            return key.algorithm.name;
    }
    throw new UnsupportedOperationError('unsupported CryptoKey algorithm name', {
        cause: key
    });
}
async function validateJwsSignature(protectedHeader, payload, key, signature) {
    const data = buf(`${protectedHeader}.${payload}`);
    const algorithm = keyToSubtle(key);
    const verified = await crypto.subtle.verify(algorithm, key, signature, data);
    if (!verified) {
        throw OPE('JWT signature verification failed', INVALID_RESPONSE, {
            key,
            data,
            signature,
            algorithm
        });
    }
}
async function validateJwt(jws, checkAlg, clockSkew, clockTolerance, decryptJwt) {
    let { 0: protectedHeader, 1: payload, length } = jws.split('.');
    if (length === 5) {
        if (decryptJwt !== undefined) {
            jws = await decryptJwt(jws);
            ({ 0: protectedHeader, 1: payload, length } = jws.split('.'));
        } else {
            throw new UnsupportedOperationError('JWE decryption is not configured', {
                cause: jws
            });
        }
    }
    if (length !== 3) {
        throw OPE('Invalid JWT', INVALID_RESPONSE, jws);
    }
    let header;
    try {
        header = JSON.parse(buf(b64u(protectedHeader)));
    } catch (cause) {
        throw OPE('failed to parse JWT Header body as base64url encoded JSON', PARSE_ERROR, cause);
    }
    if (!isJsonObject(header)) {
        throw OPE('JWT Header must be a top level object', INVALID_RESPONSE, jws);
    }
    checkAlg(header);
    if (header.crit !== undefined) {
        throw new UnsupportedOperationError('no JWT "crit" header parameter extensions are supported', {
            cause: {
                header
            }
        });
    }
    let claims;
    try {
        claims = JSON.parse(buf(b64u(payload)));
    } catch (cause) {
        throw OPE('failed to parse JWT Payload body as base64url encoded JSON', PARSE_ERROR, cause);
    }
    if (!isJsonObject(claims)) {
        throw OPE('JWT Payload must be a top level object', INVALID_RESPONSE, jws);
    }
    const now = epochTime() + clockSkew;
    if (claims.exp !== undefined) {
        if (typeof claims.exp !== 'number') {
            throw OPE('unexpected JWT "exp" (expiration time) claim type', INVALID_RESPONSE, {
                claims
            });
        }
        if (claims.exp <= now - clockTolerance) {
            throw OPE('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', JWT_TIMESTAMP_CHECK, {
                claims,
                now,
                tolerance: clockTolerance,
                claim: 'exp'
            });
        }
    }
    if (claims.iat !== undefined) {
        if (typeof claims.iat !== 'number') {
            throw OPE('unexpected JWT "iat" (issued at) claim type', INVALID_RESPONSE, {
                claims
            });
        }
    }
    if (claims.iss !== undefined) {
        if (typeof claims.iss !== 'string') {
            throw OPE('unexpected JWT "iss" (issuer) claim type', INVALID_RESPONSE, {
                claims
            });
        }
    }
    if (claims.nbf !== undefined) {
        if (typeof claims.nbf !== 'number') {
            throw OPE('unexpected JWT "nbf" (not before) claim type', INVALID_RESPONSE, {
                claims
            });
        }
        if (claims.nbf > now + clockTolerance) {
            throw OPE('unexpected JWT "nbf" (not before) claim value', JWT_TIMESTAMP_CHECK, {
                claims,
                now,
                tolerance: clockTolerance,
                claim: 'nbf'
            });
        }
    }
    if (claims.aud !== undefined) {
        if (typeof claims.aud !== 'string' && !Array.isArray(claims.aud)) {
            throw OPE('unexpected JWT "aud" (audience) claim type', INVALID_RESPONSE, {
                claims
            });
        }
    }
    return {
        header,
        claims,
        jwt: jws
    };
}
async function validateJwtAuthResponse(as, client, parameters, expectedState, options) {
    assertAs(as);
    assertClient(client);
    if (parameters instanceof URL) {
        parameters = parameters.searchParams;
    }
    if (!(parameters instanceof URLSearchParams)) {
        throw CodedTypeError('"parameters" must be an instance of URLSearchParams, or URL', ERR_INVALID_ARG_TYPE);
    }
    const response = getURLSearchParameter(parameters, 'response');
    if (!response) {
        throw OPE('"parameters" does not contain a JARM response', INVALID_RESPONSE);
    }
    const { claims, header, jwt } = await validateJwt(response, checkSigningAlgorithm.bind(undefined, client.authorization_signed_response_alg, as.authorization_signing_alg_values_supported, 'RS256'), getClockSkew(client), getClockTolerance(client), options?.[jweDecrypt]).then(validatePresence.bind(undefined, [
        'aud',
        'exp',
        'iss'
    ])).then(validateIssuer.bind(undefined, as)).then(validateAudience.bind(undefined, client.client_id));
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = jwt.split('.');
    const signature = b64u(encodedSignature);
    const key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, signature);
    const result = new URLSearchParams();
    for (const [key, value] of Object.entries(claims)){
        if (typeof value === 'string' && key !== 'aud') {
            result.set(key, value);
        }
    }
    return validateAuthResponse(as, client, result, expectedState);
}
async function idTokenHash(data, header, claimName) {
    let algorithm;
    switch(header.alg){
        case 'RS256':
        case 'PS256':
        case 'ES256':
            algorithm = 'SHA-256';
            break;
        case 'RS384':
        case 'PS384':
        case 'ES384':
            algorithm = 'SHA-384';
            break;
        case 'RS512':
        case 'PS512':
        case 'ES512':
        case 'Ed25519':
        case 'EdDSA':
            algorithm = 'SHA-512';
            break;
        case 'ML-DSA-44':
        case 'ML-DSA-65':
        case 'ML-DSA-87':
            algorithm = {
                name: 'cSHAKE256',
                length: 512
            };
            break;
        default:
            throw new UnsupportedOperationError(`unsupported JWS algorithm for ${claimName} calculation`, {
                cause: {
                    alg: header.alg
                }
            });
    }
    const digest = await crypto.subtle.digest(algorithm, buf(data));
    return b64u(digest.slice(0, digest.byteLength / 2));
}
async function idTokenHashMatches(data, actual, header, claimName) {
    const expected = await idTokenHash(data, header, claimName);
    return actual === expected;
}
async function validateDetachedSignatureResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options) {
    return validateHybridResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options, true);
}
async function validateCodeIdTokenResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options) {
    return validateHybridResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options, false);
}
async function consumeStream(request) {
    if (request.bodyUsed) {
        throw CodedTypeError('form_post Request instances must contain a readable body', ERR_INVALID_ARG_VALUE, {
            cause: request
        });
    }
    return request.text();
}
async function formPostResponse(request) {
    if (request.method !== 'POST') {
        throw CodedTypeError('form_post responses are expected to use the POST method', ERR_INVALID_ARG_VALUE, {
            cause: request
        });
    }
    if (getContentType(request) !== 'application/x-www-form-urlencoded') {
        throw CodedTypeError('form_post responses are expected to use the application/x-www-form-urlencoded content-type', ERR_INVALID_ARG_VALUE, {
            cause: request
        });
    }
    return consumeStream(request);
}
async function validateHybridResponse(as, client, parameters, expectedNonce, expectedState, maxAge, options, fapi) {
    assertAs(as);
    assertClient(client);
    if (parameters instanceof URL) {
        if (!parameters.hash.length) {
            throw CodedTypeError('"parameters" as an instance of URL must contain a hash (fragment) with the Authorization Response parameters', ERR_INVALID_ARG_VALUE);
        }
        parameters = new URLSearchParams(parameters.hash.slice(1));
    } else if (looseInstanceOf(parameters, Request)) {
        parameters = new URLSearchParams(await formPostResponse(parameters));
    } else if (parameters instanceof URLSearchParams) {
        parameters = new URLSearchParams(parameters);
    } else {
        throw CodedTypeError('"parameters" must be an instance of URLSearchParams, URL, or Response', ERR_INVALID_ARG_TYPE);
    }
    const id_token = getURLSearchParameter(parameters, 'id_token');
    parameters.delete('id_token');
    switch(expectedState){
        case undefined:
        case expectNoState:
            break;
        default:
            assertString(expectedState, '"expectedState" argument');
    }
    const result = validateAuthResponse({
        ...as,
        authorization_response_iss_parameter_supported: false
    }, client, parameters, expectedState);
    if (!id_token) {
        throw OPE('"parameters" does not contain an ID Token', INVALID_RESPONSE);
    }
    const code = getURLSearchParameter(parameters, 'code');
    if (!code) {
        throw OPE('"parameters" does not contain an Authorization Code', INVALID_RESPONSE);
    }
    const requiredClaims = [
        'aud',
        'exp',
        'iat',
        'iss',
        'sub',
        'nonce',
        'c_hash'
    ];
    const state = parameters.get('state');
    if (fapi && (typeof expectedState === 'string' || state !== null)) {
        requiredClaims.push('s_hash');
    }
    if (maxAge !== undefined) {
        assertNumber(maxAge, true, '"maxAge" argument');
    } else if (client.default_max_age !== undefined) {
        assertNumber(client.default_max_age, true, '"client.default_max_age"');
    }
    maxAge ??= client.default_max_age ?? skipAuthTimeCheck;
    if (client.require_auth_time || maxAge !== skipAuthTimeCheck) {
        requiredClaims.push('auth_time');
    }
    const { claims, header, jwt } = await validateJwt(id_token, checkSigningAlgorithm.bind(undefined, client.id_token_signed_response_alg, as.id_token_signing_alg_values_supported, 'RS256'), getClockSkew(client), getClockTolerance(client), options?.[jweDecrypt]).then(validatePresence.bind(undefined, requiredClaims)).then(validateIssuer.bind(undefined, as)).then(validateAudience.bind(undefined, client.client_id));
    const clockSkew = getClockSkew(client);
    const now = epochTime() + clockSkew;
    if (claims.iat < now - 3600) {
        throw OPE('unexpected JWT "iat" (issued at) claim value, it is too far in the past', JWT_TIMESTAMP_CHECK, {
            now,
            claims,
            claim: 'iat'
        });
    }
    assertString(claims.c_hash, 'ID Token "c_hash" (code hash) claim value', INVALID_RESPONSE, {
        claims
    });
    if (claims.auth_time !== undefined) {
        assertNumber(claims.auth_time, true, 'ID Token "auth_time" (authentication time)', INVALID_RESPONSE, {
            claims
        });
    }
    if (maxAge !== skipAuthTimeCheck) {
        const now = epochTime() + getClockSkew(client);
        const tolerance = getClockTolerance(client);
        if (claims.auth_time + maxAge < now - tolerance) {
            throw OPE('too much time has elapsed since the last End-User authentication', JWT_TIMESTAMP_CHECK, {
                claims,
                now,
                tolerance,
                claim: 'auth_time'
            });
        }
    }
    assertString(expectedNonce, '"expectedNonce" argument');
    if (claims.nonce !== expectedNonce) {
        throw OPE('unexpected ID Token "nonce" claim value', JWT_CLAIM_COMPARISON, {
            expected: expectedNonce,
            claims,
            claim: 'nonce'
        });
    }
    if (Array.isArray(claims.aud) && claims.aud.length !== 1) {
        if (claims.azp === undefined) {
            throw OPE('ID Token "aud" (audience) claim includes additional untrusted audiences', JWT_CLAIM_COMPARISON, {
                claims,
                claim: 'aud'
            });
        }
        if (claims.azp !== client.client_id) {
            throw OPE('unexpected ID Token "azp" (authorized party) claim value', JWT_CLAIM_COMPARISON, {
                expected: client.client_id,
                claims,
                claim: 'azp'
            });
        }
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = jwt.split('.');
    const signature = b64u(encodedSignature);
    const key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, signature);
    if (await idTokenHashMatches(code, claims.c_hash, header, 'c_hash') !== true) {
        throw OPE('invalid ID Token "c_hash" (code hash) claim value', JWT_CLAIM_COMPARISON, {
            code,
            alg: header.alg,
            claim: 'c_hash',
            claims
        });
    }
    if (fapi && state !== null || claims.s_hash !== undefined) {
        assertString(claims.s_hash, 'ID Token "s_hash" (state hash) claim value', INVALID_RESPONSE, {
            claims
        });
        assertString(state, '"state" response parameter', INVALID_RESPONSE, {
            parameters
        });
        if (await idTokenHashMatches(state, claims.s_hash, header, 's_hash') !== true) {
            throw OPE('invalid ID Token "s_hash" (state hash) claim value', JWT_CLAIM_COMPARISON, {
                state,
                alg: header.alg,
                claim: 's_hash',
                claims
            });
        }
    }
    return result;
}
function checkSigningAlgorithm(client, issuer, fallback, header) {
    if (client !== undefined) {
        if (typeof client === 'string' ? header.alg !== client : !client.includes(header.alg)) {
            throw OPE('unexpected JWT "alg" header parameter', INVALID_RESPONSE, {
                header,
                expected: client,
                reason: 'client configuration'
            });
        }
        return;
    }
    if (Array.isArray(issuer)) {
        if (!issuer.includes(header.alg)) {
            throw OPE('unexpected JWT "alg" header parameter', INVALID_RESPONSE, {
                header,
                expected: issuer,
                reason: 'authorization server metadata'
            });
        }
        return;
    }
    if (fallback !== undefined) {
        if (typeof fallback === 'string' ? header.alg !== fallback : typeof fallback === 'function' ? !fallback(header.alg) : !fallback.includes(header.alg)) {
            throw OPE('unexpected JWT "alg" header parameter', INVALID_RESPONSE, {
                header,
                expected: fallback,
                reason: 'default value'
            });
        }
        return;
    }
    throw OPE('missing client or server configuration to verify used JWT "alg" header parameter', undefined, {
        client,
        issuer,
        fallback
    });
}
function getURLSearchParameter(parameters, name) {
    const { 0: value, length } = parameters.getAll(name);
    if (length > 1) {
        throw OPE(`"${name}" parameter must be provided only once`, INVALID_RESPONSE);
    }
    return value;
}
const skipStateCheck = Symbol();
const expectNoState = Symbol();
function validateAuthResponse(as, client, parameters, expectedState) {
    assertAs(as);
    assertClient(client);
    if (parameters instanceof URL) {
        parameters = parameters.searchParams;
    }
    if (!(parameters instanceof URLSearchParams)) {
        throw CodedTypeError('"parameters" must be an instance of URLSearchParams, or URL', ERR_INVALID_ARG_TYPE);
    }
    if (getURLSearchParameter(parameters, 'response')) {
        throw OPE('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', INVALID_RESPONSE, {
            parameters
        });
    }
    const iss = getURLSearchParameter(parameters, 'iss');
    const state = getURLSearchParameter(parameters, 'state');
    if (!iss && as.authorization_response_iss_parameter_supported) {
        throw OPE('response parameter "iss" (issuer) missing', INVALID_RESPONSE, {
            parameters
        });
    }
    if (iss && iss !== as.issuer) {
        throw OPE('unexpected "iss" (issuer) response parameter value', INVALID_RESPONSE, {
            expected: as.issuer,
            parameters
        });
    }
    switch(expectedState){
        case undefined:
        case expectNoState:
            if (state !== undefined) {
                throw OPE('unexpected "state" response parameter encountered', INVALID_RESPONSE, {
                    expected: undefined,
                    parameters
                });
            }
            break;
        case skipStateCheck:
            break;
        default:
            assertString(expectedState, '"expectedState" argument');
            if (state !== expectedState) {
                throw OPE(state === undefined ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', INVALID_RESPONSE, {
                    expected: expectedState,
                    parameters
                });
            }
    }
    const error = getURLSearchParameter(parameters, 'error');
    if (error) {
        throw new AuthorizationResponseError('authorization response from the server is an error', {
            cause: parameters
        });
    }
    const id_token = getURLSearchParameter(parameters, 'id_token');
    const token = getURLSearchParameter(parameters, 'token');
    if (id_token !== undefined || token !== undefined) {
        throw new UnsupportedOperationError('implicit and hybrid flows are not supported');
    }
    return brand(new URLSearchParams(parameters));
}
function algToSubtle(alg) {
    switch(alg){
        case 'PS256':
        case 'PS384':
        case 'PS512':
            return {
                name: 'RSA-PSS',
                hash: `SHA-${alg.slice(-3)}`
            };
        case 'RS256':
        case 'RS384':
        case 'RS512':
            return {
                name: 'RSASSA-PKCS1-v1_5',
                hash: `SHA-${alg.slice(-3)}`
            };
        case 'ES256':
        case 'ES384':
            return {
                name: 'ECDSA',
                namedCurve: `P-${alg.slice(-3)}`
            };
        case 'ES512':
            return {
                name: 'ECDSA',
                namedCurve: 'P-521'
            };
        case 'EdDSA':
            return 'Ed25519';
        case 'Ed25519':
        case 'ML-DSA-44':
        case 'ML-DSA-65':
        case 'ML-DSA-87':
            return alg;
        default:
            throw new UnsupportedOperationError('unsupported JWS algorithm', {
                cause: {
                    alg
                }
            });
    }
}
async function importJwk(alg, jwk) {
    const { ext, key_ops, use, ...key } = jwk;
    return crypto.subtle.importKey('jwk', key, algToSubtle(alg), true, [
        'verify'
    ]);
}
async function deviceAuthorizationRequest(as, client, clientAuthentication, parameters, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, 'device_authorization_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(parameters);
    body.set('client_id', client.client_id);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    return authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
}
async function processDeviceAuthorizationResponse(as, client, response) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 200, 'Device Authorization Endpoint');
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.device_code, '"response" body "device_code" property', INVALID_RESPONSE, {
        body: json
    });
    assertString(json.user_code, '"response" body "user_code" property', INVALID_RESPONSE, {
        body: json
    });
    assertString(json.verification_uri, '"response" body "verification_uri" property', INVALID_RESPONSE, {
        body: json
    });
    let expiresIn = typeof json.expires_in !== 'number' ? parseFloat(json.expires_in) : json.expires_in;
    assertNumber(expiresIn, true, '"response" body "expires_in" property', INVALID_RESPONSE, {
        body: json
    });
    json.expires_in = expiresIn;
    if (json.verification_uri_complete !== undefined) {
        assertString(json.verification_uri_complete, '"response" body "verification_uri_complete" property', INVALID_RESPONSE, {
            body: json
        });
    }
    if (json.interval !== undefined) {
        assertNumber(json.interval, false, '"response" body "interval" property', INVALID_RESPONSE, {
            body: json
        });
    }
    return json;
}
async function deviceCodeGrantRequest(as, client, clientAuthentication, deviceCode, options) {
    assertAs(as);
    assertClient(client);
    assertString(deviceCode, '"deviceCode"');
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set('device_code', deviceCode);
    return tokenEndpointRequest(as, client, clientAuthentication, 'urn:ietf:params:oauth:grant-type:device_code', parameters, options);
}
async function processDeviceCodeResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
async function generateKeyPair(alg, options) {
    assertString(alg, '"alg"');
    const algorithm = algToSubtle(alg);
    if (alg.startsWith('PS') || alg.startsWith('RS')) {
        Object.assign(algorithm, {
            modulusLength: options?.modulusLength ?? 2048,
            publicExponent: new Uint8Array([
                0x01,
                0x00,
                0x01
            ])
        });
    }
    return crypto.subtle.generateKey(algorithm, options?.extractable ?? false, [
        'sign',
        'verify'
    ]);
}
function normalizeHtu(htu) {
    const url = new URL(htu);
    url.search = '';
    url.hash = '';
    return url.href;
}
async function validateDPoP(request, accessToken, accessTokenClaims, options) {
    const headerValue = request.headers.get('dpop');
    if (headerValue === null) {
        throw OPE('operation indicated DPoP use but the request has no DPoP HTTP Header', INVALID_REQUEST, {
            headers: request.headers
        });
    }
    if (request.headers.get('authorization')?.toLowerCase().startsWith('dpop ') === false) {
        throw OPE(`operation indicated DPoP use but the request's Authorization HTTP Header scheme is not DPoP`, INVALID_REQUEST, {
            headers: request.headers
        });
    }
    if (typeof accessTokenClaims.cnf?.jkt !== 'string') {
        throw OPE('operation indicated DPoP use but the JWT Access Token has no jkt confirmation claim', INVALID_REQUEST, {
            claims: accessTokenClaims
        });
    }
    const clockSkew = getClockSkew(options);
    const proof = await validateJwt(headerValue, checkSigningAlgorithm.bind(undefined, options?.signingAlgorithms, undefined, supported), clockSkew, getClockTolerance(options), undefined).then(checkJwtType.bind(undefined, 'dpop+jwt')).then(validatePresence.bind(undefined, [
        'iat',
        'jti',
        'ath',
        'htm',
        'htu'
    ]));
    const now = epochTime() + clockSkew;
    const diff = Math.abs(now - proof.claims.iat);
    if (diff > 300) {
        throw OPE('DPoP Proof iat is not recent enough', JWT_TIMESTAMP_CHECK, {
            now,
            claims: proof.claims,
            claim: 'iat'
        });
    }
    if (proof.claims.htm !== request.method) {
        throw OPE('DPoP Proof htm mismatch', JWT_CLAIM_COMPARISON, {
            expected: request.method,
            claims: proof.claims,
            claim: 'htm'
        });
    }
    if (typeof proof.claims.htu !== 'string' || normalizeHtu(proof.claims.htu) !== normalizeHtu(request.url)) {
        throw OPE('DPoP Proof htu mismatch', JWT_CLAIM_COMPARISON, {
            expected: normalizeHtu(request.url),
            claims: proof.claims,
            claim: 'htu'
        });
    }
    {
        const expected = b64u(await crypto.subtle.digest('SHA-256', buf(accessToken)));
        if (proof.claims.ath !== expected) {
            throw OPE('DPoP Proof ath mismatch', JWT_CLAIM_COMPARISON, {
                expected,
                claims: proof.claims,
                claim: 'ath'
            });
        }
    }
    {
        const expected = await calculateJwkThumbprint(proof.header.jwk);
        if (accessTokenClaims.cnf.jkt !== expected) {
            throw OPE('JWT Access Token confirmation mismatch', JWT_CLAIM_COMPARISON, {
                expected,
                claims: accessTokenClaims,
                claim: 'cnf.jkt'
            });
        }
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = headerValue.split('.');
    const signature = b64u(encodedSignature);
    const { jwk, alg } = proof.header;
    if (!jwk) {
        throw OPE('DPoP Proof is missing the jwk header parameter', INVALID_REQUEST, {
            header: proof.header
        });
    }
    const key = await importJwk(alg, jwk);
    if (key.type !== 'public') {
        throw OPE('DPoP Proof jwk header parameter must contain a public key', INVALID_REQUEST, {
            header: proof.header
        });
    }
    await validateJwsSignature(protectedHeader, payload, key, signature);
}
async function validateJwtAccessToken(as, request, expectedAudience, options) {
    assertAs(as);
    if (!looseInstanceOf(request, Request)) {
        throw CodedTypeError('"request" must be an instance of Request', ERR_INVALID_ARG_TYPE);
    }
    assertString(expectedAudience, '"expectedAudience"');
    const authorization = request.headers.get('authorization');
    if (authorization === null) {
        throw OPE('"request" is missing an Authorization HTTP Header', INVALID_REQUEST, {
            headers: request.headers
        });
    }
    let { 0: scheme, 1: accessToken, length } = authorization.split(' ');
    scheme = scheme.toLowerCase();
    switch(scheme){
        case 'dpop':
        case 'bearer':
            break;
        default:
            throw new UnsupportedOperationError('unsupported Authorization HTTP Header scheme', {
                cause: {
                    headers: request.headers
                }
            });
    }
    if (length !== 2) {
        throw OPE('invalid Authorization HTTP Header format', INVALID_REQUEST, {
            headers: request.headers
        });
    }
    const requiredClaims = [
        'iss',
        'exp',
        'aud',
        'sub',
        'iat',
        'jti',
        'client_id'
    ];
    if (options?.requireDPoP || scheme === 'dpop' || request.headers.has('dpop')) {
        requiredClaims.push('cnf');
    }
    const { claims, header } = await validateJwt(accessToken, checkSigningAlgorithm.bind(undefined, options?.signingAlgorithms, undefined, supported), getClockSkew(options), getClockTolerance(options), undefined).then(checkJwtType.bind(undefined, 'at+jwt')).then(validatePresence.bind(undefined, requiredClaims)).then(validateIssuer.bind(undefined, as)).then(validateAudience.bind(undefined, expectedAudience)).catch(reassignRSCode);
    for (const claim of [
        'client_id',
        'jti',
        'sub'
    ]){
        if (typeof claims[claim] !== 'string') {
            throw OPE(`unexpected JWT "${claim}" claim type`, INVALID_REQUEST, {
                claims
            });
        }
    }
    if ('cnf' in claims) {
        if (!isJsonObject(claims.cnf)) {
            throw OPE('unexpected JWT "cnf" (confirmation) claim value', INVALID_REQUEST, {
                claims
            });
        }
        const { 0: cnf, length } = Object.keys(claims.cnf);
        if (length) {
            if (length !== 1) {
                throw new UnsupportedOperationError('multiple confirmation claims are not supported', {
                    cause: {
                        claims
                    }
                });
            }
            if (cnf !== 'jkt') {
                throw new UnsupportedOperationError('unsupported JWT Confirmation method', {
                    cause: {
                        claims
                    }
                });
            }
        }
    }
    const { 0: protectedHeader, 1: payload, 2: encodedSignature } = accessToken.split('.');
    const signature = b64u(encodedSignature);
    const key = await getPublicSigKeyFromIssuerJwksUri(as, options, header);
    await validateJwsSignature(protectedHeader, payload, key, signature);
    if (options?.requireDPoP || scheme === 'dpop' || claims.cnf?.jkt !== undefined || request.headers.has('dpop')) {
        await validateDPoP(request, accessToken, claims, options).catch(reassignRSCode);
    }
    return claims;
}
function reassignRSCode(err) {
    if (err instanceof OperationProcessingError && err?.code === INVALID_REQUEST) {
        err.code = INVALID_RESPONSE;
    }
    throw err;
}
async function backchannelAuthenticationRequest(as, client, clientAuthentication, parameters, options) {
    assertAs(as);
    assertClient(client);
    const url = resolveEndpoint(as, 'backchannel_authentication_endpoint', client.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const body = new URLSearchParams(parameters);
    body.set('client_id', client.client_id);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    return authenticatedRequest(as, client, clientAuthentication, url, body, headers, options);
}
async function processBackchannelAuthenticationResponse(as, client, response) {
    assertAs(as);
    assertClient(client);
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 200, 'Backchannel Authentication Endpoint');
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.auth_req_id, '"response" body "auth_req_id" property', INVALID_RESPONSE, {
        body: json
    });
    let expiresIn = typeof json.expires_in !== 'number' ? parseFloat(json.expires_in) : json.expires_in;
    assertNumber(expiresIn, true, '"response" body "expires_in" property', INVALID_RESPONSE, {
        body: json
    });
    json.expires_in = expiresIn;
    if (json.interval !== undefined) {
        assertNumber(json.interval, false, '"response" body "interval" property', INVALID_RESPONSE, {
            body: json
        });
    }
    return json;
}
async function backchannelAuthenticationGrantRequest(as, client, clientAuthentication, authReqId, options) {
    assertAs(as);
    assertClient(client);
    assertString(authReqId, '"authReqId"');
    const parameters = new URLSearchParams(options?.additionalParameters);
    parameters.set('auth_req_id', authReqId);
    return tokenEndpointRequest(as, client, clientAuthentication, 'urn:openid:params:grant-type:ciba', parameters, options);
}
async function processBackchannelAuthenticationGrantResponse(as, client, response, options) {
    return processGenericAccessTokenResponse(as, client, response, undefined, options?.[jweDecrypt], options?.recognizedTokenTypes);
}
async function dynamicClientRegistrationRequest(as, metadata, options) {
    assertAs(as);
    const url = resolveEndpoint(as, 'registration_endpoint', metadata.use_mtls_endpoint_aliases, options?.[allowInsecureRequests] !== true);
    const headers = prepareHeaders(options?.headers);
    headers.set('accept', 'application/json');
    headers.set('content-type', 'application/json');
    const method = 'POST';
    if (options?.DPoP) {
        assertDPoP(options.DPoP);
        await options.DPoP.addProof(url, headers, method, options.initialAccessToken);
    }
    if (options?.initialAccessToken) {
        headers.set('authorization', `${headers.has('dpop') ? 'DPoP' : 'Bearer'} ${options.initialAccessToken}`);
    }
    const response = await (options?.[customFetch] || fetch)(url.href, {
        body: JSON.stringify(metadata),
        headers: Object.fromEntries(headers.entries()),
        method,
        redirect: 'manual',
        signal: signal(url, options?.signal)
    });
    options?.DPoP?.cacheNonce(response, url);
    return response;
}
async function processDynamicClientRegistrationResponse(response) {
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    await checkOAuthBodyError(response, 201, 'Dynamic Client Registration Endpoint');
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.client_id, '"response" body "client_id" property', INVALID_RESPONSE, {
        body: json
    });
    if (json.client_secret !== undefined) {
        assertString(json.client_secret, '"response" body "client_secret" property', INVALID_RESPONSE, {
            body: json
        });
    }
    if (json.client_secret) {
        assertNumber(json.client_secret_expires_at, true, '"response" body "client_secret_expires_at" property', INVALID_RESPONSE, {
            body: json
        });
    }
    return json;
}
async function resourceDiscoveryRequest(resourceIdentifier, options) {
    return performDiscovery(resourceIdentifier, 'resourceIdentifier', (url)=>{
        prependWellKnown(url, '.well-known/oauth-protected-resource', true);
        return url;
    }, options);
}
async function processResourceDiscoveryResponse(expectedResourceIdentifier, response) {
    const expected = expectedResourceIdentifier;
    if (!(expected instanceof URL) && expected !== _nodiscoverycheck) {
        throw CodedTypeError('"expectedResourceIdentifier" must be an instance of URL', ERR_INVALID_ARG_TYPE);
    }
    if (!looseInstanceOf(response, Response)) {
        throw CodedTypeError('"response" must be an instance of Response', ERR_INVALID_ARG_TYPE);
    }
    if (response.status !== 200) {
        throw OPE('"response" is not a conform Resource Server Metadata response (unexpected HTTP status code)', RESPONSE_IS_NOT_CONFORM, response);
    }
    assertReadableResponse(response);
    const json = await getResponseJsonBody(response);
    assertString(json.resource, '"response" body "resource" property', INVALID_RESPONSE, {
        body: json
    });
    if (expected !== _nodiscoverycheck && new URL(json.resource).href !== expected.href) {
        throw OPE('"response" body "resource" property does not match the expected value', JSON_ATTRIBUTE_COMPARISON, {
            expected: expected.href,
            body: json,
            attribute: 'resource'
        });
    }
    return json;
}
async function getResponseJsonBody(response, check = assertApplicationJson) {
    let json;
    try {
        json = await response.json();
    } catch (cause) {
        check(response);
        throw OPE('failed to parse "response" body as JSON', PARSE_ERROR, cause);
    }
    if (!isJsonObject(json)) {
        throw OPE('"response" body must be a top level object', INVALID_RESPONSE, {
            body: json
        });
    }
    return json;
}
const _nopkce = nopkce;
const _nodiscoverycheck = Symbol();
const _expectedIssuer = Symbol(); //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/next-auth/lib/env.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reqWithEnvURL",
    ()=>reqWithEnvURL,
    "setEnvDefaults",
    ()=>setEnvDefaults
]);
// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/lib/utils/env.js [app-rsc] (ecmascript)");
;
;
function reqWithEnvURL(req) {
    const url = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
    if (!url) return req;
    const { origin: envOrigin } = new URL(url);
    const { href, origin } = req.nextUrl;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextRequest"](href.replace(origin, envOrigin), req);
}
function setEnvDefaults(config) {
    try {
        config.secret ?? (config.secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET);
        const url = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
        if (!url) return;
        const { pathname } = new URL(url);
        if (pathname === "/") return;
        config.basePath || (config.basePath = pathname);
    } catch  {
    // Catching and swallowing potential URL parsing errors, we'll fall
    // back to `/api/auth` below.
    } finally{
        config.basePath || (config.basePath = "/api/auth");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setEnvDefaults"])(process.env, config, true);
    }
}
}),
"[project]/node_modules/next-auth/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initAuth",
    ()=>initAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/lib/utils/env.js [app-rsc] (ecmascript)");
// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/lib/env.js [app-rsc] (ecmascript)");
;
;
;
;
async function getSession(headers, config) {
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createActionURL"])("session", // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get("x-forwarded-proto"), headers, process.env, config);
    const request = new Request(url, {
        headers: {
            cookie: headers.get("cookie") ?? ""
        }
    });
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Auth"])(request, {
        ...config,
        callbacks: {
            ...config.callbacks,
            // Since we are server-side, we don't need to filter out the session data
            // See https://authjs.dev/getting-started/migrating-to-v5#authenticating-server-side
            // TODO: Taint the session data to prevent accidental leakage to the client
            // https://react.dev/reference/react/experimental_taintObjectReference
            async session (...args) {
                const session = // If the user defined a custom session callback, use that instead
                await config.callbacks?.session?.(...args) ?? {
                    ...args[0].session,
                    expires: args[0].session.expires?.toISOString?.() ?? args[0].session.expires
                };
                const user = args[0].user ?? args[0].token;
                return {
                    user,
                    ...session
                };
            }
        }
    });
}
function isReqWrapper(arg) {
    return typeof arg === "function";
}
function initAuth(config, onLazyLoad // To set the default env vars
) {
    if (typeof config === "function") {
        return async (...args)=>{
            if (!args.length) {
                // React Server Components
                const _headers = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
                const _config = await config(undefined); // Review: Should we pass headers() here instead?
                onLazyLoad?.(_config);
                return getSession(_headers, _config).then((r)=>r.json());
            }
            if (args[0] instanceof Request) {
                // middleware.ts inline
                // export { auth as default } from "auth"
                const req = args[0];
                const ev = args[1];
                const _config = await config(req);
                onLazyLoad?.(_config);
                // args[0] is supposed to be NextRequest but the instanceof check is failing.
                return handleAuth([
                    req,
                    ev
                ], _config);
            }
            if (isReqWrapper(args[0])) {
                // middleware.ts wrapper/route.ts
                // import { auth } from "auth"
                // export default auth((req) => { console.log(req.auth) }})
                const userMiddlewareOrRoute = args[0];
                return async (...args)=>{
                    const _config = await config(args[0]);
                    onLazyLoad?.(_config);
                    return handleAuth(args, _config, userMiddlewareOrRoute);
                };
            }
            // API Routes, getServerSideProps
            const request = "req" in args[0] ? args[0].req : args[0];
            const response = "res" in args[0] ? args[0].res : args[1];
            const _config = await config(request);
            onLazyLoad?.(_config);
            // @ts-expect-error -- request is NextRequest
            return getSession(new Headers(request.headers), _config).then(async (authResponse)=>{
                const auth = await authResponse.json();
                for (const cookie of authResponse.headers.getSetCookie())if ("headers" in response) response.headers.append("set-cookie", cookie);
                else response.appendHeader("set-cookie", cookie);
                return auth;
            });
        };
    }
    return (...args)=>{
        if (!args.length) {
            // React Server Components
            return Promise.resolve((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])()).then((h)=>getSession(h, config).then((r)=>r.json()));
        }
        if (args[0] instanceof Request) {
            // middleware.ts inline
            // export { auth as default } from "auth"
            const req = args[0];
            const ev = args[1];
            return handleAuth([
                req,
                ev
            ], config);
        }
        if (isReqWrapper(args[0])) {
            // middleware.ts wrapper/route.ts
            // import { auth } from "auth"
            // export default auth((req) => { console.log(req.auth) }})
            const userMiddlewareOrRoute = args[0];
            return async (...args)=>{
                return handleAuth(args, config, userMiddlewareOrRoute).then((res)=>{
                    return res;
                });
            };
        }
        // API Routes, getServerSideProps
        const request = "req" in args[0] ? args[0].req : args[0];
        const response = "res" in args[0] ? args[0].res : args[1];
        return getSession(// @ts-expect-error
        new Headers(request.headers), config).then(async (authResponse)=>{
            const auth = await authResponse.json();
            for (const cookie of authResponse.headers.getSetCookie())if ("headers" in response) response.headers.append("set-cookie", cookie);
            else response.appendHeader("set-cookie", cookie);
            return auth;
        });
    };
}
async function handleAuth(args, config, userMiddlewareOrRoute) {
    const request = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["reqWithEnvURL"])(args[0]);
    const sessionResponse = await getSession(request.headers, config);
    const auth = await sessionResponse.json();
    let authorized = true;
    if (config.callbacks?.authorized) {
        authorized = await config.callbacks.authorized({
            request,
            auth
        });
    }
    let response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].next?.();
    if (authorized instanceof Response) {
        // User returned a custom response, like redirecting to a page or 401, respect it
        response = authorized;
        const redirect = authorized.headers.get("Location");
        const { pathname } = request.nextUrl;
        // If the user is redirecting to the same NextAuth.js action path as the current request,
        // don't allow the redirect to prevent an infinite loop
        if (redirect && isSameAuthAction(pathname, new URL(redirect).pathname, config)) {
            authorized = true;
        }
    } else if (userMiddlewareOrRoute) {
        // Execute user's middleware/handler with the augmented request
        const augmentedReq = request;
        augmentedReq.auth = auth;
        response = await userMiddlewareOrRoute(augmentedReq, args[1]) ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].next();
    } else if (!authorized) {
        const signInPage = config.pages?.signIn ?? `${config.basePath}/signin`;
        if (request.nextUrl.pathname !== signInPage) {
            // Redirect to signin page by default if not authorized
            const signInUrl = request.nextUrl.clone();
            signInUrl.pathname = signInPage;
            signInUrl.searchParams.set("callbackUrl", request.nextUrl.href);
            response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NextResponse"].redirect(signInUrl);
        }
    }
    const finalResponse = new Response(response?.body, response);
    // Preserve cookies from the session response
    for (const cookie of sessionResponse.headers.getSetCookie())finalResponse.headers.append("set-cookie", cookie);
    return finalResponse;
}
function isSameAuthAction(requestPath, redirectPath, config) {
    const action = redirectPath.replace(`${requestPath}/`, "");
    const pages = Object.values(config.pages ?? {});
    return (actions.has(action) || pages.includes(redirectPath)) && redirectPath === requestPath;
}
const actions = new Set([
    "providers",
    "session",
    "csrf",
    "signin",
    "signout",
    "callback",
    "verify-request",
    "error"
]);
}),
"[project]/node_modules/next-auth/lib/actions.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "signIn",
    ()=>signIn,
    "signOut",
    ()=>signOut,
    "update",
    ()=>update
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/lib/symbols.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/lib/utils/env.js [app-rsc] (ecmascript)");
// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
// @ts-expect-error Next.js does not yet correctly use the `package.json#exports` field
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
async function signIn(provider, options = {}, authorizationParams, config) {
    const headers = new Headers(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])());
    const { redirect: shouldRedirect = true, redirectTo, ...rest } = options instanceof FormData ? Object.fromEntries(options) : options;
    const callbackUrl = redirectTo?.toString() ?? headers.get("Referer") ?? "/";
    const signInURL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createActionURL"])("signin", // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get("x-forwarded-proto"), headers, process.env, config);
    if (!provider) {
        signInURL.searchParams.append("callbackUrl", callbackUrl);
        if (shouldRedirect) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(signInURL.toString());
        return signInURL.toString();
    }
    let url = `${signInURL}/${provider}?${new URLSearchParams(authorizationParams)}`;
    let foundProvider = {};
    for (const providerConfig of config.providers){
        const { options, ...defaults } = typeof providerConfig === "function" ? providerConfig() : providerConfig;
        const id = options?.id ?? defaults.id;
        if (id === provider) {
            foundProvider = {
                id,
                type: options?.type ?? defaults.type
            };
            break;
        }
    }
    if (!foundProvider.id) {
        const url = `${signInURL}?${new URLSearchParams({
            callbackUrl
        })}`;
        if (shouldRedirect) (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(url);
        return url;
    }
    if (foundProvider.type === "credentials") {
        url = url.replace("signin", "callback");
    }
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    const body = new URLSearchParams({
        ...rest,
        callbackUrl
    });
    const req = new Request(url, {
        method: "POST",
        headers,
        body
    });
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Auth"])(req, {
        ...config,
        raw: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["raw"],
        skipCSRFCheck: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["skipCSRFCheck"]
    });
    const cookieJar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    for (const c of res?.cookies ?? [])cookieJar.set(c.name, c.value, c.options);
    const responseUrl = res instanceof Response ? res.headers.get("Location") : res.redirect;
    // NOTE: if for some unexpected reason the responseUrl is not set,
    // we redirect to the original url
    const redirectUrl = responseUrl ?? url;
    if (shouldRedirect) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(redirectUrl);
    return redirectUrl;
}
async function signOut(options, config) {
    const headers = new Headers(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])());
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createActionURL"])("signout", // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get("x-forwarded-proto"), headers, process.env, config);
    const callbackUrl = options?.redirectTo ?? headers.get("Referer") ?? "/";
    const body = new URLSearchParams({
        callbackUrl
    });
    const req = new Request(url, {
        method: "POST",
        headers,
        body
    });
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Auth"])(req, {
        ...config,
        raw: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["raw"],
        skipCSRFCheck: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["skipCSRFCheck"]
    });
    const cookieJar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    for (const c of res?.cookies ?? [])cookieJar.set(c.name, c.value, c.options);
    if (options?.redirect ?? true) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(res.redirect);
    return res;
}
async function update(data, config) {
    const headers = new Headers(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])());
    headers.set("Content-Type", "application/json");
    const url = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$utils$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createActionURL"])("session", // @ts-expect-error `x-forwarded-proto` is not nullable, next.js sets it by default
    headers.get("x-forwarded-proto"), headers, process.env, config);
    const body = JSON.stringify({
        data
    });
    const req = new Request(url, {
        method: "POST",
        headers,
        body
    });
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Auth"])(req, {
        ...config,
        raw: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["raw"],
        skipCSRFCheck: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["skipCSRFCheck"]
    });
    const cookieJar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    for (const c of res?.cookies ?? [])cookieJar.set(c.name, c.value, c.options);
    return res.body;
}
}),
"[project]/node_modules/next-auth/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NextAuth
]);
/**
 * _If you are looking to migrate from v4, visit the [Upgrade Guide (v5)](https://authjs.dev/getting-started/migrating-to-v5)._
 *
 * ## Installation
 *
 * ```bash npm2yarn
 * npm install next-auth@beta
 * ```
 *
 * ## Environment variable inference
 *
 * `NEXTAUTH_URL` and `NEXTAUTH_SECRET` have been inferred since v4.
 *
 * Since NextAuth.js v5 can also automatically infer environment variables that are prefixed with `AUTH_`.
 *
 * For example `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` will be used as the `clientId` and `clientSecret` options for the GitHub provider.
 *
 * :::tip
 * The environment variable name inferring has the following format for OAuth providers: `AUTH_{PROVIDER}_{ID|SECRET}`.
 *
 * `PROVIDER` is the uppercase snake case version of the provider's id, followed by either `ID` or `SECRET` respectively.
 * :::
 *
 * `AUTH_SECRET` and `AUTH_URL` are also aliased for `NEXTAUTH_SECRET` and `NEXTAUTH_URL` for consistency.
 *
 * To add social login to your app, the configuration becomes:
 *
 * ```ts title="auth.ts"
 * import NextAuth from "next-auth"
 * import GitHub from "next-auth/providers/github"
 * export const { handlers, auth } = NextAuth({ providers: [ GitHub ] })
 * ```
 *
 * And the `.env.local` file:
 *
 * ```sh title=".env.local"
 * AUTH_GITHUB_ID=...
 * AUTH_GITHUB_SECRET=...
 * AUTH_SECRET=...
 * ```
 *
 * :::tip
 * In production, `AUTH_SECRET` is a required environment variable - if not set, NextAuth.js will throw an error. See [MissingSecretError](https://authjs.dev/reference/core/errors#missingsecret) for more details.
 * :::
 *
 * If you need to override the default values for a provider, you can still call it as a function `GitHub({...})` as before.
 *
 * ## Lazy initialization
 * You can also initialize NextAuth.js lazily (previously known as advanced intialization), which allows you to access the request context in the configuration in some cases, like Route Handlers, Middleware, API Routes or `getServerSideProps`.
 * The above example becomes:
 *
 * ```ts title="auth.ts"
 * import NextAuth from "next-auth"
 * import GitHub from "next-auth/providers/github"
 * export const { handlers, auth } = NextAuth(req => {
 *  if (req) {
 *   console.log(req) // do something with the request
 *  }
 *  return { providers: [ GitHub ] }
 * })
 * ```
 *
 * :::tip
 * This is useful if you want to customize the configuration based on the request, for example, to add a different provider in staging/dev environments.
 * :::
 *
 * @module next-auth
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$lib$2f$symbols$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/lib/symbols.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/lib/env.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/lib/actions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/errors.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
function NextAuth(config) {
    if (typeof config === "function") {
        const httpHandler = async (req)=>{
            const _config = await config(req);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setEnvDefaults"])(_config);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Auth"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["reqWithEnvURL"])(req), _config);
        };
        return {
            handlers: {
                GET: httpHandler,
                POST: httpHandler
            },
            // @ts-expect-error
            auth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initAuth"])(config, (c)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setEnvDefaults"])(c)),
            signIn: async (provider, options, authorizationParams)=>{
                const _config = await config(undefined);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setEnvDefaults"])(_config);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signIn"])(provider, options, authorizationParams, _config);
            },
            signOut: async (options)=>{
                const _config = await config(undefined);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setEnvDefaults"])(_config);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signOut"])(options, _config);
            },
            unstable_update: async (data)=>{
                const _config = await config(undefined);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setEnvDefaults"])(_config);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["update"])(data, _config);
            }
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setEnvDefaults"])(config);
    const httpHandler = (req)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Auth"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$env$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["reqWithEnvURL"])(req), config);
    return {
        handlers: {
            GET: httpHandler,
            POST: httpHandler
        },
        // @ts-expect-error
        auth: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initAuth"])(config),
        signIn: (provider, options, authorizationParams)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signIn"])(provider, options, authorizationParams, config);
        },
        signOut: (options)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signOut"])(options, config);
        },
        unstable_update: (data)=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$lib$2f$actions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["update"])(data, config);
        }
    };
}
}),
"[project]/node_modules/next-auth/providers/credentials.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$core$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth/core/providers/credentials.js [app-rsc] (ecmascript)");
;
;
}),
"[externals]/mongodb [external] (mongodb, cjs, [project]/node_modules/mongodb)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongodb-438b504308ffa4be", () => require("mongodb-438b504308ffa4be"));

module.exports = mod;
}),
"[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compare",
    ()=>compare,
    "compareSync",
    ()=>compareSync,
    "decodeBase64",
    ()=>decodeBase64,
    "default",
    ()=>__TURBOPACK__default__export__,
    "encodeBase64",
    ()=>encodeBase64,
    "genSalt",
    ()=>genSalt,
    "genSaltSync",
    ()=>genSaltSync,
    "getRounds",
    ()=>getRounds,
    "getSalt",
    ()=>getSalt,
    "hash",
    ()=>hash,
    "hashSync",
    ()=>hashSync,
    "setRandomFallback",
    ()=>setRandomFallback,
    "truncates",
    ()=>truncates
]);
/*
 Copyright (c) 2012 Nevins Bartolomeo <nevins.bartolomeo@gmail.com>
 Copyright (c) 2012 Shane Girish <shaneGirish@gmail.com>
 Copyright (c) 2025 Daniel Wirtz <dcode@dcode.io>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions
 are met:
 1. Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 3. The name of the author may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
 IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */ // The Node.js crypto module is used as a fallback for the Web Crypto API. When
// building for the browser, inclusion of the crypto module should be disabled,
// which the package hints at in its package.json for bundlers that support it.
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
/**
 * The random implementation to use as a fallback.
 * @type {?function(number):!Array.<number>}
 * @inner
 */ var randomFallback = null;
/**
 * Generates cryptographically secure random bytes.
 * @function
 * @param {number} len Bytes length
 * @returns {!Array.<number>} Random bytes
 * @throws {Error} If no random implementation is available
 * @inner
 */ function randomBytes(len) {
    // Web Crypto API. Globally available in the browser and in Node.js >=23.
    try {
        return crypto.getRandomValues(new Uint8Array(len));
    } catch  {}
    // Node.js crypto module for non-browser environments.
    try {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(len);
    } catch  {}
    // Custom fallback specified with `setRandomFallback`.
    if (!randomFallback) {
        throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
    }
    return randomFallback(len);
}
function setRandomFallback(random) {
    randomFallback = random;
}
function genSaltSync(rounds, seed_length) {
    rounds = rounds || GENSALT_DEFAULT_LOG2_ROUNDS;
    if (typeof rounds !== "number") throw Error("Illegal arguments: " + typeof rounds + ", " + typeof seed_length);
    if (rounds < 4) rounds = 4;
    else if (rounds > 31) rounds = 31;
    var salt = [];
    salt.push("$2b$");
    if (rounds < 10) salt.push("0");
    salt.push(rounds.toString());
    salt.push("$");
    salt.push(base64_encode(randomBytes(BCRYPT_SALT_LEN), BCRYPT_SALT_LEN)); // May throw
    return salt.join("");
}
function genSalt(rounds, seed_length, callback) {
    if (typeof seed_length === "function") callback = seed_length, seed_length = undefined; // Not supported.
    if (typeof rounds === "function") callback = rounds, rounds = undefined;
    if (typeof rounds === "undefined") rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
    else if (typeof rounds !== "number") throw Error("illegal arguments: " + typeof rounds);
    function _async(callback) {
        nextTick(function() {
            // Pretty thin, but salting is fast enough
            try {
                callback(null, genSaltSync(rounds));
            } catch (err) {
                callback(err);
            }
        });
    }
    if (callback) {
        if (typeof callback !== "function") throw Error("Illegal callback: " + typeof callback);
        _async(callback);
    } else return new Promise(function(resolve, reject) {
        _async(function(err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}
function hashSync(password, salt) {
    if (typeof salt === "undefined") salt = GENSALT_DEFAULT_LOG2_ROUNDS;
    if (typeof salt === "number") salt = genSaltSync(salt);
    if (typeof password !== "string" || typeof salt !== "string") throw Error("Illegal arguments: " + typeof password + ", " + typeof salt);
    return _hash(password, salt);
}
function hash(password, salt, callback, progressCallback) {
    function _async(callback) {
        if (typeof password === "string" && typeof salt === "number") genSalt(salt, function(err, salt) {
            _hash(password, salt, callback, progressCallback);
        });
        else if (typeof password === "string" && typeof salt === "string") _hash(password, salt, callback, progressCallback);
        else nextTick(callback.bind(this, Error("Illegal arguments: " + typeof password + ", " + typeof salt)));
    }
    if (callback) {
        if (typeof callback !== "function") throw Error("Illegal callback: " + typeof callback);
        _async(callback);
    } else return new Promise(function(resolve, reject) {
        _async(function(err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}
/**
 * Compares two strings of the same length in constant time.
 * @param {string} known Must be of the correct length
 * @param {string} unknown Must be the same length as `known`
 * @returns {boolean}
 * @inner
 */ function safeStringCompare(known, unknown) {
    var diff = known.length ^ unknown.length;
    for(var i = 0; i < known.length; ++i){
        diff |= known.charCodeAt(i) ^ unknown.charCodeAt(i);
    }
    return diff === 0;
}
function compareSync(password, hash) {
    if (typeof password !== "string" || typeof hash !== "string") throw Error("Illegal arguments: " + typeof password + ", " + typeof hash);
    if (hash.length !== 60) return false;
    return safeStringCompare(hashSync(password, hash.substring(0, hash.length - 31)), hash);
}
function compare(password, hashValue, callback, progressCallback) {
    function _async(callback) {
        if (typeof password !== "string" || typeof hashValue !== "string") {
            nextTick(callback.bind(this, Error("Illegal arguments: " + typeof password + ", " + typeof hashValue)));
            return;
        }
        if (hashValue.length !== 60) {
            nextTick(callback.bind(this, null, false));
            return;
        }
        hash(password, hashValue.substring(0, 29), function(err, comp) {
            if (err) callback(err);
            else callback(null, safeStringCompare(comp, hashValue));
        }, progressCallback);
    }
    if (callback) {
        if (typeof callback !== "function") throw Error("Illegal callback: " + typeof callback);
        _async(callback);
    } else return new Promise(function(resolve, reject) {
        _async(function(err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}
function getRounds(hash) {
    if (typeof hash !== "string") throw Error("Illegal arguments: " + typeof hash);
    return parseInt(hash.split("$")[2], 10);
}
function getSalt(hash) {
    if (typeof hash !== "string") throw Error("Illegal arguments: " + typeof hash);
    if (hash.length !== 60) throw Error("Illegal hash length: " + hash.length + " != 60");
    return hash.substring(0, 29);
}
function truncates(password) {
    if (typeof password !== "string") throw Error("Illegal arguments: " + typeof password);
    return utf8Length(password) > 72;
}
/**
 * Continues with the callback after yielding to the event loop.
 * @function
 * @param {function(...[*])} callback Callback to execute
 * @inner
 */ var nextTick = typeof setImmediate === "function" ? setImmediate : typeof scheduler === "object" && typeof scheduler.postTask === "function" ? scheduler.postTask.bind(scheduler) : setTimeout;
/** Calculates the byte length of a string encoded as UTF8. */ function utf8Length(string) {
    var len = 0, c = 0;
    for(var i = 0; i < string.length; ++i){
        c = string.charCodeAt(i);
        if (c < 128) len += 1;
        else if (c < 2048) len += 2;
        else if ((c & 0xfc00) === 0xd800 && (string.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
            ++i;
            len += 4;
        } else len += 3;
    }
    return len;
}
/** Converts a string to an array of UTF8 bytes. */ function utf8Array(string) {
    var offset = 0, c1, c2;
    var buffer = new Array(utf8Length(string));
    for(var i = 0, k = string.length; i < k; ++i){
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
            buffer[offset++] = c1;
        } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
        } else if ((c1 & 0xfc00) === 0xd800 && ((c2 = string.charCodeAt(i + 1)) & 0xfc00) === 0xdc00) {
            c1 = 0x10000 + ((c1 & 0x03ff) << 10) + (c2 & 0x03ff);
            ++i;
            buffer[offset++] = c1 >> 18 | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
        } else {
            buffer[offset++] = c1 >> 12 | 224;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
        }
    }
    return buffer;
}
// A base64 implementation for the bcrypt algorithm. This is partly non-standard.
/**
 * bcrypt's own non-standard base64 dictionary.
 * @type {!Array.<string>}
 * @const
 * @inner
 **/ var BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
/**
 * @type {!Array.<number>}
 * @const
 * @inner
 **/ var BASE64_INDEX = [
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    -1,
    -1,
    -1,
    -1,
    -1
];
/**
 * Encodes a byte array to base64 with up to len bytes of input.
 * @param {!Array.<number>} b Byte array
 * @param {number} len Maximum input length
 * @returns {string}
 * @inner
 */ function base64_encode(b, len) {
    var off = 0, rs = [], c1, c2;
    if (len <= 0 || len > b.length) throw Error("Illegal len: " + len);
    while(off < len){
        c1 = b[off++] & 0xff;
        rs.push(BASE64_CODE[c1 >> 2 & 0x3f]);
        c1 = (c1 & 0x03) << 4;
        if (off >= len) {
            rs.push(BASE64_CODE[c1 & 0x3f]);
            break;
        }
        c2 = b[off++] & 0xff;
        c1 |= c2 >> 4 & 0x0f;
        rs.push(BASE64_CODE[c1 & 0x3f]);
        c1 = (c2 & 0x0f) << 2;
        if (off >= len) {
            rs.push(BASE64_CODE[c1 & 0x3f]);
            break;
        }
        c2 = b[off++] & 0xff;
        c1 |= c2 >> 6 & 0x03;
        rs.push(BASE64_CODE[c1 & 0x3f]);
        rs.push(BASE64_CODE[c2 & 0x3f]);
    }
    return rs.join("");
}
/**
 * Decodes a base64 encoded string to up to len bytes of output.
 * @param {string} s String to decode
 * @param {number} len Maximum output length
 * @returns {!Array.<number>}
 * @inner
 */ function base64_decode(s, len) {
    var off = 0, slen = s.length, olen = 0, rs = [], c1, c2, c3, c4, o, code;
    if (len <= 0) throw Error("Illegal len: " + len);
    while(off < slen - 1 && olen < len){
        code = s.charCodeAt(off++);
        c1 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
        code = s.charCodeAt(off++);
        c2 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
        if (c1 == -1 || c2 == -1) break;
        o = c1 << 2 >>> 0;
        o |= (c2 & 0x30) >> 4;
        rs.push(String.fromCharCode(o));
        if (++olen >= len || off >= slen) break;
        code = s.charCodeAt(off++);
        c3 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
        if (c3 == -1) break;
        o = (c2 & 0x0f) << 4 >>> 0;
        o |= (c3 & 0x3c) >> 2;
        rs.push(String.fromCharCode(o));
        if (++olen >= len || off >= slen) break;
        code = s.charCodeAt(off++);
        c4 = code < BASE64_INDEX.length ? BASE64_INDEX[code] : -1;
        o = (c3 & 0x03) << 6 >>> 0;
        o |= c4;
        rs.push(String.fromCharCode(o));
        ++olen;
    }
    var res = [];
    for(off = 0; off < olen; off++)res.push(rs[off].charCodeAt(0));
    return res;
}
/**
 * @type {number}
 * @const
 * @inner
 */ var BCRYPT_SALT_LEN = 16;
/**
 * @type {number}
 * @const
 * @inner
 */ var GENSALT_DEFAULT_LOG2_ROUNDS = 10;
/**
 * @type {number}
 * @const
 * @inner
 */ var BLOWFISH_NUM_ROUNDS = 16;
/**
 * @type {number}
 * @const
 * @inner
 */ var MAX_EXECUTION_TIME = 100;
/**
 * @type {Array.<number>}
 * @const
 * @inner
 */ var P_ORIG = [
    0x243f6a88,
    0x85a308d3,
    0x13198a2e,
    0x03707344,
    0xa4093822,
    0x299f31d0,
    0x082efa98,
    0xec4e6c89,
    0x452821e6,
    0x38d01377,
    0xbe5466cf,
    0x34e90c6c,
    0xc0ac29b7,
    0xc97c50dd,
    0x3f84d5b5,
    0xb5470917,
    0x9216d5d9,
    0x8979fb1b
];
/**
 * @type {Array.<number>}
 * @const
 * @inner
 */ var S_ORIG = [
    0xd1310ba6,
    0x98dfb5ac,
    0x2ffd72db,
    0xd01adfb7,
    0xb8e1afed,
    0x6a267e96,
    0xba7c9045,
    0xf12c7f99,
    0x24a19947,
    0xb3916cf7,
    0x0801f2e2,
    0x858efc16,
    0x636920d8,
    0x71574e69,
    0xa458fea3,
    0xf4933d7e,
    0x0d95748f,
    0x728eb658,
    0x718bcd58,
    0x82154aee,
    0x7b54a41d,
    0xc25a59b5,
    0x9c30d539,
    0x2af26013,
    0xc5d1b023,
    0x286085f0,
    0xca417918,
    0xb8db38ef,
    0x8e79dcb0,
    0x603a180e,
    0x6c9e0e8b,
    0xb01e8a3e,
    0xd71577c1,
    0xbd314b27,
    0x78af2fda,
    0x55605c60,
    0xe65525f3,
    0xaa55ab94,
    0x57489862,
    0x63e81440,
    0x55ca396a,
    0x2aab10b6,
    0xb4cc5c34,
    0x1141e8ce,
    0xa15486af,
    0x7c72e993,
    0xb3ee1411,
    0x636fbc2a,
    0x2ba9c55d,
    0x741831f6,
    0xce5c3e16,
    0x9b87931e,
    0xafd6ba33,
    0x6c24cf5c,
    0x7a325381,
    0x28958677,
    0x3b8f4898,
    0x6b4bb9af,
    0xc4bfe81b,
    0x66282193,
    0x61d809cc,
    0xfb21a991,
    0x487cac60,
    0x5dec8032,
    0xef845d5d,
    0xe98575b1,
    0xdc262302,
    0xeb651b88,
    0x23893e81,
    0xd396acc5,
    0x0f6d6ff3,
    0x83f44239,
    0x2e0b4482,
    0xa4842004,
    0x69c8f04a,
    0x9e1f9b5e,
    0x21c66842,
    0xf6e96c9a,
    0x670c9c61,
    0xabd388f0,
    0x6a51a0d2,
    0xd8542f68,
    0x960fa728,
    0xab5133a3,
    0x6eef0b6c,
    0x137a3be4,
    0xba3bf050,
    0x7efb2a98,
    0xa1f1651d,
    0x39af0176,
    0x66ca593e,
    0x82430e88,
    0x8cee8619,
    0x456f9fb4,
    0x7d84a5c3,
    0x3b8b5ebe,
    0xe06f75d8,
    0x85c12073,
    0x401a449f,
    0x56c16aa6,
    0x4ed3aa62,
    0x363f7706,
    0x1bfedf72,
    0x429b023d,
    0x37d0d724,
    0xd00a1248,
    0xdb0fead3,
    0x49f1c09b,
    0x075372c9,
    0x80991b7b,
    0x25d479d8,
    0xf6e8def7,
    0xe3fe501a,
    0xb6794c3b,
    0x976ce0bd,
    0x04c006ba,
    0xc1a94fb6,
    0x409f60c4,
    0x5e5c9ec2,
    0x196a2463,
    0x68fb6faf,
    0x3e6c53b5,
    0x1339b2eb,
    0x3b52ec6f,
    0x6dfc511f,
    0x9b30952c,
    0xcc814544,
    0xaf5ebd09,
    0xbee3d004,
    0xde334afd,
    0x660f2807,
    0x192e4bb3,
    0xc0cba857,
    0x45c8740f,
    0xd20b5f39,
    0xb9d3fbdb,
    0x5579c0bd,
    0x1a60320a,
    0xd6a100c6,
    0x402c7279,
    0x679f25fe,
    0xfb1fa3cc,
    0x8ea5e9f8,
    0xdb3222f8,
    0x3c7516df,
    0xfd616b15,
    0x2f501ec8,
    0xad0552ab,
    0x323db5fa,
    0xfd238760,
    0x53317b48,
    0x3e00df82,
    0x9e5c57bb,
    0xca6f8ca0,
    0x1a87562e,
    0xdf1769db,
    0xd542a8f6,
    0x287effc3,
    0xac6732c6,
    0x8c4f5573,
    0x695b27b0,
    0xbbca58c8,
    0xe1ffa35d,
    0xb8f011a0,
    0x10fa3d98,
    0xfd2183b8,
    0x4afcb56c,
    0x2dd1d35b,
    0x9a53e479,
    0xb6f84565,
    0xd28e49bc,
    0x4bfb9790,
    0xe1ddf2da,
    0xa4cb7e33,
    0x62fb1341,
    0xcee4c6e8,
    0xef20cada,
    0x36774c01,
    0xd07e9efe,
    0x2bf11fb4,
    0x95dbda4d,
    0xae909198,
    0xeaad8e71,
    0x6b93d5a0,
    0xd08ed1d0,
    0xafc725e0,
    0x8e3c5b2f,
    0x8e7594b7,
    0x8ff6e2fb,
    0xf2122b64,
    0x8888b812,
    0x900df01c,
    0x4fad5ea0,
    0x688fc31c,
    0xd1cff191,
    0xb3a8c1ad,
    0x2f2f2218,
    0xbe0e1777,
    0xea752dfe,
    0x8b021fa1,
    0xe5a0cc0f,
    0xb56f74e8,
    0x18acf3d6,
    0xce89e299,
    0xb4a84fe0,
    0xfd13e0b7,
    0x7cc43b81,
    0xd2ada8d9,
    0x165fa266,
    0x80957705,
    0x93cc7314,
    0x211a1477,
    0xe6ad2065,
    0x77b5fa86,
    0xc75442f5,
    0xfb9d35cf,
    0xebcdaf0c,
    0x7b3e89a0,
    0xd6411bd3,
    0xae1e7e49,
    0x00250e2d,
    0x2071b35e,
    0x226800bb,
    0x57b8e0af,
    0x2464369b,
    0xf009b91e,
    0x5563911d,
    0x59dfa6aa,
    0x78c14389,
    0xd95a537f,
    0x207d5ba2,
    0x02e5b9c5,
    0x83260376,
    0x6295cfa9,
    0x11c81968,
    0x4e734a41,
    0xb3472dca,
    0x7b14a94a,
    0x1b510052,
    0x9a532915,
    0xd60f573f,
    0xbc9bc6e4,
    0x2b60a476,
    0x81e67400,
    0x08ba6fb5,
    0x571be91f,
    0xf296ec6b,
    0x2a0dd915,
    0xb6636521,
    0xe7b9f9b6,
    0xff34052e,
    0xc5855664,
    0x53b02d5d,
    0xa99f8fa1,
    0x08ba4799,
    0x6e85076a,
    0x4b7a70e9,
    0xb5b32944,
    0xdb75092e,
    0xc4192623,
    0xad6ea6b0,
    0x49a7df7d,
    0x9cee60b8,
    0x8fedb266,
    0xecaa8c71,
    0x699a17ff,
    0x5664526c,
    0xc2b19ee1,
    0x193602a5,
    0x75094c29,
    0xa0591340,
    0xe4183a3e,
    0x3f54989a,
    0x5b429d65,
    0x6b8fe4d6,
    0x99f73fd6,
    0xa1d29c07,
    0xefe830f5,
    0x4d2d38e6,
    0xf0255dc1,
    0x4cdd2086,
    0x8470eb26,
    0x6382e9c6,
    0x021ecc5e,
    0x09686b3f,
    0x3ebaefc9,
    0x3c971814,
    0x6b6a70a1,
    0x687f3584,
    0x52a0e286,
    0xb79c5305,
    0xaa500737,
    0x3e07841c,
    0x7fdeae5c,
    0x8e7d44ec,
    0x5716f2b8,
    0xb03ada37,
    0xf0500c0d,
    0xf01c1f04,
    0x0200b3ff,
    0xae0cf51a,
    0x3cb574b2,
    0x25837a58,
    0xdc0921bd,
    0xd19113f9,
    0x7ca92ff6,
    0x94324773,
    0x22f54701,
    0x3ae5e581,
    0x37c2dadc,
    0xc8b57634,
    0x9af3dda7,
    0xa9446146,
    0x0fd0030e,
    0xecc8c73e,
    0xa4751e41,
    0xe238cd99,
    0x3bea0e2f,
    0x3280bba1,
    0x183eb331,
    0x4e548b38,
    0x4f6db908,
    0x6f420d03,
    0xf60a04bf,
    0x2cb81290,
    0x24977c79,
    0x5679b072,
    0xbcaf89af,
    0xde9a771f,
    0xd9930810,
    0xb38bae12,
    0xdccf3f2e,
    0x5512721f,
    0x2e6b7124,
    0x501adde6,
    0x9f84cd87,
    0x7a584718,
    0x7408da17,
    0xbc9f9abc,
    0xe94b7d8c,
    0xec7aec3a,
    0xdb851dfa,
    0x63094366,
    0xc464c3d2,
    0xef1c1847,
    0x3215d908,
    0xdd433b37,
    0x24c2ba16,
    0x12a14d43,
    0x2a65c451,
    0x50940002,
    0x133ae4dd,
    0x71dff89e,
    0x10314e55,
    0x81ac77d6,
    0x5f11199b,
    0x043556f1,
    0xd7a3c76b,
    0x3c11183b,
    0x5924a509,
    0xf28fe6ed,
    0x97f1fbfa,
    0x9ebabf2c,
    0x1e153c6e,
    0x86e34570,
    0xeae96fb1,
    0x860e5e0a,
    0x5a3e2ab3,
    0x771fe71c,
    0x4e3d06fa,
    0x2965dcb9,
    0x99e71d0f,
    0x803e89d6,
    0x5266c825,
    0x2e4cc978,
    0x9c10b36a,
    0xc6150eba,
    0x94e2ea78,
    0xa5fc3c53,
    0x1e0a2df4,
    0xf2f74ea7,
    0x361d2b3d,
    0x1939260f,
    0x19c27960,
    0x5223a708,
    0xf71312b6,
    0xebadfe6e,
    0xeac31f66,
    0xe3bc4595,
    0xa67bc883,
    0xb17f37d1,
    0x018cff28,
    0xc332ddef,
    0xbe6c5aa5,
    0x65582185,
    0x68ab9802,
    0xeecea50f,
    0xdb2f953b,
    0x2aef7dad,
    0x5b6e2f84,
    0x1521b628,
    0x29076170,
    0xecdd4775,
    0x619f1510,
    0x13cca830,
    0xeb61bd96,
    0x0334fe1e,
    0xaa0363cf,
    0xb5735c90,
    0x4c70a239,
    0xd59e9e0b,
    0xcbaade14,
    0xeecc86bc,
    0x60622ca7,
    0x9cab5cab,
    0xb2f3846e,
    0x648b1eaf,
    0x19bdf0ca,
    0xa02369b9,
    0x655abb50,
    0x40685a32,
    0x3c2ab4b3,
    0x319ee9d5,
    0xc021b8f7,
    0x9b540b19,
    0x875fa099,
    0x95f7997e,
    0x623d7da8,
    0xf837889a,
    0x97e32d77,
    0x11ed935f,
    0x16681281,
    0x0e358829,
    0xc7e61fd6,
    0x96dedfa1,
    0x7858ba99,
    0x57f584a5,
    0x1b227263,
    0x9b83c3ff,
    0x1ac24696,
    0xcdb30aeb,
    0x532e3054,
    0x8fd948e4,
    0x6dbc3128,
    0x58ebf2ef,
    0x34c6ffea,
    0xfe28ed61,
    0xee7c3c73,
    0x5d4a14d9,
    0xe864b7e3,
    0x42105d14,
    0x203e13e0,
    0x45eee2b6,
    0xa3aaabea,
    0xdb6c4f15,
    0xfacb4fd0,
    0xc742f442,
    0xef6abbb5,
    0x654f3b1d,
    0x41cd2105,
    0xd81e799e,
    0x86854dc7,
    0xe44b476a,
    0x3d816250,
    0xcf62a1f2,
    0x5b8d2646,
    0xfc8883a0,
    0xc1c7b6a3,
    0x7f1524c3,
    0x69cb7492,
    0x47848a0b,
    0x5692b285,
    0x095bbf00,
    0xad19489d,
    0x1462b174,
    0x23820e00,
    0x58428d2a,
    0x0c55f5ea,
    0x1dadf43e,
    0x233f7061,
    0x3372f092,
    0x8d937e41,
    0xd65fecf1,
    0x6c223bdb,
    0x7cde3759,
    0xcbee7460,
    0x4085f2a7,
    0xce77326e,
    0xa6078084,
    0x19f8509e,
    0xe8efd855,
    0x61d99735,
    0xa969a7aa,
    0xc50c06c2,
    0x5a04abfc,
    0x800bcadc,
    0x9e447a2e,
    0xc3453484,
    0xfdd56705,
    0x0e1e9ec9,
    0xdb73dbd3,
    0x105588cd,
    0x675fda79,
    0xe3674340,
    0xc5c43465,
    0x713e38d8,
    0x3d28f89e,
    0xf16dff20,
    0x153e21e7,
    0x8fb03d4a,
    0xe6e39f2b,
    0xdb83adf7,
    0xe93d5a68,
    0x948140f7,
    0xf64c261c,
    0x94692934,
    0x411520f7,
    0x7602d4f7,
    0xbcf46b2e,
    0xd4a20068,
    0xd4082471,
    0x3320f46a,
    0x43b7d4b7,
    0x500061af,
    0x1e39f62e,
    0x97244546,
    0x14214f74,
    0xbf8b8840,
    0x4d95fc1d,
    0x96b591af,
    0x70f4ddd3,
    0x66a02f45,
    0xbfbc09ec,
    0x03bd9785,
    0x7fac6dd0,
    0x31cb8504,
    0x96eb27b3,
    0x55fd3941,
    0xda2547e6,
    0xabca0a9a,
    0x28507825,
    0x530429f4,
    0x0a2c86da,
    0xe9b66dfb,
    0x68dc1462,
    0xd7486900,
    0x680ec0a4,
    0x27a18dee,
    0x4f3ffea2,
    0xe887ad8c,
    0xb58ce006,
    0x7af4d6b6,
    0xaace1e7c,
    0xd3375fec,
    0xce78a399,
    0x406b2a42,
    0x20fe9e35,
    0xd9f385b9,
    0xee39d7ab,
    0x3b124e8b,
    0x1dc9faf7,
    0x4b6d1856,
    0x26a36631,
    0xeae397b2,
    0x3a6efa74,
    0xdd5b4332,
    0x6841e7f7,
    0xca7820fb,
    0xfb0af54e,
    0xd8feb397,
    0x454056ac,
    0xba489527,
    0x55533a3a,
    0x20838d87,
    0xfe6ba9b7,
    0xd096954b,
    0x55a867bc,
    0xa1159a58,
    0xcca92963,
    0x99e1db33,
    0xa62a4a56,
    0x3f3125f9,
    0x5ef47e1c,
    0x9029317c,
    0xfdf8e802,
    0x04272f70,
    0x80bb155c,
    0x05282ce3,
    0x95c11548,
    0xe4c66d22,
    0x48c1133f,
    0xc70f86dc,
    0x07f9c9ee,
    0x41041f0f,
    0x404779a4,
    0x5d886e17,
    0x325f51eb,
    0xd59bc0d1,
    0xf2bcc18f,
    0x41113564,
    0x257b7834,
    0x602a9c60,
    0xdff8e8a3,
    0x1f636c1b,
    0x0e12b4c2,
    0x02e1329e,
    0xaf664fd1,
    0xcad18115,
    0x6b2395e0,
    0x333e92e1,
    0x3b240b62,
    0xeebeb922,
    0x85b2a20e,
    0xe6ba0d99,
    0xde720c8c,
    0x2da2f728,
    0xd0127845,
    0x95b794fd,
    0x647d0862,
    0xe7ccf5f0,
    0x5449a36f,
    0x877d48fa,
    0xc39dfd27,
    0xf33e8d1e,
    0x0a476341,
    0x992eff74,
    0x3a6f6eab,
    0xf4f8fd37,
    0xa812dc60,
    0xa1ebddf8,
    0x991be14c,
    0xdb6e6b0d,
    0xc67b5510,
    0x6d672c37,
    0x2765d43b,
    0xdcd0e804,
    0xf1290dc7,
    0xcc00ffa3,
    0xb5390f92,
    0x690fed0b,
    0x667b9ffb,
    0xcedb7d9c,
    0xa091cf0b,
    0xd9155ea3,
    0xbb132f88,
    0x515bad24,
    0x7b9479bf,
    0x763bd6eb,
    0x37392eb3,
    0xcc115979,
    0x8026e297,
    0xf42e312d,
    0x6842ada7,
    0xc66a2b3b,
    0x12754ccc,
    0x782ef11c,
    0x6a124237,
    0xb79251e7,
    0x06a1bbe6,
    0x4bfb6350,
    0x1a6b1018,
    0x11caedfa,
    0x3d25bdd8,
    0xe2e1c3c9,
    0x44421659,
    0x0a121386,
    0xd90cec6e,
    0xd5abea2a,
    0x64af674e,
    0xda86a85f,
    0xbebfe988,
    0x64e4c3fe,
    0x9dbc8057,
    0xf0f7c086,
    0x60787bf8,
    0x6003604d,
    0xd1fd8346,
    0xf6381fb0,
    0x7745ae04,
    0xd736fccc,
    0x83426b33,
    0xf01eab71,
    0xb0804187,
    0x3c005e5f,
    0x77a057be,
    0xbde8ae24,
    0x55464299,
    0xbf582e61,
    0x4e58f48f,
    0xf2ddfda2,
    0xf474ef38,
    0x8789bdc2,
    0x5366f9c3,
    0xc8b38e74,
    0xb475f255,
    0x46fcd9b9,
    0x7aeb2661,
    0x8b1ddf84,
    0x846a0e79,
    0x915f95e2,
    0x466e598e,
    0x20b45770,
    0x8cd55591,
    0xc902de4c,
    0xb90bace1,
    0xbb8205d0,
    0x11a86248,
    0x7574a99e,
    0xb77f19b6,
    0xe0a9dc09,
    0x662d09a1,
    0xc4324633,
    0xe85a1f02,
    0x09f0be8c,
    0x4a99a025,
    0x1d6efe10,
    0x1ab93d1d,
    0x0ba5a4df,
    0xa186f20f,
    0x2868f169,
    0xdcb7da83,
    0x573906fe,
    0xa1e2ce9b,
    0x4fcd7f52,
    0x50115e01,
    0xa70683fa,
    0xa002b5c4,
    0x0de6d027,
    0x9af88c27,
    0x773f8641,
    0xc3604c06,
    0x61a806b5,
    0xf0177a28,
    0xc0f586e0,
    0x006058aa,
    0x30dc7d62,
    0x11e69ed7,
    0x2338ea63,
    0x53c2dd94,
    0xc2c21634,
    0xbbcbee56,
    0x90bcb6de,
    0xebfc7da1,
    0xce591d76,
    0x6f05e409,
    0x4b7c0188,
    0x39720a3d,
    0x7c927c24,
    0x86e3725f,
    0x724d9db9,
    0x1ac15bb4,
    0xd39eb8fc,
    0xed545578,
    0x08fca5b5,
    0xd83d7cd3,
    0x4dad0fc4,
    0x1e50ef5e,
    0xb161e6f8,
    0xa28514d9,
    0x6c51133c,
    0x6fd5c7e7,
    0x56e14ec4,
    0x362abfce,
    0xddc6c837,
    0xd79a3234,
    0x92638212,
    0x670efa8e,
    0x406000e0,
    0x3a39ce37,
    0xd3faf5cf,
    0xabc27737,
    0x5ac52d1b,
    0x5cb0679e,
    0x4fa33742,
    0xd3822740,
    0x99bc9bbe,
    0xd5118e9d,
    0xbf0f7315,
    0xd62d1c7e,
    0xc700c47b,
    0xb78c1b6b,
    0x21a19045,
    0xb26eb1be,
    0x6a366eb4,
    0x5748ab2f,
    0xbc946e79,
    0xc6a376d2,
    0x6549c2c8,
    0x530ff8ee,
    0x468dde7d,
    0xd5730a1d,
    0x4cd04dc6,
    0x2939bbdb,
    0xa9ba4650,
    0xac9526e8,
    0xbe5ee304,
    0xa1fad5f0,
    0x6a2d519a,
    0x63ef8ce2,
    0x9a86ee22,
    0xc089c2b8,
    0x43242ef6,
    0xa51e03aa,
    0x9cf2d0a4,
    0x83c061ba,
    0x9be96a4d,
    0x8fe51550,
    0xba645bd6,
    0x2826a2f9,
    0xa73a3ae1,
    0x4ba99586,
    0xef5562e9,
    0xc72fefd3,
    0xf752f7da,
    0x3f046f69,
    0x77fa0a59,
    0x80e4a915,
    0x87b08601,
    0x9b09e6ad,
    0x3b3ee593,
    0xe990fd5a,
    0x9e34d797,
    0x2cf0b7d9,
    0x022b8b51,
    0x96d5ac3a,
    0x017da67d,
    0xd1cf3ed6,
    0x7c7d2d28,
    0x1f9f25cf,
    0xadf2b89b,
    0x5ad6b472,
    0x5a88f54c,
    0xe029ac71,
    0xe019a5e6,
    0x47b0acfd,
    0xed93fa9b,
    0xe8d3c48d,
    0x283b57cc,
    0xf8d56629,
    0x79132e28,
    0x785f0191,
    0xed756055,
    0xf7960e44,
    0xe3d35e8c,
    0x15056dd4,
    0x88f46dba,
    0x03a16125,
    0x0564f0bd,
    0xc3eb9e15,
    0x3c9057a2,
    0x97271aec,
    0xa93a072a,
    0x1b3f6d9b,
    0x1e6321f5,
    0xf59c66fb,
    0x26dcf319,
    0x7533d928,
    0xb155fdf5,
    0x03563482,
    0x8aba3cbb,
    0x28517711,
    0xc20ad9f8,
    0xabcc5167,
    0xccad925f,
    0x4de81751,
    0x3830dc8e,
    0x379d5862,
    0x9320f991,
    0xea7a90c2,
    0xfb3e7bce,
    0x5121ce64,
    0x774fbe32,
    0xa8b6e37e,
    0xc3293d46,
    0x48de5369,
    0x6413e680,
    0xa2ae0810,
    0xdd6db224,
    0x69852dfd,
    0x09072166,
    0xb39a460a,
    0x6445c0dd,
    0x586cdecf,
    0x1c20c8ae,
    0x5bbef7dd,
    0x1b588d40,
    0xccd2017f,
    0x6bb4e3bb,
    0xdda26a7e,
    0x3a59ff45,
    0x3e350a44,
    0xbcb4cdd5,
    0x72eacea8,
    0xfa6484bb,
    0x8d6612ae,
    0xbf3c6f47,
    0xd29be463,
    0x542f5d9e,
    0xaec2771b,
    0xf64e6370,
    0x740e0d8d,
    0xe75b1357,
    0xf8721671,
    0xaf537d5d,
    0x4040cb08,
    0x4eb4e2cc,
    0x34d2466a,
    0x0115af84,
    0xe1b00428,
    0x95983a1d,
    0x06b89fb4,
    0xce6ea048,
    0x6f3f3b82,
    0x3520ab82,
    0x011a1d4b,
    0x277227f8,
    0x611560b1,
    0xe7933fdc,
    0xbb3a792b,
    0x344525bd,
    0xa08839e1,
    0x51ce794b,
    0x2f32c9b7,
    0xa01fbac9,
    0xe01cc87e,
    0xbcc7d1f6,
    0xcf0111c3,
    0xa1e8aac7,
    0x1a908749,
    0xd44fbd9a,
    0xd0dadecb,
    0xd50ada38,
    0x0339c32a,
    0xc6913667,
    0x8df9317c,
    0xe0b12b4f,
    0xf79e59b7,
    0x43f5bb3a,
    0xf2d519ff,
    0x27d9459c,
    0xbf97222c,
    0x15e6fc2a,
    0x0f91fc71,
    0x9b941525,
    0xfae59361,
    0xceb69ceb,
    0xc2a86459,
    0x12baa8d1,
    0xb6c1075e,
    0xe3056a0c,
    0x10d25065,
    0xcb03a442,
    0xe0ec6e0e,
    0x1698db3b,
    0x4c98a0be,
    0x3278e964,
    0x9f1f9532,
    0xe0d392df,
    0xd3a0342b,
    0x8971f21e,
    0x1b0a7441,
    0x4ba3348c,
    0xc5be7120,
    0xc37632d8,
    0xdf359f8d,
    0x9b992f2e,
    0xe60b6f47,
    0x0fe3f11d,
    0xe54cda54,
    0x1edad891,
    0xce6279cf,
    0xcd3e7e6f,
    0x1618b166,
    0xfd2c1d05,
    0x848fd2c5,
    0xf6fb2299,
    0xf523f357,
    0xa6327623,
    0x93a83531,
    0x56cccd02,
    0xacf08162,
    0x5a75ebb5,
    0x6e163697,
    0x88d273cc,
    0xde966292,
    0x81b949d0,
    0x4c50901b,
    0x71c65614,
    0xe6c6c7bd,
    0x327a140a,
    0x45e1d006,
    0xc3f27b9a,
    0xc9aa53fd,
    0x62a80f00,
    0xbb25bfe2,
    0x35bdd2f6,
    0x71126905,
    0xb2040222,
    0xb6cbcf7c,
    0xcd769c2b,
    0x53113ec0,
    0x1640e3d3,
    0x38abbd60,
    0x2547adf0,
    0xba38209c,
    0xf746ce76,
    0x77afa1c5,
    0x20756060,
    0x85cbfe4e,
    0x8ae88dd8,
    0x7aaaf9b0,
    0x4cf9aa7e,
    0x1948c25c,
    0x02fb8a8c,
    0x01c36ae4,
    0xd6ebe1f9,
    0x90d4f869,
    0xa65cdea0,
    0x3f09252d,
    0xc208e69f,
    0xb74e6132,
    0xce77e25b,
    0x578fdfe3,
    0x3ac372e6
];
/**
 * @type {Array.<number>}
 * @const
 * @inner
 */ var C_ORIG = [
    0x4f727068,
    0x65616e42,
    0x65686f6c,
    0x64657253,
    0x63727944,
    0x6f756274
];
/**
 * @param {Array.<number>} lr
 * @param {number} off
 * @param {Array.<number>} P
 * @param {Array.<number>} S
 * @returns {Array.<number>}
 * @inner
 */ function _encipher(lr, off, P, S) {
    // This is our bottleneck: 1714/1905 ticks / 90% - see profile.txt
    var n, l = lr[off], r = lr[off + 1];
    l ^= P[0];
    /*
    for (var i=0, k=BLOWFISH_NUM_ROUNDS-2; i<=k;)
        // Feistel substitution on left word
        n  = S[l >>> 24],
        n += S[0x100 | ((l >> 16) & 0xff)],
        n ^= S[0x200 | ((l >> 8) & 0xff)],
        n += S[0x300 | (l & 0xff)],
        r ^= n ^ P[++i],
        // Feistel substitution on right word
        n  = S[r >>> 24],
        n += S[0x100 | ((r >> 16) & 0xff)],
        n ^= S[0x200 | ((r >> 8) & 0xff)],
        n += S[0x300 | (r & 0xff)],
        l ^= n ^ P[++i];
    */ //The following is an unrolled version of the above loop.
    //Iteration 0
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[1];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[2];
    //Iteration 1
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[3];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[4];
    //Iteration 2
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[5];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[6];
    //Iteration 3
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[7];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[8];
    //Iteration 4
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[9];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[10];
    //Iteration 5
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[11];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[12];
    //Iteration 6
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[13];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[14];
    //Iteration 7
    n = S[l >>> 24];
    n += S[0x100 | l >> 16 & 0xff];
    n ^= S[0x200 | l >> 8 & 0xff];
    n += S[0x300 | l & 0xff];
    r ^= n ^ P[15];
    n = S[r >>> 24];
    n += S[0x100 | r >> 16 & 0xff];
    n ^= S[0x200 | r >> 8 & 0xff];
    n += S[0x300 | r & 0xff];
    l ^= n ^ P[16];
    lr[off] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
    lr[off + 1] = l;
    return lr;
}
/**
 * @param {Array.<number>} data
 * @param {number} offp
 * @returns {{key: number, offp: number}}
 * @inner
 */ function _streamtoword(data, offp) {
    for(var i = 0, word = 0; i < 4; ++i)word = word << 8 | data[offp] & 0xff, offp = (offp + 1) % data.length;
    return {
        key: word,
        offp: offp
    };
}
/**
 * @param {Array.<number>} key
 * @param {Array.<number>} P
 * @param {Array.<number>} S
 * @inner
 */ function _key(key, P, S) {
    var offset = 0, lr = [
        0,
        0
    ], plen = P.length, slen = S.length, sw;
    for(var i = 0; i < plen; i++)sw = _streamtoword(key, offset), offset = sw.offp, P[i] = P[i] ^ sw.key;
    for(i = 0; i < plen; i += 2)lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
    for(i = 0; i < slen; i += 2)lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
}
/**
 * Expensive key schedule Blowfish.
 * @param {Array.<number>} data
 * @param {Array.<number>} key
 * @param {Array.<number>} P
 * @param {Array.<number>} S
 * @inner
 */ function _ekskey(data, key, P, S) {
    var offp = 0, lr = [
        0,
        0
    ], plen = P.length, slen = S.length, sw;
    for(var i = 0; i < plen; i++)sw = _streamtoword(key, offp), offp = sw.offp, P[i] = P[i] ^ sw.key;
    offp = 0;
    for(i = 0; i < plen; i += 2)sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), P[i] = lr[0], P[i + 1] = lr[1];
    for(i = 0; i < slen; i += 2)sw = _streamtoword(data, offp), offp = sw.offp, lr[0] ^= sw.key, sw = _streamtoword(data, offp), offp = sw.offp, lr[1] ^= sw.key, lr = _encipher(lr, 0, P, S), S[i] = lr[0], S[i + 1] = lr[1];
}
/**
 * Internaly crypts a string.
 * @param {Array.<number>} b Bytes to crypt
 * @param {Array.<number>} salt Salt bytes to use
 * @param {number} rounds Number of rounds
 * @param {function(Error, Array.<number>=)=} callback Callback receiving the error, if any, and the resulting bytes. If
 *  omitted, the operation will be performed synchronously.
 *  @param {function(number)=} progressCallback Callback called with the current progress
 * @returns {!Array.<number>|undefined} Resulting bytes if callback has been omitted, otherwise `undefined`
 * @inner
 */ function _crypt(b, salt, rounds, callback, progressCallback) {
    var cdata = C_ORIG.slice(), clen = cdata.length, err;
    // Validate
    if (rounds < 4 || rounds > 31) {
        err = Error("Illegal number of rounds (4-31): " + rounds);
        if (callback) {
            nextTick(callback.bind(this, err));
            return;
        } else throw err;
    }
    if (salt.length !== BCRYPT_SALT_LEN) {
        err = Error("Illegal salt length: " + salt.length + " != " + BCRYPT_SALT_LEN);
        if (callback) {
            nextTick(callback.bind(this, err));
            return;
        } else throw err;
    }
    rounds = 1 << rounds >>> 0;
    var P, S, i = 0, j;
    //Use typed arrays when available - huge speedup!
    if (typeof Int32Array === "function") {
        P = new Int32Array(P_ORIG);
        S = new Int32Array(S_ORIG);
    } else {
        P = P_ORIG.slice();
        S = S_ORIG.slice();
    }
    _ekskey(salt, b, P, S);
    /**
   * Calcualtes the next round.
   * @returns {Array.<number>|undefined} Resulting array if callback has been omitted, otherwise `undefined`
   * @inner
   */ function next() {
        if (progressCallback) progressCallback(i / rounds);
        if (i < rounds) {
            var start = Date.now();
            for(; i < rounds;){
                i = i + 1;
                _key(b, P, S);
                _key(salt, P, S);
                if (Date.now() - start > MAX_EXECUTION_TIME) break;
            }
        } else {
            for(i = 0; i < 64; i++)for(j = 0; j < clen >> 1; j++)_encipher(cdata, j << 1, P, S);
            var ret = [];
            for(i = 0; i < clen; i++)ret.push((cdata[i] >> 24 & 0xff) >>> 0), ret.push((cdata[i] >> 16 & 0xff) >>> 0), ret.push((cdata[i] >> 8 & 0xff) >>> 0), ret.push((cdata[i] & 0xff) >>> 0);
            if (callback) {
                callback(null, ret);
                return;
            } else return ret;
        }
        if (callback) nextTick(next);
    }
    // Async
    if (typeof callback !== "undefined") {
        next();
    // Sync
    } else {
        var res;
        while(true)if (typeof (res = next()) !== "undefined") return res || [];
    }
}
/**
 * Internally hashes a password.
 * @param {string} password Password to hash
 * @param {?string} salt Salt to use, actually never null
 * @param {function(Error, string=)=} callback Callback receiving the error, if any, and the resulting hash. If omitted,
 *  hashing is performed synchronously.
 *  @param {function(number)=} progressCallback Callback called with the current progress
 * @returns {string|undefined} Resulting hash if callback has been omitted, otherwise `undefined`
 * @inner
 */ function _hash(password, salt, callback, progressCallback) {
    var err;
    if (typeof password !== "string" || typeof salt !== "string") {
        err = Error("Invalid string / salt: Not a string");
        if (callback) {
            nextTick(callback.bind(this, err));
            return;
        } else throw err;
    }
    // Validate the salt
    var minor, offset;
    if (salt.charAt(0) !== "$" || salt.charAt(1) !== "2") {
        err = Error("Invalid salt version: " + salt.substring(0, 2));
        if (callback) {
            nextTick(callback.bind(this, err));
            return;
        } else throw err;
    }
    if (salt.charAt(2) === "$") minor = String.fromCharCode(0), offset = 3;
    else {
        minor = salt.charAt(2);
        if (minor !== "a" && minor !== "b" && minor !== "y" || salt.charAt(3) !== "$") {
            err = Error("Invalid salt revision: " + salt.substring(2, 4));
            if (callback) {
                nextTick(callback.bind(this, err));
                return;
            } else throw err;
        }
        offset = 4;
    }
    // Extract number of rounds
    if (salt.charAt(offset + 2) > "$") {
        err = Error("Missing salt rounds");
        if (callback) {
            nextTick(callback.bind(this, err));
            return;
        } else throw err;
    }
    var r1 = parseInt(salt.substring(offset, offset + 1), 10) * 10, r2 = parseInt(salt.substring(offset + 1, offset + 2), 10), rounds = r1 + r2, real_salt = salt.substring(offset + 3, offset + 25);
    password += minor >= "a" ? "\x00" : "";
    var passwordb = utf8Array(password), saltb = base64_decode(real_salt, BCRYPT_SALT_LEN);
    /**
   * Finishes hashing.
   * @param {Array.<number>} bytes Byte array
   * @returns {string}
   * @inner
   */ function finish(bytes) {
        var res = [];
        res.push("$2");
        if (minor >= "a") res.push(minor);
        res.push("$");
        if (rounds < 10) res.push("0");
        res.push(rounds.toString());
        res.push("$");
        res.push(base64_encode(saltb, saltb.length));
        res.push(base64_encode(bytes, C_ORIG.length * 4 - 1));
        return res.join("");
    }
    // Sync
    if (typeof callback == "undefined") return finish(_crypt(passwordb, saltb, rounds));
    else {
        _crypt(passwordb, saltb, rounds, function(err, bytes) {
            if (err) callback(err, null);
            else callback(null, finish(bytes));
        }, progressCallback);
    }
}
function encodeBase64(bytes, length) {
    return base64_encode(bytes, length);
}
function decodeBase64(string, length) {
    return base64_decode(string, length);
}
const __TURBOPACK__default__export__ = {
    setRandomFallback,
    genSaltSync,
    genSalt,
    hashSync,
    hash,
    compareSync,
    compare,
    getRounds,
    getSalt,
    truncates,
    encodeBase64,
    decodeBase64
};
}),
"[project]/node_modules/groq-sdk/version.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VERSION",
    ()=>VERSION
]);
const VERSION = '0.37.0'; // x-release-please-version
 //# sourceMappingURL=version.mjs.map
}),
"[project]/node_modules/groq-sdk/_shims/registry.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Blob",
    ()=>Blob,
    "File",
    ()=>File,
    "FormData",
    ()=>FormData,
    "Headers",
    ()=>Headers,
    "ReadableStream",
    ()=>ReadableStream,
    "Request",
    ()=>Request,
    "Response",
    ()=>Response,
    "auto",
    ()=>auto,
    "fetch",
    ()=>fetch,
    "fileFromPath",
    ()=>fileFromPath,
    "getDefaultAgent",
    ()=>getDefaultAgent,
    "getMultipartRequestOptions",
    ()=>getMultipartRequestOptions,
    "isFsReadStream",
    ()=>isFsReadStream,
    "kind",
    ()=>kind,
    "setShims",
    ()=>setShims
]);
let auto = false;
let kind = undefined;
let fetch = undefined;
let Request = undefined;
let Response = undefined;
let Headers = undefined;
let FormData = undefined;
let Blob = undefined;
let File = undefined;
let ReadableStream = undefined;
let getMultipartRequestOptions = undefined;
let getDefaultAgent = undefined;
let fileFromPath = undefined;
let isFsReadStream = undefined;
function setShims(shims, options = {
    auto: false
}) {
    if (auto) {
        throw new Error(`you must \`import 'groq-sdk/shims/${shims.kind}'\` before importing anything else from groq-sdk`);
    }
    if (kind) {
        throw new Error(`can't \`import 'groq-sdk/shims/${shims.kind}'\` after \`import 'groq-sdk/shims/${kind}'\``);
    }
    auto = options.auto;
    kind = shims.kind;
    fetch = shims.fetch;
    Request = shims.Request;
    Response = shims.Response;
    Headers = shims.Headers;
    FormData = shims.FormData;
    Blob = shims.Blob;
    File = shims.File;
    ReadableStream = shims.ReadableStream;
    getMultipartRequestOptions = shims.getMultipartRequestOptions;
    getDefaultAgent = shims.getDefaultAgent;
    fileFromPath = shims.fileFromPath;
    isFsReadStream = shims.isFsReadStream;
} //# sourceMappingURL=registry.mjs.map
}),
"[project]/node_modules/groq-sdk/_shims/MultipartBody.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */ __turbopack_context__.s([
    "MultipartBody",
    ()=>MultipartBody
]);
class MultipartBody {
    constructor(body){
        this.body = body;
    }
    get [Symbol.toStringTag]() {
        return 'MultipartBody';
    }
} //# sourceMappingURL=MultipartBody.mjs.map
}),
"[project]/node_modules/groq-sdk/_shims/node-runtime.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRuntime",
    ()=>getRuntime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$node_modules$2f$node$2d$fetch$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/node_modules/node-fetch/lib/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$FormData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/FormData.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$Blob$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/Blob.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$File$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/File.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$agentkeepalive$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/agentkeepalive/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abort$2d$controller$2f$dist$2f$abort$2d$controller$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/abort-controller/dist/abort-controller.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/form-data-encoder/lib/esm/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$FormDataEncoder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/form-data-encoder/lib/esm/FormDataEncoder.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream__$5b$external$5d$__$28$node$3a$stream$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:stream [external] (node:stream, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$MultipartBody$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/_shims/MultipartBody.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream$2f$web__$5b$external$5d$__$28$node$3a$stream$2f$web$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:stream/web [external] (node:stream/web, cjs)");
;
;
;
;
;
;
;
;
;
let fileFromPathWarned = false;
async function fileFromPath(path, ...args) {
    // this import fails in environments that don't handle export maps correctly, like old versions of Jest
    const { fileFromPath: _fileFromPath } = await __turbopack_context__.A("[project]/node_modules/formdata-node/lib/esm/fileFromPath.js [app-rsc] (ecmascript, async loader)");
    if (!fileFromPathWarned) {
        console.warn(`fileFromPath is deprecated; use fs.createReadStream(${JSON.stringify(path)}) instead`);
        fileFromPathWarned = true;
    }
    // @ts-ignore
    return await _fileFromPath(path, ...args);
}
const defaultHttpAgent = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$agentkeepalive$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]({
    keepAlive: true,
    timeout: 5 * 60 * 1000
});
const defaultHttpsAgent = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$agentkeepalive$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].HttpsAgent({
    keepAlive: true,
    timeout: 5 * 60 * 1000
});
async function getMultipartRequestOptions(form, opts) {
    const encoder = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$FormDataEncoder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FormDataEncoder"](form);
    const readable = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream__$5b$external$5d$__$28$node$3a$stream$2c$__cjs$29$__["Readable"].from(encoder);
    const body = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$MultipartBody$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["MultipartBody"](readable);
    const headers = {
        ...opts.headers,
        ...encoder.headers,
        'Content-Length': encoder.contentLength
    };
    return {
        ...opts,
        body: body,
        headers
    };
}
function getRuntime() {
    // Polyfill global object if needed.
    if (typeof AbortController === 'undefined') {
        // @ts-expect-error (the types are subtly different, but compatible in practice)
        globalThis.AbortController = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abort$2d$controller$2f$dist$2f$abort$2d$controller$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AbortController"];
    }
    return {
        kind: 'node',
        fetch: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$node_modules$2f$node$2d$fetch$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
        Request: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$node_modules$2f$node$2d$fetch$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Request"],
        Response: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$node_modules$2f$node$2d$fetch$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Response"],
        Headers: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$node_modules$2f$node$2d$fetch$2f$lib$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Headers"],
        FormData: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$FormData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FormData"],
        Blob: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$Blob$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Blob"],
        File: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$File$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["File"],
        ReadableStream: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$stream$2f$web__$5b$external$5d$__$28$node$3a$stream$2f$web$2c$__cjs$29$__["ReadableStream"],
        getMultipartRequestOptions,
        getDefaultAgent: (url)=>url.startsWith('https') ? defaultHttpsAgent : defaultHttpAgent,
        fileFromPath,
        isFsReadStream: (value)=>value instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["ReadStream"]
    };
} //# sourceMappingURL=node-runtime.mjs.map
}),
"[project]/node_modules/groq-sdk/_shims/index.mjs [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "init",
    ()=>init
]);
/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/_shims/registry.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$node$2d$runtime$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/_shims/node-runtime.mjs [app-rsc] (ecmascript)");
;
;
const init = ()=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["kind"]) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setShims"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$node$2d$runtime$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRuntime"](), {
        auto: true
    });
};
;
init();
}),
"[project]/node_modules/groq-sdk/error.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "APIConnectionError",
    ()=>APIConnectionError,
    "APIConnectionTimeoutError",
    ()=>APIConnectionTimeoutError,
    "APIError",
    ()=>APIError,
    "APIUserAbortError",
    ()=>APIUserAbortError,
    "AuthenticationError",
    ()=>AuthenticationError,
    "BadRequestError",
    ()=>BadRequestError,
    "ConflictError",
    ()=>ConflictError,
    "GroqError",
    ()=>GroqError,
    "InternalServerError",
    ()=>InternalServerError,
    "NotFoundError",
    ()=>NotFoundError,
    "PermissionDeniedError",
    ()=>PermissionDeniedError,
    "RateLimitError",
    ()=>RateLimitError,
    "UnprocessableEntityError",
    ()=>UnprocessableEntityError
]);
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$core$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/core.mjs [app-rsc] (ecmascript) <locals>");
;
class GroqError extends Error {
}
class APIError extends GroqError {
    constructor(status, error, message, headers){
        super(`${APIError.makeMessage(status, error, message)}`);
        this.status = status;
        this.headers = headers;
        this.error = error;
    }
    static makeMessage(status, error, message) {
        const msg = error?.message ? typeof error.message === 'string' ? error.message : JSON.stringify(error.message) : error ? JSON.stringify(error) : message;
        if (status && msg) {
            return `${status} ${msg}`;
        }
        if (status) {
            return `${status} status code (no body)`;
        }
        if (msg) {
            return msg;
        }
        return '(no status code or body)';
    }
    static generate(status, errorResponse, message, headers) {
        if (!status || !headers) {
            return new APIConnectionError({
                message,
                cause: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$core$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["castToError"])(errorResponse)
            });
        }
        const error = errorResponse;
        if (status === 400) {
            return new BadRequestError(status, error, message, headers);
        }
        if (status === 401) {
            return new AuthenticationError(status, error, message, headers);
        }
        if (status === 403) {
            return new PermissionDeniedError(status, error, message, headers);
        }
        if (status === 404) {
            return new NotFoundError(status, error, message, headers);
        }
        if (status === 409) {
            return new ConflictError(status, error, message, headers);
        }
        if (status === 422) {
            return new UnprocessableEntityError(status, error, message, headers);
        }
        if (status === 429) {
            return new RateLimitError(status, error, message, headers);
        }
        if (status >= 500) {
            return new InternalServerError(status, error, message, headers);
        }
        return new APIError(status, error, message, headers);
    }
}
class APIUserAbortError extends APIError {
    constructor({ message } = {}){
        super(undefined, undefined, message || 'Request was aborted.', undefined);
    }
}
class APIConnectionError extends APIError {
    constructor({ message, cause }){
        super(undefined, undefined, message || 'Connection error.', undefined);
        // in some environments the 'cause' property is already declared
        // @ts-ignore
        if (cause) this.cause = cause;
    }
}
class APIConnectionTimeoutError extends APIConnectionError {
    constructor({ message } = {}){
        super({
            message: message ?? 'Request timed out.'
        });
    }
}
class BadRequestError extends APIError {
}
class AuthenticationError extends APIError {
}
class PermissionDeniedError extends APIError {
}
class NotFoundError extends APIError {
}
class ConflictError extends APIError {
}
class UnprocessableEntityError extends APIError {
}
class RateLimitError extends APIError {
}
class InternalServerError extends APIError {
} //# sourceMappingURL=error.mjs.map
}),
"[project]/node_modules/groq-sdk/lib/streaming.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Stream",
    ()=>Stream,
    "readableStreamAsyncIterable",
    ()=>readableStreamAsyncIterable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/_shims/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/_shims/registry.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/error.mjs [app-rsc] (ecmascript)");
;
;
;
class Stream {
    constructor(iterator, controller){
        this.iterator = iterator;
        this.controller = controller;
    }
    static fromSSEResponse(response, controller) {
        let consumed = false;
        const decoder = new SSEDecoder();
        async function* iterMessages() {
            if (!response.body) {
                controller.abort();
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GroqError"](`Attempted to iterate over a response with no body`);
            }
            const lineDecoder = new LineDecoder();
            const iter = readableStreamAsyncIterable(response.body);
            for await (const chunk of iter){
                for (const line of lineDecoder.decode(chunk)){
                    const sse = decoder.decode(line);
                    if (sse) yield sse;
                }
            }
            for (const line of lineDecoder.flush()){
                const sse = decoder.decode(line);
                if (sse) yield sse;
            }
        }
        async function* iterator() {
            if (consumed) {
                throw new Error('Cannot iterate over a consumed stream, use `.tee()` to split the stream.');
            }
            consumed = true;
            let done = false;
            try {
                for await (const sse of iterMessages()){
                    if (done) continue;
                    if (sse.data.startsWith('[DONE]')) {
                        done = true;
                        continue;
                    }
                    if (sse.event === null || sse.event === 'error') {
                        let data;
                        try {
                            data = JSON.parse(sse.data);
                        } catch (e) {
                            console.error(`Could not parse message into JSON:`, sse.data);
                            console.error(`From chunk:`, sse.raw);
                            throw e;
                        }
                        if (data && data.error) {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"](data.error.status_code, data.error, data.error.message, undefined);
                        }
                        yield data;
                    }
                }
                done = true;
            } catch (e) {
                // If the user calls `stream.controller.abort()`, we should exit without throwing.
                if (e instanceof Error && e.name === 'AbortError') return;
                throw e;
            } finally{
                // If the user `break`s, abort the ongoing request.
                if (!done) controller.abort();
            }
        }
        return new Stream(iterator, controller);
    }
    /**
     * Generates a Stream from a newline-separated ReadableStream
     * where each item is a JSON value.
     */ static fromReadableStream(readableStream, controller) {
        let consumed = false;
        async function* iterLines() {
            const lineDecoder = new LineDecoder();
            const iter = readableStreamAsyncIterable(readableStream);
            for await (const chunk of iter){
                for (const line of lineDecoder.decode(chunk)){
                    yield line;
                }
            }
            for (const line of lineDecoder.flush()){
                yield line;
            }
        }
        async function* iterator() {
            if (consumed) {
                throw new Error('Cannot iterate over a consumed stream, use `.tee()` to split the stream.');
            }
            consumed = true;
            let done = false;
            try {
                for await (const line of iterLines()){
                    if (done) continue;
                    if (line) yield JSON.parse(line);
                }
                done = true;
            } catch (e) {
                // If the user calls `stream.controller.abort()`, we should exit without throwing.
                if (e instanceof Error && e.name === 'AbortError') return;
                throw e;
            } finally{
                // If the user `break`s, abort the ongoing request.
                if (!done) controller.abort();
            }
        }
        return new Stream(iterator, controller);
    }
    [Symbol.asyncIterator]() {
        return this.iterator();
    }
    /**
     * Splits the stream into two streams which can be
     * independently read from at different speeds.
     */ tee() {
        const left = [];
        const right = [];
        const iterator = this.iterator();
        const teeIterator = (queue)=>{
            return {
                next: ()=>{
                    if (queue.length === 0) {
                        const result = iterator.next();
                        left.push(result);
                        right.push(result);
                    }
                    return queue.shift();
                }
            };
        };
        return [
            new Stream(()=>teeIterator(left), this.controller),
            new Stream(()=>teeIterator(right), this.controller)
        ];
    }
    /**
     * Converts this stream to a newline-separated ReadableStream of
     * JSON stringified values in the stream
     * which can be turned back into a Stream with `Stream.fromReadableStream()`.
     */ toReadableStream() {
        const self = this;
        let iter;
        const encoder = new TextEncoder();
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReadableStream"]({
            async start () {
                iter = self[Symbol.asyncIterator]();
            },
            async pull (ctrl) {
                try {
                    const { value, done } = await iter.next();
                    if (done) return ctrl.close();
                    const bytes = encoder.encode(JSON.stringify(value) + '\n');
                    ctrl.enqueue(bytes);
                } catch (err) {
                    ctrl.error(err);
                }
            },
            async cancel () {
                await iter.return?.();
            }
        });
    }
}
class SSEDecoder {
    constructor(){
        this.event = null;
        this.data = [];
        this.chunks = [];
    }
    decode(line) {
        if (line.endsWith('\r')) {
            line = line.substring(0, line.length - 1);
        }
        if (!line) {
            // empty line and we didn't previously encounter any messages
            if (!this.event && !this.data.length) return null;
            const sse = {
                event: this.event,
                data: this.data.join('\n'),
                raw: this.chunks
            };
            this.event = null;
            this.data = [];
            this.chunks = [];
            return sse;
        }
        this.chunks.push(line);
        if (line.startsWith(':')) {
            return null;
        }
        let [fieldname, _, value] = partition(line, ':');
        if (value.startsWith(' ')) {
            value = value.substring(1);
        }
        if (fieldname === 'event') {
            this.event = value;
        } else if (fieldname === 'data') {
            this.data.push(value);
        }
        return null;
    }
}
/**
 * A re-implementation of httpx's `LineDecoder` in Python that handles incrementally
 * reading lines from text.
 *
 * https://github.com/encode/httpx/blob/920333ea98118e9cf617f246905d7b202510941c/httpx/_decoders.py#L258
 */ class LineDecoder {
    constructor(){
        this.buffer = [];
        this.trailingCR = false;
    }
    decode(chunk) {
        let text = this.decodeText(chunk);
        if (this.trailingCR) {
            text = '\r' + text;
            this.trailingCR = false;
        }
        if (text.endsWith('\r')) {
            this.trailingCR = true;
            text = text.slice(0, -1);
        }
        if (!text) {
            return [];
        }
        const trailingNewline = LineDecoder.NEWLINE_CHARS.has(text[text.length - 1] || '');
        let lines = text.split(LineDecoder.NEWLINE_REGEXP);
        if (lines.length === 1 && !trailingNewline) {
            this.buffer.push(lines[0]);
            return [];
        }
        if (this.buffer.length > 0) {
            lines = [
                this.buffer.join('') + lines[0],
                ...lines.slice(1)
            ];
            this.buffer = [];
        }
        if (!trailingNewline) {
            this.buffer = [
                lines.pop() || ''
            ];
        }
        return lines;
    }
    decodeText(bytes) {
        if (bytes == null) return '';
        if (typeof bytes === 'string') return bytes;
        // Node:
        if (typeof Buffer !== 'undefined') {
            if (bytes instanceof Buffer) {
                return bytes.toString();
            }
            if (bytes instanceof Uint8Array) {
                return Buffer.from(bytes).toString();
            }
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GroqError"](`Unexpected: received non-Uint8Array (${bytes.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`);
        }
        // Browser
        if (typeof TextDecoder !== 'undefined') {
            if (bytes instanceof Uint8Array || bytes instanceof ArrayBuffer) {
                this.textDecoder ?? (this.textDecoder = new TextDecoder('utf8'));
                return this.textDecoder.decode(bytes);
            }
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GroqError"](`Unexpected: received non-Uint8Array/ArrayBuffer (${bytes.constructor.name}) in a web platform. Please report this error.`);
        }
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GroqError"](`Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.`);
    }
    flush() {
        if (!this.buffer.length && !this.trailingCR) {
            return [];
        }
        const lines = [
            this.buffer.join('')
        ];
        this.buffer = [];
        this.trailingCR = false;
        return lines;
    }
}
// prettier-ignore
LineDecoder.NEWLINE_CHARS = new Set([
    '\n',
    '\r',
    '\x0b',
    '\x0c',
    '\x1c',
    '\x1d',
    '\x1e',
    '\x85',
    '\u2028',
    '\u2029'
]);
LineDecoder.NEWLINE_REGEXP = /\r\n|[\n\r\x0b\x0c\x1c\x1d\x1e\x85\u2028\u2029]/g;
function partition(str, delimiter) {
    const index = str.indexOf(delimiter);
    if (index !== -1) {
        return [
            str.substring(0, index),
            delimiter,
            str.substring(index + delimiter.length)
        ];
    }
    return [
        str,
        '',
        ''
    ];
}
function readableStreamAsyncIterable(stream) {
    if (stream[Symbol.asyncIterator]) return stream;
    const reader = stream.getReader();
    return {
        async next () {
            try {
                const result = await reader.read();
                if (result?.done) reader.releaseLock(); // release lock when stream becomes closed
                return result;
            } catch (e) {
                reader.releaseLock(); // release lock when stream becomes errored
                throw e;
            }
        },
        async return () {
            const cancelPromise = reader.cancel();
            reader.releaseLock();
            await cancelPromise;
            return {
                done: true,
                value: undefined
            };
        },
        [Symbol.asyncIterator] () {
            return this;
        }
    };
} //# sourceMappingURL=streaming.mjs.map
}),
"[project]/node_modules/groq-sdk/uploads.mjs [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createForm",
    ()=>createForm,
    "isBlobLike",
    ()=>isBlobLike,
    "isFileLike",
    ()=>isFileLike,
    "isMultipartBody",
    ()=>isMultipartBody,
    "isResponseLike",
    ()=>isResponseLike,
    "isUploadable",
    ()=>isUploadable,
    "maybeMultipartFormRequestOptions",
    ()=>maybeMultipartFormRequestOptions,
    "multipartFormRequestOptions",
    ()=>multipartFormRequestOptions,
    "toFile",
    ()=>toFile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/_shims/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/_shims/registry.mjs [app-rsc] (ecmascript)");
;
;
const isResponseLike = (value)=>value != null && typeof value === 'object' && typeof value.url === 'string' && typeof value.blob === 'function';
const isFileLike = (value)=>value != null && typeof value === 'object' && typeof value.name === 'string' && typeof value.lastModified === 'number' && isBlobLike(value);
const isBlobLike = (value)=>value != null && typeof value === 'object' && typeof value.size === 'number' && typeof value.type === 'string' && typeof value.text === 'function' && typeof value.slice === 'function' && typeof value.arrayBuffer === 'function';
const isUploadable = (value)=>{
    return isFileLike(value) || isResponseLike(value) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFsReadStream"])(value);
};
async function toFile(value, name, options) {
    // If it's a promise, resolve it.
    value = await value;
    // If we've been given a `File` we don't need to do anything
    if (isFileLike(value)) {
        return value;
    }
    if (isResponseLike(value)) {
        const blob = await value.blob();
        name || (name = new URL(value.url).pathname.split(/[\\/]/).pop() ?? 'unknown_file');
        // we need to convert the `Blob` into an array buffer because the `Blob` class
        // that `node-fetch` defines is incompatible with the web standard which results
        // in `new File` interpreting it as a string instead of binary data.
        const data = isBlobLike(blob) ? [
            await blob.arrayBuffer()
        ] : [
            blob
        ];
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["File"](data, name, options);
    }
    const bits = await getBytes(value);
    name || (name = getName(value) ?? 'unknown_file');
    if (!options?.type) {
        const type = bits[0]?.type;
        if (typeof type === 'string') {
            options = {
                ...options,
                type
            };
        }
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["File"](bits, name, options);
}
async function getBytes(value) {
    let parts = [];
    if (typeof value === 'string' || ArrayBuffer.isView(value) || // includes Uint8Array, Buffer, etc.
    value instanceof ArrayBuffer) {
        parts.push(value);
    } else if (isBlobLike(value)) {
        parts.push(await value.arrayBuffer());
    } else if (isAsyncIterableIterator(value) // includes Readable, ReadableStream, etc.
    ) {
        for await (const chunk of value){
            parts.push(chunk); // TODO, consider validating?
        }
    } else {
        throw new Error(`Unexpected data type: ${typeof value}; constructor: ${value?.constructor?.name}; props: ${propsForError(value)}`);
    }
    return parts;
}
function propsForError(value) {
    const props = Object.getOwnPropertyNames(value);
    return `[${props.map((p)=>`"${p}"`).join(', ')}]`;
}
function getName(value) {
    return getStringFromMaybeBuffer(value.name) || getStringFromMaybeBuffer(value.filename) || // For fs.ReadStream
    getStringFromMaybeBuffer(value.path)?.split(/[\\/]/).pop();
}
const getStringFromMaybeBuffer = (x)=>{
    if (typeof x === 'string') return x;
    if (typeof Buffer !== 'undefined' && x instanceof Buffer) return String(x);
    return undefined;
};
const isAsyncIterableIterator = (value)=>value != null && typeof value === 'object' && typeof value[Symbol.asyncIterator] === 'function';
const isMultipartBody = (body)=>body && typeof body === 'object' && body.body && body[Symbol.toStringTag] === 'MultipartBody';
const maybeMultipartFormRequestOptions = async (opts)=>{
    if (!hasUploadableValue(opts.body)) return opts;
    const form = await createForm(opts.body);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMultipartRequestOptions"])(form, opts);
};
const multipartFormRequestOptions = async (opts)=>{
    const form = await createForm(opts.body);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMultipartRequestOptions"])(form, opts);
};
const createForm = async (body)=>{
    const form = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FormData"]();
    await Promise.all(Object.entries(body || {}).map(([key, value])=>addFormValue(form, key, value)));
    return form;
};
const hasUploadableValue = (value)=>{
    if (isUploadable(value)) return true;
    if (Array.isArray(value)) return value.some(hasUploadableValue);
    if (value && typeof value === 'object') {
        for(const k in value){
            if (hasUploadableValue(value[k])) return true;
        }
    }
    return false;
};
const addFormValue = async (form, key, value)=>{
    if (value === undefined) return;
    if (value == null) {
        throw new TypeError(`Received null for "${key}"; to pass null in FormData, you must use the string 'null'`);
    }
    // TODO: make nested formats configurable
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        form.append(key, String(value));
    } else if (isUploadable(value)) {
        const file = await toFile(value);
        form.append(key, file);
    } else if (Array.isArray(value)) {
        await Promise.all(value.map((entry)=>addFormValue(form, key + '[]', entry)));
    } else if (typeof value === 'object') {
        await Promise.all(Object.entries(value).map(([name, prop])=>addFormValue(form, `${key}[${name}]`, prop)));
    } else {
        throw new TypeError(`Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${value} instead`);
    }
}; //# sourceMappingURL=uploads.mjs.map
}),
"[project]/node_modules/groq-sdk/core.mjs [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "APIClient",
    ()=>APIClient,
    "APIPromise",
    ()=>APIPromise,
    "AbstractPage",
    ()=>AbstractPage,
    "PagePromise",
    ()=>PagePromise,
    "castToError",
    ()=>castToError,
    "coerceBoolean",
    ()=>coerceBoolean,
    "coerceFloat",
    ()=>coerceFloat,
    "coerceInteger",
    ()=>coerceInteger,
    "createResponseHeaders",
    ()=>createResponseHeaders,
    "debug",
    ()=>debug,
    "ensurePresent",
    ()=>ensurePresent,
    "getHeader",
    ()=>getHeader,
    "getRequiredHeader",
    ()=>getRequiredHeader,
    "hasOwn",
    ()=>hasOwn,
    "isEmptyObj",
    ()=>isEmptyObj,
    "isHeadersProtocol",
    ()=>isHeadersProtocol,
    "isObj",
    ()=>isObj,
    "isRequestOptions",
    ()=>isRequestOptions,
    "isRunningInBrowser",
    ()=>isRunningInBrowser,
    "maybeCoerceBoolean",
    ()=>maybeCoerceBoolean,
    "maybeCoerceFloat",
    ()=>maybeCoerceFloat,
    "maybeCoerceInteger",
    ()=>maybeCoerceInteger,
    "readEnv",
    ()=>readEnv,
    "safeJSON",
    ()=>safeJSON,
    "sleep",
    ()=>sleep,
    "toBase64",
    ()=>toBase64
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$version$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/version.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$lib$2f$streaming$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/lib/streaming.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/error.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/_shims/index.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/_shims/registry.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$uploads$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/uploads.mjs [app-rsc] (ecmascript) <locals>");
var __classPrivateFieldSet = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _APIClient_baseURLOverridden, _AbstractPage_client;
;
;
;
;
// try running side effects outside of _shims/index to workaround https://github.com/vercel/next.js/issues/76881
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["init"])();
;
;
async function defaultParseResponse(props) {
    const { response } = props;
    if (props.options.stream) {
        debug('response', response.status, response.url, response.headers, response.body);
        // Note: there is an invariant here that isn't represented in the type system
        // that if you set `stream: true` the response type must also be `Stream<T>`
        if (props.options.__streamClass) {
            return props.options.__streamClass.fromSSEResponse(response, props.controller);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$lib$2f$streaming$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Stream"].fromSSEResponse(response, props.controller);
    }
    // fetch refuses to read the body when the status code is 204.
    if (response.status === 204) {
        return null;
    }
    if (props.options.__binaryResponse) {
        return response;
    }
    const contentType = response.headers.get('content-type');
    const mediaType = contentType?.split(';')[0]?.trim();
    const isJSON = mediaType?.includes('application/json') || mediaType?.endsWith('+json');
    if (isJSON) {
        const json = await response.json();
        debug('response', response.status, response.url, response.headers, json);
        return json;
    }
    const text = await response.text();
    debug('response', response.status, response.url, response.headers, text);
    // TODO handle blob, arraybuffer, other content types, etc.
    return text;
}
class APIPromise extends Promise {
    constructor(responsePromise, parseResponse = defaultParseResponse){
        super((resolve)=>{
            // this is maybe a bit weird but this has to be a no-op to not implicitly
            // parse the response body; instead .then, .catch, .finally are overridden
            // to parse the response
            resolve(null);
        });
        this.responsePromise = responsePromise;
        this.parseResponse = parseResponse;
    }
    _thenUnwrap(transform) {
        return new APIPromise(this.responsePromise, async (props)=>transform(await this.parseResponse(props), props));
    }
    /**
     * Gets the raw `Response` instance instead of parsing the response
     * data.
     *
     * If you want to parse the response body but still get the `Response`
     * instance, you can use {@link withResponse()}.
     *
     * 👋 Getting the wrong TypeScript type for `Response`?
     * Try setting `"moduleResolution": "NodeNext"` if you can,
     * or add one of these imports before your first `import … from 'groq-sdk'`:
     * - `import 'groq-sdk/shims/node'` (if you're running on Node)
     * - `import 'groq-sdk/shims/web'` (otherwise)
     */ asResponse() {
        return this.responsePromise.then((p)=>p.response);
    }
    /**
     * Gets the parsed response data and the raw `Response` instance.
     *
     * If you just want to get the raw `Response` instance without parsing it,
     * you can use {@link asResponse()}.
     *
     *
     * 👋 Getting the wrong TypeScript type for `Response`?
     * Try setting `"moduleResolution": "NodeNext"` if you can,
     * or add one of these imports before your first `import … from 'groq-sdk'`:
     * - `import 'groq-sdk/shims/node'` (if you're running on Node)
     * - `import 'groq-sdk/shims/web'` (otherwise)
     */ async withResponse() {
        const [data, response] = await Promise.all([
            this.parse(),
            this.asResponse()
        ]);
        return {
            data,
            response
        };
    }
    parse() {
        if (!this.parsedPromise) {
            this.parsedPromise = this.responsePromise.then(this.parseResponse);
        }
        return this.parsedPromise;
    }
    then(onfulfilled, onrejected) {
        return this.parse().then(onfulfilled, onrejected);
    }
    catch(onrejected) {
        return this.parse().catch(onrejected);
    }
    finally(onfinally) {
        return this.parse().finally(onfinally);
    }
}
class APIClient {
    constructor({ baseURL, baseURLOverridden, maxRetries = 2, timeout = 60000, httpAgent, fetch: overriddenFetch }){
        _APIClient_baseURLOverridden.set(this, void 0);
        this.baseURL = baseURL;
        __classPrivateFieldSet(this, _APIClient_baseURLOverridden, baseURLOverridden, "f");
        this.maxRetries = validatePositiveInteger('maxRetries', maxRetries);
        this.timeout = validatePositiveInteger('timeout', timeout);
        this.httpAgent = httpAgent;
        this.fetch = overriddenFetch ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetch"];
    }
    authHeaders(opts) {
        return {};
    }
    /**
     * Override this to add your own default headers, for example:
     *
     *  {
     *    ...super.defaultHeaders(),
     *    Authorization: 'Bearer 123',
     *  }
     */ defaultHeaders(opts) {
        return {
            Accept: 'application/json',
            ...[
                'head',
                'get'
            ].includes(opts.method) ? {} : {
                'Content-Type': 'application/json'
            },
            'User-Agent': this.getUserAgent(),
            ...getPlatformHeaders(),
            ...this.authHeaders(opts)
        };
    }
    /**
     * Override this to add your own headers validation:
     */ validateHeaders(headers, customHeaders) {}
    defaultIdempotencyKey() {
        return `stainless-node-retry-${uuid4()}`;
    }
    get(path, opts) {
        return this.methodRequest('get', path, opts);
    }
    post(path, opts) {
        return this.methodRequest('post', path, opts);
    }
    patch(path, opts) {
        return this.methodRequest('patch', path, opts);
    }
    put(path, opts) {
        return this.methodRequest('put', path, opts);
    }
    delete(path, opts) {
        return this.methodRequest('delete', path, opts);
    }
    methodRequest(method, path, opts) {
        return this.request(Promise.resolve(opts).then(async (opts)=>{
            const body = opts && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$uploads$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isBlobLike"])(opts?.body) ? new DataView(await opts.body.arrayBuffer()) : opts?.body instanceof DataView ? opts.body : opts?.body instanceof ArrayBuffer ? new DataView(opts.body) : opts && ArrayBuffer.isView(opts?.body) ? new DataView(opts.body.buffer) : opts?.body;
            return {
                method,
                path,
                ...opts,
                body
            };
        }));
    }
    getAPIList(path, Page, opts) {
        return this.requestAPIList(Page, {
            method: 'get',
            path,
            ...opts
        });
    }
    calculateContentLength(body) {
        if (typeof body === 'string') {
            if (typeof Buffer !== 'undefined') {
                return Buffer.byteLength(body, 'utf8').toString();
            }
            if (typeof TextEncoder !== 'undefined') {
                const encoder = new TextEncoder();
                const encoded = encoder.encode(body);
                return encoded.length.toString();
            }
        } else if (ArrayBuffer.isView(body)) {
            return body.byteLength.toString();
        }
        return null;
    }
    async buildRequest(inputOptions, { retryCount = 0 } = {}) {
        const options = {
            ...inputOptions
        };
        const { method, path, query, defaultBaseURL, headers: headers = {} } = options;
        const body = ArrayBuffer.isView(options.body) || options.__binaryRequest && typeof options.body === 'string' ? options.body : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$uploads$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isMultipartBody"])(options.body) ? options.body.body : options.body ? JSON.stringify(options.body, null, 2) : null;
        const contentLength = this.calculateContentLength(body);
        const url = this.buildURL(path, query, defaultBaseURL);
        if ('timeout' in options) validatePositiveInteger('timeout', options.timeout);
        options.timeout = options.timeout ?? this.timeout;
        const httpAgent = options.httpAgent ?? this.httpAgent ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDefaultAgent"])(url);
        const minAgentTimeout = options.timeout + 1000;
        if (typeof httpAgent?.options?.timeout === 'number' && minAgentTimeout > (httpAgent.options.timeout ?? 0)) {
            // Allow any given request to bump our agent active socket timeout.
            // This may seem strange, but leaking active sockets should be rare and not particularly problematic,
            // and without mutating agent we would need to create more of them.
            // This tradeoff optimizes for performance.
            httpAgent.options.timeout = minAgentTimeout;
        }
        if (this.idempotencyHeader && method !== 'get') {
            if (!inputOptions.idempotencyKey) inputOptions.idempotencyKey = this.defaultIdempotencyKey();
            headers[this.idempotencyHeader] = inputOptions.idempotencyKey;
        }
        const reqHeaders = this.buildHeaders({
            options,
            headers,
            contentLength,
            retryCount
        });
        const req = {
            method,
            ...body && {
                body: body
            },
            headers: reqHeaders,
            ...httpAgent && {
                agent: httpAgent
            },
            // @ts-ignore node-fetch uses a custom AbortSignal type that is
            // not compatible with standard web types
            signal: options.signal ?? null
        };
        return {
            req,
            url,
            timeout: options.timeout
        };
    }
    buildHeaders({ options, headers, contentLength, retryCount }) {
        const reqHeaders = {};
        if (contentLength) {
            reqHeaders['content-length'] = contentLength;
        }
        const defaultHeaders = this.defaultHeaders(options);
        applyHeadersMut(reqHeaders, defaultHeaders);
        applyHeadersMut(reqHeaders, headers);
        // let builtin fetch set the Content-Type for multipart bodies
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$uploads$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isMultipartBody"])(options.body) && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["kind"] !== 'node') {
            delete reqHeaders['content-type'];
        }
        // Don't set theses headers if they were already set or removed through default headers or by the caller.
        // We check `defaultHeaders` and `headers`, which can contain nulls, instead of `reqHeaders` to account
        // for the removal case.
        if (getHeader(defaultHeaders, 'x-stainless-retry-count') === undefined && getHeader(headers, 'x-stainless-retry-count') === undefined) {
            reqHeaders['x-stainless-retry-count'] = String(retryCount);
        }
        if (getHeader(defaultHeaders, 'x-stainless-timeout') === undefined && getHeader(headers, 'x-stainless-timeout') === undefined && options.timeout) {
            reqHeaders['x-stainless-timeout'] = String(Math.trunc(options.timeout / 1000));
        }
        this.validateHeaders(reqHeaders, headers);
        return reqHeaders;
    }
    /**
     * Used as a callback for mutating the given `FinalRequestOptions` object.
     */ async prepareOptions(options) {}
    /**
     * Used as a callback for mutating the given `RequestInit` object.
     *
     * This is useful for cases where you want to add certain headers based off of
     * the request properties, e.g. `method` or `url`.
     */ async prepareRequest(request, { url, options }) {}
    parseHeaders(headers) {
        return !headers ? {} : Symbol.iterator in headers ? Object.fromEntries(Array.from(headers).map((header)=>[
                ...header
            ])) : {
            ...headers
        };
    }
    makeStatusError(status, error, message, headers) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"].generate(status, error, message, headers);
    }
    request(options, remainingRetries = null) {
        return new APIPromise(this.makeRequest(options, remainingRetries));
    }
    async makeRequest(optionsInput, retriesRemaining) {
        const options = await optionsInput;
        const maxRetries = options.maxRetries ?? this.maxRetries;
        if (retriesRemaining == null) {
            retriesRemaining = maxRetries;
        }
        await this.prepareOptions(options);
        const { req, url, timeout } = await this.buildRequest(options, {
            retryCount: maxRetries - retriesRemaining
        });
        await this.prepareRequest(req, {
            url,
            options
        });
        debug('request', url, options, req.headers);
        if (options.signal?.aborted) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIUserAbortError"]();
        }
        const controller = new AbortController();
        const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
        if (response instanceof Error) {
            if (options.signal?.aborted) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIUserAbortError"]();
            }
            if (retriesRemaining) {
                return this.retryRequest(options, retriesRemaining);
            }
            if (response.name === 'AbortError') {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIConnectionTimeoutError"]();
            }
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIConnectionError"]({
                cause: response
            });
        }
        const responseHeaders = createResponseHeaders(response.headers);
        if (!response.ok) {
            if (retriesRemaining && this.shouldRetry(response)) {
                const retryMessage = `retrying, ${retriesRemaining} attempts remaining`;
                debug(`response (error; ${retryMessage})`, response.status, url, responseHeaders);
                return this.retryRequest(options, retriesRemaining, responseHeaders);
            }
            const errText = await response.text().catch((e)=>castToError(e).message);
            const errJSON = safeJSON(errText);
            const errMessage = errJSON ? undefined : errText;
            const retryMessage = retriesRemaining ? `(error; no more retries left)` : `(error; not retryable)`;
            debug(`response (error; ${retryMessage})`, response.status, url, responseHeaders, errMessage);
            const err = this.makeStatusError(response.status, errJSON, errMessage, responseHeaders);
            throw err;
        }
        return {
            response,
            options,
            controller
        };
    }
    requestAPIList(Page, options) {
        const request = this.makeRequest(options, null);
        return new PagePromise(this, request, Page);
    }
    buildURL(path, query, defaultBaseURL) {
        const baseURL = !__classPrivateFieldGet(this, _APIClient_baseURLOverridden, "f") && defaultBaseURL || this.baseURL;
        const url = isAbsoluteURL(path) ? new URL(path) : new URL(baseURL + (baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));
        const defaultQuery = this.defaultQuery();
        if (!isEmptyObj(defaultQuery)) {
            query = {
                ...defaultQuery,
                ...query
            };
        }
        if (typeof query === 'object' && query && !Array.isArray(query)) {
            url.search = this.stringifyQuery(query);
        }
        return url.toString();
    }
    stringifyQuery(query) {
        return Object.entries(query).filter(([_, value])=>typeof value !== 'undefined').map(([key, value])=>{
            if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            }
            if (value === null) {
                return `${encodeURIComponent(key)}=`;
            }
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GroqError"](`Cannot stringify type ${typeof value}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`);
        }).join('&');
    }
    async fetchWithTimeout(url, init, ms, controller) {
        const { signal, ...options } = init || {};
        if (signal) signal.addEventListener('abort', ()=>controller.abort());
        const timeout = setTimeout(()=>controller.abort(), ms);
        const fetchOptions = {
            signal: controller.signal,
            ...options
        };
        if (fetchOptions.method) {
            // Custom methods like 'patch' need to be uppercased
            // See https://github.com/nodejs/undici/issues/2294
            fetchOptions.method = fetchOptions.method.toUpperCase();
        }
        return(// use undefined this binding; fetch errors if bound to something else in browser/cloudflare
        this.fetch.call(undefined, url, fetchOptions).finally(()=>{
            clearTimeout(timeout);
        }));
    }
    shouldRetry(response) {
        // Note this is not a standard header.
        const shouldRetryHeader = response.headers.get('x-should-retry');
        // If the server explicitly says whether or not to retry, obey.
        if (shouldRetryHeader === 'true') return true;
        if (shouldRetryHeader === 'false') return false;
        // Retry on request timeouts.
        if (response.status === 408) return true;
        // Retry on lock timeouts.
        if (response.status === 409) return true;
        // Retry on rate limits.
        if (response.status === 429) return true;
        // Retry internal errors.
        if (response.status >= 500) return true;
        return false;
    }
    async retryRequest(options, retriesRemaining, responseHeaders) {
        let timeoutMillis;
        // Note the `retry-after-ms` header may not be standard, but is a good idea and we'd like proactive support for it.
        const retryAfterMillisHeader = responseHeaders?.['retry-after-ms'];
        if (retryAfterMillisHeader) {
            const timeoutMs = parseFloat(retryAfterMillisHeader);
            if (!Number.isNaN(timeoutMs)) {
                timeoutMillis = timeoutMs;
            }
        }
        // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
        const retryAfterHeader = responseHeaders?.['retry-after'];
        if (retryAfterHeader && !timeoutMillis) {
            const timeoutSeconds = parseFloat(retryAfterHeader);
            if (!Number.isNaN(timeoutSeconds)) {
                timeoutMillis = timeoutSeconds * 1000;
            } else {
                timeoutMillis = Date.parse(retryAfterHeader) - Date.now();
            }
        }
        // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
        // just do what it says, but otherwise calculate a default
        if (!(timeoutMillis && 0 <= timeoutMillis && timeoutMillis < 60 * 1000)) {
            const maxRetries = options.maxRetries ?? this.maxRetries;
            timeoutMillis = this.calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries);
        }
        await sleep(timeoutMillis);
        return this.makeRequest(options, retriesRemaining - 1);
    }
    calculateDefaultRetryTimeoutMillis(retriesRemaining, maxRetries) {
        const initialRetryDelay = 0.5;
        const maxRetryDelay = 8.0;
        const numRetries = maxRetries - retriesRemaining;
        // Apply exponential backoff, but not more than the max.
        const sleepSeconds = Math.min(initialRetryDelay * Math.pow(2, numRetries), maxRetryDelay);
        // Apply some jitter, take up to at most 25 percent of the retry time.
        const jitter = 1 - Math.random() * 0.25;
        return sleepSeconds * jitter * 1000;
    }
    getUserAgent() {
        return `${this.constructor.name}/JS ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$version$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VERSION"]}`;
    }
}
_APIClient_baseURLOverridden = new WeakMap();
class AbstractPage {
    constructor(client, response, body, options){
        _AbstractPage_client.set(this, void 0);
        __classPrivateFieldSet(this, _AbstractPage_client, client, "f");
        this.options = options;
        this.response = response;
        this.body = body;
    }
    hasNextPage() {
        const items = this.getPaginatedItems();
        if (!items.length) return false;
        return this.nextPageInfo() != null;
    }
    async getNextPage() {
        const nextInfo = this.nextPageInfo();
        if (!nextInfo) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GroqError"]('No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.');
        }
        const nextOptions = {
            ...this.options
        };
        if ('params' in nextInfo && typeof nextOptions.query === 'object') {
            nextOptions.query = {
                ...nextOptions.query,
                ...nextInfo.params
            };
        } else if ('url' in nextInfo) {
            const params = [
                ...Object.entries(nextOptions.query || {}),
                ...nextInfo.url.searchParams.entries()
            ];
            for (const [key, value] of params){
                nextInfo.url.searchParams.set(key, value);
            }
            nextOptions.query = undefined;
            nextOptions.path = nextInfo.url.toString();
        }
        return await __classPrivateFieldGet(this, _AbstractPage_client, "f").requestAPIList(this.constructor, nextOptions);
    }
    async *iterPages() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let page = this;
        yield page;
        while(page.hasNextPage()){
            page = await page.getNextPage();
            yield page;
        }
    }
    async *[(_AbstractPage_client = new WeakMap(), Symbol.asyncIterator)]() {
        for await (const page of this.iterPages()){
            for (const item of page.getPaginatedItems()){
                yield item;
            }
        }
    }
}
class PagePromise extends APIPromise {
    constructor(client, request, Page){
        super(request, async (props)=>new Page(client, props.response, await defaultParseResponse(props), props.options));
    }
    /**
     * Allow auto-paginating iteration on an unawaited list call, eg:
     *
     *    for await (const item of client.items.list()) {
     *      console.log(item)
     *    }
     */ async *[Symbol.asyncIterator]() {
        const page = await this;
        for await (const item of page){
            yield item;
        }
    }
}
const createResponseHeaders = (headers)=>{
    return new Proxy(Object.fromEntries(// @ts-ignore
    headers.entries()), {
        get (target, name) {
            const key = name.toString();
            return target[key.toLowerCase()] || target[key];
        }
    });
};
// This is required so that we can determine if a given object matches the RequestOptions
// type at runtime. While this requires duplication, it is enforced by the TypeScript
// compiler such that any missing / extraneous keys will cause an error.
const requestOptionsKeys = {
    method: true,
    path: true,
    query: true,
    body: true,
    headers: true,
    defaultBaseURL: true,
    maxRetries: true,
    stream: true,
    timeout: true,
    httpAgent: true,
    signal: true,
    idempotencyKey: true,
    __binaryRequest: true,
    __binaryResponse: true,
    __streamClass: true
};
const isRequestOptions = (obj)=>{
    return typeof obj === 'object' && obj !== null && !isEmptyObj(obj) && Object.keys(obj).every((k)=>hasOwn(requestOptionsKeys, k));
};
const getPlatformProperties = ()=>{
    if (typeof Deno !== 'undefined' && Deno.build != null) {
        return {
            'X-Stainless-Lang': 'js',
            'X-Stainless-Package-Version': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$version$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VERSION"],
            'X-Stainless-OS': normalizePlatform(Deno.build.os),
            'X-Stainless-Arch': normalizeArch(Deno.build.arch),
            'X-Stainless-Runtime': 'deno',
            'X-Stainless-Runtime-Version': typeof Deno.version === 'string' ? Deno.version : Deno.version?.deno ?? 'unknown'
        };
    }
    if (typeof EdgeRuntime !== 'undefined') {
        return {
            'X-Stainless-Lang': 'js',
            'X-Stainless-Package-Version': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$version$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VERSION"],
            'X-Stainless-OS': 'Unknown',
            'X-Stainless-Arch': `other:${EdgeRuntime}`,
            'X-Stainless-Runtime': 'edge',
            'X-Stainless-Runtime-Version': process.version
        };
    }
    // Check if Node.js
    if (Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]') {
        return {
            'X-Stainless-Lang': 'js',
            'X-Stainless-Package-Version': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$version$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VERSION"],
            'X-Stainless-OS': normalizePlatform(process.platform),
            'X-Stainless-Arch': normalizeArch(process.arch),
            'X-Stainless-Runtime': 'node',
            'X-Stainless-Runtime-Version': process.version
        };
    }
    const browserInfo = getBrowserInfo();
    if (browserInfo) {
        return {
            'X-Stainless-Lang': 'js',
            'X-Stainless-Package-Version': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$version$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VERSION"],
            'X-Stainless-OS': 'Unknown',
            'X-Stainless-Arch': 'unknown',
            'X-Stainless-Runtime': `browser:${browserInfo.browser}`,
            'X-Stainless-Runtime-Version': browserInfo.version
        };
    }
    // TODO add support for Cloudflare workers, etc.
    return {
        'X-Stainless-Lang': 'js',
        'X-Stainless-Package-Version': __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$version$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VERSION"],
        'X-Stainless-OS': 'Unknown',
        'X-Stainless-Arch': 'unknown',
        'X-Stainless-Runtime': 'unknown',
        'X-Stainless-Runtime-Version': 'unknown'
    };
};
// Note: modified from https://github.com/JS-DevTools/host-environment/blob/b1ab79ecde37db5d6e163c050e54fe7d287d7c92/src/isomorphic.browser.ts
function getBrowserInfo() {
    if (typeof navigator === 'undefined' || !navigator) {
        return null;
    }
    // NOTE: The order matters here!
    const browserPatterns = [
        {
            key: 'edge',
            pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
        },
        {
            key: 'ie',
            pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
        },
        {
            key: 'ie',
            pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/
        },
        {
            key: 'chrome',
            pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
        },
        {
            key: 'firefox',
            pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/
        },
        {
            key: 'safari',
            pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/
        }
    ];
    // Find the FIRST matching browser
    for (const { key, pattern } of browserPatterns){
        const match = pattern.exec(navigator.userAgent);
        if (match) {
            const major = match[1] || 0;
            const minor = match[2] || 0;
            const patch = match[3] || 0;
            return {
                browser: key,
                version: `${major}.${minor}.${patch}`
            };
        }
    }
    return null;
}
const normalizeArch = (arch)=>{
    // Node docs:
    // - https://nodejs.org/api/process.html#processarch
    // Deno docs:
    // - https://doc.deno.land/deno/stable/~/Deno.build
    if (arch === 'x32') return 'x32';
    if (arch === 'x86_64' || arch === 'x64') return 'x64';
    if (arch === 'arm') return 'arm';
    if (arch === 'aarch64' || arch === 'arm64') return 'arm64';
    if (arch) return `other:${arch}`;
    return 'unknown';
};
const normalizePlatform = (platform)=>{
    // Node platforms:
    // - https://nodejs.org/api/process.html#processplatform
    // Deno platforms:
    // - https://doc.deno.land/deno/stable/~/Deno.build
    // - https://github.com/denoland/deno/issues/14799
    platform = platform.toLowerCase();
    // NOTE: this iOS check is untested and may not work
    // Node does not work natively on IOS, there is a fork at
    // https://github.com/nodejs-mobile/nodejs-mobile
    // however it is unknown at the time of writing how to detect if it is running
    if (platform.includes('ios')) return 'iOS';
    if (platform === 'android') return 'Android';
    if (platform === 'darwin') return 'MacOS';
    if (platform === 'win32') return 'Windows';
    if (platform === 'freebsd') return 'FreeBSD';
    if (platform === 'openbsd') return 'OpenBSD';
    if (platform === 'linux') return 'Linux';
    if (platform) return `Other:${platform}`;
    return 'Unknown';
};
let _platformHeaders;
const getPlatformHeaders = ()=>{
    return _platformHeaders ?? (_platformHeaders = getPlatformProperties());
};
const safeJSON = (text)=>{
    try {
        return JSON.parse(text);
    } catch (err) {
        return undefined;
    }
};
// https://url.spec.whatwg.org/#url-scheme-string
const startsWithSchemeRegexp = /^[a-z][a-z0-9+.-]*:/i;
const isAbsoluteURL = (url)=>{
    return startsWithSchemeRegexp.test(url);
};
const sleep = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));
const validatePositiveInteger = (name, n)=>{
    if (typeof n !== 'number' || !Number.isInteger(n)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GroqError"](`${name} must be an integer`);
    }
    if (n < 0) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GroqError"](`${name} must be a positive integer`);
    }
    return n;
};
const castToError = (err)=>{
    if (err instanceof Error) return err;
    if (typeof err === 'object' && err !== null) {
        try {
            return new Error(JSON.stringify(err));
        } catch  {}
    }
    return new Error(err);
};
const ensurePresent = (value)=>{
    if (value == null) throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GroqError"](`Expected a value to be given but received ${value} instead.`);
    return value;
};
const readEnv = (env)=>{
    if (typeof process !== 'undefined') {
        return process.env?.[env]?.trim() ?? undefined;
    }
    if (typeof Deno !== 'undefined') {
        return Deno.env?.get?.(env)?.trim();
    }
    return undefined;
};
const coerceInteger = (value)=>{
    if (typeof value === 'number') return Math.round(value);
    if (typeof value === 'string') return parseInt(value, 10);
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GroqError"](`Could not coerce ${value} (type: ${typeof value}) into a number`);
};
const coerceFloat = (value)=>{
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseFloat(value);
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GroqError"](`Could not coerce ${value} (type: ${typeof value}) into a number`);
};
const coerceBoolean = (value)=>{
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value === 'true';
    return Boolean(value);
};
const maybeCoerceInteger = (value)=>{
    if (value == null) {
        return undefined;
    }
    return coerceInteger(value);
};
const maybeCoerceFloat = (value)=>{
    if (value == null) {
        return undefined;
    }
    return coerceFloat(value);
};
const maybeCoerceBoolean = (value)=>{
    if (value == null) {
        return undefined;
    }
    return coerceBoolean(value);
};
function isEmptyObj(obj) {
    if (!obj) return true;
    for(const _k in obj)return false;
    return true;
}
function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
/**
 * Copies headers from "newHeaders" onto "targetHeaders",
 * using lower-case for all properties,
 * ignoring any keys with undefined values,
 * and deleting any keys with null values.
 */ function applyHeadersMut(targetHeaders, newHeaders) {
    for(const k in newHeaders){
        if (!hasOwn(newHeaders, k)) continue;
        const lowerKey = k.toLowerCase();
        if (!lowerKey) continue;
        const val = newHeaders[k];
        if (val === null) {
            delete targetHeaders[lowerKey];
        } else if (val !== undefined) {
            targetHeaders[lowerKey] = val;
        }
    }
}
function debug(action, ...args) {
    if (typeof process !== 'undefined' && process?.env?.['DEBUG'] === 'true') {
        console.log(`Groq:DEBUG:${action}`, ...args);
    }
}
/**
 * https://stackoverflow.com/a/2117523
 */ const uuid4 = ()=>{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=>{
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
};
const isRunningInBrowser = ()=>{
    return(// @ts-ignore
    ("TURBOPACK compile-time value", "undefined") !== 'undefined' && // @ts-ignore
    typeof window.document !== 'undefined' && // @ts-ignore
    typeof navigator !== 'undefined');
};
const isHeadersProtocol = (headers)=>{
    return typeof headers?.get === 'function';
};
const getRequiredHeader = (headers, header)=>{
    const foundHeader = getHeader(headers, header);
    if (foundHeader === undefined) {
        throw new Error(`Could not find ${header} header`);
    }
    return foundHeader;
};
const getHeader = (headers, header)=>{
    const lowerCasedHeader = header.toLowerCase();
    if (isHeadersProtocol(headers)) {
        // to deal with the case where the header looks like Stainless-Event-Id
        const intercapsHeader = header[0]?.toUpperCase() + header.substring(1).replace(/([^\w])(\w)/g, (_m, g1, g2)=>g1 + g2.toUpperCase());
        for (const key of [
            header,
            lowerCasedHeader,
            header.toUpperCase(),
            intercapsHeader
        ]){
            const value = headers.get(key);
            if (value) {
                return value;
            }
        }
    }
    for (const [key, value] of Object.entries(headers)){
        if (key.toLowerCase() === lowerCasedHeader) {
            if (Array.isArray(value)) {
                if (value.length <= 1) return value[0];
                console.warn(`Received ${value.length} entries for the ${header} header, using the first entry.`);
                return value[0];
            }
            return value;
        }
    }
    return undefined;
};
const toBase64 = (str)=>{
    if (!str) return '';
    if (typeof Buffer !== 'undefined') {
        return Buffer.from(str).toString('base64');
    }
    if (typeof btoa !== 'undefined') {
        return btoa(str);
    }
    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GroqError"]('Cannot generate b64 string; Expected `Buffer` or `btoa` to be defined');
};
function isObj(obj) {
    return obj != null && typeof obj === 'object' && !Array.isArray(obj);
} //# sourceMappingURL=core.mjs.map
}),
"[project]/node_modules/groq-sdk/resource.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
__turbopack_context__.s([
    "APIResource",
    ()=>APIResource
]);
class APIResource {
    constructor(client){
        this._client = client;
    }
} //# sourceMappingURL=resource.mjs.map
}),
"[project]/node_modules/groq-sdk/resources/completions.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Completions",
    ()=>Completions
]);
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resource.mjs [app-rsc] (ecmascript)");
;
class Completions extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIResource"] {
} //# sourceMappingURL=completions.mjs.map
}),
"[project]/node_modules/groq-sdk/resources/chat/completions.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Completions",
    ()=>Completions
]);
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resource.mjs [app-rsc] (ecmascript)");
;
class Completions extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIResource"] {
    create(body, options) {
        return this._client.post('/openai/v1/chat/completions', {
            body,
            ...options,
            stream: body.stream ?? false
        });
    }
} //# sourceMappingURL=completions.mjs.map
}),
"[project]/node_modules/groq-sdk/resources/chat/chat.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Chat",
    ()=>Chat
]);
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resource.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$chat$2f$completions$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resources/chat/completions.mjs [app-rsc] (ecmascript)");
;
;
;
class Chat extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIResource"] {
    constructor(){
        super(...arguments);
        this.completions = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$chat$2f$completions$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Completions"](this._client);
    }
}
Chat.Completions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$chat$2f$completions$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Completions"]; //# sourceMappingURL=chat.mjs.map
}),
"[project]/node_modules/groq-sdk/resources/embeddings.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Embeddings",
    ()=>Embeddings
]);
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resource.mjs [app-rsc] (ecmascript)");
;
class Embeddings extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Creates an embedding vector representing the input text.
     *
     * @example
     * ```ts
     * const createEmbeddingResponse =
     *   await client.embeddings.create({
     *     input: 'The quick brown fox jumped over the lazy dog',
     *     model: 'nomic-embed-text-v1_5',
     *   });
     * ```
     */ create(body, options) {
        return this._client.post('/openai/v1/embeddings', {
            body,
            ...options
        });
    }
} //# sourceMappingURL=embeddings.mjs.map
}),
"[project]/node_modules/groq-sdk/resources/audio/speech.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Speech",
    ()=>Speech
]);
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resource.mjs [app-rsc] (ecmascript)");
;
class Speech extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Generates audio from the input text.
     *
     * @example
     * ```ts
     * const speech = await client.audio.speech.create({
     *   input: 'The quick brown fox jumped over the lazy dog',
     *   model: 'playai-tts',
     *   voice: 'Fritz-PlayAI',
     * });
     *
     * const content = await speech.blob();
     * console.log(content);
     * ```
     */ create(body, options) {
        return this._client.post('/openai/v1/audio/speech', {
            body,
            ...options,
            headers: {
                Accept: 'audio/wav',
                ...options?.headers
            },
            __binaryResponse: true
        });
    }
} //# sourceMappingURL=speech.mjs.map
}),
"[project]/node_modules/groq-sdk/resources/audio/transcriptions.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Transcriptions",
    ()=>Transcriptions
]);
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resource.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$uploads$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/uploads.mjs [app-rsc] (ecmascript) <locals>");
;
;
class Transcriptions extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Transcribes audio into the input language.
     *
     * @example
     * ```ts
     * const transcription =
     *   await client.audio.transcriptions.create({
     *     model: 'whisper-large-v3-turbo',
     *   });
     * ```
     */ create(body, options) {
        return this._client.post('/openai/v1/audio/transcriptions', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$uploads$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["multipartFormRequestOptions"]({
            body,
            ...options
        }));
    }
} //# sourceMappingURL=transcriptions.mjs.map
}),
"[project]/node_modules/groq-sdk/resources/audio/translations.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Translations",
    ()=>Translations
]);
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resource.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$uploads$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/uploads.mjs [app-rsc] (ecmascript) <locals>");
;
;
class Translations extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Translates audio into English.
     *
     * @example
     * ```ts
     * const translation = await client.audio.translations.create({
     *   model: 'whisper-large-v3-turbo',
     * });
     * ```
     */ create(body, options) {
        return this._client.post('/openai/v1/audio/translations', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$uploads$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["multipartFormRequestOptions"]({
            body,
            ...options
        }));
    }
} //# sourceMappingURL=translations.mjs.map
}),
"[project]/node_modules/groq-sdk/resources/audio/audio.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Audio",
    ()=>Audio
]);
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resource.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$audio$2f$speech$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resources/audio/speech.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$audio$2f$transcriptions$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resources/audio/transcriptions.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$audio$2f$translations$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resources/audio/translations.mjs [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
class Audio extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIResource"] {
    constructor(){
        super(...arguments);
        this.speech = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$audio$2f$speech$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Speech"](this._client);
        this.transcriptions = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$audio$2f$transcriptions$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Transcriptions"](this._client);
        this.translations = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$audio$2f$translations$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Translations"](this._client);
    }
}
Audio.Speech = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$audio$2f$speech$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Speech"];
Audio.Transcriptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$audio$2f$transcriptions$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Transcriptions"];
Audio.Translations = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$audio$2f$translations$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Translations"]; //# sourceMappingURL=audio.mjs.map
}),
"[project]/node_modules/groq-sdk/resources/models.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Models",
    ()=>Models
]);
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resource.mjs [app-rsc] (ecmascript)");
;
class Models extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Get a specific model
     */ retrieve(model, options) {
        return this._client.get(`/openai/v1/models/${model}`, options);
    }
    /**
     * get all available models
     */ list(options) {
        return this._client.get('/openai/v1/models', options);
    }
    /**
     * Delete a model
     */ delete(model, options) {
        return this._client.delete(`/openai/v1/models/${model}`, options);
    }
} //# sourceMappingURL=models.mjs.map
}),
"[project]/node_modules/groq-sdk/resources/batches.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Batches",
    ()=>Batches
]);
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resource.mjs [app-rsc] (ecmascript)");
;
class Batches extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Creates and executes a batch from an uploaded file of requests.
     * [Learn more](/docs/batch).
     */ create(body, options) {
        return this._client.post('/openai/v1/batches', {
            body,
            ...options
        });
    }
    /**
     * Retrieves a batch.
     */ retrieve(batchId, options) {
        return this._client.get(`/openai/v1/batches/${batchId}`, options);
    }
    /**
     * List your organization's batches.
     */ list(options) {
        return this._client.get('/openai/v1/batches', options);
    }
    /**
     * Cancels a batch.
     */ cancel(batchId, options) {
        return this._client.post(`/openai/v1/batches/${batchId}/cancel`, options);
    }
} //# sourceMappingURL=batches.mjs.map
}),
"[project]/node_modules/groq-sdk/resources/files.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Files",
    ()=>Files
]);
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resource.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$uploads$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/uploads.mjs [app-rsc] (ecmascript) <locals>");
;
;
class Files extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resource$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIResource"] {
    /**
     * Upload a file that can be used across various endpoints.
     *
     * The Batch API only supports `.jsonl` files up to 100 MB in size. The input also
     * has a specific required [format](/docs/batch).
     *
     * Please contact us if you need to increase these storage limits.
     */ create(body, options) {
        return this._client.post('/openai/v1/files', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$uploads$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["multipartFormRequestOptions"]({
            body,
            ...options
        }));
    }
    /**
     * Returns a list of files.
     */ list(options) {
        return this._client.get('/openai/v1/files', options);
    }
    /**
     * Delete a file.
     */ delete(fileId, options) {
        return this._client.delete(`/openai/v1/files/${fileId}`, options);
    }
    /**
     * Returns the contents of the specified file.
     */ content(fileId, options) {
        return this._client.get(`/openai/v1/files/${fileId}/content`, {
            ...options,
            headers: {
                Accept: 'application/octet-stream',
                ...options?.headers
            },
            __binaryResponse: true
        });
    }
    /**
     * Returns information about a file.
     */ info(fileId, options) {
        return this._client.get(`/openai/v1/files/${fileId}`, options);
    }
} //# sourceMappingURL=files.mjs.map
}),
"[project]/node_modules/groq-sdk/index.mjs [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Groq",
    ()=>Groq,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$core$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/core.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/error.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$uploads$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/uploads.mjs [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/_shims/registry.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$completions$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resources/completions.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$chat$2f$chat$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resources/chat/chat.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$embeddings$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resources/embeddings.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$audio$2f$audio$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resources/audio/audio.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$models$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resources/models.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$batches$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resources/batches.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$files$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/resources/files.mjs [app-rsc] (ecmascript)");
// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
var _Groq_instances, _a, _Groq_baseURLOverridden;
;
;
;
;
;
;
;
;
;
;
;
class Groq extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$core$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["APIClient"] {
    /**
     * API Client for interfacing with the Groq API.
     *
     * @param {string | undefined} [opts.apiKey=process.env['GROQ_API_KEY'] ?? undefined]
     * @param {string} [opts.baseURL=process.env['GROQ_BASE_URL'] ?? https://api.groq.com] - Override the default base URL for the API.
     * @param {number} [opts.timeout=1 minute] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
     * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
     * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
     * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
     * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
     * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
     * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
     */ constructor({ baseURL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$core$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["readEnv"]('GROQ_BASE_URL'), apiKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$core$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["readEnv"]('GROQ_API_KEY'), ...opts } = {}){
        if (apiKey === undefined) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GroqError"]("The GROQ_API_KEY environment variable is missing or empty; either provide it, or instantiate the Groq client with an apiKey option, like new Groq({ apiKey: 'My API Key' }).");
        }
        const options = {
            apiKey,
            ...opts,
            baseURL: baseURL || `https://api.groq.com`
        };
        if (!options.dangerouslyAllowBrowser && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$core$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["isRunningInBrowser"]()) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GroqError"]("It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew Groq({ apiKey, dangerouslyAllowBrowser: true })");
        }
        super({
            baseURL: options.baseURL,
            baseURLOverridden: baseURL ? baseURL !== 'https://api.groq.com' : false,
            timeout: options.timeout ?? 60000 /* 1 minute */ ,
            httpAgent: options.httpAgent,
            maxRetries: options.maxRetries,
            fetch: options.fetch
        });
        _Groq_instances.add(this);
        this.completions = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$completions$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Completions"](this);
        this.chat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$chat$2f$chat$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Chat"](this);
        this.embeddings = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$embeddings$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Embeddings"](this);
        this.audio = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$audio$2f$audio$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Audio"](this);
        this.models = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$models$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Models"](this);
        this.batches = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$batches$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Batches"](this);
        this.files = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$files$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Files"](this);
        this._options = options;
        this.apiKey = apiKey;
    }
    defaultQuery() {
        return this._options.defaultQuery;
    }
    defaultHeaders(opts) {
        return {
            ...super.defaultHeaders(opts),
            ...this._options.defaultHeaders
        };
    }
    authHeaders(opts) {
        return {
            Authorization: `Bearer ${this.apiKey}`
        };
    }
}
_a = Groq, _Groq_instances = new WeakSet(), _Groq_baseURLOverridden = function _Groq_baseURLOverridden() {
    return this.baseURL !== 'https://api.groq.com';
};
Groq.Groq = _a;
Groq.DEFAULT_TIMEOUT = 60000; // 1 minute
Groq.GroqError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GroqError"];
Groq.APIError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIError"];
Groq.APIConnectionError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIConnectionError"];
Groq.APIConnectionTimeoutError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIConnectionTimeoutError"];
Groq.APIUserAbortError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["APIUserAbortError"];
Groq.NotFoundError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NotFoundError"];
Groq.ConflictError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ConflictError"];
Groq.RateLimitError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RateLimitError"];
Groq.BadRequestError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BadRequestError"];
Groq.AuthenticationError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["AuthenticationError"];
Groq.InternalServerError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InternalServerError"];
Groq.PermissionDeniedError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PermissionDeniedError"];
Groq.UnprocessableEntityError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$error$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UnprocessableEntityError"];
Groq.toFile = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$uploads$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["toFile"];
Groq.fileFromPath = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$_shims$2f$registry$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fileFromPath"];
Groq.Completions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$completions$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Completions"];
Groq.Chat = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$chat$2f$chat$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Chat"];
Groq.Embeddings = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$embeddings$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Embeddings"];
Groq.Audio = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$audio$2f$audio$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Audio"];
Groq.Models = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$models$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Models"];
Groq.Batches = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$batches$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Batches"];
Groq.Files = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$resources$2f$files$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Files"];
;
;
const __TURBOPACK__default__export__ = Groq;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/node_modules/groq-sdk/node_modules/webidl-conversions/lib/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var conversions = {};
module.exports = conversions;
function sign(x) {
    return x < 0 ? -1 : 1;
}
function evenRound(x) {
    // Round x to the nearest integer, choosing the even integer if it lies halfway between two.
    if (x % 1 === 0.5 && (x & 1) === 0) {
        return Math.floor(x);
    } else {
        return Math.round(x);
    }
}
function createNumberConversion(bitLength, typeOpts) {
    if (!typeOpts.unsigned) {
        --bitLength;
    }
    const lowerBound = typeOpts.unsigned ? 0 : -Math.pow(2, bitLength);
    const upperBound = Math.pow(2, bitLength) - 1;
    const moduloVal = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength) : Math.pow(2, bitLength);
    const moduloBound = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength - 1) : Math.pow(2, bitLength - 1);
    return function(V, opts) {
        if (!opts) opts = {};
        let x = +V;
        if (opts.enforceRange) {
            if (!Number.isFinite(x)) {
                throw new TypeError("Argument is not a finite number");
            }
            x = sign(x) * Math.floor(Math.abs(x));
            if (x < lowerBound || x > upperBound) {
                throw new TypeError("Argument is not in byte range");
            }
            return x;
        }
        if (!isNaN(x) && opts.clamp) {
            x = evenRound(x);
            if (x < lowerBound) x = lowerBound;
            if (x > upperBound) x = upperBound;
            return x;
        }
        if (!Number.isFinite(x) || x === 0) {
            return 0;
        }
        x = sign(x) * Math.floor(Math.abs(x));
        x = x % moduloVal;
        if (!typeOpts.unsigned && x >= moduloBound) {
            return x - moduloVal;
        } else if (typeOpts.unsigned) {
            if (x < 0) {
                x += moduloVal;
            } else if (x === -0) {
                return 0;
            }
        }
        return x;
    };
}
conversions["void"] = function() {
    return undefined;
};
conversions["boolean"] = function(val) {
    return !!val;
};
conversions["byte"] = createNumberConversion(8, {
    unsigned: false
});
conversions["octet"] = createNumberConversion(8, {
    unsigned: true
});
conversions["short"] = createNumberConversion(16, {
    unsigned: false
});
conversions["unsigned short"] = createNumberConversion(16, {
    unsigned: true
});
conversions["long"] = createNumberConversion(32, {
    unsigned: false
});
conversions["unsigned long"] = createNumberConversion(32, {
    unsigned: true
});
conversions["long long"] = createNumberConversion(32, {
    unsigned: false,
    moduloBitLength: 64
});
conversions["unsigned long long"] = createNumberConversion(32, {
    unsigned: true,
    moduloBitLength: 64
});
conversions["double"] = function(V) {
    const x = +V;
    if (!Number.isFinite(x)) {
        throw new TypeError("Argument is not a finite floating-point value");
    }
    return x;
};
conversions["unrestricted double"] = function(V) {
    const x = +V;
    if (isNaN(x)) {
        throw new TypeError("Argument is NaN");
    }
    return x;
};
// not quite valid, but good enough for JS
conversions["float"] = conversions["double"];
conversions["unrestricted float"] = conversions["unrestricted double"];
conversions["DOMString"] = function(V, opts) {
    if (!opts) opts = {};
    if (opts.treatNullAsEmptyString && V === null) {
        return "";
    }
    return String(V);
};
conversions["ByteString"] = function(V, opts) {
    const x = String(V);
    let c = undefined;
    for(let i = 0; (c = x.codePointAt(i)) !== undefined; ++i){
        if (c > 255) {
            throw new TypeError("Argument is not a valid bytestring");
        }
    }
    return x;
};
conversions["USVString"] = function(V) {
    const S = String(V);
    const n = S.length;
    const U = [];
    for(let i = 0; i < n; ++i){
        const c = S.charCodeAt(i);
        if (c < 0xD800 || c > 0xDFFF) {
            U.push(String.fromCodePoint(c));
        } else if (0xDC00 <= c && c <= 0xDFFF) {
            U.push(String.fromCodePoint(0xFFFD));
        } else {
            if (i === n - 1) {
                U.push(String.fromCodePoint(0xFFFD));
            } else {
                const d = S.charCodeAt(i + 1);
                if (0xDC00 <= d && d <= 0xDFFF) {
                    const a = c & 0x3FF;
                    const b = d & 0x3FF;
                    U.push(String.fromCodePoint((2 << 15) + (2 << 9) * a + b));
                    ++i;
                } else {
                    U.push(String.fromCodePoint(0xFFFD));
                }
            }
        }
    }
    return U.join('');
};
conversions["Date"] = function(V, opts) {
    if (!(V instanceof Date)) {
        throw new TypeError("Argument is not a Date object");
    }
    if (isNaN(V)) {
        return undefined;
    }
    return V;
};
conversions["RegExp"] = function(V, opts) {
    if (!(V instanceof RegExp)) {
        V = new RegExp(V);
    }
    return V;
};
}),
"[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/utils.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports.mixin = function mixin(target, source) {
    const keys = Object.getOwnPropertyNames(source);
    for(let i = 0; i < keys.length; ++i){
        Object.defineProperty(target, keys[i], Object.getOwnPropertyDescriptor(source, keys[i]));
    }
};
module.exports.wrapperSymbol = Symbol("wrapper");
module.exports.implSymbol = Symbol("impl");
module.exports.wrapperForImpl = function(impl) {
    return impl[module.exports.wrapperSymbol];
};
module.exports.implForWrapper = function(wrapper) {
    return wrapper[module.exports.implSymbol];
};
}),
"[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/url-state-machine.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const punycode = __turbopack_context__.r("[externals]/punycode [external] (punycode, cjs)");
const tr46 = __turbopack_context__.r("[project]/node_modules/groq-sdk/node_modules/tr46/index.js [app-rsc] (ecmascript)");
const specialSchemes = {
    ftp: 21,
    file: null,
    gopher: 70,
    http: 80,
    https: 443,
    ws: 80,
    wss: 443
};
const failure = Symbol("failure");
function countSymbols(str) {
    return punycode.ucs2.decode(str).length;
}
function at(input, idx) {
    const c = input[idx];
    return isNaN(c) ? undefined : String.fromCodePoint(c);
}
function isASCIIDigit(c) {
    return c >= 0x30 && c <= 0x39;
}
function isASCIIAlpha(c) {
    return c >= 0x41 && c <= 0x5A || c >= 0x61 && c <= 0x7A;
}
function isASCIIAlphanumeric(c) {
    return isASCIIAlpha(c) || isASCIIDigit(c);
}
function isASCIIHex(c) {
    return isASCIIDigit(c) || c >= 0x41 && c <= 0x46 || c >= 0x61 && c <= 0x66;
}
function isSingleDot(buffer) {
    return buffer === "." || buffer.toLowerCase() === "%2e";
}
function isDoubleDot(buffer) {
    buffer = buffer.toLowerCase();
    return buffer === ".." || buffer === "%2e." || buffer === ".%2e" || buffer === "%2e%2e";
}
function isWindowsDriveLetterCodePoints(cp1, cp2) {
    return isASCIIAlpha(cp1) && (cp2 === 58 || cp2 === 124);
}
function isWindowsDriveLetterString(string) {
    return string.length === 2 && isASCIIAlpha(string.codePointAt(0)) && (string[1] === ":" || string[1] === "|");
}
function isNormalizedWindowsDriveLetterString(string) {
    return string.length === 2 && isASCIIAlpha(string.codePointAt(0)) && string[1] === ":";
}
function containsForbiddenHostCodePoint(string) {
    return string.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|%|\/|:|\?|@|\[|\\|\]/) !== -1;
}
function containsForbiddenHostCodePointExcludingPercent(string) {
    return string.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|\/|:|\?|@|\[|\\|\]/) !== -1;
}
function isSpecialScheme(scheme) {
    return specialSchemes[scheme] !== undefined;
}
function isSpecial(url) {
    return isSpecialScheme(url.scheme);
}
function defaultPort(scheme) {
    return specialSchemes[scheme];
}
function percentEncode(c) {
    let hex = c.toString(16).toUpperCase();
    if (hex.length === 1) {
        hex = "0" + hex;
    }
    return "%" + hex;
}
function utf8PercentEncode(c) {
    const buf = new Buffer(c);
    let str = "";
    for(let i = 0; i < buf.length; ++i){
        str += percentEncode(buf[i]);
    }
    return str;
}
function utf8PercentDecode(str) {
    const input = new Buffer(str);
    const output = [];
    for(let i = 0; i < input.length; ++i){
        if (input[i] !== 37) {
            output.push(input[i]);
        } else if (input[i] === 37 && isASCIIHex(input[i + 1]) && isASCIIHex(input[i + 2])) {
            output.push(parseInt(input.slice(i + 1, i + 3).toString(), 16));
            i += 2;
        } else {
            output.push(input[i]);
        }
    }
    return new Buffer(output).toString();
}
function isC0ControlPercentEncode(c) {
    return c <= 0x1F || c > 0x7E;
}
const extraPathPercentEncodeSet = new Set([
    32,
    34,
    35,
    60,
    62,
    63,
    96,
    123,
    125
]);
function isPathPercentEncode(c) {
    return isC0ControlPercentEncode(c) || extraPathPercentEncodeSet.has(c);
}
const extraUserinfoPercentEncodeSet = new Set([
    47,
    58,
    59,
    61,
    64,
    91,
    92,
    93,
    94,
    124
]);
function isUserinfoPercentEncode(c) {
    return isPathPercentEncode(c) || extraUserinfoPercentEncodeSet.has(c);
}
function percentEncodeChar(c, encodeSetPredicate) {
    const cStr = String.fromCodePoint(c);
    if (encodeSetPredicate(c)) {
        return utf8PercentEncode(cStr);
    }
    return cStr;
}
function parseIPv4Number(input) {
    let R = 10;
    if (input.length >= 2 && input.charAt(0) === "0" && input.charAt(1).toLowerCase() === "x") {
        input = input.substring(2);
        R = 16;
    } else if (input.length >= 2 && input.charAt(0) === "0") {
        input = input.substring(1);
        R = 8;
    }
    if (input === "") {
        return 0;
    }
    const regex = R === 10 ? /[^0-9]/ : R === 16 ? /[^0-9A-Fa-f]/ : /[^0-7]/;
    if (regex.test(input)) {
        return failure;
    }
    return parseInt(input, R);
}
function parseIPv4(input) {
    const parts = input.split(".");
    if (parts[parts.length - 1] === "") {
        if (parts.length > 1) {
            parts.pop();
        }
    }
    if (parts.length > 4) {
        return input;
    }
    const numbers = [];
    for (const part of parts){
        if (part === "") {
            return input;
        }
        const n = parseIPv4Number(part);
        if (n === failure) {
            return input;
        }
        numbers.push(n);
    }
    for(let i = 0; i < numbers.length - 1; ++i){
        if (numbers[i] > 255) {
            return failure;
        }
    }
    if (numbers[numbers.length - 1] >= Math.pow(256, 5 - numbers.length)) {
        return failure;
    }
    let ipv4 = numbers.pop();
    let counter = 0;
    for (const n of numbers){
        ipv4 += n * Math.pow(256, 3 - counter);
        ++counter;
    }
    return ipv4;
}
function serializeIPv4(address) {
    let output = "";
    let n = address;
    for(let i = 1; i <= 4; ++i){
        output = String(n % 256) + output;
        if (i !== 4) {
            output = "." + output;
        }
        n = Math.floor(n / 256);
    }
    return output;
}
function parseIPv6(input) {
    const address = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ];
    let pieceIndex = 0;
    let compress = null;
    let pointer = 0;
    input = punycode.ucs2.decode(input);
    if (input[pointer] === 58) {
        if (input[pointer + 1] !== 58) {
            return failure;
        }
        pointer += 2;
        ++pieceIndex;
        compress = pieceIndex;
    }
    while(pointer < input.length){
        if (pieceIndex === 8) {
            return failure;
        }
        if (input[pointer] === 58) {
            if (compress !== null) {
                return failure;
            }
            ++pointer;
            ++pieceIndex;
            compress = pieceIndex;
            continue;
        }
        let value = 0;
        let length = 0;
        while(length < 4 && isASCIIHex(input[pointer])){
            value = value * 0x10 + parseInt(at(input, pointer), 16);
            ++pointer;
            ++length;
        }
        if (input[pointer] === 46) {
            if (length === 0) {
                return failure;
            }
            pointer -= length;
            if (pieceIndex > 6) {
                return failure;
            }
            let numbersSeen = 0;
            while(input[pointer] !== undefined){
                let ipv4Piece = null;
                if (numbersSeen > 0) {
                    if (input[pointer] === 46 && numbersSeen < 4) {
                        ++pointer;
                    } else {
                        return failure;
                    }
                }
                if (!isASCIIDigit(input[pointer])) {
                    return failure;
                }
                while(isASCIIDigit(input[pointer])){
                    const number = parseInt(at(input, pointer));
                    if (ipv4Piece === null) {
                        ipv4Piece = number;
                    } else if (ipv4Piece === 0) {
                        return failure;
                    } else {
                        ipv4Piece = ipv4Piece * 10 + number;
                    }
                    if (ipv4Piece > 255) {
                        return failure;
                    }
                    ++pointer;
                }
                address[pieceIndex] = address[pieceIndex] * 0x100 + ipv4Piece;
                ++numbersSeen;
                if (numbersSeen === 2 || numbersSeen === 4) {
                    ++pieceIndex;
                }
            }
            if (numbersSeen !== 4) {
                return failure;
            }
            break;
        } else if (input[pointer] === 58) {
            ++pointer;
            if (input[pointer] === undefined) {
                return failure;
            }
        } else if (input[pointer] !== undefined) {
            return failure;
        }
        address[pieceIndex] = value;
        ++pieceIndex;
    }
    if (compress !== null) {
        let swaps = pieceIndex - compress;
        pieceIndex = 7;
        while(pieceIndex !== 0 && swaps > 0){
            const temp = address[compress + swaps - 1];
            address[compress + swaps - 1] = address[pieceIndex];
            address[pieceIndex] = temp;
            --pieceIndex;
            --swaps;
        }
    } else if (compress === null && pieceIndex !== 8) {
        return failure;
    }
    return address;
}
function serializeIPv6(address) {
    let output = "";
    const seqResult = findLongestZeroSequence(address);
    const compress = seqResult.idx;
    let ignore0 = false;
    for(let pieceIndex = 0; pieceIndex <= 7; ++pieceIndex){
        if (ignore0 && address[pieceIndex] === 0) {
            continue;
        } else if (ignore0) {
            ignore0 = false;
        }
        if (compress === pieceIndex) {
            const separator = pieceIndex === 0 ? "::" : ":";
            output += separator;
            ignore0 = true;
            continue;
        }
        output += address[pieceIndex].toString(16);
        if (pieceIndex !== 7) {
            output += ":";
        }
    }
    return output;
}
function parseHost(input, isSpecialArg) {
    if (input[0] === "[") {
        if (input[input.length - 1] !== "]") {
            return failure;
        }
        return parseIPv6(input.substring(1, input.length - 1));
    }
    if (!isSpecialArg) {
        return parseOpaqueHost(input);
    }
    const domain = utf8PercentDecode(input);
    const asciiDomain = tr46.toASCII(domain, false, tr46.PROCESSING_OPTIONS.NONTRANSITIONAL, false);
    if (asciiDomain === null) {
        return failure;
    }
    if (containsForbiddenHostCodePoint(asciiDomain)) {
        return failure;
    }
    const ipv4Host = parseIPv4(asciiDomain);
    if (typeof ipv4Host === "number" || ipv4Host === failure) {
        return ipv4Host;
    }
    return asciiDomain;
}
function parseOpaqueHost(input) {
    if (containsForbiddenHostCodePointExcludingPercent(input)) {
        return failure;
    }
    let output = "";
    const decoded = punycode.ucs2.decode(input);
    for(let i = 0; i < decoded.length; ++i){
        output += percentEncodeChar(decoded[i], isC0ControlPercentEncode);
    }
    return output;
}
function findLongestZeroSequence(arr) {
    let maxIdx = null;
    let maxLen = 1; // only find elements > 1
    let currStart = null;
    let currLen = 0;
    for(let i = 0; i < arr.length; ++i){
        if (arr[i] !== 0) {
            if (currLen > maxLen) {
                maxIdx = currStart;
                maxLen = currLen;
            }
            currStart = null;
            currLen = 0;
        } else {
            if (currStart === null) {
                currStart = i;
            }
            ++currLen;
        }
    }
    // if trailing zeros
    if (currLen > maxLen) {
        maxIdx = currStart;
        maxLen = currLen;
    }
    return {
        idx: maxIdx,
        len: maxLen
    };
}
function serializeHost(host) {
    if (typeof host === "number") {
        return serializeIPv4(host);
    }
    // IPv6 serializer
    if (host instanceof Array) {
        return "[" + serializeIPv6(host) + "]";
    }
    return host;
}
function trimControlChars(url) {
    return url.replace(/^[\u0000-\u001F\u0020]+|[\u0000-\u001F\u0020]+$/g, "");
}
function trimTabAndNewline(url) {
    return url.replace(/\u0009|\u000A|\u000D/g, "");
}
function shortenPath(url) {
    const path = url.path;
    if (path.length === 0) {
        return;
    }
    if (url.scheme === "file" && path.length === 1 && isNormalizedWindowsDriveLetter(path[0])) {
        return;
    }
    path.pop();
}
function includesCredentials(url) {
    return url.username !== "" || url.password !== "";
}
function cannotHaveAUsernamePasswordPort(url) {
    return url.host === null || url.host === "" || url.cannotBeABaseURL || url.scheme === "file";
}
function isNormalizedWindowsDriveLetter(string) {
    return /^[A-Za-z]:$/.test(string);
}
function URLStateMachine(input, base, encodingOverride, url, stateOverride) {
    this.pointer = 0;
    this.input = input;
    this.base = base || null;
    this.encodingOverride = encodingOverride || "utf-8";
    this.stateOverride = stateOverride;
    this.url = url;
    this.failure = false;
    this.parseError = false;
    if (!this.url) {
        this.url = {
            scheme: "",
            username: "",
            password: "",
            host: null,
            port: null,
            path: [],
            query: null,
            fragment: null,
            cannotBeABaseURL: false
        };
        const res = trimControlChars(this.input);
        if (res !== this.input) {
            this.parseError = true;
        }
        this.input = res;
    }
    const res = trimTabAndNewline(this.input);
    if (res !== this.input) {
        this.parseError = true;
    }
    this.input = res;
    this.state = stateOverride || "scheme start";
    this.buffer = "";
    this.atFlag = false;
    this.arrFlag = false;
    this.passwordTokenSeenFlag = false;
    this.input = punycode.ucs2.decode(this.input);
    for(; this.pointer <= this.input.length; ++this.pointer){
        const c = this.input[this.pointer];
        const cStr = isNaN(c) ? undefined : String.fromCodePoint(c);
        // exec state machine
        const ret = this["parse " + this.state](c, cStr);
        if (!ret) {
            break; // terminate algorithm
        } else if (ret === failure) {
            this.failure = true;
            break;
        }
    }
}
URLStateMachine.prototype["parse scheme start"] = function parseSchemeStart(c, cStr) {
    if (isASCIIAlpha(c)) {
        this.buffer += cStr.toLowerCase();
        this.state = "scheme";
    } else if (!this.stateOverride) {
        this.state = "no scheme";
        --this.pointer;
    } else {
        this.parseError = true;
        return failure;
    }
    return true;
};
URLStateMachine.prototype["parse scheme"] = function parseScheme(c, cStr) {
    if (isASCIIAlphanumeric(c) || c === 43 || c === 45 || c === 46) {
        this.buffer += cStr.toLowerCase();
    } else if (c === 58) {
        if (this.stateOverride) {
            if (isSpecial(this.url) && !isSpecialScheme(this.buffer)) {
                return false;
            }
            if (!isSpecial(this.url) && isSpecialScheme(this.buffer)) {
                return false;
            }
            if ((includesCredentials(this.url) || this.url.port !== null) && this.buffer === "file") {
                return false;
            }
            if (this.url.scheme === "file" && (this.url.host === "" || this.url.host === null)) {
                return false;
            }
        }
        this.url.scheme = this.buffer;
        this.buffer = "";
        if (this.stateOverride) {
            return false;
        }
        if (this.url.scheme === "file") {
            if (this.input[this.pointer + 1] !== 47 || this.input[this.pointer + 2] !== 47) {
                this.parseError = true;
            }
            this.state = "file";
        } else if (isSpecial(this.url) && this.base !== null && this.base.scheme === this.url.scheme) {
            this.state = "special relative or authority";
        } else if (isSpecial(this.url)) {
            this.state = "special authority slashes";
        } else if (this.input[this.pointer + 1] === 47) {
            this.state = "path or authority";
            ++this.pointer;
        } else {
            this.url.cannotBeABaseURL = true;
            this.url.path.push("");
            this.state = "cannot-be-a-base-URL path";
        }
    } else if (!this.stateOverride) {
        this.buffer = "";
        this.state = "no scheme";
        this.pointer = -1;
    } else {
        this.parseError = true;
        return failure;
    }
    return true;
};
URLStateMachine.prototype["parse no scheme"] = function parseNoScheme(c) {
    if (this.base === null || this.base.cannotBeABaseURL && c !== 35) {
        return failure;
    } else if (this.base.cannotBeABaseURL && c === 35) {
        this.url.scheme = this.base.scheme;
        this.url.path = this.base.path.slice();
        this.url.query = this.base.query;
        this.url.fragment = "";
        this.url.cannotBeABaseURL = true;
        this.state = "fragment";
    } else if (this.base.scheme === "file") {
        this.state = "file";
        --this.pointer;
    } else {
        this.state = "relative";
        --this.pointer;
    }
    return true;
};
URLStateMachine.prototype["parse special relative or authority"] = function parseSpecialRelativeOrAuthority(c) {
    if (c === 47 && this.input[this.pointer + 1] === 47) {
        this.state = "special authority ignore slashes";
        ++this.pointer;
    } else {
        this.parseError = true;
        this.state = "relative";
        --this.pointer;
    }
    return true;
};
URLStateMachine.prototype["parse path or authority"] = function parsePathOrAuthority(c) {
    if (c === 47) {
        this.state = "authority";
    } else {
        this.state = "path";
        --this.pointer;
    }
    return true;
};
URLStateMachine.prototype["parse relative"] = function parseRelative(c) {
    this.url.scheme = this.base.scheme;
    if (isNaN(c)) {
        this.url.username = this.base.username;
        this.url.password = this.base.password;
        this.url.host = this.base.host;
        this.url.port = this.base.port;
        this.url.path = this.base.path.slice();
        this.url.query = this.base.query;
    } else if (c === 47) {
        this.state = "relative slash";
    } else if (c === 63) {
        this.url.username = this.base.username;
        this.url.password = this.base.password;
        this.url.host = this.base.host;
        this.url.port = this.base.port;
        this.url.path = this.base.path.slice();
        this.url.query = "";
        this.state = "query";
    } else if (c === 35) {
        this.url.username = this.base.username;
        this.url.password = this.base.password;
        this.url.host = this.base.host;
        this.url.port = this.base.port;
        this.url.path = this.base.path.slice();
        this.url.query = this.base.query;
        this.url.fragment = "";
        this.state = "fragment";
    } else if (isSpecial(this.url) && c === 92) {
        this.parseError = true;
        this.state = "relative slash";
    } else {
        this.url.username = this.base.username;
        this.url.password = this.base.password;
        this.url.host = this.base.host;
        this.url.port = this.base.port;
        this.url.path = this.base.path.slice(0, this.base.path.length - 1);
        this.state = "path";
        --this.pointer;
    }
    return true;
};
URLStateMachine.prototype["parse relative slash"] = function parseRelativeSlash(c) {
    if (isSpecial(this.url) && (c === 47 || c === 92)) {
        if (c === 92) {
            this.parseError = true;
        }
        this.state = "special authority ignore slashes";
    } else if (c === 47) {
        this.state = "authority";
    } else {
        this.url.username = this.base.username;
        this.url.password = this.base.password;
        this.url.host = this.base.host;
        this.url.port = this.base.port;
        this.state = "path";
        --this.pointer;
    }
    return true;
};
URLStateMachine.prototype["parse special authority slashes"] = function parseSpecialAuthoritySlashes(c) {
    if (c === 47 && this.input[this.pointer + 1] === 47) {
        this.state = "special authority ignore slashes";
        ++this.pointer;
    } else {
        this.parseError = true;
        this.state = "special authority ignore slashes";
        --this.pointer;
    }
    return true;
};
URLStateMachine.prototype["parse special authority ignore slashes"] = function parseSpecialAuthorityIgnoreSlashes(c) {
    if (c !== 47 && c !== 92) {
        this.state = "authority";
        --this.pointer;
    } else {
        this.parseError = true;
    }
    return true;
};
URLStateMachine.prototype["parse authority"] = function parseAuthority(c, cStr) {
    if (c === 64) {
        this.parseError = true;
        if (this.atFlag) {
            this.buffer = "%40" + this.buffer;
        }
        this.atFlag = true;
        // careful, this is based on buffer and has its own pointer (this.pointer != pointer) and inner chars
        const len = countSymbols(this.buffer);
        for(let pointer = 0; pointer < len; ++pointer){
            const codePoint = this.buffer.codePointAt(pointer);
            if (codePoint === 58 && !this.passwordTokenSeenFlag) {
                this.passwordTokenSeenFlag = true;
                continue;
            }
            const encodedCodePoints = percentEncodeChar(codePoint, isUserinfoPercentEncode);
            if (this.passwordTokenSeenFlag) {
                this.url.password += encodedCodePoints;
            } else {
                this.url.username += encodedCodePoints;
            }
        }
        this.buffer = "";
    } else if (isNaN(c) || c === 47 || c === 63 || c === 35 || isSpecial(this.url) && c === 92) {
        if (this.atFlag && this.buffer === "") {
            this.parseError = true;
            return failure;
        }
        this.pointer -= countSymbols(this.buffer) + 1;
        this.buffer = "";
        this.state = "host";
    } else {
        this.buffer += cStr;
    }
    return true;
};
URLStateMachine.prototype["parse hostname"] = URLStateMachine.prototype["parse host"] = function parseHostName(c, cStr) {
    if (this.stateOverride && this.url.scheme === "file") {
        --this.pointer;
        this.state = "file host";
    } else if (c === 58 && !this.arrFlag) {
        if (this.buffer === "") {
            this.parseError = true;
            return failure;
        }
        const host = parseHost(this.buffer, isSpecial(this.url));
        if (host === failure) {
            return failure;
        }
        this.url.host = host;
        this.buffer = "";
        this.state = "port";
        if (this.stateOverride === "hostname") {
            return false;
        }
    } else if (isNaN(c) || c === 47 || c === 63 || c === 35 || isSpecial(this.url) && c === 92) {
        --this.pointer;
        if (isSpecial(this.url) && this.buffer === "") {
            this.parseError = true;
            return failure;
        } else if (this.stateOverride && this.buffer === "" && (includesCredentials(this.url) || this.url.port !== null)) {
            this.parseError = true;
            return false;
        }
        const host = parseHost(this.buffer, isSpecial(this.url));
        if (host === failure) {
            return failure;
        }
        this.url.host = host;
        this.buffer = "";
        this.state = "path start";
        if (this.stateOverride) {
            return false;
        }
    } else {
        if (c === 91) {
            this.arrFlag = true;
        } else if (c === 93) {
            this.arrFlag = false;
        }
        this.buffer += cStr;
    }
    return true;
};
URLStateMachine.prototype["parse port"] = function parsePort(c, cStr) {
    if (isASCIIDigit(c)) {
        this.buffer += cStr;
    } else if (isNaN(c) || c === 47 || c === 63 || c === 35 || isSpecial(this.url) && c === 92 || this.stateOverride) {
        if (this.buffer !== "") {
            const port = parseInt(this.buffer);
            if (port > Math.pow(2, 16) - 1) {
                this.parseError = true;
                return failure;
            }
            this.url.port = port === defaultPort(this.url.scheme) ? null : port;
            this.buffer = "";
        }
        if (this.stateOverride) {
            return false;
        }
        this.state = "path start";
        --this.pointer;
    } else {
        this.parseError = true;
        return failure;
    }
    return true;
};
const fileOtherwiseCodePoints = new Set([
    47,
    92,
    63,
    35
]);
URLStateMachine.prototype["parse file"] = function parseFile(c) {
    this.url.scheme = "file";
    if (c === 47 || c === 92) {
        if (c === 92) {
            this.parseError = true;
        }
        this.state = "file slash";
    } else if (this.base !== null && this.base.scheme === "file") {
        if (isNaN(c)) {
            this.url.host = this.base.host;
            this.url.path = this.base.path.slice();
            this.url.query = this.base.query;
        } else if (c === 63) {
            this.url.host = this.base.host;
            this.url.path = this.base.path.slice();
            this.url.query = "";
            this.state = "query";
        } else if (c === 35) {
            this.url.host = this.base.host;
            this.url.path = this.base.path.slice();
            this.url.query = this.base.query;
            this.url.fragment = "";
            this.state = "fragment";
        } else {
            if (this.input.length - this.pointer - 1 === 0 || // remaining consists of 0 code points
            !isWindowsDriveLetterCodePoints(c, this.input[this.pointer + 1]) || this.input.length - this.pointer - 1 >= 2 && // remaining has at least 2 code points
            !fileOtherwiseCodePoints.has(this.input[this.pointer + 2])) {
                this.url.host = this.base.host;
                this.url.path = this.base.path.slice();
                shortenPath(this.url);
            } else {
                this.parseError = true;
            }
            this.state = "path";
            --this.pointer;
        }
    } else {
        this.state = "path";
        --this.pointer;
    }
    return true;
};
URLStateMachine.prototype["parse file slash"] = function parseFileSlash(c) {
    if (c === 47 || c === 92) {
        if (c === 92) {
            this.parseError = true;
        }
        this.state = "file host";
    } else {
        if (this.base !== null && this.base.scheme === "file") {
            if (isNormalizedWindowsDriveLetterString(this.base.path[0])) {
                this.url.path.push(this.base.path[0]);
            } else {
                this.url.host = this.base.host;
            }
        }
        this.state = "path";
        --this.pointer;
    }
    return true;
};
URLStateMachine.prototype["parse file host"] = function parseFileHost(c, cStr) {
    if (isNaN(c) || c === 47 || c === 92 || c === 63 || c === 35) {
        --this.pointer;
        if (!this.stateOverride && isWindowsDriveLetterString(this.buffer)) {
            this.parseError = true;
            this.state = "path";
        } else if (this.buffer === "") {
            this.url.host = "";
            if (this.stateOverride) {
                return false;
            }
            this.state = "path start";
        } else {
            let host = parseHost(this.buffer, isSpecial(this.url));
            if (host === failure) {
                return failure;
            }
            if (host === "localhost") {
                host = "";
            }
            this.url.host = host;
            if (this.stateOverride) {
                return false;
            }
            this.buffer = "";
            this.state = "path start";
        }
    } else {
        this.buffer += cStr;
    }
    return true;
};
URLStateMachine.prototype["parse path start"] = function parsePathStart(c) {
    if (isSpecial(this.url)) {
        if (c === 92) {
            this.parseError = true;
        }
        this.state = "path";
        if (c !== 47 && c !== 92) {
            --this.pointer;
        }
    } else if (!this.stateOverride && c === 63) {
        this.url.query = "";
        this.state = "query";
    } else if (!this.stateOverride && c === 35) {
        this.url.fragment = "";
        this.state = "fragment";
    } else if (c !== undefined) {
        this.state = "path";
        if (c !== 47) {
            --this.pointer;
        }
    }
    return true;
};
URLStateMachine.prototype["parse path"] = function parsePath(c) {
    if (isNaN(c) || c === 47 || isSpecial(this.url) && c === 92 || !this.stateOverride && (c === 63 || c === 35)) {
        if (isSpecial(this.url) && c === 92) {
            this.parseError = true;
        }
        if (isDoubleDot(this.buffer)) {
            shortenPath(this.url);
            if (c !== 47 && !(isSpecial(this.url) && c === 92)) {
                this.url.path.push("");
            }
        } else if (isSingleDot(this.buffer) && c !== 47 && !(isSpecial(this.url) && c === 92)) {
            this.url.path.push("");
        } else if (!isSingleDot(this.buffer)) {
            if (this.url.scheme === "file" && this.url.path.length === 0 && isWindowsDriveLetterString(this.buffer)) {
                if (this.url.host !== "" && this.url.host !== null) {
                    this.parseError = true;
                    this.url.host = "";
                }
                this.buffer = this.buffer[0] + ":";
            }
            this.url.path.push(this.buffer);
        }
        this.buffer = "";
        if (this.url.scheme === "file" && (c === undefined || c === 63 || c === 35)) {
            while(this.url.path.length > 1 && this.url.path[0] === ""){
                this.parseError = true;
                this.url.path.shift();
            }
        }
        if (c === 63) {
            this.url.query = "";
            this.state = "query";
        }
        if (c === 35) {
            this.url.fragment = "";
            this.state = "fragment";
        }
    } else {
        // TODO: If c is not a URL code point and not "%", parse error.
        if (c === 37 && (!isASCIIHex(this.input[this.pointer + 1]) || !isASCIIHex(this.input[this.pointer + 2]))) {
            this.parseError = true;
        }
        this.buffer += percentEncodeChar(c, isPathPercentEncode);
    }
    return true;
};
URLStateMachine.prototype["parse cannot-be-a-base-URL path"] = function parseCannotBeABaseURLPath(c) {
    if (c === 63) {
        this.url.query = "";
        this.state = "query";
    } else if (c === 35) {
        this.url.fragment = "";
        this.state = "fragment";
    } else {
        // TODO: Add: not a URL code point
        if (!isNaN(c) && c !== 37) {
            this.parseError = true;
        }
        if (c === 37 && (!isASCIIHex(this.input[this.pointer + 1]) || !isASCIIHex(this.input[this.pointer + 2]))) {
            this.parseError = true;
        }
        if (!isNaN(c)) {
            this.url.path[0] = this.url.path[0] + percentEncodeChar(c, isC0ControlPercentEncode);
        }
    }
    return true;
};
URLStateMachine.prototype["parse query"] = function parseQuery(c, cStr) {
    if (isNaN(c) || !this.stateOverride && c === 35) {
        if (!isSpecial(this.url) || this.url.scheme === "ws" || this.url.scheme === "wss") {
            this.encodingOverride = "utf-8";
        }
        const buffer = new Buffer(this.buffer); // TODO: Use encoding override instead
        for(let i = 0; i < buffer.length; ++i){
            if (buffer[i] < 0x21 || buffer[i] > 0x7E || buffer[i] === 0x22 || buffer[i] === 0x23 || buffer[i] === 0x3C || buffer[i] === 0x3E) {
                this.url.query += percentEncode(buffer[i]);
            } else {
                this.url.query += String.fromCodePoint(buffer[i]);
            }
        }
        this.buffer = "";
        if (c === 35) {
            this.url.fragment = "";
            this.state = "fragment";
        }
    } else {
        // TODO: If c is not a URL code point and not "%", parse error.
        if (c === 37 && (!isASCIIHex(this.input[this.pointer + 1]) || !isASCIIHex(this.input[this.pointer + 2]))) {
            this.parseError = true;
        }
        this.buffer += cStr;
    }
    return true;
};
URLStateMachine.prototype["parse fragment"] = function parseFragment(c) {
    if (isNaN(c)) {} else if (c === 0x0) {
        this.parseError = true;
    } else {
        // TODO: If c is not a URL code point and not "%", parse error.
        if (c === 37 && (!isASCIIHex(this.input[this.pointer + 1]) || !isASCIIHex(this.input[this.pointer + 2]))) {
            this.parseError = true;
        }
        this.url.fragment += percentEncodeChar(c, isC0ControlPercentEncode);
    }
    return true;
};
function serializeURL(url, excludeFragment) {
    let output = url.scheme + ":";
    if (url.host !== null) {
        output += "//";
        if (url.username !== "" || url.password !== "") {
            output += url.username;
            if (url.password !== "") {
                output += ":" + url.password;
            }
            output += "@";
        }
        output += serializeHost(url.host);
        if (url.port !== null) {
            output += ":" + url.port;
        }
    } else if (url.host === null && url.scheme === "file") {
        output += "//";
    }
    if (url.cannotBeABaseURL) {
        output += url.path[0];
    } else {
        for (const string of url.path){
            output += "/" + string;
        }
    }
    if (url.query !== null) {
        output += "?" + url.query;
    }
    if (!excludeFragment && url.fragment !== null) {
        output += "#" + url.fragment;
    }
    return output;
}
function serializeOrigin(tuple) {
    let result = tuple.scheme + "://";
    result += serializeHost(tuple.host);
    if (tuple.port !== null) {
        result += ":" + tuple.port;
    }
    return result;
}
module.exports.serializeURL = serializeURL;
module.exports.serializeURLOrigin = function(url) {
    // https://url.spec.whatwg.org/#concept-url-origin
    switch(url.scheme){
        case "blob":
            try {
                return module.exports.serializeURLOrigin(module.exports.parseURL(url.path[0]));
            } catch (e) {
                // serializing an opaque origin returns "null"
                return "null";
            }
        case "ftp":
        case "gopher":
        case "http":
        case "https":
        case "ws":
        case "wss":
            return serializeOrigin({
                scheme: url.scheme,
                host: url.host,
                port: url.port
            });
        case "file":
            // spec says "exercise to the reader", chrome says "file://"
            return "file://";
        default:
            // serializing an opaque origin returns "null"
            return "null";
    }
};
module.exports.basicURLParse = function(input, options) {
    if (options === undefined) {
        options = {};
    }
    const usm = new URLStateMachine(input, options.baseURL, options.encodingOverride, options.url, options.stateOverride);
    if (usm.failure) {
        return "failure";
    }
    return usm.url;
};
module.exports.setTheUsername = function(url, username) {
    url.username = "";
    const decoded = punycode.ucs2.decode(username);
    for(let i = 0; i < decoded.length; ++i){
        url.username += percentEncodeChar(decoded[i], isUserinfoPercentEncode);
    }
};
module.exports.setThePassword = function(url, password) {
    url.password = "";
    const decoded = punycode.ucs2.decode(password);
    for(let i = 0; i < decoded.length; ++i){
        url.password += percentEncodeChar(decoded[i], isUserinfoPercentEncode);
    }
};
module.exports.serializeHost = serializeHost;
module.exports.cannotHaveAUsernamePasswordPort = cannotHaveAUsernamePasswordPort;
module.exports.serializeInteger = function(integer) {
    return String(integer);
};
module.exports.parseURL = function(input, options) {
    if (options === undefined) {
        options = {};
    }
    // We don't handle blobs, so this just delegates:
    return module.exports.basicURLParse(input, {
        baseURL: options.baseURL,
        encodingOverride: options.encodingOverride
    });
};
}),
"[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/URL-impl.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const usm = __turbopack_context__.r("[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/url-state-machine.js [app-rsc] (ecmascript)");
exports.implementation = class URLImpl {
    constructor(constructorArgs){
        const url = constructorArgs[0];
        const base = constructorArgs[1];
        let parsedBase = null;
        if (base !== undefined) {
            parsedBase = usm.basicURLParse(base);
            if (parsedBase === "failure") {
                throw new TypeError("Invalid base URL");
            }
        }
        const parsedURL = usm.basicURLParse(url, {
            baseURL: parsedBase
        });
        if (parsedURL === "failure") {
            throw new TypeError("Invalid URL");
        }
        this._url = parsedURL;
    // TODO: query stuff
    }
    get href() {
        return usm.serializeURL(this._url);
    }
    set href(v) {
        const parsedURL = usm.basicURLParse(v);
        if (parsedURL === "failure") {
            throw new TypeError("Invalid URL");
        }
        this._url = parsedURL;
    }
    get origin() {
        return usm.serializeURLOrigin(this._url);
    }
    get protocol() {
        return this._url.scheme + ":";
    }
    set protocol(v) {
        usm.basicURLParse(v + ":", {
            url: this._url,
            stateOverride: "scheme start"
        });
    }
    get username() {
        return this._url.username;
    }
    set username(v) {
        if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
            return;
        }
        usm.setTheUsername(this._url, v);
    }
    get password() {
        return this._url.password;
    }
    set password(v) {
        if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
            return;
        }
        usm.setThePassword(this._url, v);
    }
    get host() {
        const url = this._url;
        if (url.host === null) {
            return "";
        }
        if (url.port === null) {
            return usm.serializeHost(url.host);
        }
        return usm.serializeHost(url.host) + ":" + usm.serializeInteger(url.port);
    }
    set host(v) {
        if (this._url.cannotBeABaseURL) {
            return;
        }
        usm.basicURLParse(v, {
            url: this._url,
            stateOverride: "host"
        });
    }
    get hostname() {
        if (this._url.host === null) {
            return "";
        }
        return usm.serializeHost(this._url.host);
    }
    set hostname(v) {
        if (this._url.cannotBeABaseURL) {
            return;
        }
        usm.basicURLParse(v, {
            url: this._url,
            stateOverride: "hostname"
        });
    }
    get port() {
        if (this._url.port === null) {
            return "";
        }
        return usm.serializeInteger(this._url.port);
    }
    set port(v) {
        if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
            return;
        }
        if (v === "") {
            this._url.port = null;
        } else {
            usm.basicURLParse(v, {
                url: this._url,
                stateOverride: "port"
            });
        }
    }
    get pathname() {
        if (this._url.cannotBeABaseURL) {
            return this._url.path[0];
        }
        if (this._url.path.length === 0) {
            return "";
        }
        return "/" + this._url.path.join("/");
    }
    set pathname(v) {
        if (this._url.cannotBeABaseURL) {
            return;
        }
        this._url.path = [];
        usm.basicURLParse(v, {
            url: this._url,
            stateOverride: "path start"
        });
    }
    get search() {
        if (this._url.query === null || this._url.query === "") {
            return "";
        }
        return "?" + this._url.query;
    }
    set search(v) {
        // TODO: query stuff
        const url = this._url;
        if (v === "") {
            url.query = null;
            return;
        }
        const input = v[0] === "?" ? v.substring(1) : v;
        url.query = "";
        usm.basicURLParse(input, {
            url,
            stateOverride: "query"
        });
    }
    get hash() {
        if (this._url.fragment === null || this._url.fragment === "") {
            return "";
        }
        return "#" + this._url.fragment;
    }
    set hash(v) {
        if (v === "") {
            this._url.fragment = null;
            return;
        }
        const input = v[0] === "#" ? v.substring(1) : v;
        this._url.fragment = "";
        usm.basicURLParse(input, {
            url: this._url,
            stateOverride: "fragment"
        });
    }
    toJSON() {
        return this.href;
    }
};
}),
"[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/URL.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const conversions = __turbopack_context__.r("[project]/node_modules/groq-sdk/node_modules/webidl-conversions/lib/index.js [app-rsc] (ecmascript)");
const utils = __turbopack_context__.r("[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/utils.js [app-rsc] (ecmascript)");
const Impl = __turbopack_context__.r("[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/URL-impl.js [app-rsc] (ecmascript)");
const impl = utils.implSymbol;
function URL(url) {
    if (!this || this[impl] || !(this instanceof URL)) {
        throw new TypeError("Failed to construct 'URL': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
    }
    if (arguments.length < 1) {
        throw new TypeError("Failed to construct 'URL': 1 argument required, but only " + arguments.length + " present.");
    }
    const args = [];
    for(let i = 0; i < arguments.length && i < 2; ++i){
        args[i] = arguments[i];
    }
    args[0] = conversions["USVString"](args[0]);
    if (args[1] !== undefined) {
        args[1] = conversions["USVString"](args[1]);
    }
    module.exports.setup(this, args);
}
URL.prototype.toJSON = function toJSON() {
    if (!this || !module.exports.is(this)) {
        throw new TypeError("Illegal invocation");
    }
    const args = [];
    for(let i = 0; i < arguments.length && i < 0; ++i){
        args[i] = arguments[i];
    }
    return this[impl].toJSON.apply(this[impl], args);
};
Object.defineProperty(URL.prototype, "href", {
    get () {
        return this[impl].href;
    },
    set (V) {
        V = conversions["USVString"](V);
        this[impl].href = V;
    },
    enumerable: true,
    configurable: true
});
URL.prototype.toString = function() {
    if (!this || !module.exports.is(this)) {
        throw new TypeError("Illegal invocation");
    }
    return this.href;
};
Object.defineProperty(URL.prototype, "origin", {
    get () {
        return this[impl].origin;
    },
    enumerable: true,
    configurable: true
});
Object.defineProperty(URL.prototype, "protocol", {
    get () {
        return this[impl].protocol;
    },
    set (V) {
        V = conversions["USVString"](V);
        this[impl].protocol = V;
    },
    enumerable: true,
    configurable: true
});
Object.defineProperty(URL.prototype, "username", {
    get () {
        return this[impl].username;
    },
    set (V) {
        V = conversions["USVString"](V);
        this[impl].username = V;
    },
    enumerable: true,
    configurable: true
});
Object.defineProperty(URL.prototype, "password", {
    get () {
        return this[impl].password;
    },
    set (V) {
        V = conversions["USVString"](V);
        this[impl].password = V;
    },
    enumerable: true,
    configurable: true
});
Object.defineProperty(URL.prototype, "host", {
    get () {
        return this[impl].host;
    },
    set (V) {
        V = conversions["USVString"](V);
        this[impl].host = V;
    },
    enumerable: true,
    configurable: true
});
Object.defineProperty(URL.prototype, "hostname", {
    get () {
        return this[impl].hostname;
    },
    set (V) {
        V = conversions["USVString"](V);
        this[impl].hostname = V;
    },
    enumerable: true,
    configurable: true
});
Object.defineProperty(URL.prototype, "port", {
    get () {
        return this[impl].port;
    },
    set (V) {
        V = conversions["USVString"](V);
        this[impl].port = V;
    },
    enumerable: true,
    configurable: true
});
Object.defineProperty(URL.prototype, "pathname", {
    get () {
        return this[impl].pathname;
    },
    set (V) {
        V = conversions["USVString"](V);
        this[impl].pathname = V;
    },
    enumerable: true,
    configurable: true
});
Object.defineProperty(URL.prototype, "search", {
    get () {
        return this[impl].search;
    },
    set (V) {
        V = conversions["USVString"](V);
        this[impl].search = V;
    },
    enumerable: true,
    configurable: true
});
Object.defineProperty(URL.prototype, "hash", {
    get () {
        return this[impl].hash;
    },
    set (V) {
        V = conversions["USVString"](V);
        this[impl].hash = V;
    },
    enumerable: true,
    configurable: true
});
module.exports = {
    is (obj) {
        return !!obj && obj[impl] instanceof Impl.implementation;
    },
    create (constructorArgs, privateData) {
        let obj = Object.create(URL.prototype);
        this.setup(obj, constructorArgs, privateData);
        return obj;
    },
    setup (obj, constructorArgs, privateData) {
        if (!privateData) privateData = {};
        privateData.wrapper = obj;
        obj[impl] = new Impl.implementation(constructorArgs, privateData);
        obj[impl][utils.wrapperSymbol] = obj;
    },
    interface: URL,
    expose: {
        Window: {
            URL: URL
        },
        Worker: {
            URL: URL
        }
    }
};
}),
"[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/public-api.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

exports.URL = __turbopack_context__.r("[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/URL.js [app-rsc] (ecmascript)").interface;
exports.serializeURL = __turbopack_context__.r("[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/url-state-machine.js [app-rsc] (ecmascript)").serializeURL;
exports.serializeURLOrigin = __turbopack_context__.r("[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/url-state-machine.js [app-rsc] (ecmascript)").serializeURLOrigin;
exports.basicURLParse = __turbopack_context__.r("[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/url-state-machine.js [app-rsc] (ecmascript)").basicURLParse;
exports.setTheUsername = __turbopack_context__.r("[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/url-state-machine.js [app-rsc] (ecmascript)").setTheUsername;
exports.setThePassword = __turbopack_context__.r("[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/url-state-machine.js [app-rsc] (ecmascript)").setThePassword;
exports.serializeHost = __turbopack_context__.r("[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/url-state-machine.js [app-rsc] (ecmascript)").serializeHost;
exports.serializeInteger = __turbopack_context__.r("[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/url-state-machine.js [app-rsc] (ecmascript)").serializeInteger;
exports.parseURL = __turbopack_context__.r("[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/url-state-machine.js [app-rsc] (ecmascript)").parseURL;
}),
"[project]/node_modules/groq-sdk/node_modules/node-fetch/lib/index.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AbortError",
    ()=>AbortError,
    "FetchError",
    ()=>FetchError,
    "Headers",
    ()=>Headers,
    "Request",
    ()=>Request,
    "Response",
    ()=>Response,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/stream [external] (stream, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$http__$5b$external$5d$__$28$http$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/http [external] (http, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$url__$5b$external$5d$__$28$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/url [external] (url, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$node_modules$2f$whatwg$2d$url$2f$lib$2f$public$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/groq-sdk/node_modules/whatwg-url/lib/public-api.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$https__$5b$external$5d$__$28$https$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/https [external] (https, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$zlib__$5b$external$5d$__$28$zlib$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/zlib [external] (zlib, cjs)");
;
;
;
;
;
;
// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js
// fix for "Readable" isn't a named export issue
const Readable = __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["default"].Readable;
const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');
class Blob {
    constructor(){
        this[TYPE] = '';
        const blobParts = arguments[0];
        const options = arguments[1];
        const buffers = [];
        let size = 0;
        if (blobParts) {
            const a = blobParts;
            const length = Number(a.length);
            for(let i = 0; i < length; i++){
                const element = a[i];
                let buffer;
                if (element instanceof Buffer) {
                    buffer = element;
                } else if (ArrayBuffer.isView(element)) {
                    buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
                } else if (element instanceof ArrayBuffer) {
                    buffer = Buffer.from(element);
                } else if (element instanceof Blob) {
                    buffer = element[BUFFER];
                } else {
                    buffer = Buffer.from(typeof element === 'string' ? element : String(element));
                }
                size += buffer.length;
                buffers.push(buffer);
            }
        }
        this[BUFFER] = Buffer.concat(buffers);
        let type = options && options.type !== undefined && String(options.type).toLowerCase();
        if (type && !/[^\u0020-\u007E]/.test(type)) {
            this[TYPE] = type;
        }
    }
    get size() {
        return this[BUFFER].length;
    }
    get type() {
        return this[TYPE];
    }
    text() {
        return Promise.resolve(this[BUFFER].toString());
    }
    arrayBuffer() {
        const buf = this[BUFFER];
        const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        return Promise.resolve(ab);
    }
    stream() {
        const readable = new Readable();
        readable._read = function() {};
        readable.push(this[BUFFER]);
        readable.push(null);
        return readable;
    }
    toString() {
        return '[object Blob]';
    }
    slice() {
        const size = this.size;
        const start = arguments[0];
        const end = arguments[1];
        let relativeStart, relativeEnd;
        if (start === undefined) {
            relativeStart = 0;
        } else if (start < 0) {
            relativeStart = Math.max(size + start, 0);
        } else {
            relativeStart = Math.min(start, size);
        }
        if (end === undefined) {
            relativeEnd = size;
        } else if (end < 0) {
            relativeEnd = Math.max(size + end, 0);
        } else {
            relativeEnd = Math.min(end, size);
        }
        const span = Math.max(relativeEnd - relativeStart, 0);
        const buffer = this[BUFFER];
        const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
        const blob = new Blob([], {
            type: arguments[2]
        });
        blob[BUFFER] = slicedBuffer;
        return blob;
    }
}
Object.defineProperties(Blob.prototype, {
    size: {
        enumerable: true
    },
    type: {
        enumerable: true
    },
    slice: {
        enumerable: true
    }
});
Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
    value: 'Blob',
    writable: false,
    enumerable: false,
    configurable: true
});
/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */ /**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */ function FetchError(message, type, systemError) {
    Error.call(this, message);
    this.message = message;
    this.type = type;
    // when err.type is `system`, err.code contains system error code
    if (systemError) {
        this.code = this.errno = systemError.code;
    }
    // hide custom error implementation details from end-users
    Error.captureStackTrace(this, this.constructor);
}
FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';
let convert;
try {
    convert = (()=>{
        const e = new Error("Cannot find module 'encoding'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
    })().convert;
} catch (e) {}
const INTERNALS = Symbol('Body internals');
// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["default"].PassThrough;
/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */ function Body(body) {
    var _this = this;
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, _ref$size = _ref.size;
    let size = _ref$size === undefined ? 0 : _ref$size;
    var _ref$timeout = _ref.timeout;
    let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;
    if (body == null) {
        // body is undefined or null
        body = null;
    } else if (isURLSearchParams(body)) {
        // body is a URLSearchParams
        body = Buffer.from(body.toString());
    } else if (isBlob(body)) ;
    else if (Buffer.isBuffer(body)) ;
    else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
        // body is ArrayBuffer
        body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
        // body is ArrayBufferView
        body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["default"]) ;
    else {
        // none of the above
        // coerce to string then buffer
        body = Buffer.from(String(body));
    }
    this[INTERNALS] = {
        body,
        disturbed: false,
        error: null
    };
    this.size = size;
    this.timeout = timeout;
    if (body instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["default"]) {
        body.on('error', function(err) {
            const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
            _this[INTERNALS].error = error;
        });
    }
}
Body.prototype = {
    get body () {
        return this[INTERNALS].body;
    },
    get bodyUsed () {
        return this[INTERNALS].disturbed;
    },
    /**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */ arrayBuffer () {
        return consumeBody.call(this).then(function(buf) {
            return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        });
    },
    /**
  * Return raw response as Blob
  *
  * @return Promise
  */ blob () {
        let ct = this.headers && this.headers.get('content-type') || '';
        return consumeBody.call(this).then(function(buf) {
            return Object.assign(// Prevent copying
            new Blob([], {
                type: ct.toLowerCase()
            }), {
                [BUFFER]: buf
            });
        });
    },
    /**
  * Decode response as json
  *
  * @return  Promise
  */ json () {
        var _this2 = this;
        return consumeBody.call(this).then(function(buffer) {
            try {
                return JSON.parse(buffer.toString());
            } catch (err) {
                return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
            }
        });
    },
    /**
  * Decode response as text
  *
  * @return  Promise
  */ text () {
        return consumeBody.call(this).then(function(buffer) {
            return buffer.toString();
        });
    },
    /**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */ buffer () {
        return consumeBody.call(this);
    },
    /**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */ textConverted () {
        var _this3 = this;
        return consumeBody.call(this).then(function(buffer) {
            return convertBody(buffer, _this3.headers);
        });
    }
};
// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
    body: {
        enumerable: true
    },
    bodyUsed: {
        enumerable: true
    },
    arrayBuffer: {
        enumerable: true
    },
    blob: {
        enumerable: true
    },
    json: {
        enumerable: true
    },
    text: {
        enumerable: true
    }
});
Body.mixIn = function(proto) {
    for (const name of Object.getOwnPropertyNames(Body.prototype)){
        // istanbul ignore else: future proof
        if (!(name in proto)) {
            const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
            Object.defineProperty(proto, name, desc);
        }
    }
};
/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */ function consumeBody() {
    var _this4 = this;
    if (this[INTERNALS].disturbed) {
        return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
    }
    this[INTERNALS].disturbed = true;
    if (this[INTERNALS].error) {
        return Body.Promise.reject(this[INTERNALS].error);
    }
    let body = this.body;
    // body is null
    if (body === null) {
        return Body.Promise.resolve(Buffer.alloc(0));
    }
    // body is blob
    if (isBlob(body)) {
        body = body.stream();
    }
    // body is buffer
    if (Buffer.isBuffer(body)) {
        return Body.Promise.resolve(body);
    }
    // istanbul ignore if: should never happen
    if (!(body instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["default"])) {
        return Body.Promise.resolve(Buffer.alloc(0));
    }
    // body is stream
    // get ready to actually consume the body
    let accum = [];
    let accumBytes = 0;
    let abort = false;
    return new Body.Promise(function(resolve, reject) {
        let resTimeout;
        // allow timeout on slow response body
        if (_this4.timeout) {
            resTimeout = setTimeout(function() {
                abort = true;
                reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
            }, _this4.timeout);
        }
        // handle stream errors
        body.on('error', function(err) {
            if (err.name === 'AbortError') {
                // if the request was aborted, reject with this Error
                abort = true;
                reject(err);
            } else {
                // other errors, such as incorrect content-encoding
                reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
            }
        });
        body.on('data', function(chunk) {
            if (abort || chunk === null) {
                return;
            }
            if (_this4.size && accumBytes + chunk.length > _this4.size) {
                abort = true;
                reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
                return;
            }
            accumBytes += chunk.length;
            accum.push(chunk);
        });
        body.on('end', function() {
            if (abort) {
                return;
            }
            clearTimeout(resTimeout);
            try {
                resolve(Buffer.concat(accum, accumBytes));
            } catch (err) {
                // handle streams that have accumulated too much data (issue #414)
                reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
            }
        });
    });
}
/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */ function convertBody(buffer, headers) {
    if (typeof convert !== 'function') {
        throw new Error('The package `encoding` must be installed to use the textConverted() function');
    }
    const ct = headers.get('content-type');
    let charset = 'utf-8';
    let res, str;
    // header
    if (ct) {
        res = /charset=([^;]*)/i.exec(ct);
    }
    // no charset in content type, peek at response body for at most 1024 bytes
    str = buffer.slice(0, 1024).toString();
    // html5
    if (!res && str) {
        res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
    }
    // html4
    if (!res && str) {
        res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
        if (!res) {
            res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
            if (res) {
                res.pop(); // drop last quote
            }
        }
        if (res) {
            res = /charset=(.*)/i.exec(res.pop());
        }
    }
    // xml
    if (!res && str) {
        res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
    }
    // found charset
    if (res) {
        charset = res.pop();
        // prevent decode issues when sites use incorrect encoding
        // ref: https://hsivonen.fi/encoding-menu/
        if (charset === 'gb2312' || charset === 'gbk') {
            charset = 'gb18030';
        }
    }
    // turn raw buffers into a single utf-8 buffer
    return convert(buffer, 'UTF-8', charset).toString();
}
/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */ function isURLSearchParams(obj) {
    // Duck-typing as a necessary condition.
    if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
        return false;
    }
    // Brand-checking and more duck-typing as optional condition.
    return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}
/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */ function isBlob(obj) {
    return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}
/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */ function clone(instance) {
    let p1, p2;
    let body = instance.body;
    // don't allow cloning a used body
    if (instance.bodyUsed) {
        throw new Error('cannot clone body after it is used');
    }
    // check that body is a stream and not form-data object
    // note: we can't clone the form-data object without having it as a dependency
    if (body instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["default"] && typeof body.getBoundary !== 'function') {
        // tee instance body
        p1 = new PassThrough();
        p2 = new PassThrough();
        body.pipe(p1);
        body.pipe(p2);
        // set instance body to teed body and return the other teed body
        instance[INTERNALS].body = p1;
        body = p2;
    }
    return body;
}
/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */ function extractContentType(body) {
    if (body === null) {
        // body is null
        return null;
    } else if (typeof body === 'string') {
        // body is string
        return 'text/plain;charset=UTF-8';
    } else if (isURLSearchParams(body)) {
        // body is a URLSearchParams
        return 'application/x-www-form-urlencoded;charset=UTF-8';
    } else if (isBlob(body)) {
        // body is blob
        return body.type || null;
    } else if (Buffer.isBuffer(body)) {
        // body is buffer
        return null;
    } else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
        // body is ArrayBuffer
        return null;
    } else if (ArrayBuffer.isView(body)) {
        // body is ArrayBufferView
        return null;
    } else if (typeof body.getBoundary === 'function') {
        // detect form data input from form-data module
        return `multipart/form-data;boundary=${body.getBoundary()}`;
    } else if (body instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["default"]) {
        // body is stream
        // can't really do much about this
        return null;
    } else {
        // Body constructor defaults other things to string
        return 'text/plain;charset=UTF-8';
    }
}
/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */ function getTotalBytes(instance) {
    const body = instance.body;
    if (body === null) {
        // body is null
        return 0;
    } else if (isBlob(body)) {
        return body.size;
    } else if (Buffer.isBuffer(body)) {
        // body is buffer
        return body.length;
    } else if (body && typeof body.getLengthSync === 'function') {
        // detect form data input from form-data module
        if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
        body.hasKnownLength && body.hasKnownLength()) {
            // 2.x
            return body.getLengthSync();
        }
        return null;
    } else {
        // body is stream
        return null;
    }
}
/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */ function writeToStream(dest, instance) {
    const body = instance.body;
    if (body === null) {
        // body is null
        dest.end();
    } else if (isBlob(body)) {
        body.stream().pipe(dest);
    } else if (Buffer.isBuffer(body)) {
        // body is buffer
        dest.write(body);
        dest.end();
    } else {
        // body is stream
        body.pipe(dest);
    }
}
// expose Promise
Body.Promise = /*TURBOPACK member replacement*/ __turbopack_context__.g.Promise;
/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */ const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
function validateName(name) {
    name = `${name}`;
    if (invalidTokenRegex.test(name) || name === '') {
        throw new TypeError(`${name} is not a legal HTTP header name`);
    }
}
function validateValue(value) {
    value = `${value}`;
    if (invalidHeaderCharRegex.test(value)) {
        throw new TypeError(`${value} is not a legal HTTP header value`);
    }
}
/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */ function find(map, name) {
    name = name.toLowerCase();
    for(const key in map){
        if (key.toLowerCase() === name) {
            return key;
        }
    }
    return undefined;
}
const MAP = Symbol('map');
class Headers {
    /**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */ constructor(){
        let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        this[MAP] = Object.create(null);
        if (init instanceof Headers) {
            const rawHeaders = init.raw();
            const headerNames = Object.keys(rawHeaders);
            for (const headerName of headerNames){
                for (const value of rawHeaders[headerName]){
                    this.append(headerName, value);
                }
            }
            return;
        }
        // We don't worry about converting prop to ByteString here as append()
        // will handle it.
        if (init == null) ;
        else if (typeof init === 'object') {
            const method = init[Symbol.iterator];
            if (method != null) {
                if (typeof method !== 'function') {
                    throw new TypeError('Header pairs must be iterable');
                }
                // sequence<sequence<ByteString>>
                // Note: per spec we have to first exhaust the lists then process them
                const pairs = [];
                for (const pair of init){
                    if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
                        throw new TypeError('Each header pair must be iterable');
                    }
                    pairs.push(Array.from(pair));
                }
                for (const pair of pairs){
                    if (pair.length !== 2) {
                        throw new TypeError('Each header pair must be a name/value tuple');
                    }
                    this.append(pair[0], pair[1]);
                }
            } else {
                // record<ByteString, ByteString>
                for (const key of Object.keys(init)){
                    const value = init[key];
                    this.append(key, value);
                }
            }
        } else {
            throw new TypeError('Provided initializer must be an object');
        }
    }
    /**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */ get(name) {
        name = `${name}`;
        validateName(name);
        const key = find(this[MAP], name);
        if (key === undefined) {
            return null;
        }
        return this[MAP][key].join(', ');
    }
    /**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */ forEach(callback) {
        let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        let pairs = getHeaders(this);
        let i = 0;
        while(i < pairs.length){
            var _pairs$i = pairs[i];
            const name = _pairs$i[0], value = _pairs$i[1];
            callback.call(thisArg, value, name, this);
            pairs = getHeaders(this);
            i++;
        }
    }
    /**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */ set(name, value) {
        name = `${name}`;
        value = `${value}`;
        validateName(name);
        validateValue(value);
        const key = find(this[MAP], name);
        this[MAP][key !== undefined ? key : name] = [
            value
        ];
    }
    /**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */ append(name, value) {
        name = `${name}`;
        value = `${value}`;
        validateName(name);
        validateValue(value);
        const key = find(this[MAP], name);
        if (key !== undefined) {
            this[MAP][key].push(value);
        } else {
            this[MAP][name] = [
                value
            ];
        }
    }
    /**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */ has(name) {
        name = `${name}`;
        validateName(name);
        return find(this[MAP], name) !== undefined;
    }
    /**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */ delete(name) {
        name = `${name}`;
        validateName(name);
        const key = find(this[MAP], name);
        if (key !== undefined) {
            delete this[MAP][key];
        }
    }
    /**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */ raw() {
        return this[MAP];
    }
    /**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */ keys() {
        return createHeadersIterator(this, 'key');
    }
    /**
  * Get an iterator on values.
  *
  * @return  Iterator
  */ values() {
        return createHeadersIterator(this, 'value');
    }
    /**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */ [Symbol.iterator]() {
        return createHeadersIterator(this, 'key+value');
    }
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];
Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
    value: 'Headers',
    writable: false,
    enumerable: false,
    configurable: true
});
Object.defineProperties(Headers.prototype, {
    get: {
        enumerable: true
    },
    forEach: {
        enumerable: true
    },
    set: {
        enumerable: true
    },
    append: {
        enumerable: true
    },
    has: {
        enumerable: true
    },
    delete: {
        enumerable: true
    },
    keys: {
        enumerable: true
    },
    values: {
        enumerable: true
    },
    entries: {
        enumerable: true
    }
});
function getHeaders(headers) {
    let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';
    const keys = Object.keys(headers[MAP]).sort();
    return keys.map(kind === 'key' ? function(k) {
        return k.toLowerCase();
    } : kind === 'value' ? function(k) {
        return headers[MAP][k].join(', ');
    } : function(k) {
        return [
            k.toLowerCase(),
            headers[MAP][k].join(', ')
        ];
    });
}
const INTERNAL = Symbol('internal');
function createHeadersIterator(target, kind) {
    const iterator = Object.create(HeadersIteratorPrototype);
    iterator[INTERNAL] = {
        target,
        kind,
        index: 0
    };
    return iterator;
}
const HeadersIteratorPrototype = Object.setPrototypeOf({
    next () {
        // istanbul ignore if
        if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
            throw new TypeError('Value of `this` is not a HeadersIterator');
        }
        var _INTERNAL = this[INTERNAL];
        const target = _INTERNAL.target, kind = _INTERNAL.kind, index = _INTERNAL.index;
        const values = getHeaders(target, kind);
        const len = values.length;
        if (index >= len) {
            return {
                value: undefined,
                done: true
            };
        }
        this[INTERNAL].index = index + 1;
        return {
            value: values[index],
            done: false
        };
    }
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
    value: 'HeadersIterator',
    writable: false,
    enumerable: false,
    configurable: true
});
/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */ function exportNodeCompatibleHeaders(headers) {
    const obj = Object.assign({
        __proto__: null
    }, headers[MAP]);
    // http.request() only supports string as Host header. This hack makes
    // specifying custom Host header possible.
    const hostHeaderKey = find(headers[MAP], 'Host');
    if (hostHeaderKey !== undefined) {
        obj[hostHeaderKey] = obj[hostHeaderKey][0];
    }
    return obj;
}
/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */ function createHeadersLenient(obj) {
    const headers = new Headers();
    for (const name of Object.keys(obj)){
        if (invalidTokenRegex.test(name)) {
            continue;
        }
        if (Array.isArray(obj[name])) {
            for (const val of obj[name]){
                if (invalidHeaderCharRegex.test(val)) {
                    continue;
                }
                if (headers[MAP][name] === undefined) {
                    headers[MAP][name] = [
                        val
                    ];
                } else {
                    headers[MAP][name].push(val);
                }
            }
        } else if (!invalidHeaderCharRegex.test(obj[name])) {
            headers[MAP][name] = [
                obj[name]
            ];
        }
    }
    return headers;
}
const INTERNALS$1 = Symbol('Response internals');
// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = __TURBOPACK__imported__module__$5b$externals$5d2f$http__$5b$external$5d$__$28$http$2c$__cjs$29$__["default"].STATUS_CODES;
/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */ class Response {
    constructor(){
        let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        Body.call(this, body, opts);
        const status = opts.status || 200;
        const headers = new Headers(opts.headers);
        if (body != null && !headers.has('Content-Type')) {
            const contentType = extractContentType(body);
            if (contentType) {
                headers.append('Content-Type', contentType);
            }
        }
        this[INTERNALS$1] = {
            url: opts.url,
            status,
            statusText: opts.statusText || STATUS_CODES[status],
            headers,
            counter: opts.counter
        };
    }
    get url() {
        return this[INTERNALS$1].url || '';
    }
    get status() {
        return this[INTERNALS$1].status;
    }
    /**
  * Convenience property representing if the request ended normally
  */ get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
    }
    get redirected() {
        return this[INTERNALS$1].counter > 0;
    }
    get statusText() {
        return this[INTERNALS$1].statusText;
    }
    get headers() {
        return this[INTERNALS$1].headers;
    }
    /**
  * Clone this response
  *
  * @return  Response
  */ clone() {
        return new Response(clone(this), {
            url: this.url,
            status: this.status,
            statusText: this.statusText,
            headers: this.headers,
            ok: this.ok,
            redirected: this.redirected
        });
    }
}
Body.mixIn(Response.prototype);
Object.defineProperties(Response.prototype, {
    url: {
        enumerable: true
    },
    status: {
        enumerable: true
    },
    ok: {
        enumerable: true
    },
    redirected: {
        enumerable: true
    },
    statusText: {
        enumerable: true
    },
    headers: {
        enumerable: true
    },
    clone: {
        enumerable: true
    }
});
Object.defineProperty(Response.prototype, Symbol.toStringTag, {
    value: 'Response',
    writable: false,
    enumerable: false,
    configurable: true
});
const INTERNALS$2 = Symbol('Request internals');
const URL = __TURBOPACK__imported__module__$5b$externals$5d2f$url__$5b$external$5d$__$28$url$2c$__cjs$29$__["default"].URL || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$node_modules$2f$whatwg$2d$url$2f$lib$2f$public$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].URL;
// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = __TURBOPACK__imported__module__$5b$externals$5d2f$url__$5b$external$5d$__$28$url$2c$__cjs$29$__["default"].parse;
const format_url = __TURBOPACK__imported__module__$5b$externals$5d2f$url__$5b$external$5d$__$28$url$2c$__cjs$29$__["default"].format;
/**
 * Wrapper around `new URL` to handle arbitrary URLs
 *
 * @param  {string} urlStr
 * @return {void}
 */ function parseURL(urlStr) {
    /*
 	Check whether the URL is absolute or not
 		Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
 	Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
 */ if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.exec(urlStr)) {
        urlStr = new URL(urlStr).toString();
    }
    // Fallback to old implementation for arbitrary URLs
    return parse_url(urlStr);
}
const streamDestructionSupported = 'destroy' in __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["default"].Readable.prototype;
/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */ function isRequest(input) {
    return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}
function isAbortSignal(signal) {
    const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
    return !!(proto && proto.constructor.name === 'AbortSignal');
}
/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */ class Request {
    constructor(input){
        let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        let parsedURL;
        // normalize input
        if (!isRequest(input)) {
            if (input && input.href) {
                // in order to support Node.js' Url objects; though WHATWG's URL objects
                // will fall into this branch also (since their `toString()` will return
                // `href` property anyway)
                parsedURL = parseURL(input.href);
            } else {
                // coerce input to a string before attempting to parse
                parsedURL = parseURL(`${input}`);
            }
            input = {};
        } else {
            parsedURL = parseURL(input.url);
        }
        let method = init.method || input.method || 'GET';
        method = method.toUpperCase();
        if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
            throw new TypeError('Request with GET/HEAD method cannot have body');
        }
        let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
        Body.call(this, inputBody, {
            timeout: init.timeout || input.timeout || 0,
            size: init.size || input.size || 0
        });
        const headers = new Headers(init.headers || input.headers || {});
        if (inputBody != null && !headers.has('Content-Type')) {
            const contentType = extractContentType(inputBody);
            if (contentType) {
                headers.append('Content-Type', contentType);
            }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ('signal' in init) signal = init.signal;
        if (signal != null && !isAbortSignal(signal)) {
            throw new TypeError('Expected signal to be an instanceof AbortSignal');
        }
        this[INTERNALS$2] = {
            method,
            redirect: init.redirect || input.redirect || 'follow',
            headers,
            parsedURL,
            signal
        };
        // node-fetch-only options
        this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
        this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
        this.counter = init.counter || input.counter || 0;
        this.agent = init.agent || input.agent;
    }
    get method() {
        return this[INTERNALS$2].method;
    }
    get url() {
        return format_url(this[INTERNALS$2].parsedURL);
    }
    get headers() {
        return this[INTERNALS$2].headers;
    }
    get redirect() {
        return this[INTERNALS$2].redirect;
    }
    get signal() {
        return this[INTERNALS$2].signal;
    }
    /**
  * Clone this request
  *
  * @return  Request
  */ clone() {
        return new Request(this);
    }
}
Body.mixIn(Request.prototype);
Object.defineProperty(Request.prototype, Symbol.toStringTag, {
    value: 'Request',
    writable: false,
    enumerable: false,
    configurable: true
});
Object.defineProperties(Request.prototype, {
    method: {
        enumerable: true
    },
    url: {
        enumerable: true
    },
    headers: {
        enumerable: true
    },
    redirect: {
        enumerable: true
    },
    clone: {
        enumerable: true
    },
    signal: {
        enumerable: true
    }
});
/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */ function getNodeRequestOptions(request) {
    const parsedURL = request[INTERNALS$2].parsedURL;
    const headers = new Headers(request[INTERNALS$2].headers);
    // fetch step 1.3
    if (!headers.has('Accept')) {
        headers.set('Accept', '*/*');
    }
    // Basic fetch
    if (!parsedURL.protocol || !parsedURL.hostname) {
        throw new TypeError('Only absolute URLs are supported');
    }
    if (!/^https?:$/.test(parsedURL.protocol)) {
        throw new TypeError('Only HTTP(S) protocols are supported');
    }
    if (request.signal && request.body instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["default"].Readable && !streamDestructionSupported) {
        throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
    }
    // HTTP-network-or-cache fetch steps 2.4-2.7
    let contentLengthValue = null;
    if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
        contentLengthValue = '0';
    }
    if (request.body != null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === 'number') {
            contentLengthValue = String(totalBytes);
        }
    }
    if (contentLengthValue) {
        headers.set('Content-Length', contentLengthValue);
    }
    // HTTP-network-or-cache fetch step 2.11
    if (!headers.has('User-Agent')) {
        headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
    }
    // HTTP-network-or-cache fetch step 2.15
    if (request.compress && !headers.has('Accept-Encoding')) {
        headers.set('Accept-Encoding', 'gzip,deflate');
    }
    let agent = request.agent;
    if (typeof agent === 'function') {
        agent = agent(parsedURL);
    }
    // HTTP-network fetch step 4.2
    // chunked encoding is handled by Node.js
    return Object.assign({}, parsedURL, {
        method: request.method,
        headers: exportNodeCompatibleHeaders(headers),
        agent
    });
}
/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */ /**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */ function AbortError(message) {
    Error.call(this, message);
    this.type = 'aborted';
    this.message = message;
    // hide custom error implementation details from end-users
    Error.captureStackTrace(this, this.constructor);
}
AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';
const URL$1 = __TURBOPACK__imported__module__$5b$externals$5d2f$url__$5b$external$5d$__$28$url$2c$__cjs$29$__["default"].URL || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$groq$2d$sdk$2f$node_modules$2f$whatwg$2d$url$2f$lib$2f$public$2d$api$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].URL;
// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["default"].PassThrough;
const isDomainOrSubdomain = function isDomainOrSubdomain(destination, original) {
    const orig = new URL$1(original).hostname;
    const dest = new URL$1(destination).hostname;
    return orig === dest || orig[orig.length - dest.length - 1] === '.' && orig.endsWith(dest);
};
/**
 * isSameProtocol reports whether the two provided URLs use the same protocol.
 *
 * Both domains must already be in canonical form.
 * @param {string|URL} original
 * @param {string|URL} destination
 */ const isSameProtocol = function isSameProtocol(destination, original) {
    const orig = new URL$1(original).protocol;
    const dest = new URL$1(destination).protocol;
    return orig === dest;
};
/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */ function fetch(url, opts) {
    // allow custom promise
    if (!fetch.Promise) {
        throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
    }
    Body.Promise = fetch.Promise;
    // wrap http.request into fetch
    return new fetch.Promise(function(resolve, reject) {
        // build request object
        const request = new Request(url, opts);
        const options = getNodeRequestOptions(request);
        const send = (options.protocol === 'https:' ? __TURBOPACK__imported__module__$5b$externals$5d2f$https__$5b$external$5d$__$28$https$2c$__cjs$29$__["default"] : __TURBOPACK__imported__module__$5b$externals$5d2f$http__$5b$external$5d$__$28$http$2c$__cjs$29$__["default"]).request;
        const signal = request.signal;
        let response = null;
        const abort = function abort() {
            let error = new AbortError('The user aborted a request.');
            reject(error);
            if (request.body && request.body instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$stream__$5b$external$5d$__$28$stream$2c$__cjs$29$__["default"].Readable) {
                destroyStream(request.body, error);
            }
            if (!response || !response.body) return;
            response.body.emit('error', error);
        };
        if (signal && signal.aborted) {
            abort();
            return;
        }
        const abortAndFinalize = function abortAndFinalize() {
            abort();
            finalize();
        };
        // send request
        const req = send(options);
        let reqTimeout;
        if (signal) {
            signal.addEventListener('abort', abortAndFinalize);
        }
        function finalize() {
            req.abort();
            if (signal) signal.removeEventListener('abort', abortAndFinalize);
            clearTimeout(reqTimeout);
        }
        if (request.timeout) {
            req.once('socket', function(socket) {
                reqTimeout = setTimeout(function() {
                    reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
                    finalize();
                }, request.timeout);
            });
        }
        req.on('error', function(err) {
            reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
            if (response && response.body) {
                destroyStream(response.body, err);
            }
            finalize();
        });
        fixResponseChunkedTransferBadEnding(req, function(err) {
            if (signal && signal.aborted) {
                return;
            }
            if (response && response.body) {
                destroyStream(response.body, err);
            }
        });
        /* c8 ignore next 18 */ if (parseInt(process.version.substring(1)) < 14) {
            // Before Node.js 14, pipeline() does not fully support async iterators and does not always
            // properly handle when the socket close/end events are out of order.
            req.on('socket', function(s) {
                s.addListener('close', function(hadError) {
                    // if a data listener is still present we didn't end cleanly
                    const hasDataListener = s.listenerCount('data') > 0;
                    // if end happened before close but the socket didn't emit an error, do it now
                    if (response && hasDataListener && !hadError && !(signal && signal.aborted)) {
                        const err = new Error('Premature close');
                        err.code = 'ERR_STREAM_PREMATURE_CLOSE';
                        response.body.emit('error', err);
                    }
                });
            });
        }
        req.on('response', function(res) {
            clearTimeout(reqTimeout);
            const headers = createHeadersLenient(res.headers);
            // HTTP fetch step 5
            if (fetch.isRedirect(res.statusCode)) {
                // HTTP fetch step 5.2
                const location = headers.get('Location');
                // HTTP fetch step 5.3
                let locationURL = null;
                try {
                    locationURL = location === null ? null : new URL$1(location, request.url).toString();
                } catch (err) {
                    // error here can only be invalid URL in Location: header
                    // do not throw when options.redirect == manual
                    // let the user extract the errorneous redirect URL
                    if (request.redirect !== 'manual') {
                        reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, 'invalid-redirect'));
                        finalize();
                        return;
                    }
                }
                // HTTP fetch step 5.5
                switch(request.redirect){
                    case 'error':
                        reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
                        finalize();
                        return;
                    case 'manual':
                        // node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
                        if (locationURL !== null) {
                            // handle corrupted header
                            try {
                                headers.set('Location', locationURL);
                            } catch (err) {
                                // istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
                                reject(err);
                            }
                        }
                        break;
                    case 'follow':
                        // HTTP-redirect fetch step 2
                        if (locationURL === null) {
                            break;
                        }
                        // HTTP-redirect fetch step 5
                        if (request.counter >= request.follow) {
                            reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
                            finalize();
                            return;
                        }
                        // HTTP-redirect fetch step 6 (counter increment)
                        // Create a new Request object.
                        const requestOpts = {
                            headers: new Headers(request.headers),
                            follow: request.follow,
                            counter: request.counter + 1,
                            agent: request.agent,
                            compress: request.compress,
                            method: request.method,
                            body: request.body,
                            signal: request.signal,
                            timeout: request.timeout,
                            size: request.size
                        };
                        if (!isDomainOrSubdomain(request.url, locationURL) || !isSameProtocol(request.url, locationURL)) {
                            for (const name of [
                                'authorization',
                                'www-authenticate',
                                'cookie',
                                'cookie2'
                            ]){
                                requestOpts.headers.delete(name);
                            }
                        }
                        // HTTP-redirect fetch step 9
                        if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
                            reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
                            finalize();
                            return;
                        }
                        // HTTP-redirect fetch step 11
                        if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
                            requestOpts.method = 'GET';
                            requestOpts.body = undefined;
                            requestOpts.headers.delete('content-length');
                        }
                        // HTTP-redirect fetch step 15
                        resolve(fetch(new Request(locationURL, requestOpts)));
                        finalize();
                        return;
                }
            }
            // prepare response
            res.once('end', function() {
                if (signal) signal.removeEventListener('abort', abortAndFinalize);
            });
            let body = res.pipe(new PassThrough$1());
            const response_options = {
                url: request.url,
                status: res.statusCode,
                statusText: res.statusMessage,
                headers: headers,
                size: request.size,
                timeout: request.timeout,
                counter: request.counter
            };
            // HTTP-network fetch step 12.1.1.3
            const codings = headers.get('Content-Encoding');
            // HTTP-network fetch step 12.1.1.4: handle content codings
            // in following scenarios we ignore compression support
            // 1. compression support is disabled
            // 2. HEAD request
            // 3. no Content-Encoding header
            // 4. no content response (204)
            // 5. content not modified response (304)
            if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
                response = new Response(body, response_options);
                resolve(response);
                return;
            }
            // For Node v6+
            // Be less strict when decoding compressed responses, since sometimes
            // servers send slightly invalid responses that are still accepted
            // by common browsers.
            // Always using Z_SYNC_FLUSH is what cURL does.
            const zlibOptions = {
                flush: __TURBOPACK__imported__module__$5b$externals$5d2f$zlib__$5b$external$5d$__$28$zlib$2c$__cjs$29$__["default"].Z_SYNC_FLUSH,
                finishFlush: __TURBOPACK__imported__module__$5b$externals$5d2f$zlib__$5b$external$5d$__$28$zlib$2c$__cjs$29$__["default"].Z_SYNC_FLUSH
            };
            // for gzip
            if (codings == 'gzip' || codings == 'x-gzip') {
                body = body.pipe(__TURBOPACK__imported__module__$5b$externals$5d2f$zlib__$5b$external$5d$__$28$zlib$2c$__cjs$29$__["default"].createGunzip(zlibOptions));
                response = new Response(body, response_options);
                resolve(response);
                return;
            }
            // for deflate
            if (codings == 'deflate' || codings == 'x-deflate') {
                // handle the infamous raw deflate response from old servers
                // a hack for old IIS and Apache servers
                const raw = res.pipe(new PassThrough$1());
                raw.once('data', function(chunk) {
                    // see http://stackoverflow.com/questions/37519828
                    if ((chunk[0] & 0x0F) === 0x08) {
                        body = body.pipe(__TURBOPACK__imported__module__$5b$externals$5d2f$zlib__$5b$external$5d$__$28$zlib$2c$__cjs$29$__["default"].createInflate());
                    } else {
                        body = body.pipe(__TURBOPACK__imported__module__$5b$externals$5d2f$zlib__$5b$external$5d$__$28$zlib$2c$__cjs$29$__["default"].createInflateRaw());
                    }
                    response = new Response(body, response_options);
                    resolve(response);
                });
                raw.on('end', function() {
                    // some old IIS servers return zero-length OK deflate responses, so 'data' is never emitted.
                    if (!response) {
                        response = new Response(body, response_options);
                        resolve(response);
                    }
                });
                return;
            }
            // for br
            if (codings == 'br' && typeof __TURBOPACK__imported__module__$5b$externals$5d2f$zlib__$5b$external$5d$__$28$zlib$2c$__cjs$29$__["default"].createBrotliDecompress === 'function') {
                body = body.pipe(__TURBOPACK__imported__module__$5b$externals$5d2f$zlib__$5b$external$5d$__$28$zlib$2c$__cjs$29$__["default"].createBrotliDecompress());
                response = new Response(body, response_options);
                resolve(response);
                return;
            }
            // otherwise, use response as-is
            response = new Response(body, response_options);
            resolve(response);
        });
        writeToStream(req, request);
    });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
    let socket;
    request.on('socket', function(s) {
        socket = s;
    });
    request.on('response', function(response) {
        const headers = response.headers;
        if (headers['transfer-encoding'] === 'chunked' && !headers['content-length']) {
            response.once('close', function(hadError) {
                // tests for socket presence, as in some situations the
                // the 'socket' event is not triggered for the request
                // (happens in deno), avoids `TypeError`
                // if a data listener is still present we didn't end cleanly
                const hasDataListener = socket && socket.listenerCount('data') > 0;
                if (hasDataListener && !hadError) {
                    const err = new Error('Premature close');
                    err.code = 'ERR_STREAM_PREMATURE_CLOSE';
                    errorCallback(err);
                }
            });
        }
    });
}
function destroyStream(stream, err) {
    if (stream.destroy) {
        stream.destroy(err);
    } else {
        // node < 8
        stream.emit('error', err);
        stream.end();
    }
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */ fetch.isRedirect = function(code) {
    return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};
// expose Promise
fetch.Promise = /*TURBOPACK member replacement*/ __turbopack_context__.g.Promise;
const __TURBOPACK__default__export__ = fetch;
;
}),
"[project]/node_modules/formdata-node/node_modules/web-streams-polyfill/dist/ponyfill.mjs [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ByteLengthQueuingStrategy",
    ()=>ByteLengthQueuingStrategy,
    "CountQueuingStrategy",
    ()=>CountQueuingStrategy,
    "ReadableByteStreamController",
    ()=>ReadableByteStreamController,
    "ReadableStream",
    ()=>ReadableStream,
    "ReadableStreamBYOBReader",
    ()=>ReadableStreamBYOBReader,
    "ReadableStreamBYOBRequest",
    ()=>ReadableStreamBYOBRequest,
    "ReadableStreamDefaultController",
    ()=>ReadableStreamDefaultController,
    "ReadableStreamDefaultReader",
    ()=>ReadableStreamDefaultReader,
    "TransformStream",
    ()=>TransformStream,
    "TransformStreamDefaultController",
    ()=>TransformStreamDefaultController,
    "WritableStream",
    ()=>WritableStream,
    "WritableStreamDefaultController",
    ()=>WritableStreamDefaultController,
    "WritableStreamDefaultWriter",
    ()=>WritableStreamDefaultWriter
]);
/**
 * @license
 * web-streams-polyfill v4.0.0-beta.3
 * Copyright 2021 Mattias Buelens, Diwank Singh Tomer and other contributors.
 * This code is released under the MIT license.
 * SPDX-License-Identifier: MIT
 */ const e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? Symbol : (e)=>`Symbol(${e})`;
function t() {}
function r(e) {
    return "object" == typeof e && null !== e || "function" == typeof e;
}
const o = t;
function n(e, t) {
    try {
        Object.defineProperty(e, "name", {
            value: t,
            configurable: !0
        });
    } catch (e) {}
}
const a = Promise, i = Promise.prototype.then, l = Promise.resolve.bind(a), s = Promise.reject.bind(a);
function u(e) {
    return new a(e);
}
function c(e) {
    return l(e);
}
function d(e) {
    return s(e);
}
function f(e, t, r) {
    return i.call(e, t, r);
}
function b(e, t, r) {
    f(f(e, t, r), void 0, o);
}
function h(e, t) {
    b(e, t);
}
function _(e, t) {
    b(e, void 0, t);
}
function p(e, t, r) {
    return f(e, t, r);
}
function m(e) {
    f(e, void 0, o);
}
let y = (e)=>{
    if ("function" == typeof queueMicrotask) y = queueMicrotask;
    else {
        const e = c(void 0);
        y = (t)=>f(e, t);
    }
    return y(e);
};
function g(e, t, r) {
    if ("function" != typeof e) throw new TypeError("Argument is not a function");
    return Function.prototype.apply.call(e, t, r);
}
function w(e, t, r) {
    try {
        return c(g(e, t, r));
    } catch (e) {
        return d(e);
    }
}
class S {
    constructor(){
        this._cursor = 0, this._size = 0, this._front = {
            _elements: [],
            _next: void 0
        }, this._back = this._front, this._cursor = 0, this._size = 0;
    }
    get length() {
        return this._size;
    }
    push(e) {
        const t = this._back;
        let r = t;
        16383 === t._elements.length && (r = {
            _elements: [],
            _next: void 0
        }), t._elements.push(e), r !== t && (this._back = r, t._next = r), ++this._size;
    }
    shift() {
        const e = this._front;
        let t = e;
        const r = this._cursor;
        let o = r + 1;
        const n = e._elements, a = n[r];
        return 16384 === o && (t = e._next, o = 0), --this._size, this._cursor = o, e !== t && (this._front = t), n[r] = void 0, a;
    }
    forEach(e) {
        let t = this._cursor, r = this._front, o = r._elements;
        for(; !(t === o.length && void 0 === r._next || t === o.length && (r = r._next, o = r._elements, t = 0, 0 === o.length));)e(o[t]), ++t;
    }
    peek() {
        const e = this._front, t = this._cursor;
        return e._elements[t];
    }
}
const v = e("[[AbortSteps]]"), R = e("[[ErrorSteps]]"), T = e("[[CancelSteps]]"), q = e("[[PullSteps]]"), C = e("[[ReleaseSteps]]");
function E(e, t) {
    e._ownerReadableStream = t, t._reader = e, "readable" === t._state ? O(e) : "closed" === t._state ? function(e) {
        O(e), j(e);
    }(e) : B(e, t._storedError);
}
function P(e, t) {
    return Gt(e._ownerReadableStream, t);
}
function W(e) {
    const t = e._ownerReadableStream;
    "readable" === t._state ? A(e, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")) : function(e, t) {
        B(e, t);
    }(e, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")), t._readableStreamController[C](), t._reader = void 0, e._ownerReadableStream = void 0;
}
function k(e) {
    return new TypeError("Cannot " + e + " a stream using a released reader");
}
function O(e) {
    e._closedPromise = u((t, r)=>{
        e._closedPromise_resolve = t, e._closedPromise_reject = r;
    });
}
function B(e, t) {
    O(e), A(e, t);
}
function A(e, t) {
    void 0 !== e._closedPromise_reject && (m(e._closedPromise), e._closedPromise_reject(t), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0);
}
function j(e) {
    void 0 !== e._closedPromise_resolve && (e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0);
}
const z = Number.isFinite || function(e) {
    return "number" == typeof e && isFinite(e);
}, L = Math.trunc || function(e) {
    return e < 0 ? Math.ceil(e) : Math.floor(e);
};
function F(e, t) {
    if (void 0 !== e && "object" != typeof (r = e) && "function" != typeof r) throw new TypeError(`${t} is not an object.`);
    var r;
}
function I(e, t) {
    if ("function" != typeof e) throw new TypeError(`${t} is not a function.`);
}
function D(e, t) {
    if (!function(e) {
        return "object" == typeof e && null !== e || "function" == typeof e;
    }(e)) throw new TypeError(`${t} is not an object.`);
}
function $(e, t, r) {
    if (void 0 === e) throw new TypeError(`Parameter ${t} is required in '${r}'.`);
}
function M(e, t, r) {
    if (void 0 === e) throw new TypeError(`${t} is required in '${r}'.`);
}
function Y(e) {
    return Number(e);
}
function Q(e) {
    return 0 === e ? 0 : e;
}
function N(e, t) {
    const r = Number.MAX_SAFE_INTEGER;
    let o = Number(e);
    if (o = Q(o), !z(o)) throw new TypeError(`${t} is not a finite number`);
    if (o = function(e) {
        return Q(L(e));
    }(o), o < 0 || o > r) throw new TypeError(`${t} is outside the accepted range of 0 to ${r}, inclusive`);
    return z(o) && 0 !== o ? o : 0;
}
function H(e) {
    if (!r(e)) return !1;
    if ("function" != typeof e.getReader) return !1;
    try {
        return "boolean" == typeof e.locked;
    } catch (e) {
        return !1;
    }
}
function x(e) {
    if (!r(e)) return !1;
    if ("function" != typeof e.getWriter) return !1;
    try {
        return "boolean" == typeof e.locked;
    } catch (e) {
        return !1;
    }
}
function V(e, t) {
    if (!Vt(e)) throw new TypeError(`${t} is not a ReadableStream.`);
}
function U(e, t) {
    e._reader._readRequests.push(t);
}
function G(e, t, r) {
    const o = e._reader._readRequests.shift();
    r ? o._closeSteps() : o._chunkSteps(t);
}
function X(e) {
    return e._reader._readRequests.length;
}
function J(e) {
    const t = e._reader;
    return void 0 !== t && !!K(t);
}
class ReadableStreamDefaultReader {
    constructor(e){
        if ($(e, 1, "ReadableStreamDefaultReader"), V(e, "First parameter"), Ut(e)) throw new TypeError("This stream has already been locked for exclusive reading by another reader");
        E(this, e), this._readRequests = new S;
    }
    get closed() {
        return K(this) ? this._closedPromise : d(ee("closed"));
    }
    cancel(e) {
        return K(this) ? void 0 === this._ownerReadableStream ? d(k("cancel")) : P(this, e) : d(ee("cancel"));
    }
    read() {
        if (!K(this)) return d(ee("read"));
        if (void 0 === this._ownerReadableStream) return d(k("read from"));
        let e, t;
        const r = u((r, o)=>{
            e = r, t = o;
        });
        return function(e, t) {
            const r = e._ownerReadableStream;
            r._disturbed = !0, "closed" === r._state ? t._closeSteps() : "errored" === r._state ? t._errorSteps(r._storedError) : r._readableStreamController[q](t);
        }(this, {
            _chunkSteps: (t)=>e({
                    value: t,
                    done: !1
                }),
            _closeSteps: ()=>e({
                    value: void 0,
                    done: !0
                }),
            _errorSteps: (e)=>t(e)
        }), r;
    }
    releaseLock() {
        if (!K(this)) throw ee("releaseLock");
        void 0 !== this._ownerReadableStream && function(e) {
            W(e);
            const t = new TypeError("Reader was released");
            Z(e, t);
        }(this);
    }
}
function K(e) {
    return !!r(e) && !!Object.prototype.hasOwnProperty.call(e, "_readRequests") && e instanceof ReadableStreamDefaultReader;
}
function Z(e, t) {
    const r = e._readRequests;
    e._readRequests = new S, r.forEach((e)=>{
        e._errorSteps(t);
    });
}
function ee(e) {
    return new TypeError(`ReadableStreamDefaultReader.prototype.${e} can only be used on a ReadableStreamDefaultReader`);
}
Object.defineProperties(ReadableStreamDefaultReader.prototype, {
    cancel: {
        enumerable: !0
    },
    read: {
        enumerable: !0
    },
    releaseLock: {
        enumerable: !0
    },
    closed: {
        enumerable: !0
    }
}), n(ReadableStreamDefaultReader.prototype.cancel, "cancel"), n(ReadableStreamDefaultReader.prototype.read, "read"), n(ReadableStreamDefaultReader.prototype.releaseLock, "releaseLock"), "symbol" == typeof e.toStringTag && Object.defineProperty(ReadableStreamDefaultReader.prototype, e.toStringTag, {
    value: "ReadableStreamDefaultReader",
    configurable: !0
});
class te {
    constructor(e, t){
        this._ongoingPromise = void 0, this._isFinished = !1, this._reader = e, this._preventCancel = t;
    }
    next() {
        const e = ()=>this._nextSteps();
        return this._ongoingPromise = this._ongoingPromise ? p(this._ongoingPromise, e, e) : e(), this._ongoingPromise;
    }
    return(e) {
        const t = ()=>this._returnSteps(e);
        return this._ongoingPromise ? p(this._ongoingPromise, t, t) : t();
    }
    _nextSteps() {
        if (this._isFinished) return Promise.resolve({
            value: void 0,
            done: !0
        });
        const e = this._reader;
        return void 0 === e ? d(k("iterate")) : f(e.read(), (e)=>{
            var t;
            return this._ongoingPromise = void 0, e.done && (this._isFinished = !0, null === (t = this._reader) || void 0 === t || t.releaseLock(), this._reader = void 0), e;
        }, (e)=>{
            var t;
            throw this._ongoingPromise = void 0, this._isFinished = !0, null === (t = this._reader) || void 0 === t || t.releaseLock(), this._reader = void 0, e;
        });
    }
    _returnSteps(e) {
        if (this._isFinished) return Promise.resolve({
            value: e,
            done: !0
        });
        this._isFinished = !0;
        const t = this._reader;
        if (void 0 === t) return d(k("finish iterating"));
        if (this._reader = void 0, !this._preventCancel) {
            const r = t.cancel(e);
            return t.releaseLock(), p(r, ()=>({
                    value: e,
                    done: !0
                }));
        }
        return t.releaseLock(), c({
            value: e,
            done: !0
        });
    }
}
const re = {
    next () {
        return oe(this) ? this._asyncIteratorImpl.next() : d(ne("next"));
    },
    return (e) {
        return oe(this) ? this._asyncIteratorImpl.return(e) : d(ne("return"));
    }
};
function oe(e) {
    if (!r(e)) return !1;
    if (!Object.prototype.hasOwnProperty.call(e, "_asyncIteratorImpl")) return !1;
    try {
        return e._asyncIteratorImpl instanceof te;
    } catch (e) {
        return !1;
    }
}
function ne(e) {
    return new TypeError(`ReadableStreamAsyncIterator.${e} can only be used on a ReadableSteamAsyncIterator`);
}
"symbol" == typeof e.asyncIterator && Object.defineProperty(re, e.asyncIterator, {
    value () {
        return this;
    },
    writable: !0,
    configurable: !0
});
const ae = Number.isNaN || function(e) {
    return e != e;
};
function ie(e, t, r, o, n) {
    new Uint8Array(e).set(new Uint8Array(r, o, n), t);
}
function le(e) {
    const t = function(e, t, r) {
        if (e.slice) return e.slice(t, r);
        const o = r - t, n = new ArrayBuffer(o);
        return ie(n, 0, e, t, o), n;
    }(e.buffer, e.byteOffset, e.byteOffset + e.byteLength);
    return new Uint8Array(t);
}
function se(e) {
    const t = e._queue.shift();
    return e._queueTotalSize -= t.size, e._queueTotalSize < 0 && (e._queueTotalSize = 0), t.value;
}
function ue(e, t, r) {
    if ("number" != typeof (o = r) || ae(o) || o < 0 || r === 1 / 0) throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
    var o;
    e._queue.push({
        value: t,
        size: r
    }), e._queueTotalSize += r;
}
function ce(e) {
    e._queue = new S, e._queueTotalSize = 0;
}
class ReadableStreamBYOBRequest {
    constructor(){
        throw new TypeError("Illegal constructor");
    }
    get view() {
        if (!fe(this)) throw Be("view");
        return this._view;
    }
    respond(e) {
        if (!fe(this)) throw Be("respond");
        if ($(e, 1, "respond"), e = N(e, "First parameter"), void 0 === this._associatedReadableByteStreamController) throw new TypeError("This BYOB request has been invalidated");
        this._view.buffer, function(e, t) {
            const r = e._pendingPullIntos.peek();
            if ("closed" === e._controlledReadableByteStream._state) {
                if (0 !== t) throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            } else {
                if (0 === t) throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
                if (r.bytesFilled + t > r.byteLength) throw new RangeError("bytesWritten out of range");
            }
            r.buffer = r.buffer, qe(e, t);
        }(this._associatedReadableByteStreamController, e);
    }
    respondWithNewView(e) {
        if (!fe(this)) throw Be("respondWithNewView");
        if ($(e, 1, "respondWithNewView"), !ArrayBuffer.isView(e)) throw new TypeError("You can only respond with array buffer views");
        if (void 0 === this._associatedReadableByteStreamController) throw new TypeError("This BYOB request has been invalidated");
        e.buffer, function(e, t) {
            const r = e._pendingPullIntos.peek();
            if ("closed" === e._controlledReadableByteStream._state) {
                if (0 !== t.byteLength) throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            } else if (0 === t.byteLength) throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            if (r.byteOffset + r.bytesFilled !== t.byteOffset) throw new RangeError("The region specified by view does not match byobRequest");
            if (r.bufferByteLength !== t.buffer.byteLength) throw new RangeError("The buffer of view has different capacity than byobRequest");
            if (r.bytesFilled + t.byteLength > r.byteLength) throw new RangeError("The region specified by view is larger than byobRequest");
            const o = t.byteLength;
            r.buffer = t.buffer, qe(e, o);
        }(this._associatedReadableByteStreamController, e);
    }
}
Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
    respond: {
        enumerable: !0
    },
    respondWithNewView: {
        enumerable: !0
    },
    view: {
        enumerable: !0
    }
}), n(ReadableStreamBYOBRequest.prototype.respond, "respond"), n(ReadableStreamBYOBRequest.prototype.respondWithNewView, "respondWithNewView"), "symbol" == typeof e.toStringTag && Object.defineProperty(ReadableStreamBYOBRequest.prototype, e.toStringTag, {
    value: "ReadableStreamBYOBRequest",
    configurable: !0
});
class ReadableByteStreamController {
    constructor(){
        throw new TypeError("Illegal constructor");
    }
    get byobRequest() {
        if (!de(this)) throw Ae("byobRequest");
        return function(e) {
            if (null === e._byobRequest && e._pendingPullIntos.length > 0) {
                const t = e._pendingPullIntos.peek(), r = new Uint8Array(t.buffer, t.byteOffset + t.bytesFilled, t.byteLength - t.bytesFilled), o = Object.create(ReadableStreamBYOBRequest.prototype);
                !function(e, t, r) {
                    e._associatedReadableByteStreamController = t, e._view = r;
                }(o, e, r), e._byobRequest = o;
            }
            return e._byobRequest;
        }(this);
    }
    get desiredSize() {
        if (!de(this)) throw Ae("desiredSize");
        return ke(this);
    }
    close() {
        if (!de(this)) throw Ae("close");
        if (this._closeRequested) throw new TypeError("The stream has already been closed; do not close it again!");
        const e = this._controlledReadableByteStream._state;
        if ("readable" !== e) throw new TypeError(`The stream (in ${e} state) is not in the readable state and cannot be closed`);
        !function(e) {
            const t = e._controlledReadableByteStream;
            if (e._closeRequested || "readable" !== t._state) return;
            if (e._queueTotalSize > 0) return void (e._closeRequested = !0);
            if (e._pendingPullIntos.length > 0) {
                if (e._pendingPullIntos.peek().bytesFilled > 0) {
                    const t = new TypeError("Insufficient bytes to fill elements in the given buffer");
                    throw Pe(e, t), t;
                }
            }
            Ee(e), Xt(t);
        }(this);
    }
    enqueue(e) {
        if (!de(this)) throw Ae("enqueue");
        if ($(e, 1, "enqueue"), !ArrayBuffer.isView(e)) throw new TypeError("chunk must be an array buffer view");
        if (0 === e.byteLength) throw new TypeError("chunk must have non-zero byteLength");
        if (0 === e.buffer.byteLength) throw new TypeError("chunk's buffer must have non-zero byteLength");
        if (this._closeRequested) throw new TypeError("stream is closed or draining");
        const t = this._controlledReadableByteStream._state;
        if ("readable" !== t) throw new TypeError(`The stream (in ${t} state) is not in the readable state and cannot be enqueued to`);
        !function(e, t) {
            const r = e._controlledReadableByteStream;
            if (e._closeRequested || "readable" !== r._state) return;
            const o = t.buffer, n = t.byteOffset, a = t.byteLength, i = o;
            if (e._pendingPullIntos.length > 0) {
                const t = e._pendingPullIntos.peek();
                t.buffer, Re(e), t.buffer = t.buffer, "none" === t.readerType && ge(e, t);
            }
            if (J(r)) if (function(e) {
                const t = e._controlledReadableByteStream._reader;
                for(; t._readRequests.length > 0;){
                    if (0 === e._queueTotalSize) return;
                    We(e, t._readRequests.shift());
                }
            }(e), 0 === X(r)) me(e, i, n, a);
            else {
                e._pendingPullIntos.length > 0 && Ce(e);
                G(r, new Uint8Array(i, n, a), !1);
            }
            else Le(r) ? (me(e, i, n, a), Te(e)) : me(e, i, n, a);
            be(e);
        }(this, e);
    }
    error(e) {
        if (!de(this)) throw Ae("error");
        Pe(this, e);
    }
    [T](e) {
        he(this), ce(this);
        const t = this._cancelAlgorithm(e);
        return Ee(this), t;
    }
    [q](e) {
        const t = this._controlledReadableByteStream;
        if (this._queueTotalSize > 0) return void We(this, e);
        const r = this._autoAllocateChunkSize;
        if (void 0 !== r) {
            let t;
            try {
                t = new ArrayBuffer(r);
            } catch (t) {
                return void e._errorSteps(t);
            }
            const o = {
                buffer: t,
                bufferByteLength: r,
                byteOffset: 0,
                byteLength: r,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
            };
            this._pendingPullIntos.push(o);
        }
        U(t, e), be(this);
    }
    [C]() {
        if (this._pendingPullIntos.length > 0) {
            const e = this._pendingPullIntos.peek();
            e.readerType = "none", this._pendingPullIntos = new S, this._pendingPullIntos.push(e);
        }
    }
}
function de(e) {
    return !!r(e) && !!Object.prototype.hasOwnProperty.call(e, "_controlledReadableByteStream") && e instanceof ReadableByteStreamController;
}
function fe(e) {
    return !!r(e) && !!Object.prototype.hasOwnProperty.call(e, "_associatedReadableByteStreamController") && e instanceof ReadableStreamBYOBRequest;
}
function be(e) {
    const t = function(e) {
        const t = e._controlledReadableByteStream;
        if ("readable" !== t._state) return !1;
        if (e._closeRequested) return !1;
        if (!e._started) return !1;
        if (J(t) && X(t) > 0) return !0;
        if (Le(t) && ze(t) > 0) return !0;
        if (ke(e) > 0) return !0;
        return !1;
    }(e);
    if (!t) return;
    if (e._pulling) return void (e._pullAgain = !0);
    e._pulling = !0;
    b(e._pullAlgorithm(), ()=>(e._pulling = !1, e._pullAgain && (e._pullAgain = !1, be(e)), null), (t)=>(Pe(e, t), null));
}
function he(e) {
    Re(e), e._pendingPullIntos = new S;
}
function _e(e, t) {
    let r = !1;
    "closed" === e._state && (r = !0);
    const o = pe(t);
    "default" === t.readerType ? G(e, o, r) : function(e, t, r) {
        const o = e._reader._readIntoRequests.shift();
        r ? o._closeSteps(t) : o._chunkSteps(t);
    }(e, o, r);
}
function pe(e) {
    const t = e.bytesFilled, r = e.elementSize;
    return new e.viewConstructor(e.buffer, e.byteOffset, t / r);
}
function me(e, t, r, o) {
    e._queue.push({
        buffer: t,
        byteOffset: r,
        byteLength: o
    }), e._queueTotalSize += o;
}
function ye(e, t, r, o) {
    let n;
    try {
        n = t.slice(r, r + o);
    } catch (t) {
        throw Pe(e, t), t;
    }
    me(e, n, 0, o);
}
function ge(e, t) {
    t.bytesFilled > 0 && ye(e, t.buffer, t.byteOffset, t.bytesFilled), Ce(e);
}
function we(e, t) {
    const r = t.elementSize, o = t.bytesFilled - t.bytesFilled % r, n = Math.min(e._queueTotalSize, t.byteLength - t.bytesFilled), a = t.bytesFilled + n, i = a - a % r;
    let l = n, s = !1;
    i > o && (l = i - t.bytesFilled, s = !0);
    const u = e._queue;
    for(; l > 0;){
        const r = u.peek(), o = Math.min(l, r.byteLength), n = t.byteOffset + t.bytesFilled;
        ie(t.buffer, n, r.buffer, r.byteOffset, o), r.byteLength === o ? u.shift() : (r.byteOffset += o, r.byteLength -= o), e._queueTotalSize -= o, Se(e, o, t), l -= o;
    }
    return s;
}
function Se(e, t, r) {
    r.bytesFilled += t;
}
function ve(e) {
    0 === e._queueTotalSize && e._closeRequested ? (Ee(e), Xt(e._controlledReadableByteStream)) : be(e);
}
function Re(e) {
    null !== e._byobRequest && (e._byobRequest._associatedReadableByteStreamController = void 0, e._byobRequest._view = null, e._byobRequest = null);
}
function Te(e) {
    for(; e._pendingPullIntos.length > 0;){
        if (0 === e._queueTotalSize) return;
        const t = e._pendingPullIntos.peek();
        we(e, t) && (Ce(e), _e(e._controlledReadableByteStream, t));
    }
}
function qe(e, t) {
    const r = e._pendingPullIntos.peek();
    Re(e);
    "closed" === e._controlledReadableByteStream._state ? function(e, t) {
        "none" === t.readerType && Ce(e);
        const r = e._controlledReadableByteStream;
        if (Le(r)) for(; ze(r) > 0;)_e(r, Ce(e));
    }(e, r) : function(e, t, r) {
        if (Se(0, t, r), "none" === r.readerType) return ge(e, r), void Te(e);
        if (r.bytesFilled < r.elementSize) return;
        Ce(e);
        const o = r.bytesFilled % r.elementSize;
        if (o > 0) {
            const t = r.byteOffset + r.bytesFilled;
            ye(e, r.buffer, t - o, o);
        }
        r.bytesFilled -= o, _e(e._controlledReadableByteStream, r), Te(e);
    }(e, t, r), be(e);
}
function Ce(e) {
    return e._pendingPullIntos.shift();
}
function Ee(e) {
    e._pullAlgorithm = void 0, e._cancelAlgorithm = void 0;
}
function Pe(e, t) {
    const r = e._controlledReadableByteStream;
    "readable" === r._state && (he(e), ce(e), Ee(e), Jt(r, t));
}
function We(e, t) {
    const r = e._queue.shift();
    e._queueTotalSize -= r.byteLength, ve(e);
    const o = new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
    t._chunkSteps(o);
}
function ke(e) {
    const t = e._controlledReadableByteStream._state;
    return "errored" === t ? null : "closed" === t ? 0 : e._strategyHWM - e._queueTotalSize;
}
function Oe(e, t, r) {
    const o = Object.create(ReadableByteStreamController.prototype);
    let n, a, i;
    n = void 0 !== t.start ? ()=>t.start(o) : ()=>{}, a = void 0 !== t.pull ? ()=>t.pull(o) : ()=>c(void 0), i = void 0 !== t.cancel ? (e)=>t.cancel(e) : ()=>c(void 0);
    const l = t.autoAllocateChunkSize;
    if (0 === l) throw new TypeError("autoAllocateChunkSize must be greater than 0");
    !function(e, t, r, o, n, a, i) {
        t._controlledReadableByteStream = e, t._pullAgain = !1, t._pulling = !1, t._byobRequest = null, t._queue = t._queueTotalSize = void 0, ce(t), t._closeRequested = !1, t._started = !1, t._strategyHWM = a, t._pullAlgorithm = o, t._cancelAlgorithm = n, t._autoAllocateChunkSize = i, t._pendingPullIntos = new S, e._readableStreamController = t, b(c(r()), ()=>(t._started = !0, be(t), null), (e)=>(Pe(t, e), null));
    }(e, o, n, a, i, r, l);
}
function Be(e) {
    return new TypeError(`ReadableStreamBYOBRequest.prototype.${e} can only be used on a ReadableStreamBYOBRequest`);
}
function Ae(e) {
    return new TypeError(`ReadableByteStreamController.prototype.${e} can only be used on a ReadableByteStreamController`);
}
function je(e, t) {
    e._reader._readIntoRequests.push(t);
}
function ze(e) {
    return e._reader._readIntoRequests.length;
}
function Le(e) {
    const t = e._reader;
    return void 0 !== t && !!Fe(t);
}
Object.defineProperties(ReadableByteStreamController.prototype, {
    close: {
        enumerable: !0
    },
    enqueue: {
        enumerable: !0
    },
    error: {
        enumerable: !0
    },
    byobRequest: {
        enumerable: !0
    },
    desiredSize: {
        enumerable: !0
    }
}), n(ReadableByteStreamController.prototype.close, "close"), n(ReadableByteStreamController.prototype.enqueue, "enqueue"), n(ReadableByteStreamController.prototype.error, "error"), "symbol" == typeof e.toStringTag && Object.defineProperty(ReadableByteStreamController.prototype, e.toStringTag, {
    value: "ReadableByteStreamController",
    configurable: !0
});
class ReadableStreamBYOBReader {
    constructor(e){
        if ($(e, 1, "ReadableStreamBYOBReader"), V(e, "First parameter"), Ut(e)) throw new TypeError("This stream has already been locked for exclusive reading by another reader");
        if (!de(e._readableStreamController)) throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
        E(this, e), this._readIntoRequests = new S;
    }
    get closed() {
        return Fe(this) ? this._closedPromise : d(De("closed"));
    }
    cancel(e) {
        return Fe(this) ? void 0 === this._ownerReadableStream ? d(k("cancel")) : P(this, e) : d(De("cancel"));
    }
    read(e) {
        if (!Fe(this)) return d(De("read"));
        if (!ArrayBuffer.isView(e)) return d(new TypeError("view must be an array buffer view"));
        if (0 === e.byteLength) return d(new TypeError("view must have non-zero byteLength"));
        if (0 === e.buffer.byteLength) return d(new TypeError("view's buffer must have non-zero byteLength"));
        if (e.buffer, void 0 === this._ownerReadableStream) return d(k("read from"));
        let t, r;
        const o = u((e, o)=>{
            t = e, r = o;
        });
        return function(e, t, r) {
            const o = e._ownerReadableStream;
            o._disturbed = !0, "errored" === o._state ? r._errorSteps(o._storedError) : function(e, t, r) {
                const o = e._controlledReadableByteStream;
                let n = 1;
                t.constructor !== DataView && (n = t.constructor.BYTES_PER_ELEMENT);
                const a = t.constructor, i = t.buffer, l = {
                    buffer: i,
                    bufferByteLength: i.byteLength,
                    byteOffset: t.byteOffset,
                    byteLength: t.byteLength,
                    bytesFilled: 0,
                    elementSize: n,
                    viewConstructor: a,
                    readerType: "byob"
                };
                if (e._pendingPullIntos.length > 0) return e._pendingPullIntos.push(l), void je(o, r);
                if ("closed" !== o._state) {
                    if (e._queueTotalSize > 0) {
                        if (we(e, l)) {
                            const t = pe(l);
                            return ve(e), void r._chunkSteps(t);
                        }
                        if (e._closeRequested) {
                            const t = new TypeError("Insufficient bytes to fill elements in the given buffer");
                            return Pe(e, t), void r._errorSteps(t);
                        }
                    }
                    e._pendingPullIntos.push(l), je(o, r), be(e);
                } else {
                    const e = new a(l.buffer, l.byteOffset, 0);
                    r._closeSteps(e);
                }
            }(o._readableStreamController, t, r);
        }(this, e, {
            _chunkSteps: (e)=>t({
                    value: e,
                    done: !1
                }),
            _closeSteps: (e)=>t({
                    value: e,
                    done: !0
                }),
            _errorSteps: (e)=>r(e)
        }), o;
    }
    releaseLock() {
        if (!Fe(this)) throw De("releaseLock");
        void 0 !== this._ownerReadableStream && function(e) {
            W(e);
            const t = new TypeError("Reader was released");
            Ie(e, t);
        }(this);
    }
}
function Fe(e) {
    return !!r(e) && !!Object.prototype.hasOwnProperty.call(e, "_readIntoRequests") && e instanceof ReadableStreamBYOBReader;
}
function Ie(e, t) {
    const r = e._readIntoRequests;
    e._readIntoRequests = new S, r.forEach((e)=>{
        e._errorSteps(t);
    });
}
function De(e) {
    return new TypeError(`ReadableStreamBYOBReader.prototype.${e} can only be used on a ReadableStreamBYOBReader`);
}
function $e(e, t) {
    const { highWaterMark: r } = e;
    if (void 0 === r) return t;
    if (ae(r) || r < 0) throw new RangeError("Invalid highWaterMark");
    return r;
}
function Me(e) {
    const { size: t } = e;
    return t || (()=>1);
}
function Ye(e, t) {
    F(e, t);
    const r = null == e ? void 0 : e.highWaterMark, o = null == e ? void 0 : e.size;
    return {
        highWaterMark: void 0 === r ? void 0 : Y(r),
        size: void 0 === o ? void 0 : Qe(o, `${t} has member 'size' that`)
    };
}
function Qe(e, t) {
    return I(e, t), (t)=>Y(e(t));
}
function Ne(e, t, r) {
    return I(e, r), (r)=>w(e, t, [
            r
        ]);
}
function He(e, t, r) {
    return I(e, r), ()=>w(e, t, []);
}
function xe(e, t, r) {
    return I(e, r), (r)=>g(e, t, [
            r
        ]);
}
function Ve(e, t, r) {
    return I(e, r), (r, o)=>w(e, t, [
            r,
            o
        ]);
}
Object.defineProperties(ReadableStreamBYOBReader.prototype, {
    cancel: {
        enumerable: !0
    },
    read: {
        enumerable: !0
    },
    releaseLock: {
        enumerable: !0
    },
    closed: {
        enumerable: !0
    }
}), n(ReadableStreamBYOBReader.prototype.cancel, "cancel"), n(ReadableStreamBYOBReader.prototype.read, "read"), n(ReadableStreamBYOBReader.prototype.releaseLock, "releaseLock"), "symbol" == typeof e.toStringTag && Object.defineProperty(ReadableStreamBYOBReader.prototype, e.toStringTag, {
    value: "ReadableStreamBYOBReader",
    configurable: !0
});
const Ue = "function" == typeof AbortController;
class WritableStream {
    constructor(e = {}, t = {}){
        void 0 === e ? e = null : D(e, "First parameter");
        const r = Ye(t, "Second parameter"), o = function(e, t) {
            F(e, t);
            const r = null == e ? void 0 : e.abort, o = null == e ? void 0 : e.close, n = null == e ? void 0 : e.start, a = null == e ? void 0 : e.type, i = null == e ? void 0 : e.write;
            return {
                abort: void 0 === r ? void 0 : Ne(r, e, `${t} has member 'abort' that`),
                close: void 0 === o ? void 0 : He(o, e, `${t} has member 'close' that`),
                start: void 0 === n ? void 0 : xe(n, e, `${t} has member 'start' that`),
                write: void 0 === i ? void 0 : Ve(i, e, `${t} has member 'write' that`),
                type: a
            };
        }(e, "First parameter");
        var n;
        (n = this)._state = "writable", n._storedError = void 0, n._writer = void 0, n._writableStreamController = void 0, n._writeRequests = new S, n._inFlightWriteRequest = void 0, n._closeRequest = void 0, n._inFlightCloseRequest = void 0, n._pendingAbortRequest = void 0, n._backpressure = !1;
        if (void 0 !== o.type) throw new RangeError("Invalid type is specified");
        const a = Me(r);
        !function(e, t, r, o) {
            const n = Object.create(WritableStreamDefaultController.prototype);
            let a, i, l, s;
            a = void 0 !== t.start ? ()=>t.start(n) : ()=>{};
            i = void 0 !== t.write ? (e)=>t.write(e, n) : ()=>c(void 0);
            l = void 0 !== t.close ? ()=>t.close() : ()=>c(void 0);
            s = void 0 !== t.abort ? (e)=>t.abort(e) : ()=>c(void 0);
            !function(e, t, r, o, n, a, i, l) {
                t._controlledWritableStream = e, e._writableStreamController = t, t._queue = void 0, t._queueTotalSize = void 0, ce(t), t._abortReason = void 0, t._abortController = function() {
                    if (Ue) return new AbortController;
                }(), t._started = !1, t._strategySizeAlgorithm = l, t._strategyHWM = i, t._writeAlgorithm = o, t._closeAlgorithm = n, t._abortAlgorithm = a;
                const s = bt(t);
                nt(e, s);
                const u = r();
                b(c(u), ()=>(t._started = !0, dt(t), null), (r)=>(t._started = !0, Ze(e, r), null));
            }(e, n, a, i, l, s, r, o);
        }(this, o, $e(r, 1), a);
    }
    get locked() {
        if (!Ge(this)) throw _t("locked");
        return Xe(this);
    }
    abort(e) {
        return Ge(this) ? Xe(this) ? d(new TypeError("Cannot abort a stream that already has a writer")) : Je(this, e) : d(_t("abort"));
    }
    close() {
        return Ge(this) ? Xe(this) ? d(new TypeError("Cannot close a stream that already has a writer")) : rt(this) ? d(new TypeError("Cannot close an already-closing stream")) : Ke(this) : d(_t("close"));
    }
    getWriter() {
        if (!Ge(this)) throw _t("getWriter");
        return new WritableStreamDefaultWriter(this);
    }
}
function Ge(e) {
    return !!r(e) && !!Object.prototype.hasOwnProperty.call(e, "_writableStreamController") && e instanceof WritableStream;
}
function Xe(e) {
    return void 0 !== e._writer;
}
function Je(e, t) {
    var r;
    if ("closed" === e._state || "errored" === e._state) return c(void 0);
    e._writableStreamController._abortReason = t, null === (r = e._writableStreamController._abortController) || void 0 === r || r.abort(t);
    const o = e._state;
    if ("closed" === o || "errored" === o) return c(void 0);
    if (void 0 !== e._pendingAbortRequest) return e._pendingAbortRequest._promise;
    let n = !1;
    "erroring" === o && (n = !0, t = void 0);
    const a = u((r, o)=>{
        e._pendingAbortRequest = {
            _promise: void 0,
            _resolve: r,
            _reject: o,
            _reason: t,
            _wasAlreadyErroring: n
        };
    });
    return e._pendingAbortRequest._promise = a, n || et(e, t), a;
}
function Ke(e) {
    const t = e._state;
    if ("closed" === t || "errored" === t) return d(new TypeError(`The stream (in ${t} state) is not in the writable state and cannot be closed`));
    const r = u((t, r)=>{
        const o = {
            _resolve: t,
            _reject: r
        };
        e._closeRequest = o;
    }), o = e._writer;
    var n;
    return void 0 !== o && e._backpressure && "writable" === t && Et(o), ue(n = e._writableStreamController, lt, 0), dt(n), r;
}
function Ze(e, t) {
    "writable" !== e._state ? tt(e) : et(e, t);
}
function et(e, t) {
    const r = e._writableStreamController;
    e._state = "erroring", e._storedError = t;
    const o = e._writer;
    void 0 !== o && it(o, t), !function(e) {
        if (void 0 === e._inFlightWriteRequest && void 0 === e._inFlightCloseRequest) return !1;
        return !0;
    }(e) && r._started && tt(e);
}
function tt(e) {
    e._state = "errored", e._writableStreamController[R]();
    const t = e._storedError;
    if (e._writeRequests.forEach((e)=>{
        e._reject(t);
    }), e._writeRequests = new S, void 0 === e._pendingAbortRequest) return void ot(e);
    const r = e._pendingAbortRequest;
    if (e._pendingAbortRequest = void 0, r._wasAlreadyErroring) return r._reject(t), void ot(e);
    b(e._writableStreamController[v](r._reason), ()=>(r._resolve(), ot(e), null), (t)=>(r._reject(t), ot(e), null));
}
function rt(e) {
    return void 0 !== e._closeRequest || void 0 !== e._inFlightCloseRequest;
}
function ot(e) {
    void 0 !== e._closeRequest && (e._closeRequest._reject(e._storedError), e._closeRequest = void 0);
    const t = e._writer;
    void 0 !== t && St(t, e._storedError);
}
function nt(e, t) {
    const r = e._writer;
    void 0 !== r && t !== e._backpressure && (t ? function(e) {
        Rt(e);
    }(r) : Et(r)), e._backpressure = t;
}
Object.defineProperties(WritableStream.prototype, {
    abort: {
        enumerable: !0
    },
    close: {
        enumerable: !0
    },
    getWriter: {
        enumerable: !0
    },
    locked: {
        enumerable: !0
    }
}), n(WritableStream.prototype.abort, "abort"), n(WritableStream.prototype.close, "close"), n(WritableStream.prototype.getWriter, "getWriter"), "symbol" == typeof e.toStringTag && Object.defineProperty(WritableStream.prototype, e.toStringTag, {
    value: "WritableStream",
    configurable: !0
});
class WritableStreamDefaultWriter {
    constructor(e){
        if ($(e, 1, "WritableStreamDefaultWriter"), function(e, t) {
            if (!Ge(e)) throw new TypeError(`${t} is not a WritableStream.`);
        }(e, "First parameter"), Xe(e)) throw new TypeError("This stream has already been locked for exclusive writing by another writer");
        this._ownerWritableStream = e, e._writer = this;
        const t = e._state;
        if ("writable" === t) !rt(e) && e._backpressure ? Rt(this) : qt(this), gt(this);
        else if ("erroring" === t) Tt(this, e._storedError), gt(this);
        else if ("closed" === t) qt(this), gt(r = this), vt(r);
        else {
            const t = e._storedError;
            Tt(this, t), wt(this, t);
        }
        var r;
    }
    get closed() {
        return at(this) ? this._closedPromise : d(mt("closed"));
    }
    get desiredSize() {
        if (!at(this)) throw mt("desiredSize");
        if (void 0 === this._ownerWritableStream) throw yt("desiredSize");
        return function(e) {
            const t = e._ownerWritableStream, r = t._state;
            if ("errored" === r || "erroring" === r) return null;
            if ("closed" === r) return 0;
            return ct(t._writableStreamController);
        }(this);
    }
    get ready() {
        return at(this) ? this._readyPromise : d(mt("ready"));
    }
    abort(e) {
        return at(this) ? void 0 === this._ownerWritableStream ? d(yt("abort")) : function(e, t) {
            return Je(e._ownerWritableStream, t);
        }(this, e) : d(mt("abort"));
    }
    close() {
        if (!at(this)) return d(mt("close"));
        const e = this._ownerWritableStream;
        return void 0 === e ? d(yt("close")) : rt(e) ? d(new TypeError("Cannot close an already-closing stream")) : Ke(this._ownerWritableStream);
    }
    releaseLock() {
        if (!at(this)) throw mt("releaseLock");
        void 0 !== this._ownerWritableStream && function(e) {
            const t = e._ownerWritableStream, r = new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
            it(e, r), function(e, t) {
                "pending" === e._closedPromiseState ? St(e, t) : function(e, t) {
                    wt(e, t);
                }(e, t);
            }(e, r), t._writer = void 0, e._ownerWritableStream = void 0;
        }(this);
    }
    write(e) {
        return at(this) ? void 0 === this._ownerWritableStream ? d(yt("write to")) : function(e, t) {
            const r = e._ownerWritableStream, o = r._writableStreamController, n = function(e, t) {
                try {
                    return e._strategySizeAlgorithm(t);
                } catch (t) {
                    return ft(e, t), 1;
                }
            }(o, t);
            if (r !== e._ownerWritableStream) return d(yt("write to"));
            const a = r._state;
            if ("errored" === a) return d(r._storedError);
            if (rt(r) || "closed" === a) return d(new TypeError("The stream is closing or closed and cannot be written to"));
            if ("erroring" === a) return d(r._storedError);
            const i = function(e) {
                return u((t, r)=>{
                    const o = {
                        _resolve: t,
                        _reject: r
                    };
                    e._writeRequests.push(o);
                });
            }(r);
            return function(e, t, r) {
                try {
                    ue(e, t, r);
                } catch (t) {
                    return void ft(e, t);
                }
                const o = e._controlledWritableStream;
                if (!rt(o) && "writable" === o._state) {
                    nt(o, bt(e));
                }
                dt(e);
            }(o, t, n), i;
        }(this, e) : d(mt("write"));
    }
}
function at(e) {
    return !!r(e) && !!Object.prototype.hasOwnProperty.call(e, "_ownerWritableStream") && e instanceof WritableStreamDefaultWriter;
}
function it(e, t) {
    "pending" === e._readyPromiseState ? Ct(e, t) : function(e, t) {
        Tt(e, t);
    }(e, t);
}
Object.defineProperties(WritableStreamDefaultWriter.prototype, {
    abort: {
        enumerable: !0
    },
    close: {
        enumerable: !0
    },
    releaseLock: {
        enumerable: !0
    },
    write: {
        enumerable: !0
    },
    closed: {
        enumerable: !0
    },
    desiredSize: {
        enumerable: !0
    },
    ready: {
        enumerable: !0
    }
}), n(WritableStreamDefaultWriter.prototype.abort, "abort"), n(WritableStreamDefaultWriter.prototype.close, "close"), n(WritableStreamDefaultWriter.prototype.releaseLock, "releaseLock"), n(WritableStreamDefaultWriter.prototype.write, "write"), "symbol" == typeof e.toStringTag && Object.defineProperty(WritableStreamDefaultWriter.prototype, e.toStringTag, {
    value: "WritableStreamDefaultWriter",
    configurable: !0
});
const lt = {};
class WritableStreamDefaultController {
    constructor(){
        throw new TypeError("Illegal constructor");
    }
    get abortReason() {
        if (!st(this)) throw pt("abortReason");
        return this._abortReason;
    }
    get signal() {
        if (!st(this)) throw pt("signal");
        if (void 0 === this._abortController) throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
        return this._abortController.signal;
    }
    error(e) {
        if (!st(this)) throw pt("error");
        "writable" === this._controlledWritableStream._state && ht(this, e);
    }
    [v](e) {
        const t = this._abortAlgorithm(e);
        return ut(this), t;
    }
    [R]() {
        ce(this);
    }
}
function st(e) {
    return !!r(e) && !!Object.prototype.hasOwnProperty.call(e, "_controlledWritableStream") && e instanceof WritableStreamDefaultController;
}
function ut(e) {
    e._writeAlgorithm = void 0, e._closeAlgorithm = void 0, e._abortAlgorithm = void 0, e._strategySizeAlgorithm = void 0;
}
function ct(e) {
    return e._strategyHWM - e._queueTotalSize;
}
function dt(e) {
    const t = e._controlledWritableStream;
    if (!e._started) return;
    if (void 0 !== t._inFlightWriteRequest) return;
    if ("erroring" === t._state) return void tt(t);
    if (0 === e._queue.length) return;
    const r = e._queue.peek().value;
    r === lt ? function(e) {
        const t = e._controlledWritableStream;
        (function(e) {
            e._inFlightCloseRequest = e._closeRequest, e._closeRequest = void 0;
        })(t), se(e);
        const r = e._closeAlgorithm();
        ut(e), b(r, ()=>((function(e) {
                e._inFlightCloseRequest._resolve(void 0), e._inFlightCloseRequest = void 0, "erroring" === e._state && (e._storedError = void 0, void 0 !== e._pendingAbortRequest && (e._pendingAbortRequest._resolve(), e._pendingAbortRequest = void 0)), e._state = "closed";
                const t = e._writer;
                void 0 !== t && vt(t);
            })(t), null), (e)=>((function(e, t) {
                e._inFlightCloseRequest._reject(t), e._inFlightCloseRequest = void 0, void 0 !== e._pendingAbortRequest && (e._pendingAbortRequest._reject(t), e._pendingAbortRequest = void 0), Ze(e, t);
            })(t, e), null));
    }(e) : function(e, t) {
        const r = e._controlledWritableStream;
        !function(e) {
            e._inFlightWriteRequest = e._writeRequests.shift();
        }(r);
        b(e._writeAlgorithm(t), ()=>{
            !function(e) {
                e._inFlightWriteRequest._resolve(void 0), e._inFlightWriteRequest = void 0;
            }(r);
            const t = r._state;
            if (se(e), !rt(r) && "writable" === t) {
                const t = bt(e);
                nt(r, t);
            }
            return dt(e), null;
        }, (t)=>("writable" === r._state && ut(e), function(e, t) {
                e._inFlightWriteRequest._reject(t), e._inFlightWriteRequest = void 0, Ze(e, t);
            }(r, t), null));
    }(e, r);
}
function ft(e, t) {
    "writable" === e._controlledWritableStream._state && ht(e, t);
}
function bt(e) {
    return ct(e) <= 0;
}
function ht(e, t) {
    const r = e._controlledWritableStream;
    ut(e), et(r, t);
}
function _t(e) {
    return new TypeError(`WritableStream.prototype.${e} can only be used on a WritableStream`);
}
function pt(e) {
    return new TypeError(`WritableStreamDefaultController.prototype.${e} can only be used on a WritableStreamDefaultController`);
}
function mt(e) {
    return new TypeError(`WritableStreamDefaultWriter.prototype.${e} can only be used on a WritableStreamDefaultWriter`);
}
function yt(e) {
    return new TypeError("Cannot " + e + " a stream using a released writer");
}
function gt(e) {
    e._closedPromise = u((t, r)=>{
        e._closedPromise_resolve = t, e._closedPromise_reject = r, e._closedPromiseState = "pending";
    });
}
function wt(e, t) {
    gt(e), St(e, t);
}
function St(e, t) {
    void 0 !== e._closedPromise_reject && (m(e._closedPromise), e._closedPromise_reject(t), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "rejected");
}
function vt(e) {
    void 0 !== e._closedPromise_resolve && (e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "resolved");
}
function Rt(e) {
    e._readyPromise = u((t, r)=>{
        e._readyPromise_resolve = t, e._readyPromise_reject = r;
    }), e._readyPromiseState = "pending";
}
function Tt(e, t) {
    Rt(e), Ct(e, t);
}
function qt(e) {
    Rt(e), Et(e);
}
function Ct(e, t) {
    void 0 !== e._readyPromise_reject && (m(e._readyPromise), e._readyPromise_reject(t), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "rejected");
}
function Et(e) {
    void 0 !== e._readyPromise_resolve && (e._readyPromise_resolve(void 0), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "fulfilled");
}
Object.defineProperties(WritableStreamDefaultController.prototype, {
    abortReason: {
        enumerable: !0
    },
    signal: {
        enumerable: !0
    },
    error: {
        enumerable: !0
    }
}), "symbol" == typeof e.toStringTag && Object.defineProperty(WritableStreamDefaultController.prototype, e.toStringTag, {
    value: "WritableStreamDefaultController",
    configurable: !0
});
const Pt = "undefined" != typeof DOMException ? DOMException : void 0;
const Wt = function(e) {
    if ("function" != typeof e && "object" != typeof e) return !1;
    try {
        return new e, !0;
    } catch (e) {
        return !1;
    }
}(Pt) ? Pt : function() {
    const e = function(e, t) {
        this.message = e || "", this.name = t || "Error", Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
    };
    return e.prototype = Object.create(Error.prototype), Object.defineProperty(e.prototype, "constructor", {
        value: e,
        writable: !0,
        configurable: !0
    }), e;
}();
function kt(e, t, r, o, n, a) {
    const i = e.getReader(), l = t.getWriter();
    Vt(e) && (e._disturbed = !0);
    let s, _, g, w = !1, S = !1, v = "readable", R = "writable", T = !1, q = !1;
    const C = u((e)=>{
        g = e;
    });
    let E = Promise.resolve(void 0);
    return u((P, W)=>{
        let k;
        function O() {
            if (w) return;
            const e = u((e, t)=>{
                !function r(o) {
                    o ? e() : f(function() {
                        if (w) return c(!0);
                        return f(l.ready, ()=>f(i.read(), (e)=>!!e.done || (E = l.write(e.value), m(E), !1)));
                    }(), r, t);
                }(!1);
            });
            m(e);
        }
        function B() {
            return v = "closed", r ? L() : z(()=>(Ge(t) && (T = rt(t), R = t._state), T || "closed" === R ? c(void 0) : "erroring" === R || "errored" === R ? d(_) : (T = !0, l.close())), !1, void 0), null;
        }
        function A(e) {
            return w || (v = "errored", s = e, o ? L(!0, e) : z(()=>l.abort(e), !0, e)), null;
        }
        function j(e) {
            return S || (R = "errored", _ = e, n ? L(!0, e) : z(()=>i.cancel(e), !0, e)), null;
        }
        if (void 0 !== a && (k = ()=>{
            const e = void 0 !== a.reason ? a.reason : new Wt("Aborted", "AbortError"), t = [];
            o || t.push(()=>"writable" === R ? l.abort(e) : c(void 0)), n || t.push(()=>"readable" === v ? i.cancel(e) : c(void 0)), z(()=>Promise.all(t.map((e)=>e())), !0, e);
        }, a.aborted ? k() : a.addEventListener("abort", k)), Vt(e) && (v = e._state, s = e._storedError), Ge(t) && (R = t._state, _ = t._storedError, T = rt(t)), Vt(e) && Ge(t) && (q = !0, g()), "errored" === v) A(s);
        else if ("erroring" === R || "errored" === R) j(_);
        else if ("closed" === v) B();
        else if (T || "closed" === R) {
            const e = new TypeError("the destination writable stream closed before all data could be piped to it");
            n ? L(!0, e) : z(()=>i.cancel(e), !0, e);
        }
        function z(e, t, r) {
            function o() {
                return "writable" !== R || T ? n() : h(function() {
                    let e;
                    return c(function t() {
                        if (e !== E) return e = E, p(E, t, t);
                    }());
                }(), n), null;
            }
            function n() {
                return e ? b(e(), ()=>F(t, r), (e)=>F(!0, e)) : F(t, r), null;
            }
            w || (w = !0, q ? o() : h(C, o));
        }
        function L(e, t) {
            z(void 0, e, t);
        }
        function F(e, t) {
            return S = !0, l.releaseLock(), i.releaseLock(), void 0 !== a && a.removeEventListener("abort", k), e ? W(t) : P(void 0), null;
        }
        w || (b(i.closed, B, A), b(l.closed, function() {
            return S || (R = "closed"), null;
        }, j)), q ? O() : y(()=>{
            q = !0, g(), O();
        });
    });
}
function Ot(e, t) {
    return function(e) {
        try {
            return e.getReader({
                mode: "byob"
            }).releaseLock(), !0;
        } catch (e) {
            return !1;
        }
    }(e) ? function(e) {
        let t, r, o, n, a, i = e.getReader(), l = !1, s = !1, d = !1, f = !1, h = !1, p = !1;
        const m = u((e)=>{
            a = e;
        });
        function y(e) {
            _(e.closed, (t)=>(e !== i || (o.error(t), n.error(t), h && p || a(void 0)), null));
        }
        function g() {
            l && (i.releaseLock(), i = e.getReader(), y(i), l = !1), b(i.read(), (e)=>{
                var t, r;
                if (d = !1, f = !1, e.done) return h || o.close(), p || n.close(), null === (t = o.byobRequest) || void 0 === t || t.respond(0), null === (r = n.byobRequest) || void 0 === r || r.respond(0), h && p || a(void 0), null;
                const l = e.value, u = l;
                let c = l;
                if (!h && !p) try {
                    c = le(l);
                } catch (e) {
                    return o.error(e), n.error(e), a(i.cancel(e)), null;
                }
                return h || o.enqueue(u), p || n.enqueue(c), s = !1, d ? S() : f && v(), null;
            }, ()=>(s = !1, null));
        }
        function w(t, r) {
            l || (i.releaseLock(), i = e.getReader({
                mode: "byob"
            }), y(i), l = !0);
            const u = r ? n : o, c = r ? o : n;
            b(i.read(t), (e)=>{
                var t;
                d = !1, f = !1;
                const o = r ? p : h, n = r ? h : p;
                if (e.done) {
                    o || u.close(), n || c.close();
                    const r = e.value;
                    return void 0 !== r && (o || u.byobRequest.respondWithNewView(r), n || null === (t = c.byobRequest) || void 0 === t || t.respond(0)), o && n || a(void 0), null;
                }
                const l = e.value;
                if (n) o || u.byobRequest.respondWithNewView(l);
                else {
                    let e;
                    try {
                        e = le(l);
                    } catch (e) {
                        return u.error(e), c.error(e), a(i.cancel(e)), null;
                    }
                    o || u.byobRequest.respondWithNewView(l), c.enqueue(e);
                }
                return s = !1, d ? S() : f && v(), null;
            }, ()=>(s = !1, null));
        }
        function S() {
            if (s) return d = !0, c(void 0);
            s = !0;
            const e = o.byobRequest;
            return null === e ? g() : w(e.view, !1), c(void 0);
        }
        function v() {
            if (s) return f = !0, c(void 0);
            s = !0;
            const e = n.byobRequest;
            return null === e ? g() : w(e.view, !0), c(void 0);
        }
        function R(e) {
            if (h = !0, t = e, p) {
                const e = [
                    t,
                    r
                ], o = i.cancel(e);
                a(o);
            }
            return m;
        }
        function T(e) {
            if (p = !0, r = e, h) {
                const e = [
                    t,
                    r
                ], o = i.cancel(e);
                a(o);
            }
            return m;
        }
        const q = new ReadableStream({
            type: "bytes",
            start (e) {
                o = e;
            },
            pull: S,
            cancel: R
        }), C = new ReadableStream({
            type: "bytes",
            start (e) {
                n = e;
            },
            pull: v,
            cancel: T
        });
        return y(i), [
            q,
            C
        ];
    }(e) : function(e, t) {
        const r = e.getReader();
        let o, n, a, i, l, s = !1, d = !1, f = !1, h = !1;
        const p = u((e)=>{
            l = e;
        });
        function m() {
            return s ? (d = !0, c(void 0)) : (s = !0, b(r.read(), (e)=>{
                if (d = !1, e.done) return f || a.close(), h || i.close(), f && h || l(void 0), null;
                const t = e.value, r = t, o = t;
                return f || a.enqueue(r), h || i.enqueue(o), s = !1, d && m(), null;
            }, ()=>(s = !1, null)), c(void 0));
        }
        function y(e) {
            if (f = !0, o = e, h) {
                const e = [
                    o,
                    n
                ], t = r.cancel(e);
                l(t);
            }
            return p;
        }
        function g(e) {
            if (h = !0, n = e, f) {
                const e = [
                    o,
                    n
                ], t = r.cancel(e);
                l(t);
            }
            return p;
        }
        const w = new ReadableStream({
            start (e) {
                a = e;
            },
            pull: m,
            cancel: y
        }), S = new ReadableStream({
            start (e) {
                i = e;
            },
            pull: m,
            cancel: g
        });
        return _(r.closed, (e)=>(a.error(e), i.error(e), f && h || l(void 0), null)), [
            w,
            S
        ];
    }(e);
}
class ReadableStreamDefaultController {
    constructor(){
        throw new TypeError("Illegal constructor");
    }
    get desiredSize() {
        if (!Bt(this)) throw Dt("desiredSize");
        return Lt(this);
    }
    close() {
        if (!Bt(this)) throw Dt("close");
        if (!Ft(this)) throw new TypeError("The stream is not in a state that permits close");
        !function(e) {
            if (!Ft(e)) return;
            const t = e._controlledReadableStream;
            e._closeRequested = !0, 0 === e._queue.length && (jt(e), Xt(t));
        }(this);
    }
    enqueue(e) {
        if (!Bt(this)) throw Dt("enqueue");
        if (!Ft(this)) throw new TypeError("The stream is not in a state that permits enqueue");
        return function(e, t) {
            if (!Ft(e)) return;
            const r = e._controlledReadableStream;
            if (Ut(r) && X(r) > 0) G(r, t, !1);
            else {
                let r;
                try {
                    r = e._strategySizeAlgorithm(t);
                } catch (t) {
                    throw zt(e, t), t;
                }
                try {
                    ue(e, t, r);
                } catch (t) {
                    throw zt(e, t), t;
                }
            }
            At(e);
        }(this, e);
    }
    error(e) {
        if (!Bt(this)) throw Dt("error");
        zt(this, e);
    }
    [T](e) {
        ce(this);
        const t = this._cancelAlgorithm(e);
        return jt(this), t;
    }
    [q](e) {
        const t = this._controlledReadableStream;
        if (this._queue.length > 0) {
            const r = se(this);
            this._closeRequested && 0 === this._queue.length ? (jt(this), Xt(t)) : At(this), e._chunkSteps(r);
        } else U(t, e), At(this);
    }
    [C]() {}
}
function Bt(e) {
    return !!r(e) && !!Object.prototype.hasOwnProperty.call(e, "_controlledReadableStream") && e instanceof ReadableStreamDefaultController;
}
function At(e) {
    const t = function(e) {
        const t = e._controlledReadableStream;
        if (!Ft(e)) return !1;
        if (!e._started) return !1;
        if (Ut(t) && X(t) > 0) return !0;
        if (Lt(e) > 0) return !0;
        return !1;
    }(e);
    if (!t) return;
    if (e._pulling) return void (e._pullAgain = !0);
    e._pulling = !0;
    b(e._pullAlgorithm(), ()=>(e._pulling = !1, e._pullAgain && (e._pullAgain = !1, At(e)), null), (t)=>(zt(e, t), null));
}
function jt(e) {
    e._pullAlgorithm = void 0, e._cancelAlgorithm = void 0, e._strategySizeAlgorithm = void 0;
}
function zt(e, t) {
    const r = e._controlledReadableStream;
    "readable" === r._state && (ce(e), jt(e), Jt(r, t));
}
function Lt(e) {
    const t = e._controlledReadableStream._state;
    return "errored" === t ? null : "closed" === t ? 0 : e._strategyHWM - e._queueTotalSize;
}
function Ft(e) {
    return !e._closeRequested && "readable" === e._controlledReadableStream._state;
}
function It(e, t, r, o) {
    const n = Object.create(ReadableStreamDefaultController.prototype);
    let a, i, l;
    a = void 0 !== t.start ? ()=>t.start(n) : ()=>{}, i = void 0 !== t.pull ? ()=>t.pull(n) : ()=>c(void 0), l = void 0 !== t.cancel ? (e)=>t.cancel(e) : ()=>c(void 0), function(e, t, r, o, n, a, i) {
        t._controlledReadableStream = e, t._queue = void 0, t._queueTotalSize = void 0, ce(t), t._started = !1, t._closeRequested = !1, t._pullAgain = !1, t._pulling = !1, t._strategySizeAlgorithm = i, t._strategyHWM = a, t._pullAlgorithm = o, t._cancelAlgorithm = n, e._readableStreamController = t, b(c(r()), ()=>(t._started = !0, At(t), null), (e)=>(zt(t, e), null));
    }(e, n, a, i, l, r, o);
}
function Dt(e) {
    return new TypeError(`ReadableStreamDefaultController.prototype.${e} can only be used on a ReadableStreamDefaultController`);
}
function $t(e, t, r) {
    return I(e, r), (r)=>w(e, t, [
            r
        ]);
}
function Mt(e, t, r) {
    return I(e, r), (r)=>w(e, t, [
            r
        ]);
}
function Yt(e, t, r) {
    return I(e, r), (r)=>g(e, t, [
            r
        ]);
}
function Qt(e, t) {
    if ("bytes" !== (e = `${e}`)) throw new TypeError(`${t} '${e}' is not a valid enumeration value for ReadableStreamType`);
    return e;
}
function Nt(e, t) {
    if ("byob" !== (e = `${e}`)) throw new TypeError(`${t} '${e}' is not a valid enumeration value for ReadableStreamReaderMode`);
    return e;
}
function Ht(e, t) {
    F(e, t);
    const r = null == e ? void 0 : e.preventAbort, o = null == e ? void 0 : e.preventCancel, n = null == e ? void 0 : e.preventClose, a = null == e ? void 0 : e.signal;
    return void 0 !== a && function(e, t) {
        if (!function(e) {
            if ("object" != typeof e || null === e) return !1;
            try {
                return "boolean" == typeof e.aborted;
            } catch (e) {
                return !1;
            }
        }(e)) throw new TypeError(`${t} is not an AbortSignal.`);
    }(a, `${t} has member 'signal' that`), {
        preventAbort: Boolean(r),
        preventCancel: Boolean(o),
        preventClose: Boolean(n),
        signal: a
    };
}
function xt(e, t) {
    F(e, t);
    const r = null == e ? void 0 : e.readable;
    M(r, "readable", "ReadableWritablePair"), function(e, t) {
        if (!H(e)) throw new TypeError(`${t} is not a ReadableStream.`);
    }(r, `${t} has member 'readable' that`);
    const o = null == e ? void 0 : e.writable;
    return M(o, "writable", "ReadableWritablePair"), function(e, t) {
        if (!x(e)) throw new TypeError(`${t} is not a WritableStream.`);
    }(o, `${t} has member 'writable' that`), {
        readable: r,
        writable: o
    };
}
Object.defineProperties(ReadableStreamDefaultController.prototype, {
    close: {
        enumerable: !0
    },
    enqueue: {
        enumerable: !0
    },
    error: {
        enumerable: !0
    },
    desiredSize: {
        enumerable: !0
    }
}), n(ReadableStreamDefaultController.prototype.close, "close"), n(ReadableStreamDefaultController.prototype.enqueue, "enqueue"), n(ReadableStreamDefaultController.prototype.error, "error"), "symbol" == typeof e.toStringTag && Object.defineProperty(ReadableStreamDefaultController.prototype, e.toStringTag, {
    value: "ReadableStreamDefaultController",
    configurable: !0
});
class ReadableStream {
    constructor(e = {}, t = {}){
        void 0 === e ? e = null : D(e, "First parameter");
        const r = Ye(t, "Second parameter"), o = function(e, t) {
            F(e, t);
            const r = e, o = null == r ? void 0 : r.autoAllocateChunkSize, n = null == r ? void 0 : r.cancel, a = null == r ? void 0 : r.pull, i = null == r ? void 0 : r.start, l = null == r ? void 0 : r.type;
            return {
                autoAllocateChunkSize: void 0 === o ? void 0 : N(o, `${t} has member 'autoAllocateChunkSize' that`),
                cancel: void 0 === n ? void 0 : $t(n, r, `${t} has member 'cancel' that`),
                pull: void 0 === a ? void 0 : Mt(a, r, `${t} has member 'pull' that`),
                start: void 0 === i ? void 0 : Yt(i, r, `${t} has member 'start' that`),
                type: void 0 === l ? void 0 : Qt(l, `${t} has member 'type' that`)
            };
        }(e, "First parameter");
        var n;
        if ((n = this)._state = "readable", n._reader = void 0, n._storedError = void 0, n._disturbed = !1, "bytes" === o.type) {
            if (void 0 !== r.size) throw new RangeError("The strategy for a byte stream cannot have a size function");
            Oe(this, o, $e(r, 0));
        } else {
            const e = Me(r);
            It(this, o, $e(r, 1), e);
        }
    }
    get locked() {
        if (!Vt(this)) throw Kt("locked");
        return Ut(this);
    }
    cancel(e) {
        return Vt(this) ? Ut(this) ? d(new TypeError("Cannot cancel a stream that already has a reader")) : Gt(this, e) : d(Kt("cancel"));
    }
    getReader(e) {
        if (!Vt(this)) throw Kt("getReader");
        return void 0 === function(e, t) {
            F(e, t);
            const r = null == e ? void 0 : e.mode;
            return {
                mode: void 0 === r ? void 0 : Nt(r, `${t} has member 'mode' that`)
            };
        }(e, "First parameter").mode ? new ReadableStreamDefaultReader(this) : function(e) {
            return new ReadableStreamBYOBReader(e);
        }(this);
    }
    pipeThrough(e, t = {}) {
        if (!H(this)) throw Kt("pipeThrough");
        $(e, 1, "pipeThrough");
        const r = xt(e, "First parameter"), o = Ht(t, "Second parameter");
        if (this.locked) throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
        if (r.writable.locked) throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
        return m(kt(this, r.writable, o.preventClose, o.preventAbort, o.preventCancel, o.signal)), r.readable;
    }
    pipeTo(e, t = {}) {
        if (!H(this)) return d(Kt("pipeTo"));
        if (void 0 === e) return d("Parameter 1 is required in 'pipeTo'.");
        if (!x(e)) return d(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
        let r;
        try {
            r = Ht(t, "Second parameter");
        } catch (e) {
            return d(e);
        }
        return this.locked ? d(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")) : e.locked ? d(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")) : kt(this, e, r.preventClose, r.preventAbort, r.preventCancel, r.signal);
    }
    tee() {
        if (!H(this)) throw Kt("tee");
        if (this.locked) throw new TypeError("Cannot tee a stream that already has a reader");
        return Ot(this);
    }
    values(e) {
        if (!H(this)) throw Kt("values");
        return function(e, t) {
            const r = e.getReader(), o = new te(r, t), n = Object.create(re);
            return n._asyncIteratorImpl = o, n;
        }(this, function(e, t) {
            F(e, t);
            const r = null == e ? void 0 : e.preventCancel;
            return {
                preventCancel: Boolean(r)
            };
        }(e, "First parameter").preventCancel);
    }
}
function Vt(e) {
    return !!r(e) && !!Object.prototype.hasOwnProperty.call(e, "_readableStreamController") && e instanceof ReadableStream;
}
function Ut(e) {
    return void 0 !== e._reader;
}
function Gt(e, r) {
    if (e._disturbed = !0, "closed" === e._state) return c(void 0);
    if ("errored" === e._state) return d(e._storedError);
    Xt(e);
    const o = e._reader;
    if (void 0 !== o && Fe(o)) {
        const e = o._readIntoRequests;
        o._readIntoRequests = new S, e.forEach((e)=>{
            e._closeSteps(void 0);
        });
    }
    return p(e._readableStreamController[T](r), t);
}
function Xt(e) {
    e._state = "closed";
    const t = e._reader;
    if (void 0 !== t && (j(t), K(t))) {
        const e = t._readRequests;
        t._readRequests = new S, e.forEach((e)=>{
            e._closeSteps();
        });
    }
}
function Jt(e, t) {
    e._state = "errored", e._storedError = t;
    const r = e._reader;
    void 0 !== r && (A(r, t), K(r) ? Z(r, t) : Ie(r, t));
}
function Kt(e) {
    return new TypeError(`ReadableStream.prototype.${e} can only be used on a ReadableStream`);
}
function Zt(e, t) {
    F(e, t);
    const r = null == e ? void 0 : e.highWaterMark;
    return M(r, "highWaterMark", "QueuingStrategyInit"), {
        highWaterMark: Y(r)
    };
}
Object.defineProperties(ReadableStream.prototype, {
    cancel: {
        enumerable: !0
    },
    getReader: {
        enumerable: !0
    },
    pipeThrough: {
        enumerable: !0
    },
    pipeTo: {
        enumerable: !0
    },
    tee: {
        enumerable: !0
    },
    values: {
        enumerable: !0
    },
    locked: {
        enumerable: !0
    }
}), n(ReadableStream.prototype.cancel, "cancel"), n(ReadableStream.prototype.getReader, "getReader"), n(ReadableStream.prototype.pipeThrough, "pipeThrough"), n(ReadableStream.prototype.pipeTo, "pipeTo"), n(ReadableStream.prototype.tee, "tee"), n(ReadableStream.prototype.values, "values"), "symbol" == typeof e.toStringTag && Object.defineProperty(ReadableStream.prototype, e.toStringTag, {
    value: "ReadableStream",
    configurable: !0
}), "symbol" == typeof e.asyncIterator && Object.defineProperty(ReadableStream.prototype, e.asyncIterator, {
    value: ReadableStream.prototype.values,
    writable: !0,
    configurable: !0
});
const er = (e)=>e.byteLength;
n(er, "size");
class ByteLengthQueuingStrategy {
    constructor(e){
        $(e, 1, "ByteLengthQueuingStrategy"), e = Zt(e, "First parameter"), this._byteLengthQueuingStrategyHighWaterMark = e.highWaterMark;
    }
    get highWaterMark() {
        if (!rr(this)) throw tr("highWaterMark");
        return this._byteLengthQueuingStrategyHighWaterMark;
    }
    get size() {
        if (!rr(this)) throw tr("size");
        return er;
    }
}
function tr(e) {
    return new TypeError(`ByteLengthQueuingStrategy.prototype.${e} can only be used on a ByteLengthQueuingStrategy`);
}
function rr(e) {
    return !!r(e) && !!Object.prototype.hasOwnProperty.call(e, "_byteLengthQueuingStrategyHighWaterMark") && e instanceof ByteLengthQueuingStrategy;
}
Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
    highWaterMark: {
        enumerable: !0
    },
    size: {
        enumerable: !0
    }
}), "symbol" == typeof e.toStringTag && Object.defineProperty(ByteLengthQueuingStrategy.prototype, e.toStringTag, {
    value: "ByteLengthQueuingStrategy",
    configurable: !0
});
const or = ()=>1;
n(or, "size");
class CountQueuingStrategy {
    constructor(e){
        $(e, 1, "CountQueuingStrategy"), e = Zt(e, "First parameter"), this._countQueuingStrategyHighWaterMark = e.highWaterMark;
    }
    get highWaterMark() {
        if (!ar(this)) throw nr("highWaterMark");
        return this._countQueuingStrategyHighWaterMark;
    }
    get size() {
        if (!ar(this)) throw nr("size");
        return or;
    }
}
function nr(e) {
    return new TypeError(`CountQueuingStrategy.prototype.${e} can only be used on a CountQueuingStrategy`);
}
function ar(e) {
    return !!r(e) && !!Object.prototype.hasOwnProperty.call(e, "_countQueuingStrategyHighWaterMark") && e instanceof CountQueuingStrategy;
}
function ir(e, t, r) {
    return I(e, r), (r)=>w(e, t, [
            r
        ]);
}
function lr(e, t, r) {
    return I(e, r), (r)=>g(e, t, [
            r
        ]);
}
function sr(e, t, r) {
    return I(e, r), (r, o)=>w(e, t, [
            r,
            o
        ]);
}
Object.defineProperties(CountQueuingStrategy.prototype, {
    highWaterMark: {
        enumerable: !0
    },
    size: {
        enumerable: !0
    }
}), "symbol" == typeof e.toStringTag && Object.defineProperty(CountQueuingStrategy.prototype, e.toStringTag, {
    value: "CountQueuingStrategy",
    configurable: !0
});
class TransformStream {
    constructor(e = {}, t = {}, r = {}){
        void 0 === e && (e = null);
        const o = Ye(t, "Second parameter"), n = Ye(r, "Third parameter"), a = function(e, t) {
            F(e, t);
            const r = null == e ? void 0 : e.flush, o = null == e ? void 0 : e.readableType, n = null == e ? void 0 : e.start, a = null == e ? void 0 : e.transform, i = null == e ? void 0 : e.writableType;
            return {
                flush: void 0 === r ? void 0 : ir(r, e, `${t} has member 'flush' that`),
                readableType: o,
                start: void 0 === n ? void 0 : lr(n, e, `${t} has member 'start' that`),
                transform: void 0 === a ? void 0 : sr(a, e, `${t} has member 'transform' that`),
                writableType: i
            };
        }(e, "First parameter");
        if (void 0 !== a.readableType) throw new RangeError("Invalid readableType specified");
        if (void 0 !== a.writableType) throw new RangeError("Invalid writableType specified");
        const i = $e(n, 0), l = Me(n), s = $e(o, 1), f = Me(o);
        let b;
        !function(e, t, r, o, n, a) {
            function i() {
                return t;
            }
            function l(t) {
                return function(e, t) {
                    const r = e._transformStreamController;
                    if (e._backpressure) {
                        return p(e._backpressureChangePromise, ()=>{
                            if ("erroring" === (Ge(e._writable) ? e._writable._state : e._writableState)) throw Ge(e._writable) ? e._writable._storedError : e._writableStoredError;
                            return pr(r, t);
                        });
                    }
                    return pr(r, t);
                }(e, t);
            }
            function s(t) {
                return function(e, t) {
                    return cr(e, t), c(void 0);
                }(e, t);
            }
            function u() {
                return function(e) {
                    const t = e._transformStreamController, r = t._flushAlgorithm();
                    return hr(t), p(r, ()=>{
                        if ("errored" === e._readableState) throw e._readableStoredError;
                        gr(e) && wr(e);
                    }, (t)=>{
                        throw cr(e, t), e._readableStoredError;
                    });
                }(e);
            }
            function d() {
                return function(e) {
                    return fr(e, !1), e._backpressureChangePromise;
                }(e);
            }
            function f(t) {
                return dr(e, t), c(void 0);
            }
            e._writableState = "writable", e._writableStoredError = void 0, e._writableHasInFlightOperation = !1, e._writableStarted = !1, e._writable = function(e, t, r, o, n, a, i) {
                return new WritableStream({
                    start (r) {
                        e._writableController = r;
                        try {
                            const t = r.signal;
                            void 0 !== t && t.addEventListener("abort", ()=>{
                                "writable" === e._writableState && (e._writableState = "erroring", t.reason && (e._writableStoredError = t.reason));
                            });
                        } catch (e) {}
                        return p(t(), ()=>(e._writableStarted = !0, Cr(e), null), (t)=>{
                            throw e._writableStarted = !0, Rr(e, t), t;
                        });
                    },
                    write: (t)=>((function(e) {
                            e._writableHasInFlightOperation = !0;
                        })(e), p(r(t), ()=>((function(e) {
                                e._writableHasInFlightOperation = !1;
                            })(e), Cr(e), null), (t)=>{
                            throw function(e, t) {
                                e._writableHasInFlightOperation = !1, Rr(e, t);
                            }(e, t), t;
                        })),
                    close: ()=>((function(e) {
                            e._writableHasInFlightOperation = !0;
                        })(e), p(o(), ()=>((function(e) {
                                e._writableHasInFlightOperation = !1;
                                "erroring" === e._writableState && (e._writableStoredError = void 0);
                                e._writableState = "closed";
                            })(e), null), (t)=>{
                            throw function(e, t) {
                                e._writableHasInFlightOperation = !1, e._writableState, Rr(e, t);
                            }(e, t), t;
                        })),
                    abort: (t)=>(e._writableState = "errored", e._writableStoredError = t, n(t))
                }, {
                    highWaterMark: a,
                    size: i
                });
            }(e, i, l, u, s, r, o), e._readableState = "readable", e._readableStoredError = void 0, e._readableCloseRequested = !1, e._readablePulling = !1, e._readable = function(e, t, r, o, n, a) {
                return new ReadableStream({
                    start: (r)=>(e._readableController = r, t().catch((t)=>{
                            Sr(e, t);
                        })),
                    pull: ()=>(e._readablePulling = !0, r().catch((t)=>{
                            Sr(e, t);
                        })),
                    cancel: (t)=>(e._readableState = "closed", o(t))
                }, {
                    highWaterMark: n,
                    size: a
                });
            }(e, i, d, f, n, a), e._backpressure = void 0, e._backpressureChangePromise = void 0, e._backpressureChangePromise_resolve = void 0, fr(e, !0), e._transformStreamController = void 0;
        }(this, u((e)=>{
            b = e;
        }), s, f, i, l), function(e, t) {
            const r = Object.create(TransformStreamDefaultController.prototype);
            let o, n;
            o = void 0 !== t.transform ? (e)=>t.transform(e, r) : (e)=>{
                try {
                    return _r(r, e), c(void 0);
                } catch (e) {
                    return d(e);
                }
            };
            n = void 0 !== t.flush ? ()=>t.flush(r) : ()=>c(void 0);
            !function(e, t, r, o) {
                t._controlledTransformStream = e, e._transformStreamController = t, t._transformAlgorithm = r, t._flushAlgorithm = o;
            }(e, r, o, n);
        }(this, a), void 0 !== a.start ? b(a.start(this._transformStreamController)) : b(void 0);
    }
    get readable() {
        if (!ur(this)) throw yr("readable");
        return this._readable;
    }
    get writable() {
        if (!ur(this)) throw yr("writable");
        return this._writable;
    }
}
function ur(e) {
    return !!r(e) && !!Object.prototype.hasOwnProperty.call(e, "_transformStreamController") && e instanceof TransformStream;
}
function cr(e, t) {
    Sr(e, t), dr(e, t);
}
function dr(e, t) {
    hr(e._transformStreamController), function(e, t) {
        e._writableController.error(t);
        "writable" === e._writableState && Tr(e, t);
    }(e, t), e._backpressure && fr(e, !1);
}
function fr(e, t) {
    void 0 !== e._backpressureChangePromise && e._backpressureChangePromise_resolve(), e._backpressureChangePromise = u((t)=>{
        e._backpressureChangePromise_resolve = t;
    }), e._backpressure = t;
}
Object.defineProperties(TransformStream.prototype, {
    readable: {
        enumerable: !0
    },
    writable: {
        enumerable: !0
    }
}), "symbol" == typeof e.toStringTag && Object.defineProperty(TransformStream.prototype, e.toStringTag, {
    value: "TransformStream",
    configurable: !0
});
class TransformStreamDefaultController {
    constructor(){
        throw new TypeError("Illegal constructor");
    }
    get desiredSize() {
        if (!br(this)) throw mr("desiredSize");
        return vr(this._controlledTransformStream);
    }
    enqueue(e) {
        if (!br(this)) throw mr("enqueue");
        _r(this, e);
    }
    error(e) {
        if (!br(this)) throw mr("error");
        var t;
        t = e, cr(this._controlledTransformStream, t);
    }
    terminate() {
        if (!br(this)) throw mr("terminate");
        !function(e) {
            const t = e._controlledTransformStream;
            gr(t) && wr(t);
            const r = new TypeError("TransformStream terminated");
            dr(t, r);
        }(this);
    }
}
function br(e) {
    return !!r(e) && !!Object.prototype.hasOwnProperty.call(e, "_controlledTransformStream") && e instanceof TransformStreamDefaultController;
}
function hr(e) {
    e._transformAlgorithm = void 0, e._flushAlgorithm = void 0;
}
function _r(e, t) {
    const r = e._controlledTransformStream;
    if (!gr(r)) throw new TypeError("Readable side is not in a state that permits enqueue");
    try {
        !function(e, t) {
            e._readablePulling = !1;
            try {
                e._readableController.enqueue(t);
            } catch (t) {
                throw Sr(e, t), t;
            }
        }(r, t);
    } catch (e) {
        throw dr(r, e), r._readableStoredError;
    }
    const o = function(e) {
        return !function(e) {
            if (!gr(e)) return !1;
            if (e._readablePulling) return !0;
            if (vr(e) > 0) return !0;
            return !1;
        }(e);
    }(r);
    o !== r._backpressure && fr(r, !0);
}
function pr(e, t) {
    return p(e._transformAlgorithm(t), void 0, (t)=>{
        throw cr(e._controlledTransformStream, t), t;
    });
}
function mr(e) {
    return new TypeError(`TransformStreamDefaultController.prototype.${e} can only be used on a TransformStreamDefaultController`);
}
function yr(e) {
    return new TypeError(`TransformStream.prototype.${e} can only be used on a TransformStream`);
}
function gr(e) {
    return !e._readableCloseRequested && "readable" === e._readableState;
}
function wr(e) {
    e._readableState = "closed", e._readableCloseRequested = !0, e._readableController.close();
}
function Sr(e, t) {
    "readable" === e._readableState && (e._readableState = "errored", e._readableStoredError = t), e._readableController.error(t);
}
function vr(e) {
    return e._readableController.desiredSize;
}
function Rr(e, t) {
    "writable" !== e._writableState ? qr(e) : Tr(e, t);
}
function Tr(e, t) {
    e._writableState = "erroring", e._writableStoredError = t, !function(e) {
        return e._writableHasInFlightOperation;
    }(e) && e._writableStarted && qr(e);
}
function qr(e) {
    e._writableState = "errored";
}
function Cr(e) {
    "erroring" === e._writableState && qr(e);
}
Object.defineProperties(TransformStreamDefaultController.prototype, {
    enqueue: {
        enumerable: !0
    },
    error: {
        enumerable: !0
    },
    terminate: {
        enumerable: !0
    },
    desiredSize: {
        enumerable: !0
    }
}), n(TransformStreamDefaultController.prototype.enqueue, "enqueue"), n(TransformStreamDefaultController.prototype.error, "error"), n(TransformStreamDefaultController.prototype.terminate, "terminate"), "symbol" == typeof e.toStringTag && Object.defineProperty(TransformStreamDefaultController.prototype, e.toStringTag, {
    value: "TransformStreamDefaultController",
    configurable: !0
});
;
}),
"[project]/node_modules/formdata-node/lib/esm/isFunction.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isFunction",
    ()=>isFunction
]);
const isFunction = (value)=>typeof value === "function";
}),
"[project]/node_modules/formdata-node/lib/esm/blobHelpers.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "consumeBlobParts",
    ()=>consumeBlobParts,
    "sliceBlob",
    ()=>sliceBlob
]);
/*! Based on fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> & David Frank */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/isFunction.js [app-rsc] (ecmascript)");
;
const CHUNK_SIZE = 65536;
async function* clonePart(part) {
    const end = part.byteOffset + part.byteLength;
    let position = part.byteOffset;
    while(position !== end){
        const size = Math.min(end - position, CHUNK_SIZE);
        const chunk = part.buffer.slice(position, position + size);
        position += chunk.byteLength;
        yield new Uint8Array(chunk);
    }
}
async function* consumeNodeBlob(blob) {
    let position = 0;
    while(position !== blob.size){
        const chunk = blob.slice(position, Math.min(blob.size, position + CHUNK_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
    }
}
async function* consumeBlobParts(parts, clone = false) {
    for (const part of parts){
        if (ArrayBuffer.isView(part)) {
            if (clone) {
                yield* clonePart(part);
            } else {
                yield part;
            }
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(part.stream)) {
            yield* part.stream();
        } else {
            yield* consumeNodeBlob(part);
        }
    }
}
function* sliceBlob(blobParts, blobSize, start = 0, end) {
    end !== null && end !== void 0 ? end : end = blobSize;
    let relativeStart = start < 0 ? Math.max(blobSize + start, 0) : Math.min(start, blobSize);
    let relativeEnd = end < 0 ? Math.max(blobSize + end, 0) : Math.min(end, blobSize);
    const span = Math.max(relativeEnd - relativeStart, 0);
    let added = 0;
    for (const part of blobParts){
        if (added >= span) {
            break;
        }
        const partSize = ArrayBuffer.isView(part) ? part.byteLength : part.size;
        if (relativeStart && partSize <= relativeStart) {
            relativeStart -= partSize;
            relativeEnd -= partSize;
        } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
                chunk = part.subarray(relativeStart, Math.min(partSize, relativeEnd));
                added += chunk.byteLength;
            } else {
                chunk = part.slice(relativeStart, Math.min(partSize, relativeEnd));
                added += chunk.size;
            }
            relativeEnd -= partSize;
            relativeStart = 0;
            yield chunk;
        }
    }
}
}),
"[project]/node_modules/formdata-node/lib/esm/Blob.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Blob",
    ()=>Blob
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$node_modules$2f$web$2d$streams$2d$polyfill$2f$dist$2f$ponyfill$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/node_modules/web-streams-polyfill/dist/ponyfill.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/isFunction.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$blobHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/blobHelpers.js [app-rsc] (ecmascript)");
/*! Based on fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> & David Frank */ var __classPrivateFieldGet = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _Blob_parts, _Blob_type, _Blob_size;
;
;
;
class Blob {
    constructor(blobParts = [], options = {}){
        _Blob_parts.set(this, []);
        _Blob_type.set(this, "");
        _Blob_size.set(this, 0);
        options !== null && options !== void 0 ? options : options = {};
        if (typeof blobParts !== "object" || blobParts === null) {
            throw new TypeError("Failed to construct 'Blob': " + "The provided value cannot be converted to a sequence.");
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(blobParts[Symbol.iterator])) {
            throw new TypeError("Failed to construct 'Blob': " + "The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(options)) {
            throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        const encoder = new TextEncoder();
        for (const raw of blobParts){
            let part;
            if (ArrayBuffer.isView(raw)) {
                part = new Uint8Array(raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength));
            } else if (raw instanceof ArrayBuffer) {
                part = new Uint8Array(raw.slice(0));
            } else if (raw instanceof Blob) {
                part = raw;
            } else {
                part = encoder.encode(String(raw));
            }
            __classPrivateFieldSet(this, _Blob_size, __classPrivateFieldGet(this, _Blob_size, "f") + (ArrayBuffer.isView(part) ? part.byteLength : part.size), "f");
            __classPrivateFieldGet(this, _Blob_parts, "f").push(part);
        }
        const type = options.type === undefined ? "" : String(options.type);
        __classPrivateFieldSet(this, _Blob_type, /^[\x20-\x7E]*$/.test(type) ? type : "", "f");
    }
    static [(_Blob_parts = new WeakMap(), _Blob_type = new WeakMap(), _Blob_size = new WeakMap(), Symbol.hasInstance)](value) {
        return Boolean(value && typeof value === "object" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(value.constructor) && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(value.stream) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(value.arrayBuffer)) && /^(Blob|File)$/.test(value[Symbol.toStringTag]));
    }
    get type() {
        return __classPrivateFieldGet(this, _Blob_type, "f");
    }
    get size() {
        return __classPrivateFieldGet(this, _Blob_size, "f");
    }
    slice(start, end, contentType) {
        return new Blob((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$blobHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sliceBlob"])(__classPrivateFieldGet(this, _Blob_parts, "f"), this.size, start, end), {
            type: contentType
        });
    }
    async text() {
        const decoder = new TextDecoder();
        let result = "";
        for await (const chunk of (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$blobHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["consumeBlobParts"])(__classPrivateFieldGet(this, _Blob_parts, "f"))){
            result += decoder.decode(chunk, {
                stream: true
            });
        }
        result += decoder.decode();
        return result;
    }
    async arrayBuffer() {
        const view = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$blobHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["consumeBlobParts"])(__classPrivateFieldGet(this, _Blob_parts, "f"))){
            view.set(chunk, offset);
            offset += chunk.length;
        }
        return view.buffer;
    }
    stream() {
        const iterator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$blobHelpers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["consumeBlobParts"])(__classPrivateFieldGet(this, _Blob_parts, "f"), true);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$node_modules$2f$web$2d$streams$2d$polyfill$2f$dist$2f$ponyfill$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ReadableStream"]({
            async pull (controller) {
                const { value, done } = await iterator.next();
                if (done) {
                    return queueMicrotask(()=>controller.close());
                }
                controller.enqueue(value);
            },
            async cancel () {
                await iterator.return();
            }
        });
    }
    get [Symbol.toStringTag]() {
        return "Blob";
    }
}
Object.defineProperties(Blob.prototype, {
    type: {
        enumerable: true
    },
    size: {
        enumerable: true
    },
    slice: {
        enumerable: true
    },
    stream: {
        enumerable: true
    },
    text: {
        enumerable: true
    },
    arrayBuffer: {
        enumerable: true
    }
});
}),
"[project]/node_modules/formdata-node/lib/esm/File.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "File",
    ()=>File
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$Blob$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/Blob.js [app-rsc] (ecmascript)");
var __classPrivateFieldSet = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _File_name, _File_lastModified;
;
class File extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$Blob$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Blob"] {
    constructor(fileBits, name, options = {}){
        super(fileBits, options);
        _File_name.set(this, void 0);
        _File_lastModified.set(this, 0);
        if (arguments.length < 2) {
            throw new TypeError("Failed to construct 'File': 2 arguments required, " + `but only ${arguments.length} present.`);
        }
        __classPrivateFieldSet(this, _File_name, String(name), "f");
        const lastModified = options.lastModified === undefined ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
            __classPrivateFieldSet(this, _File_lastModified, lastModified, "f");
        }
    }
    static [(_File_name = new WeakMap(), _File_lastModified = new WeakMap(), Symbol.hasInstance)](value) {
        return value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$Blob$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Blob"] && value[Symbol.toStringTag] === "File" && typeof value.name === "string";
    }
    get name() {
        return __classPrivateFieldGet(this, _File_name, "f");
    }
    get lastModified() {
        return __classPrivateFieldGet(this, _File_lastModified, "f");
    }
    get webkitRelativePath() {
        return "";
    }
    get [Symbol.toStringTag]() {
        return "File";
    }
}
}),
"[project]/node_modules/formdata-node/lib/esm/isFile.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isFile",
    ()=>isFile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$File$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/File.js [app-rsc] (ecmascript)");
;
const isFile = (value)=>value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$File$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["File"];
}),
"[project]/node_modules/formdata-node/lib/esm/isBlob.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isBlob",
    ()=>isBlob
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$Blob$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/Blob.js [app-rsc] (ecmascript)");
;
const isBlob = (value)=>value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$Blob$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Blob"];
}),
"[project]/node_modules/formdata-node/lib/esm/deprecateConstructorEntries.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deprecateConstructorEntries",
    ()=>deprecateConstructorEntries
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/util [external] (util, cjs)");
;
const deprecateConstructorEntries = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__["deprecate"])(()=>{}, "Constructor \"entries\" argument is not spec-compliant " + "and will be removed in next major release.");
}),
"[project]/node_modules/formdata-node/lib/esm/FormData.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FormData",
    ()=>FormData
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/util [external] (util, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$File$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/File.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFile$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/isFile.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isBlob$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/isBlob.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/isFunction.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$deprecateConstructorEntries$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/deprecateConstructorEntries.js [app-rsc] (ecmascript)");
var __classPrivateFieldGet = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FormData_instances, _FormData_entries, _FormData_setEntry;
;
;
;
;
;
;
class FormData {
    constructor(entries){
        _FormData_instances.add(this);
        _FormData_entries.set(this, new Map());
        if (entries) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$deprecateConstructorEntries$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deprecateConstructorEntries"])();
            entries.forEach(({ name, value, fileName })=>this.append(name, value, fileName));
        }
    }
    static [(_FormData_entries = new WeakMap(), _FormData_instances = new WeakSet(), Symbol.hasInstance)](value) {
        return Boolean(value && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(value.constructor) && value[Symbol.toStringTag] === "FormData" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(value.append) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(value.set) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(value.get) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(value.getAll) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(value.has) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(value.delete) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(value.entries) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(value.values) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(value.keys) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(value[Symbol.iterator]) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFunction"])(value.forEach));
    }
    append(name, value, fileName) {
        __classPrivateFieldGet(this, _FormData_instances, "m", _FormData_setEntry).call(this, {
            name,
            fileName,
            append: true,
            rawValue: value,
            argsLength: arguments.length
        });
    }
    set(name, value, fileName) {
        __classPrivateFieldGet(this, _FormData_instances, "m", _FormData_setEntry).call(this, {
            name,
            fileName,
            append: false,
            rawValue: value,
            argsLength: arguments.length
        });
    }
    get(name) {
        const field = __classPrivateFieldGet(this, _FormData_entries, "f").get(String(name));
        if (!field) {
            return null;
        }
        return field[0];
    }
    getAll(name) {
        const field = __classPrivateFieldGet(this, _FormData_entries, "f").get(String(name));
        if (!field) {
            return [];
        }
        return field.slice();
    }
    has(name) {
        return __classPrivateFieldGet(this, _FormData_entries, "f").has(String(name));
    }
    delete(name) {
        __classPrivateFieldGet(this, _FormData_entries, "f").delete(String(name));
    }
    *keys() {
        for (const key of __classPrivateFieldGet(this, _FormData_entries, "f").keys()){
            yield key;
        }
    }
    *entries() {
        for (const name of this.keys()){
            const values = this.getAll(name);
            for (const value of values){
                yield [
                    name,
                    value
                ];
            }
        }
    }
    *values() {
        for (const [, value] of this){
            yield value;
        }
    }
    [(_FormData_setEntry = function _FormData_setEntry({ name, rawValue, append, fileName, argsLength }) {
        const methodName = append ? "append" : "set";
        if (argsLength < 2) {
            throw new TypeError(`Failed to execute '${methodName}' on 'FormData': ` + `2 arguments required, but only ${argsLength} present.`);
        }
        name = String(name);
        let value;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isFile$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFile"])(rawValue)) {
            value = fileName === undefined ? rawValue : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$File$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["File"]([
                rawValue
            ], fileName, {
                type: rawValue.type,
                lastModified: rawValue.lastModified
            });
        } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$isBlob$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isBlob"])(rawValue)) {
            value = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$File$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["File"]([
                rawValue
            ], fileName === undefined ? "blob" : fileName, {
                type: rawValue.type
            });
        } else if (fileName) {
            throw new TypeError(`Failed to execute '${methodName}' on 'FormData': ` + "parameter 2 is not of type 'Blob'.");
        } else {
            value = String(rawValue);
        }
        const values = __classPrivateFieldGet(this, _FormData_entries, "f").get(name);
        if (!values) {
            return void __classPrivateFieldGet(this, _FormData_entries, "f").set(name, [
                value
            ]);
        }
        if (!append) {
            return void __classPrivateFieldGet(this, _FormData_entries, "f").set(name, [
                value
            ]);
        }
        values.push(value);
    }, Symbol.iterator)]() {
        return this.entries();
    }
    forEach(callback, thisArg) {
        for (const [name, value] of this){
            callback.call(thisArg, value, name, this);
        }
    }
    get [Symbol.toStringTag]() {
        return "FormData";
    }
    [__TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__["inspect"].custom]() {
        return this[Symbol.toStringTag];
    }
}
}),
"[project]/node_modules/formdata-node/lib/esm/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$FormData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/FormData.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$Blob$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/Blob.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$formdata$2d$node$2f$lib$2f$esm$2f$File$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/formdata-node/lib/esm/File.js [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/node_modules/ms/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Helpers.
 */ var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */ module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
        return parse(val);
    } else if (type === 'number' && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function parse(str) {
    str = String(str);
    if (str.length > 100) {
        return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
        return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch(type){
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
            return n * y;
        case 'weeks':
        case 'week':
        case 'w':
            return n * w;
        case 'days':
        case 'day':
        case 'd':
            return n * d;
        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
            return n * h;
        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
            return n * m;
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
            return n * s;
        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
            return n;
        default:
            return undefined;
    }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return Math.round(ms / d) + 'd';
    }
    if (msAbs >= h) {
        return Math.round(ms / h) + 'h';
    }
    if (msAbs >= m) {
        return Math.round(ms / m) + 'm';
    }
    if (msAbs >= s) {
        return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return plural(ms, msAbs, d, 'day');
    }
    if (msAbs >= h) {
        return plural(ms, msAbs, h, 'hour');
    }
    if (msAbs >= m) {
        return plural(ms, msAbs, m, 'minute');
    }
    if (msAbs >= s) {
        return plural(ms, msAbs, s, 'second');
    }
    return ms + ' ms';
}
/**
 * Pluralization helper.
 */ function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}
}),
"[project]/node_modules/humanize-ms/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*!
 * humanize-ms - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */ /**
 * Module dependencies.
 */ var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
var ms = __turbopack_context__.r("[project]/node_modules/ms/index.js [app-rsc] (ecmascript)");
module.exports = function(t) {
    if (typeof t === 'number') return t;
    var r = ms(t);
    if (r === undefined) {
        var err = new Error(util.format('humanize-ms(%j) result undefined', t));
        console.warn(err.stack);
    }
    return r;
};
}),
"[project]/node_modules/agentkeepalive/lib/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = {
    // agent
    CURRENT_ID: Symbol('agentkeepalive#currentId'),
    CREATE_ID: Symbol('agentkeepalive#createId'),
    INIT_SOCKET: Symbol('agentkeepalive#initSocket'),
    CREATE_HTTPS_CONNECTION: Symbol('agentkeepalive#createHttpsConnection'),
    // socket
    SOCKET_CREATED_TIME: Symbol('agentkeepalive#socketCreatedTime'),
    SOCKET_NAME: Symbol('agentkeepalive#socketName'),
    SOCKET_REQUEST_COUNT: Symbol('agentkeepalive#socketRequestCount'),
    SOCKET_REQUEST_FINISHED_COUNT: Symbol('agentkeepalive#socketRequestFinishedCount')
};
}),
"[project]/node_modules/agentkeepalive/lib/agent.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const OriginalAgent = __turbopack_context__.r("[externals]/http [external] (http, cjs)").Agent;
const ms = __turbopack_context__.r("[project]/node_modules/humanize-ms/index.js [app-rsc] (ecmascript)");
const debug = __turbopack_context__.r("[externals]/util [external] (util, cjs)").debuglog('agentkeepalive');
const { INIT_SOCKET, CURRENT_ID, CREATE_ID, SOCKET_CREATED_TIME, SOCKET_NAME, SOCKET_REQUEST_COUNT, SOCKET_REQUEST_FINISHED_COUNT } = __turbopack_context__.r("[project]/node_modules/agentkeepalive/lib/constants.js [app-rsc] (ecmascript)");
// OriginalAgent come from
// - https://github.com/nodejs/node/blob/v8.12.0/lib/_http_agent.js
// - https://github.com/nodejs/node/blob/v10.12.0/lib/_http_agent.js
// node <= 10
let defaultTimeoutListenerCount = 1;
const majorVersion = parseInt(process.version.split('.', 1)[0].substring(1));
if (majorVersion >= 11 && majorVersion <= 12) {
    defaultTimeoutListenerCount = 2;
} else if (majorVersion >= 13) {
    defaultTimeoutListenerCount = 3;
}
function deprecate(message) {
    console.log('[agentkeepalive:deprecated] %s', message);
}
class Agent extends OriginalAgent {
    constructor(options){
        options = options || {};
        options.keepAlive = options.keepAlive !== false;
        // default is keep-alive and 4s free socket timeout
        // see https://medium.com/ssense-tech/reduce-networking-errors-in-nodejs-23b4eb9f2d83
        if (options.freeSocketTimeout === undefined) {
            options.freeSocketTimeout = 4000;
        }
        // Legacy API: keepAliveTimeout should be rename to `freeSocketTimeout`
        if (options.keepAliveTimeout) {
            deprecate('options.keepAliveTimeout is deprecated, please use options.freeSocketTimeout instead');
            options.freeSocketTimeout = options.keepAliveTimeout;
            delete options.keepAliveTimeout;
        }
        // Legacy API: freeSocketKeepAliveTimeout should be rename to `freeSocketTimeout`
        if (options.freeSocketKeepAliveTimeout) {
            deprecate('options.freeSocketKeepAliveTimeout is deprecated, please use options.freeSocketTimeout instead');
            options.freeSocketTimeout = options.freeSocketKeepAliveTimeout;
            delete options.freeSocketKeepAliveTimeout;
        }
        // Sets the socket to timeout after timeout milliseconds of inactivity on the socket.
        // By default is double free socket timeout.
        if (options.timeout === undefined) {
            // make sure socket default inactivity timeout >= 8s
            options.timeout = Math.max(options.freeSocketTimeout * 2, 8000);
        }
        // support humanize format
        options.timeout = ms(options.timeout);
        options.freeSocketTimeout = ms(options.freeSocketTimeout);
        options.socketActiveTTL = options.socketActiveTTL ? ms(options.socketActiveTTL) : 0;
        super(options);
        this[CURRENT_ID] = 0;
        // create socket success counter
        this.createSocketCount = 0;
        this.createSocketCountLastCheck = 0;
        this.createSocketErrorCount = 0;
        this.createSocketErrorCountLastCheck = 0;
        this.closeSocketCount = 0;
        this.closeSocketCountLastCheck = 0;
        // socket error event count
        this.errorSocketCount = 0;
        this.errorSocketCountLastCheck = 0;
        // request finished counter
        this.requestCount = 0;
        this.requestCountLastCheck = 0;
        // including free socket timeout counter
        this.timeoutSocketCount = 0;
        this.timeoutSocketCountLastCheck = 0;
        this.on('free', (socket)=>{
            // https://github.com/nodejs/node/pull/32000
            // Node.js native agent will check socket timeout eqs agent.options.timeout.
            // Use the ttl or freeSocketTimeout to overwrite.
            const timeout = this.calcSocketTimeout(socket);
            if (timeout > 0 && socket.timeout !== timeout) {
                socket.setTimeout(timeout);
            }
        });
    }
    get freeSocketKeepAliveTimeout() {
        deprecate('agent.freeSocketKeepAliveTimeout is deprecated, please use agent.options.freeSocketTimeout instead');
        return this.options.freeSocketTimeout;
    }
    get timeout() {
        deprecate('agent.timeout is deprecated, please use agent.options.timeout instead');
        return this.options.timeout;
    }
    get socketActiveTTL() {
        deprecate('agent.socketActiveTTL is deprecated, please use agent.options.socketActiveTTL instead');
        return this.options.socketActiveTTL;
    }
    calcSocketTimeout(socket) {
        /**
     * return <= 0: should free socket
     * return > 0: should update socket timeout
     * return undefined: not find custom timeout
     */ let freeSocketTimeout = this.options.freeSocketTimeout;
        const socketActiveTTL = this.options.socketActiveTTL;
        if (socketActiveTTL) {
            // check socketActiveTTL
            const aliveTime = Date.now() - socket[SOCKET_CREATED_TIME];
            const diff = socketActiveTTL - aliveTime;
            if (diff <= 0) {
                return diff;
            }
            if (freeSocketTimeout && diff < freeSocketTimeout) {
                freeSocketTimeout = diff;
            }
        }
        // set freeSocketTimeout
        if (freeSocketTimeout) {
            // set free keepalive timer
            // try to use socket custom freeSocketTimeout first, support headers['keep-alive']
            // https://github.com/node-modules/urllib/blob/b76053020923f4d99a1c93cf2e16e0c5ba10bacf/lib/urllib.js#L498
            const customFreeSocketTimeout = socket.freeSocketTimeout || socket.freeSocketKeepAliveTimeout;
            return customFreeSocketTimeout || freeSocketTimeout;
        }
    }
    keepSocketAlive(socket) {
        const result = super.keepSocketAlive(socket);
        // should not keepAlive, do nothing
        if (!result) return result;
        const customTimeout = this.calcSocketTimeout(socket);
        if (typeof customTimeout === 'undefined') {
            return true;
        }
        if (customTimeout <= 0) {
            debug('%s(requests: %s, finished: %s) free but need to destroy by TTL, request count %s, diff is %s', socket[SOCKET_NAME], socket[SOCKET_REQUEST_COUNT], socket[SOCKET_REQUEST_FINISHED_COUNT], customTimeout);
            return false;
        }
        if (socket.timeout !== customTimeout) {
            socket.setTimeout(customTimeout);
        }
        return true;
    }
    // only call on addRequest
    reuseSocket(...args) {
        // reuseSocket(socket, req)
        super.reuseSocket(...args);
        const socket = args[0];
        const req = args[1];
        req.reusedSocket = true;
        const agentTimeout = this.options.timeout;
        if (getSocketTimeout(socket) !== agentTimeout) {
            // reset timeout before use
            socket.setTimeout(agentTimeout);
            debug('%s reset timeout to %sms', socket[SOCKET_NAME], agentTimeout);
        }
        socket[SOCKET_REQUEST_COUNT]++;
        debug('%s(requests: %s, finished: %s) reuse on addRequest, timeout %sms', socket[SOCKET_NAME], socket[SOCKET_REQUEST_COUNT], socket[SOCKET_REQUEST_FINISHED_COUNT], getSocketTimeout(socket));
    }
    [CREATE_ID]() {
        const id = this[CURRENT_ID]++;
        if (this[CURRENT_ID] === Number.MAX_SAFE_INTEGER) this[CURRENT_ID] = 0;
        return id;
    }
    [INIT_SOCKET](socket, options) {
        // bugfix here.
        // https on node 8, 10 won't set agent.options.timeout by default
        // TODO: need to fix on node itself
        if (options.timeout) {
            const timeout = getSocketTimeout(socket);
            if (!timeout) {
                socket.setTimeout(options.timeout);
            }
        }
        if (this.options.keepAlive) {
            // Disable Nagle's algorithm: http://blog.caustik.com/2012/04/08/scaling-node-js-to-100k-concurrent-connections/
            // https://fengmk2.com/benchmark/nagle-algorithm-delayed-ack-mock.html
            socket.setNoDelay(true);
        }
        this.createSocketCount++;
        if (this.options.socketActiveTTL) {
            socket[SOCKET_CREATED_TIME] = Date.now();
        }
        // don't show the hole '-----BEGIN CERTIFICATE----' key string
        socket[SOCKET_NAME] = `sock[${this[CREATE_ID]()}#${options._agentKey}]`.split('-----BEGIN', 1)[0];
        socket[SOCKET_REQUEST_COUNT] = 1;
        socket[SOCKET_REQUEST_FINISHED_COUNT] = 0;
        installListeners(this, socket, options);
    }
    createConnection(options, oncreate) {
        let called = false;
        const onNewCreate = (err, socket)=>{
            if (called) return;
            called = true;
            if (err) {
                this.createSocketErrorCount++;
                return oncreate(err);
            }
            this[INIT_SOCKET](socket, options);
            oncreate(err, socket);
        };
        const newSocket = super.createConnection(options, onNewCreate);
        if (newSocket) onNewCreate(null, newSocket);
        return newSocket;
    }
    get statusChanged() {
        const changed = this.createSocketCount !== this.createSocketCountLastCheck || this.createSocketErrorCount !== this.createSocketErrorCountLastCheck || this.closeSocketCount !== this.closeSocketCountLastCheck || this.errorSocketCount !== this.errorSocketCountLastCheck || this.timeoutSocketCount !== this.timeoutSocketCountLastCheck || this.requestCount !== this.requestCountLastCheck;
        if (changed) {
            this.createSocketCountLastCheck = this.createSocketCount;
            this.createSocketErrorCountLastCheck = this.createSocketErrorCount;
            this.closeSocketCountLastCheck = this.closeSocketCount;
            this.errorSocketCountLastCheck = this.errorSocketCount;
            this.timeoutSocketCountLastCheck = this.timeoutSocketCount;
            this.requestCountLastCheck = this.requestCount;
        }
        return changed;
    }
    getCurrentStatus() {
        return {
            createSocketCount: this.createSocketCount,
            createSocketErrorCount: this.createSocketErrorCount,
            closeSocketCount: this.closeSocketCount,
            errorSocketCount: this.errorSocketCount,
            timeoutSocketCount: this.timeoutSocketCount,
            requestCount: this.requestCount,
            freeSockets: inspect(this.freeSockets),
            sockets: inspect(this.sockets),
            requests: inspect(this.requests)
        };
    }
}
// node 8 don't has timeout attribute on socket
// https://github.com/nodejs/node/pull/21204/files#diff-e6ef024c3775d787c38487a6309e491dR408
function getSocketTimeout(socket) {
    return socket.timeout || socket._idleTimeout;
}
function installListeners(agent, socket, options) {
    debug('%s create, timeout %sms', socket[SOCKET_NAME], getSocketTimeout(socket));
    // listener socket events: close, timeout, error, free
    function onFree() {
        // create and socket.emit('free') logic
        // https://github.com/nodejs/node/blob/master/lib/_http_agent.js#L311
        // no req on the socket, it should be the new socket
        if (!socket._httpMessage && socket[SOCKET_REQUEST_COUNT] === 1) return;
        socket[SOCKET_REQUEST_FINISHED_COUNT]++;
        agent.requestCount++;
        debug('%s(requests: %s, finished: %s) free', socket[SOCKET_NAME], socket[SOCKET_REQUEST_COUNT], socket[SOCKET_REQUEST_FINISHED_COUNT]);
        // should reuse on pedding requests?
        const name = agent.getName(options);
        if (socket.writable && agent.requests[name] && agent.requests[name].length) {
            // will be reuse on agent free listener
            socket[SOCKET_REQUEST_COUNT]++;
            debug('%s(requests: %s, finished: %s) will be reuse on agent free event', socket[SOCKET_NAME], socket[SOCKET_REQUEST_COUNT], socket[SOCKET_REQUEST_FINISHED_COUNT]);
        }
    }
    socket.on('free', onFree);
    function onClose(isError) {
        debug('%s(requests: %s, finished: %s) close, isError: %s', socket[SOCKET_NAME], socket[SOCKET_REQUEST_COUNT], socket[SOCKET_REQUEST_FINISHED_COUNT], isError);
        agent.closeSocketCount++;
    }
    socket.on('close', onClose);
    // start socket timeout handler
    function onTimeout() {
        // onTimeout and emitRequestTimeout(_http_client.js)
        // https://github.com/nodejs/node/blob/v12.x/lib/_http_client.js#L711
        const listenerCount = socket.listeners('timeout').length;
        // node <= 10, default listenerCount is 1, onTimeout
        // 11 < node <= 12, default listenerCount is 2, onTimeout and emitRequestTimeout
        // node >= 13, default listenerCount is 3, onTimeout,
        //   onTimeout(https://github.com/nodejs/node/pull/32000/files#diff-5f7fb0850412c6be189faeddea6c5359R333)
        //   and emitRequestTimeout
        const timeout = getSocketTimeout(socket);
        const req = socket._httpMessage;
        const reqTimeoutListenerCount = req && req.listeners('timeout').length || 0;
        debug('%s(requests: %s, finished: %s) timeout after %sms, listeners %s, defaultTimeoutListenerCount %s, hasHttpRequest %s, HttpRequest timeoutListenerCount %s', socket[SOCKET_NAME], socket[SOCKET_REQUEST_COUNT], socket[SOCKET_REQUEST_FINISHED_COUNT], timeout, listenerCount, defaultTimeoutListenerCount, !!req, reqTimeoutListenerCount);
        if (debug.enabled) {
            debug('timeout listeners: %s', socket.listeners('timeout').map((f)=>f.name).join(', '));
        }
        agent.timeoutSocketCount++;
        const name = agent.getName(options);
        if (agent.freeSockets[name] && agent.freeSockets[name].indexOf(socket) !== -1) {
            // free socket timeout, destroy quietly
            socket.destroy();
            // Remove it from freeSockets list immediately to prevent new requests
            // from being sent through this socket.
            agent.removeSocket(socket, options);
            debug('%s is free, destroy quietly', socket[SOCKET_NAME]);
        } else {
            // if there is no any request socket timeout handler,
            // agent need to handle socket timeout itself.
            //
            // custom request socket timeout handle logic must follow these rules:
            //  1. Destroy socket first
            //  2. Must emit socket 'agentRemove' event tell agent remove socket
            //     from freeSockets list immediately.
            //     Otherise you may be get 'socket hang up' error when reuse
            //     free socket and timeout happen in the same time.
            if (reqTimeoutListenerCount === 0) {
                const error = new Error('Socket timeout');
                error.code = 'ERR_SOCKET_TIMEOUT';
                error.timeout = timeout;
                // must manually call socket.end() or socket.destroy() to end the connection.
                // https://nodejs.org/dist/latest-v10.x/docs/api/net.html#net_socket_settimeout_timeout_callback
                socket.destroy(error);
                agent.removeSocket(socket, options);
                debug('%s destroy with timeout error', socket[SOCKET_NAME]);
            }
        }
    }
    socket.on('timeout', onTimeout);
    function onError(err) {
        const listenerCount = socket.listeners('error').length;
        debug('%s(requests: %s, finished: %s) error: %s, listenerCount: %s', socket[SOCKET_NAME], socket[SOCKET_REQUEST_COUNT], socket[SOCKET_REQUEST_FINISHED_COUNT], err, listenerCount);
        agent.errorSocketCount++;
        if (listenerCount === 1) {
            // if socket don't contain error event handler, don't catch it, emit it again
            debug('%s emit uncaught error event', socket[SOCKET_NAME]);
            socket.removeListener('error', onError);
            socket.emit('error', err);
        }
    }
    socket.on('error', onError);
    function onRemove() {
        debug('%s(requests: %s, finished: %s) agentRemove', socket[SOCKET_NAME], socket[SOCKET_REQUEST_COUNT], socket[SOCKET_REQUEST_FINISHED_COUNT]);
        // We need this function for cases like HTTP 'upgrade'
        // (defined by WebSockets) where we need to remove a socket from the
        // pool because it'll be locked up indefinitely
        socket.removeListener('close', onClose);
        socket.removeListener('error', onError);
        socket.removeListener('free', onFree);
        socket.removeListener('timeout', onTimeout);
        socket.removeListener('agentRemove', onRemove);
    }
    socket.on('agentRemove', onRemove);
}
module.exports = Agent;
function inspect(obj) {
    const res = {};
    for(const key in obj){
        res[key] = obj[key].length;
    }
    return res;
}
}),
"[project]/node_modules/agentkeepalive/lib/https_agent.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const OriginalHttpsAgent = __turbopack_context__.r("[externals]/https [external] (https, cjs)").Agent;
const HttpAgent = __turbopack_context__.r("[project]/node_modules/agentkeepalive/lib/agent.js [app-rsc] (ecmascript)");
const { INIT_SOCKET, CREATE_HTTPS_CONNECTION } = __turbopack_context__.r("[project]/node_modules/agentkeepalive/lib/constants.js [app-rsc] (ecmascript)");
class HttpsAgent extends HttpAgent {
    constructor(options){
        super(options);
        this.defaultPort = 443;
        this.protocol = 'https:';
        this.maxCachedSessions = this.options.maxCachedSessions;
        /* istanbul ignore next */ if (this.maxCachedSessions === undefined) {
            this.maxCachedSessions = 100;
        }
        this._sessionCache = {
            map: {},
            list: []
        };
    }
    createConnection(options, oncreate) {
        const socket = this[CREATE_HTTPS_CONNECTION](options, oncreate);
        this[INIT_SOCKET](socket, options);
        return socket;
    }
}
// https://github.com/nodejs/node/blob/master/lib/https.js#L89
HttpsAgent.prototype[CREATE_HTTPS_CONNECTION] = OriginalHttpsAgent.prototype.createConnection;
[
    'getName',
    '_getSession',
    '_cacheSession',
    // https://github.com/nodejs/node/pull/4982
    '_evictSession'
].forEach(function(method) {
    /* istanbul ignore next */ if (typeof OriginalHttpsAgent.prototype[method] === 'function') {
        HttpsAgent.prototype[method] = OriginalHttpsAgent.prototype[method];
    }
});
module.exports = HttpsAgent;
}),
"[project]/node_modules/agentkeepalive/index.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const HttpAgent = __turbopack_context__.r("[project]/node_modules/agentkeepalive/lib/agent.js [app-rsc] (ecmascript)");
module.exports = HttpAgent;
module.exports.HttpAgent = HttpAgent;
module.exports.HttpsAgent = __turbopack_context__.r("[project]/node_modules/agentkeepalive/lib/https_agent.js [app-rsc] (ecmascript)");
module.exports.constants = __turbopack_context__.r("[project]/node_modules/agentkeepalive/lib/constants.js [app-rsc] (ecmascript)");
}),
"[project]/node_modules/event-target-shim/dist/event-target-shim.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2015 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */ Object.defineProperty(exports, '__esModule', {
    value: true
});
/**
 * @typedef {object} PrivateData
 * @property {EventTarget} eventTarget The event target.
 * @property {{type:string}} event The original event object.
 * @property {number} eventPhase The current event phase.
 * @property {EventTarget|null} currentTarget The current event target.
 * @property {boolean} canceled The flag to prevent default.
 * @property {boolean} stopped The flag to stop propagation.
 * @property {boolean} immediateStopped The flag to stop propagation immediately.
 * @property {Function|null} passiveListener The listener if the current listener is passive. Otherwise this is null.
 * @property {number} timeStamp The unix time.
 * @private
 */ /**
 * Private data for event wrappers.
 * @type {WeakMap<Event, PrivateData>}
 * @private
 */ const privateData = new WeakMap();
/**
 * Cache for wrapper classes.
 * @type {WeakMap<Object, Function>}
 * @private
 */ const wrappers = new WeakMap();
/**
 * Get private data.
 * @param {Event} event The event object to get private data.
 * @returns {PrivateData} The private data of the event.
 * @private
 */ function pd(event) {
    const retv = privateData.get(event);
    console.assert(retv != null, "'this' is expected an Event object, but got", event);
    return retv;
}
/**
 * https://dom.spec.whatwg.org/#set-the-canceled-flag
 * @param data {PrivateData} private data.
 */ function setCancelFlag(data) {
    if (data.passiveListener != null) {
        if (typeof console !== "undefined" && typeof console.error === "function") {
            console.error("Unable to preventDefault inside passive event listener invocation.", data.passiveListener);
        }
        return;
    }
    if (!data.event.cancelable) {
        return;
    }
    data.canceled = true;
    if (typeof data.event.preventDefault === "function") {
        data.event.preventDefault();
    }
}
/**
 * @see https://dom.spec.whatwg.org/#interface-event
 * @private
 */ /**
 * The event wrapper.
 * @constructor
 * @param {EventTarget} eventTarget The event target of this dispatching.
 * @param {Event|{type:string}} event The original event to wrap.
 */ function Event(eventTarget, event) {
    privateData.set(this, {
        eventTarget,
        event,
        eventPhase: 2,
        currentTarget: eventTarget,
        canceled: false,
        stopped: false,
        immediateStopped: false,
        passiveListener: null,
        timeStamp: event.timeStamp || Date.now()
    });
    // https://heycam.github.io/webidl/#Unforgeable
    Object.defineProperty(this, "isTrusted", {
        value: false,
        enumerable: true
    });
    // Define accessors
    const keys = Object.keys(event);
    for(let i = 0; i < keys.length; ++i){
        const key = keys[i];
        if (!(key in this)) {
            Object.defineProperty(this, key, defineRedirectDescriptor(key));
        }
    }
}
// Should be enumerable, but class methods are not enumerable.
Event.prototype = {
    /**
     * The type of this event.
     * @type {string}
     */ get type () {
        return pd(this).event.type;
    },
    /**
     * The target of this event.
     * @type {EventTarget}
     */ get target () {
        return pd(this).eventTarget;
    },
    /**
     * The target of this event.
     * @type {EventTarget}
     */ get currentTarget () {
        return pd(this).currentTarget;
    },
    /**
     * @returns {EventTarget[]} The composed path of this event.
     */ composedPath () {
        const currentTarget = pd(this).currentTarget;
        if (currentTarget == null) {
            return [];
        }
        return [
            currentTarget
        ];
    },
    /**
     * Constant of NONE.
     * @type {number}
     */ get NONE () {
        return 0;
    },
    /**
     * Constant of CAPTURING_PHASE.
     * @type {number}
     */ get CAPTURING_PHASE () {
        return 1;
    },
    /**
     * Constant of AT_TARGET.
     * @type {number}
     */ get AT_TARGET () {
        return 2;
    },
    /**
     * Constant of BUBBLING_PHASE.
     * @type {number}
     */ get BUBBLING_PHASE () {
        return 3;
    },
    /**
     * The target of this event.
     * @type {number}
     */ get eventPhase () {
        return pd(this).eventPhase;
    },
    /**
     * Stop event bubbling.
     * @returns {void}
     */ stopPropagation () {
        const data = pd(this);
        data.stopped = true;
        if (typeof data.event.stopPropagation === "function") {
            data.event.stopPropagation();
        }
    },
    /**
     * Stop event bubbling.
     * @returns {void}
     */ stopImmediatePropagation () {
        const data = pd(this);
        data.stopped = true;
        data.immediateStopped = true;
        if (typeof data.event.stopImmediatePropagation === "function") {
            data.event.stopImmediatePropagation();
        }
    },
    /**
     * The flag to be bubbling.
     * @type {boolean}
     */ get bubbles () {
        return Boolean(pd(this).event.bubbles);
    },
    /**
     * The flag to be cancelable.
     * @type {boolean}
     */ get cancelable () {
        return Boolean(pd(this).event.cancelable);
    },
    /**
     * Cancel this event.
     * @returns {void}
     */ preventDefault () {
        setCancelFlag(pd(this));
    },
    /**
     * The flag to indicate cancellation state.
     * @type {boolean}
     */ get defaultPrevented () {
        return pd(this).canceled;
    },
    /**
     * The flag to be composed.
     * @type {boolean}
     */ get composed () {
        return Boolean(pd(this).event.composed);
    },
    /**
     * The unix time of this event.
     * @type {number}
     */ get timeStamp () {
        return pd(this).timeStamp;
    },
    /**
     * The target of this event.
     * @type {EventTarget}
     * @deprecated
     */ get srcElement () {
        return pd(this).eventTarget;
    },
    /**
     * The flag to stop event bubbling.
     * @type {boolean}
     * @deprecated
     */ get cancelBubble () {
        return pd(this).stopped;
    },
    set cancelBubble (value){
        if (!value) {
            return;
        }
        const data = pd(this);
        data.stopped = true;
        if (typeof data.event.cancelBubble === "boolean") {
            data.event.cancelBubble = true;
        }
    },
    /**
     * The flag to indicate cancellation state.
     * @type {boolean}
     * @deprecated
     */ get returnValue () {
        return !pd(this).canceled;
    },
    set returnValue (value){
        if (!value) {
            setCancelFlag(pd(this));
        }
    },
    /**
     * Initialize this event object. But do nothing under event dispatching.
     * @param {string} type The event type.
     * @param {boolean} [bubbles=false] The flag to be possible to bubble up.
     * @param {boolean} [cancelable=false] The flag to be possible to cancel.
     * @deprecated
     */ initEvent () {
    // Do nothing.
    }
};
// `constructor` is not enumerable.
Object.defineProperty(Event.prototype, "constructor", {
    value: Event,
    configurable: true,
    writable: true
});
// Ensure `event instanceof window.Event` is `true`.
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
/**
 * Get the property descriptor to redirect a given property.
 * @param {string} key Property name to define property descriptor.
 * @returns {PropertyDescriptor} The property descriptor to redirect the property.
 * @private
 */ function defineRedirectDescriptor(key) {
    return {
        get () {
            return pd(this).event[key];
        },
        set (value1) {
            pd(this).event[key] = value1;
        },
        configurable: true,
        enumerable: true
    };
}
/**
 * Get the property descriptor to call a given method property.
 * @param {string} key Property name to define property descriptor.
 * @returns {PropertyDescriptor} The property descriptor to call the method property.
 * @private
 */ function defineCallDescriptor(key) {
    return {
        value () {
            const event = pd(this).event;
            return event[key].apply(event, arguments);
        },
        configurable: true,
        enumerable: true
    };
}
/**
 * Define new wrapper class.
 * @param {Function} BaseEvent The base wrapper class.
 * @param {Object} proto The prototype of the original event.
 * @returns {Function} The defined wrapper class.
 * @private
 */ function defineWrapper(BaseEvent, proto) {
    const keys = Object.keys(proto);
    if (keys.length === 0) {
        return BaseEvent;
    }
    /** CustomEvent */ function CustomEvent(eventTarget, event) {
        BaseEvent.call(this, eventTarget, event);
    }
    CustomEvent.prototype = Object.create(BaseEvent.prototype, {
        constructor: {
            value: CustomEvent,
            configurable: true,
            writable: true
        }
    });
    // Define accessors.
    for(let i = 0; i < keys.length; ++i){
        const key = keys[i];
        if (!(key in BaseEvent.prototype)) {
            const descriptor = Object.getOwnPropertyDescriptor(proto, key);
            const isFunc = typeof descriptor.value === "function";
            Object.defineProperty(CustomEvent.prototype, key, isFunc ? defineCallDescriptor(key) : defineRedirectDescriptor(key));
        }
    }
    return CustomEvent;
}
/**
 * Get the wrapper class of a given prototype.
 * @param {Object} proto The prototype of the original event to get its wrapper.
 * @returns {Function} The wrapper class.
 * @private
 */ function getWrapper(proto) {
    if (proto == null || proto === Object.prototype) {
        return Event;
    }
    let wrapper = wrappers.get(proto);
    if (wrapper == null) {
        wrapper = defineWrapper(getWrapper(Object.getPrototypeOf(proto)), proto);
        wrappers.set(proto, wrapper);
    }
    return wrapper;
}
/**
 * Wrap a given event to management a dispatching.
 * @param {EventTarget} eventTarget The event target of this dispatching.
 * @param {Object} event The event to wrap.
 * @returns {Event} The wrapper instance.
 * @private
 */ function wrapEvent(eventTarget, event) {
    const Wrapper = getWrapper(Object.getPrototypeOf(event));
    return new Wrapper(eventTarget, event);
}
/**
 * Get the immediateStopped flag of a given event.
 * @param {Event} event The event to get.
 * @returns {boolean} The flag to stop propagation immediately.
 * @private
 */ function isStopped(event) {
    return pd(event).immediateStopped;
}
/**
 * Set the current event phase of a given event.
 * @param {Event} event The event to set current target.
 * @param {number} eventPhase New event phase.
 * @returns {void}
 * @private
 */ function setEventPhase(event, eventPhase) {
    pd(event).eventPhase = eventPhase;
}
/**
 * Set the current target of a given event.
 * @param {Event} event The event to set current target.
 * @param {EventTarget|null} currentTarget New current target.
 * @returns {void}
 * @private
 */ function setCurrentTarget(event, currentTarget) {
    pd(event).currentTarget = currentTarget;
}
/**
 * Set a passive listener of a given event.
 * @param {Event} event The event to set current target.
 * @param {Function|null} passiveListener New passive listener.
 * @returns {void}
 * @private
 */ function setPassiveListener(event, passiveListener) {
    pd(event).passiveListener = passiveListener;
}
/**
 * @typedef {object} ListenerNode
 * @property {Function} listener
 * @property {1|2|3} listenerType
 * @property {boolean} passive
 * @property {boolean} once
 * @property {ListenerNode|null} next
 * @private
 */ /**
 * @type {WeakMap<object, Map<string, ListenerNode>>}
 * @private
 */ const listenersMap = new WeakMap();
// Listener types
const CAPTURE = 1;
const BUBBLE = 2;
const ATTRIBUTE = 3;
/**
 * Check whether a given value is an object or not.
 * @param {any} x The value to check.
 * @returns {boolean} `true` if the value is an object.
 */ function isObject(x) {
    return x !== null && typeof x === "object" //eslint-disable-line no-restricted-syntax
    ;
}
/**
 * Get listeners.
 * @param {EventTarget} eventTarget The event target to get.
 * @returns {Map<string, ListenerNode>} The listeners.
 * @private
 */ function getListeners(eventTarget) {
    const listeners = listenersMap.get(eventTarget);
    if (listeners == null) {
        throw new TypeError("'this' is expected an EventTarget object, but got another value.");
    }
    return listeners;
}
/**
 * Get the property descriptor for the event attribute of a given event.
 * @param {string} eventName The event name to get property descriptor.
 * @returns {PropertyDescriptor} The property descriptor.
 * @private
 */ function defineEventAttributeDescriptor(eventName) {
    return {
        get () {
            const listeners = getListeners(this);
            let node = listeners.get(eventName);
            while(node != null){
                if (node.listenerType === ATTRIBUTE) {
                    return node.listener;
                }
                node = node.next;
            }
            return null;
        },
        set (listener) {
            if (typeof listener !== "function" && !isObject(listener)) {
                listener = null; // eslint-disable-line no-param-reassign
            }
            const listeners = getListeners(this);
            // Traverse to the tail while removing old value.
            let prev = null;
            let node = listeners.get(eventName);
            while(node != null){
                if (node.listenerType === ATTRIBUTE) {
                    // Remove old value.
                    if (prev !== null) {
                        prev.next = node.next;
                    } else if (node.next !== null) {
                        listeners.set(eventName, node.next);
                    } else {
                        listeners.delete(eventName);
                    }
                } else {
                    prev = node;
                }
                node = node.next;
            }
            // Add new value.
            if (listener !== null) {
                const newNode = {
                    listener,
                    listenerType: ATTRIBUTE,
                    passive: false,
                    once: false,
                    next: null
                };
                if (prev === null) {
                    listeners.set(eventName, newNode);
                } else {
                    prev.next = newNode;
                }
            }
        },
        configurable: true,
        enumerable: true
    };
}
/**
 * Define an event attribute (e.g. `eventTarget.onclick`).
 * @param {Object} eventTargetPrototype The event target prototype to define an event attrbite.
 * @param {string} eventName The event name to define.
 * @returns {void}
 */ function defineEventAttribute(eventTargetPrototype, eventName) {
    Object.defineProperty(eventTargetPrototype, `on${eventName}`, defineEventAttributeDescriptor(eventName));
}
/**
 * Define a custom EventTarget with event attributes.
 * @param {string[]} eventNames Event names for event attributes.
 * @returns {EventTarget} The custom EventTarget.
 * @private
 */ function defineCustomEventTarget(eventNames) {
    /** CustomEventTarget */ function CustomEventTarget() {
        EventTarget.call(this);
    }
    CustomEventTarget.prototype = Object.create(EventTarget.prototype, {
        constructor: {
            value: CustomEventTarget,
            configurable: true,
            writable: true
        }
    });
    for(let i = 0; i < eventNames.length; ++i){
        defineEventAttribute(CustomEventTarget.prototype, eventNames[i]);
    }
    return CustomEventTarget;
}
/**
 * EventTarget.
 *
 * - This is constructor if no arguments.
 * - This is a function which returns a CustomEventTarget constructor if there are arguments.
 *
 * For example:
 *
 *     class A extends EventTarget {}
 *     class B extends EventTarget("message") {}
 *     class C extends EventTarget("message", "error") {}
 *     class D extends EventTarget(["message", "error"]) {}
 */ function EventTarget() {
    /*eslint-disable consistent-return */ if (this instanceof EventTarget) {
        listenersMap.set(this, new Map());
        return;
    }
    if (arguments.length === 1 && Array.isArray(arguments[0])) {
        return defineCustomEventTarget(arguments[0]);
    }
    if (arguments.length > 0) {
        const types = new Array(arguments.length);
        for(let i = 0; i < arguments.length; ++i){
            types[i] = arguments[i];
        }
        return defineCustomEventTarget(types);
    }
    throw new TypeError("Cannot call a class as a function");
/*eslint-enable consistent-return */ }
// Should be enumerable, but class methods are not enumerable.
EventTarget.prototype = {
    /**
     * Add a given listener to this event target.
     * @param {string} eventName The event name to add.
     * @param {Function} listener The listener to add.
     * @param {boolean|{capture?:boolean,passive?:boolean,once?:boolean}} [options] The options for this listener.
     * @returns {void}
     */ addEventListener (eventName, listener, options) {
        if (listener == null) {
            return;
        }
        if (typeof listener !== "function" && !isObject(listener)) {
            throw new TypeError("'listener' should be a function or an object.");
        }
        const listeners = getListeners(this);
        const optionsIsObj = isObject(options);
        const capture = optionsIsObj ? Boolean(options.capture) : Boolean(options);
        const listenerType = capture ? CAPTURE : BUBBLE;
        const newNode = {
            listener,
            listenerType,
            passive: optionsIsObj && Boolean(options.passive),
            once: optionsIsObj && Boolean(options.once),
            next: null
        };
        // Set it as the first node if the first node is null.
        let node = listeners.get(eventName);
        if (node === undefined) {
            listeners.set(eventName, newNode);
            return;
        }
        // Traverse to the tail while checking duplication..
        let prev = null;
        while(node != null){
            if (node.listener === listener && node.listenerType === listenerType) {
                // Should ignore duplication.
                return;
            }
            prev = node;
            node = node.next;
        }
        // Add it.
        prev.next = newNode;
    },
    /**
     * Remove a given listener from this event target.
     * @param {string} eventName The event name to remove.
     * @param {Function} listener The listener to remove.
     * @param {boolean|{capture?:boolean,passive?:boolean,once?:boolean}} [options] The options for this listener.
     * @returns {void}
     */ removeEventListener (eventName, listener, options) {
        if (listener == null) {
            return;
        }
        const listeners = getListeners(this);
        const capture = isObject(options) ? Boolean(options.capture) : Boolean(options);
        const listenerType = capture ? CAPTURE : BUBBLE;
        let prev = null;
        let node = listeners.get(eventName);
        while(node != null){
            if (node.listener === listener && node.listenerType === listenerType) {
                if (prev !== null) {
                    prev.next = node.next;
                } else if (node.next !== null) {
                    listeners.set(eventName, node.next);
                } else {
                    listeners.delete(eventName);
                }
                return;
            }
            prev = node;
            node = node.next;
        }
    },
    /**
     * Dispatch a given event.
     * @param {Event|{type:string}} event The event to dispatch.
     * @returns {boolean} `false` if canceled.
     */ dispatchEvent (event) {
        if (event == null || typeof event.type !== "string") {
            throw new TypeError('"event.type" should be a string.');
        }
        // If listeners aren't registered, terminate.
        const listeners = getListeners(this);
        const eventName = event.type;
        let node = listeners.get(eventName);
        if (node == null) {
            return true;
        }
        // Since we cannot rewrite several properties, so wrap object.
        const wrappedEvent = wrapEvent(this, event);
        // This doesn't process capturing phase and bubbling phase.
        // This isn't participating in a tree.
        let prev = null;
        while(node != null){
            // Remove this listener if it's once
            if (node.once) {
                if (prev !== null) {
                    prev.next = node.next;
                } else if (node.next !== null) {
                    listeners.set(eventName, node.next);
                } else {
                    listeners.delete(eventName);
                }
            } else {
                prev = node;
            }
            // Call this listener
            setPassiveListener(wrappedEvent, node.passive ? node.listener : null);
            if (typeof node.listener === "function") {
                try {
                    node.listener.call(this, wrappedEvent);
                } catch (err) {
                    if (typeof console !== "undefined" && typeof console.error === "function") {
                        console.error(err);
                    }
                }
            } else if (node.listenerType !== ATTRIBUTE && typeof node.listener.handleEvent === "function") {
                node.listener.handleEvent(wrappedEvent);
            }
            // Break if `event.stopImmediatePropagation` was called.
            if (isStopped(wrappedEvent)) {
                break;
            }
            node = node.next;
        }
        setPassiveListener(wrappedEvent, null);
        setEventPhase(wrappedEvent, 0);
        setCurrentTarget(wrappedEvent, null);
        return !wrappedEvent.defaultPrevented;
    }
};
// `constructor` is not enumerable.
Object.defineProperty(EventTarget.prototype, "constructor", {
    value: EventTarget,
    configurable: true,
    writable: true
});
// Ensure `eventTarget instanceof window.EventTarget` is `true`.
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
exports.defineEventAttribute = defineEventAttribute;
exports.EventTarget = EventTarget;
exports.default = EventTarget;
module.exports = EventTarget;
module.exports.EventTarget = module.exports["default"] = EventTarget;
module.exports.defineEventAttribute = defineEventAttribute; //# sourceMappingURL=event-target-shim.js.map
}),
"[project]/node_modules/abort-controller/dist/abort-controller.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */ Object.defineProperty(exports, '__esModule', {
    value: true
});
var eventTargetShim = __turbopack_context__.r("[project]/node_modules/event-target-shim/dist/event-target-shim.js [app-rsc] (ecmascript)");
/**
 * The signal class.
 * @see https://dom.spec.whatwg.org/#abortsignal
 */ class AbortSignal extends eventTargetShim.EventTarget {
    /**
     * AbortSignal cannot be constructed directly.
     */ constructor(){
        super();
        throw new TypeError("AbortSignal cannot be constructed directly");
    }
    /**
     * Returns `true` if this `AbortSignal`'s `AbortController` has signaled to abort, and `false` otherwise.
     */ get aborted() {
        const aborted = abortedFlags.get(this);
        if (typeof aborted !== "boolean") {
            throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
        }
        return aborted;
    }
}
eventTargetShim.defineEventAttribute(AbortSignal.prototype, "abort");
/**
 * Create an AbortSignal object.
 */ function createAbortSignal() {
    const signal = Object.create(AbortSignal.prototype);
    eventTargetShim.EventTarget.call(signal);
    abortedFlags.set(signal, false);
    return signal;
}
/**
 * Abort a given signal.
 */ function abortSignal(signal) {
    if (abortedFlags.get(signal) !== false) {
        return;
    }
    abortedFlags.set(signal, true);
    signal.dispatchEvent({
        type: "abort"
    });
}
/**
 * Aborted flag for each instances.
 */ const abortedFlags = new WeakMap();
// Properties should be enumerable.
Object.defineProperties(AbortSignal.prototype, {
    aborted: {
        enumerable: true
    }
});
// `toString()` should return `"[object AbortSignal]"`
if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
    Object.defineProperty(AbortSignal.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortSignal"
    });
}
/**
 * The AbortController.
 * @see https://dom.spec.whatwg.org/#abortcontroller
 */ class AbortController {
    /**
     * Initialize this controller.
     */ constructor(){
        signals.set(this, createAbortSignal());
    }
    /**
     * Returns the `AbortSignal` object associated with this object.
     */ get signal() {
        return getSignal(this);
    }
    /**
     * Abort and signal to any observers that the associated activity is to be aborted.
     */ abort() {
        abortSignal(getSignal(this));
    }
}
/**
 * Associated signals.
 */ const signals = new WeakMap();
/**
 * Get the associated signal of a given controller.
 */ function getSignal(controller) {
    const signal = signals.get(controller);
    if (signal == null) {
        throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${controller === null ? "null" : typeof controller}`);
    }
    return signal;
}
// Properties should be enumerable.
Object.defineProperties(AbortController.prototype, {
    signal: {
        enumerable: true
    },
    abort: {
        enumerable: true
    }
});
if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
    Object.defineProperty(AbortController.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortController"
    });
}
exports.AbortController = AbortController;
exports.AbortSignal = AbortSignal;
exports.default = AbortController;
module.exports = AbortController;
module.exports.AbortController = module.exports["default"] = AbortController;
module.exports.AbortSignal = AbortSignal; //# sourceMappingURL=abort-controller.js.map
}),
"[project]/node_modules/form-data-encoder/lib/esm/util/createBoundary.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
function createBoundary() {
    let size = 16;
    let res = "";
    while(size--){
        res += alphabet[Math.random() * alphabet.length << 0];
    }
    return res;
}
const __TURBOPACK__default__export__ = createBoundary;
}),
"[project]/node_modules/form-data-encoder/lib/esm/util/isPlainObject.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const getType = (value)=>Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
function isPlainObject(value) {
    if (getType(value) !== "object") {
        return false;
    }
    const pp = Object.getPrototypeOf(value);
    if (pp === null || pp === undefined) {
        return true;
    }
    const Ctor = pp.constructor && pp.constructor.toString();
    return Ctor === Object.toString();
}
const __TURBOPACK__default__export__ = isPlainObject;
}),
"[project]/node_modules/form-data-encoder/lib/esm/util/normalizeValue.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const normalizeValue = (value)=>String(value).replace(/\r|\n/g, (match, i, str)=>{
        if (match === "\r" && str[i + 1] !== "\n" || match === "\n" && str[i - 1] !== "\r") {
            return "\r\n";
        }
        return match;
    });
const __TURBOPACK__default__export__ = normalizeValue;
}),
"[project]/node_modules/form-data-encoder/lib/esm/util/escapeName.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const escapeName = (name)=>String(name).replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/"/g, "%22");
const __TURBOPACK__default__export__ = escapeName;
}),
"[project]/node_modules/form-data-encoder/lib/esm/util/isFunction.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
const isFunction = (value)=>typeof value === "function";
const __TURBOPACK__default__export__ = isFunction;
}),
"[project]/node_modules/form-data-encoder/lib/esm/util/isFileLike.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isFileLike",
    ()=>isFileLike
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/form-data-encoder/lib/esm/util/isFunction.js [app-rsc] (ecmascript)");
;
const isFileLike = (value)=>Boolean(value && typeof value === "object" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(value.constructor) && value[Symbol.toStringTag] === "File" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(value.stream) && value.name != null && value.size != null && value.lastModified != null);
}),
"[project]/node_modules/form-data-encoder/lib/esm/util/isFormData.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isFormData",
    ()=>isFormData,
    "isFormDataLike",
    ()=>isFormDataLike
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/form-data-encoder/lib/esm/util/isFunction.js [app-rsc] (ecmascript)");
;
const isFormData = (value)=>Boolean(value && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(value.constructor) && value[Symbol.toStringTag] === "FormData" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(value.append) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(value.getAll) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(value.entries) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFunction$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(value[Symbol.iterator]));
const isFormDataLike = isFormData;
}),
"[project]/node_modules/form-data-encoder/lib/esm/FormDataEncoder.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Encoder",
    ()=>Encoder,
    "FormDataEncoder",
    ()=>FormDataEncoder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$createBoundary$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/form-data-encoder/lib/esm/util/createBoundary.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isPlainObject$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/form-data-encoder/lib/esm/util/isPlainObject.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$normalizeValue$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/form-data-encoder/lib/esm/util/normalizeValue.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$escapeName$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/form-data-encoder/lib/esm/util/escapeName.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFileLike$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/form-data-encoder/lib/esm/util/isFileLike.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFormData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/form-data-encoder/lib/esm/util/isFormData.js [app-rsc] (ecmascript)");
var __classPrivateFieldSet = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = ("TURBOPACK compile-time value", void 0) && ("TURBOPACK compile-time value", void 0).__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FormDataEncoder_instances, _FormDataEncoder_CRLF, _FormDataEncoder_CRLF_BYTES, _FormDataEncoder_CRLF_BYTES_LENGTH, _FormDataEncoder_DASHES, _FormDataEncoder_encoder, _FormDataEncoder_footer, _FormDataEncoder_form, _FormDataEncoder_options, _FormDataEncoder_getFieldHeader;
;
;
;
;
;
;
const defaultOptions = {
    enableAdditionalHeaders: false
};
class FormDataEncoder {
    constructor(form, boundaryOrOptions, options){
        _FormDataEncoder_instances.add(this);
        _FormDataEncoder_CRLF.set(this, "\r\n");
        _FormDataEncoder_CRLF_BYTES.set(this, void 0);
        _FormDataEncoder_CRLF_BYTES_LENGTH.set(this, void 0);
        _FormDataEncoder_DASHES.set(this, "-".repeat(2));
        _FormDataEncoder_encoder.set(this, new TextEncoder());
        _FormDataEncoder_footer.set(this, void 0);
        _FormDataEncoder_form.set(this, void 0);
        _FormDataEncoder_options.set(this, void 0);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFormData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFormData"])(form)) {
            throw new TypeError("Expected first argument to be a FormData instance.");
        }
        let boundary;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isPlainObject$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(boundaryOrOptions)) {
            options = boundaryOrOptions;
        } else {
            boundary = boundaryOrOptions;
        }
        if (!boundary) {
            boundary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$createBoundary$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
        }
        if (typeof boundary !== "string") {
            throw new TypeError("Expected boundary argument to be a string.");
        }
        if (options && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isPlainObject$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(options)) {
            throw new TypeError("Expected options argument to be an object.");
        }
        __classPrivateFieldSet(this, _FormDataEncoder_form, form, "f");
        __classPrivateFieldSet(this, _FormDataEncoder_options, {
            ...defaultOptions,
            ...options
        }, "f");
        __classPrivateFieldSet(this, _FormDataEncoder_CRLF_BYTES, __classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode(__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f")), "f");
        __classPrivateFieldSet(this, _FormDataEncoder_CRLF_BYTES_LENGTH, __classPrivateFieldGet(this, _FormDataEncoder_CRLF_BYTES, "f").byteLength, "f");
        this.boundary = `form-data-boundary-${boundary}`;
        this.contentType = `multipart/form-data; boundary=${this.boundary}`;
        __classPrivateFieldSet(this, _FormDataEncoder_footer, __classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode(`${__classPrivateFieldGet(this, _FormDataEncoder_DASHES, "f")}${this.boundary}${__classPrivateFieldGet(this, _FormDataEncoder_DASHES, "f")}${__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f").repeat(2)}`), "f");
        this.contentLength = String(this.getContentLength());
        this.headers = Object.freeze({
            "Content-Type": this.contentType,
            "Content-Length": this.contentLength
        });
        Object.defineProperties(this, {
            boundary: {
                writable: false,
                configurable: false
            },
            contentType: {
                writable: false,
                configurable: false
            },
            contentLength: {
                writable: false,
                configurable: false
            },
            headers: {
                writable: false,
                configurable: false
            }
        });
    }
    getContentLength() {
        let length = 0;
        for (const [name, raw] of __classPrivateFieldGet(this, _FormDataEncoder_form, "f")){
            const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFileLike$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFileLike"])(raw) ? raw : __classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$normalizeValue$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(raw));
            length += __classPrivateFieldGet(this, _FormDataEncoder_instances, "m", _FormDataEncoder_getFieldHeader).call(this, name, value).byteLength;
            length += (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFileLike$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFileLike"])(value) ? value.size : value.byteLength;
            length += __classPrivateFieldGet(this, _FormDataEncoder_CRLF_BYTES_LENGTH, "f");
        }
        return length + __classPrivateFieldGet(this, _FormDataEncoder_footer, "f").byteLength;
    }
    *values() {
        for (const [name, raw] of __classPrivateFieldGet(this, _FormDataEncoder_form, "f").entries()){
            const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFileLike$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFileLike"])(raw) ? raw : __classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$normalizeValue$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(raw));
            yield __classPrivateFieldGet(this, _FormDataEncoder_instances, "m", _FormDataEncoder_getFieldHeader).call(this, name, value);
            yield value;
            yield __classPrivateFieldGet(this, _FormDataEncoder_CRLF_BYTES, "f");
        }
        yield __classPrivateFieldGet(this, _FormDataEncoder_footer, "f");
    }
    async *encode() {
        for (const part of this.values()){
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFileLike$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFileLike"])(part)) {
                yield* part.stream();
            } else {
                yield part;
            }
        }
    }
    [(_FormDataEncoder_CRLF = new WeakMap(), _FormDataEncoder_CRLF_BYTES = new WeakMap(), _FormDataEncoder_CRLF_BYTES_LENGTH = new WeakMap(), _FormDataEncoder_DASHES = new WeakMap(), _FormDataEncoder_encoder = new WeakMap(), _FormDataEncoder_footer = new WeakMap(), _FormDataEncoder_form = new WeakMap(), _FormDataEncoder_options = new WeakMap(), _FormDataEncoder_instances = new WeakSet(), _FormDataEncoder_getFieldHeader = function _FormDataEncoder_getFieldHeader(name, value) {
        let header = "";
        header += `${__classPrivateFieldGet(this, _FormDataEncoder_DASHES, "f")}${this.boundary}${__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f")}`;
        header += `Content-Disposition: form-data; name="${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$escapeName$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(name)}"`;
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFileLike$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFileLike"])(value)) {
            header += `; filename="${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$escapeName$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(value.name)}"${__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f")}`;
            header += `Content-Type: ${value.type || "application/octet-stream"}`;
        }
        if (__classPrivateFieldGet(this, _FormDataEncoder_options, "f").enableAdditionalHeaders === true) {
            header += `${__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f")}Content-Length: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFileLike$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isFileLike"])(value) ? value.size : value.byteLength}`;
        }
        return __classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode(`${header}${__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f").repeat(2)}`);
    }, Symbol.iterator)]() {
        return this.values();
    }
    [Symbol.asyncIterator]() {
        return this.encode();
    }
}
const Encoder = FormDataEncoder;
}),
"[project]/node_modules/form-data-encoder/lib/esm/FileLike.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/node_modules/form-data-encoder/lib/esm/FormDataLike.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/node_modules/form-data-encoder/lib/esm/index.js [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$FormDataEncoder$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/form-data-encoder/lib/esm/FormDataEncoder.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$FileLike$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/form-data-encoder/lib/esm/FileLike.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$FormDataLike$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/form-data-encoder/lib/esm/FormDataLike.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFileLike$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/form-data-encoder/lib/esm/util/isFileLike.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$form$2d$data$2d$encoder$2f$lib$2f$esm$2f$util$2f$isFormData$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/form-data-encoder/lib/esm/util/isFormData.js [app-rsc] (ecmascript)");
;
;
;
;
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4cd462fe._.js.map