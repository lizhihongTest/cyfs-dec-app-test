! function(e) {
    var n = {};

    function t(o) {
        if (n[o]) return n[o].exports;
        var i = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, t), i.l = !0, i.exports
    }
    t.m = e, t.c = n, t.d = function(e, n, o) {
        t.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: o
        })
    }, t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.t = function(e, n) {
        if (1 & n && (e = t(e)), 8 & n) return e;
        if (4 & n && "object" == typeof e && e && e.__esModule) return e;
        var o = Object.create(null);
        if (t.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: e
            }), 2 & n && "string" != typeof e)
            for (var i in e) t.d(o, i, function(n) {
                return e[n]
            }.bind(null, i));
        return o
    }, t.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(n, "a", n), n
    }, t.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }, t.p = "", t(t.s = 20)
}({
    20: function(e, n, t) {
        "use strict";

        function o() {
            document.body.onkeydown = function() {
                return !1
            }, document.documentElement.style.overflow = "hidden", $(document.body).width() < 768 && (window.ontouchmove = function(e) {
                return e.preventDefault && e.preventDefault(), e.returnValue = !1, e.stopPropagation && e.stopPropagation(), !1
            }), $("#ip-warning").css("display", "block"), $("#warning-box").css("display", "block");
            var e = $(document.body).height();
            console.log("pageHeight", e), $("#warning-box").css("height", e);
            var n = $("#ip-warning-tick").html();
            setInterval((function() {
                n--, $("#ip-warning-tick").html(n), 0 == n && ($(document.body).width() > 768 ? location.href = "/index.html" : location.href = "/mobile/index.html")
            }), 1e3)
        }
    }
});